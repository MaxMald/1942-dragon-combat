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
   * Creates a new Canvas Texture with the TextureManager. This texture will store 
   * terrain height map data used to draw the the background terrain.
   * 
   * If a canvas texture (with the same key) already exists, it will be destroyed 
   * and repleaced by the new one.
   * 
   * @param _textureManager The TextureManager used to create the Canvas Texture.
   * @param _textureKey The key to identify the new Canvas Texture.
   * @param _blockWidth The width of the texture block.
   * @param _blocHeight The height of the texture block.
   * 
   * @returns OPRESULT.kOk if the operation was successful.
   */
  generateTerrainHeightMap
  (
    _textureManager : Phaser.Textures.TextureManager,
    _textureKey : string,
    _blockWidth : integer,
    _blockHeight : integer,
  )
  : OPRESULT
  {
    /*
    // If a texture with the same key already exists, destroy it.
    if(_textureManager.exists(_textureKey)) {
      _textureManager.remove(_textureKey);
    }

    // Create the canvas texture.
    this._m_terrainHeightMap 
      = _textureManager.createCanvas(_textureKey, _blockWidth, _blockHeight);

    // Paint each pixel with a red color.
    let x : integer = 0;
    let y : integer = 0;
    while(y < _blockHeight) {
      while(x < _blockWidth) {
        this._m_terrainHeightMap.setPixel(x, y, 255, 0, 0, 255);
        ++x;
      }
      x = 0;
      ++y;
    }

    // Refresh the texture.
    this._m_terrainHeightMap.refresh();
*/
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
    //if(this._m_terrainHeightMap == null) {
      //return OPRESULT.kOk;
    //}

    // Set the height map texture.
    //this._m_surfacePainter.setPerlinTexture(this._m_terrainHeightMap);

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

    // Is prefered to destroy this element with the TextureManager's remove()
    // method.
    this._m_terrainHeightMap = null;
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
   * This texture has the information about the height map used to draw
   * the terrain in the background of the scene.
   */
  private _m_terrainHeightMap : Phaser.Textures.CanvasTexture; 
}