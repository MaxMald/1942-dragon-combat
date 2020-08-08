/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file nullLevelGenerator.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-07-2020
 */

import { ILevelGenerator } from "./iLevelGenerator";

export class NullLevelGenerator
implements ILevelGenerator
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * No implementation.
   * 
   * @param _dt delta time. 
   */
  update(_dt: any)
  : void 
  { }

  /**
   * No implementation.
   */
  destroy()
  : void 
  { }
}