/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file nullLevelGenerator.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-07-2020
 */

import { Ty_TileMap } from "../commons/1942types";
import { CnfCadmio } from "../configObjects/cnfCadmio";
import { CnfItemManager } from "../configObjects/cnfItemManager";
import { ILevelGenerator } from "./iLevelGenerator";

export class NullLevelGenerator
implements ILevelGenerator
{  
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * No implementation.
   * @param _map 
   */
  loadMap(_map: Ty_TileMap)
  : void 
  { }

  /**
   * No implementation.
   * 
   * @param _dt delta time.
   * @param _distance distance. 
   */
  update(_dt: number, _distance : number)
  : void 
  { }

  /**
   * No implemenation.
   * 
   * @param _height 
   */
  setCameraHeigth(_height: number)
  : void 
  { }  

  /**
   * Get the cadmio configuration object.
   * 
   * @returns cadmio config object.
   */
  getCadmioConfig()
  : CnfCadmio
  {
    return new CnfCadmio();
  }

  /**
   * Get the item manager configuartion object.
   * 
   * @returns item manager config object.
   */
  getItemManagerConfig()
  : CnfItemManager
  {
    return new CnfItemManager();
  }

  /**
   * No implementation.
   */
  destroy()
  : void 
  { }
}