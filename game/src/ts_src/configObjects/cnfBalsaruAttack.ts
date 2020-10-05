/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cnfBalsaruAttack.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since October-05-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

/**
 * 
 */
export class CnfBalsaruAttack 
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
    this.fire_rate = 0.3;

    this.duration = 5.0;

    this.seek_max_speed = 3000.0;

    return;
  }  

  /**
   * Setup this configuration object from a Tiled Object properties.
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
          case "fire_rate":

          this.fire_rate = property.value as number;
          break;

          case "duration":

          this.duration = property.value as number;
          break;

          case "seek_max_speed":

          this.seek_max_speed = property.value as number;
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
    return DC_CONFIG.kBalsaruAttack;
  }

  getConfigName()
  : string 
  {
    return 'BalsaruAttack';
  }

  fire_rate : number;

  duration : number;

  seek_max_speed : number;
}