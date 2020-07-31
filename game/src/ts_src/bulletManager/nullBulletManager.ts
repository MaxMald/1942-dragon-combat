/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary This class has no implementations, it is used by the GameManager
 * when no implementation of the IBulletManager was given.
 *
 * @file nullBulletManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-29-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { Ty_physicsActor } from "../commons/1942types";
import { IBulletManager } from "./iBulletManager";

/**
 * This class has no implementations, it is used by the GameManager when no 
 * implementation of the IBulletManager was given.
 */
export class NullBulletManager implements IBulletManager
{ 

  /**
   * Creates a BulletManager with no implementations. It will have an empty
   * pool.
   */
  constructor()
  { 
    this._m_pool = MxObjectPool.Create();
    this._m_pool.init(new Array<Ty_physicsActor>());
    return;
  }

  /****************************************************/
  /* Public                                           */
  /****************************************************/ 

  /**
   * No implementation.
   * 
   * @param _dt 
   */
  update(_dt : number) 
  : void
  { }

  /**
   * No implementation.
   */
  spawn(_x : number, _y : number) : void 
  {
    console.log("NullBulletManager : spawn.");
    return;
  };

  /**
   * Returns an empty pool.
   * 
   * @returns empty pool.
   */
  getPool() : MxObjectPool<Ty_physicsActor> 
  {
    console.log("NullBulletManager : get pool.");
    return this._m_pool; 
  }

  /**
   * No implementation.
   */
  clear() : void 
  {
    console.log("NullBulletManager : clear.");
    return;
  }

  /**
   * Destroys its empty pool.
   */
  destroy() : void 
  { 
    this._m_pool.destroy();
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Empty pool.
   */
  private _m_pool : MxObjectPool<Ty_physicsActor>;
}