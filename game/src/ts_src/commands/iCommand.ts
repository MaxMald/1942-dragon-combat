/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Base interface for the game commands.
 *
 * @file ICommand.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-22-2020
 */

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
   */
  exec() : void;
}