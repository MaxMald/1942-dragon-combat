/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file CmpMovementBullet.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-29-2020
 */

import { IBaseComponent } from "./iBaseComponent";
import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";

/**
 * Provides Message receivers to move the position of the Arcade Sprite.
 */
export class CmpMovementBullet implements IBaseComponent<Phaser.Physics.Arcade.Sprite> 
{  
  /****************************************************/
  /* Public                                           */
  /****************************************************/  

  /**
   * Creates a new CmpMovementBullet. The object will not be ready to use, make sure
   * that the init() method is called by the BaseActor or manually.
   */
  static Create()
  : CmpMovementBullet
  {
    let movement : CmpMovementBullet = new CmpMovementBullet();
    
    movement.m_id = DC_COMPONENT_ID.kMovementBullet;    

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
      case DC_MESSAGE_ID.kAgentMove: // Agent moves with a movement vector.

        {
          let movement : Phaser.Math.Vector3 = _obj as Phaser.Math.Vector3;

          this.move(movement.x, movement.y);
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

    this._m_prevPosition.setTo(sprite.x, sprite.y);

    sprite.setPosition(_x, _y);

    this._m_isDirty = true;
    return;
  }

  move(_x : number, _y : number)
  : void
  {
    let sprite = this._m_sprite;

    this._m_prevPosition.setTo(sprite.x, sprite.y);

    sprite.setPosition(sprite.x + _x, sprite.y + _y);

    this._m_isDirty = true;
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

  private constructor()
  { }
  
  /**
   * Reference to the Arcade Sprite.
   */
  private _m_sprite : Phaser.Physics.Arcade.Sprite;

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