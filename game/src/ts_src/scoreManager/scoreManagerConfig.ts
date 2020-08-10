/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Configuration file for the score manager.
 *
 * @file scoreManagerConfig.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-09-2020
 */

/**
 * Configuration file for the score manager.
 */
export class ScoreManagerConfig 
{
  constructor()
  {
    this.init_score = 0;
    return;
  }

  /**
   * Initial player's score.
   */
  init_score : integer;
}