/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Provides Message receivers to move the position of the Arcade Sprite.
 *
 * @file cmpMovement.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-22-2020
 */

import { IBaseComponent } from "./iBaseComponent";
import { BaseActor } from "../actors/baseActor";
import { DC_MESSAGE_ID } from "../messages/dcMessageID";
import { DC_COMPONENT_ID } from "./dcComponentID";

/**
 * Provides Message receivers to move the position of the Arcade Sprite.
 */
export class CmpMovement implements IBaseComponent<Phaser.Physics.Arcade.Sprite> 
{  
  /****************************************************/
  /* Public                                           */
  /****************************************************/  

  /**
   * Creates a new CmpMovement. The object will not be ready to use, make sure
   * that the init() method is called by the BaseActor or manually.
   */
  static Create()
  : CmpMovement
  {
    let movement : CmpMovement = new CmpMovement();
    
    movement.m_id = DC_COMPONENT_ID.kMovement;
    
    movement._limit_p1 = new Phaser.Geom.Point(0.0, 0.0);
    movement._limit_p2 = new Phaser.Geom.Point(500.0, 500.0);

    movement._m_prevPosition = new Phaser.Geom.Point(0.0 , 0.0);

    movement._m_direction = new Phaser.Math.Vector2(1.0, 0.0);   

    movement._m_isDirty = true;
    
    return movement;
  }

  /**
   * Take the wrapped instance of the BaseActor.
   * 
   * @param _actor 
   */
  init(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  { 
    this._m_sprite = _actor.getWrappedInstance();
    return;
  }

  /**
   * Set the limit of movement in the world.
   * 
   * @param _p1_x Rect point 1 x value. 
   * @param _p1_y Rect point 1 y value.
   * @param _p2_x Rect point 2 x value.
   * @param _p2_y Rect point 2 y value.
   */
  setBounding(_p1_x : number, _p1_y : number, _p2_x : number, _p2_y : number)
  : void
  {
    this._limit_p1.x = _p1_x;
    this._limit_p1.y = _p1_y;

    this._limit_p2.x = _p2_x;
    this._limit_p2.y = _p2_y;

    return;
  }
  
  update(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  { }

  /**
   * Handle movement messages.
   * 
   * @param _id Message ID. 
   * @param _obj Message Object.
   */
  receive(_id: number, _obj: any): void 
  { 
    switch(_id)
    {
      case DC_MESSAGE_ID.kPointerMoved: // Agent moves to the pointer position.

        {
          let pointer : Phaser.Input.Pointer = _obj as Phaser.Input.Pointer;
          
          this.setPosition(pointer.position.x, pointer.position.y);
        }
        
        return;
      
      case DC_MESSAGE_ID.kAgentMove: // Agent moves with a movement vector.

        {
          let movement : Phaser.Math.Vector3 = _obj as Phaser.Math.Vector3;

          let sprite = this._m_sprite;
          
          this.setPosition(sprite.x + movement.x, sprite.y + movement.y);
        }

        return;

      case DC_MESSAGE_ID.kAgentMove: // Agent moves with a movement vector.

        {
          let movement : Phaser.Math.Vector3 = _obj as Phaser.Math.Vector3;
          
          let sprite = this._m_sprite;

          this.setPosition(sprite.x + movement.x, sprite.y + movement.y);
        }

        return;

      default: // Do nothing LOL.
        return;
    }
  }

  /**
   * Set the position of the wrapped object, considering the limints defined
   * by the bounding rectangle.
   * 
   * @param _x x value.
   * @param _y y value.
   */
  setPosition(_x : number, _y : number)
  : void
  {
    let sprite = this._m_sprite;

    let position : Phaser.Math.Vector2 = new Phaser.Math.Vector2(_x, _y);

    this._safePosition(position);

    this._m_prevPosition.setTo(sprite.x, sprite.y);

    this._m_sprite.setPosition(position.x, position.y);

    this._m_isDirty = true;
    return;
  }

  /**
   * Get the direction of movement based in the previous and actual position.
   * 
   * @returns Direction vector.
   */
  getDirection()
  : Phaser.Math.Vector2
  {
    if(this._m_isDirty) {

      let sprite = this._m_sprite;
      let prevPos = this._m_prevPosition;

      this._m_direction.setTo
      (
        sprite.x - prevPos.x,
        sprite.y - prevPos.y
      );
      this._m_direction.normalize();

      this._m_isDirty = false;
    }

    return this._m_direction;
  }
  
  /**
   * Safely destroys this component.
   */
  destroy(): void 
  { 
    this._m_sprite = null;
    return;
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Ensures that the given position is inside the boundings, if not the vector
   * will be truncated to the bounding area.
   * 
   * @param _position 
   */
  private _safePosition(_position : Phaser.Math.Vector2)
  : void
  {
    let p1 : Phaser.Geom.Point = this._limit_p1;
    let p2 : Phaser.Geom.Point = this._limit_p2;

    // x axis.

    if(_position.x < p1.x) {
      _position.x = p1.x;
    }
    else if(_position.x > p2.x) {
      _position.x = p2.x;
    }

    // y axis.

    if(_position.y < p1.y) {
      _position.y = p1.y;
    }
    else if(_position.y > p2.y) {
      _position.y = p2.y;
    }

    return;
  }
  
  /**
   * Reference to the Arcade Sprite.
   */
  private _m_sprite : Phaser.Physics.Arcade.Sprite;

  /**
   * Point 1 of the bounding rectangle, wich defines the limit of movement in the
   * world.
   */
  private _limit_p1 : Phaser.Geom.Point;

  /**
   * Point 2 of the bounding rectangle, wich defines the limit of movement in the
   * world.
   */
  private _limit_p2 : Phaser.Geom.Point;

  /**
   * The direction of the the BaseActor, based in the previous position and the
   * actual.
   */
  private _m_direction : Phaser.Math.Vector2;

  /**
   * The previous position of the BaseActor.
   */
  private _m_prevPosition : Phaser.Geom.Point;

  /**
   * Indicates if the parameters needs an update.
   */
  private _m_isDirty : boolean;
}