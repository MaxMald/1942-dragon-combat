/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file NullBossManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-12-2020
 */

import { IBulletManager } from "../bulletManager/iBulletManager";
import { NullBulletManager } from "../bulletManager/nullBulletManager";
import { Ty_physicsActor } from "../commons/1942types";
import { GameManager } from "../gameManager/gameManager";
import { IPlayerController } from "../playerController/IPlayerController";
import { IBossManager } from "./IBossManager";

/**
 * Boss manager without implementation.
 */
export class NullBossManager
implements IBossManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Initialize the boss manager.
   * 
   * @param _scene phaser scene. 
   * @param _gameManager game manager.
   */
  init(_scene : Phaser.Scene, _gameManager : GameManager)
  : void
  { }

  /**
   * No implementation.
   * 
   * @param _dt 
   */
  update(_dt: number)
  : void 
  { }

  /**
   * No implementation.
   * 
   * @param _x 
   * @param _y 
   */
  setPosition(_x : number, _y : number)
  : void
  { }

  /**
   * No implementation.
   * 
   * @param _playerController
   * @param _actor 
   */
  setHero(_playerController : IPlayerController, _actor: Ty_physicsActor)
  : void 
  { }

  /**
   * Returns null.
   * 
   * @returns null.
   */
  getHero()
  : Ty_physicsActor 
  { 
    return null;
  }

  /**
   * No implementation.
   * 
   * @param _bulletManager 
   */
  setBulletManager(_bulletManager: IBulletManager)
  : void 
  { }

  /**
   * Returns NullBulletManager.
   * 
   * @returns NullBulletManager.
   */
  getBulletManager()
  : IBulletManager 
  { 
    return NullBulletManager.GetInstance();
  }

  /**
   * No implementation.
   */
  active()
  : void 
  { }

  /**
   * No implementation.
   */
  desactive()
  : void 
  { }

  /**
   * No implementation.
   */
  destroy()
  : void 
  { }  
}