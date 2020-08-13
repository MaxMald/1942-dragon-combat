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
import { ScoreManager } from "../../../../../game/src/ts_src/scoreManager/scoreManager";
import { ScoreManagerConfig } from "../../../../../game/src/ts_src/scoreManager/scoreManagerConfig";
import { SpiderBossManager } from "../../../../../game/src/ts_src/bossManager/spiderBossManager";
import { SimpleBulletSpawner } from "../../../../../game/src/ts_src/bulletManager/bulletSpawner/simpleBulletSpawner";

export class Test extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  create()
  : void
  {    
    let gameManager = GameManager.GetInstance();
    gameManager.setGameScene(this);

    ///////////////////////////////////
    // Scene Configuration

    let sceneConfig : LevelConfig 
      = JSON.parse(this.game.cache.text.get('cnf_pilot_scene'));

    gameManager.setCameraSpeed(sceneConfig.camera_speed);

    ///////////////////////////////////
    // Score Manager

    let scoreManager : ScoreManager = ScoreManager.Create();

    let scoreManagerConfig : ScoreManagerConfig
      = JSON.parse(this.game.cache.text.get('cnf_scoreManager'));

    scoreManager.init(this, scoreManagerConfig);    

    gameManager.setScoreManager(scoreManager);

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
    // Boss Manager

    let canvas = this.game.canvas;

    let bossManager : SpiderBossManager = new SpiderBossManager();
    bossManager.init(this, gameManager);

    bossManager.setPosition
    (
      canvas.width * 0.5,
      -100.0
    );

    gameManager.setBossManager(bossManager);

    ///////////////////////////////////
    // Bullet Manager : Enemies    

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
    enim_bulletManager.addSpawner(SimpleBulletSpawner.Create()); 
    
    bossManager.setBulletManager(enim_bulletManager);

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

    ////////////////////////////////////
    // Send hero to boss

    bossManager.setHero(heroController, hero);

    /****************************************************/
    /* Initalize Pools                                  */
    /****************************************************/

    let basicBulletControlPool = gameManager.getBasicBulletControlPool();
    basicBulletControlPool.init(20);

    /****************************************************/
    /* User Interface                                   */
    /****************************************************/

    let uiManager = new UIManager();
    uiManager.init(this, gameManager);
    uiManager.reset(this, gameManager);

    this._m_gameManager.setUIManager(uiManager);
   
    // Reset score manager.
    scoreManager.reset(this, gameManager);
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