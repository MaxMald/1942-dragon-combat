/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttRangerPursuit.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-25-2020
 */

import { DC_MESSAGE_ID } from "../../commons/1942enums";
import { Point, Ty_physicsActor, Ty_physicsSprite, V3 } from "../../commons/1942types";
import { CmpRangerController } from "../../components/cmpRangerController";
import { CnfRangerConfig } from "../../configObjects/cnfRangerConfig";
import { GameManager } from "../../gameManager/gameManager";
import { IPlayerController } from "../../playerController/IPlayerController";
import { IRangerState } from "./iRangerState";

export class SttRangerPursuit 
implements IRangerState
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor()
  {
    this._m_gameManager = GameManager.GetInstance();
    this.m_id = "pursuit";

    this._m_direction = new Phaser.Math.Vector3();
    this._m_currentForce = new Phaser.Math.Vector3();
    this._m_desireForce = new Phaser.Math.Vector3();
    this._m_steerForce = new Phaser.Math.Vector3();

    this._m_cam_p1 = new Phaser.Geom.Point();
    this._m_cam_p2 = new Phaser.Geom.Point();

    return;
  }
  
  init( _controller : CmpRangerController, _actor : Ty_physicsActor) 
  : void
  {
    this._m_controller = _controller;
    this._m_actor = _actor;

    let playerControl : IPlayerController 
      = this._m_gameManager.getPlayerController(); 
    this._m_target = playerControl.getPlayer();

    this._m_direction.set(0.0, -1.0);

    let canvas = this._m_gameManager.getGameScene().game.canvas;
    this._m_cam_p2.setTo(canvas.width, canvas.height);

    return;
  }

  setConfig(_config : CnfRangerConfig)
  : void
  {
    this._m_config = _config;
    return;
  }

  onEnter()
  : void 
  {
    this._m_time = 0.0;
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
      case DC_MESSAGE_ID.kKill :

      GameManager.ReceiveMessage
      (
        DC_MESSAGE_ID.kAddScorePoints,
        this._m_config.score 
      );

      this._explode();
      return;

      case DC_MESSAGE_ID.kCollisionWithHero:

      this._explode();
      return;

      default:
      return;
    }
  }

  update()
  : void 
  {
    let deltaTime = this._m_gameManager.m_dt;

    let time : number
    
    // Count down only if the ranger is inside the camera canvas.

    if(this._insideCanvas())
    {
      time = this._m_time + deltaTime;
    }
    else
    {
      time = this._m_time;
    }
    
    this._m_time = time;

    // Explode if the time reach the max time.

    let config = this._m_config;

    if(time >= config.life_time)
    {
      this._explode();
      return;
    }

    // Pursuit player

    let playerSprite : Ty_physicsSprite = this._m_target.getWrappedInstance();
    
    let self : Ty_physicsSprite = this._m_actor.getWrappedInstance();
    
    // Current Force
    
    let direction = this._m_direction;

    let speed = config.speed;

    let currentForce = this._m_currentForce;
    
    currentForce.set(direction.x * speed, direction.y * speed);

    // Desire Force    

    let desireForce = this._m_desireForce;

    desireForce.set(playerSprite.x - self.x, playerSprite.y - self.y);

    if(desireForce.length() > speed)
    {
      desireForce.normalize();
      desireForce.set(desireForce.x * speed, desireForce.y * speed);
    }

    // Steer Force

    let steerForce = this._m_steerForce;
   
    steerForce.set
    (
      desireForce.x - currentForce.x, 
      desireForce.y - currentForce.y
    );

    let forceMagnitude = config.steer_force;

    if(steerForce.length() > forceMagnitude)
    {
      steerForce.normalize();
      steerForce.set
      (
        steerForce.x * forceMagnitude, 
        steerForce.y * forceMagnitude
      );
    }
    
    let mass = config.mass;

    steerForce.set
    (
      steerForce.x / mass,
      steerForce.y / mass 
    );

    // Final Force

    steerForce.set
    (
      currentForce.x + steerForce.x, 
      currentForce.y + steerForce.y
    );

    if(steerForce.length() > speed)
    {
      steerForce.normalize();
      steerForce.set(steerForce.x * speed, steerForce.y * speed);
    }

    steerForce.set(steerForce.x * deltaTime, steerForce.y * deltaTime);

    this._m_actor.sendMessage
    (
      DC_MESSAGE_ID.kAgentMove,
      steerForce
    );

    steerForce.normalize();

    direction.set(steerForce.x, steerForce.y);

    this._m_actor.sendMessage
    (
      DC_MESSAGE_ID.kDirection,
      direction
    );

    let directionV2 = new Phaser.Math.Vector2(direction.x, direction.y);
    
    self.setAngle(Phaser.Math.RadToDeg(directionV2.angle()));
    return;
  }  

  destroy()
  : void 
  {
    this._m_gameManager = null;
    this._m_controller = null;
    this._m_config = null;
    this._m_actor = null;
    this._m_target = null;
    return;
  }

  m_id: string; 
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _explode()
  : void
  {
    let hero = this._m_target;
    let heroSprite = this._m_target.getWrappedInstance();
    let selfSprite = this._m_actor.getWrappedInstance();

    let vecToPlayer = new Phaser.Math.Vector2
    (
      heroSprite.x - selfSprite.x,
      heroSprite.y - selfSprite.y
    );

    let config = this._m_config;
    if(vecToPlayer.length() <= config.explosion_radius)
    {
      this._m_target.sendMessage
      (
        DC_MESSAGE_ID.kRangerExplosionHit,
        config.collision_damage
      );
    }

    this._m_controller.desactiveActor();
    this._m_controller.setActiveState('idle');
    return;
  }

  private _insideCanvas()
  : boolean
  {
    let p1 = this._m_cam_p1;
    let p2 = this._m_cam_p2;

    let sprite = this._m_actor.getWrappedInstance();

    return (p1.x < sprite.x && sprite.x < p2.x) 
           && (p1.y < sprite.y && sprite.y < p2.y);
  }
  
  private _m_direction : V3;

  private _m_currentForce : V3;

  private _m_desireForce : V3;

  private _m_steerForce : V3;

  private _m_time : number;

  private _m_gameManager : GameManager;

  private _m_target : Ty_physicsActor;

  private _m_config : CnfRangerConfig;

  private _m_controller : CmpRangerController;

  private _m_actor : Ty_physicsActor;

  private _m_cam_p1 : Point;

  private _m_cam_p2 : Point;
}