import { LevelGenerator } from "../../../../../game/src/ts_src/levelGenerator/levelGenerator";
import { AmbienceGenerator } from "../../../../../game/src/ts_src/levelGenerator/ambienceGenerator/ambienceGenerator";
import { AmbienceGeneratorConfig } from "../../../../../game/src/ts_src/levelGenerator/ambienceGenerator/ambienceGeneratorConfig";
import { HeightMap } from "../../../../../game/src/ts_src/levelGenerator/ambienceGenerator/heightMap";
import { SurfacePainter } from "../../../../../game/src/ts_src/levelGenerator/ambienceGenerator/surfacePainter";
import { GameManager } from "../../../../../game/src/ts_src/gameManager/gameManager";

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
        url : 'shaders/terrain_painter_02.frag' 
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

    // Ambient Generator file.

    this.load.text
    (
      'cnf_ambient',
      'configFiles/cnf_ambient_001.json'
    );
    return;
  }
  
  create()
  : void
  {
     ///////////////////////////////////
     // GameManager

     GameManager.Prepare();

     let gameManager : GameManager = GameManager.GetInstance();
     gameManager.setGameScene(this);
    
    ///////////////////////////////////
    // Ambient Generator

    let ambientGenConfig : AmbienceGeneratorConfig
      = JSON.parse(this.game.cache.text.get('cnf_ambient'));

    gameManager.initAmbientGenerator(this, ambientGenConfig);
    
    let ambienceGenerator = gameManager.getAmbientGenerator() as AmbienceGenerator;
    
    this.vegetation(ambienceGenerator.getHeightMap());
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

    while(pointSet.length) 
    {
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
    return;
  }  
}