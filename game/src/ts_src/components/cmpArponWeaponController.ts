/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpArponWeaponController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-27-2020
 */

import { BaseActor } from "../actors/baseActor";
import { IBulletManager } from "../bulletManager/iBulletManager";
import { NullBulletManager } from "../bulletManager/nullBulletManager";
import { DC_BULLET_TYPE, DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite, Ty_Sprite, V2, V3 } from "../commons/1942types";
import { CnfArponShip } from "../configObjects/cnfArponShip";
import { IEnemiesManager } from "../enemiesManager/iEnemiesManager";
import { GameManager } from "../gameManager/gameManager";
import { IBaseComponent } from "./iBaseComponent";

export class CmpArponWeaponController 
implements IBaseComponent<Ty_Sprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  static Create()
  : CmpArponWeaponController
  {
    let controller = new CmpArponWeaponController();

    controller.m_id = DC_COMPONENT_ID.kArponWeaponController;
    controller._m_gameManager = GameManager.GetInstance();

    controller._m_direction = new Phaser.Math.Vector2();
    controller._m_currentForce = new Phaser.Math.Vector2();
    controller._m_desireForce = new Phaser.Math.Vector2();
    controller._m_steerForce = new Phaser.Math.Vector2();

    controller._m_enimBulletManager = NullBulletManager.GetInstance();

    return controller;
  }
  
  init(_actor: BaseActor<Ty_Sprite>)
  : void 
  {
    this._m_actor = _actor;
    return;
  }

  setConfig(_config : CnfArponShip)
  : void
  {
    this._m_config = _config;

    this._m_actor.sendMessage
    (
      DC_MESSAGE_ID.kSetTexture,
      _config.weapon_texture_key
    );
    return;
  }

  update(_actor: BaseActor<Ty_Sprite>)
  : void 
  {    
    let config = this._m_config;

    // Pursuit player

    let playerSprite : Ty_physicsSprite = this._m_target.getWrappedInstance();
    
    let self : Ty_Sprite = this._m_actor.getWrappedInstance();
    
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

    steerForce.normalize();    

    direction.set(steerForce.x, steerForce.y);

    this._m_actor.sendMessage
    (
      DC_MESSAGE_ID.kSetAngle,
      Phaser.Math.RadToDeg(direction.angle())
    );

    ///////////////////////////////////
    // Fire Mechanism

    let time = this._m_time + this._m_gameManager.m_dt;
    
    if(time >= config.secondsPerBullet)
    {
      this._m_enimBulletManager.spawn
      (
        self.x + direction.x * 50,
        self.y + direction.y * 50,
        DC_BULLET_TYPE.kArpon,
        direction
      );

      time = 0.0;
    }

    this._m_time = time;
    return;
  }

  receive(_id: number, _obj: any)
  : void 
  {
    switch(_id)
    {
      case DC_MESSAGE_ID.kActive:

      this.activeActor();
      break;
    }
    return;
  }

  destroy()
  : void 
  {
    this._m_config = null;
    this._m_actor = null;
    this._m_target = null;
    this._m_enimBulletManager = null;
    return;
  }

  activeActor()
  : void
  {
    let playerManager = this._m_gameManager.getPlayerController();

    this._m_target = playerManager.getPlayer();

    let enimManager : IEnemiesManager = this._m_gameManager.getEnemiesManager();
    this._m_enimBulletManager = enimManager.getBulletManager();

    this._m_direction.set(0.0, 1.0);
    this._m_time = 0.0;
    return;
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _m_direction : V2;

  private _m_currentForce : V2;

  private _m_desireForce : V2;

  private _m_steerForce : V2;

  private _m_time : number;
  
  private _m_config : CnfArponShip;
  
  private _m_actor : BaseActor<Ty_Sprite>;

  private _m_target : Ty_physicsActor;

  private _m_gameManager : GameManager;

  private _m_enimBulletManager : IBulletManager;
}