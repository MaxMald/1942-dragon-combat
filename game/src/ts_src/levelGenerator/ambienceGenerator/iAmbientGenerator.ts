/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary An AmbientGenerator draws the background and place ambient props
 * over the scene, furthermore control these elements positions to generate the
 * illusion of movement. 
 *
 * @file iAmbientGenerator.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-07-2020
 */

 /**
 * An AmbientGenerator draws the background and place ambient props over
 * the scene, furthermore control these elements positions to generate
 * the illusion of movement.
 */
export interface IAmbientGenerator
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Update the AmbientGenerator.
   * 
   * @param _dt delta time. 
   */
  update(_dt : number)
  : void;

  /**
   * Set the speed of ambient props and terrain surfacec.
   * 
   * @param _speed speed. 
   */
  setSpeed(_speed : number)
  : void;

  /**
   * Destroys the AmbientGenerator.
   */
  destroy()
  : void;
} 