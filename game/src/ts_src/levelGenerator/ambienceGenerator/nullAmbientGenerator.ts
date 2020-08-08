/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Ambient generator without implemenation. 
 *
 * @file nullAmbientGenerator.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-07-2020
 */

import { IAmbientGenerator } from "./iAmbientGenerator";

/**
 * Ambient generator without implemenation.
 */
export class NullAmbientGenerator 
implements IAmbientGenerator
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/  

  constructor()
  { }  

  /**
   * No implentation.
   * 
   * @param _dt 
   */
  update(_dt: number)
  : void 
  { }

  /**
   * No implementation.
   * 
   * @param _speed 
   */
  setSpeed(_speed: number)
  : void 
  { }

  /**
   * No implementation.
   */
  destroy()
  : void
  { }
}