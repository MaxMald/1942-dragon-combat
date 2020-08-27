/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmdSpawnSonic.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-26-2020
 */

import { DC_ENEMY_TYPE } from "../../commons/1942enums";
import { CnfSonic } from "../../configObjects/cnfSonic";
import { IEnemiesManager } from "../../enemiesManager/iEnemiesManager";
import { GameManager } from "../../gameManager/gameManager";
import { ILevelGenerator } from "../../levelGenerator/iLevelGenerator";
import { ILevelCommand } from "./iLevelCommands";

export class CmdSpawnSonic 
implements ILevelCommand
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor(_x : number, _y : number, _config : CnfSonic)
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

    let canvas = gameScene.game.canvas;

    this._m_position.x = canvas.width * this._m_config.coord_x;
    this._m_position.y = canvas.height * this._m_config.coord_y;  

    enemiesManager.spawn
    (
      this._m_position.x, 
      this._m_position.y,
      DC_ENEMY_TYPE.kSonico,
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

  private _m_config : CnfSonic;

  private _m_position : Phaser.Geom.Point;  
}