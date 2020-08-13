/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpSimpleBulletControl.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-12-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite, V2, V3 } from "../commons/1942types";
import { GameManager } from "../gameManager/gameManager";
import { CmpBulletData } from "./cmpBulletData";
import { IBaseComponent } from "./iBaseComponent";

/**
 * Apply a force of movement to the actor.
 */
export class CmpSimpleBulletController 
implements IBaseComponent<Ty_physicsSprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : CmpSimpleBulletController
  {
    let controller = new CmpSimpleBulletController();

    controller._m_gameManager = GameManager.GetInstance();
    controller._m_direction = new Phaser.Math.Vector2(1.0, 0.0);
    controller._m_force = new Phaser.Math.Vector3();
    controller._m_speed = 0.0;

    controller.m_id = DC_COMPONENT_ID.kSimpleBulletControl;
    
    return controller;
  }

  init(_actor: BaseActor<Ty_physicsSprite>)
  : void 
  { }

  /**
   * Set the bullet direction.
   * 
   * @param _x  
   * @param _y 
   */
  setDirection(_x : number, _y : number)
  : void
  {
    this._m_direction.setTo(_x, _y);
    this._m_direction.normalize();
    return;
  }

  /**
   * Set the bullet speed.
   * 
   * @param _speed speed. 
   */
  setSpeed(_speed : number)
  : void
  {
    this._m_speed = _speed;
    return;
  }

  update(_actor: BaseActor<Ty_physicsSprite>)
  : void 
  {
    let mult = this._m_gameManager.m_dt * this._m_speed;

    this._m_force.x = this._m_direction.x * mult;
    this._m_force.y = this._m_direction.y * mult;

    _actor.sendMessage(DC_MESSAGE_ID.kAgentMove, this._m_force);
    return;
  }

  receive(_id: number, _obj: any)
  : void 
  { 
    switch(_id)
    {
      case DC_MESSAGE_ID.kKill :

        this._onKill(_obj as Ty_physicsActor);
      return;

      case DC_MESSAGE_ID.kDesactive :

        this._onKill(_obj as Ty_physicsActor);
      return;

      case DC_MESSAGE_ID.kDirection :
      {
        let direction = _obj as V2;
        this.setDirection(direction.x, direction.y);
      }
      return;

      case DC_MESSAGE_ID.kSpeed :
      
      this.setSpeed(_obj as number);      
      return;
    }
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
   * Called once when the actor is going to be killed.
   */
  private _onKill(_actor : Ty_physicsActor)
  : void
  {
    let data = _actor.getComponent<CmpBulletData>
    (
      DC_COMPONENT_ID.kBulletData
    );

    data.getSpawner().disassemble(_actor);
    return;
  }

  /**
   * Bullet force.
   */
  private _m_force : V3;

  /**
   * Bullet direction.
   */
  private _m_direction : V2;

  /**
   * Bullet speed.
   */
  private _m_speed : number;

  /**
   * Reference to the GameManager.
   */
  private _m_gameManager : GameManager;
}