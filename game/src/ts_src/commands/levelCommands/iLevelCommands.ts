/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary A LevelCommand is an event that has a position in the world. It can
 * be executed by its exec method. This object is commonly used to spawn
 * enemies.
 *
 * @file iLevelCommands.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-08-2020
 */

import { Point } from "../../commons/1942types";
import { ILevelGenerator } from "../../levelGenerator/iLevelGenerator";

/**
 * A LevelCommand is an event that has a position in the world. It can be
 * executed by its exec method. This object is commonly used to spawn enemies.
 */
export interface ILevelCommand
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Execute the command.
   * 
   * @param _levelGenerator level generator.
   */
  exec(_levelGenerator : ILevelGenerator)
  : void;

  /**
   * Get the command position in the world.
   */
  getPosition()
  : Point;

  /**
   * Set the command position in the world.
   * 
   * @param _x x component. 
   * @param _y y component.
   */
  setPosition(_x : number, _y : number)
  : void;

  /**
   * Destroys the command.
   */
  destroy()
  : void;
}