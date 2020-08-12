/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file NullUIManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-09-2020
 */

import { DC_MESSAGE_ID } from "../commons/1942enums";
import { GameManager } from "../gameManager/gameManager";
import { IUIManager } from "./IUIManager";

export class NullUIManager
implements IUIManager
{

  /**
   * No implemenation.
   * 
   * @param _scene phaser scene. 
   * @param _gameManager game manager.
   */
  init(_scene : Phaser.Scene, _gameManager : GameManager)
  : void
  { }

  /**
   * No implemenation.
   * 
   * @param _id 
   * @param _msg 
   */
  receive(_id : DC_MESSAGE_ID, _msg : any)
  : void
  { }

  /**
   * 
   * @param _scene Phaser's scene.
   * @param _gameManager game manager.
   */
  reset(_scene : Phaser.Scene, _gameManager : GameManager)
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
   * No implementation.
   */
  destroy()
  : void
  { }
  
}