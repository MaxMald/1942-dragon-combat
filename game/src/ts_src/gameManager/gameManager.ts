/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file gameManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-29-2020
 */

import { OPRESULT } from "commons/mxEnums";
import { IBossManager } from "../bossManager/IBossManager";
import { NullBossManager } from "../bossManager/NullBossManager";
import { NullBulletSpawner } from "../bulletManager/bulletSpawner/nullBulletSpawner";
import { NullBulletManager } from "../bulletManager/nullBulletManager";
import { DC_CONFIG, DC_MESSAGE_ID } from "../commons/1942enums";
import { CmpNullCollisionController } from "../components/cmpNullCollisionController";
import { CmpNullEnemyController } from "../components/cmpNullEnemyController";
import { CnfKalebio } from "../configObjects/cnfKalebio";
import { CnfPowerShield } from "../configObjects/cnfPowerShield";
import { DebugManager } from "../debugManager/debugManager";
import { NullEnemySpawner } from "../enemiesManager/enemySpawner/nullEnemySpawner";
import { IEnemiesManager } from "../enemiesManager/iEnemiesManager";
import { NullEnemiesManager } from "../enemiesManager/nullEnemiesManager";
import { IItemManager } from "../itemManager/IItemManager";
import { NullItemManager } from "../itemManager/NullItemManager";
import { ILevelConfiguration } from "../levelConfiguration/ILevelConfiguration";
import { LevelConfiguration } from "../levelConfiguration/LevelConfiguration";
import { AmbienceGenerator } from "../levelGenerator/ambienceGenerator/ambienceGenerator";
import { AmbienceGeneratorConfig } from "../levelGenerator/ambienceGenerator/ambienceGeneratorConfig";
import { IAmbientGenerator } from "../levelGenerator/ambienceGenerator/iAmbientGenerator";
import { NullAmbientGenerator } from "../levelGenerator/ambienceGenerator/nullAmbientGenerator";
import { ILevelGenerator } from "../levelGenerator/iLevelGenerator";
import { LevelGenerator } from "../levelGenerator/levelGenerator";
import { LevelGeneratorConfig } from "../levelGenerator/levelGeneratorConfig";
import { NullLevelGenerator } from "../levelGenerator/nullLevelGenerator";
import { MsgEnemySpawn } from "../messages/msgEnemySpawn";
import { IPlayerController } from "../playerController/IPlayerController";
import { NullPlayerController } from "../playerController/nullPlayerController";
import { PlayerController } from "../playerController/playerController";
import { BasicBulletControlPool } from "../pools/basicbulletControlPool";
import { IScoreManager } from "../scoreManager/iScoreManager";
import { ScoreManager } from "../scoreManager/scoreManager";
import { NullState } from "../states/nullState";
import { IUIManager } from "../uiManager/IUIManager";
import { NullUIManager } from "../uiManager/NullUIManager";

