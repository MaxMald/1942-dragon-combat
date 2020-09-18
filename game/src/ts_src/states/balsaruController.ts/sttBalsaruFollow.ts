/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttBalsaruFollow.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-11-2020
 */

import { DC_BULLET_TYPE, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsSprite } from "../../commons/1942types";
import { CmpBalsaruController } from "../../components/cmpBalsaruControllert";
import { GameManager } from "../../gameManager/gameManager";
import { MsgSpawnBullet } from "../../messages/msgSpawnBullet";
import { ICmpState } from "../ICmpState";

export class SttBalsaruFollow
implements ICmpState<CmpBalsaruController>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    this.m_id = 'attack';
    
    this._m_gm = GameManager.GetInstance();

    this._m_time = 0.0;
    this._m_triggerTime = 0.0;
    this._m_fireRate = 0.3;
    this._m_duration = 10.0;
    this._m_bulletDirection = new Phaser.Math.Vector3();

    this._m_bulletData = new MsgSpawnBullet();

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

  onEnter()
  : void 
  {
    this._m_time = 0.0;

    this._m_triggerTime = 0.0;

    // Set Neck State

    this._m_cmp.m_actor.sendMessage
    (
      DC_MESSAGE_ID.kSetNeckState,
      'follow'
    );

    return;
  }

  onExit()
  : void 
  {
    let head : Ty_physicsSprite = this._m_cmp.m_actor.getWrappedInstance();
    head.setTint(0xffffff);
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
    this._m_time += this._m_gm.m_dt;

    this._m_triggerTime += this._m_gm.m_dt;

    if(this._m_time > this._m_duration)
    {
      this._m_cmp.setActiveState('evade');
      return;
    }

    if(this._m_triggerTime > this._m_fireRate)
    {
      this._m_triggerTime = 0;
      
      let actor = this._m_cmp.m_actor;

      let sprite = actor.getWrappedInstance();

      this._m_bulletDirection.set(0.0, 1.0);

      this._m_bulletData.set
      (
        sprite.x,
        sprite.y + 200,
        DC_BULLET_TYPE.kEnemyBasic,
        this._m_bulletDirection
      )

      this._m_cmp.m_actor.sendMessage
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
    return;
  }

  m_id: string;
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_time : number;  

  private _m_duration : number;

  private _m_gm : GameManager;

  private _m_cmp : CmpBalsaruController;
  
  ///////////////////////////////////
  // Fire Mechanism

  private _m_triggerTime : number;

  private _m_fireRate : number;

  private _m_bulletData : MsgSpawnBullet;

  private _m_bulletDirection : Phaser.Math.Vector3;
}