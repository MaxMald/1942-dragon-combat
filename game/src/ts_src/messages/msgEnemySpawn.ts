/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Spawn a especific type of enemy in the given position.
 *
 * @file msgEnemySpawn.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-09-2020
 */

import { DC_ENEMY_TYPE } from "../commons/1942enums";

/**
 * Spawn a especific type of enemy in the given position.
 */
export class MsgEnemySpawn
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor
  (
    _enemy_type : DC_ENEMY_TYPE,
    _x : number,
    _y : number
  )
  {
    this.enemy_type = _enemy_type;
    this.x = _x;
    this.y = _y;

    return;
  }
  
  /**
   * Enemy type.
   */
  enemy_type : DC_ENEMY_TYPE;

  /**
   * Position : x component.
   */
  x : number;

  /**
   * Position : y component.
   */
  y : number;
}