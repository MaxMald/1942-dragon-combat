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
import { NullBulletSpawner } from "../bulletManager/bulletSpawner/nullBulletSpawner";
import { NullBulletManager } from "../bulletManager/nullBulletManager";
import { CnfHero } from "../commons/1942config";
import { DC_MESSAGE_ID } from "../commons/1942enums";
import { CmpNullCollisionController } from "../components/cmpNullCollisionController";
import { CmpNullEnemyController } from "../components/cmpNullEnemyController";
import { NullEnemySpawner } from "../enemiesManager/enemySpawner/nullEnemySpawner";
import { IEnemiesManager } from "../enemiesManager/iEnemiesManager";
import { NullEnemiesManager } from "../enemiesManager/nullEnemiesManager";
import { AmbienceGenerator } from "../levelGenerator/ambienceGenerator/ambienceGenerator";
import { AmbienceGeneratorConfig } from "../levelGenerator/ambienceGenerator/ambienceGeneratorConfig";
import { IAmbientGenerator } from "../levelGenerator/ambienceGenerator/iAmbientGenerator";
import { NullAmbientGenerator } from "../levelGenerator/ambienceGenerator/nullAmbientGenerator";
import { ILevelGenerator } from "../levelGenerator/iLevelGenerator";
import { LevelGenerator } from "../levelGenerator/levelGenerator";
import { NullLevelGenerator } from "../levelGenerator/nullLevelGenerator";
import { PlayerController } from "../playerController/playerController";
import { IScoreManager } from "../scoreManager/iScoreManager";
import { ScoreManager } from "../scoreManager/scoreManager";

export class GameManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Start the module.
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
   * Shutdown the module.
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
      case DC_MESSAGE_ID.kAddScorePoints :
      {
        manager.getScoreManager().addScore(_msg as integer);
      }
      return;
    }
    return;
  }

  /**
   * 
   */
  initLevelGenerator()
  : OPRESULT
  {
    if(this._m_levelGenerator != null)
    {
      this._m_levelGenerator.destroy();
    }

    let levelGenerator = new LevelGenerator();
    levelGenerator.init();

    this._m_levelGenerator = levelGenerator;
    return OPRESULT.kOk;
  }

  /**
   * 
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
   */
  initHero(_scene : Phaser.Scene, _cnfHero : CnfHero)
  : OPRESULT
  {
    // Destroys previous playerController

    let playerController : PlayerController = this._m_playerController;

    if(playerController != null)
    {
      playerController.destroy();
    }

    playerController = new PlayerController();
    playerController.init(_scene, _cnfHero);   

    this._m_playerController = playerController;
    return OPRESULT.kOk;
  }

  update(_dt : number)
  : void
  {
    this.m_dt = _dt; 

    this._m_ambientGenrator.update(_dt);
    this._m_levelGenerator.update(_dt);
    this._m_playerController.update(_dt);
    this._m_enemiesManager.update(_dt);
    return;
  }

  /**
   * Get the score manager.
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
  : PlayerController
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
    this.m_dt = 0.0;

    // Prepare the modules.
     
    NullBulletSpawner.Prepare();
    CmpNullEnemyController.Prepare();
    CmpNullCollisionController.Prepare();
    NullBulletManager.Prepare();
    NullEnemySpawner.Prepare();
    NullEnemiesManager.Prepare();

    // Create Managers.

    this.setEnemiesManager(NullEnemiesManager.GetInstance());
    this.setScoreManager(ScoreManager.Create());
    this.setAmbientGenerator(new NullAmbientGenerator());
    this.setLevelGenerator(new NullLevelGenerator());

    return;
  }

  /**
   * Called once when the module is going to be shutdown.
   */
  private _onShutdown()
  : void
  {
    // Destroy managers.

    this._m_levelGenerator.destroy();
    this._m_ambientGenrator.destroy();
    this._m_scoreManager.destroy();
    this._m_enemiesManager.destroy();

    // Shutdown the modules.

    NullEnemiesManager.Shutdown();
    NullEnemySpawner.Shutdown();
    NullBulletManager.Shutdown();
    CmpNullCollisionController.Shutdown(); 
    CmpNullEnemyController.Shutdown();  
    NullBulletSpawner.Shutdown();

    return;
  }

  /**
   * Private constructor.
   */
  private constructor()
  { }
  
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
  private _m_playerController : PlayerController

  /**
   * Reference to the LevelGenerator.
   */
  private _m_levelGenerator : ILevelGenerator;

  /**
   * Reference to the ScoreManager.
   */
  private _m_scoreManager : IScoreManager;

  /**
   * Reference to the AmbienGenrator.
   */
  private _m_ambientGenrator : IAmbientGenerator;
}