import { LevelGenerator } from "../../../../../game/src/ts_src/levelGenerator/levelGenerator";
import { AmbienceGenerator } from "../../../../../game/src/ts_src/levelGenerator/ambienceGenerator/ambienceGenerator";
import { SurfacePainter } from "../../../../../game/src/ts_src/levelGenerator/ambienceGenerator/surfacePainter";
import { OPRESULT } from "commons/mxEnums";

export class Test extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  preload()
  : void
  {
    this.load.path = "../assets/";
    this.load.glsl
    (
      {
        key : 'terrain_painter_01',
        shaderType : 'fragment',
        url : 'shaders/terrain_painter_01.frag' 
      }
    );

    this.load.image
    (
      'colorTerrainTexture',
      'images/terrain_01.png'
    );

    this.load.image
    (
      'perlinTexture',
      'images/perlin_256_01.png'
    );

    this.load.image
    (
      'waterNormalMap',
      'images/water_normal.png'
    );
    return;
  }
  
  create()
  : void
  {
    this._m_levelGenerator = new LevelGenerator();
    this._m_levelGenerator.init();

    let ambienceGenerator : AmbienceGenerator 
      = this._m_levelGenerator.getAmbienceGenerator();

    let surfacePainter : SurfacePainter
      = ambienceGenerator.getSurfacePainter();

    surfacePainter.setTerrainColorTexture
    (
      this.textures.get('colorTerrainTexture')
    );

    surfacePainter.setTerrainMap
    (
      this.textures.get('waterNormalMap')
    );

    // Create the height map.
    ambienceGenerator.generateTerrainHeightMap
    (
      256,
      256,
      0.015,
      this.game.canvas.width / this.game.canvas.height
    );

    let result : OPRESULT =
      ambienceGenerator.createBackgroundAmbience(this, 'terrain_painter_01');    
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_levelGenerator : LevelGenerator;
}