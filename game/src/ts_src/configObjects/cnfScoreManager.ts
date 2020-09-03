/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cnfScoreManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-31-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

export class CnfScoreManager 
implements IConfigObject
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor()
  {
    this.kill_for_add = 1;
    this.init_score = 0;

    this.range_A_min = 95;
    this.range_A_mult = 4;

    this.range_B_min = 75;
    this.range_B_mult = 3;

    this.range_C_min = 50;
    this.range_C_mult = 2;

    this.stars_AAA_min = 1000;
    this.stars_AA_min = 500;
    this.stars_A_min = 100;

    return;
  }
  
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
         
          case 'kills_for_add' :

          this.kill_for_add = property.value as number;
          break;

          case 'range_A_min' :

          this.range_A_min = property.value as number;
          break;

          case 'range_A_mult' :

          this.range_A_mult = property.value as number;
          break;

          case 'range_B_min' :

          this.range_B_min = property.value as number;
          break;

          case 'range_B_mult' :

          this.range_B_mult = property.value as number;
          break;

          case 'range_C_min' :

          this.range_C_min = property.value as number;
          break;

          case 'range_C_mult' :

          this.range_C_mult = property.value as number;
          break;

          case 'stars_AAA_min' :

          this.stars_AAA_min = property.value as number;
          break;

          case 'stars_AA_min' :

          this.stars_AA_min = property.value as number;
          break;

          case 'stars_A_min' :

          this.stars_A_min = property.value as number;
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
    return DC_CONFIG.kScoreManager;
  }

  getConfigName()
  : string 
  {
    return 'ScoreManagerConfig';
  }

  /**
   * Kills needed to add the score multiplier.
   */
  kill_for_add : number;

  range_A_min : number;

  range_A_mult : number;

  range_B_min : number;

  range_B_mult : number;

  range_C_min : number;

  range_C_mult : number;

  stars_AAA_min : number;

  stars_AA_min : number;

  stars_A_min : number;

  /**
   * Initial score points.
   */
  init_score : number;
}