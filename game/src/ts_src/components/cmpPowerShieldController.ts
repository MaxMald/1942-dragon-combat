/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpPowerShieldController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-21-2020
 */

import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite } from "../commons/1942types";
import { CnfPowerShield } from "../configObjects/cnfPowerShield";
import { GameManager } from "../gameManager/gameManager";
import { IBaseComponent } from "./iBaseComponent";

/**
 * Hero's power shield component.
 */
export class CmpPowerShieldController
implements IBaseComponent<Ty_physicsSprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : CmpPowerShieldController
  {
    let controller = new CmpPowerShieldController();

    controller.m_id = DC_COMPONENT_ID.kPowerShieldComponent;
    controller._m_activeState = controller._updateDesactive;
    controller._m_gameManager = GameManager.GetInstance();

    return controller;
  }

  /**
   * Se the configuration object of this shield.
   * 
   * @param _config configuration object.
   */
  setConfiguration(_config : CnfPowerShield)
  : void
  {
    this._m_config = _config;
    let sprite : Ty_physicsSprite = this._m_shieldActor.getWrappedInstance();

    this._m_minScale = _config.min_radius / (sprite.width * 0.5);
    this._m_maxScale = _config.max_radius / (sprite.width * 0.5);
    this._m_explosionScale = _config.explosion_radius / (sprite.width * 0.5);
    return;
  }

  /**
   * Set the hero actor.
   * 
   * @param _actor actor. 
   */
  setHeroActor(_actor : Ty_physicsActor)
  : void
  {
    this._m_heroActor = _actor;
    return;
  }

  /**
   * Initialize this component.
   * 
   * @param _actor actor. 
   */
  init(_actor: Ty_physicsActor)
  : void 
  {
    this._m_shieldActor = _actor;
    return;
  }

  /**
   * 
   * @param _actor 
   */
  update(_actor: Ty_physicsActor)
  : void 
  {
    // Follow Hero.

    let sprite = _actor.getWrappedInstance();
    let heroSprite = this._m_heroActor.getWrappedInstance();

    sprite.setPosition
    (
      heroSprite.x,
      heroSprite.y
    );

    // Call State.
    this._m_activeState.call(this);
    return;
  }

  receive(_id: number, _obj: any)
  : void 
  {
    switch(_id)
    {
      case DC_MESSAGE_ID.kDesactive : 
      
      this.activeDesactiveState();
      return;

      case DC_MESSAGE_ID.kActive : 

      this.activeGrowingState();
      return;
    }
  }

  /**
   * 
   */
  activeDesactiveState()
  : void
  {
    let sprite = this._m_shieldActor.getWrappedInstance();
    
    sprite.setVisible(false);
    sprite.setActive(false);
    sprite.body.enable = false;

    this._m_heroActor.sendMessage
    (
      DC_MESSAGE_ID.kPowerShieldDesactivated,
      this._m_shieldActor
    );

    this._m_activeState = this._updateDesactive;
    return;
  }

  /**
   * 
   */
  activeGrowingState()
  : void
  {
    let sprite = this._m_shieldActor.getWrappedInstance();
    
    sprite.setAlpha(1.0);
    sprite.setScale(this._m_minScale);
    sprite.setVisible(true);
    sprite.setActive(true);
    sprite.body.enable = false;

    this._m_growing_time = 0.0;

    this._m_heroActor.sendMessage
    (
      DC_MESSAGE_ID.kPowerShieldActivated,
      this._m_shieldActor
    );

    this._m_activeState = this._updateGrowing;
    return;
  }

  /**
   * 
   */
  activeExplodeState()
  : void
  {
    let sprite = this._m_shieldActor.getWrappedInstance();
    
    sprite.setScale(this._m_maxScale);
    sprite.setVisible(true);
    sprite.setActive(true);
    sprite.body.enable = true;

    this._m_growing_time = 0.0;    

    this._m_activeState = this._updateExplosion;
    return;
  }

  destroy()
  : void 
  {
    this._m_config = null;
    this._m_gameManager = null;
    return;
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Desactive State
   * 
   * this state don't have any process implemented.
   */
  private _updateDesactive()
  : void
  {
    return;
  }

  /**
   * Growing State
   * 
   * The Shield grows to the maximum size allowed.
   */
  private _updateGrowing()
  : void
  {
    let time = this._m_growing_time + this._m_gameManager.m_dt;
    this._m_growing_time = time;
    
    if(time > this._m_config.shield_max_time)
    {
      this.activeExplodeState();
    }
    else 
    { 
      let maxScale = this._m_maxScale;
      let minScale = this._m_minScale;
      
      let deltaScale = maxScale - minScale;

      let sprite = this._m_shieldActor.getWrappedInstance();
      let lerp = (time / this._m_config.shield_max_time);
      
      sprite.setScale(minScale + (deltaScale * lerp));
    }
    return;
  }

  /**
   * Explode State
   * 
   * The shield explodes and destroy any nearby enemies and bullets.
   */
  private _updateExplosion()
  : void
  {
    let time = this._m_growing_time + this._m_gameManager.m_dt;
    this._m_growing_time = time;
    let config = this._m_config;
    
    if(time > config.explosion_time)
    {
      this.activeDesactiveState();
    }
    else
    {
      let maxScale = this._m_explosionScale;
      let minScale = this._m_maxScale;
      
      let deltaScale = maxScale - minScale;

      let sprite = this._m_shieldActor.getWrappedInstance();
      let lerp = (time / config.explosion_time);
      
      sprite.setScale(minScale + (deltaScale * lerp));
      sprite.setAlpha(1.0 - lerp);
    }
    return;
  }
  
  /**
   * Private constructor.
   */
  private constructor()
  { }

  /**
   * The active state of the shield.
   */
  private _m_activeState : () => void;

  /**
   * Configuartion object.
   */
  private _m_config : CnfPowerShield;

  /**
   * Minimun scale factor.
   */
  private _m_minScale : number;

  /**
   * Maximum scale factor.
   */
  private _m_maxScale : number;

  /**
   * Explosion scale factor.
   */
  private _m_explosionScale : number;
  
  /**
   * The growing time since the shield starts.
   */
  private _m_growing_time : number;

  /**
   * Reference to the GameManager.
   */
  private _m_gameManager : GameManager;

  /**
   * Reference to the Hero.
   */
  private _m_heroActor : Ty_physicsActor;

  /**
   * Reference to the shield.
   */
  private _m_shieldActor : Ty_physicsActor;
}