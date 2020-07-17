import { LevelGenerator } from "../../../../../game/src/ts_src/levelGenerator/levelGenerator";
import { AmbienceGenerator } from "../../../../../game/src/ts_src/levelGenerator/ambienceGenerator/ambienceGenerator";
import { AmbienceGeneratorConfig } from "../../../../../game/src/ts_src/levelGenerator/ambienceGenerator/ambienceGeneratorConfig";

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

    this.load.text
    (
      'ambConfigFile',
      'configFiles/ambGen_01.json'
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

    let config : AmbienceGeneratorConfig 
      = JSON.parse(this.cache.text.get('ambConfigFile'));
    
    ambienceGenerator.init(this, config);
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_levelGenerator : LevelGenerator;
}