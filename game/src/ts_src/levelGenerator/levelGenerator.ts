/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary The LevelGenerator create the game scene like the ambience background,
 * props, items and enemies.
 *
 * @file levelGenerator.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-08-2020
 */

import { ILevelGenerator } from "./iLevelGenerator";

 /**
  * The LevelGenerator create the game scene like the ambience background,
  * props, items and enemies.
  */
export class LevelGenerator
implements ILevelGenerator
{ 
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Create and initalize this LevelGenerator's member. This method should be 
   * called once after the creation of this LevelGenerator.
   */
  init()
  : void
  {
    return;
  }

  /**
   * Updates the LevelGenerator.
   * 
   * @param _dt delta time. 
   */
  update(_dt: any)
  : void 
  { }

  /**
   * Call the destroy() method of each member in this LeveGenerator. Destroy
   * this object's properties.
   */
  destroy()
  : void
  {  
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/  
 
}