/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Score manager without implemenation.
 *
 * @file nullScoreManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-06-2020
 */

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