/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttRangerIdle.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-25-2020
 */

import { Ty_physicsActor } from "../../commons/1942types";
import { CmpRangerController } from "../../components/cmpRangerController";
import { CnfRangerConfig } from "../../configObjects/cnfRangerConfig";
import { IRangerState } from "./iRangerState";

export class SttRangerIdle 
implements IRangerState
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
    _controller : CmpRangerController, 
    _actor : Ty_physicsActor
  ) 
  : void
  {
    this._m_controller = _controller;
    this._m_actor = _actor;
    return;
  }

  setConfig(_config : CnfRangerConfig)
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
  { }

  m_id: string; 
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_config : CnfRangerConfig;

  private _m_controller : CmpRangerController;

  private _m_actor : Ty_physicsActor;
}