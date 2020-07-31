/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Handle the collision between a bullet and other body.
 *
 * @file cmpBulletCollisionController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-30-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID } from "../commons/1942enums";
import { ICmpCollisionController } from "./iCmpCollisionController";

/**
 * Handle the collision between a bullet and other body.
 */
export class CmpBulletCollisionController implements ICmpCollisionController
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : CmpBulletCollisionController
  {
    let controller = new CmpBulletCollisionController();

    controller.m_id = DC_COMPONENT_ID.kCollisionController;

    return controller;
  }

  onCollision
  (
    _other: BaseActor<Phaser.Physics.Arcade.Sprite>, 
    _this: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  {
    return;
  }
  
  init(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  {
    return;
  }

  update(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  {
    return;
  }

  receive(_id: number, _obj: any)
  : void 
  {
    return;
  }

  destroy()
  : void 
  {
    return;
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private constructor()
  { }

}