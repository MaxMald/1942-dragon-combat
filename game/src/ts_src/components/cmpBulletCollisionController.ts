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
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { CmpBulletData } from "./cmpBulletData";
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
    // Hit.

    let data = _this.getComponent<CmpBulletData>(DC_COMPONENT_ID.kBulletData);

    _other.sendMessage(DC_MESSAGE_ID.kHit, data.getAttackPoints());

    // Kill bullet.

    _this.sendMessage(DC_MESSAGE_ID.kKill, _this);
    return;
  }
  
  init(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  { }

  update(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  { }

  receive(_id: number, _obj: any)
  : void 
  { }

  destroy()
  : void 
  { }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private constructor()
  { }

}