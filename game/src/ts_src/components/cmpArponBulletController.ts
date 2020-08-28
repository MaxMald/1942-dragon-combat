/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpArponBulletController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-27-2020
 */

import { BaseActor } from "../actors/baseActor";
import { IBulletSpawner } from "../bulletManager/bulletSpawner/iBulletSpawner";
import { IBulletManager } from "../bulletManager/iBulletManager";
import { DC_COMPONENT_ID, } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite, V2, V3 } from "../commons/1942types";
import { CnfArponBullet } from "../configObjects/cnfArponBullet";
import { GameManager } from "../gameManager/gameManager";
import { CmpMovement } from "./cmpMovement";
import { CmpSimpleBulletController } from "./cmpSimpleBulletControl";
import { IBaseComponent } from "./iBaseComponent";

export class CmpArponBulletController
implements IBaseComponent<Ty_physicsSprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
 
  static Create()
  : CmpArponBulletController
  {
    let cmp = new CmpArponBulletController();

    cmp.m_id = DC_COMPONENT_ID.kArponBulletController;
    cmp._m_direction = new Phaser.Math.Vector3(0.0, 1.0);
    cmp._m_force = new Phaser.Math.Vector3(0.0, 0.0);
    cmp._m_gameManager = GameManager.GetInstance();

    return cmp;
  }
  
  init(_actor: BaseActor<Ty_physicsSprite>)
  : void 
  {
    this._m_actor = _actor;

    this._m_cmpSimpleController = _actor.getComponent<CmpSimpleBulletController>
    (
      DC_COMPONENT_ID.kSimpleBulletControl
    );
    return;
  }

  setConfig(_config : CnfArponBullet)
  : void
  {
    this._m_config = _config;
    return;
  }

  setSpawner(_spawner : IBulletSpawner)
  : void
  {
    this._m_spawner = _spawner;
    return;
  }

  setManager(_manager : IBulletManager)
  : void
  {
    this._m_manager = _manager;
    return;
  }

  activate(_direction_x : number, _direction_y : number)
  : void
  {
    this._m_direction.set(_direction_x, _direction_y);
    return;
  }

  update(_actor: BaseActor<Ty_physicsSprite>)
  : void 
  {
    let sprite = _actor.getWrappedInstance();

    let direction : V2 = this._m_cmpSimpleController.getDirection();

    let config = this._m_config;

    let circle_radius = sprite.height * 0.5;
    sprite.body.setCircle
    (
      circle_radius, 
      ((sprite.width * 0.5) - circle_radius) + (direction.x * config.collider_offset),
      ((sprite.height * 0.5) - circle_radius) + (direction.y * config.collider_offset)
    );
    return;
  }

  receive(_id: number, _obj: any)
  : void 
  {   
  }

  destroy()
  : void 
  {
    this._m_config = null;
    this._m_actor = null;
    this._m_gameManager = null;
    return;
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_actor : Ty_physicsActor;

  private _m_config : CnfArponBullet;

  private _m_direction : V3;

  private _m_force : V3;

  private _m_spawner : IBulletSpawner;

  private _m_manager : IBulletManager;

  private _m_gameManager : GameManager;

  private _m_cmpSimpleController : CmpSimpleBulletController;
}