/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file scoreManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-06-2020
 */

import { MxListener } from "listeners/mxListener";
import { MxListenerManager } from "listeners/mxListenerManager";
import { DC_COMPONENT_ID, DC_ENEMY_TYPE } from "../commons/1942enums";
import { Ty_physicsActor } from "../commons/1942types";
import { CmpHeroData } from "../components/cmpHeroData";
import { CnfScoreManager } from "../configObjects/cnfScoreManager";
import { IEnemiesManager } from "../enemiesManager/iEnemiesManager";
import { GameManager } from "../gameManager/gameManager";
import { IPlayerController } from "../playerController/IPlayerController";
import { IScoreManager } from "./iScoreManager";

 /**
  * 
  */
export class ScoreManager
implements IScoreManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Create a new score manager.
   * 
   * @returns A new score manager.
   */
  static Create()
  : ScoreManager
  {
    let scoreManager = new ScoreManager();

    // default properties.

    scoreManager._m_score = 0;

    scoreManager._m_mult = 1;

    scoreManager._m_killCount = 0;

    scoreManager._m_healthBonus = 1;

    scoreManager._m_killBonus = 1;

    scoreManager._m_totalScore = 0;

    scoreManager._m_starsNum = 0;
    
    // Create the event manager.

    scoreManager._m_listener 
      = new MxListenerManager<IScoreManager, undefined>();

    scoreManager._m_listener.addEvent('scoreChanged');
    scoreManager._m_listener.addEvent('multiplierChanged');

    return scoreManager;
  }

  /**
   * Initialize the score manager.
   * 
   * @param _scene phaser scene.
   * @param _config configuration file.
   */
  init(_scene : Phaser.Scene, _config : CnfScoreManager)
  : void
  { 
    this._m_config = _config;
    return;
  }

  /**
   * Reset properties to default values. These values will be defined by the
   * configuration value, if it exists.
   * 
   * @param _scene phaser scene.
   * @param _gameManager game manager.
   */
  reset
  (
    _scene : Phaser.Scene, 
    _gameManager : GameManager
  )
  : void
  {    
    if(this._m_config == null)
    {
      this._m_config = new CnfScoreManager();
    }

    this._m_mult = 1;
    this._m_killCount = 0;
    this._m_healthBonus = 1;
    this._m_killBonus = 1;
    this._m_totalScore = 0;
    this._m_starsNum = 0;

    this.setScore(0.0);
    this.setMultiplier(1);
    return;
  }

  /**
   * Update this score manager.
   * 
   * @param _dt delta time. 
   */
  update(_dt: number)
  : void 
  {
    return;
  }

  /**
   * Events:
   * 
   * I) scoreChanged : triggered when the score changed.
   * II) multiplerChanged : triggered when the multiplier changed.
   * 
   * @param _event event key.
   * @param _username username.
   * @param _function fn.
   * @param _context context.
   */
  suscribe
  (
    _event: string, 
    _username: string, 
    _function: (_scoreManager : IScoreManager, _args : undefined) => void, 
    _context: any
  )
  : void 
  {
    this._m_listener.suscribe
    (
      _event,
      _username,
      new MxListener<IScoreManager, undefined>(_function, _context)
    );
    return;
  }

  /**
   * Events:
   * 
   * I) scoreChanged : triggered when the score changed.
   * 
   * @param _event event key. 
   * @param _username username.
   */
  unsuscribe(_event: string, _username: string)
  : void 
  {
    this._m_listener.unsuscribe(_event, _username);
    return;
  }  

  /**
   * Get the player's score.
   * 
   * @returns player's score.
   */
  getScore()
  : integer
  {
    return this._m_score;
  }

  /**
   * Set the player's score.
   * 
   * @param _score player's score. 
   */
  setScore(_score : integer)
  : void
  {
    this._m_score = _score;

    this._m_listener.call("scoreChanged", this, undefined);
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
    return this._m_mult;
  }

  /**
   * Set the score multiplier.
   * 
   * @param _mult multiplier 
   */
  setMultiplier(_mult : integer)
  : void
  {
    this._m_mult = _mult;
    this._m_listener.call("multiplierChanged", this, undefined);
    return;
  }

  /**
   * Add score points.
   * 
   * @param _points score points. 
   */
  addScore(_points : integer)
  : void
  {
    this._m_score += _points * this._m_mult;

    this._m_listener.call("scoreChanged", this, undefined);
    return;
  }

  /**
   * Called when mision in completed.
   */
  onMisionComplete()
  : void
  {    
    ///////////////////////////////////
    // Kill Bonus

    let gm : GameManager = GameManager.GetInstance();

    let playerController : IPlayerController = gm.getPlayerController();

    let killsCount : number = playerController.getKillCount();

    let enemiesManager : IEnemiesManager = gm.getEnemiesManager();

    let enemyCount : number = enemiesManager.getEnemiesCount();

    // Calculate the player kills range.

    let range = 100 * ( killsCount / enemyCount);

    let config = this._m_config;

    // Check the player range.

    if(range >= config.range_A_min)
    {
      this._m_killBonus = config.range_A_mult;
    }
    else if(range >= config.range_B_min)
    {
      this._m_killBonus = config.range_B_mult;
    }
    else if(range >= config.range_C_min)
    {
      this._m_killBonus = config.range_C_mult;
    }
    else
    {
      this._m_killBonus = 1;
    }

    ///////////////////////////////////
    // Health Bonus

    let hero = playerController.getPlayer();

    let heroData = hero.getComponent<CmpHeroData>(DC_COMPONENT_ID.kHeroData);

    range = heroData.getHealth();

    // Check the player range.

    if(range >= config.range_A_min)
    {
      this._m_healthBonus = config.range_A_mult;
    }
    else if(range >= config.range_B_min)
    {
      this._m_healthBonus = config.range_B_mult;
    }
    else if(range >= config.range_C_min)
    {
      this._m_healthBonus = config.range_C_mult;
    }
    else
    {
      this._m_healthBonus = 1;
    }

    ///////////////////////////////////
    // Total Score

    let totalScore : integer 
      = this._m_score 
      * this._m_healthBonus 
      * this._m_killBonus;
      
    this._m_totalScore = totalScore; 

    ///////////////////////////////////
    // Stars

    if(totalScore >= this._m_config.stars_AAA_min)
    {
      this._m_starsNum = 3;
    }
    else if(totalScore >= this._m_config.stars_AA_min)
    {
      this._m_starsNum = 2;
    }
    else if(totalScore >= this._m_config.stars_A_min)
    {
      this._m_starsNum = 1;
    }
    else
    {
      this._m_starsNum = 0;
    }

    return;
  }

  /**
   * Called when mision failed.
   */
  onMisionFailed()
  : void
  { }

  /**
   * Safely destroys the score manager.
   */
  destroy()
  : void 
  {
    this._m_listener.destroy();
    return;
  }

  /**
   * Called when an enemy is killed.
   */
  onEnemyKilled(_enemy : DC_ENEMY_TYPE)
  : void
  {
    ++this._m_killCount;

    let mult = 1 + Math.floor(this._m_killCount / this._m_config.kill_for_add);

    this.setMultiplier(mult);
    return;
  }

  /**
   * Called when the hero had been hit.
   */
  onHeroHit(_actor : Ty_physicsActor)
  : void
  {
    this._m_killCount = 0;
    this.setMultiplier(1);
    return;
  }

  /**
   * Get the final multiplier.
   * 
   * @returns;
   */
  getKillsBonus()
  : number
  {
    return this._m_killBonus;
  }

  getHealthBonus()
  : number
  {
    return this._m_healthBonus;
  }

  /**
   * Get the total score.
   */
  getTotalScore()
  : integer
  {
    return this._m_totalScore;
  }

  /**
   * Get the number of stars achived.
   */
  getStarsNum()
  : integer
  {
    return this._m_starsNum;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * private constructor.
   */
  private constructor()
  { }  
  
  /**
   * Hero's score.
   */
  private _m_score : integer;

  /**
   * Hero's final score. Score + health bonus + kills bonus.
   */
  private _m_totalScore : integer;

  /**
   * Score multiplier (kills).
   */
  private _m_mult : integer;

  /**
   * Number of kills.
   */
  private _m_killCount : integer;

  /**
   * Kill bonus multiplier.
   */
  private _m_killBonus : integer;

  /**
   * Health bonus multiplier.
   */
  private _m_healthBonus : integer;

  /**
   * Number of stars achived.
   */
  private _m_starsNum : integer;

  /**
   * The score manager configuration file.
   */
  private _m_config : CnfScoreManager;

  /**
   * ScoreManager listeners.
   */
  private _m_listener : MxListenerManager<IScoreManager, undefined>; 
}