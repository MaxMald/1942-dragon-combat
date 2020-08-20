/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Provides a base interface for multiple implementations of the
 * ItemManager.
 *
 * @file IItemManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-19-2020
 */

import { DC_ITEM_TYPE } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite } from "../commons/1942types";
import { GameManager } from "../gameManager/gameManager";

/**
 * Provides a base interface for multiple implementations of the ItemManager.
 */
export interface IItemManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Initialize the ItemManager.
   */
  init(_scene : Phaser.Scene, _gameManager : GameManager)
  : void;
  
  /**
   * Update the ItemManager.
   * 
   * @param _dt delta time. 
   */
  update(_dt : number) 
  : void;

  /**
   * Spawn an item in the given position.
   * 
   * @param _x x position. 
   * @param _y y position.
   * @param _type item type.
   * @param _data optional data.
   */
  spawn(_x : number, _y : number, _type : DC_ITEM_TYPE, _data ?: any)
  : void;

  /**
   * Disable an item actor.
   * 
   * @param _actor item actor. 
   */
  disableActor(_actor : Ty_physicsActor)
  : void;

  /**
   * Add a collision detection ageinst a sprite.
   * 
   * @param _scene the scene with the physics engine.
   * @param _body the sprite body.
   */
  collisionVsSprite
  (
    _scene : Phaser.Scene,
    _body : Ty_physicsSprite
  )
  : void;

  /**
   * 
   */
  clear()
  : void;

  /**
   * Safely destroys this ItemManager
   */
  destroy()
  : void;
}