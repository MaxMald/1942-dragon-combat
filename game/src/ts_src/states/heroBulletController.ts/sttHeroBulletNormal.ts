/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttHeroBulletNormal.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-20-2020
 */

import { IBulletManager } from "../../bulletManager/iBulletManager";
import { NullBulletManager } from "../../bulletManager/nullBulletManager";
import { DC_BULLET_TYPE, DC_COMPONENT_ID, DC_MESSAGE_ID, DC_SECONDARY_ACTION } from "../../commons/1942enums";
import { Ty_physicsActor } from "../../commons/1942types";
import { CmpHeroBulletController } from "../../components/cmpHeroBulletController";
import { CmpHeroController } from "../../components/cmpHeroController";
import { ICmpItemController } from "../../components/iCmpItemController";
import { CnfBulletStateNormal } from "../../configObjects/cnfBulletStateNormal";
import { GameManager } from "../../gameManager/gameManager";
import { ISttHeroBullet } from "./iSttHeroBullet";

export class SttHeroBulletNormal 
implements ISttHeroBullet
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor()
  {
    this.m_id = "Normal";

    this._m_loadingMult = 0.0;
    this._m_loadingTime = 0.0;
    this._m_bulletManager = NullBulletManager.GetInstance();
    this._m_gameManager = GameManager.GetInstance();

    return;
  }

  /**
   * Intialize this state with a configuartion object.
   * 
   * @param _actor actor.
   * @param _component hero bullet controller component.
   * @param _bulletManager hero bullet manager.
   * @param _config this state configuartion object.
   */
  init
  (
    _actor : Ty_physicsActor,
    _component : CmpHeroBulletController,
    _bulletManager : IBulletManager,
    _config : CnfBulletStateNormal
  )
  : void
  {
    this._m_actor = _actor;
    this._m_bulletManager = _bulletManager;
    this.setComponent(_component);
    
    if(_config.frecuency > 0)
    {
      _config.secondsPerBullet = 1.0 / _config.frecuency;
    }
    else
    {
      _config.secondsPerBullet = 1.0;
    }
    this._m_config = _config;
    return;
  }
  
  /**
   * Set the bullet controller component.
   * 
   * @param _component bullet controller component.
   */
  setComponent(_component: CmpHeroBulletController)
  : void 
  {
    this._m_bulletController = _component;
    return;
  }

  /**
   * Get the hero bullet controller component.
   * 
   * @returns bullet controller component.
   */
  getComponent()
  : CmpHeroBulletController 
  {
    return this._m_bulletController;
  }

  /**
   * Restart loading time.
   */
  onEnter()
  : void 
  {
    this._m_loadingTime = 0.0;

    let heroController = this._m_actor.getComponent<CmpHeroController>
    (
      DC_COMPONENT_ID.kHeroController
    );
    
    this._m_loadingMult = (heroController.isPointerPressed() ? 1.0 : 0.0);
    return;
  }

  /**
   * 
   */
  onExit()
  : void 
  {
    return;
  }

  receive(_id: number, _obj: any)
  : void 
  {
    switch(_id)
    {
      /**
       * Activate fire mechanism when player pressed the pointer.
       */
      case DC_MESSAGE_ID.kPointerPressed :

      this._m_loadingMult = 1.0;
      return;

      /**
       * Desactive fire mechanism when player released the pointer.
       */
      case DC_MESSAGE_ID.kPointerReleased : 

      this._m_loadingMult = 0.0;
      return;

      /**
       * Set the hero bullet manager.
       */
      case DC_MESSAGE_ID.kSetBulletManager :

      this._m_bulletManager = _obj as IBulletManager;
      return;

      /**
       * Collision with an item.
       */
      case DC_MESSAGE_ID.kCollisionItem :

      this._onItemCollision(_obj as ICmpItemController);
      return;      
    }
    return;
  }

  /**
   * Update fire mechanism.
   */
  update()
  : void 
  {
    let loading : number = this._m_loadingTime;

    loading += (this._m_gameManager.m_dt * this._m_loadingMult);
    
    if(loading >= this._m_config.secondsPerBullet)
    {
      let sprite = this._m_actor.getWrappedInstance();

      this._m_bulletManager.spawn
      (
        sprite.x , 
        sprite.y - 110.0, 
        DC_BULLET_TYPE.kHeroBasic
      );
      
      loading = 0.0;
    }
    
    this._m_loadingTime = loading;
    return;
  }

  /**
   * Destroy this state.
   */
  destroy()
  : void 
  {
    this._m_bulletManager = null;
    this._m_gameManager = null;
  }

  m_id: string;
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Called when a collision with an item had been ocurred.
   * 
   * @param _itemController item controller.
   */
  private _onItemCollision(_itemController : ICmpItemController)
  : void
  {
    if(_itemController.getEffectType() == DC_SECONDARY_ACTION.KTripleShot)
    {
      this._m_bulletController.setActiveState('Triple');
    }
    return;
  }
  
  /**
   * Reference to the bullet controller.
   */
  private _m_bulletController : CmpHeroBulletController;

  /**
   * Reference to the BulletManager.
   */
  private _m_bulletManager : IBulletManager;

  /**
   * Referenc to the GameManager.
   */
  private _m_gameManager : GameManager;

  /**
   * Configuration object.
   */
  private _m_config : CnfBulletStateNormal;

  /**
   * Loading time since the last time that a bullet had spawn.
   */
  private _m_loadingTime : number;

  /**
   * Loading multiplier.
   */
  private _m_loadingMult : number;
  
  /**
   * Reference to the physic actor.
   */
  private _m_actor : Ty_physicsActor;
}