/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file ICmpState.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-18-2020
 */

import { IBaseState } from "./IBaseState";

export interface ICmpState<T>
extends IBaseState
{
  /**
   * Set this state main component.
   * 
   * @param _component component.
   */
  setComponent( _component : T)
  : void;

  /**
   * Get this state main component.
   * 
   * @returns component.
   */
  getComponent()
  : T;
}