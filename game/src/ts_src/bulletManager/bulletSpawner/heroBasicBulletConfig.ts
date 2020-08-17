/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Defines the hero bullet properties. 
 *
 * @file heroBasicBulletConfig.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-17-2020
 */

 /**
  * Defines the hero bullet properties.
  */
export class heroBasicBulletConfig
{
  /**
   * New object with default values.
   */
  constructor()
  {

    this.speed = 1200.0;
    this.collision_damage = 1;
    this.texture_key = "fireball";
    return;
  }
  
  /**
   * Bullet’s speed in the world (pix./sec.)
   */
  speed : number;

  /**
   * Damage points inflicted to other agents if a collision occurs.
   */
  collision_damage : number;

  /**
   * Sprite texture key.
   */
  texture_key : string;
}