/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttNeckShrink.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-09-2020
 */

import { Ty_physicsActor, Ty_physicsSprite, Ty_Sprite, V2 } from "../../commons/1942types";
import { CmpNeckController } from "../../components/cmpNeckController";
import { GameManager } from "../../gameManager/gameManager";
import { IPlayerController } from "../../playerController/IPlayerController";
import { ICmpState } from "../ICmpState";

export class SttNeckFollow
implements ICmpState<CmpNeckController>
{
  constructor()
  {
    this.m_id = "follow";

    this._m_gm = GameManager.GetInstance();

    this._m_start_position = new Phaser.Math.Vector2();  

    // Steering Behavior Properties

    this._m_forceA = new Phaser.Math.Vector2();    
    this._m_forceB = new Phaser.Math.Vector2();
    this._m_forceC = new Phaser.Math.Vector2();

    this._m_direction = new Phaser.Math.Vector2();
    this._m_steerForce = new Phaser.Math.Vector2();
    this._m_desire_position = new Phaser.Math.Vector2();
    
    this._m_speed = 0.0;
    return;
  }

  setup()
  : void
  {    
    return;
  }

  setComponent(_component: CmpNeckController)
  : void 
  {
    this._m_control = _component;
    return;
  }

  getComponent()
  : CmpNeckController 
  {
    return this._m_control;
  }

  onEnter()
  : void 
  {
    // Get Player

    let playerController : IPlayerController = this._m_gm.getPlayerController();

    this._m_targetActor = playerController.getPlayer();

    // Get the start Position.

    let neckControl = this._m_control;

    this._m_start_position.setTo
    (
      neckControl.m_body.x,
      neckControl.m_body.y
    );

    // Initialize values.

    this._m_speed = 0.0;
    this._m_direction.setTo(0.0, 1.0);
    
    return;
  }

  onExit()
  : void 
  {
    return;
  }
  
  receive(_id: number, _obj: any)
  : void 
  {
    return;
  }

  update()
  : void 
  { 

    let neckControl = this._m_control;
    
    // Reset steer force.

    this._m_steerForce.setTo(0.0, 0.0);

    // Delta Time

    let dt : number = this._m_gm.m_dt;
    
    ///////////////////////////////////
    // Desire Position

    let desirePosition = this._m_desire_position;

    let targetSprite : Ty_physicsSprite 
      = this._m_targetActor.getWrappedInstance();

    let headSprite : Ty_Sprite = this._m_control.m_head;

    desirePosition.setTo
    (
      targetSprite.x,
      targetSprite.y - 200
    );

    // calculate Vector from head to position.

    let body = this._m_control.m_body;

    let forceA = this._m_forceA;

    forceA.setTo
    (
      desirePosition.x - body.x,
      desirePosition.y - body.y
    );

    let bodyToTargetDistance = forceA.length();

    let max_length = neckControl.m_headConfig.neck_length;

    if(bodyToTargetDistance > max_length)
    {
      let x : number = this._m_desire_position.x;

      // Calculate the distance between the desire point x and the body x.

      let l : number = x - body.x;
      
      // Truncate x value to the circle radius.

      if(Math.abs(l) > max_length)
      {
        x += (l - max_length) * -1;
      }

      // Get y

      let y = Math.pow(max_length, 2) - Math.pow(x - body.x, 2);

      y = Math.sqrt(y) + body.y;

      // Set new desire position.

      desirePosition.setTo(x, y);
    }

    ///////////////////////////////////
    // Forces.
    
    // Seek Desire Position.

    this.seek(600.0, desirePosition.x, desirePosition.y);

    ///////////////////////////////////
    // Apply Forces

    // Apply Mass

    let steerForce = this._m_steerForce;

    let mass = neckControl.m_headConfig.mass;

    steerForce.setTo
    (
      steerForce.x / mass,
      steerForce.y / mass
    );

    ////////////////////////////////////
    // Steer Force

    // Calculate actual force.    

    forceA.setTo
    (
      this._m_direction.x * this._m_speed,
      this._m_direction.y * this._m_speed
    );

    // Apply Steer Force

    forceA.add(steerForce);

    // Truncate force.

    let maxSpeed = neckControl.m_headConfig.speed;

    if(forceA.length() > maxSpeed)
    {
      forceA.normalize();
      forceA.scale(maxSpeed);
    }

    // Set new speed.

    this._m_speed = forceA.length();

    // Set new direction.

    this._m_direction.copy(forceA);
    this._m_direction.normalize();
    
    // Apply delta time

    forceA.scale(dt);

    // Apply force to Balsaru's head.

    headSprite.setPosition
    (
      headSprite.x + forceA.x,
      headSprite.y + forceA.y
    );

    ///////////////////////////////////
    // Neck Curve    

    let p1 = this._m_forceA;

    let p2 = this._m_forceB;

    let startPosition = this._m_start_position;

    // Calculate P1

    p1.setTo
    (
      startPosition.x,
      startPosition.y + 250
    );

    // Calculate P2
    
    p2.setTo
    (
      headSprite.x,
      headSprite.y - 200
    );

    let p3 = this._m_forceC;

    p3.setTo
    (
      headSprite.x,
      headSprite.y
    );

    neckControl.getBezierFormation
    (
      startPosition,
      p1,
      p2,
      p3,
      neckControl.m_keys_C
    );

    neckControl.applyKeys(neckControl.m_keys_C);

    return;
  }

  destroy()
  : void 
  {
    this._m_control = null;
    this._m_targetActor = null;
    this._m_gm = null;
    this._m_start_position = null;
    this._m_direction = null;

    return;
  }

  m_id: string;

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  ///////////////////////////////////
  // Steers

  seek(_force : number, _target_x : number, _target_y : number)
  : void
  {
    let forceA = this._m_forceA;

    // Calculate the actual force.

    let direction = this._m_direction;

    forceA.setTo
    (
      direction.x * this._m_speed,
      direction.y * this._m_speed
    );

    // Calculate the desire force.

    let forceB = this._m_forceB;

    let head = this._m_control.m_head;

    forceB.setTo
    (
      _target_x - head.x,
      _target_y - head.y
    );

    forceB.normalize();
    forceB.scale(_force);

    // Calculate the steer force.

    let forceC = this._m_forceC;

    forceC.setTo
    (
      forceB.x - forceA.x,
      forceB.y - forceA.y
    );

    // Add Force

    this._m_steerForce.add(forceC);
    
    return;
  }
  
  /**
   * Reference to the neck controller
   */
  private _m_control : CmpNeckController;

  /**
   * Reference to the target
   */
  private _m_targetActor : Ty_physicsActor;

  /**
   * GameManager
   */
  private _m_gm : GameManager;

  ///////////////////////////////////
  // Animation properties

  /**
   * The body position.
   */
  private _m_start_position : V2;

  /**
   * The desire position for aiming the hero.
   */
  private _m_desire_position : V2;

  ///////////////////////////////////
  // Physics properties

  /**
   * The movement force.
   */
  private _m_steerForce : V2;

  /**
   * Head direction.
   */
  private _m_direction : V2;

  /**
   * The speed of the head towards the desire position. (pixels per second).
   */
  private _m_speed : number;

  /**
   * Force A.
   */
  private _m_forceA : V2;

  /**
   * Force B.
   */
  private _m_forceB : V2;

  /**
   * Force C.
   */
  private _m_forceC : V2;
}