/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Defines the enemy properties. 
 *
 * @file erranteConfig.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-13-2020
 */

 /**
  * Defines the enemy properties.
  */
export class ErranteConfig
{
  
  /**
   * Creates a configuration file with default values.
   */
  constructor()
  {

    this.speed = 500.0;
    this.fire_rate = 0.5;
    this._fire_rate_sec = 2;
    this.collision_damage = 1;
    this.health = 2;
    this.score = 1;
    this.texture_key = "enemy";

    return;
  }

  /**
   * Dragon's speed in the world (pix./sec.).
   */
  speed : number;

  /**
   * Dragon's fire rate (bullets/sec.).
   */
  fire_rate : number;

  /**
   * Damage points inflicted to other agents if a collision occurs.
   */
  collision_damage : number;

  /**
   * Dragon's initial health points.
   */
  health : number;

  /**
   * Base points added to the score if this agent is destroyed.
   */
  score : number;

  /**
   * The texture key of the sprite.
   */
  texture_key : string;

  /**
   * Dragon’s fire rate in seconds per bullet. Defined by the enemy controller.
   */
  _fire_rate_sec : number;
}