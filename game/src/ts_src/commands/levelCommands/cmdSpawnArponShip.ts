/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmdSpawnArponShip.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-27-2020
 */

import { DC_ENEMY_TYPE } from "../../commons/1942enums";
import { CnfArponShip } from "../../configObjects/cnfArponShip";
import { IEnemiesManager } from "../../enemiesManager/iEnemiesManager";
import { GameManager } from "../../gameManager/gameManager";
import { ILevelGenerator } from "../../levelGenerator/iLevelGenerator";
import { ILevelCommand } from "./iLevelCommands";

export class CmdSpawnArponShip 
implements ILevelCommand
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor(_x : number, _y : number, _config : CnfArponShip)
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

    enemiesManager.spawn
    (
      this._m_position.x, 
      -50.0, 
      DC_ENEMY_TYPE.kArponShip,
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

  private _m_config : CnfArponShip;

  private _m_position : Phaser.Geom.Point;
}