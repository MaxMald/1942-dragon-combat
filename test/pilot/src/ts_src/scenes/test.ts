import { NullState } from "../../../../../game/src/ts_src/states/nullState";
import { GameManager } from "../../../../../game/src/ts_src/gameManager/gameManager";
import { CnfBulletManager, CnfHero } from "../../../../../game/src/ts_src/commons/1942config";
import { AmbienceGeneratorConfig } from "../../../../../game/src/ts_src/levelGenerator/ambienceGenerator/ambienceGeneratorConfig";
import { BulletManager } from "../../../../../game/src/ts_src/bulletManager/bulletManager";
import { HeroBasicBulletSpawner } from "../../../../../game/src/ts_src/bulletManager/bulletSpawner/heroBasicBulletSpawner";
import { LevelGeneratorConfig } from "../../../../../game/src/ts_src/levelGenerator/levelGeneratorConfig";
import { LevelConfig } from "../../../../../game/src/ts_src/gameManager/levelConfig";
import { EnemyBasicBulletSpawner } from "../../../../../game/src/ts_src/bulletManager/bulletSpawner/enemyBasicBulletSpawner";
import { EnemiesManager } from "../../../../../game/src/ts_src/enemiesManager/enemiesManager";
import { ErranteSpawner } from "../../../../../game/src/ts_src/enemiesManager/enemySpawner/erranteSpawner";
import { UIManager } from "../../../../../game/src/ts_src/uiManager/UIManager";

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
        url : 'shaders/terrain_painter_02.frag' 
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
    // Tiled Map

    this.load.tilemapTiledJSON
    (
      'map_pilot',
      'levels/tlevel_pilot_001.json'
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

    // Enemies BulletManager file.
    this.load.text
    (
      'cnf_bulletManager_enemies',
      'configFiles/cnf_bulletManager_002.json'
    );

    // Errante Spawner file.

    this.load.text
    (
      'cnf_spawner_errante',
      'configFiles/cnf_spawner_errante_001.json'
    );

    // Ambient Generator file.

    this.load.text
    (
      'cnf_ambient',
      'configFiles/cnf_ambient_001.json'
    );

    // Level Generator file.

    this.load.text
    (
      'cnf_pilot',
      'configFiles/cnf_level_001.json'
    );

    // Scene file.

    this.load.text
    (
      'cnf_pilot_scene',
      'configFiles/cnf_scene_001.json'
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
    // Scene Configuration

    let sceneConfig : LevelConfig 
      = JSON.parse(this.game.cache.text.get('cnf_pilot_scene'));

    gameManager.setCameraSpeed(sceneConfig.camera_speed);

    ///////////////////////////////////
    // Ambient Generator

    let ambientGenConfig : AmbienceGeneratorConfig
      = JSON.parse(this.game.cache.text.get('cnf_ambient'));

    gameManager.initAmbientGenerator(this, ambientGenConfig);

    ///////////////////////////////////
    // Level Generator

    let levelGenConfig : LevelGeneratorConfig 
      = JSON.parse(this.game.cache.text.get('cnf_pilot'));

    gameManager.initLevelGenerator(this, levelGenConfig);

    ///////////////////////////////////
    // Enemy Manager

    ///////////////////////////////////
    // Bullet Manager : Enemies

    let canvas = this.game.canvas;

    let cnfEnemiesBulletMng : CnfBulletManager 
      = JSON.parse(this.game.cache.text.get('cnf_bulletManager_enemies'));

    let enim_bulletManager = BulletManager.Create();
    let enim_padding = cnfEnemiesBulletMng.playzone_padding;

    enim_bulletManager.init
    (
      this,
      cnfEnemiesBulletMng.pool_size,
      cnfEnemiesBulletMng.texture_key,
      new Phaser.Geom.Point(-enim_padding, -enim_padding),
      new Phaser.Geom.Point
      (
        canvas.width + enim_padding, 
        canvas.height + enim_padding
      )
    );

    let enemyBulletSpawner = EnemyBasicBulletSpawner.Create();

    enim_bulletManager.addSpawner(enemyBulletSpawner);    

    ///////////////////////////////////
    // Enemies Manager

    let enemiesManager : EnemiesManager = EnemiesManager.Create();

    let enemiesManagerConfig 
      = JSON.parse(this.game.cache.text.get('cnf_spawner_errante'));

    enemiesManager.init(this, enemiesManagerConfig);

    enemiesManager.setBulletManager(enim_bulletManager);

    gameManager.setEnemiesManager(enemiesManager);

    ///////////////////////////////////
    // Errante Spawner

    let erranteSpawner : ErranteSpawner = ErranteSpawner.Create();

    enemiesManager.addSpawner(erranteSpawner);

    ///////////////////////////////////
    // Hero's Bullet Manager

    let cnfBulletMng : CnfBulletManager 
      = JSON.parse(this.game.cache.text.get('cnf_bulletManager_hero'));

    let bulletMng : BulletManager = BulletManager.Create();

    let padding = cnfBulletMng.playzone_padding;    

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

    /****************************************************/
    /* Collisions                                       */
    /****************************************************/

    ///////////////////////////////////
    // Enemy Bullets Bodies vs Hero Body

    let heroController = gameManager.getPlayerController();

    let hero = heroController.getPlayer();

    enim_bulletManager.collisionVsSprite(this, hero.getWrappedInstance());

    ///////////////////////////////////
    // Hero Bullets Bodies vs Enemies Bodies

    bulletMng.collisionVsGroup(this, enemiesManager.getBodiesGroup());

    this._m_gameManager = gameManager;

    /****************************************************/
    /* User Interface                                   */
    /****************************************************/

    this._m_gameManager.setUIManager(new UIManager());

    this._m_gameManager.reset(this);
   
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