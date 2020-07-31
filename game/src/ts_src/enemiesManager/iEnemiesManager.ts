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

import { Ty_physicsActor } from "../commons/1942types";

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
   * Update the EnemyManager.
   * 
   * @param _dt delta time. 
   */
  update(_dt : number) : void;

  /**
   * Spawn an enemy in the world.
   * 
   * @param _x position in x axis.
   * @param _y position in y axis.
   * @param _type enemy type.
   */
  spawn(_x : number, _y : number, _type : integer) : void;

  /**
   * Get an available Actor.
   */
  getActor() : Ty_physicsActor;

  /**
   * Safely destroys this EnemyManager.
   */
  destroy() : void;
}