/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Defines the bullet properties.
 *
 * @file cnfEnemyBasicBullet.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-13-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

 /**
  * Defines the bullet properties.
  */
export class CnfEnemyBasicBullet
implements IConfigObject
{

  /**
   * New object with default values.
   */
  constructor()
  {
    this.speed = 1200.0;
    this.collision_damage = 1;
    this.health = 1;
    this.texture_key = "fireball";
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
    return DC_CONFIG.kEnemyBasicBullet;
  }

  getConfigName()
  : string 
  {
    return 'EnemyBasicBulletConfig';
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
   * Bullet’s initial health points.
   */
  health : number;

  /**
   * Sprite texture key.
   */
  texture_key : string;

}