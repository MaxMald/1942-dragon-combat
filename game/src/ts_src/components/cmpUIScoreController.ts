/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpUIScoreController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-06-2020
 */

import { IBaseComponent } from "./iBaseComponent";
import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_Text } from "../commons/1942types";
import { IScoreManager } from "../scoreManager/iScoreManager";

export class CmpUIScoreController 
implements IBaseComponent<Ty_Text>
{
  static Create()
  : CmpUIScoreController
  {
    let healthController = new CmpUIScoreController();

    healthController.m_id = DC_COMPONENT_ID.kUIScoreController;

    return healthController;
  }

  init(_actor: BaseActor<Phaser.GameObjects.Text>)
  : void 
  {
    this._actor = _actor;
    return;
  }

  update(_actor: BaseActor<Phaser.GameObjects.Text>)
  : void 
  { }

  receive(_id: number, _obj: any)
  : void 
  { }

  onScoreChanged(_scoreManager : IScoreManager, _args : undefined)
  : void
  {
    let sScore : string = "Score : " + _scoreManager.getScore().toString();

    this._actor.sendMessage(DC_MESSAGE_ID.kSetText, sScore);

    return;
  }

  destroy()
  : void 
  { 
    this._actor = null;
    return;
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _actor : BaseActor<Ty_Text>;
}