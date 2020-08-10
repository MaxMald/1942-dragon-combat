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
import { GameManager } from "../gameManager/gameManager";
import { IScoreManager } from "./iScoreManager";
import { ScoreManagerConfig } from "./scoreManagerConfig";

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

    scoreManager._m_score = 0.0;
    
    // Create the event manager.

    scoreManager._m_listener 
      = new MxListenerManager<IScoreManager, undefined>();

    scoreManager._m_listener.addEvent('scoreChanged');

    return scoreManager;
  }

  /**
   * Initialize the score manager.
   * 
   * @param _scene phaser scene.
   * @param _config configuration file.
   */
  init(_scene : Phaser.Scene, _config : ScoreManagerConfig)
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
      this._m_config = new ScoreManagerConfig();
    }

    this.setScore(this._m_config.init_score);
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
   * Add score points.
   * 
   * @param _points score points. 
   */
  addScore(_points : integer)
  : void
  {
    this._m_score += _points;

    this._m_listener.call("scoreChanged", this, undefined);
    return;
  }

  /**
   * Safely destroys the score manager.
   */
  destroy()
  : void 
  {
    this._m_listener.destroy();
    return;
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
   * The score manager configuration file.
   */
  private _m_config : ScoreManagerConfig;

  /**
   * ScoreManager listeners.
   */
  private _m_listener : MxListenerManager<IScoreManager, undefined>; 
}