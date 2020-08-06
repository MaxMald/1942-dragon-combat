/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Provides a base controller for any enemy in the game. 
 *
 * @file iCmpEnemyController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-05-2020
 */

import { IBaseComponent } from "./iBaseComponent";
import { Ty_physicsSprite } from "../commons/1942types";
import { IEnemySpawner } from "../enemiesManager/enemySpawner/iEnemySpawner";
import { IEnemiesManager } from "../enemiesManager/iEnemiesManager";

/**
 * Provides a base controller for any enemy in the game.
 */
export interface ICmpEnemyController 
extends IBaseComponent<Ty_physicsSprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Get the collision damage caused by this actor when collide with another.
   */
  getCollisionDamage() 
  : integer;

  /**
   * Set the enemy spawner.
   * 
   * @param _spawner enemy spawner. 
   */
  setSpawner(_spawner : IEnemySpawner)
  : void;

  /**
   * Get the enemy spawner.
   * 
   * @returns enemy spawner.
   */
  getSpawner()
  : IEnemySpawner;

  /**
   * Set the enemies manager.
   * 
   * @param _enemyManager enemies manager. 
   */
  setEnemiesManager(_enemyManager : IEnemiesManager)
  : void;

  /**
   * Get the enemies manager.
   * 
   * @returns enemies manager.
   */
  getEnemiesManager()
  : IEnemiesManager;
}