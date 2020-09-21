/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cnfBalsaruShrink.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-09-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

/**
 * 
 */
export class CnfBalsaruShrink 
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
    this.ball_expand_scale = 1.5;
    this.time = 2.0;
    this.length = 500;  
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
          case "ball_expand_scale":
          
          this.ball_expand_scale = property.value as number;
          break;

          case "time":
          
          this.time = property.value as number;
          break;

          case "length":

          this.length = property.value as integer;
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
    return DC_CONFIG.kBalsaruShrink;
  }

  getConfigName()
  : string 
  {
    return 'BalsaruShrink';
  }

  length : integer;

  time : number;

  ball_expand_scale: number;
}