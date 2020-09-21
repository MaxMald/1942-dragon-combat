/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpBalsaruControllert.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-09-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID } from "../commons/1942enums";
import { Ty_physicsSprite } from "../commons/1942types";
import { SttBalsaruFollow } from "../states/balsaruController.ts/sttBalsaruFollow";
import { SttBalsaruIdle } from "../states/balsaruController.ts/sttBalsaruIdle";
import { SttBalsaruEvade } from "../states/balsaruController.ts/sttBalsaruEvade";
import { IBaseState } from "../states/IBaseState";
import { NullState } from "../states/nullState";
import { cmpFSM } from "./cmpFSM";
import { SttBalsaruAttackAnticipation } from "../states/balsaruController.ts/sttBalsaruAttackAticipation";

export class CmpBalsaruController
extends cmpFSM<Ty_physicsSprite>
{
  
  static Create()
  : CmpBalsaruController
  {
    let cmp = new CmpBalsaruController();

    cmp.m_id = DC_COMPONENT_ID.kBalsaruController;

    cmp._m_hStates = new Map<string, IBaseState>();
    cmp._m_active_state = NullState.GetInstance();

    // Idle State

    let idle = new SttBalsaruIdle();
    idle.setComponent(cmp);

    cmp.addState(idle);

    cmp.setActiveState('idle');

    // Follow State

    let follow = new SttBalsaruFollow();

    follow.setComponent(cmp);

    cmp.addState(follow);

    // Evade State

    let evade = new SttBalsaruEvade();

    evade.setComponent(cmp);

    cmp.addState(evade);

    // Attack Anticipation

    let attackAnticipation = new SttBalsaruAttackAnticipation();

    attackAnticipation.setComponent(cmp);

    cmp.addState(attackAnticipation);
    
    return cmp;
  }

  /**
   * 
   * @param _actor 
   */
  init(_actor: BaseActor<Ty_physicsSprite>)
  : void 
  { 
    this.m_actor = _actor;
    return;
  }

  m_actor : BaseActor<Ty_physicsSprite>;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
}