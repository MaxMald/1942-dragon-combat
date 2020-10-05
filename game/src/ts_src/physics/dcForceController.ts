/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file dcForceController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-26-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_COLOR, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsSprite, V2 } from "../commons/1942types";
import { DebugManager } from "../debugManager/debugManager";
import { GameManager } from "../gameManager/gameManager";

/**
 * Force Controller
 */
export class DCForceController
{
   /****************************************************/
  /* Public                                           */
  /****************************************************/
 
  constructor()
  {
    // No actor attached.

    this._m_debugManager = GameManager.GetInstance().getDebugManager();

    this._m_actor = null;

    // Create physics properties.

    this._m_actualVelocity = new Phaser.Math.Vector2();

    this._m_actualVelocityStepped = new Phaser.Math.Vector2();

    this._m_totalForce = new Phaser.Math.Vector2();

    this._m_lastForce = new Phaser.Math.Vector2();

    this._m_totalForceStepped = new Phaser.Math.Vector2();

    this._m_desire_velocity = new Phaser.Math.Vector2();

    this._m_steerForce = new Phaser.Math.Vector2();

    this._m_direction = new Phaser.Math.Vector2(1.0, 0.0);
    
    this._m_speed = 0.0;

    this._m_frictionForce = 100.0;
    
    this._m_mass = 1.0;
    
    return;
  }

  /**
   * Get the attached actor.
   * 
   * @param _actor actor. 
   */
  init(_actor: BaseActor<Ty_physicsSprite>)
  : void 
  {
    this._m_actor = _actor;

    return;
  }

  /**
   * Updates each force in this controller.
   * 
   * @param _actor actor. 
   */
  update(_deltaTime : number)
  : void 
  {
    // reset force.

    let totalForce = this._m_totalForce;

    let totalForceStepped = this._m_totalForceStepped;

    // is any force?

    if(totalForce.length() == 0.0)
    {

      if(Math.abs(this._m_speed) > 0.01)
      {
        // apply friction.

        this.addFriction();
      }
      else
      {
        // Set speed 0.

        this._m_speed = 0.0;

        return;
      }      
    }

    // Apply the mass to the total force.

    totalForce.scale(1.0 / this._m_mass);

    // Work with the Total force stepped

    totalForceStepped.copy(totalForce);

    totalForceStepped.scale(_deltaTime);

    // Calculate the actual velocity

    let actualVelocity = this._m_actualVelocity;

    let direction = this._m_direction;

    actualVelocity.copy(direction);

    actualVelocity.scale(this._m_speed);

    // Apply total force to the actual velocity

    actualVelocity.add(totalForceStepped);

    // Truncate the resulting velocity if it exceeds the maximum speed allowed.

    actualVelocity.limit(this._m_maxSpeed);

    // Recalculate the agent actual speed.
    
    this._m_speed = actualVelocity.length();
    
    // Apply delta time to the actual velocity, so it can be used to move the
    // actor sprite.

    let actualVelocityStepped = this._m_actualVelocityStepped;

    actualVelocityStepped.copy(actualVelocity);

    actualVelocityStepped.scale(_deltaTime);

    // Move actor sprite with the actual velocity.

    this._m_actor.sendMessage
    (
      DC_MESSAGE_ID.kAgentMove,
      actualVelocityStepped
    );

    // Recalculate the agent direction.
    
    direction.copy(actualVelocity);

    direction.normalize();

    // Reset the sum of all forces.

    this._m_lastForce.copy(totalForce);

    totalForce.reset();
 
    totalForceStepped.reset();
    
    return;
  }

  /**
   * Add a steer force to this actor.
   * 
   * @param _x x component. 
   * @param _y y component.
   */
  addSteerForce(_x : number, _y : number)
  : void
  {
    this._m_totalForce.x += _x;

    this._m_totalForce.y += _y;

    return;
  }

  getSteerForce()
  : V2
  {
    return this._m_steerForce;
  }

  /**
   * apply a friction force.  
   */
  addFriction()
  : void
  {    
    // copy direction.

    this._m_totalForce.copy(this._m_actualVelocity);

    // opposite force.

    this._m_totalForce.scale(-1);

    // limit to maximum friction force.

    this._m_totalForce.limit(this._m_frictionForce);

    return;
  }

  /**
   * Seek.
   * 
   * @param _target_position
   * @param _self_position 
   * @param _seek_maxForce 
   */
  seek
  (
    _target_position : V2, 
    _self_position : V2,
    _seek_maxForce : number
  )
  : void
  {
    // desire velocity

    let desireVelocity = this._m_desire_velocity;

    desireVelocity.setTo
    (
      _target_position.x - _self_position.x,
      _target_position.y - _self_position.y
    );

    desireVelocity.setLength(_seek_maxForce);

    // steer force.

    let steerForce = this._m_steerForce;

    steerForce.copy(desireVelocity);

    let actualVelocity = this._m_actualVelocity;

    steerForce.subtract(actualVelocity);

    steerForce.limit(_seek_maxForce);

    // Add force

    this.addSteerForce(steerForce.x, steerForce.y);

    return;
  }

