/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cnfCanus.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-20-2020
 */

import { DC_CONFIG, DC_SECONDARY_ACTION } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";

export class CnfCanus
{
  /**
   * Create a configuration object with default values.
   */
  constructor()
  {
    
    this.speed = 100.0;
    this.texture_key = "dragon_fruit";
    this.direction_x = 0.0;
    this.direction_y = 1.0;
    return;
  }

  /**
   * Set this configuration object from a tiled object.
   * 
   * @param _object tiled object. 
   */
  setFromObject(_object : Ty_TileObject)
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

          case "texture":

          this.texture_key = property.value as string;
          break;

          case "direction_x":

          this.direction_x = property.value as number;
          break;

          case "direction_y":

          this.direction_y = property.value as number;
          break;

          case "action" :

          {
            let value = property.value as string;
            
            if(value === 'SHIELD')
            {
              this.effect_id = DC_SECONDARY_ACTION.kShield;
            }
            else if(value === 'TRIPLE_SHOT')
            {
              this.effect_id = DC_SECONDARY_ACTION.KTripleShot;
            }
          }
          break;

          default:
          break;
        }

        ++index;
      }
    }
  }

  /**
   * Get the configuration object identifier.
   * 
   * @reaturns id.
   */
  getID()
  : DC_CONFIG 
  {
    return DC_CONFIG.kCanus;
  }

  /**
   * Get the name of the configuration object.
   */
  getConfigName()
  : string
  {
    return "CanusConfig";
  }

  /**
   * Texture key.
   */
  texture_key : string;

  /**
   * The speed of the item in the world (pix./sec.).
   */
  speed : number;

  /**
   * X component of the force direction.
   */
  direction_x : number;

  /**
   * Y component of the force direction.
   */
  direction_y : number;

  /**
   * ID of the secondary action.
   */
  effect_id : DC_SECONDARY_ACTION;
}