/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Null object.
 *
 * @file nullPlayerController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-11-2020
 */

import { IBulletManager } from "../bulletManager/iBulletManager";
import { NullBulletManager } from "../bulletManager/nullBulletManager";
import { Ty_physicsActor } from "../commons/1942types";
import { IPlayerController } from "./IPlayerController";

/**
 * Null object.
 */
export class NullPlayerController
implements IPlayerController
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * No implementation.
   * 
   * @param _bulletManager 
   */
  setBulletManager(_bulletManager: IBulletManager)
  : void 
  { }

  /**
   * No implementation.
   * 
   * @returns returns null bullet manager.
   */
  getBulletManager()
  : IBulletManager 
  {
    return NullBulletManager.GetInstance();
  }

  /**
   * No implementation.
   * 
   * @param _pointer 
   */
  setPointer(_pointer: Phaser.Input.Pointer)
  : void 
  { }

  /**
   * No implementation.
   * 
   * @returns null.
   */
  getPointer()
  : Phaser.Input.Pointer 
  {
    return null;
  }

  /**
   * No implementation.
   * 
   * @param _mode  
   */
  setInputMode(_mode: string)
  : void 
  { }

  /**
   * No implementation.
   * 
   * @returns MIXED.
   */
  getInputMode()
  : string 
  { 
    return "MIXED";
  }

  /**
   * No implementation.
   * 
   * @param _speed 
   */
  setHeroSpeed(_speed: number)
  : void 
  { }

  /**
   * No implementation.
   * 
   * @returns 0.
   */
  getHeroSpeed()
  : number 
  {
    return 0;
  } 

  /**
   * No implementation.
   * 
   * @param _p1_x 
   * @param _p1_y 
   * @param _p2_x 
   * @param _p2_y 
   */
  setMovementPadding
  (
    _p1_x: number, 
    _p1_y: number, 
    _p2_x: number, 
    _p2_y: number
  ): void 
  { }

  /**
   * No implementation.
   * 
   * @param _player 
   */
  setPlayer(_player: Ty_physicsActor)
  : void 
  { }

  /**
   * No implementation.
   * 
   * @returns null.
   */
  getPlayer()
  : Ty_physicsActor 
  { 
    return null;
  }

  /**
   * No implementation.
   * 
   * returns (0.0, 1.0).
   */
  getDirection()
  : Phaser.Math.Vector2 
  {
    return new Phaser.Math.Vector2(1.0, 0.0);
  }

  /**
   * No implementation.
   * 
   * @param _x 
   * @param _y 
   */
  setPosition(_x: number, _y: number)
  : void 
  { }

  /**
   * No implementation.
   * 
   * @returns (0.0, 0.0).
   */
  getPosition()
  : Phaser.Math.Vector2 
  {
    return new Phaser.Math.Vector2(0.0, 0.0);
  }

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
   */
  destroy()
  : void 
  { }
}