  /**
   * Seek.
   * 
   * @param _target_position
   * @param _self_position 
   * @param _seek_maxForce 
   */
  arrive
  (
    _target_position : V2, 
    _self_position : V2,
    _arrive_maxForce : number
  )
  : void
  {
    // desire velocity

    let desireVelocity = this._m_desire_velocity;

    desireVelocity.setTo
    (
      _target_position.x - _self_position.x,
      _target_position.y - _self_position.y
    );

    desireVelocity.limit(_arrive_maxForce);

    desireVelocity.setLength
    (
      _arrive_maxForce * (desireVelocity.length() / _arrive_maxForce)
    );

    // steer force.

    let steerForce = this._m_steerForce;

    steerForce.copy(desireVelocity);

    let actualVelocity = this._m_actualVelocity;

    steerForce.subtract(actualVelocity);

    steerForce.limit(_arrive_maxForce);

    // Add force

    this.addSteerForce(steerForce.x, steerForce.y);

    return;
  }

  /**
   * Debug the force controller.
   * 
   * @param _self_position
   */
  debug(_self_position : V2)
  : void
  {
    // Get the actual velocity.

    let actualVelocity = this._m_actualVelocity;

    // Debug actual velocity.

    this._m_debugManager.drawLine
    (
      _self_position.x,
      _self_position.y,
      _self_position.x + actualVelocity.x,
      _self_position.y + actualVelocity.y,
      3,
      DC_COLOR.kGreen
    );

    // Debug force 

    let force = this._m_lastForce;

    this._m_debugManager.drawLine
    (
      _self_position.x + actualVelocity.x,
      _self_position.y + actualVelocity.y,
      _self_position.x + actualVelocity.x + force.x,
      _self_position.y + actualVelocity.y + force.y,
      3,
      DC_COLOR.kBlue
    );

    return;
  }

  /**
   * Get the current direction of the actor.
   */
  getDirection()
  : V2
  {
    return this._m_direction;
  }

  /**
   * Get the actor's speed (pixels per second).
   */
  getSpeed()
  : number
  {
    return this._m_speed;
  }

  /**
   * Get the actual velocity of the actor.
   */
  getVelocity()
  : V2
  {
    return this._m_actualVelocity;
  }

  /**
   * Set the actor's maximum speed allowed.
   * 
   * @param _maxSpeed 
   */
  setMaxSpeed(_maxSpeed : number)
  : void
  {
    this._m_maxSpeed = _maxSpeed;
    return;
  }

  /**
   * Get the actor's max speed (pixels per second).
   */
  getMaxSpeed()
  : number
  {
    return this._m_maxSpeed;
  }

  /**
   * Set the actor's speed.
   * 
   * @param _speed speed in pixels per second. 
   */
  setSpeed(_speed : number)
  : void
  {
    this._m_speed = _speed;
    return;
  }

  /**
   * Get the actor's mass.
   */
  getMass()
  : number
  {
    return this._m_mass;
  }

  /**
   * Set the actor's mass. If the given mass is equal to 0, it will be
   * overwritten by the value of 0.001.
   * 
   * @param _mass mass (units).
   */
  setMass(_mass : number)
  : void
  {
    // Mass can't be 0.

    if(this._m_mass != 0)
    {
      this._m_mass = _mass;
    }
    else
    {
      this._m_mass = 0.001;
    }
    return;
  }

  /**
   * Safely destroy this controller.
   */
  destroy()
  : void 
  {
    // Detach objects

    this._m_direction = null;

    this._m_totalForce = null;

    this._m_actualVelocity = null;

    this._m_actualVelocityStepped = null;

    this._m_totalForceStepped = null;

    this._m_desire_velocity = null;

    this._m_steerForce = null;

    // Detach references

    this._m_actor = null;

    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Debug manager.
   */
  private _m_debugManager : DebugManager;

  /**
   * The actor direction.
   */
  private _m_direction : V2;

  /**
   * The actual velocity of the actor.
   */
  private _m_actualVelocity : V2;

  /**
   * The actual velocity of the actor, multiplied by the delta time.
   */
  private _m_actualVelocityStepped : V2;

  /**
   * The last force.
   */
  private _m_lastForce : V2;

  /**
   * The sum of all forces.
   */
  private _m_totalForce : V2;

  /**
   * The sum of all forces, multiplied by the delta time.
   */
  private _m_totalForceStepped : V2;

  /**
   * The actor speed (pixels per second).
   */
  private _m_speed : number;

  /**
   * The actor max speed (pixels per second).
   */
  private _m_maxSpeed : number;

  /**
   * The actor mass (units).
   */
  private _m_mass : number;
  
  /**
   * Reference to the base actor.
   */
  private _m_actor : BaseActor<Ty_physicsSprite>;

  /**
   * Magnitude of the friction force.
   */
  private _m_frictionForce : number;

  ///////////////////////////////////
  // Physics

  /**
   * 
   */
  private _m_desire_velocity : V2;

  /**
   * 
   */
  private _m_steerForce : V2;
}