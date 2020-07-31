import { DC_ENEMY_TYPE } from "../../commons/1942enums";
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

import { Ty_physicsActor } from "../../commons/1942types";

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
   */
  spawn(_actor : Ty_physicsActor, _x : number, _y : number)
  : void;

  /**
   * Get identifier of the EnemySpawner.
   */
  getID()
  : DC_ENEMY_TYPE;

  /**
   * Safely destroys the EnemySpawner.
   */
  destroy()
  : void;
}