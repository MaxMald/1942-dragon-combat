import { DC_ENEMY_TYPE } from "../../commons/1942enums";
import { Ty_physicsActor } from "../../commons/1942types";
/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary An EnemySpawner without implementations. 
 *
 * @file nullEnemySpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-31-2020
 */

import { IEnemySpawner } from "./iEnemySpawner";

/**
 * An EnemySpawner without implementations.
 */
export class NullEnemySpwaner implements IEnemySpawner
{ 
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * No implementation.
   * 
   * @param _dt 
   */
  update(_dt: number)
  : void 
  {
    return;
  }

  /**
   * No implementation.
   * 
   * @param _actor : actor where the components are going to be assembled.
   * @param _x 
   * @param _y 
   */
  spawn(_actor : Ty_physicsActor, _x: number, _y: number)
  : void 
  {
    return;
  }

  /**
   * Get identifier of the EnemySpawner.
   */
  getID()
  : DC_ENEMY_TYPE
  {
    return DC_ENEMY_TYPE.kUndefined;
  }

  /**
   * No implementation.
   */
  destroy()
  : void 
  {
    return;
  }
}