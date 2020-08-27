/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file iSonicState.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-26-2020
 */

import { Ty_physicsActor } from "../../commons/1942types";
import { CmpSonicController } from "../../components/cmpSonicController";
import { CnfSonic } from "../../configObjects/cnfSonic";
import { IBaseState } from "../IBaseState";

export interface ISonicState 
extends IBaseState
{
  init( _controller : CmpSonicController, _actor : Ty_physicsActor) 
  : void;

  setConfig(_config : CnfSonic)
  : void;
}