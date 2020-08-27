/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpHeroCollision.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-26-2020
 */

import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor } from "../commons/1942types";
import { ICmpCollisionController } from "./iCmpCollisionController";

export class CmpHeroCollision 
implements ICmpCollisionController
{
  static Create()
  : CmpHeroCollision
  {
    let cmp = new CmpHeroCollision();

    cmp.m_id = DC_COMPONENT_ID.kCollisionController;

    return cmp;
  }

  onCollision(_other: Ty_physicsActor, _this: Ty_physicsActor)
  : void 
  {
    _other.sendMessage
    (
      DC_MESSAGE_ID.kCollisionWithHero,
      _this
    );
    return;
  }

  init(_actor: Ty_physicsActor)
  : void 
  { return; }

  update(_actor: Ty_physicsActor)
  : void 
  { return; }

  receive(_id: number, _obj: any)
  : void 
  { return; }

  destroy()
  : void 
  { return; }

  m_id: number;
  
}