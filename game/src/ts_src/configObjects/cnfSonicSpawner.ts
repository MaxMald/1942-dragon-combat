/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cnfSonicSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-26-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

export class CnfSonicSpawner
implements IConfigObject
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
 
  constructor()
  {
    this.pool_size = 2;
    this.playZone_padding = 100;
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
          case "pool_size":

          this.pool_size = property.value as number;
          break;     
          
          case "playZone_padding":

          this.playZone_padding = property.value as number;
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
    return DC_CONFIG.kSonicSpawner;
  }

  getConfigName()
  : string 
  {
    return 'SonicSpawnerConfig';
  }

  /**
   * Size of the ranger pool.
   */
  pool_size : number;

  playZone_padding : number;
}