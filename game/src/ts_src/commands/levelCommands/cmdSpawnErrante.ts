/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Spawns a new errante dragon in the position. 
 *
 * @file cmdSpawnErrante.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-08-2020
 */

import { DC_ENEMY_TYPE, DC_MESSAGE_ID } from "../../commons/1942enums";
import { GameManager } from "../../gameManager/gameManager";
import { ILevelGenerator } from "../../levelGenerator/iLevelGenerator";
import { MsgEnemySpawn } from "../../messages/msgEnemySpawn";
import { ILevelCommand } from "./iLevelCommands";

/**
 * Spawns a new errante dragon in the position.
 */
export class CmdSpawnErrante 
implements ILevelCommand
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor(_x : number, _y : number)
  {
    this._m_position = new Phaser.Geom.Point(_x, _y);
    return;
  }
  
  /**
   * Spawns an errante dragon
   * 
   * @param _levelGenerator level generator reference. 
   */
  exec(_levelGenerator: ILevelGenerator)
  : void 
  {
    GameManager.ReceiveMessage
    (
      DC_MESSAGE_ID.KSpawnEnemy,
      new MsgEnemySpawn
      (
        DC_ENEMY_TYPE.kErrante,
        this._m_position.x,
        this._m_position.y
      )
    );

    return;
  }

  getPosition()
  : Phaser.Geom.Point 
  {
    return this._m_position;
  }

  setPosition(_x : number, _y : number)
  : void
  {
    this._m_position.x = _x;
    this._m_position.y = _y;    
    return;
  }

  destroy()
  : void 
  { }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * The position of this command in the world.
   */
  _m_position : Phaser.Geom.Point;
}