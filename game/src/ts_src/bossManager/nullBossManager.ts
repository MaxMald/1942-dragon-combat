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
import { DC_MESSAGE_ID } from "../commons/1942enums";
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
   * Get the Boss HealtPoints.
   * 
   * @returns health points.
   */
  getBossHealth()
  : number
  {
    return 0.0;
  }

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
   * Suscribe to an event.
   * 
   * @param _event event key. 
   * @param _username username.
   * @param _fn function.
   * @param _context context.
   */
  suscribe
  (
    _event : string, 
    _username : string, 
    _fn : (_bossManager : IBossManager, _args : any) => void,
    _context : any
  ) : void
  { }

  /**
   * Unsuscribe to an event.
   * 
   * @param _event event key. 
   * @param _username username.
   */
  unsuscribe(_event : string, _username : string) 
  : void
  { }

  /**
   * Receive a message;
   * 
   * @param _id message id.
   * @param _msg message
   */
  receive(_id : DC_MESSAGE_ID, _msg : any)
  : void
  { }

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