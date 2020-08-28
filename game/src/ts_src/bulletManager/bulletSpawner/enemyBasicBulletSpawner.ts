/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file enemyBasicBulletSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-06-2020
 */

import { DC_BULLET_TYPE, DC_COMPONENT_ID, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor, V2 } from "../../commons/1942types";
import { CmpBasicBulletController } from "../../components/cmpBasicBulletController";
import { CmpBulletData } from "../../components/cmpBulletData";
import { CnfEnemyBasicBullet } from "../../configObjects/cnfEnemyBasicBullet";
import { IBulletManager } from "../iBulletManager";
import { IBulletSpawner } from "./iBulletSpawner";
import { NullBulletSpawner } from "./nullBulletSpawner";

export class EnemyBasicBulletSpawner 
implements IBulletSpawner
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : EnemyBasicBulletSpawner
  {
    let spawner = new EnemyBasicBulletSpawner;

    let basicMovement = CmpBasicBulletController.Create();
    basicMovement.setDirection(0.0, 1.0);
    
    spawner._m_controller = basicMovement;
    spawner._m_direction = new Phaser.Math.Vector2(0.0, 1.0);

    spawner.setBulletConfig(new CnfEnemyBasicBullet());
    return spawner;
  }

  /**
   * Intialize this bullet spawner.
   */
  init()
  : void
  { }

  update(_dt: number)
  : void 
  {    
    return;
  }

  /**
   * Set the configuartion object of the bullet. 
   * 
   * @param _config conguratio object. 
   */
  setBulletConfig(_config : CnfEnemyBasicBullet)
  : void
  {
    this._m_controller.setConfiguartion(_config);
    this._m_bulletConfig = _config;
    return;
  }

  spawn(_actor: Ty_physicsActor, _x: number, _y: number, _data ?: any)
  : void 
  {
    _actor.sendMessage
    (
      DC_MESSAGE_ID.kToPosition,
      new Phaser.Math.Vector3(_x, _y, 0.0) 
    );

    this.assemble(_actor, _data);    
    return;
  }

  assemble(_actor: Ty_physicsActor, _data ?: any)
  : void 
  {
    // Tint sprite.

    let sprite = _actor.getWrappedInstance();

    sprite.setTint(0xff0000);
    sprite.setTexture(this._m_bulletConfig.texture_key);

    let circle_radius = sprite.height * 0.5;
    sprite.body.setCircle
    (
      circle_radius, 
      (sprite.width * 0.5) - circle_radius,
      (sprite.height * 0.5) - circle_radius
    );

    // Set the bullet spawner.

    let bulletData = _actor.getComponent<CmpBulletData>
    (
      DC_COMPONENT_ID.kBulletData
    );

    bulletData.setSpawner(this);

    // Set properties.

    bulletData.setAttackPoints(this._m_bulletConfig.collision_damage);

    // Set the controller.

    _actor.addComponent(this._m_controller);

    // Direction and Speed.

    let direction : V2 = _data as V2;

    _actor.sendMessage
    (
      DC_MESSAGE_ID.kDirection,
      direction
    );

    _actor.sendMessage
    (
      DC_MESSAGE_ID.kSpeed,
      this._m_bulletConfig.speed
    );
    return;
  }

  disassemble(_actor: Ty_physicsActor)
  : void 
  {
    // Set the bullet spawner.

    let bulletData = _actor.getComponent<CmpBulletData>
    (
      DC_COMPONENT_ID.kBulletData
    );

    bulletData.setSpawner(NullBulletSpawner.GetInstance());

    // Remove controller.

    _actor.removeComponent(DC_COMPONENT_ID.kBasicBulletController);

    // Disable actor.

    this._m_bulletManager.disableActor(_actor);

    return;
  }

  /**
   * Set the bullet manager.
   * 
   * @param _manager bullet manager 
   */
  setBulletManager(_manager : IBulletManager)
  : void
  {
    this._m_bulletManager = _manager;
    return;
  }

  /**
   * Get the bullet's spawner ID.
   */
  getID()
  : DC_BULLET_TYPE 
  {
    return DC_BULLET_TYPE.kEnemyBasic;
  }

  /**
   * Safely destroys the bullet spawner.
   */
  destroy()
  : void 
  { 
    this._m_controller.destroy();
    this._m_controller = null;

    this._m_bulletManager = null;
    this._m_bulletConfig = null;
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * private constructor.
   */
  private constructor()
  { } 

  /**
   * Direction of the bullet.
   */
  private _m_direction : V2;

  /**
   * Bullet configuartion object.
   */
  private _m_bulletConfig : CnfEnemyBasicBullet;

  /**
   * Reference to the bullet manger.
   */
  private _m_bulletManager : IBulletManager;
  
  /**
   * Shared bullet controller.
   */
  private _m_controller : CmpBasicBulletController;
}