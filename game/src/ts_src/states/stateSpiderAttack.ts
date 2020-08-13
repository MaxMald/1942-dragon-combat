/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file stateSpiderAttack.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-12-2020
 */

import { IBulletManager } from "../bulletManager/iBulletManager";
import { NullBulletManager } from "../bulletManager/nullBulletManager";
import { DC_BULLET_TYPE, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsSprite, V2 } from "../commons/1942types";
import { CmpSpiderBossController } from "../components/cmpSpiderBossController";
import { GameManager } from "../gameManager/gameManager";
import { IBaseState } from "./IBaseState";

export class StateSpiderAttack
implements IBaseState
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    this.m_id = "Spider_Attack";    
    
    this._m_bulletForce = new Phaser.Math.Vector2();
    this._m_fireRate = 0.3;    
    this._m_gameManager = GameManager.GetInstance();
    this._m_bulletManager = NullBulletManager.GetInstance();    
    
    return;
  }

  onEnter()
  : void 
  { 
    this._m_angle = 0.0;
    this._m_t = 0.0;

    return;
  }

  onExit()
  : void 
  { }

  receive(_id: number, _obj: any)
  : void 
  { 
    switch(_id)
    {
      case DC_MESSAGE_ID.kHit :

      this._m_spiderControl.addHealthPoints(-(_obj as number));
      return;
    }
  }

  update()
  : void 
  { 
    let time = this._m_t + this._m_gameManager.m_dt;

    if(time >= this._m_fireRate)
    {
      let angle = this._m_angle + 0.25;
      if(angle > 3.1415)
      {
        angle = 0.0;
      }

      let force = this._m_bulletForce;
      force.setTo(1200.0, 0.0);

      let cosA = Math.cos(angle);
      let sinA = Math.sin(angle);

      force.setTo
      (
        (force.x * cosA) - (force.y * sinA),
        (force.x * sinA) + (force.y * cosA)
      );

      this._m_bulletManager.spawn
      (
        this._m_spiderSprite.x,
        this._m_spiderSprite.y + 100,
        DC_BULLET_TYPE.kSimple,
        force
      )

      this._m_angle = angle;
      time = 0;
    }
    this._m_t = time;
    return;
  }

  setSpiderController(_spiderControl : CmpSpiderBossController)
  : void
  {
    this._m_spiderControl = _spiderControl;
    return;
  }

  setSpiderSprite(_sprite : Ty_physicsSprite)
  : void
  {
    this._m_spiderSprite = _sprite;
    return;
  }

  setBulletManager(_bulletManager : IBulletManager)
  : void
  {
    this._m_bulletManager = _bulletManager;
    return;
  }

  destroy()
  : void 
  { }

  m_id: string;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_bulletManager : IBulletManager;

  private _m_spiderControl : CmpSpiderBossController;

  private _m_gameManager : GameManager;

  private _m_spiderSprite : Ty_physicsSprite;

  private _m_bulletForce : V2;

  private _m_fireRate : number;

  private _m_angle : number;

  private _m_t : number;
}