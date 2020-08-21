/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cnfBulletStateTriple.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-20-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

export class CnfBulletStateTriple
implements IConfigObject
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Create a configuration object with default values.
   */
  constructor()
  {
    this.frecuency = 8;
    this.secondsPerBullet = 1.0 / 8.0;
    this.opening = 30;
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
          case "frecuency":
          
          this.frecuency = property.value as number;
          break;

          case "opening":

          this.opening = property.value as number;
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
    return DC_CONFIG.kHeroBulletStateTriple;
  }

  getConfigName()
  : string 
  {
    return 'Hero_bulletStateTripleShot';
  }

  /**
   * Number of bullets fire per seconds. 
   */
  frecuency : number;

  /**
   * Seconds elapsed per bullet.
   */
  secondsPerBullet : number;

  /**
   * Bullet opening angle. (Degrees).
   */
  opening : number;
}