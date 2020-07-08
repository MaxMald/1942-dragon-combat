/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary The AmbienceGenerator draw the background and place ambience props over
 * the scene, furthermore control these elements positions to generate
 * the illusion of movement.
 *
 * @file ambienceGenerator.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-08-2020
 */

import { SurfacePainter } from "./surfacePainter";

/**
 * The AmbienceGenerator draw the background and place ambience props over
 * the scene, furthermore control these elements positions to generate
 * the illusion of movement.
 */
export class AmbienceGenerator 
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Create and initalize this AmbienceGenerator's members. This method should 
   * be called once after the creation of this AmbienceGenerator.
   */
  init()
  : void 
  {
    this._m_surfacePainter = new SurfacePainter();
    return;
  }

  /**
   * Get the SurfacePainter instance of this AmbienceGenerator.
   * 
   * @returns SurfacePainter instance.
   */
  getSurfacePainter()
  : SurfacePainter
  {
    return this._m_surfacePainter;
  }

  /**
   * Call the destroy() method of all members.
   */
  destroy()
  : void
  {
    this._m_surfacePainter.destroy();
    this._m_surfacePainter = null;

    return;
  }
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * The SurfacePainter of this AmbienceGenerator.
   */
  private _m_surfacePainter : SurfacePainter;
}