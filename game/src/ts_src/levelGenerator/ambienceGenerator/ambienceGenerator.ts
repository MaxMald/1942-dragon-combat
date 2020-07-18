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
import { AmbienceGeneratorConfig } from "./ambienceGeneratorConfig";

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
   * 
   * A configuration object can be used to prepare the AmbienceGenerator.
   */
  init(_scene : Phaser.Scene, _config ?: AmbienceGeneratorConfig)
  : void 
  {
    this._m_surfacePainter = new SurfacePainter();
    this._m_surfacePainter.init();

    if(_config === undefined) {
      return;
    }

    ///////////////////////////////////
    // Textures

    if(_config.colorTextureKey !== undefined) {
      if(_scene.textures.exists(_config.colorTextureKey)) {
        this._m_surfacePainter.setTerrainColorTexture
        (
          _scene.textures.get(_config.colorTextureKey)
        );
      }
      else {
        console.error('Texture: ' + _config.colorTextureKey + ' not found.');
      }
    }

    if(_config.mapsTextureKey !== undefined) {
      if(_scene.textures.exists(_config.mapsTextureKey)) {
        this._m_surfacePainter.setTerrainMap
        (
          _scene.textures.get(_config.mapsTextureKey)
        );
      }
      else {
        console.error('Texture: ' + _config.mapsTextureKey + ' not found. ');
      }
    }

    ///////////////////////////////////
    // Height Map
    
    if(_config.noise_height === undefined || _config.noise_width == undefined) {
      _config.noise_width = 256;
      _config.noise_height = 256;
    }

    this.generateTerrainHeightMap
    (
      _config.noise_width, 
      _config.noise_height,
      _config.noise_amplitude,
      _scene.game.canvas.width / _scene.game.canvas.height
    );

    ///////////////////////////////////
    // Surface Painter Shader

    if(_config.terrainShaderKey !== undefined) {
      if(_scene.cache.shader.exists(_config.terrainShaderKey)){
        this.createBackgroundAmbience
        (
          _scene,
          _config.terrainShaderKey,
          _config.dataTexture_width,
          _config.dataTexture_height
        );
      }
      else {
        console.error('Shader: ' + _config.terrainShaderKey + ' not found.');
      }
    }
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
   * @param _texDataWidth The width of the Texture of data.
   * @param _texDataHeight The height of the Texture of data.
   * 
   * @returns OPRESULT.kOk if the opeartion was successful.
   */
  createBackgroundAmbience
  (
    _scene : Phaser.Scene, 
    _shaderKey : string, 
    _texDataWidth : integer, 
    _texDataHeight : integer
  )
  : OPRESULT
  {
    // Check if the height map is ready.
    if(this._m_heightMap == null) {
      return OPRESULT.kFail;
    }

    // Create the ambiencec shader.
    return this._m_surfacePainter.createAmbiencecShader
    (
      _scene, 
      _shaderKey,
      _texDataWidth,
      _texDataHeight
    );
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

  getHeightMap()
  : HeightMap
  {
    return this._m_heightMap;
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