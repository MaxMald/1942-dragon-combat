/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary A BulletManager creates, manage and provides bullets of an especific
 * type.
 *
 * It has a fixed pool of actors, that behave as bullets.
 *
 * @file iBulletManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-29-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { Ty_physicsActor } from "../commons/1942types";

/**
 * A BulletManager creates, manage and provides bullets of an especific type.
 * 
 * It has a fixed pool of actors, that behave as bullets.
 */
export interface IBulletManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Update the BulletManager.
   * 
   * @param _dt delta time. 
   */
  update(_dt : number) : void;
  
  /**
   * Spawn a bullet in the world.
   */
  spawn(_x : number, _y : number) : void;

  /**
   * Get the object pool of this Bullet Manager.
   * 
   * @returns ObjectPool.
   */
  getPool() : MxObjectPool<Ty_physicsActor>;

  /**
   * Destroy all the bullets of this BulletManager and clear the pool.
   */
  clear() : void;

  /**
   * Safely destroys this Bullet Manager.
   */
  destroy() : void;
}