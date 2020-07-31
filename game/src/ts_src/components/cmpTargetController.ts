/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpTargetController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-30-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID } from "../commons/1942enums";
import { ICmpCollisionController } from "./iCmpCollisionController";

export class CmpTargetController implements ICmpCollisionController
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  static Create()
  : CmpTargetController
  {
    let controller = new CmpTargetController();

    controller.m_id = DC_COMPONENT_ID.kCollisionController;

    return controller;
  }

  init(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  { 
    this.m_color = new Phaser.Display.Color();
  }

  update(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  { }

  receive(_id: number, _obj: any)
  : void 
  { }

  destroy()
  : void 
  { }

  onCollision
  (
    _other: BaseActor<Phaser.Physics.Arcade.Sprite>, 
    _this: BaseActor<Phaser.Physics.Arcade.Sprite>
  ): void 
  {
    let sprite = _this.getWrappedInstance();
    sprite.setTint(this.m_color.random().color);
    return;    
  }

  m_id: number;

  m_color : Phaser.Display.Color;

}