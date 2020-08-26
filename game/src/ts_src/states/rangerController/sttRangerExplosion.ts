/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttRangerExplosion.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-25-2020
 */

import { Ty_physicsActor } from "../../commons/1942types";
import { CmpRangerController } from "../../components/cmpRangerController";
import { CnfRangerConfig } from "../../configObjects/cnfRangerConfig";
import { IRangerState } from "./iRangerState";

export class SttRangerExplosion
implements IRangerState
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor()
  {
    this.m_id = "explosion";
    return;
  }
  
  init( _controller : CmpRangerController, _actor : Ty_physicsActor) 
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
    return;
  }

  onEnter()
  : void 
  {
    

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
  
  private _m_config : CnfRangerConfig;

  private _m_controller : CmpRangerController;

  private _m_actor : Ty_physicsActor;
}