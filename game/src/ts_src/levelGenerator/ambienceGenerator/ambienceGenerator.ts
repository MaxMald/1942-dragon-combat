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
import { OPRESULT } from "commons/mxEnums";
import { HeightMap } from "./heightMap";

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
    this._m_surfacePainter.init();
    return;
  }

  /**
   * Creates a new HeightMap and destroys the previous if exists. These method
   * call the setHeightMap(HeightMap) method of the SurfacePainter.
   * 
   * @param _width Width of the map. 
   * @param _height Height of the map.
   * @param _amplitude Amplitude.
   * @param _ratio Ratio.
   */
  generateTerrainHeightMap
  (
    _width : number,
    _height : number,
    _amplitude ?: number,
    _ratio ?: number
  ) : OPRESULT
  { 
    if(this._m_heightMap != null) {
      this._m_heightMap.destroy();
    }

    this._m_heightMap = new HeightMap();    
    this._m_heightMap.init(_width, _height, _amplitude, _ratio);
    
    this._m_surfacePainter.setHeightMap(this._m_heightMap);

    return OPRESULT.kOk;
  }

  /**
   * Create the elements that draw the background ambience. The terrain height
   * map must be created before calling this method.
   * 
   * Returns OPRESULT.kFail if the terrain height map is not ready.
   * 
   * @param _scene The scene used to build the background shader.
   * @param _shaderKey The key of the shader used to draw the background terrain.
   * 
   * @returns OPRESULT.kOk if the opeartion was successful.
   */
  createBackgroundAmbience(_scene : Phaser.Scene, _shaderKey : string)
  : OPRESULT
  {
    // Check if the height map is ready.
    if(this._m_heightMap == null) {
      return OPRESULT.kFail;
    }

    // Create the ambiencec shader.
    return this._m_surfacePainter.createAmbiencecShader(_scene, _shaderKey);
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

  /**
   * Reference to the Height Map.
   */
  private _m_heightMap : HeightMap;
}