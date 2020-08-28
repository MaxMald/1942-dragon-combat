/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cnfArponBulletSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-27-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

export class CnfArponBulletSpawner
implements IConfigObject
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
 
  constructor()
  {
    this.pool_size = 4;
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
    return DC_CONFIG.kArponBulletSpawner;
  }

  getConfigName()
  : string 
  {
    return 'ArponBulletSpawnerConfig';
  }

  /**
   * Size of the ranger pool.
   */
  pool_size : number;
}