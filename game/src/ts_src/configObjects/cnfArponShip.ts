/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cnfArponShip.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-27-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

export class CnfArponShip
implements IConfigObject
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
 
  constructor()
  {
    this.collision_damage = 5.0;
    this.health = 2;    
    this.mass = 1.0;
    this.score = 5;
    this.speed = 300.0;
    this.steer_force = 200.0;
    this.frequency = 1;
    this.texture_key = 'arpon_ship';
    this.weapon_texture_key = "arpon_weapon";
    this.secondsPerBullet = 1.0 / this.frequency;
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

          case "fire_rate":

          this.frequency = property.value as number;
          if(this.frequency > 0.0)
          {
            this.secondsPerBullet = 1.0 / this.frequency;
          }
          else
          {
            this.secondsPerBullet = 1000.0;
          }
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

          case "weapon_texture_key":

          this.weapon_texture_key = property.value as string;
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
    return DC_CONFIG.kArponShip;
  }

  getConfigName()
  : string 
  {
    return 'ArponShip';
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
   * Sprite texture key of the weapon.
   */
  weapon_texture_key : string;

  /**
   * 
   */
  mass : number;

  /**
   * 
   */
  frequency : number;

  secondsPerBullet : number;
  
}