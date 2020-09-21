/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttBalsaruFollow.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-11-2020
 */

import { DC_MESSAGE_ID } from "../../commons/1942enums";
import { CmpBalsaruController } from "../../components/cmpBalsaruControllert";
import { GameManager } from "../../gameManager/gameManager";
import { ICmpState } from "../ICmpState";

export class SttBalsaruEvade
implements ICmpState<CmpBalsaruController>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    this.m_id = 'evade';
    
    this._m_gm = GameManager.GetInstance();

    this._m_time = 0.0;
    this._m_duration = 10.0;

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

    // Set Neck State

    this._m_cmp.m_actor.sendMessage
    (
      DC_MESSAGE_ID.kSetNeckState,
      'evade'
    );

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
    this._m_time += this._m_gm.m_dt;

    if(this._m_time > this._m_duration)
    {
      this._m_cmp.setActiveState('attack_anticipation');
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
  
  private _m_time : number;

  private _m_duration : number;

  private _m_gm : GameManager;

  private _m_cmp : CmpBalsaruController;
}