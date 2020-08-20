/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Provides a common controller for multiple ItemSpawner
 * implementations.
 *
 * @file IItemSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-19-2020
 */

import { DC_ITEM_TYPE } from "../../commons/1942enums";
import { Ty_physicsActor } from "../../commons/1942types";
import { GameManager } from "../../gameManager/gameManager";
import { IItemManager } from "../IItemManager";

/**
 * Provides a common controller for multiple ItemSpawner implementations.
 */
export interface IItemSpawner
{

  /**
   * Initialize the item spawner.
   * 
   * @param _scene Phaser scene. 
   * @param _gameManager Game Manager.
   * @param _itemManager Item Manager.
   */
  init
  (
    _scene : Phaser.Scene, 
    _gameManager : GameManager,
    _itemManager : IItemManager
  )
  : void;

  /**
   * Updates the item spawner.
   * 
   * @param _dt delta time. 
   */
  update( _dt : number ) 
  : void;

  /**
   * Spawn an item.
   * 
   * @param _actor
   * @param _x 
   * @param _y 
   * @param _type 
   * @param _data 
   */
  spawn(_actor : Ty_physicsActor, _x : number, _y : number, _data ?: any)
  : void;

  /**
   * assemble the item components.
   * 
   * @param _actor actor.
   */
  assemble(_actor : Ty_physicsActor)
  : void;

  /**
   * disassemble the item components.
   * 
   * @param _actor actor.
   */
  disassemble(_actor : Ty_physicsActor)
  : void;

  /**
   * Set the item manager.
   * 
   * @param _manager item manager 
   */
  setItemManager(_manager : IItemManager)
  : void;

  /**
   * Get this item spawner identifier.
   */
  getID()
  : DC_ITEM_TYPE;

  /**
   * Safely destroys the item spawner.
   */
  destroy()
  : void;
}