import { NullState } from "../../../../../game/src/ts_src/states/nullState";
import { GameManager } from "../../../../../game/src/ts_src/gameManager/gameManager";
import { CnfBulletManager, CnfHero } from "../../../../../game/src/ts_src/commons/1942config";
import { AmbienceGeneratorConfig } from "../../../../../game/src/ts_src/levelGenerator/ambienceGenerator/ambienceGeneratorConfig";
import { BulletManager } from "../../../../../game/src/ts_src/bulletManager/bulletManager";
import { HeroBasicBulletSpawner } from "../../../../../game/src/ts_src/bulletManager/bulletSpawner/heroBasicBulletSpawner";

export class Test extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  preload()
  : void
  {
    this.load.path = "../assets/";

    ///////////////////////////////////
    // Atlas

    this.load.atlas
    (
      "DragonFlight",
      "atlas/DragonFlight.png",
      "atlas/DragonFlight.js"
    );

    ///////////////////////////////////
    // Shaders

    this.load.glsl
    (
      {
        key : 'terrain_painter_01',
        shaderType : 'fragment',
        url : 'shaders/terrain_painter_01.frag' 
      }
    );

    ///////////////////////////////////
    // Animations

    this.load.animation
    (
      "dragon_anim",
      "animations/DragonFlight.json"
    );   

    ///////////////////////////////////
    // Images    

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

    this.load.image
    (
      'fireball',
      'images/fireball.png'
    );

    this.load.image
    (
      'enemy',
      'images/enemy.png'
    );

    ///////////////////////////////////
    // Configuration Files

    // Hero's configuration file.

    this.load.text
    (
      'cnf_hero',
      'configFiles/cnf_hero_001.json'
    );

    // Hero's BulletManager file.

    this.load.text
    (
      'cnf_bulletManager_hero',
      'configFiles/cnf_bulletManager_001.json'
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
    // Prepare Modules

    NullState.Prepare();
   
    // game manager.

    GameManager.Prepare();

    let gameManager : GameManager = GameManager.GetInstance();

    ///////////////////////////////////
    // Level Generator

    gameManager.initLevelGenerator();

    ///////////////////////////////////
    // Ambient Generator

    let ambientGenConfig : AmbienceGeneratorConfig
      = JSON.parse(this.game.cache.text.get('cnf_ambient'));

    gameManager.initAmbientGenerator(this, ambientGenConfig);

    ///////////////////////////////////
    // Hero's Bullet Manager

    let cnfBulletMng : CnfBulletManager 
      = JSON.parse(this.game.cache.text.get('cnf_bulletManager_hero'));

    let bulletMng : BulletManager = BulletManager.Create();

    let padding = cnfBulletMng.playzone_padding;
    let canvas = this.game.canvas;

    bulletMng.init
    (
      this,
      cnfBulletMng.pool_size,
      cnfBulletMng.texture_key,
      new Phaser.Geom.Point(-padding, -padding),
      new Phaser.Geom.Point(canvas.width + padding, canvas.height + padding)
    );

    // BulletSpawner : Basic Bullet.

    let heroBulletSpawner = HeroBasicBulletSpawner.Create
    (
      new Phaser.Math.Vector2(0.0, -1.0),
      1200
    );

    bulletMng.addSpawner(heroBulletSpawner); 

    ///////////////////////////////////
    // Player Controller
       
    let heroConfig : CnfHero 
      = JSON.parse(this.game.cache.text.get('cnf_hero'));

    heroConfig.x = this.game.canvas.width * 0.5;
    heroConfig.y = this.game.canvas.height * 0.5;
    
    gameManager.initHero(this, heroConfig);

    // Bounds the playercontroller with the bullet manager

    let playercontroller = gameManager.getPlayerController();

    playercontroller.setBulletManager(bulletMng);

    ///////////////////////////////////
    // Level Generator

    gameManager.initLevelGenerator();
    
    this._m_gameManager = gameManager;
    return;
  }

  update(_time : number, _delta : number)
  : void
  {  
    let dt : number = _delta * 0.001;    
    this._m_gameManager.update(dt);
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/ 

  /**
   * Reference to the game manager.
   */
  private _m_gameManager : GameManager;

}