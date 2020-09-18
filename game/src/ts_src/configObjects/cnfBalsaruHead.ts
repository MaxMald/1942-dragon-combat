/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cnfBalsaruHead.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-16-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

export class CnfBalsaruHead
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
    this.mass = 1.0;

    this.neck_length = 540;

    this.speed = 600.0;

    this.visionRadius = 200;

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
          case "neck_length":
          
          this.neck_length = property.value as number;
          break;

          case "mass":

          this.mass = property.value as number;
          break;

          case "speed":

          this.speed = property.value as number;
          break;

          case "vision_radius":

          this.visionRadius = property.value as number;
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
    return DC_CONFIG.kBalsaruHead;
  }

  getConfigName()
  : string 
  {
    return 'BalsaruHead';
  }

  /**
   * Maximum length of Balsaru's neck.
   */
  neck_length : number;

  /**
   * The balsaru's head mass.
   */
  mass : number;
  
  /**
   * The maximum speed of Balsaru's head.
   */
  speed : number;

  /**
   * How far a balsaru can detect coming objects.
   */
  visionRadius : number;
}
