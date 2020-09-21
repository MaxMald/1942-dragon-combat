/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cnfKalebio.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-18-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

/**
 * Hero's configuration object.
 */
export class CnfKalebio
implements IConfigObject
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

    this.collider_height = 30;

    this.collider_width = 30;

    this.collider_x = 0;

    this.collider_y = 0;

    return;
  }

  /**
   * Setup this configuration oject from a Tiled Object properties.
   * 
   * @param _object Tiled object. 
   */
  setFromObject(_object: Ty_TileObject)
  : void 
  {
    if(_object.properties != undefined)
    {
      let aProperties : Array<any> = _object.properties;
      let index = 0;
      let property : any;

      while(index < aProperties.length)
      {
        property = aProperties[index];

        switch(property.name)
        {
          case "barrel_roll_duration":
          
          this.barrel_roll_duration = property.value as number;
          break;

          case "bulletManager_key":

          this.bulletManager_key = property.value as string;
          break;

          case "collider_height":

          this.collider_height = property.value as number;
          break;

          case "collider_width":

          this.collider_width = property.value as number;
          break;

          case "collider_x":

          this.collider_x = property.value as number;
          break;

          case "collider_y":

          this.collider_y = property.value as number;
          break;

          case "fireRate":

          this.fireRate = property.value as number;
          break;

          case "frame":

          this.frame = property.value as string;
          break;

          case "health":

          this.health = property.value as number;
          break;

          case "maximum_speed":

          this.maximum_speed = property.value as number;
          break;

          case "movement_mode":

          this.movement_mode = property.value as string;
          break;

          case "score":

          this.score = property.value as number;
          break;

          case "texture":

          this.texture = property.value as string;
          break;

          case "x":

          this.x = property.value as number;
          break;

          case "y":

          this.y = property.value as number;
          break;

          default:
          break;
        }

        ++index;
      }
    }
    return;
  }

  getID()
  : DC_CONFIG 
  {
    return DC_CONFIG.kKalebio;
  }

  getConfigName()
  : string 
  {
    return 'KalebioConfig';
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

  collider_height : number;

  collider_width : number;

  collider_x : number;

  collider_y : number;
}