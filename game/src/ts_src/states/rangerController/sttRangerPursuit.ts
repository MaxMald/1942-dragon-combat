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
import { Point, Ty_physicsActor, V2, V3 } from "../../commons/1942types";
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

    this._m_selfPosition = new Phaser.Math.Vector2();
    this._m_targetPosition = new Phaser.Math.Vector2();

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

    time = this._m_time + deltaTime;
    
    this._m_time = time;

    // Pursuit if the time reach the max time.

    let config = this._m_config;

    if(time >= config.life_time)
    {
      this._explode();
      return;
    }

    ///////////////////////////////////
    // Pursuit

    let selfPosition : V2 = this._m_selfPosition;

    let targetPosition : V2 = this._m_targetPosition;

    let sprite = this._m_actor.getWrappedInstance();

    selfPosition.set(sprite.x, sprite.y);

    let targetSprite = this._m_target.getWrappedInstance();

    targetPosition.set(targetSprite.x, targetSprite.y);

    this._m_controller.m_forceController.seek
    (
      targetPosition, 
      selfPosition, 
      this._m_config.steer_force
    );

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
    this._m_controller.setActiveState('explosion');
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

  private _m_targetPosition : V2;

  private _m_selfPosition : V2;

  private _m_time : number;

  private _m_gameManager : GameManager;

  private _m_target : Ty_physicsActor;

  private _m_config : CnfRangerConfig;

  private _m_controller : CmpRangerController;

  private _m_actor : Ty_physicsActor;

  private _m_cam_p1 : Point;

  private _m_cam_p2 : Point;
}