/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmdBossStage.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since October-07-2020
 */

import { DC_MESSAGE_ID } from "../../commons/1942enums";
import { Point, Ty_TileObject } from "../../commons/1942types";
import { GameManager } from "../../gameManager/gameManager";
import { ILevelGenerator } from "../../levelGenerator/iLevelGenerator";
import { ILevelCommand } from "./iLevelCommands";

export class CmdBossStage
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
    GameManager.ReceiveMessage
    (
      DC_MESSAGE_ID.kBossStage, 
      this.m_stage_min_hp
    );

    return;
  }

  setFromObject(_object : Ty_TileObject)
  : void
  {
    if(_object.properties != undefined)
    {
      let aProperties : Array<any> = _object.properties;
      let index = 0;
      let property : any;

      while(index < aProperties.length)
      {
        property = aProperties[index];

        switch(property.name)
        {
          case "stage_min_hp":

          this.m_stage_min_hp = property.value as number;
          break;
        }
        ++index;
      }
    }
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

  m_stage_min_hp : number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_position : Point;
  
  
}