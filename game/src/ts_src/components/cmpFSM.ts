/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Provides FSM functionality with BaseStates. This component is
 * intended to be fully implemented by a derived class. The ID is not defined.
 *
 * @file cmpFSM.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-20-2020
 */

import { BaseActor } from "../actors/baseActor";
import { IBaseState } from "../states/IBaseState";
import { NullState } from "../states/nullState";
import { IBaseComponent } from "./iBaseComponent";

/**
 * Provides FSM functionality with BaseStates. This component is intended to be
 * fully implemented by a derived class. The ID is not defined.
 */
export class cmpFSM<T>
implements IBaseComponent<T>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * 
   * @param _actor 
   */
  init(_actor: BaseActor<T>)
  : void 
  { }

  /**
   * Updates the active state.
   * 
   * @param _actor actor. 
   */
  update(_actor: BaseActor<T>)
  : void 
  { 
    this._m_active_state.update();
    return;
  }

  /**
   * Resend the message to the active state.
   * 
   * @param _id message id. 
   * @param _obj message.
   */
  receive(_id: number, _obj: any)
  : void 
  { 
    this._m_active_state.receive(_id, _obj);
    return;
  }

  /**
   * Set the active state of this component.
   * 
   * @param _state_name state name.
   */
  setActiveState(_state_name : string)
  : void
  {
    let activeState = this._m_active_state;
    let hStates = this._m_hStates;

    if(hStates.has(_state_name))
    {
      activeState.onExit();
      activeState = hStates.get(_state_name);
      activeState.onEnter();

      this._m_active_state = activeState;
    }
    return;
  }

  /**
   * Adds a new state to this component.
   * 
   * @param _state state. 
   */
  addState(_state : IBaseState)
  : void
  {
    this._m_hStates.set(_state.m_id, _state);
    return;
  }

  /**
   * Get a state from this component. Returns NullState if the state was not
   * found.
   * 
   * @param _state_name state name.
   * 
   * @returns state. NullState if the state was not found.
   */
  getState(_state_name : string)
  : IBaseState
  {
    if(this._m_hStates.has(_state_name))
    {
      return this._m_hStates.get(_state_name);
    }
    
    return NullState.GetInstance();
  }

  destroy()
  : void 
  { }

  /**
   * Component IDs.
   */
  m_id: number;

  /****************************************************/
  /* Protected                                        */
  /****************************************************/
  
  /**
   * The active state.
   */
  protected _m_active_state : IBaseState;

  /**
   * Map of states.
   */
  protected _m_hStates : Map<string, IBaseState>;
}