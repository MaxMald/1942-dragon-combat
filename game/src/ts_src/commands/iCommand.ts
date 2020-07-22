/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Base interface for the game commands.
 *
 * @file ICommand.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-22-2020
 */

import { MxActor } from "behaviour/mxActor";


/**
 * Base interface for the Commands.
 */
export interface ICommand
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Execute the command.
   * 
   * @param _actor The actor where the command will be executed.
   */
  exec(_actor : MxActor) : void;
}