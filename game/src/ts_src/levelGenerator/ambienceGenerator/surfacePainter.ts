/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary The SurfacePainter draw the background ambience, as well as some effects
 * like the light reflection over the water.
 *
 * @file surfacePainter.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-08-2020
 */

import { OPRESULT } from "commons/mxEnums";
import { CmpShader } from "behaviour/components/cmpShader";
import { CustomTextureShader } from "./customTextureShader";
import { HeightMap } from "./heightMap";

 /**
  * The SurfacePainter draw the background ambience, as well as some effects
  * like the light reflection over the water.
  */
export class SurfacePainter
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  init()
  : void
  {
    return;
  }

  /**
   * Set the terrain color texture.
   * 
   * @param _terrainColorTexture The terrain color texture.
   */
  setTerrainColorTexture(_terrainColorTexture : Phaser.Textures.Texture)
  : void
  {
    this._m_terrainColorTexture = _terrainColorTexture;
    return;
  }

  /**
   * Set the HeightMap of this surface painter.
   * 
   * @param _heightMap The height map.
   */
  setHeightMap(_heightMap : HeightMap)
  : void
  {
    this._m_heightMap = _heightMap;
    return;
  }

  /**
   * Set the terrain maps for this SurfacePainter.
   * 
   * @param _terrainMaps Texture with the terrain maps used by this surface painter.
   */
  setTerrainMap(_terrainMaps : Phaser.Textures.Texture)
  : void
  {
    this._m_terrainMaps = _terrainMaps;
    return;
  }

  /**
   * Creates the Shader used to draw the ambience background. This method creates
   * and prepare the shader. If a Shader already exists, it will be destroyed 
   * and replaced by a new one.
   * 
   * The shader will take place at the (0.0,0.0) position with an origin of (0.0,0.0), 
   * and will have the same size as the game's canvas. The shader depth will be
   * set to 1000.0.
   * 
   * The shader should have available the iChannel0 and iChannel1. The first one 
   * is used for the perlin noise texture, the second one for the terrain color 
   * texture.
   * 
   * The SurfacePainter should have the terrain color texture and perlin noise
   * texture before calling this method, otherwise it will returns an 
   * OPRESULT.kFail.
   * 
   * @param _scene The scene where the shader will be created. 
   * @param _shaderKey The key of the shader.
   * 
   * @returns OPRESULT.kOk if the operation was successful.
   */
  createAmbiencecShader(_scene : Phaser.Scene, _shaderKey : string)
  : OPRESULT
  {
    // Check if the SurfacePainter is ready to create its ambience shader.
    if(this._m_terrainColorTexture == null 
      || this._m_heightMap == null
      || this._m_terrainMaps == null) 
    {
      return OPRESULT.kFail;  
    }

    // Destroy the previous shader if it exists.
    if(this._m_surfaceShader != null) {
      this._m_surfaceShader.destroy();
      this._m_surfaceShader = null;
    }

    // set an array with the textures keys.
    let a_textureKeys : string[] = new Array<string>();
    a_textureKeys.push(this._m_terrainColorTexture.key);
    a_textureKeys.push(this._m_terrainMaps.key);
    
    let width : integer = this._m_heightMap.getWidth();
    let height : integer = this._m_heightMap.getHeight();

    let pixelLength : integer = 4; // RGBA

    let a_pixels : Uint8Array = new Uint8Array(pixelLength * width * height);

    let col : integer = 0;
    let row : integer = 0;
    let baseIndex : integer = 0;
    let heightValue : integer = 0;

    let rowSize : integer = width * pixelLength;
    
    while(row < height) {
      
      while(col < width) {

        baseIndex = (rowSize * row) + (col * pixelLength);
        heightValue = this._m_heightMap.get(col, row);

        a_pixels[baseIndex] = heightValue;
        a_pixels[baseIndex + 1] = heightValue;
        a_pixels[baseIndex + 2] = heightValue;
        a_pixels[baseIndex + 3] = 255;
        
        ++col;
      }

      col = 0;
      ++row;
    }
    
    let shader : CustomTextureShader = new CustomTextureShader
    (
      _scene, 
      _shaderKey,
      0.0,
      0.0,
      _scene.game.canvas.width, 
      _scene.game.canvas.height,
      a_textureKeys
    );

    // Add the shader to the scene.
    _scene.children.add(shader);
    
    let context = _scene.game.context as WebGLRenderingContext;
    shader.prepare(a_pixels, context.RGBA, width, height, 2);    

    shader.setOrigin(0.0, 0.0);
    shader.setDepth(1000.0);

    // Create the Shader Component.
    this._m_surfaceShader = new CmpShader();
    this._m_surfaceShader.prepare(shader);

    return OPRESULT.kOk;
  }

  /**
   * Safely destroys the SurfacePainter. This method destroys the Shader, but
   * don't destroy the terrain color texture and perlin noise texture.
   */
  destroy()
  : void
  {
    if(this._m_surfaceShader != null) {
      this._m_surfaceShader.destroy();
      this._m_surfaceShader = null;
    }

    this._m_terrainColorTexture = null;
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * This texture is used to paint the terrain color according to the "height"
   * of in the perlin texture.
   */
  private _m_terrainColorTexture : Phaser.Textures.Texture; 

  /**
   * This texture have the normal map for water reflection.
   */
  private _m_terrainMaps : Phaser.Textures.Texture;

  /**
   * This shader is used to draw the background surface. This shader should
   * have available the iChannel0 and iChannel1. The first one is used for the
   * perlin noise texture, the second one for the terrain color texture.
   */
  private _m_surfaceShader : CmpShader;

  /**
   * Height map.
   */
  private _m_heightMap : HeightMap;
}