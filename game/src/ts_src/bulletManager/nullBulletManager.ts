/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Null object implementation for the BulletManager. 
 *
 * @file nullBulletManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-29-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { BaseActor } from "../actors/baseActor";
import { IBulletManager } from "./iBulletManager";

type Bullet = BaseActor<Phaser.Physics.Arcade.Sprite>;

/**
 * Null object implementation for the BulletManager.
 */
export class NullBulletManager implements IBulletManager
{ 
  constructor()
  { 
    this._m_pool = MxObjectPool.Create();
    this._m_pool.init(new Array<Bullet>());
    return;
  }

  /****************************************************/
  /* Public                                           */
  /****************************************************/ 

  update(_dt : number) 
  : void
  { }

  /**
   * Spawn a bullet in the world.
   */
  spawn(_x : number, _y : number) : void 
  {
    console.log("NullBulletManager : spawn.");
    return;
  };

  /**
   * Get the object pool of this Bullet Manager.
   * 
   * @returns ObjectPool.
   */
  getPool() : MxObjectPool<Bullet> 
  {
    console.log("NullBulletManager : get pool.");
    return this._m_pool; 
  }

  /**
   * Destroy all the bullets of this BulletManager and clear the pool.
   */
  clear() : void 
  {
    console.log("NullBulletManager : clear.");
    return;
  }

  /**
   * Safely destroys this Bullet Manager.
   */
  destroy() : void 
  { 
    this._m_pool.destroy();

    console.log("NullBulletManager : destroy.");
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Object pool of Phaser Sprites (bullets).
   */
  private _m_pool : MxObjectPool<Bullet>;
}