/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpItemCollisionController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-19-2020
 */

import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor } from "../commons/1942types";
import { ICmpCollisionController } from "./iCmpCollisionController";
import { ICmpItemController } from "./iCmpItemController";

export class CmpItemCollisionController
implements ICmpCollisionController
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : CmpItemCollisionController
  {
    let controller = new CmpItemCollisionController();
    controller.m_id = DC_COMPONENT_ID.kCollisionController;

    return controller;
  }

  /**
   * Get the item controller of self, and send it to the other actor by the
   * "CollisionItem" message.
   * 
   * @param _other actor.
   * @param _this actor.
   */
  onCollision
  (
    _other: Ty_physicsActor, 
    _this: Ty_physicsActor
  ): void 
  {
    let itemController : ICmpItemController
      = _this.getComponent<ICmpItemController>(DC_COMPONENT_ID.kItemController);

    if(itemController != null)
    {
      _other.sendMessage
      (
        DC_MESSAGE_ID.kCollisionItem,
        itemController
      );
    }

    _this.sendMessage(DC_MESSAGE_ID.kDesactive, _this);
    return;
  }

  init(_actor: Ty_physicsActor)
  : void 
  { }

  update(_actor: Ty_physicsActor)
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
  
  /**
   * private constructor.
   */
  private constructor()
  { }
}