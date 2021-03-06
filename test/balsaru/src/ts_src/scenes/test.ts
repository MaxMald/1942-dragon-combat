import { GameManager } from "../../../../../game/src/ts_src/gameManager/gameManager";
import { CnfBulletManager } from "../../../../../game/src/ts_src/commons/1942config";
import { AmbienceGeneratorConfig } from "../../../../../game/src/ts_src/levelGenerator/ambienceGenerator/ambienceGeneratorConfig";
import { BulletManager } from "../../../../../game/src/ts_src/bulletManager/bulletManager";
import { HeroBasicBulletSpawner } from "../../../../../game/src/ts_src/bulletManager/bulletSpawner/heroBasicBulletSpawner";
import { LevelGeneratorConfig } from "../../../../../game/src/ts_src/levelGenerator/levelGeneratorConfig";
import { EnemyBasicBulletSpawner } from "../../../../../game/src/ts_src/bulletManager/bulletSpawner/enemyBasicBulletSpawner";
import { EnemiesManager } from "../../../../../game/src/ts_src/enemiesManager/enemiesManager";
import { ErranteSpawner } from "../../../../../game/src/ts_src/enemiesManager/enemySpawner/erranteSpawner";
import { UIManager } from "../../../../../game/src/ts_src/uiManager/UIManager";
import { ScoreManager } from "../../../../../game/src/ts_src/scoreManager/scoreManager";
import { CnfEnemyBasicBullet } from "../../../../../game/src/ts_src/configObjects/cnfEnemyBasicBullet";
import { ItemManager } from "../../../../../game/src/ts_src/itemManager/ItemManager";
import { ILevelConfiguration } from "../../../../../game/src/ts_src/levelConfiguration/ILevelConfiguration";
import { heroTripleShotSpawner } from "../../../../../game/src/ts_src/bulletManager/bulletSpawner/heroTripleShotSpawner";
import { RangerSpawner } from "../../../../../game/src/ts_src/enemiesManager/enemySpawner/rangerSpawner";
import { DC_CONFIG } from "../../../../../game/src/ts_src/commons/1942enums";
import { CnfRangerSpawner } from "../../../../../game/src/ts_src/configObjects/cnfRangerSpawnerConfig";
import { SonicSpawner } from "../../../../../game/src/ts_src/enemiesManager/enemySpawner/sonicSpawner";
import { CnfSonicSpawner } from "../../../../../game/src/ts_src/configObjects/cnfSonicSpawner";
import { ArponShipSpawner } from "../../../../../game/src/ts_src/enemiesManager/enemySpawner/arponShipSpawner";
import { CnfArponShipSpawner } from "../../../../../game/src/ts_src/configObjects/cnfArponShipSpawner";
import { ArponBulletSpawner } from "../../../../../game/src/ts_src/bulletManager/bulletSpawner/arponBulletSpawner";
import { CnfErranteSpawner } from "../../../../../game/src/ts_src/configObjects/cnfErranteSpawner";
import { CnfScoreManager } from "../../../../../game/src/ts_src/configObjects/cnfScoreManager";
import { BalsaruManager } from "../../../../../game/src/ts_src/bossManager/balsaruManager";
import { CnfKalebio } from "../../../../../game/src/ts_src/configObjects/cnfKalebio";
  
