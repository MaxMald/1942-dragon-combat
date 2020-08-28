/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cnfArponBullet.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-27-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

export class CnfArponBullet 
implements IConfigObject
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
 
  constructor()
  {
    this.collider_radius = 25.0;
    this.collider_offset = 25.0;
    this.collision_damage = 1.0;
    this.speed = 2000.0;
    this.texture_key = "arpon_bullet";
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
          case "speed":

          this.speed = property.value as number;
          break;     
          
          case "collider_offset":

          this.collider_offset = property.value as number;
          break;

          case "collider_radius":

          this.collider_radius = property.value as number;
          break;

          case "collision_damage":

          this.collision_damage = property.value as number;
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
    return DC_CONFIG.kArponBullet;
  }

  getConfigName()
  : string 
  {
    return 'ArponBulletConfig';
  }

  collider_offset : number;

  collider_radius : number;

  collision_damage : number;

  speed : number;

  texture_key : string;
}