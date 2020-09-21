/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file msgSpawnBullet.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-14-2020
 */

import { DC_BULLET_TYPE } from "../commons/1942enums";

export class MsgSpawnBullet
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor()
  {
    this.x = 0;
    this.y = 0;
    this.type = DC_BULLET_TYPE.kUndefined;
    this.config = undefined;
    return;
  }

  set(_x : number, _y : number, _type : DC_BULLET_TYPE, _config ?: any)
  : void
  {
    this.x = _x;
    this.y = _y;
    this.type = _type;
    this.config = _config;
    return;
  }
  
  /**
   * x position.
   */
  x : number;

  /**
   * y position.
   */
  y : number;

  /**
   * Bullet type.
   */
  type : DC_BULLET_TYPE;

  /**
   * config object.
   */
  config : any;
}