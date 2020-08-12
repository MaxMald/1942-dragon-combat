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
import { DC_BULLET_TYPE } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsGroup, Ty_physicsSprite } from "../commons/1942types";
import { IBulletSpawner } from "./bulletSpawner/iBulletSpawner";

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
  update(_dt : number) 
  : void;

  /**
   * Adds a bullet spawner to this bullet manager.
   * 
   * @param _spawner bullet spawner.
   */
  addSpawner(_spawner : IBulletSpawner)
  : void;

  /**
   * Get a bullet spawner from this bullet manager.
   * 
   * @param _type bullet spawner identifier.
   * 
   * @returns bullet spawner. 
   */
  getSpawner(_type : DC_BULLET_TYPE)
  : IBulletSpawner;
  
  /**
   * Spawn a bullet in the world.
   * 
   * @param _x : position in x axis.
   * @param _y : position in y axis.
   * @param _type : bullet type.
   */
  spawn(_x : number, _y : number, _type : DC_BULLET_TYPE) 
  : void;

  /**
   * Get an actor from the pool.
   */
  getActor() 
  : Ty_physicsActor;

  /**
   * Disable the given actor.
   * 
   * @param _actor actor. 
   */
  disableActor(_actor : Ty_physicsActor)
  : void;

  /**
   * Get the object pool of this Bullet Manager.
   * 
   * @returns ObjectPool.
   */
  getPool() 
  : MxObjectPool<Ty_physicsActor>;

  /**
   * Add a collision detection against a group.
   * 
   * @param _scene The scene with the physics engine.
   * @param _bodies The bodies group.
   */
  collisionVsGroup
  (
    _scene : Phaser.Scene, 
    _bodies : Ty_physicsGroup
  ) : void;

  /**
   * Add a collision detection ageinst a sprite.
   * 
   * @param _scene the scene with the physics engine.
   * @param _body the sprite body.
   */
  collisionVsSprite
  (  
    _scene : Phaser.Scene,
    _body : Ty_physicsSprite
  ): void;

  /**
   * Destroy all the bullets of this BulletManager and clear the pool.
   */
  clear() 
  : void;

  /**
   * Safely destroys this Bullet Manager.
   */
  destroy() 
  : void;
}