/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Indicates a direction to move the actor.
 *
 * @file msgActorMove.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-22-2020
 */

/**
 * Indicates a direction to move the actor. 
 */
export class MsgActorMove
{
  /**
   * Direction vector: x value.
   */
  public direction_x : number;

  /**
   * Direction vector: y value.
   */
  public direction_y : number;
}