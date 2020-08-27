/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cnfSonic.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-26-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

export class CnfSonic 
implements IConfigObject
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
 
  constructor()
  {
    this.collision_damage = 5.0;
    this.health = 2;
    this.coord_x = 0.0;
    this.coord_y = 0.0;
    this.mass = 1.0;
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

          case "health":

          this.health = property.value as number;
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

          case "coord_x":
          
          this.coord_x = property.value as number;
          break;

          case "coord_y":
          
          this.coord_y = property.value as number;
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
    return DC_CONFIG.kSonic;
  }

  getConfigName()
  : string 
  {
    return 'Sonic';
  }
  
  /**
   * Damage points inflicted to other agents if a collision occurs.
   */
  collision_damage : number;  

  /**
   * Dragon’s initial health points.
   */
  health : number;

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

  /**
   * 
   */
  mass : number;

  /**
   * Screen x coord.
   */
  coord_x : number;

  /**
   * Screen y coord.
   */
  coord_y : number;
}