/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Input controller of the Hero.
 *
 * @file cmpHeroInput.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-23-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_MESSAGE_ID } from "../messages/dcMessageID";
import { DC_COMPONENT_ID } from "./dcComponentID";
import { IBaseComponent } from "./iBaseComponent";

/**
 * Input controller of the Hero.
 */
export class CmpHeroInput implements IBaseComponent<Phaser.Physics.Arcade.Sprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Creates a new Hero's Input Controller with the default values.
   */
  static Create()
  : CmpHeroInput
  {
    let input : CmpHeroInput = new CmpHeroInput();

    input.m_id = DC_COMPONENT_ID.kHeroInput;    
    input._m_v3 = new Phaser.Math.Vector3();
    input._m_player_speed = 200.0;
    input._m_movement_fn = input._mixedMovement;
    input._m_pointerDown = false;

    return input;
  }
   
  init(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>) 
  : void 
  {
    return;
  }

  /**
   * Sets the input pointer of this component.
   * 
   * @param _pointer Phaser input pointer.
   */
  setPointer(_pointer : Phaser.Input.Pointer)
  : void
  {
    this._m_pointer = _pointer;

    _pointer.isDown
    return;
  }

  /**
   * Set the input mode of this Hero. 
   * 
   * @param _mode "RELATIVE", "ABSOLUTE", "MIXED" 
   */
  setMode(_mode : string)
  : void
  {
    switch(_mode) {
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

  /**
   * Set the maximum speed (pixels per frame) that the hero moves when it follows
   * the pointer.
   * 
   * @param _speed speed in pixels per frame.
   */
  setSpeed(_speed : number)
  : void
  {
    this._m_player_speed = _speed;
  }

  /**
   * Calls the movement function defined by the input mode.
   * 
   * @param _actor BaseActor.
   */
  update(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  {
    let pointer = this._m_pointer;

    if(pointer.isDown) {
      
      // Movement
      this._m_movement_fn.call(this, _actor);

      if(!this._m_pointerDown)
      {
        this._m_pointerDown = !this._m_pointerDown;

        _actor.sendMessage(DC_MESSAGE_ID.kPointerPressed, pointer);
      }
    }
    else
    {
      if(this._m_pointerDown)
      {
        this._m_pointerDown = !this._m_pointerDown;
        
        _actor.sendMessage(DC_MESSAGE_ID.kPointerReleased, pointer);
      }
    }

    return;
  }

  receive(_id: number, _obj: any)
  : void 
  { }

  /**
   * Safely destroys this component.
   */
  destroy()
  : void 
  {
    this._m_pointer = null;
    this._m_movement_fn = null;
    this._m_v3 = null;
    return;
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _pointerUp()
  : void
  {
    console.log("pointer up");
    return;
  }

  /**
   * Moves the hero to the pointer position in the world.
   */
  private _absoluteMovement(_actor : BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void
  {
    let pointer : Phaser.Input.Pointer = this._m_pointer;

    let heroSprite = _actor.getWrappedInstance();

    let heroPosition : Phaser.Math.Vector2 
      = new Phaser.Math.Vector2(heroSprite.x, heroSprite.y);

    this._m_v3.x = pointer.position.x - heroPosition.x;
    this._m_v3.y = pointer.position.y - heroPosition.y;

    if(this._m_v3.length() > this._m_player_speed) {
      
      this._m_v3.normalize();

      this._m_v3.x *= this._m_player_speed;
      this._m_v3.y *= this._m_player_speed;
    }    

    _actor.sendMessage(DC_MESSAGE_ID.kAgentMove, this._m_v3);  
    return;
  }

  /**
   * Relative movement moves the player the same ammount and direction as the
   * pointer's movement.
   */
  private _relativeMovement(_actor : BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void
  {
    let pointer : Phaser.Input.Pointer = this._m_pointer;   
    
    this._m_v3.x = pointer.position.x - pointer.prevPosition.x;
    this._m_v3.y = pointer.position.y - pointer.prevPosition.y;    

    _actor.sendMessage(DC_MESSAGE_ID.kAgentMove,this._m_v3);

    return;
  }

  /**
   * Mixed movement set the X position of the player at the X position of the
   * pointer, but keep a relative position at the Y axis.
   */
  private _mixedMovement(_actor : BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void
  {
    let pointer : Phaser.Input.Pointer = this._m_pointer;
    
    let heroSprite = _actor.getWrappedInstance();

    let heroPosition : Phaser.Math.Vector2 
      = new Phaser.Math.Vector2(heroSprite.x, heroSprite.y);   

    this._m_v3.x = pointer.position.x - heroPosition.x;
    if(this._m_v3.x > this._m_player_speed) {
      this._m_v3.x = this._m_player_speed;
    }

    this._m_v3.y = pointer.position.y - pointer.prevPosition.y;   

    _actor.sendMessage
    (
      DC_MESSAGE_ID.kAgentMove,
      this._m_v3
    );

    return;
  }

  /**
   * The movement method used when the pointer is pressed.
   */
  private _m_movement_fn : (_actor : BaseActor<Phaser.Physics.Arcade.Sprite>) => void;
  
  /**
   * Reference to the input pointer.
   */
  private _m_pointer : Phaser.Input.Pointer;

  /**
   * The maximum speed of the hero.
   */
  private _m_player_speed : number;

  /**
   * Cache vector used to send messages.
   */
  private _m_v3 : Phaser.Math.Vector3;

  /**
   * Indicates if the pointer is down.
   */
  private _m_pointerDown : boolean;
}