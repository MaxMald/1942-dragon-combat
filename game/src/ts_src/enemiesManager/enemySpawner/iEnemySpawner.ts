/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary An EnemySpawner spawns an especific type of enemy in the world. The
 * EnemySpawner is responsable for assemble and disassemble the components that
 * defines the behaviour of the enemy.
 *
 * @file iEnemySpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-31-2020
 */

import { IBulletManager } from "../../bulletManager/iBulletManager";
import { DC_ENEMY_TYPE } from "../../commons/1942enums";
import { Ty_physicsActor } from "../../commons/1942types";
import { IEnemiesManager } from "../iEnemiesManager";

/**
 * An EnemySpawner spawns an especific type of enemy in the world. The
 * EnemySpawner is responsable for assemble and disassemble the components that
 * defines the behaviour of the enemy. 
 */
export interface IEnemySpawner 
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Update the EnemySpawner.
   * 
   * @param _dt delta time. 
   */
  update(_dt : number)
  : void;

  /**
   * Spawn an enemy in the world.
   * 
   * @param _actor : actor where the components are going to be assembled.
   * @param _x x position. 
   * @param _y y position.
   * @param _data optional data.
   */
  spawn(_actor : Ty_physicsActor, _x : number, _y : number, _data ?: any)
  : void;

  /**
   * Set the bullet manager of this spawner.
   */
  setBulletManager(_bulletManager : IBulletManager)
  : void;

  /**
   * Get the bullet manager of this spawner.
   */
  getBulletManager()
  : IBulletManager;

  /**
   * Set the EnemiesManager that this spawner belongs.
   * 
   * @param _enemiesManager 
   */
  setEnemiesManager(_enemiesManager : IEnemiesManager)
  : void;

  /**
   * Get the EnemiesManager that this spawner belongs.
   * 
   * @returns EnemiesManager.
   */
  getEnemiesManager()
  : IEnemiesManager;  

  /**
   * Get identifier of the EnemySpawner.
   */
  getID()
  : DC_ENEMY_TYPE;

  /**
   * Assemble the components into the Actor.
   * 
   * @param _actor Actor. 
   */
  assemble(_actor : Ty_physicsActor, _data ?: any)
  : void;

  /**
   * Disassemble the component of the given actor.
   * 
   * @param _actor Actor.
   */
  disasemble(_actor : Ty_physicsActor)
  : void;

  /**
   * Safely destroys the EnemySpawner.
   */
  destroy()
  : void;
}