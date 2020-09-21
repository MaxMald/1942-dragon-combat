/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttNeckShrink.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-09-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { IBulletManager } from "../../bulletManager/iBulletManager";
import { DC_COMPONENT_ID } from "../../commons/1942enums";
import { Ty_physicsActor, V2 } from "../../commons/1942types";
import { CmpNeckController } from "../../components/cmpNeckController";
import { CmpSimpleBulletController } from "../../components/cmpSimpleBulletControl";
import { GameManager } from "../../gameManager/gameManager";
import { IPlayerController } from "../../playerController/IPlayerController";
import { ICmpState } from "../ICmpState";

export class SttNeckEvade
implements ICmpState<CmpNeckController>
{
  constructor()
  {
    this.m_id = "evade";

    this._m_gm = GameManager.GetInstance();

    this._m_start_position = new Phaser.Math.Vector2();  
    this._m_centerPoint = new Phaser.Math.Vector2();

    // Steering Behavior Properties

    this._m_forceA = new Phaser.Math.Vector2();    
    this._m_forceB = new Phaser.Math.Vector2();
    this._m_forceC = new Phaser.Math.Vector2();    

    this._m_direction = new Phaser.Math.Vector2();
    this._m_steerForce = new Phaser.Math.Vector2();
    
    this._m_speed = 0.0;

    this._m_forceMagnitude = 3000.0;

    this._m_danger_radius = 250.0;

    return;
  }

  setup(_scene : Phaser.Scene)
  : void
  {    
    this._m_graphics = _scene.add.graphics
    (
      {
        lineStyle : { width : 1, color : 0xff0000 }
      }
    );
    return;
  }

  setPlayerBulletManager(_bulletManager : IBulletManager)
  : void
  {
    this._m_playerBulletManager = _bulletManager;
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

    // Get Player Bullet Manager

    this.setPlayerBulletManager(playerController.getBulletManager());

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

    // Set Center point.

    this._m_centerPoint.setTo
    (
      neckControl.m_body.x,
      neckControl.m_body.y + neckControl.m_headConfig.neck_length
    );
    
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

    this._m_graphics.clear();

    // Reset steer force.

    this._m_steerForce.setTo(0.0, 0.0);

    // Delta Time

    let dt : number = this._m_gm.m_dt;

    ///////////////////////////////////
    // Evade Bullets

    let bulletPool : MxObjectPool<Ty_physicsActor> 
      = this._m_playerBulletManager.getPool();

    bulletPool.forEachActive
    (
      this.evadeBullet,
      this
    );

    // Add force to center.

    let headSprite = this._m_control.m_head;

    let forceToCenter = this._m_forceC;

    forceToCenter.setTo
    (
      this._m_centerPoint.x - headSprite.x,
      this._m_centerPoint.y - headSprite.y
    );

    forceToCenter.normalize();
    forceToCenter.scale(250);

    this._m_steerForce.add(forceToCenter);

    // Apply Steer Force

    let speed : number = this._m_speed;

    let actualForce = this._m_forceA;

    actualForce.setTo
    (
      this._m_direction.x * speed,
      this._m_direction.y * speed
    );    

    // Debug actual force

    this._m_graphics.defaultStrokeColor = 0x00ff00;
    this._m_graphics.strokeLineShape
    (
      new Phaser.Geom.Line
      (
        headSprite.x,
        headSprite.y,
        headSprite.x + actualForce.x,
        headSprite.y + actualForce.y
      )
    );

    // Head Mass

    let mass = neckControl.m_headConfig.mass;

    let steerForce = this._m_steerForce;

    steerForce.setTo
    (
      steerForce.x / mass,
      steerForce.y / mass
    );

    // Debug Steer Force

    this._m_graphics.defaultStrokeColor = 0x0000ff;
    this._m_graphics.strokeLineShape
    (
      new Phaser.Geom.Line
      (
        headSprite.x,
        headSprite.y,
        headSprite.x + steerForce.x,
        headSprite.y + steerForce.y
      )
    );

    // Add force

    actualForce.add(steerForce);

    // Truncate Steer Force

    let maxSpeed = neckControl.m_headConfig.speed;

    if(actualForce.length() > maxSpeed)
    {
      actualForce.normalize();
      actualForce.scale(maxSpeed);
    }

    // Apply delta time.

    actualForce.scale(dt);

    // Move Head.    

    headSprite.setPosition
    (
      headSprite.x + actualForce.x,
      headSprite.y + actualForce.y
    );

    // Set new speed.

    this._m_speed = actualForce.length();

    // Set new direction.

    this._m_direction.copy(actualForce.normalize());

    // Check neck length

    let bodyToHead = this._m_forceB;

    let body = this._m_control.m_body;

    bodyToHead.setTo
    (
      headSprite.x - body.x,
      headSprite.y - body.y
    );

    let bodyToTargetDistance = bodyToHead.length();

    let max_length = this._m_control.m_headConfig.neck_length;

    if(bodyToTargetDistance > max_length)
    {
      bodyToHead.normalize();

      bodyToHead.scale(200 * -dt);

      headSprite.setPosition
      (
        headSprite.x + bodyToHead.x,
        headSprite.y + bodyToHead.y
      );
    }

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
    this._m_gm = null;
    this._m_start_position = null;
    this._m_direction = null;

    return;
  }

  m_id: string;

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private evadeBullet(_bullet : Ty_physicsActor)
  : void
  {
    // Check if is in the vision range.

    let vecToBullet = this._m_forceA;

    let control = this._m_control;

    let head = control.m_head;

    let bulletSprite = _bullet.getWrappedInstance();

    vecToBullet.setTo
    (
      bulletSprite.x - head.x,
      bulletSprite.y - head.y
    );

    let distToBullet : number = vecToBullet.length();

    let visionRadius : number = this._m_control.m_headConfig.visionRadius;

    if(distToBullet > visionRadius)
    {
      // Discard.
      return;
    }

    // Check if bullet is coming or has already passed.

    if(vecToBullet.y < -100)
    {
      // Discard.
      return;
    }

    ///////////////////////////////////
    // Collision point

    let bulletController = _bullet.getComponent<CmpSimpleBulletController>
    (
      DC_COMPONENT_ID.kSimpleBulletControl
    );

    let bulletDirection : V2 = bulletController.getDirection();

    let collisionPoint = this._m_forceB;

    collisionPoint.y = head.y;

    collisionPoint.x = (bulletDirection.x * (collisionPoint.y - bulletSprite.y));

    collisionPoint.x /= bulletDirection.y;

    collisionPoint.x += bulletSprite.x;    

    // Check if head is inside the danger radius

    let vecToCollision = this._m_forceA;

    vecToCollision.setTo
    (
      head.x - collisionPoint.x,
      head.y - collisionPoint.y
    );

    let distToCollision = vecToCollision.length();

    let dangerRadius : number = this._m_danger_radius;

    if(distToCollision <= dangerRadius)
    {

      // Flee direction.

      vecToCollision.normalize();

      let bulletToCollision = this._m_forceC;

      bulletToCollision.setTo
      (
        collisionPoint.x - bulletSprite.x,
        collisionPoint.y - bulletSprite.y
      );

      // Flee magnitude
      
      let fleeForce = 1 - (bulletToCollision.length() / visionRadius);

      fleeForce *= this._m_forceMagnitude;

      // Apply flee magnitude

      vecToCollision.scale(fleeForce);

      // Apply steer force

      this._m_steerForce.add(vecToCollision);
    }

    // Debug Collision Point

    this._m_graphics.strokeCircle
    (
      collisionPoint.x,
      collisionPoint.y,
      dangerRadius
    );

    return;
  }
  
  private _m_control : CmpNeckController;

  private _m_gm : GameManager;

  private _m_playerBulletManager : IBulletManager;

  ///////////////////////////////////
  // Animation properties

  /**
   * The body position.
   */
  private _m_start_position : V2;

  ///////////////////////////////////
  // Physics properties

  /**
   * Center Point
   */
  private _m_centerPoint : V2;

  /**
   * 
   */
  private _m_forceMagnitude : number;

  /**
   * 
   */
  private _m_danger_radius : number;

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

  ///////////////////////////////////
  // Debugging drawings

  private _m_graphics : Phaser.GameObjects.Graphics;
}