/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file playerController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-22-2020
 */

import { MxActor } from "behaviour/mxActor";
import { DC_MESSAGE_ID } from "../messages/dcMessageID";

/**
 * Control the input handling of the hero.
 */
export class PlayerController
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor()
  {
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
   * Handle the input.
   * 
   * The playerController must have a reference to the hero and the InputPlugin
   * when this method is called.
   * 
   * @param _dt Delta time. 
   */
  public update(_dt : number)
  : void
  {
    ///////////////////////////////////
    // Input Handling

    this._handleInput();

    ///////////////////////////////////
    // Update


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

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _handleInput()
  : void
  {
    let pointer : Phaser.Input.Pointer = this._m_pointer;

    if(pointer.isDown) {
      this._m_player.sendMessage(DC_MESSAGE_ID.kPointerMoved, pointer);
    }
    return;
  }

  /**
   * The pointer that is associated with the hero.
   */
  private _m_pointer : Phaser.Input.Pointer;

  /**
   * Reference to the Hero.
   */
  private _m_player : MxActor;
}