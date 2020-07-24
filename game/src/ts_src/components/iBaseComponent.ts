/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Provides a base interface for the game components.
 *
 * @file iBaseComponent.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-23-2020
 */

import { BaseActor } from "../actors/baseActor";

/**
 * Provides a base interface for the game components.
 */
export interface IBaseComponent<T>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Initalize this component.
   */
  init(_actor : BaseActor<T>) : void;

  /**
   * Updates the component.
   */
  update(_actor : BaseActor<T>) : void;

  /**
   * Receive a message.
   * 
   * @param _id Message id. 
   * @param _obj Message object.
   */
  receive(_id : integer, _obj : any) : void;

  /**
   * Destroys the component.
   */
  destroy() : void;
  
  /**
   * The component id.
   */
  m_id : number;
}