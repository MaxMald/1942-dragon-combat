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

import { DC_ENEMY_TYPE } from "../commons/1942enums";
import { Ty_physicsActor } from "../commons/1942types";
import { CnfScoreManager } from "../configObjects/cnfScoreManager";
import { GameManager } from "../gameManager/gameManager";

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
  init(_scene : Phaser.Scene, _config : CnfScoreManager)
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
   * Get the score multiplier.
   * 
   * @returns multiplier
   */
  getMultiplier()
  : integer;

  /**
   * Set the score multiplier.
   * 
   * @param _mult multiplier 
   */
  setMultiplier(_mult : integer)
  : void;


  /**
   * Add score points.
   * 
   * @param _points score points. 
   */
  addScore(_points : integer)
  : void;

  /**
   * Called when an enemy is killed.
   */
  onEnemyKilled(_enemy : DC_ENEMY_TYPE)
  : void;

  /**
   * Called when the hero had been hit.
   */
  onHeroHit(_actor : Ty_physicsActor)
  : void;

  /**
   * Get the health bonus multiplier.
   */
  getHealthBonus()
  : number;

  /**
   * Get kill bonus multiplier.
   */
  getKillsBonus()
  : number;

  /**
   * Get the total score.
   */
  getTotalScore()
  : integer;

  /**
   * Get the number of stars achived.
   */
  getStarsNum()
  : integer;

  /**
   * Called when mision in completed.
   */
  onMisionComplete()
  : void;

  /**
   * Called when mision failed.
   */
  onMisionFailed()
  : void;  

  /**
   * Destroy the score manager.
   */
  destroy()
  : void;
}