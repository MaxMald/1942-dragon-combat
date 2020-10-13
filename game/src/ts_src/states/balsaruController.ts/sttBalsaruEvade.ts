/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttBalsaruFollow.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-11-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { IBulletManager } from "../../bulletManager/iBulletManager";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite, V2 } from "../../commons/1942types";
import { CmpBalsaruController } from "../../components/cmpBalsaruControllert";
import { CmpSimpleBulletController } from "../../components/cmpSimpleBulletControl";
import { CnfBalsaruEvade } from "../../configObjects/cnfBalsaruEvade";
import { CnfBalsaruHead } from "../../configObjects/cnfBalsaruHead";
import { GameManager } from "../../gameManager/gameManager";
import { IPlayerController } from "../../playerController/IPlayerController";
import { ICmpState } from "../ICmpState";

/**
 * 
 */
export class SttBalsaruEvade
implements ICmpState<CmpBalsaruController>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   *
   */
  constructor(_config ?: CnfBalsaruEvade)
  {
    // Configuration object

    if(_config === undefined)
    {
      _config = new CnfBalsaruEvade();
    }

    this._m_config = _config;

    this.m_id = 'evade';
    
    this._m_gm = GameManager.GetInstance();

    // State Properties

    this._m_time = 0.0;

    // Movement properties

    this._m_sinceLastDash = 0.0;

    this._m_destinationDirection = new Phaser.Math.Vector2(1.0, 0.0);

    this._m_destinationDirection.rotate
    (
      _config.dash_destination_angle * Phaser.Math.RAD_TO_DEG
    );

    this._m_dashDestination = new Phaser.Math.Vector2();

    this._m_headPosition = new Phaser.Math.Vector2();

    this._m_shipPosition = new Phaser.Math.Vector2();

    this._m_desirePosition = new Phaser.Math.Vector2();

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
    return;
  }

  getComponent()
  : CmpBalsaruController 
  {
    return this._m_cmp;
  }

  getStateConfiguration()
  : CnfBalsaruEvade
  {
    return this._m_config;
  }

  onEnter()
  : void 
  {
    // Init state properties

    this._m_time = 0.0;

    this._m_sinceLastDash = this._m_config.dash_cooldown;

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

    // Set the active state.

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

    ///////////////////////////////////
    // State time

    let dt = this._m_gm.m_dt;

    this._m_time += dt;

    this._m_sinceLastDash += dt;

    if(this._m_time > this._m_config.duration)
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

    this._m_desirePosition = null;
    
    return;
  }

  m_id: string;
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _updateDash()
  : void
  {
    let forceController = this._m_cmp.m_forceController;

    let headSprite = this._m_cmp.m_head.getWrappedInstance();

    let headPosition = this._m_headPosition;

    headPosition.set(headSprite.x, headSprite.y);

    // Check distance to destination

    let destination = this._m_dashDestination;

    let vecToDestination = this._m_toCollision;

    vecToDestination.copy(destination);

    vecToDestination.subtract(headPosition);

    let distance : number = vecToDestination.length();

    if(distance <= 25)
    {
      this._m_activeState = this._updateEvasion;
      return;
    }

    // Apply force.

    let stateConfig = this._m_config;

    forceController.arrive
    (
      this._m_dashDestination,
      headPosition,
      stateConfig.dash_speed
    );

    return;
  }

  private _updateEvasion()
  : void
  {
    // Check Angle

    let headSprite = this._m_cmp.m_head.getWrappedInstance();

    let headPosition = this._m_headPosition.set(headSprite.x, headSprite.y);

    // Get the head position.
    
    let headConfig = this._m_cmp.m_headConfig;
    
    // Get ship position.

    let ship = this._m_cmp.m_shipSprite;

    let shipPosition = this._m_shipPosition.set(ship.x, ship.y);

    // Get the vector from ship to head.

    let bodyToHead = this._m_bodyToHead;

    bodyToHead.copy(headPosition);

    bodyToHead.subtract(shipPosition);

    // Check Angle 

    let angle : number = Phaser.Math.Angle.Between
    (
      1.0, 
      0.0, 
      bodyToHead.x, 
      bodyToHead.y
    );

    angle *= Phaser.Math.RAD_TO_DEG;

    let max_len = headConfig.neck_length;

    let stateConfig = this._m_config;

    if( stateConfig.dash_angle_threshold > angle)
    {
      
      let destinationDirection = this._m_destinationDirection;

      this._m_dashDestination.set
      (
        shipPosition.x + destinationDirection.x * max_len,
        shipPosition.y + destinationDirection.y * max_len
      );

      this._m_activeState = this._updateDash;

      return;
    }
    else if(angle > (180 - stateConfig.dash_angle_threshold))
    {
      let destinationDirection = this._m_destinationDirection;

      this._m_dashDestination.set
      (
        shipPosition.x - destinationDirection.x * max_len,
        shipPosition.y + destinationDirection.y * max_len
      );

      this._m_activeState = this._updateDash;

      return;
    }

    // Apply a flee force for each relevant bullet

    let bulletPool : MxObjectPool<Ty_physicsActor> 
      = this._m_playerBulletManager.getPool();

    bulletPool.forEachActive
    (
      this._evadeBullet,
      this
    );

    ///////////////////////////////////
    // Dash

    let forceController = this._m_cmp.m_forceController;

    if(forceController.getSteerForce().length())
    {
      if(this._m_sinceLastDash >= stateConfig.dash_cooldown)
      {
        this._m_sinceLastDash = 0;

        let destinationDirection = this._m_destinationDirection;

        let P1 : V2 = new Phaser.Math.Vector2();

        P1.copy(shipPosition);

        P1.x += destinationDirection.x * max_len;
        P1.y += destinationDirection.y * max_len;

        let P2 : V2 = new Phaser.Math.Vector2();

        P2.copy(shipPosition);

        P2.x -= destinationDirection.x * max_len;
        P2.y += destinationDirection.y * max_len;

        let toP1 : V2 = new Phaser.Math.Vector2();

        toP1.copy(P1);

        toP1.subtract(headPosition);

        let toP2 : V2 = new Phaser.Math.Vector2();

        toP2.copy(P2);

        toP2.subtract(headPosition);

        if(toP1.length() > toP2.length())
        {
          this._m_dashDestination.copy(P1);
        } 
        else
        {
          this._m_dashDestination.copy(P2);
        }

        this._m_activeState = this._updateDash;

        return;
      }
    }

    // Get length from ship to head.

    let neck_len = bodyToHead.length();    

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
      // The bullet is not inside the vision area (ignore it).
      return;
    }

    // Check if bullet is coming or has already passed.

    if(vecToBullet.y < -head.height * 0.5)
    {
      // The bullet is behind the head (ignore it).
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

    ///////////////////////////////////
    // Flee

    // Check if head is inside the danger radius

    let vecToCollision = this._m_toCollision;

    vecToCollision.setTo
    (
      head.x - collisionPoint.x,
      head.y - collisionPoint.y
    );

    // Flee direction.

    let headPosition = this._m_headPosition;

    headPosition.set
    (
      head.x,
      head.y
    );

    let distToCollision = vecToCollision.length();

    let stateConfig = this._m_config;

    let dangerRadius : number = stateConfig.collision_radius;

    let shipSprite = this._m_cmp.m_shipSprite;

    if(distToCollision <= dangerRadius)
    {
      // Desire Position

      vecToCollision.setLength(dangerRadius);

      let desirePosition : V2 = this._m_desirePosition;

      desirePosition.x = collisionPoint.x + vecToCollision.x;

      if(Math.abs(desirePosition.x - shipSprite.x) > headConfig.neck_length)
      {
        // TODO
      }
      else
      { 
        // Calculate desire Y with the formula of the circle.

        let a : number = Math.pow((desirePosition.x - shipSprite.x), 2);

        // Square radius
        
        let r : number = headConfig.neck_length * headConfig.neck_length;

        // Root of (r - a)

        let root : number = Math.sqrt(r - a);

        // root + b

        desirePosition.y = root + shipSprite.y;
      }      

      // Force controller.

      this._m_cmp.m_forceController.arrive
      (
        desirePosition,
        headPosition,
        stateConfig.flee_max_speed
      );
    }
    return;
  }  
  
  ///////////////////////////////////
  // State properties

  /**
   * 
   */
  private _m_time : number;

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
  // Dash Properties

  private _m_sinceLastDash : number;

  ///////////////////////////////////
  // Movement Properties

  /**
   * The active state.
   */
  private _m_activeState : () => void;

  /**
   * A vector from head to bullet.
   */
  private _m_toBullet : V2;

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
   * The final destination of the dash state.
   */
  private _m_dashDestination : V2;

  /**
   * The desire position
   */
  private _m_desirePosition : V2;

  /**
   * Vector from the body position to the target position.
   */
  private _m_bodyToHead : V2;

  /**
   * 
   */
  private _m_destinationDirection : V2;

  /**
   * Configuration object.
   */
  private _m_config : CnfBalsaruEvade;
}