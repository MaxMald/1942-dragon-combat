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

export class CmpUIScoreMultiplier 
implements IBaseComponent<Ty_Text>
{
  static Create()
  : CmpUIScoreMultiplier
  {
    let controller = new CmpUIScoreMultiplier();

    controller.m_id = DC_COMPONENT_ID.kUIScoreMultiplier;

    return controller;
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

  onMultiplierChange(_scoreManager : IScoreManager, _args : undefined)
  : void
  {
    let sMultiplier : string = "x " + _scoreManager.getMultiplier().toString();
    this._actor.sendMessage(DC_MESSAGE_ID.kSetText, sMultiplier);
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