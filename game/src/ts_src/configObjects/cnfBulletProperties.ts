/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cnfBulletProperties.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-20-2020
 */

import { V2 } from "../commons/1942types";

/**
 * Define bullet properties.
 */
export class CnfBulletProperties
{
  /**
   * Create a bullet properties configuration object with default values.
   */
  public constructor()
  {
    this.speed = 1200.0;
    this.direction = new Phaser.Math.Vector2(0.0, 1.0);
    this.texture = 'fireball';

    return;
  }

  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Bullet speed.
   */
  speed : number;

  /**
   * Bullet direction.
   */
  direction : V2;

  /**
   * Bullet texture key.
   */
  texture : string;
}