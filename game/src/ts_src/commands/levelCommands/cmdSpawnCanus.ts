/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmdSpawnCanus.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-20-2020
 */

import { DC_ITEM_TYPE } from "../../commons/1942enums";
import { Point } from "../../commons/1942types";
import { GameManager } from "../../gameManager/gameManager";
import { IItemManager } from "../../itemManager/IItemManager";
import { ILevelGenerator } from "../../levelGenerator/iLevelGenerator";
import { ILevelCommand } from "./iLevelCommands";

/**
 * Spawns a canus fruit in the given position.
 */
export class CmdSpawnCanus 
implements ILevelCommand
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Create a new command. This command spawns a Cadmio Fruit when is
   * executed.
   * 
   * @param _x position x axis. 
   * @param _y position y axis.
   */
  constructor(_x : number, _y : number)
  {
    this._m_position = new Phaser.Geom.Point
    (
      _x,
      _y
    );
  }

  /**
   * Spawn a Cadmio Fruit.
   * 
   * @param _levelGenerator level generatior
   */
  exec(_levelGenerator: ILevelGenerator)
  : void 
  {
    let gameManager : GameManager = GameManager.GetInstance();
    let itemManager : IItemManager = gameManager.getItemManager();

    itemManager.spawn(this._m_position.x, -50.0, DC_ITEM_TYPE.kCanus);
    return;
  }

  /**
   * Get the position of this command in the world.
   * 
   * @returns position.
   */
  getPosition()
  : Phaser.Geom.Point 
  {
    return this._m_position;
  }

  /**
   * Set the position of this command in the world.
   * 
   * @param _x position x axis.
   * @param _y position y axis.
   */
  setPosition(_x: number, _y: number)
  : void 
  {
    this._m_position.setTo(_x, _y);
    return;
  }

  /**
   * Safely destroys this command.
   */
  destroy()
  : void 
  {
    this._m_position = null;
    return;
  }

  /**
   * Spawn position.
   */
  _m_position : Point;
}