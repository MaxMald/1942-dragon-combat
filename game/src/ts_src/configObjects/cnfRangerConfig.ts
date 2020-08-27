/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cnfRangerConfig.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-25-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

export class CnfRangerConfig 
implements IConfigObject
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
 
  constructor()
  {
    this.collision_damage = 5.0;
    this.explosion_radius = 200.0;
    this.health = 2;
    this.mass = 1.0;
    this.life_time = 7.0;
    this.score = 5;
    this.speed = 300.0;
    this.steer_force = 200.0;
    this.texture_key = 'enemy_ranger';
    return;
  }

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
          case "collision_damage":

          this.collision_damage = property.value as number;
          break;

          case "explosion_radius":

          this.explosion_radius = property.value as number;
          break;

          case "health":

          this.health = property.value as number;
          break;

          case "life_time":

          this.life_time = property.value as number;
          break;

          case "score":

          this.score = property.value as number;
          break;

          case "speed":
          
          this.speed = property.value as number;
          break;

          case "steer_force":

          this.steer_force = property.value as number;
          break;

          case "texture_key":

          this.texture_key = property.value as string;
          break;

          case "mass":
          
          this.mass = property.value as number;
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
    return DC_CONFIG.kRanger;
  }

  getConfigName()
  : string 
  {
    return 'Ranger';
  }
  
  /**
   * Damage points inflicted to other agents if a collision occurs.
   */
  collision_damage : number;

  /**
   * The radius of the collider when the shield explodes. (pixels).
   */
  explosion_radius : number;

  /**
   * Dragon’s initial health points.
   */
  health : number;

  /**
   * Maximun time the ranger can live before it explodes. (seconds).
   */
  life_time : number;

  /**
   * Base points added to the score if this agent is destroyed.
   */
  score : number;

  /**
   * Dragon’s speed in the world (pix./sec.)
   */
  speed : number;

  /**
   * Magnitude applied to the steer force.
   */
  steer_force : number;

  /**
   * Sprite texture key.
   */
  texture_key : string;

  mass : number;
}