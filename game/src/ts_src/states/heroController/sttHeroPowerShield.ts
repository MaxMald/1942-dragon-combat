/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttHeroPowerShield.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-24-2020
 */

import { DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite } from "../../commons/1942types";
import { CmpHeroController } from "../../components/cmpHeroController";
import { ICmpState } from "../ICmpState";

export class SttHeroPowerShield
implements ICmpState<CmpHeroController>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor()
  {
    this.m_id = "powerShield";    
    this._reset();
    return;
  }

  onEnter()
  : void 
  {
    if(this._m_controller != null)
    {
      let actor : Ty_physicsActor =  this._m_controller.getActor();
      let sprite : Ty_physicsSprite = actor.getWrappedInstance();
      
      sprite.body.enable = false;
    }
    this._reset();
    return;
  }

  onExit()
  : void 
  {
    if(this._m_controller != null)
    {
      let actor : Ty_physicsActor = this._m_controller.getActor();
      let sprite : Ty_physicsSprite = actor.getWrappedInstance();
      
      sprite.body.enable = true;
    }
    return;
  }

  receive(_id: number, _obj: any)
  : void 
  {
    switch(_id)
    {
      case DC_MESSAGE_ID.kPowerShieldDesactivated:      
      this._m_controller.setActive('normal');
      return;
    }
    return;
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

  _reset()
  : void
  {
    return;
  }
  
  /**
   * Reference to the state main component.
   */
  private _m_controller : CmpHeroController;
}