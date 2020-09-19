/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Hero Bullet State : Normal, configuration object.
 *
 * @file cnfBalsaruInit.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-20-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

/**
 * Hero Bullet State : Normal, configuration object.
 */
export class CnfBalsaruInit 
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
    this.num_neck_balls = 10;

    this.texture_neck_ball = 'balsaru_neck_ball';
    this.texture_ship = 'balsaru_ship';
    this.texture_head = 'balsaru_head';  
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
          case "num_neck_balls":
          
          this.num_neck_balls = property.value as number;
          break;

          case "texture_ship":

          this.texture_ship = property.value as string;
          break;

          case "texture_head":

          this.texture_head = property.value as string;
          break;

          case "texture_neck_ball":

          this.texture_neck_ball = property.value as string;
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
    return DC_CONFIG.kBalsaruInit;
  }

  getConfigName()
  : string 
  {
    return 'BalsaruInit';
  }

  num_neck_balls : number;

  texture_neck_ball : string;
  
  texture_head : string;

  texture_ship : string;
}
