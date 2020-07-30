import { LevelGenerator } from "../../../../../game/src/ts_src/levelGenerator/levelGenerator";
import { AmbienceGenerator } from "../../../../../game/src/ts_src/levelGenerator/ambienceGenerator/ambienceGenerator";
import { AmbienceGeneratorConfig } from "../../../../../game/src/ts_src/levelGenerator/ambienceGenerator/ambienceGeneratorConfig";
import { HeightMap } from "../../../../../game/src/ts_src/levelGenerator/ambienceGenerator/heightMap";
import { SurfacePainter } from "../../../../../game/src/ts_src/levelGenerator/ambienceGenerator/surfacePainter";

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

    this.load.atlas
    (
      "summer_props",
      "atlas/rpg_summer_tileset_props.png",
      "atlas/rpg_summer_tileset_props.js"
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
    this._m_distance = 0.0;

    this._m_levelGenerator = new LevelGenerator();
    this._m_levelGenerator.init();

    let ambienceGenerator : AmbienceGenerator 
      = this._m_levelGenerator.getAmbienceGenerator();    

    let config : AmbienceGeneratorConfig 
      = JSON.parse(this.cache.text.get('ambConfigFile'));
    
    ambienceGenerator.init(this, config);
    
    this.vegetation(ambienceGenerator.getHeightMap());
    this._m_surfacePainter = ambienceGenerator.getSurfacePainter();
    return;
  }

  vegetation(_hMap : HeightMap)
  : void
  {
    let pointSet : Array<Phaser.Geom.Point> = MxTools.PseudoRandom.MxHalton.GetPointSet(300);

    pointSet.sort
    (
      function(_a : Phaser.Geom.Point, _b : Phaser.Geom.Point)
      : number
      {
        return _a.y - _b.y;
      }
    );

    let width : number = this.game.canvas.width;
    let height : number = this.game.canvas.height;
    
    let point : Phaser.Geom.Point;
    let sprite : Phaser.GameObjects.Sprite;

    while(pointSet.length) {
      point = pointSet.pop();

      if(_hMap.getF(point.x, point.y * 0.25) > 190)
      {
        sprite = this.add.sprite
        (
          point.x * width,
          height - (point.y * height),
          'summer_props',
          'tree_' + ((Phaser.Math.RND.integerInRange(0, 100) % 6) + 1) + '.png'
        );

        sprite.setScale(0.4, 0.4);
      }
    }

    return;
  }

  update(_time : number, _delta : number)
  : void
  {
    //this._m_distance += (_delta * 0.001) * 0.03;   

    this._m_surfacePainter.update(this._m_distance);
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_levelGenerator : LevelGenerator;

  private _m_surfacePainter : SurfacePainter;

  private _m_distance : number;
}