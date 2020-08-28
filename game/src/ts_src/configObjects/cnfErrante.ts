/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cnfErrante.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-28-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

export class CnfErrante 
implements IConfigObject
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
 
  constructor()
  {
    this.collision_damage = 1.0;
    this.hasWeapon = true;
    this.init_time = 0.0;
    this.health = 2;
    this.score = 1;
    this.speed = 500.0;
    this.frequency = 1;
    this.texture_key = 'enemy';
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

          case "init_time":

          this.init_time = property.value as number;
          break;
          
          case "has_weapon":

          this.hasWeapon = property.value as boolean;
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

          case "texture_key":

          this.texture_key = property.value as string;
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
    return DC_CONFIG.kErrante;
  }

  getConfigName()
  : string 
  {
    return 'Errante';
  }

  /**
   * Indicates if this agent can fire.
   */
  hasWeapon : boolean;
  
  /**
   * Damage points inflicted to other agents if a collision occurs.
   */
  collision_damage : number;  

  /**
   * Initial time value, for fire mechanism.
   */
  init_time : number;

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
   * Sprite texture key.
   */
  texture_key : string;

  /**
   * 
   */
  frequency : number;

  secondsPerBullet : number;
  
}