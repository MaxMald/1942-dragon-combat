/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary The player controller manage the hero's internal and extenral
 * systems.
 *
 * @file IPlayerController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-11-2020
 */

import { IBulletManager } from "../bulletManager/iBulletManager";
import { Ty_physicsActor, V2 } from "../commons/1942types";

/**
 * The player controller manage the hero's internal and extenral systems.
 */
export interface IPlayerController
{
  /**
   * Set the hero's bullet manager.
   * 
   * @param _bulletManager bullet manager.
   */
  setBulletManager(_bulletManager : IBulletManager)
  : void;

  /**
   * Get the hero's bullet manager.
   * 
   * @returns bullet manager.
   */
  getBulletManager()
  : IBulletManager;

  /**
   * Set the input pointer that controls the hero states.
   * 
   * @param _pointer phaser input pointer. 
   */
  setPointer( _pointer : Phaser.Input.Pointer)
  : void;

  /**
   * Get the input pointer that controls the hero states.
   */
  getPointer()
  : Phaser.Input.Pointer;

   /**
   * Set the movement mode of the hero. The modes define the behaviour wich the
   * actor will react to the events of the pointer.
   * 
   * * ABSOLUTE : The hero moves to the pointer position.
   * * RELATIVE : The hero moves the same ammount and direction as the pointer. 
   * * MIXED : The hero moves moves tho the pointer X position, but relative to
   * its Y position.
   * 
   * @param _mode input mode.
   */
  setInputMode(_mode : string)
  : void;

   /**
   * Get the movement mode of the hero. The mode defines the behaviour wich the
   * actor react to the events of the pointer
   * 
   * * ABSOLUTE : The hero moves to the pointer position.
   * * RELATIVE : The hero moves the same ammount and direction as the pointer. 
   * * MIXED : The hero moves moves tho the pointer X position, but relative to
   * its Y position.
   * 
   * @returns input mode.
   */
  getInputMode()
  : string;

  /**
   * Set the maximum speed (pixels per frame) of the hero when it moves to 
   * the pointer position in a ABSOLUTE or MIXED mode.
   * 
   * @param _speed maximum speed in pixels per frame. 
   */
  setHeroSpeed(_speed : number)
  : void;

  /**
   * Get the maximum speed (pixels per frame) of the hero when it moves to 
   * the pointer position in a ABSOLUTE or MIXED mode.
   * 
   * @returns maximum speed in pixels per frame. 
   */
  getHeroSpeed()
  : number;

  /**
   * Set the Hero's fire rate in bullets per second.
   * 
   * @param _fireRate Number of bullets spawned per second. 
   */
  setHeroFireRate(_fireRate : number)
  : void;

  /**
   * Get the hero's fire rate in bullets per second.
   * 
   * @returns Number of bullets spawned per second. 
   */
  getHeroFireRate()
  : number;

  /**
   * Set the zone of free movement. The hero's position is limited by the 
   * boudings of this zone.
   * 
   * @param _p1_x Rect point 1, x value.
   * @param _p1_y Rect point 1, y value.
   * @param _p2_x Rect point 2, x value.
   * @param _p2_y Rect point 2, y value.
   */
  setMovementPadding
  (
    _p1_x : number, 
    _p1_y : number, 
    _p2_x : number, 
    _p2_y : number
  )
  : void;

  /**
   * Set the hero's actor.
   * 
   * @param _player actor.
   */
  setPlayer(_player : Ty_physicsActor)
  : void;

  /**
   * Get the hero's actor
   * 
   * @returns actor.
   */
  getPlayer()
  : Ty_physicsActor;

  /**
   * Get the hero's direction.
   */
  getDirection()
  : V2;

  /**
   * Set the hero position.
   * 
   * @param _x x component. 
   * @param _y y component.
   */
  setPosition(_x : number, _y : number)
  : void;

  /**
   * Get the current hero position.
   * 
   * @returns hero's position.
   */
  getPosition()
  : V2;

  /**
   * Handle the pointer events and update the actor components.
   * 
   * The playerController must have a reference to the hero and the InputPlugin
   * when this method is called.
   * 
   * @param _dt delta time. 
   */
  update(_dt : number)
  : void;

  /**
   * Safely destroys this player controller.
   */
  destroy()
  : void;
}