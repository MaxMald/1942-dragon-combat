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
   * No implementation.
   */
  destroy()
  : void 
  { }
}