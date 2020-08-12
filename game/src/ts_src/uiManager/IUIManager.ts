/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file IUIManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-09-2020
 */

import { DC_MESSAGE_ID } from "../commons/1942enums";
import { GameManager } from "../gameManager/gameManager";

export interface IUIManager
{ 

  /**
   * Initialize the UIManager.
   * 
   * @param _scene phaser scene. 
   * @param _gameManager game manager.
   */
  init(_scene : Phaser.Scene, _gameManager : GameManager)
  : void;

  /**
   * Receive a message.
   * 
   * @param _id message id. 
   * @param _msg message
   */
  receive(_id : DC_MESSAGE_ID, _msg : any)
  : void;

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

  /**
   * Destroy the ui manager.
   */
  destroy()
  : void;
}