export class Test 
extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  create()
  : void
  {    
    let gameManager = GameManager.GetInstance();
    gameManager.setGameScene(this);

    let gameCache = this.game.cache;   
    
    ///////////////////////////////////
    // Level Configuration

    let levelConfiguration : ILevelConfiguration 
      = gameManager.getLevelConfiguration();

    levelConfiguration.init(this, gameManager);

    ///////////////////////////////////
    // Score Manager

    let scoreManager : ScoreManager = ScoreManager.Create();

    let scoreManagerConfig : CnfScoreManager 
      = levelConfiguration.getConfig<CnfScoreManager>
      (
        DC_CONFIG.kScoreManager
      );

    scoreManager.init(this, scoreManagerConfig);    

    gameManager.setScoreManager(scoreManager);

    ///////////////////////////////////
    // Ambient Generator

    let ambientGenConfig : AmbienceGeneratorConfig
      = JSON.parse(this.game.cache.text.get('cnf_ambient'));

    gameManager.initAmbientGenerator(this, ambientGenConfig);

    ///////////////////////////////////
    // Level Generator

    let levelGenConfig : LevelGeneratorConfig = new LevelGeneratorConfig();
    levelGenConfig.map_key = "map_pilot";

    gameManager.initLevelGenerator(this, levelGenConfig);

    /****************************************************/
    /* Boss                                             */
    /****************************************************/

    ///////////////////////////////////
    // Boss Manager

    let canvas = this.game.canvas;

    let bossManager : BalsaruManager = new BalsaruManager();

    bossManager.init(this, gameManager);

    gameManager.setBossManager(bossManager);

    ///////////////////////////////////
    // Bullet Manager : Enemies    

    let cnfEnemiesBulletMng : CnfBulletManager 
      = JSON.parse(gameCache.text.get('cnf_bulletManager_enemies'));

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

    bossManager.setBulletManager(enim_bulletManager);

    ///////////////////////////////////
    // Spawner : Enemy Basic Bullet

    let enemyBulletSpawner = EnemyBasicBulletSpawner.Create();

    let enemyBasicBulletConfig = levelConfiguration.getConfig<CnfEnemyBasicBullet>
    (
      DC_CONFIG.kEnemyBasicBullet
    );

    enemyBulletSpawner.setBulletConfig(enemyBasicBulletConfig);
    enim_bulletManager.addSpawner(enemyBulletSpawner);    
  
    ///////////////////////////////////
    // Spawner : Arpon

    let arponSpawner = ArponBulletSpawner.Create();

    arponSpawner.init();

    enim_bulletManager.addSpawner(arponSpawner);

    ///////////////////////////////////
    // Enemies Manager

    let enemiesManager : EnemiesManager = EnemiesManager.Create();

    let enemiesManagerConfig 
      = JSON.parse(this.game.cache.text.get('cnf_spawner_errante'));

    enemiesManager.init(this, enemiesManagerConfig);

    enemiesManager.setBulletManager(enim_bulletManager);

    gameManager.setEnemiesManager(enemiesManager);

    ///////////////////////////////////
    // Spawner : Errante

    let erranteSpawner : ErranteSpawner = ErranteSpawner.Create();

    let erranteSpawnerConfig = levelConfiguration.getConfig<CnfErranteSpawner>
    (
      DC_CONFIG.kErranteSpawner
    );    

    erranteSpawner.init(erranteSpawnerConfig);

    enemiesManager.addSpawner(erranteSpawner);

    ///////////////////////////////////
    // Spawner : Ranger

    let rangerSpawner : RangerSpawner = RangerSpawner.Create();
    let rangerSpawnerConfig = levelConfiguration.getConfig<CnfRangerSpawner>
    (
      DC_CONFIG.kRangerSpawner
    );    
    rangerSpawner.init(rangerSpawnerConfig);

    enemiesManager.addSpawner(rangerSpawner);

    ///////////////////////////////////
    // Spawner : Sonic

    let sonicSpawner : SonicSpawner = SonicSpawner.Create();
    let sonicSpawnerConfig = levelConfiguration.getConfig<CnfSonicSpawner>
    (
      DC_CONFIG.kSonicSpawner
    );
    sonicSpawner.init(sonicSpawnerConfig);

    enemiesManager.addSpawner(sonicSpawner);

    ///////////////////////////////////
    // Spawner : Arpon Ship

    let arponShipSpawner : ArponShipSpawner = ArponShipSpawner.Create();
    let arponShipSpanwerConfig = levelConfiguration.getConfig<CnfArponShipSpawner>
    (
      DC_CONFIG.kArponShipSpawner
    );
    arponShipSpawner.init(arponShipSpanwerConfig);

    enemiesManager.addSpawner(arponShipSpawner);

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

    ///////////////////////////////////
    // Spawner : BasicBullet

    let heroBulletSpawner = HeroBasicBulletSpawner.Create();

    heroBulletSpawner.init();
    bulletMng.addSpawner(heroBulletSpawner); 

    ///////////////////////////////////
    // Spawner : Triple Shot Bullet

    let tripleShotSpawner = heroTripleShotSpawner.Create();

    tripleShotSpawner.init();
    bulletMng.addSpawner(tripleShotSpawner);

    ///////////////////////////////////
    // Player Controller
     
    let heroConfig = levelConfiguration.getConfig<CnfKalebio>
    (
      DC_CONFIG.kKalebio
    );
    
    gameManager.initHero(this, heroConfig);

    // Bounds the playercontroller with the bullet manager

    let playercontroller = gameManager.getPlayerController();

    playercontroller.setBulletManager(bulletMng);

    ///////////////////////////////////
    // Item Manager

    let itemManager : ItemManager = new ItemManager();

    itemManager.init(this, gameManager);
    gameManager.setItemManager(itemManager);

    /****************************************************/
    /* Collisions                                       */
    /****************************************************/

    ///////////////////////////////////
    // Enemy Bullets Bodies vs Hero Body

    let heroController = gameManager.getPlayerController();

    let hero = heroController.getPlayer();

    enim_bulletManager.collisionVsSprite(this, hero.getWrappedInstance());

    ///////////////////////////////////
    // Enemy Bodies vs Hero Body

    enemiesManager.collisionVsBody(this, hero.getWrappedInstance());

    ///////////////////////////////////
    // Hero Bullets Bodies vs Enemies Bodies

    bulletMng.collisionVsGroup(this, enemiesManager.getBodiesGroup());

    this._m_gameManager = gameManager;

    ///////////////////////////////////
    // Hero Shield vs Enemies Bodies

    enemiesManager.collisionVsBody
    (
      this, 
      playercontroller.getPowerShield().getWrappedInstance()
    );
    
    ///////////////////////////////////
    // Hero Shield vs Enemies bullets

    enim_bulletManager.collisionVsSprite
    (
      this, 
      playercontroller.getPowerShield().getWrappedInstance()
    );

    ///////////////////////////////////
    // Items Bodies vs Hero Body

    itemManager.collisionVsSprite(this, hero.getWrappedInstance());

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