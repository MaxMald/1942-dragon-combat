/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttBalsaruAttack.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-11-2020
 */

import { DC_BULLET_TYPE, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite, V2 } from "../../commons/1942types";
import { CmpBalsaruController } from "../../components/cmpBalsaruControllert";
import { CnfBalsaruAttack } from "../../configObjects/cnfBalsaruAttack";
import { CnfBalsaruHead } from "../../configObjects/cnfBalsaruHead";
import { GameManager } from "../../gameManager/gameManager";
import { MsgSpawnBullet } from "../../messages/msgSpawnBullet";
import { IPlayerController } from "../../playerController/IPlayerController";
import { ICmpState } from "../ICmpState";

export class SttBalsaruAttack
implements ICmpState<CmpBalsaruController>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor(_config ?: CnfBalsaruAttack)
  {
    if(_config === undefined)
    {
      _config = new CnfBalsaruAttack();
    }

    this._m_config = _config;

    this._m_config = _config;

    this.m_id = 'attack';
    
    this._m_gm = GameManager.GetInstance();

    // State properties

    this._m_time = 0.0;

    // Movement properties

    this._m_desirePosition = new Phaser.Math.Vector2();

    this._m_bodyToTarget = new Phaser.Math.Vector2();

    this._m_headPosition = new Phaser.Math.Vector2();

    // Fire rate properties    

    this._m_triggerTime = 0.0;
    
    this._m_bulletDirection = new Phaser.Math.Vector3();

    this._m_bulletData = new MsgSpawnBullet();

    return;
  }

  getStateConfiguration()
  : CnfBalsaruAttack
  {
    return this._m_config;
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

  onEnter()
  : void 
  {
    // Init state properties.

    this._m_time = 0.0;

    this._m_triggerTime = 0.0;

    // Get Kalebio actor.

    let playerController : IPlayerController = this._m_gm.getPlayerController();

    this._m_kalebio = playerController.getPlayer();

    // Set the manual movement.

    this._m_cmp.m_head.sendMessage
    (
      DC_MESSAGE_ID.kSetNeckState,
      'manual'
    );
    return;
  }

  onExit()
  : void 
  {
    // Reset head tint color
    
    let head : Ty_physicsSprite = this._m_cmp.m_head.getWrappedInstance();
    
    head.setTint(0xffffff);

    // Reset head forces.

    let forceController = this._m_cmp.m_forceController;

    forceController.setSpeed(0.0);

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

    let stateConfig = this._m_config;

    if(this._m_time > stateConfig.duration)
    {
      // Move to the next state.

      this._m_cmp.setActiveState('evade');

      return;
    }

    ///////////////////////////////////
    // Follow Kalebio

    // Get kalebio sprite

    let kalebioSprite : Ty_physicsSprite= this._m_kalebio.getWrappedInstance();
    
    // Set the desire position
    
    let desirePosition = this._m_desirePosition;

    desirePosition.set
    (
      kalebioSprite.x,
      kalebioSprite.y - 200
    );

    // Get distance from ship to kalebio

    let shipSprite = this._m_cmp.m_ship.getWrappedInstance();

    let headConfig : CnfBalsaruHead = this._m_cmp.m_headConfig;

    let bodyToTarget = this._m_bodyToTarget;    

    bodyToTarget.set
    (
      shipSprite.x - desirePosition.x,
      shipSprite.y - desirePosition.y
    );

    let distanceToTarget = bodyToTarget.length();

    let max_len = headConfig.neck_length;

    if(distanceToTarget > max_len)
    {
      let x : number = desirePosition.x;

      // Calculate the distance between the desire point x and the body x.

      let l : number = x - shipSprite.x;
      
      // Truncate x value to the circle radius.

      if(Math.abs(l) > max_len)
      {
        x += (l - max_len) * -1;
      }

      // Get y

      let y = Math.pow(max_len, 2) - Math.pow(x - shipSprite.x, 2);

      y = Math.sqrt(y) + shipSprite.y;

      // Set new desire position.

      desirePosition.set(x, y);
    }
    
    ///////////////////////////////////
    // Arrive Force

    let headSprite : Ty_physicsSprite = this._m_cmp.m_head.getWrappedInstance();

    let headPosition = this._m_headPosition;

    headPosition.set(headSprite.x, headSprite.y);

    this._m_cmp.m_forceController.arrive
    (
      desirePosition,
      headPosition,
      stateConfig.seek_max_speed
    );

    ///////////////////////////////////
    // Fire Bullet

    this._m_triggerTime += this._m_gm.m_dt;

    if(this._m_triggerTime > stateConfig.fire_rate)
    {
      this._m_triggerTime = 0;

      this._m_bulletDirection.set(0.0, 1.0);

      // Fire Bullet

      this._m_bulletData.set
      (
        headSprite.x,
        headSprite.y + 200,
        DC_BULLET_TYPE.kEnemyBasic,
        this._m_bulletDirection
      )

      this._m_cmp.m_head.sendMessage
      (
        DC_MESSAGE_ID.kFire,
        this._m_bulletData
      );
    }
    return;
  }

  destroy()
  : void 
  {
    this._m_gm = null;

    this._m_cmp = null;

    this._m_bulletData = null;
    
    this._m_bulletDirection = null;

    this._m_bodyToTarget = null;
    
    this._m_desirePosition = null;

    this._m_kalebio = null;
    
    return;
  }

  m_id: string;
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/

  ///////////////////////////////////
  // State properties

  private _m_time : number;  

  private _m_gm : GameManager;

  private _m_cmp : CmpBalsaruController;
  
  ///////////////////////////////////
  // Fire Mechanism properties

  /**
   * 
   */
  private _m_triggerTime : number;

  /**
   * 
   */
  private _m_bulletData : MsgSpawnBullet;

  /**
   * 
   */
  private _m_bulletDirection : Phaser.Math.Vector3;

  ///////////////////////////////////
  // Movement properties

  /**
   * Vector from the body position to the target position.
   */
  private _m_bodyToTarget : V2;

  /**
   * Desire Position of the head.
   */
  private _m_desirePosition : V2;

  /**
   * Head Position.
   */
  private _m_headPosition : V2;

  /**
   * Reference to Kalebio.
   */
  private _m_kalebio : Ty_physicsActor;

  /**
   * State configuration object.
   */
  private _m_config : CnfBalsaruAttack;
}