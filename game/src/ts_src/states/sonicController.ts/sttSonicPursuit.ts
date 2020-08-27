/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttSonicPursuit.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-25-2020
 */

import { DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite, V3 } from "../../commons/1942types";
import { CmpSonicController } from "../../components/cmpSonicController";
import { CnfSonic } from "../../configObjects/cnfSonic";
import { GameManager } from "../../gameManager/gameManager";
import { IPlayerController } from "../../playerController/IPlayerController";
import { ISonicState } from "./iSonicState";

export class SttSonicPursuit 
implements ISonicState
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
    return;
  }

  init
  ( 
    _controller : CmpSonicController, 
    _actor : Ty_physicsActor
  ) 
  : void
  {
    this._m_controller = _controller;
    this._m_actor = _actor;

    let playerControl : IPlayerController 
      = this._m_gameManager.getPlayerController(); 
    this._m_target = playerControl.getPlayer();    
    return;
  }

  setConfig(_config : CnfSonic)
  : void
  {
    this._m_config = _config;
  }

  onEnter()
  : void 
  { 
    let heroSprite = this._m_target.getWrappedInstance();
    let selfSprite = this._m_actor.getWrappedInstance();

    this._m_direction.set
    (
      heroSprite.x - selfSprite.x,
      heroSprite.y - selfSprite.y
    );
    this._m_direction.normalize();    
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
      case DC_MESSAGE_ID.kDesactive:

      this._explode();
      return;

      case DC_MESSAGE_ID.kKill :

      this._onKill();
      this._explode();
      return;

      case DC_MESSAGE_ID.kCollisionWithHero:

      this._onHeroCollision();
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

    let config = this._m_config;

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

  private _onKill()
  : void
  {
    GameManager.ReceiveMessage
    (
      DC_MESSAGE_ID.kAddScorePoints,
      this._m_config.score 
    );
    return;
  }

  private _onHeroCollision()
  : void
  {
    let hero = this._m_target;
    hero.sendMessage
    (
      DC_MESSAGE_ID.kHit,
      this._m_config.collision_damage
    );
    return;
  }
  
  private _explode()
  : void
  {
    this._m_controller.desactiveActor();
    this._m_controller.setActiveState('idle');
    return;
  }
  
  private _m_direction : V3;

  private _m_currentForce : V3;

  private _m_desireForce : V3;

  private _m_steerForce : V3;

  private _m_gameManager : GameManager;

  private _m_target : Ty_physicsActor;

  private _m_config : CnfSonic;

  private _m_controller : CmpSonicController;

  private _m_actor : Ty_physicsActor;
}