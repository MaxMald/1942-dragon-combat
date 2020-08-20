/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file nullItemSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-19-2020
 */

import { DC_ITEM_TYPE } from "../../commons/1942enums";
import { Ty_physicsActor } from "../../commons/1942types";
import { GameManager } from "../../gameManager/gameManager";
import { IItemManager } from "../IItemManager";
import { IItemSpawner } from "./IItemSpawner";

/**
 * Item Spawner without implementation.
 */
export class NullItemSpawner 
implements IItemSpawner
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
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
  : void
  {
    return;
  }

  /**
   * Updates the item spawner.
   * 
   * @param _dt delta time. 
   */
  update( _dt : number ) 
  : void
  {
    return;
  }

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
  : void
  {
    return;
  }

  /**
   * assemble the item components.
   * 
   * @param _actor actor.
   */
  assemble(_actor : Ty_physicsActor)
  : void
  {
    return;
  }

  /**
   * disassemble the item components.
   * 
   * @param _actor actor.
   */
  disassemble(_actor : Ty_physicsActor)
  : void
  {
    return;
  }

  /**
   * Set the item manager.
   * 
   * @param _manager item manager 
   */
  setItemManager(_manager : IItemManager)
  : void
  {
    return;
  }

  /**
   * Get this item spawner identifier.
   */
  getID()
  : DC_ITEM_TYPE
  {
    return DC_ITEM_TYPE.kUndefined;
  }

  /**
   * Safely destroys the item spawner.
   */
  destroy()
  : void
  {
    return;
  }  
}