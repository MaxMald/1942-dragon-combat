/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file stateSpiderAttack.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-12-2020
 */

import { IBaseState } from "./IBaseState";

export class StateSpiderAttack
implements IBaseState
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    this.m_id = "Spider_Attack";
    return;
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
  
}