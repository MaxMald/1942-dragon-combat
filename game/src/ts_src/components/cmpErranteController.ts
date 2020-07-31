/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpErranteController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-31-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor, V3 } from "../commons/1942types";
import { ICmpCollisionController } from "./iCmpCollisionController";

export class CmpErranteController implements ICmpCollisionController
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  static Create()
  : CmpErranteController
  {
    let controller = new CmpErranteController();

    controller.m_id = DC_COMPONENT_ID.kCollisionController;

    controller._m_direction = new Phaser.Math.Vector3(0.0, 1.0);
    controller._m_force = new Phaser.Math.Vector3();
    controller._m_speed = 400.0;

    controller.setDeltaTime(0.0);

    return controller;
  }
  
  onCollision
  (
    _other: Ty_physicsActor, 
    _this: Ty_physicsActor
  ) : void     
  {
    console.log("Errante Collision!");
    return;
  }
  
  init(_actor: Ty_physicsActor)
  : void 
  {
    return;
  }

  update(_actor: Ty_physicsActor)
  : void 
  {
    _actor.sendMessage(DC_MESSAGE_ID.kAgentMove, this._m_force);
    return;
  }

  receive(_id: number, _obj: any)
  : void 
  {
    return;
  }

  setDeltaTime(_dt : number)
  : void
  {
    this._m_dt = _dt;

    let force = this._m_force;
    let direction = this._m_direction;
    let mult = this._m_speed * _dt;

    force.x = direction.x * mult;
    force.y = direction.y * mult;

    return;
  }

  destroy()
  : void 
  {
    throw new Error("Method not implemented.");
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private constructor()
  { }

  private _m_direction : V3;

  private _m_force : V3;

  private _m_speed : number;

  private _m_dt : number;

}