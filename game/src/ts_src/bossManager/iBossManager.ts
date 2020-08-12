/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Provides an up level interface to control the boss. 
 *
 * @file iBossManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-12-2020
 */

import { VoidExpression } from "../../../../node_modules/typescript/lib/typescript";
import { IBulletManager } from "../bulletManager/iBulletManager";
import { Ty_physicsActor } from "../commons/1942types";
import { GameManager } from "../gameManager/gameManager";
import { IPlayerController } from "../playerController/IPlayerController";

/**
 * Provides an up level interface to control the boss.
 */
export interface IBossManager
{
  /**
   * Initialize the boss manager.
   * 
   * @param _scene phaser scene. 
   * @param _gameManager game manager.
   */
  init(_scene : Phaser.Scene, _gameManager : GameManager)
  : void;

  /**
   * Update the boss manager.
   * 
   * @param _dt delta time. 
   */
  update(_dt : number)
  : void;

  /**
   * Set the boss position.
   * 
   * @param _x x component. 
   * @param _y y component.
   */
  setPosition(_x : number, _y : number)
  : void;

  /**
   * Set the hero.
   * 
   * @param _playerController player controller.
   * @param _actor actor. 
   */
  setHero(_playerController : IPlayerController, _actor : Ty_physicsActor)
  : void;

  /**
   * Get the hero.
   * 
   * @returns actor.
   */
  getHero()
  : Ty_physicsActor;

  /**
   * Set the bullet manager for the boss.
   * 
   * @param _bulletManager bullet manager.
   */
  setBulletManager( _bulletManager : IBulletManager)
  : void;

  /**
   * Get the bullet manager of the boss.
   * 
   * @returns bullet manager.
   */
  getBulletManager()
  : IBulletManager;

  /**
   * Active the boss.
   */
  active()
  : void;

  /**
   * Desactive the boss.
   */
  desactive()
  : void;

  /**
   * Destroy the boss and boss manager.
   */
  destroy()
  : void;
}