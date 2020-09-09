/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cnfBalsaruIdle.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-08-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

/**
 * 
 */
export class CnfBalsaruIdle 
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
    this.neck_amplitude = 100;
    this.neck_period = 1;
    this.length = 1000;  
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
          case "neck_amplitude":
          
          this.neck_amplitude = property.value as integer;
          break;

          case "neck_period":
          
          this.neck_period = property.value as number;
          break;

          case "length":

          this.length = property.value as number;
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
    return DC_CONFIG.kBalsaruIdle;
  }

  getConfigName()
  : string 
  {
    return 'BalsaruIdle';
  }

  neck_amplitude : integer;

  neck_period : number;

  length : number;
}