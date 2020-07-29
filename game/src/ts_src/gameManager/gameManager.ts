/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file gameManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-29-2020
 */

import { BulletManager } from "../bulletManager/bulletManager";
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
    if(GameManager._INSTANCE == null) {
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
    if(GameManager._INSTANCE != null) {
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
   * Set the reference to the BulletManager.
   * 
   * @param _bulletManager BulletManager. 
   */
  setBulletManager(_bulletManager : BulletManager)
  : void
  {
    this._m_bulletManager = _bulletManager;
    return;
  }

  /**
   * Get the BulletManager.
   * 
   * @returns Reference to the BulletManager.
   */
  getBulletManager()
  : BulletManager
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

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Called once when the module had been prepared.
   */
  private _onPrepare()
  : void
  {
    return;
  }

  /**
   * Called once when the module is going to be shutdown.
   */
  private _onShutdown()
  : void
  {
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
  private _m_bulletManager : BulletManager;

  /**
   * Reference to the PlayerController.
   */
  private _m_playerController : PlayerController
}