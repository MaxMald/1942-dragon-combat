/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cnfBalsaruEvade.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since October-05-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

/**
 * 
 */
export class CnfBalsaruEvade 
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
    this.collision_radius = 250.0;

    this.dash_angle_threshold = 18.0;
    
    this.dash_cooldown = 5.0;

    this.dash_destination_angle = 45.0;

    this.dash_speed = 6000.0;

    this.duration = 5.0;

    this.flee_max_speed = 3000.0;

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
          case "collision_radius":
          
          this.collision_radius = property.value as number;
          break;

          case "dash_angle_threshold":
          
          this.dash_angle_threshold = property.value as number;
          break;

          case "dash_cooldown":

          this.dash_cooldown = property.value as number;
          break;

          case "dash_destination_angle":

          this.dash_destination_angle = property.value as number;
          break;

          case "dash_speed":

          this.dash_speed = property.value as number;
          break;

          case "duration":

          this.duration = property.value as number;
          break;

          case "flee_max_speed":

          this.flee_max_speed = property.value as number;
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
    return DC_CONFIG.kBalsaruEvade;
  }

  getConfigName()
  : string 
  {
    return 'BalsaruEvade';
  }

  collision_radius : number;

  dash_angle_threshold : number;

  dash_cooldown : number;

  dash_destination_angle : number;

  dash_speed : number;

  duration : number;

  flee_max_speed : number;
}