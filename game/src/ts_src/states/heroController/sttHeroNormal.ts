/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file SttHeroNormal.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-18-2020
 */

import { DC_MESSAGE_ID } from "../../commons/1942enums";
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
    
  }

  onExit()
  : void 
  {
    
  }

  receive(_id: number, _obj: any)
  : void 
  {
    switch(_id)
    {
      case DC_MESSAGE_ID.kPointerReleased:
      
      this._m_controller.setActive("barrelRoll");
      return;

      default:
      return;
    }
  }

  update()
  : void 
  {
    
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