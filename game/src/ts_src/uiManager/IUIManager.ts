/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file IUIManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-09-2020
 */

import { GameManager } from "../gameManager/gameManager";

export interface IUIManager
{ 
  /**
   * Reset the UIManager to its default values.
   * 
   * @param _scene Phaser's scene.
   * @param _gameManager game manager.
   */
  reset(_scene : Phaser.Scene, _gameManager : GameManager)
  : void;

  /**
   * Update the UIManager
   * 
   * @param _dt delta time. 
   */
  update(_dt : number)
  : void;
}