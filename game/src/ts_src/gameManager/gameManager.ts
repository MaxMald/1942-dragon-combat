/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file gameManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-29-2020
 */

import { IBulletManager } from "../bulletManager/iBulletManager";
import { NullBulletManager } from "../bulletManager/nullBulletManager";
import { IEnemiesManager } from "../enemiesManager/iEnemiesManager";
import { NullEnemiesManager } from "../enemiesManager/nullEnemiesManager";
import { PlayerController } from "../playerController/playerController";

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

  update(_dt : number)
  : void
  {
    this.m_dt = _dt;
    
    this._m_bulletManager.update(_dt);
    this._m_enemiesManager.update(_dt);
    return;
  }

  /**
   * Set the reference to the BulletManager. If a BulletManager exists it will 
   * be destroyed.
   * 
   * @param _bulletManager BulletManager. 
   */
  setBulletManager(_bulletManager : IBulletManager)
  : void
  {
    if(this._m_bulletManager != null) 
    {
      this._m_bulletManager.destroy();
    }

    this._m_bulletManager = _bulletManager;
    return;
  }

  /**
   * Get the BulletManager.
   * 
   * @returns Reference to the BulletManager.
   */
  getBulletManager()
  : IBulletManager
  {
    return this._m_bulletManager;
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
   * Get the Enemeis Manager.
   */
  getEnemiesManager()
  : IEnemiesManager
  {
    return this._m_enemiesManager;
  }

  /**
  * Safely destroys the object.
  */
  destroy()
  : void 
  {
    this._m_bulletManager.destroy();
    this._m_playerController.destroy();
    this._m_enemiesManager.destroy();
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
    this.m_dt = 0.0;

    this._m_bulletManager = new NullBulletManager();
    this._m_enemiesManager = new NullEnemiesManager();
    return;
  }

  /**
   * Called once when the module is going to be shutdown.
   */
  private _onShutdown()
  : void
  {
    if(this._m_bulletManager != null)
    {
      this._m_bulletManager.destroy();
    }    
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
   * Reference to the BulletManager.
   */
  private _m_bulletManager : IBulletManager;

  /**
   * Reference to the IEnemiesManager.
   */
  private _m_enemiesManager : IEnemiesManager;

  /**
   * Reference to the PlayerController.
   */
  private _m_playerController : PlayerController
}