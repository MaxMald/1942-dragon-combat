/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttIdle.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-09-2020
 */

import { CmpBalsaruController } from "../../components/cmpBalsaruControllert";
import { GameManager } from "../../gameManager/gameManager";
import { ICmpState } from "../ICmpState";

export class SttBalsaruIdle
implements ICmpState<CmpBalsaruController>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    this.m_id = 'idle';
    
    this._m_gm = GameManager.GetInstance();
    this._m_duration = 5.0;
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