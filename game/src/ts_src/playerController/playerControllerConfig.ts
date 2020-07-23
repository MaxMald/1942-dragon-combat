/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Configuration object for the PlayerController. 
 *
 * @file playerControllerConfig.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-23-2020
 */

/**
 * Configuration object for the PlayerController.
 */
export class PlayerControllerConfig
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Set the player maximum speed (pixels per frame) when the player moves 
   * towards the pointer position (ABSOLUTE).
   */
  public player_speed : number;

  /**
   * Set the control behaviour when the pointer is pressed.
   * 
   * RELATIVE: Relative movement moves the player the same ammount and direction 
   * as the pointer's movement.
   * 
   * ABSOLUTE: Moves the hero to the pointer position in the world.
   * 
   * MIXED: Mixed movement set the X position of the player at the X position of 
   * the pointer, but keep a relative position at the Y axis.
   */
  public control_type : string;
}