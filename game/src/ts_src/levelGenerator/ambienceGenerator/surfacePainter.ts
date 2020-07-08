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
   * Set the perlin noise texture.
   * 
   * @param _pelinTexture The perlin noise texture. 
   */
  setPerlinTexture(_pelinTexture : Phaser.Textures.Texture)
  : void
  {
    this._m_terrainPerlinTexture = _pelinTexture;
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
      || this._m_terrainPerlinTexture == null) 
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
    a_textureKeys.push(this._m_terrainPerlinTexture.key);

    // Create the Phaser Shader Gameobject.
    let shader : Phaser.GameObjects.Shader = _scene.add.shader
    (
        _shaderKey,
        0,
        0, 
        _scene.game.canvas.width, 
        _scene.game.canvas.height,
        a_textureKeys
    );
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
    this._m_terrainPerlinTexture = null;
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
   * This texture describes the "height" of the terrain. A completely black color
   * represent the lowest terrain level, however the white color represent the
   * highest terrain level.
   */
  private _m_terrainPerlinTexture : Phaser.Textures.Texture;

  /**
   * This shader is used to draw the background surface. This shader should
   * have available the first and second texture slots for the 
   */
  private _m_surfaceShader : CmpShader;
}