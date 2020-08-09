/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file NullUIManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-09-2020
 */

import { GameManager } from "../gameManager/gameManager";
import { IUIManager } from "./IUIManager";

export class NullUIManager
implements IUIManager
{

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
  
}