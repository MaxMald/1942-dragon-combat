import { CmpAnimation } from "../components/cmpHeroAnimation";
/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file IAnimationState.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-24-2020
 */

import { IBaseState } from "./IBaseState";

/**
 * Animation state interface.
 */
export interface IAnimationState extends IBaseState
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Reference to the Animation component that this State is attached.
   */
  m_component : CmpAnimation;
}