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

import { AmbienceGenerator } from "./ambienceGenerator/ambienceGenerator";

 /**
  * The LevelGenerator create the game scene like the ambience background,
  * props, items and enemies.
  */
export class LevelGenerator
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
    this._m_ambienceGenerator  = new AmbienceGenerator();
    this._m_ambienceGenerator.init();
    return;
  }

  /**
   * Get the AmbienceGenerator of this LevelGenerator.
   * 
   * @returns AmbienceGenerator instance.
   */
  getAmbienceGenerator()
  : AmbienceGenerator
  {
    return this._m_ambienceGenerator;
  }

  /**
   * Call the destroy() method of each member in this LeveGenerator. Destroy
   * this object's properties.
   */
  destroy()
  : void
  {
    this._m_ambienceGenerator.destroy();
    this._m_ambienceGenerator = null;
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * AmbienceGenerator.
   */
  private _m_ambienceGenerator : AmbienceGenerator;
}