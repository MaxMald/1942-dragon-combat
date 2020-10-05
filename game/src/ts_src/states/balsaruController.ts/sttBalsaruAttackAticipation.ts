/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttBalsaruAttackAticipation.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-16-2020
 */

import { DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsSprite } from "../../commons/1942types";
import { CmpBalsaruController } from "../../components/cmpBalsaruControllert";
import { GameManager } from "../../gameManager/gameManager";
import { ICmpState } from "../ICmpState";

export class SttBalsaruAttackAnticipation
implements ICmpState<CmpBalsaruController>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    this.m_id = 'attack_anticipation';
    
    this._m_gm = GameManager.GetInstance();

    this._m_time = 0.0;

    this._m_duration_shrink = 0.5;
    this._m_duration_rumble = 1.0;

    return;
  }

  setComponent(_component: CmpBalsaruController)
  : void 
  {
    this._m_cmp = _component;
    return;
  }

  getComponent()
  : CmpBalsaruController 
  {
    return this._m_cmp;
  }

  onEnter()
  : void 
  {
    this._m_time = 0.0;

    ///////////////////////////////////
    // Balsaru Head

    let head : Ty_physicsSprite 
      = this._m_cmp.m_head.getWrappedInstance();

    head.setTint(0xff0000);

    ///////////////////////////////////
    // Shrink state

    this._m_cmp.m_head.sendMessage
    (
      DC_MESSAGE_ID.kSetNeckState,
      'rumble'
    );

    // Set active state.

    this._m_activeState = this._updateRumble;
    return;
  }

  onExit()
  : void 
  {
    return;
  }

  receive(_id: number, _obj: any)
  : void 
  {
    return;
  }

  update()
  : void 
  {
    if(this._m_activeState != null)
    {
      this._m_activeState.call(this);
    }
    return;
  }

  destroy()
  : void 
  {
    this._m_gm = null;
    this._m_cmp = null;
    return;
  }

  m_id: string;
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _updateRumble()
  : void
  {
    this._m_time += this._m_gm.m_dt;

    if(this._m_time > this._m_duration_rumble)
    {
      this._m_time = 0.0;

      this._m_cmp.setActiveState('attack');

      this._m_activeState = this._updateShrink;
    }
    return;
  }

  private _updateShrink()
  : void
  {
    this._m_time += this._m_gm.m_dt;

    if(this._m_time > this._m_duration_shrink)
    {
      this._m_time = 0.0;

      this._m_cmp.m_head.sendMessage
      (
        DC_MESSAGE_ID.kSetNeckState,
        'rumble'
      );

      this._m_activeState = this._updateRumble;
    }
    return;
  }

  private _m_activeState : () => void;

  private _m_time : number;

  private _m_duration_rumble : number;

  private _m_duration_shrink : number;

  private _m_gm : GameManager;

  private _m_cmp : CmpBalsaruController;
}