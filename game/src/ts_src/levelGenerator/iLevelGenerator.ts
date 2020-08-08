/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file iLevelGenerator.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-07-2020
 */

export interface ILevelGenerator
{
  /**
   * Update the LevelGenerator.
   * 
   * @param _dt delta time.
   */
  update(_dt)
  : void;

  /**
   * Destroy the LevelGenerator.
   */
  destroy()
  : void;
}