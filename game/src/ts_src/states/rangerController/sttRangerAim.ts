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
import { Point, Ty_physicsActor, Ty_physicsSprite, V2} from "../../commons/1942types";
import { CmpRangerController } from "../../components/cmpRangerController";
import { CnfRangerConfig } from "../../configObjects/cnfRangerConfig";
import { GameManager } from "../../gameManager/gameManager";
import { IPlayerController } from "../../playerController/IPlayerController";
import { IRangerState } from "./iRangerState";

export class SttRangerAim 
implements IRangerState
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor()
  {
    this._m_gameManager = GameManager.GetInstance();
    this.m_id = "aim";

    this._m_cam_p1 = new Phaser.Geom.Point();
    this._m_cam_p2 = new Phaser.Geom.Point();

    this._m_desireDirection = new Phaser.Math.Vector2();
    this._m_direction = new Phaser.Math.Vector2();
    this._m_steerForce = new Phaser.Math.Vector2();

    return;
  }
  
  init
  ( 
    _controller : CmpRangerController, 
    _actor : Ty_physicsActor
  ) 
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

    // Stop

    this._m_controller.m_forceController.setSpeed(0.0);
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

    time = this._m_time + deltaTime;
    
    this._m_time = time;

    // Explode if the time reach the max time.

    let config = this._m_config;

    if(time >= config.waiting_time)
    {
      this._m_controller.setActiveState("pursuit");
      return;
    }

    // Pursuit player

    let playerSprite : Ty_physicsSprite = this._m_target.getWrappedInstance();
    
    let self : Ty_physicsSprite = this._m_actor.getWrappedInstance();
    
    // Current Direction.
    
    let direction = this._m_controller.m_forceController.getDirection();

    // Desire Direction.

    let desireDirection = this._m_desireDirection;

    desireDirection.set
    (
      playerSprite.x - self.x, 
      playerSprite.y - self.y
    );

    desireDirection.normalize();

    direction.normalize();

    // Steer

    let steerForce : V2 = this._m_steerForce;

    steerForce.copy(desireDirection);

    steerForce.subtract(direction);

    steerForce.scale( deltaTime / this._m_config.mass );

    // Apply steer to direction.

    direction.add(steerForce);

    direction.normalize();
    
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
  
  private _m_steerForce : V2;

  private _m_desireDirection : V2;

  private _m_direction : V2;

  private _m_time : number;

  private _m_gameManager : GameManager;

  private _m_target : Ty_physicsActor;

  private _m_config : CnfRangerConfig;

  private _m_controller : CmpRangerController;

  private _m_actor : Ty_physicsActor;

  private _m_cam_p1 : Point;

  private _m_cam_p2 : Point;
}