/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmdSpawnRanger.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-25-2020
 */

import { DC_ENEMY_TYPE } from "../../commons/1942enums";
import { CnfRangerConfig } from "../../configObjects/cnfRangerConfig";
import { IEnemiesManager } from "../../enemiesManager/iEnemiesManager";
import { GameManager } from "../../gameManager/gameManager";
import { ILevelGenerator } from "../../levelGenerator/iLevelGenerator";
import { ILevelCommand } from "./iLevelCommands";

export class CmdSpawnRanger 
implements ILevelCommand
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor(_x : number, _y : number, _config : CnfRangerConfig)
  {
    this._m_position = new Phaser.Geom.Point(_x, _y);
    this._m_config = _config;
    return;
  }

  exec(_levelGenerator: ILevelGenerator)
  : void 
  {
    let gameManager : GameManager = GameManager.GetInstance();
    let enemiesManager : IEnemiesManager = gameManager.getEnemiesManager();
    let gameScene : Phaser.Scene = gameManager.getGameScene();

    enemiesManager.spawn
    (
      this._m_position.x, 
      gameScene.game.canvas.height + 300, 
      DC_ENEMY_TYPE.kRanger,
      this._m_config
    );

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
    this._m_config = null;
    this._m_position = null;
    return;
  }

  private _m_config : CnfRangerConfig;

  private _m_position : Phaser.Geom.Point;  
}