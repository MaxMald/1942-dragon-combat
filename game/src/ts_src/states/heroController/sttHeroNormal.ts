/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file SttHeroNormal.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-18-2020
 */

import { DC_MESSAGE_ID, DC_SECONDARY_ACTION } from "../../commons/1942enums";
import { CmpHeroController } from "../../components/cmpHeroController";
import { ICmpState } from "../ICmpState";

export class SttHeroNormal
implements ICmpState<CmpHeroController>
{  
  /****************************************************/
  /* Public                                           */
  /****************************************************/  

  constructor()
  {
    this.m_id = "normal";
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
    switch(_id)
    {
      case DC_MESSAGE_ID.kPointerReleased:
      
      if(this._m_controller.getSecondaryAction() == DC_SECONDARY_ACTION.kShield)
      {
        this._m_controller.getPowerShieldActor().sendMessage
        (
          DC_MESSAGE_ID.kActive,
          undefined
        );
      }
      else
      {
        this._m_controller.setActive("barrelRoll");
      }      
      return;

      case DC_MESSAGE_ID.kPowerShieldActivated:

      this._m_controller.setActive('powerShield');
      return;

      case DC_MESSAGE_ID.kRangerExplosionHit:

      this._m_controller.getActor().sendMessage
      (
        DC_MESSAGE_ID.kHit,
        _obj
      );
      return;

      default:
      return;
    }
  }

  update()
  : void 
  {
    return;
  }

  /**
   * Set this state main component.
   * 
   * @param _component component. 
   */
  setComponent(_component: CmpHeroController)
  : void 
  {
    this._m_controller = _component;
    return;
  }

  /**
   * Get this state main component.
   * 
   * @returns component.
   */
  getComponent()
  : CmpHeroController 
  {
    return this._m_controller;
  }

  /**
   * Safely destroys this state.
   */
  destroy()
  : void 
  { 
    this._m_controller = null;
    return;
  }

  m_id: string;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the state main component.
   */
  _m_controller : CmpHeroController;  
}