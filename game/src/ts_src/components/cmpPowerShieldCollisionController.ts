/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpPowerShieldCollisionController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-21-2020
 */

import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor } from "../commons/1942types";
import { ICmpCollisionController } from "./iCmpCollisionController";

export class CmpPowerShieldCollisionController
implements ICmpCollisionController
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : CmpPowerShieldCollisionController
  {
    let cmp = new CmpPowerShieldCollisionController();
    cmp.m_id = DC_COMPONENT_ID.kCollisionController;

    return cmp;
  }
  
  onCollision
  (
    _other: Ty_physicsActor, 
    _this: Ty_physicsActor
  ): void 
  {
    _other.sendMessage
    (
      DC_MESSAGE_ID.kKill,
      _other
    );
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
  
}