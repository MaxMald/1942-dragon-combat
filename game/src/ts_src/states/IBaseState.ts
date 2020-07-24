/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Simple interface of a state.
 *
 * @file IBaseState.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-24-2020
 */

 /**
  * Provides a simple interface of a state.
  */
 export interface IBaseState 
 {
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Called when the state had been activated.
   */
  onEnter() : void;

  /**
   * Called when the state had been desactivated.
   */
  onExit() : void;

  /**
   * Message receptor.
   * 
   * @param _id Message id. 
   * @param _obj Message object.
   */
  receive(_id : number, _obj : any) : void;

  /**
   * 
   */
  update() : void;

  /**
   * Safely destroys the state.
   */
  destroy() : void;

  /**
   * The state indentifier.
   */
  m_id : string;
 }
