/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Hero's power shield configuration object.
 *
 * @file cnfPowerShield.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-21-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

 /**
  * Hero's power shield configuration object.
  */
export class CnfPowerShield
implements IConfigObject
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Create a power shield with default values.
   */
  constructor()
  {

    this.max_radius = 300.0;
    this.min_radius = 15.0;
    this.collision_damage = 10000;
    this.explosion_radius = 600.0;
    this.explosion_time = 1.0;
    this.texture_key = "hero_shield";
    this.shield_max_time = 3.0;

    return;
  }

  setFromObject
  (
    _object: Ty_TileObject
  )
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
         
          case 'collision_damager' :

          this.collision_damage = property.value as number;
          break;

          case 'explosion_radius' :

          this.explosion_radius = property.value as number;
          break;

          case 'explosion_time' :

          this.explosion_time = property.value as number;
          break;

          case 'max_radius' :

          this.max_radius = property.value as number;
          break;

          case 'min_radius' :

          this.min_radius = property.value as number;
          break;

          case 'shield_max_time' :

          this.shield_max_time = property.value as number;
          break;

          case 'texture_key' :

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
    return DC_CONFIG.kHeroPowerShield;
  }

  getConfigName()
  : string 
  {
    return "HeroPowerShieldConfig";
  }

  /**
   * Damage points inflicted to other agents if a collision occurs.
   */
  collision_damage : number;

  /**
   * The radius of the collider when the shield explodes. (pixels).
   */
  explosion_radius : number;

  /**
   * The duration of the explosion.
   */
  explosion_time : number;

  /**
   * Maximum radius the shield can reach when growing. (pixels).
   */
  max_radius : number;

  /**
   * Minimum radius the shield can reach when growing. (pixels).
   */
  min_radius : number;

  /**
   * Maximun time the shield can live before it explodes. (seconds).
   */
  shield_max_time : number;

  /**
   * Sprite key of the power shield.
   */
  texture_key : string;
}