export class GameManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Start the GameManager.
   */
  static Prepare()
  : void
  {
    if(GameManager._INSTANCE == null) 
    {
      GameManager._INSTANCE = new GameManager();
      GameManager._INSTANCE._onPrepare();
    }
    return;
  }

  /**
   * Shutdown the GameManager.
   */
  static Shutdown()
  : void
  {
    if(GameManager._INSTANCE != null) 
    {
      GameManager._INSTANCE._onShutdown();
      GameManager._INSTANCE = null;
    }
    return;
  }

  /**
   * Get the GameManager module.
   */
  static GetInstance()
  : GameManager
  {
    return GameManager._INSTANCE;
  }

  /**
   * Receive a message that will be handle by the GameManager. You can use
   * this method to comunicate with the a system of the gameManager.
   * 
   * @param _id message identifier.
   * @param _msg message.
   */
  static ReceiveMessage(_id : DC_MESSAGE_ID, _msg : any)
  : void
  {
    let manager = GameManager._INSTANCE;

    switch(_id)
    {
      /**
       * Add points to the score manager.
       */
      case DC_MESSAGE_ID.kAddScorePoints :

      manager.getScoreManager().addScore(_msg as integer);
      return;

      /**
       * Tell the enemy manager to spawn an enemy.
       */
      case DC_MESSAGE_ID.KSpawnEnemy : 
      {
        let msg = _msg as MsgEnemySpawn;

        manager._m_enemiesManager.spawn
        (
          msg.x, 
          msg.y, 
          msg.enemy_type
        );
      }
      return;

      /**
       * The mission had been a failure. Stop the game and display a message
       * box.
       */
      case DC_MESSAGE_ID.kMisionFailure :

      manager._onMisionFailure();
      return;

      /**
       * The mission had been completed. Stop the game and display the score
       * box.
       */
      case DC_MESSAGE_ID.kMisionCompleted :

      manager._onMisionCompleted();
      return;

      /**
       * Reset the mission scene. Shutdown the actual scene and restart it.
       */
      case DC_MESSAGE_ID.kGameReset:
      
      manager.gameReset();
      return;

      /**
       * Default, send message to managers.
       */
      default:

      manager.sendMessageToManagers(_id, _msg);
      return;
    }
    return;
  }

  /**
   * Set properties with default values. Managers will be set with safely null
   * objects.
   */
  init()
  : void
  {
    this._m_restartScene = false;
    this._m_gameplayStop = false;
    this._m_distance = 0.0;
    this._m_cameraSpeed = 0.0;
    this.m_dt = 0.0;

    this._m_levelConfiguration = new LevelConfiguration();

    this._m_debugManager = DebugManager.Create();
    this._m_itemManager = new NullItemManager();
    this._m_playerController = new NullPlayerController();
    this._m_basicBulletControlPool = new BasicBulletControlPool();
    this.setEnemiesManager(NullEnemiesManager.GetInstance());
    this.setScoreManager(ScoreManager.Create());
    this.setAmbientGenerator(new NullAmbientGenerator());
    this.setLevelGenerator(new NullLevelGenerator());
    this.setUIManager(new NullUIManager());
    this.setBossManager(new NullBossManager());    

    return;
  }

  /**
   * Destroys all the managers in the game manager and initialize the game
   * manager.
   */
  reset()
  : void
  {
    // Destroy Managers

    this._m_uiManager.destroy();
    this._m_uiManager = null;

    this._m_levelGenerator.destroy();
    this._m_levelGenerator = null;
    
    this._m_ambientGenrator.destroy();
    this._m_ambientGenrator = null;

    this._m_scoreManager.destroy();
    this._m_scoreManager = null;

    this._m_enemiesManager.destroy();
    this._m_enemiesManager = null;

    this._m_playerController.destroy();
    this._m_playerController = null;

    this._m_bossManager.destroy();
    this._m_bossManager = null;

    this._m_basicBulletControlPool.destroy();
    this._m_basicBulletControlPool = null;

    this._m_itemManager.destroy();
    this._m_itemManager = null;

    this._m_levelConfiguration.destroy();
    this._m_levelConfiguration = null;

    // Initalize the game manager

    this.init();

    return;
  }

  /**
   * Destroy the previous level generator (if exists) and creates a new one with
   * the given configuration file.
   * 
   * @param _scene phaser scene. 
   * @param _config configuration file.
   */
  initLevelGenerator
  (
    _scene : Phaser.Scene, 
    _config : LevelGeneratorConfig
  )
  : OPRESULT
  {
    if(this._m_levelGenerator != null)
    {
      this._m_levelGenerator.destroy();
    }

    let levelGenerator = LevelGenerator.Create();
    levelGenerator.init(_scene, _config);

    levelGenerator.setCameraHeigth(_scene.cameras.main.height);

    this._m_levelGenerator = levelGenerator;
    return OPRESULT.kOk;
  }

  /**
   * Destroys the previous ambieng generator (if exists) and creates a new on
   * with the given configuartion file.
   * 
   * @param _scene phaser scene. 
   * @param _config configuration file.
   */
  initAmbientGenerator
  (
    _scene : Phaser.Scene, 
    _config : AmbienceGeneratorConfig
  )
  : OPRESULT
  {
    if(this._m_ambientGenrator != null)
    {
      this._m_ambientGenrator.destroy();
    }

    let ambientGenerator : AmbienceGenerator = new AmbienceGenerator();

    ambientGenerator.init(_scene, _config);

    this._m_ambientGenrator = ambientGenerator;

    return OPRESULT.kOk;
  }

  /**
   * Initialize the playerController with a configuration file. If a
   * playerController exists, it will be destroyed and replaced.
   *
   * @param _scene phaser scene.
   * @param _cnfHero configuration file.
   */
  initHero(_scene : Phaser.Scene, _cnfHero : CnfKalebio)
  : OPRESULT
  {
    // Destroys previous playerController    

    if(this._m_playerController != null)
    {
      this._m_playerController.destroy();
    }

    let playerController : PlayerController;

    playerController = new PlayerController();

    let shieldConfig : CnfPowerShield 
      = this._m_levelConfiguration.getConfig<CnfPowerShield>
      (
        DC_CONFIG.kHeroPowerShield
      );
    playerController.init(_scene, _cnfHero, shieldConfig);   

    this._m_playerController = playerController;
    
    return OPRESULT.kOk;
  }

  /**
   * Update every manager of this game manager. Managers that are exclusive of 
   * the gameplay are updated only if the the gameplay is not stopped.
   * 
   * @param _dt delta time. 
   */
  update(_dt : number)
  : void
  {
    // save delta time.

    this.m_dt = _dt; 

    // Camera distance.

    this._m_distance += _dt * this._m_cameraSpeed;

    // Clear debugging paint

    this._m_debugManager.clearGraphics();

    // Game play updated.

    if(!this._m_gameplayStop)
    {
      this._m_ambientGenrator.update(_dt);

      this._m_levelGenerator.update(_dt, this._m_distance);
      
      this._m_playerController.update(_dt);
      
      this._m_enemiesManager.update(_dt);
      
      this._m_bossManager.update(_dt);
      
      this._m_itemManager.update(_dt);
    }    
    
    this._m_scoreManager.update(_dt);
    this._m_uiManager.update(_dt);

    if(this._m_restartScene)
    {
      this._restart();
    }

    return;
  }

  sendMessageToManagers(_id : DC_MESSAGE_ID, _msg : any)
  : void
  {
    this._m_uiManager.receive(_id, _msg);
    this._m_bossManager.receive(_id, _msg);
    return;
  }

  /**
   * Get the debug manager.
   */
  getDebugManager()
  : DebugManager
  {
    return this._m_debugManager;
  }

  /**
   * Get the level configuration object.
   * 
   * @returns Level configuration.
   */
  getLevelConfiguration()
  : ILevelConfiguration
  {
    return this._m_levelConfiguration;
  }

  /**
   * Set the score manager.
   * 
   * @param _scoreManager score manager.
   */
  setScoreManager(_scoreManager : IScoreManager)
  : void
  {
    this._m_scoreManager = _scoreManager;
    return;
  }

  /**
   * Set the score manager.
   * 
   * @returns score manager.
   */
  getScoreManager()
  : IScoreManager
  {
    return this._m_scoreManager;
  }

  /**
   * Set the reference to the PlayerController.
   * 
   * @param _playerController PlayerController.
   */
  setPlayerController(_playerController : PlayerController)
  : void
  {
    this._m_playerController = _playerController;
    return;
  }

  /**
   * Get the PlayerController.
   * 
   * @returns Reference to the PlayerController.
   */
  getPlayerController()
  : IPlayerController
  {
    return this._m_playerController;
  }

  /**
   * Set the Enemies Manager.
   * 
   * @param _enemiesManager Referencec to the IEnemiesManager. 
   */
  setEnemiesManager(_enemiesManager : IEnemiesManager)
  : void
  {
    if(this._m_enemiesManager != null)
    {
      this._m_enemiesManager.destroy();
    }

    this._m_enemiesManager = _enemiesManager;
    return;
  }

  /**
   * Get the Enemies Manager.
   */
  getEnemiesManager()
  : IEnemiesManager
  {
    return this._m_enemiesManager;
  }

  /**
   * Set the AmbientGenerator.
   * 
   * @param _ambientGenerator ambient generator. 
   */
  setAmbientGenerator(_ambientGenerator : IAmbientGenerator)
  : void
  {
    this._m_ambientGenrator = _ambientGenerator;
    return;
  }

  /**
   * Get the AmbientGenerator.
   * 
   * @returns ambient generator.
   */
  getAmbientGenerator()
  : IAmbientGenerator
  {
    return this._m_ambientGenrator;
  }

  /**
   * Set the LevelGenerator.
   * 
   * @param _levelGenerator level generator. 
   */
  setLevelGenerator(_levelGenerator : ILevelGenerator)
  : void
  {
    this._m_levelGenerator = _levelGenerator;
    return;
  }

  /**
   * Get the LevelGenerator.
   * 
   * @returns level generator.
   */
  getLevelGenerator()
  : ILevelGenerator
  {
    return this._m_levelGenerator;
  }

  /**
   * Set the UIManager.
   * 
   * @param _uiManager 
   */
  setUIManager(_uiManager : IUIManager)
  : void
  {
    this._m_uiManager = _uiManager;
    return;
  }

  /**
   * Get the UIManager.
   */
  getUIManager()
  : IUIManager
  {
    return this._m_uiManager;
  }

  /**
   * Set the boss manager.
   * 
   * @param _bossManager boss manager. 
   */
  setBossManager(_bossManager : IBossManager)
  : void
  {
    this._m_bossManager = _bossManager;
  }

  /**
   * Get the boss manager.
   * 
   * @returns boss manager.
   */
  getBossManager()
  : IBossManager
  {
    return this._m_bossManager;
  }

  /**
   * Set the item manager.
   * 
   * @param _itemManager item manager. 
   */
  setItemManager(_itemManager : IItemManager)
  : void
  {
    this._m_itemManager = _itemManager;
    return;
  }

  /**
   * Get the Item Manager.
   * 
   * @returns item manager.
   */
  getItemManager()
  : IItemManager
  {
    return this._m_itemManager;
  }

  /**
   * Get the basic bullet control pool.
   * 
   * @returns basic bullet control pool.
   */
  getBasicBulletControlPool()
  : BasicBulletControlPool
  {
    return this._m_basicBulletControlPool;
  }

  /**
   * Set the game scene.
   * 
   * @param _scene phaser scene. 
   */
  setGameScene(_scene : Phaser.Scene)
  : void
  {
    // Save game scene.
    
    this._m_scene = _scene;

    // Initialize the debug manager.

    this._m_debugManager.init(_scene);

    return;
  }

  /**
   * Get the game scene.
   */
  getGameScene()
  : Phaser.Scene
  {
    return this._m_scene;
  }

  /**
   * Set the camera speed.
   * 
   * @param _speed speed (pix./sec.). 
   */
  setCameraSpeed(_speed : number)
  : void
  {
    this._m_cameraSpeed = _speed;
  }

  /**
   * Get the camera speed.
   * 
   * @returns speed (pix./sec.).
   */
  getCameraSpeed()
  : number
  {
    return this._m_cameraSpeed;
  }

  /**
   * Set the distance traveled by the camera.
   * 
   * @param _distance distance (pix.)
   */
  setDistance(_distance : number)
  : void
  {
    this._m_distance = _distance;
    return;
  }

  /**
   * Get the distance traveled by the camera.
   * 
   * @returns distance (pix.).
   */
  getDistance()
  : number
  {
    return this._m_distance;
  }

  /**
   * Called when the mission is going to be reset.
   */
  gameReset()
  : void
  {    
    this._m_restartScene = true;
    return;
  }

  /**
   * Delta time.
   */
  m_dt : number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Called once when the module had been prepared.
   */
  private _onPrepare()
  : void
  {   
    // Prepare the modules.
     
    NullState.Prepare();
    
    NullBulletSpawner.Prepare();
    
    CmpNullEnemyController.Prepare();
    
    CmpNullCollisionController.Prepare();
    
    NullBulletManager.Prepare();
    
    NullEnemySpawner.Prepare();
    
    NullEnemiesManager.Prepare();

    this.init();

    return;
  }

  /**
   * Called once when the module is going to be shutdown.
   */
  private _onShutdown()
  : void
  {
    this.reset();

    // Shutdown the modules.

    NullEnemiesManager.Shutdown();

    NullEnemySpawner.Shutdown();
    
    NullBulletManager.Shutdown();
    
    CmpNullCollisionController.Shutdown(); 
    
    CmpNullEnemyController.Shutdown();  
    
    NullBulletSpawner.Shutdown();
    
    NullState.ShutDown();

    return;
  }

  /**
   * Private constructor.
   */
  private constructor()
  { }

  /**
   * Stop the gameplay and display the score box.
   */
  private _onMisionCompleted()
  : void
  {
    this._m_scoreManager.onMisionComplete();
    this._m_uiManager.receive(DC_MESSAGE_ID.kMisionCompleted, this);
    this._m_gameplayStop = true;
    return;
  }

  /**
   * Stop the gampelay and display a message box.
   */
  private _onMisionFailure()
  : void
  {
    this._m_scoreManager.onMisionFailed();
    this._m_uiManager.receive(DC_MESSAGE_ID.kMisionFailure, this);
    this._m_gameplayStop = true;
    return;
  }

  /**
   * Restart level.
   */
  private _restart()
  : void
  {
    this.reset();    

    // destroy graphics.

    this._m_debugManager.destroyGraphics();

    // start test scene.
    
    this._m_scene.scene.start('test');
    
    return;
  }
  
  /**
   * Singleton instance.
   */
  private static _INSTANCE : GameManager;

  /**
   * Reference to the IEnemiesManager.
   */
  private _m_enemiesManager : IEnemiesManager;

  /**
   * Reference to the PlayerController.
   */
  private _m_playerController : IPlayerController

  /**
   * Reference to the LevelGenerator.
   */
  private _m_levelGenerator : ILevelGenerator;

  /**
   * Reference to the debug manager.
   */
  private _m_debugManager : DebugManager;

  /**
   * Reference to the LevelConfiguration.
   */
  private _m_levelConfiguration : ILevelConfiguration;

  /**
   * Reference to the ScoreManager.
   */
  private _m_scoreManager : IScoreManager;

  /**
   * Reference to the AmbienGenrator.
   */
  private _m_ambientGenrator : IAmbientGenerator;

  /**
   * Reference to the BossManager.
   */
  private _m_bossManager : IBossManager;

  /**
   * Reference to the UIManager.
   */
  private _m_uiManager : IUIManager;

  /**
   * Reference to the ItemManager.
   */
  private _m_itemManager : IItemManager;

  /**
   * Reference to the basic bullet control pool.
   */
  private _m_basicBulletControlPool : BasicBulletControlPool;

  /**
   * The speed (pix./sec.) of the camera during the level.
   */
  private _m_cameraSpeed : number;

  /**
   * Distance traveled by the camera (Theoretically).
   */
  private _m_distance : number;

  /**
   * Indicates if the gameplay had been stopped. Used when the hero is death.
   */
  private _m_gameplayStop : boolean;

  /**
   * Indicate if the scene is going to be restart.
   */
  private _m_restartScene : boolean; 

  /**
   * Reference to the game scene.
   */
  private _m_scene : Phaser.Scene;
}