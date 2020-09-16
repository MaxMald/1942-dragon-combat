/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Score manager without implemenation.
 *
 * @file nullScoreManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-06-2020
 */

import { DC_ENEMY_TYPE } from "../commons/1942enums";
import { Ty_physicsActor } from "../commons/1942types";
import { CnfScoreManager } from "../configObjects/cnfScoreManager";
import { GameManager } from "../gameManager/gameManager";
import { IScoreManager } from "./iScoreManager";

/**
 * Score manager without implemenation.
 */
export class NullScoreManager 
implements IScoreManager
{  
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  static Create()
  : NullScoreManager
  {
    return new NullScoreManager();
  }

  /**
   * No implementation
   * 
   * @param _scene 
   * @param _config 
   */
  init(_scene : Phaser.Scene, _config : CnfScoreManager)
  : void
  { }

  /**
   * No implementation.
   * 
   * @param _scene 
   * @param _gameManager 
   */
  reset
  (
    _scene : Phaser.Scene, 
    _gameManager : GameManager
  )
  : void
  {
    return;
  }
  
  /**
   * No implemenation.
   * 
   * @param _dt 
   */
  update(_dt: number)
  : void 
  { }

  /**
   * No implemenation.
   * 
   * @param _event 
   * @param _username 
   * @param _function 
   * @param _context 
   */
  suscribe
  (
    _event: string, 
    _username: string, 
    _function: (_scoreManager : IScoreManager, _args : undefined) => void, 
    _context: any
  ): void 
  {
    console.log( "NullScoreManager : suscribe");
    return;
  }

  /**
   * No implementation.
   * 
   * @param _event 
   * @param _username 
   */
  unsuscribe(_event: string, _username: string)
  : void
  {
    console.log( "NullScoreManager : unsuscribe");
    return;
  }

  /**
   * Allways returns 0.
   * 
   * @returns returns 0.
   */
  getScore()
  : number 
  {
    console.log( "NullScoreManager : getScore");
    return 0;
  }
  
  /**
   * No implementation.
   * 
   * @param _score 
   */
  setScore(_score: number)
  : void 
  {
    console.log( "NullScoreManager : setScore");
    return;
  }

  /**
   * Get the score multiplier.
   * 
   * @returns multiplier
   */
  getMultiplier()
  : integer
  {
    return 0;
  }

  /**
   * Get the health bonus multiplier.
   */
  getHealthBonus()
  : number
  {
    return 1;
  }

  /**
   * Get kill bonus multiplier.
   */
  getKillsBonus()
  : number
  {
    return 1;
  }

  /**
   * Get the total score.
   */
  getTotalScore()
  : integer
  {
    return 0;
  }

  /**
   * Get the number of stars achived.
   */
  getStarsNum()
  : integer
  {
    return 0;
  }

  /**
   * Set the score multiplier.
   * 
   * @param _mult multiplier 
   */
  setMultiplier(_mult : integer)
  : void
  {;
    return;
  }
  
  /**
   * No implementation.
   * 
   * @param _points 
   */
  addScore(_points: number)
  : void 
  {
    console.log( "NullScoreManager : addScore");
    return;
  }

  /**
   * Called when an enemy is killed.
   */
  onEnemyKilled(_enemy : DC_ENEMY_TYPE)
  : void
  {

    console.log("NullScoreManager : Enemy Killed.");
    return;
  }

  /**
   * Called when the hero had been hit.
   */
  onHeroHit(_actor : Ty_physicsActor)
  : void
  {
    // TODO.

    console.log("NullScoreManager: Hero Hit!");
    return;
  }
  
  /**
   * Called when mision in completed.
   */
  onMisionComplete()
  : void
  { }

  /**
   * Called when mision failed.
   */
  onMisionFailed()
  : void
  { }

  /**
   * No implementation. 
   */
  destroy()
  : void 
  { }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private constructor()
  { }

}