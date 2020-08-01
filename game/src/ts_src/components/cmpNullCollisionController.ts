import { DC_COMPONENT_ID } from "../commons/1942enums";
/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary CollisionController without implementations. Avaliable by its
 * GetInstance() static method.
 * 
 * @file cmpNullCollisionController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-31-2020
 */

import { Ty_physicsActor } from "../commons/1942types";
import { ICmpCollisionController } from "./iCmpCollisionController";

/**
 * CollisionController without implementations. Avaliable by its GetInstance()
 * static method.
 */
export class CmpNullCollisionController implements ICmpCollisionController
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Start the module.
   */
  static Prepare()
  : void
  {
    if(CmpNullCollisionController._INSTANCE == null)
    {
      CmpNullCollisionController._INSTANCE = new CmpNullCollisionController();
      CmpNullCollisionController._INSTANCE.m_id 
        = DC_COMPONENT_ID.kCollisionController;
    }
    return;
  }

  /**
   * Shutdown the module.
   */
  static Shutdown()
  : void
  {
    CmpNullCollisionController._INSTANCE = null;
    return;
  }

  /**
   * Get the singleton.
   */
  static GetInstance()
  : CmpNullCollisionController
  {
    return CmpNullCollisionController._INSTANCE;
  }

  /**
   * No implementation.
   */
  onCollision
  (
    _other: Ty_physicsActor, 
    _this: Ty_physicsActor
  ): void 
  { }

  /**
   * No implementation.
   */
  init(_actor: Ty_physicsActor)
  : void 
  { }

  /**
   * No implementation.
   */
  update(_actor: Ty_physicsActor)
  : void 
  { }

  /**
   * No implementation.
   */
  receive(_id: number, _obj: any)
  : void 
  { }

  /**
   * No implementation.
   */
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
   * The module singleton.
   */
  private static _INSTANCE : CmpNullCollisionController;

}