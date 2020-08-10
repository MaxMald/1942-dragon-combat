/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary The score manager has the count of credit points that the player had
  * take during the all the game or level.
 *
 * @file iScoreManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-06-2020
 */

import { GameManager } from "../gameManager/gameManager";
import { ScoreManagerConfig } from "./scoreManagerConfig";

 /**
  * The score manager has the count of credit points that the player had take
  * during the all the game or level.
  */
export interface IScoreManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Initialize the score manager.
   * 
   * @param _scene phaser scene. 
   * @param _config configuration file.
   */
  init(_scene : Phaser.Scene, _config : ScoreManagerConfig)
  : void;

  /**
   * Reset the score manager.
   * 
   * @param _scene phaser scene. 
   * @param _gameManager game manager.
   */
  reset(_scene : Phaser.Scene, _gameManager : GameManager)
  : void;
  
  /**
   * Update the score manager.
   * 
   * @param _dt delta time. 
   */
  update(_dt : number)
  : void;

  /**
   * Suscribe to an event of this score manager.
   * 
   * @param _event event key. 
   * @param _username username.
   * @param _function function.
   * @param _context context.
   */
  suscribe
  (
    _event : string,
    _username : string,
    _function : (_scoreManager : IScoreManager, _args : undefined) => void,
    _context : any
  )
  : void;

  /**
   * Unsucribe from a score manager event.
   * 
   * @param _event event key.
   * @param _username username.
   */
  unsuscribe(_event : string, _username : string) : void;

  /**
   * Get the player's score.
   * 
   * @returns player's score.
   */
  getScore()
  : integer;

  /**
   * Set the player's score.
   * 
   * @param _score player's score. 
   */
  setScore(_score : integer)
  : void;

  /**
   * Add score points.
   * 
   * @param _points score points. 
   */
  addScore(_points : integer)
  : void;

  /**
   * Destroy the score manager.
   */
  destroy()
  : void;
}