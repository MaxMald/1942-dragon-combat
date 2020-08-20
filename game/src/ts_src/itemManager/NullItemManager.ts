/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary ItemManager without implementation.
 *
 * @file NullItemManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-19-2020
 */

import { DC_ITEM_TYPE } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite } from "../commons/1942types";
import { GameManager } from "../gameManager/gameManager";
import { IItemManager } from "./IItemManager";

 /**
  * ItemManager without implementation.
  */
export class NullItemManager
implements IItemManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  init(_scene: Phaser.Scene, _gameManager: GameManager)
  : void 
  {
    return;
  }

  update(_dt: number)
  : void 
  {
    return;
  }

  spawn(_x: number, _y: number, _type: DC_ITEM_TYPE, _data?: any)
  : void 
  {
    return;
  }

  disableActor(_actor : Ty_physicsActor)
  : void
  {
    return;
  }

  collisionVsSprite
  (
    _scene : Phaser.Scene,
    _body : Ty_physicsSprite
  )
  : void
  {
    return;
  }

  clear()
  : void 
  {
    return;
  }

  destroy()
  : void 
  {
    return;
  } 
}