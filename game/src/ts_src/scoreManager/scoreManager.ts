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

    scoreManager._m_score = 0.0;
    
    // events.

    scoreManager._m_listener 
      = new MxListenerManager<IScoreManager, undefined>()

    scoreManager._m_listener.addEvent('scoreChanged');

    return scoreManager;
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

  destroy()
  : void 
  {
    
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
   * ScoreManager listeners.
   */
  private _m_listener : MxListenerManager<IScoreManager, undefined>; 
}