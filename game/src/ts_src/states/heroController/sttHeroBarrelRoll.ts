/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttHeroBarrelRoll.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-18-2020
 */

import { DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite } from "../../commons/1942types";
import { CmpHeroController } from "../../components/cmpHeroController";
import { GameManager } from "../../gameManager/gameManager";
import { ICmpState } from "../ICmpState";

export class SttHeroBarrelRoll
implements ICmpState<CmpHeroController>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor()
  {
    this.m_id = "barrelRoll";
    this._m_gameManager = GameManager.GetInstance();
    this._m_stateDuration = 1.0;
    
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

      actor.sendMessage
      (
        DC_MESSAGE_ID.kEnterBarrelRoll,
        undefined
      );
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

      actor.sendMessage
      (
        DC_MESSAGE_ID.kExitBarrelRoll,
        undefined
      );
    }
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
    this._m_time += this._m_gameManager.m_dt;
    
    if(this._m_time >= this._m_stateDuration)
    {
      this._m_controller.setActive("normal");
    }
    return;
  }

  /**
   * Set the duration of this state in seconds.
   * 
   * @param _duration duration in seconds. 
   */
  setStateDuration(_duration : number)
  : void
  {
    this._m_stateDuration = _duration;
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
    this._m_gameManager = null;
    return;
  }

  m_id: string;

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  _reset()
  : void
  {
    this._m_time = 0.0;
    return;
  }
  
  /**
   * Reference to the state main component.
   */
  _m_controller : CmpHeroController;

  /**
   * State duration.
   */
  _m_stateDuration : number;

  /**
   * time elapsed since this state start.
   */
  _m_time : number;

  /**
   * Reference to the game manager.
   */
  _m_gameManager : GameManager;
}