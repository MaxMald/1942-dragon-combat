/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file iScoreManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-06-2020
 */

 /**
  * 
  */
export interface IScoreManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
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