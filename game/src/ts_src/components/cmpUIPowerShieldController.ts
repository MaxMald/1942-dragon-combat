/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpUIPowerShieldController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-28-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_Text } from "../commons/1942types";
import { CmpPowerShieldController } from "./cmpPowerShieldController";
import { IBaseComponent } from "./iBaseComponent";

export class CmpUIPowerShieldController 
implements IBaseComponent<Ty_Text>
{
  static Create()
  : CmpUIPowerShieldController
  {
    let healthController = new CmpUIPowerShieldController();

    healthController.m_id = DC_COMPONENT_ID.kUIPowerShieldController;

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

  onProgress(_cmp : CmpPowerShieldController, _args : any)
  : void
  {
    let mult = _args as number;

    this._actor.sendMessage
    (
      DC_MESSAGE_ID.kSetText,
      'Power Shield : ' + Math.floor((100.0 * mult)) + ' %'
    );
    return;
  }

  onPowerShieldActivated(_cmp : CmpPowerShieldController, _args : any)
  : void
  {
    this._actor.sendMessage
    (
      DC_MESSAGE_ID.kSetText,
      'Power Shield : 0 %'
    );

    this._actor.sendMessage
    (
      DC_MESSAGE_ID.kShow,
      undefined
    );
    return;
  }

  onPowerShieldDesactivated(_cmp : CmpPowerShieldController, _args : any)
  : void
  {
    this._actor.sendMessage
    (
      DC_MESSAGE_ID.kClose,
      undefined
    );
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