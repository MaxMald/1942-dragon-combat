/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttRangerExplosion.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-25-2020
 */

import { DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor } from "../../commons/1942types";
import { CmpRangerController } from "../../components/cmpRangerController";
import { CnfRangerConfig } from "../../configObjects/cnfRangerConfig";
import { EffectsManager } from "../../effectsManager/effectsManager";
import { GameManager } from "../../gameManager/gameManager";
import { IPlayerController } from "../../playerController/IPlayerController";
import { IRangerState } from "./iRangerState";

export class SttRangerExplosion
implements IRangerState
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor()
  {    
    this.m_id = "explosion";
    this._m_gameManager = GameManager.GetInstance();
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
      hero.sendMessage
      (
        DC_MESSAGE_ID.kRangerExplosionHit,
        config.collision_damage
      );
    }

    // Explosion Effect

    let fx : EffectsManager = this._m_gameManager.getEffectsManager();

    fx.spawnExplosion(selfSprite.x, selfSprite.y, 10);

    this._m_controller.desactiveActor();
    this._m_controller.setActiveState('idle');
    return;
  }  

  destroy()
  : void 
  {
    return;
  }

  m_id: string; 
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _m_gameManager : GameManager;
  
  private _m_config : CnfRangerConfig;

  private _m_controller : CmpRangerController;

  private _m_actor : Ty_physicsActor;

  private _m_target : Ty_physicsActor;

}