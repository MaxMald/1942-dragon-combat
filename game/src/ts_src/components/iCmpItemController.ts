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
}