/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary This interface provides a base controller for all the items in the
 * game.
 *
 * @file iCmpItemController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-19-2020
 */

import { Ty_physicsSprite } from "../commons/1942types";
import { IItemManager } from "../itemManager/IItemManager";
import { IItemSpawner } from "../itemManager/itemSpawner/IItemSpawner";
import { IBaseComponent } from "./iBaseComponent";

 /**
  * Provides a base controller for all the game items.
  */
export interface ICmpItemController
extends IBaseComponent<Ty_physicsSprite>
{  
  /**
   * Get the type of this item controller.
   */
  getType()
  : number;

  /**
   * Set the Item Spawner of this controller.
   * 
   * @param _spawner Item spawner.
   */
  setItemSpawner(_spawner : IItemSpawner)
  : void;

  /**
   * Set the Item Manager of this controller.
   * 
   * @param _manager Item manager. 
   */
  setItemManager(_manager : IItemManager)
  : void;
}