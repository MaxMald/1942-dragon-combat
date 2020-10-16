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
import { Ty_physicsActor, Ty_physicsSprite, V2, V3 } from "../../commons/1942types";
import { CmpRangerController } from "../../components/cmpRangerController";
import { CnfRangerConfig } from "../../configObjects/cnfRangerConfig";
import { GameManager } from "../../gameManager/gameManager";
import { IPlayerController } from "../../playerController/IPlayerController";
import { IRangerState } from "./iRangerState";

export class SttRangerBackEntrance
implements IRangerState
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor()
  {
    this._m_gameManager = GameManager.GetInstance();
    this.m_id = "backEntrance";

    this._m_toTarget = new Phaser.Math.Vector2();
    this._m_desirePosition = new Phaser.Math.Vector2();
    this._m_selfPosition = new Phaser.Math.Vector2();
    this._m_startPosition = new Phaser.Math.Vector2();

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

    // Save desire position and start position.

    let sprite = this._m_actor.getWrappedInstance();

    this._m_desirePosition.set
    (
      sprite.x,
      sprite.y
    );

    this._m_startPosition.set
    (
      sprite.x,
      -200
    );

    // Disable body.

    sprite.body.enable = false;

    // Setup Sprite.

    sprite.setTexture(this._m_config.texture_key_back);

    sprite.setDepth(0);

    // Setup force controller

    this._m_controller.m_forceController.getDirection().set(0.0, 1.0);

    this._m_controller.m_forceController.setSpeed(0);

    return;
  }

  onExit()
  : void 
  {
    let sprite = this._m_actor.getWrappedInstance();

    // Disable body.

    sprite.body.enable = true;

    sprite.setPosition(this._m_desirePosition.x, this._m_desirePosition.y);
    
    sprite.setTexture(this._m_config.texture_key);

    sprite.setDepth(0);

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
    let sprite = this._m_actor.getWrappedInstance();

    sprite.setTexture('enemy_ranger_02');

    let deltaTime = this._m_gameManager.m_dt;

    let time : number
    
    time = this._m_time + deltaTime;

    this._m_time = time;    

    // Calculate the animation step.

    let config = this._m_config;

    let step : number = (time / config.backEntranceDuration);

    if(step >= 1.0)
    {
      this._m_controller.setActiveState('entrance');
      return;
    }
    else
    {
      // Calculate the translation.

      let desirePosition = this._m_desirePosition;

      let startPosition = this._m_startPosition;

      let translation = this._m_toTarget;

      translation.copy(desirePosition);

      translation.subtract(startPosition);

      translation.scale(step);

      // Calculate the position.

      let selfPosition = this._m_selfPosition;

      selfPosition.copy(startPosition);

      selfPosition.add(translation);
      
      // Set position.

      let sprite = this._m_actor.getWrappedInstance();

      sprite.setPosition(selfPosition.x, selfPosition.y);

    }
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

  private _m_toTarget : V2;

  private _m_startPosition : V2;

  private _m_desirePosition : V2;

  private _m_selfPosition : V2;

  private _m_time : number;

  private _m_gameManager : GameManager;

  private _m_target : Ty_physicsActor;

  private _m_config : CnfRangerConfig;

  private _m_controller : CmpRangerController;

  private _m_actor : Ty_physicsActor;
}