/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttSonicIdle.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-25-2020
 */

import { Ty_physicsActor } from "../../commons/1942types";
import { CmpSonicController } from "../../components/cmpSonicController";
import { CnfSonic } from "../../configObjects/cnfSonic";
import { ISonicState } from "./iSonicState";

export class SttSonicIdle 
implements ISonicState
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    this.m_id = "idle";
    return;
  }

  init
  ( 
    _controller : CmpSonicController, 
    _actor : Ty_physicsActor
  ) 
  : void
  {
    this._m_controller = _controller;
    this._m_actor = _actor;
    return;
  }

  setConfig(_config : CnfSonic)
  : void
  {
    this._m_config = _config;
  }

  onEnter()
  : void 
  { }

  onExit()
  : void 
  { }

  receive(_id: number, _obj: any)
  : void 
  { }

  update()
  : void 
  { }  

  destroy()
  : void 
  { 
    this._m_actor = null;
    this._m_controller = null;
    this._m_config = null;

    return;
  }

  m_id: string; 
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_config : CnfSonic;

  private _m_controller : CmpSonicController;

  private _m_actor : Ty_physicsActor;
}