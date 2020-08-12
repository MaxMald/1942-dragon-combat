/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmdEnterBoss.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-12-2020
 */

import { Point } from "../../commons/1942types";
import { GameManager } from "../../gameManager/gameManager";
import { ILevelGenerator } from "../../levelGenerator/iLevelGenerator";
import { ILevelCommand } from "./iLevelCommands";

export class CmdEnterBoss
implements ILevelCommand
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    this._m_position = new Phaser.Geom.Point();
    return;
  }

  exec(_levelGenerator: ILevelGenerator)
  : void 
  { 
    let gameManager = GameManager.GetInstance();

    let bossManager = gameManager.getBossManager();

    bossManager.active();
    return;
  }
  
  getPosition()
  : Phaser.Geom.Point 
  { 
    return this._m_position;
  }
  
  setPosition(_x: number, _y: number)
  : void 
  { 
    this._m_position.setTo(_x, _y);
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
  
  private _m_position : Point;
  
}