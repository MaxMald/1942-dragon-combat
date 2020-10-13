/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file 1942config.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-07-2020
 */

import { Ty_TileObject } from "./1942types";

/**
 * 
 */
export class CnfBulletManager
{
  /**
   * Object's pool size.
   */
  pool_size : number;

  /**
   * Bullet sprite texture.
   */
  texture_key : string;

  /**
   * The base size of the playzone correspond to the game's canvas size, the
   * padding expands the borders of the playzone, so the bullets don't disapeer
   * just at the edge of the screen.
   */
  playzone_padding : number;
}

export function GetUIDepth()
: number
{
  return 20;
}

