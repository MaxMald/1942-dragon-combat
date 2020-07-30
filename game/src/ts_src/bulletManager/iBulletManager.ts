/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file iBulletManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-29-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { BaseActor } from "../actors/baseActor";

type Bullet = BaseActor<Phaser.Physics.Arcade.Sprite>;

/**
 * Base interface of a Bullet Manager.
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
  getPool() : MxObjectPool<Bullet>;

  /**
   * Destroy all the bullets of this BulletManager and clear the pool.
   */
  clear() : void;

  /**
   * Safely destroys this Bullet Manager.
   */
  destroy() : void;
}