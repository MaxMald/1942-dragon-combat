import { MxObjectPool } from "optimization/mxObjectPool";
import { IBulletManager } from "../../bulletManager/iBulletManager";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite, V2 } from "../../commons/1942types";
import { CmpBalsaruController } from "../../components/cmpBalsaruControllert";
import { CmpSimpleBulletController } from "../../components/cmpSimpleBulletControl";
import { CnfBalsaruHead } from "../../configObjects/cnfBalsaruHead";
import { GameManager } from "../../gameManager/gameManager";
import { IPlayerController } from "../../playerController/IPlayerController";
/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttBalsaruDash.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since October-05-2020
 */

import { ICmpState } from "../ICmpState";

export class sttBalsaruDash
implements ICmpState<CmpBalsaruController>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   *
   */
  constructor()
  {
    this.m_id = 'dash';
    
    this._m_gm = GameManager.GetInstance();

    // State Properties

    this._m_time = 0.0;

    this._m_duration = 5.0;

    // Movement properties

    this._m_friction = new Phaser.Math.Vector2();

    this._m_headPosition = new Phaser.Math.Vector2();

    this._m_shipPosition = new Phaser.Math.Vector2();

    this._m_fleePosition = new Phaser.Math.Vector2();

    this._m_toBullet = new Phaser.Math.Vector2();

    this._m_toCollision = new Phaser.Math.Vector2();

    this._m_collisionPoint = new Phaser.Math.Vector2();

    this._m_bodyToHead = new Phaser.Math.Vector2();

    return;
  }

  setComponent(_component: CmpBalsaruController)
  : void 
  {
    this._m_cmp = _component;

    this._m_graphics = _component.m_scene.add.graphics
    (
      {
        lineStyle : { width : 1, color : 0xff0000 }
      }
    );

    return;
  }

  getComponent()
  : CmpBalsaruController 
  {
    return this._m_cmp;
  }

  setStateDuration(_duration : number)
  : void
  {
    this._m_duration = _duration;

    return;
  }

  setFleeMaxLength(_maxLength : number)
  : void
  {
    this._m_fleeMaximumLength = _maxLength;
    return;
  }

  onEnter()
  : void 
  {
    // Init state properties

    this._m_time = 0.0;

    // Minimum length between the head and the origin (ship or body).

    this._m_minLengthToCenter = this._m_cmp.m_headConfig.neck_length * 0.8;

    // Get Kalebio bullet manager.

    let playerController : IPlayerController = this._m_gm.getPlayerController();

    this._m_playerBulletManager = playerController.getBulletManager();

    // Set Neck State

    this._m_cmp.m_head.sendMessage
    (
      DC_MESSAGE_ID.kSetNeckState,
      'manual'
    );

    // Reset head speed

    let forceController = this._m_cmp.m_forceController;

    forceController.setSpeed(0.0);

    // Set active state

    this._m_activeState = this._updateEvasion;

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
    switch(_id)
    {
      case DC_MESSAGE_ID.kHit :

      this._m_cmp.addHealthPoints(-(_obj as number));
      return;
    }
    return;
  }

  update()
  : void 
  {
    // Clear stroke.

    this._m_graphics.clear();

    ///////////////////////////////////
    // State time

    let dt = this._m_gm.m_dt;

    this._m_time += dt;

    if(this._m_time > this._m_duration)
    {
      this._m_cmp.setActiveState('attack_anticipation');
    }

    ///////////////////////////////////
    // Update State

    this._m_activeState.call(this);

    return;
  }

  destroy()
  : void 
  {
    this._m_gm = null;
    
    this._m_cmp = null;

    this._m_playerBulletManager = null;

    this._m_toBullet = null;
    
    this._m_toCollision = null;
    
    this._m_collisionPoint = null;
    
    this._m_bodyToHead = null;
    
    return;
  }

  m_id: string;
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _updateEvasion()
  : void
  {
    // Center force

    this._out_of_center_force();

    // Apply a flee force for each relevant bullet

    let bulletPool : MxObjectPool<Ty_physicsActor> 
      = this._m_playerBulletManager.getPool();

    bulletPool.forEachActive
    (
      this._evadeBullet,
      this
    );
    
    // Get the head position.

    let headSprite = this._m_cmp.m_head.getWrappedInstance();

    let headPosition = this._m_headPosition.set(headSprite.x, headSprite.y);

    let headConfig = this._m_cmp.m_headConfig;
    
    // Get ship position.

    let ship = this._m_cmp.m_shipSprite;

    let shipPosition = this._m_shipPosition.set(ship.x, ship.y);

    // Get the vector from ship to head.

    let bodyToHead = this._m_bodyToHead;

    bodyToHead.copy(headPosition);

    bodyToHead.subtract(shipPosition);

    // Get length from ship to head.

    let neck_len = bodyToHead.length();

    let max_len = headConfig.neck_length;

    if(neck_len > max_len)
    {
      // Move back to body.

      this._m_cmp.m_forceController.seek
      (
        shipPosition,
        headPosition,
        500
      );
    }
    return;
  }

  private _updateFlee()
  : void
  {
    // Center force.

    this._out_of_center_force();

    // Flee Force.

    let head = this._m_cmp.m_head;

    let headSprite = head.getWrappedInstance();

    let headPosition = this._m_headPosition;

    // Head position

    headPosition.set
    (
      headSprite.x,
      headSprite.y
    );

    // Force Controller

    let fleePosition = this._m_fleePosition;

    this._m_cmp.m_forceController.arrive
    (
      fleePosition,
      headPosition,
      this._m_fleeMaximumLength
    );

    let headToTarget = this._m_toBullet;

    headToTarget.copy(headPosition);

    headToTarget.subtract(fleePosition);

    if(headToTarget.length() < 10.0)
    {
      this._m_activeState = this._updateEvasion;
    }
    
    return;
  }

  private _evadeBullet(_bullet : Ty_physicsActor)
  : void
  {
    // Check if is in the vision range.    

    let headConfig : CnfBalsaruHead = this._m_cmp.m_headConfig;

    let head : Ty_physicsSprite = this._m_cmp.m_head.getWrappedInstance();

    let bulletSprite = _bullet.getWrappedInstance();

    let vecToBullet = this._m_toBullet;

    vecToBullet.setTo
    (
      bulletSprite.x - head.x,
      bulletSprite.y - head.y
    );

    let distToBullet : number = vecToBullet.length();

    let visionRadius : number = headConfig.visionRadius;

    if(distToBullet > visionRadius)
    {
      return;
    }

    // Check if bullet is coming or has already passed.

    if(vecToBullet.y < -100)
    {
      return;
    }

    ///////////////////////////////////
    // Collision point

    // get the bullet controller

    let bulletController = _bullet.getComponent<CmpSimpleBulletController>
    (
      DC_COMPONENT_ID.kSimpleBulletControl
    );

    let bulletDirection : V2 = bulletController.getDirection();

    let collisionPoint = this._m_collisionPoint;

    collisionPoint.y = head.y;

    collisionPoint.x = (bulletDirection.x * (collisionPoint.y - bulletSprite.y));

    collisionPoint.x /= bulletDirection.y;

    collisionPoint.x += bulletSprite.x;    

    // Check if head is inside the danger radius

    let vecToCollision = this._m_toCollision;

    vecToCollision.setTo
    (
      head.x - collisionPoint.x,
      head.y - collisionPoint.y
    );

    let distToCollision = vecToCollision.length();

    let dangerRadius : number = this._m_collisionRadius;

    if(distToCollision <= dangerRadius)
    {
      // Flee direction.

      this._m_headPosition.set
      (
        head.x,
        head.y
      );

      // Force controller.

      this._m_cmp.m_forceController.seek
      (
        this._m_headPosition,
        collisionPoint,
        this._m_fleeMaximumLength * ( 1.0 - (distToCollision / dangerRadius))
      );
    }
    return;
  }

  /**
   * Receive a repulsion force from the origin (ship / body), if the distance
   * between from the ship and the head reach the limit.
   */
  private _out_of_center_force()
  : void
  {
    // Head position.

    let headPosition = this._m_headPosition;

    let headSprite = this._m_cmp.m_head.getWrappedInstance();

    headPosition.set(headSprite.x, headSprite.y);
    
    // Ship position.

    let shipPosition = this._m_shipPosition;

    let shipSprite = this._m_cmp.m_shipSprite;

    shipPosition.set(shipSprite.x, shipSprite.y);

    // Vector from ship to head.

    let vecShipToHead = this._m_bodyToHead;

    vecShipToHead.copy(headPosition);

    vecShipToHead.subtract(shipPosition);

    let magnitude: number = vecShipToHead.length();

    // Repulsion force condition.

    if(magnitude < this._m_minLengthToCenter)
    {
      // Repulsion from origin.

      this._m_cmp.m_forceController.seek
      (
        headPosition,
        shipPosition,
        this._m_fleeMaximumLength
      );
    }

    return;
  }
  
  ///////////////////////////////////
  // State properties

  private _m_activeState : () => void;

  /**
   * 
   */
  private _m_time : number;

  /**
   * 
   */
  private _m_duration : number;

  /**
   * 
   */
  private _m_gm : GameManager;

  /**
   * 
   */
  private _m_cmp : CmpBalsaruController;

  /**
   * Reference to the bullet manager of the player.
   */
  private _m_playerBulletManager : IBulletManager;

  ///////////////////////////////////
  // Movement Properties

  /**
   * friction force.
   */
  private _m_friction : V2;

  /**
   * The flee position.
   */
  private _m_fleePosition : V2;

  /**
   * A vector from head to bullet.
   */
  private _m_toBullet : V2;

  /**
   * Minimum value of the distance between the head and the origin (ship).
   */
  private _m_minLengthToCenter : number;

  /**
   * A vector from head to predicted collision position.
   */
  private _m_toCollision : V2;

  /**
   * The position of the head.
   */
  private _m_headPosition : V2;

  /**
   * The position of the ship.
   */
  private _m_shipPosition : V2;

  /**
   * The predicted position of the collision with the bullet. 
   */
  private _m_collisionPoint : V2;

  /**
   * The radius of the predicted collision area.
   */
  private _m_collisionRadius : number;

  /**
   * Vector from the body position to the target position.
   */
  private _m_bodyToHead : V2;

  /**
   * The maximum magnitude of the seek force.
   */
  private _m_fleeMaximumLength : number;

  ///////////////////////////////////
  // Debugging drawings

  private _m_graphics : Phaser.GameObjects.Graphics;
}