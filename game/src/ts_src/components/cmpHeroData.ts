/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Save the score and healt of the hero. 
 *
 * @file cmpHeroData.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-06-2020
 */

import { IBaseComponent } from "./iBaseComponent";
import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite } from "../commons/1942types";
import { MxListenerManager } from "listeners/mxListenerManager";
import { MxListener } from "listeners/mxListener";
import { GameManager } from "../gameManager/gameManager";

/**
 * Save the score and health of the hero.
 */
export class CmpHeroData
implements IBaseComponent<Ty_physicsSprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  static Create()
  : CmpHeroData
  {
    let data : CmpHeroData = new CmpHeroData();

    // Default properties.

    data._m_health = 10;
    data.m_id = DC_COMPONENT_ID.kHeroData;

    // Listeners.

    data._m_listeners = new MxListenerManager<CmpHeroData, undefined>();
    
    data._m_listeners.addEvent('onHealthChanged');    
    
    return data;
  }
  
  init(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  {
    this._m_actor = _actor;
    return;
  }

  update(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  { }

  receive(_id: number, _obj: any)
  : void 
  {
    switch(_id)
    {
      case DC_MESSAGE_ID.kHit :

      this._onHit(_obj as integer);
      return;

      case DC_MESSAGE_ID.kSetHealthPoints :

      this.setHealth(_obj as integer);
      return;
    }   
  }

  /**
   * Set the hero's health.
   * 
   * @param _health health points.
   */
  setHealth( _health : integer )
  : void
  {
    this._m_health = _health;
    this._m_listeners.call('onHealthChanged', this, undefined);
    return;
  }

  /**
   * Get the hero's health.
   * 
   * @returns heros's health.
   */
  getHealth()
  : integer
  {
    return this._m_health;
  }

  /**
   * Suscribe to an event:
   * 
   * I) onHealthChanged : trigger when the health changed.
   * 
   * @param _event event key.
   * @param _username username.
   * @param _function function.
   * @param _context context.
   */
  suscribe
  (
    _event : string, 
    _username : string, 
    _function : (CmpHeroData, undefined) => void, 
    _context ?: any
  )
  : void
  {
    this._m_listeners.suscribe
    (
      _event, 
      _username, 
      new MxListener<CmpHeroData, undefined>(_function, _context)
    );
    return;
  }

  /**
   * Unsucribe to an event.
   * 
   * @param _event event. 
   * @param _username username.
   */
  unsuscribe(_event : string, _username : string)
  : void
  {
    this._m_listeners.unsuscribe(_event, _username);
    return;
  }

  destroy()
  : void 
  {
    this._m_listeners.destroy();
    return;
  }

  m_id: number;
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Private constructor.
   */
  private constructor()
  { }

  private _onHit( _hitPoints : number)
  : void
  {
    let health = this._m_health -= _hitPoints;
    
    if(health <= 0)
    {
      this._m_actor.sendMessage(DC_MESSAGE_ID.kKill, this._m_actor);
      health = 0;

      GameManager.ReceiveMessage
      (
        DC_MESSAGE_ID.kMisionFailure, 
        GameManager.GetInstance()
      );
    } 

    this.setHealth(health);    
    return;
  }

  /**
   * Reference to the hero's actor.
   */
  private _m_actor : Ty_physicsActor;
  
  /**
   * Hero's health.
   */
  private _m_health : integer;

  /**
   * Listener manager.
   */
  private _m_listeners : MxListenerManager<CmpHeroData, undefined>;
}