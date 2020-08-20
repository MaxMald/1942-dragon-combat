/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file iLevelGenerator.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-07-2020
 */

import { Ty_TileMap } from "../commons/1942types";
import { CnfCadmio } from "../configObjects/cnfCadmio";
import { CnfItemManager } from "../configObjects/cnfItemManager";

export interface ILevelGenerator
{

  /**
   * Load tiled map objects.
   * 
   * @param _map tiled map. 
   */
  loadMap(_map : Ty_TileMap)
  : void;

  /**
   * Update the LevelGenerator.
   * 
   * @param _dt delta time.
   * @param _distance distance traveled by the camera.
   */
  update(_dt : number, _distance : number)
  : void;

  /**
   * Set the camera's height.
   * 
   * @param _height 
   */
  setCameraHeigth(_height : number)
  : void;

  /**
   * Get the cadmio configuration object.
   * 
   * @returns cadmio config object.
   */
  getCadmioConfig()
  : CnfCadmio;

  /**
   * Get the item manager configuartion object.
   * 
   * @returns item manager config object.
   */
  getItemManagerConfig()
  : CnfItemManager;

  /**
   * Destroy the LevelGenerator.
   */
  destroy()
  : void;
}