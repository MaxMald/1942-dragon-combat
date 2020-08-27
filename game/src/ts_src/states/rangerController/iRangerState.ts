/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file iRangerState.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-25-2020
 */

import { Ty_physicsActor } from "../../commons/1942types";
import { CmpRangerController } from "../../components/cmpRangerController";
import { CnfRangerConfig } from "../../configObjects/cnfRangerConfig";
import { IBaseState } from "../IBaseState";

export interface IRangerState 
extends IBaseState
{
  init( _controller : CmpRangerController, _actor : Ty_physicsActor) 
  : void;

  setConfig(_config : CnfRangerConfig)
  : void;
}