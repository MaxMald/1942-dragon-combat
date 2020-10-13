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
   * @param _cameraSpeed the speed of the camera.
   */
  update(_dt : number, _cameraSpeed : number)
  : void;

  receiveMessage(_id : number, _msg : any)
  : void;

  /**
   * Set the camera's height.
   * 
   * @param _height 
   */
  setCameraHeigth(_height : number)
  : void;  

  /**
   * Destroy the LevelGenerator.
   */
  destroy()
  : void;
}