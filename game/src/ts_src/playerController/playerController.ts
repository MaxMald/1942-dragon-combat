/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Controls the input handling and behaviour of the hero.
 *
 * @file playerController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-22-2020
 */

import { MxActor } from "behaviour/mxActor";
import { DC_MESSAGE_ID } from "../messages/dcMessageID";
import { PlayerControllerConfig } from "./playerControllerConfig";

/**
 * Controls the input handling and behaviour of the hero.
 */
export class PlayerController
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor(_config ?: PlayerControllerConfig)
  {
    this._m_v3 = new Phaser.Math.Vector3();

    this._m_player_direction = new Phaser.Math.Vector2();

    if(_config !== undefined) {
      this._m_player_speed = _config.player_speed;

      switch(_config.control_type) {
        case "RELATIVE":
          this._m_movement_fn = this._relativeMovement;
          break;
        case "ABSOLUTE":
          this._m_movement_fn = this._absoluteMovement;
          break;
        case "MIXED":
          this._m_movement_fn = this._mixedMovement;
          break;
        default:
          this._m_movement_fn = this._mixedMovement;
          break;
      }

    }
    else
    {      
      this._m_movement_fn = this._mixedMovement;

      this._m_player_speed = 200.0;
    }
    return;
  }
  
  /**
   * Initialize this PlayerController. This method can receive a pointer that
   * will be used for the player input, and a reference to the player.
   * 
   * @param _pointer 
   * @param _player 
   */
  public init
  (
    _pointer ?: Phaser.Input.Pointer, 
    _player ?: MxActor
  ) : void
  {
    if(_pointer !== undefined) {
      this._m_pointer = _pointer;
    }

    if(_player !== undefined) {
      this._m_player = _player;
    }
    return;
  }

  /**
   * Set the pointer that is associated to the player input.
   * 
   * @param _pointer Phaser pointer.
   */
  public setPointer(_pointer : Phaser.Input.Pointer)
  : void
  {
    return;
  }

  /**
   * Set the Hero.
   * 
   * @param _player 
   */
  public setPlayer(_player : MxActor)
  : void
  {
    this._m_player = _player;
    return;
  }

  /**
   * Handle the inputs and update any logic proccess.
   * 
   * The playerController must have a reference to the hero and the InputPlugin
   * when this method is called.
   * 
   * @param _dt Delta time. 
   */
  public update(_dt : number)
  : void
  {
    // Handle the inputs.

    this._handleInput();

    // Update logic.

    this._m_player.update();

    return;
  }

  /**
   * Safely destroys this object.
   */
  public destroy()
  : void
  {
    this._m_pointer = null;
    this._m_player = null;
    return;
  }

  /**
   * Set the player direction vector.
   * 
   * @param _x x value. 
   * @param _y y value.
   */
  public setDirection(_x : number, _y : number)
  : void
  {
    this._m_player_direction.x = _x;
    this._m_player_direction.y = _y;
    return;
  }

  /**
   * Get the player direction vector.
   * 
   * @reaturns Phaser Vector2
   */
  public getDirection()
  : Phaser.Math.Vector2
  {
    return this._m_player_direction;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Handle the pointer input with the defined function: Absolute, relative or
   * mixed.
   */
  private _handleInput()
  : void
  {
    let pointer : Phaser.Input.Pointer = this._m_pointer;

    if(pointer.isDown) {
      this._m_movement_fn.call(this);
    }
    return;
  }

  /**
   * Moves the hero to the pointer position in the world.
   */
  private _absoluteMovement()
  : void
  {
    let pointer : Phaser.Input.Pointer = this._m_pointer;
    let heroPosition : Phaser.Math.Vector3 
      = this._m_player.m_transform.getGlobalPoisition();

    this._m_v3.x = pointer.position.x - heroPosition.x;
    this._m_v3.y = pointer.position.y - heroPosition.y;

    if(this._m_v3.length() > this._m_player_speed) {
      
      this._m_v3.normalize();

      this._m_v3.x *= this._m_player_speed;
      this._m_v3.y *= this._m_player_speed;
    }    

    this._m_player.sendMessage(DC_MESSAGE_ID.kAgentMove, this._m_v3);
    
    this._m_v3.normalize();
    this.setDirection(this._m_v3.x, this._m_v3.y);

    return;
  }

  /**
   * Relative movement moves the player the same ammount and direction as the
   * pointer's movement.
   */
  private _relativeMovement()
  : void
  {
    let pointer : Phaser.Input.Pointer = this._m_pointer;   

    this._m_v3.x = pointer.position.x - pointer.prevPosition.x;
    this._m_v3.y = pointer.position.y - pointer.prevPosition.y;    

    this._m_player.sendMessage
    (
      DC_MESSAGE_ID.kAgentMove,
      this._m_v3
    );

    this._m_v3.normalize();
    this.setDirection(this._m_v3.x, this._m_v3.y);

    return;
  }

  /**
   * Mixed movement set the X position of the player at the X position of the
   * pointer, but keep a relative position at the Y axis.
   */
  private _mixedMovement()
  : void
  {
    let pointer : Phaser.Input.Pointer = this._m_pointer;
    let heroPosition : Phaser.Math.Vector3 
      = this._m_player.m_transform.getGlobalPoisition();   

    this._m_v3.x = pointer.position.x - heroPosition.x;
    if(this._m_v3.x > this._m_player_speed) {
      this._m_v3.x = this._m_player_speed;
    }

    this._m_v3.y = pointer.position.y - pointer.prevPosition.y;   

    this._m_player.sendMessage
    (
      DC_MESSAGE_ID.kAgentMove,
      this._m_v3
    );
    
    this._m_v3.normalize();
    this.setDirection(this._m_v3.x, this._m_v3.y);

    return;
  }

  /**
   * The movement method used when the pointer is pressed.
   */
  private _m_movement_fn : () => void;

  /**
   * Cache vector used to send messages.
   */
  private _m_v3 : Phaser.Math.Vector3;

  /**
   * The pointer that is associated with the hero.
   */
  private _m_pointer : Phaser.Input.Pointer;

  /**
   * Reference to the Hero.
   */
  private _m_player : MxActor;

  /**
   * The maximum speed of the hero.
   */
  private _m_player_speed : number;

  /**
   * The direction vector of the hero.
   */
  private _m_player_direction : Phaser.Math.Vector2;
}