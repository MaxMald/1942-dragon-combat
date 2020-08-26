/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary  An EnemiesManager create, manage and provides Actors to build enemies. 
 * The EnemiesManager can spawn enemies using a collection of EnemySpawner objects.
 *
 * @file iEnemiesManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-30-2020
 */

import { IBulletManager } from "../bulletManager/iBulletManager";
import { DC_ENEMY_TYPE } from "../commons/1942enums";
import { Ty_physicsActor } from "../commons/1942types";
import { IEnemySpawner } from "./enemySpawner/iEnemySpawner";

/**
 * An EnemiesManager create, manage and provides Actors to build enemies. The
 * EnemiesManager can spawn enemies using a collection of EnemySpawner objects.
 */
export interface IEnemiesManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Set the bullet manager of this enemies manager.
   * 
   * @param _bulletManager bullet manager. 
   */
  setBulletManager(_bulletManager : IBulletManager)
  : void;

  /**
   * Get the bullet manager of this enemies manager.
   * 
   * @returns bullet manager.
   */
  getBulletManager()
  : IBulletManager;
  
  /**
   * Adds an EnemySpawner to this EnemiesManager. If exists an EnemySpawner with
   * the same ID, it will be destroyed and replaced by the new one.
   * 
   * @param _spawner EnemySpawner.
   */
  addSpawner(_spawner : IEnemySpawner)
  : void;

  /**
   * Get an EnemySpawner of this EnemiesManager.
   * 
   * @param _id EnemySpawner identifier.
   * 
   * @returns The EnemySpawner. If the EnemySpawner was not found, it will
   * returns the NullEnemySpawner object. 
   */
  getSpawner(_id : DC_ENEMY_TYPE)
  : IEnemySpawner;

  /**
   * Update the EnemyManager.
   * 
   * @param _dt delta time. 
   */
  update(_dt : number) 
  : void;

  /**
   * Spawn an enemy in the world.
   * 
   * @param _x position in x axis.
   * @param _y position in y axis.
   * @param _type enemy type.
   * @param _data optional data.
   */
  spawn(_x : number, _y : number, _type : DC_ENEMY_TYPE, _data ?: any) 
  : void;

  /**
   * Get an available Actor.
   */
  getActor() 
  : Ty_physicsActor;

  /**
   * Disable an actor.
   * 
   * @param _actor Actor. 
   */
  disableActor(_actor : Ty_physicsActor) 
  : void;

  /**
   * Safely destroys this EnemyManager.
   */
  destroy() 
  : void;
}