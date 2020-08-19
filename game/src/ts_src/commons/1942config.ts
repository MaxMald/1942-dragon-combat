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

/****************************************************/
/* Hero                                             */
/****************************************************/

/**
 * Hero's configuration object.
 */
export class CnfHero
{
  /**
   * Create a new configuration object with default properties.
   */
  constructor()
  {
    this.x = 500;
    this.y = 500;
    this.texture = "DragonFlight";
    this.frame = "D001_Flight.png";
    this.movement_mode = "MIXED";
    this.maximum_speed = 500;
    this.health = 10;
    this.score = 0;
    this.fireRate = 8;    
    this.barrel_roll_duration = 1.0;
    this.hero_playzone_padding = 100;

    this.bulletManager_key = "cnf_bulletManager_hero";

    return;
  }

  /**
   * Initial position in the x axis.
   */
  x : number;

  /**
   * Initial position in the y axis.
   */
  y : number;

  /**
   * Hero's Texture key.
   */
  texture : string;

  /**
   * Hero's Frame key.
   */
  frame : string;

  /**
   * Set the control behaviour when the pointer is pressed.
   * 
   * RELATIVE: Relative movement moves the player the same ammount and direction 
   * as the pointer's movement.
   * 
   * ABSOLUTE: Moves the hero to the pointer position in the world.
   * 
   * MIXED: Mixed movement set the X position of the player at the X position of 
   * the pointer, but keep a relative position at the Y axis.
   */
  movement_mode : string;

  /**
   * Set the player maximum speed (pixels per frame) when the player moves 
   * towards the pointer position (ABSOLUTE).
   */
  maximum_speed : number;

  /**
   * Initial health points.
   */
  health : number;

  /**
   * Initial score points.
   */
  score : number;

  /**
   * Number of bullets spawned per second.
   */
  fireRate : number;

  /**
   * 
   */
  barrel_roll_duration : number;

  /**
   * The base size of the playzone correspond to the game's canvas size, the 
   * padding shrink the borders of the playzone, so the player can't go outside
   * of the canvas.
   */
  hero_playzone_padding : number;

  /**
   * Key of the bullet manager.
   */
  bulletManager_key : string;
}

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

