/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Configuration object of the hero's basic bullet. 
 *
 * @file cnfHeroBasicBullet.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-20-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

/**
 * Configuration object of the hero's basic bullet.
 */
export class CnfHeroBasicBullet 
implements IConfigObject
{
  /**
   * Create a configuration object with default values.
   */
  constructor()
  {
    
    this.collision_damage = 1.0;
    this.speed = 1200.0;
    this.texture_key = "fireball";
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

          case "texture_key":

          this.texture_key = property.value as string;
          break;

          case "collision_damage":

          this.collision_damage = property.value as number;
          break;

          default:
          break;
        }
        ++index;
      }
    }
    return;
  }

  /**
   * Get the configuration object identifier.
   * 
   * @reaturns id.
   */
  getID()
  : DC_CONFIG 
  {
    return DC_CONFIG.kHeroBasicBullet;
  }

  /**
   * Get the name of the configuration object.
   */
  getConfigName()
  : string
  {
    return "HeroBasicBulletConfig";
  }

  /**
   * Texture key.
   */
  texture_key : string;

  /**
   * Collision Damage.
   */
  collision_damage : number;

  /**
   * Bullet’s speed in the world (pix./sec.)
   */
  speed : number;
}