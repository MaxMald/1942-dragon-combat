/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary State without implementations. It is a module, so is necesarry to
 * prepare it before using.
 *
 * @file nullState.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-24-2020
 */

import { IBaseState } from "./IBaseState";

/**
 * State without implementations in its methods. It is a module, so is necesarry
 * to prepare it before using.
 */
export class NullState implements IBaseState
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Prepares the module.
   */
  static Prepare()
  : void {
    NullState._INSTANCE = new NullState();
    NullState._INSTANCE.m_id = "";
    return;
  }

  /**
   * Shutdown the module.
   */
  static ShutDown()
  : void {
    NullState._INSTANCE = null;
    return;
  }

  /**
   * Get the module's instance.
   */
  static GetInstance()
  : NullState
  {
    return NullState._INSTANCE;
  }

  onEnter()
  : void 
  { }
  
  onExit()
  : void 
  { }
  
  receive(_id: number, _obj: any)
  : void 
  { }
  
  update()
  : void 
  { }
  
  destroy()
  : void 
  { }

  m_id: string;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private constructor()
  { }

  private static _INSTANCE : NullState;
}