/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpBalsaruBulletController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-14-2020
 */

import { BaseActor } from "../actors/baseActor";
import { IBulletManager } from "../bulletManager/iBulletManager";
import { NullBulletManager } from "../bulletManager/nullBulletManager";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsSprite } from "../commons/1942types";
import { MsgSpawnBullet } from "../messages/msgSpawnBullet";
import { IBaseComponent } from "./iBaseComponent";

export class CmpBalsaruBulletController
implements IBaseComponent<Ty_physicsSprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  static Create()
  : CmpBalsaruBulletController
  {
    let controller = new CmpBalsaruBulletController();
    controller.m_id = DC_COMPONENT_ID.kBalsaruBulletController;

    return controller;
  }
  
  init(_actor: BaseActor<Ty_physicsSprite>)
  : void 
  {
    this._m_bulletManager = NullBulletManager.GetInstance();
    return;
  }

  update(_actor: BaseActor<Ty_physicsSprite>)
  : void 
  {

    return;
  }

  receive(_id: number, _obj: any)
  : void 
  {
    switch(_id)
    {
      case DC_MESSAGE_ID.kFire :

      this.fire(_obj as MsgSpawnBullet);
      return;

      case DC_MESSAGE_ID.kSetBulletManager:

      this.setBulletManager(_obj as IBulletManager);
      return;
    }
    return;
  }

  setBulletManager(_bulletManager : IBulletManager)
  : void
  {
    this._m_bulletManager = _bulletManager;
    return;
  }

  fire(_data : MsgSpawnBullet)
  : void
  {
    this._m_bulletManager.spawn(_data.x, _data.y, _data.type, _data.config);
    return;
  }

  destroy()
  : void 
  {
    this._m_bulletManager = null;

    return;
  }

  m_id: number;
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
 
  private _m_bulletManager : IBulletManager;
}