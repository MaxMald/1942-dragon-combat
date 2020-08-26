/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary * This component manage the hp of the enemy. When the hp reach zero,
 * it sends a message with the "kill" id.
 *
 * @file cmpEnemyHealth.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-31-2020
 */

import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite } from "../commons/1942types";
import { IBaseComponent } from "./iBaseComponent";

/**
 * This component manage the hp of the enemy. When the hp reach zero, it sends a
 * message with the "kill" id.
 */
export class CmpEnemyHealth implements IBaseComponent<Ty_physicsSprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Create a new component.
   */
  static Create()
  : CmpEnemyHealth
  {
    let enemyHealth : CmpEnemyHealth = new CmpEnemyHealth();

    enemyHealth.m_id = DC_COMPONENT_ID.kEnemyHealth;
    enemyHealth._m_iHP = 0;

    return enemyHealth;
  }
  
  /**
   * Get the actor's sprite.
   * 
   * @param _actor actor. 
   */
  init(_actor: Ty_physicsActor)
  : void 
  {
    this._m_actor = _actor;
    return;
  }
  
  update(_actor: Ty_physicsActor)
  : void 
  { }

  /**
   * Handle messages.
   * 
   * @param _id message id. 
   * @param _obj message.
   */
  receive(_id: number, _obj: any)
  : void 
  {
    switch(_id)
    {
      case DC_MESSAGE_ID.kHit:
      
      this.hit(_obj as integer);      
      return;

      case DC_MESSAGE_ID.kSetHealthPoints:

      this.setHP(_obj as number);
      return;
    }
    return;
  }

  /**
   * Get the number of health points of this actor.
   */
  getHP()
  : integer
  {
    return this._m_iHP;
  }

  /**
   * Set the number of healt points of this actor.
   * 
   * @param _hp health points. 
   */
  setHP(_hp : integer)
  : void
  {
    this._m_iHP = _hp;
    return;
  }

  /**
   * Reduce an especific amount of HP.
   * 
   * @param _points Point to substract. 
   */
  hit(_points : integer)
  : void
  {
    let hp = this._m_iHP - _points;

    if(hp <= 0) 
    {
      hp = 0;

      let actor = this._m_actor;
      actor.sendMessage(DC_MESSAGE_ID.kKill, actor);
    }

    this._m_iHP = hp;
    return;
  }

  destroy()
  : void 
  { }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Private constructor.
   */
  private constructor()
  { }

  /**
   * Amount of health points of this component.
   */
  private _m_iHP : integer;

  /**
   * Reference to the actor.
   */
  private _m_actor : Ty_physicsActor;
}