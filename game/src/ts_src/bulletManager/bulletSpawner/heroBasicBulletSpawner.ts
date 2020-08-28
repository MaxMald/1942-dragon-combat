/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file heroBasicBulletSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-04-2020
 */

import { DC_BULLET_TYPE, DC_COMPONENT_ID, DC_CONFIG, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor, V2 } from "../../commons/1942types";
import { CmpBasicBulletController } from "../../components/cmpBasicBulletController";
import { CmpBulletData } from "../../components/cmpBulletData";
import { CnfHeroBasicBullet } from "../../configObjects/cnfHeroBasicBullet";
import { GameManager } from "../../gameManager/gameManager";
import { IBulletManager } from "../iBulletManager";
import { IBulletSpawner } from "./iBulletSpawner";
import { NullBulletSpawner } from "./nullBulletSpawner";

export class HeroBasicBulletSpawner implements IBulletSpawner
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Get the hero basic bullet configuartion object set it.
   */
  init()
  : void
  { 
    let gameManager = GameManager.GetInstance();
    let levelConfiguration = gameManager.getLevelConfiguration();

    let config : CnfHeroBasicBullet 
      = levelConfiguration.getConfig<CnfHeroBasicBullet>
      (
        DC_CONFIG.kHeroBasicBullet
      );
    
    if(config == null)
    {
      config = new CnfHeroBasicBullet();
    }

    this.setBulletConfiguration(config);
    return;
  }

  /**
   * Create a new Bullet spawner.
   * 
   * @param _direction bullet default direction. default : (0.0, -1.0).
   * @param _speed bullet speed (pix/s). default : 1200 pix/sec.
   * 
   * @returns HeroBasiBulletSpawner
   */
  static Create()
  : HeroBasicBulletSpawner
  {
    let spawner = new HeroBasicBulletSpawner;
    
    spawner.setBulletConfiguration(new CnfHeroBasicBullet());
    return spawner;
  }

  setBulletConfiguration(_config : CnfHeroBasicBullet)
  : void
  {
    this._m_bulletConfig = _config;
    return;
  }

  update(_dt: number)
  : void 
  {
    return;
  }

  spawn(_actor: Ty_physicsActor, _x: number, _y: number, _data ?: any)
  : void 
  {
    this.assemble(_actor);

    _actor.sendMessage
    (
      DC_MESSAGE_ID.kToPosition,
      new Phaser.Math.Vector3(_x, _y, 0.0) 
    );

    _actor.sendMessage
    (
      DC_MESSAGE_ID.kDirection,
      new Phaser.Math.Vector2(0.0, -1.0)
    );

    _actor.sendMessage
    (
      DC_MESSAGE_ID.kSpeed,
      this._m_bulletConfig.speed
    );
    return;
  }

  assemble(_actor: Ty_physicsActor)
  : void 
  {
    // Set the bullet spawner.

    let bulletData = _actor.getComponent<CmpBulletData>
    (
      DC_COMPONENT_ID.kBulletData
    );

    bulletData.setSpawner(this);

    // Set properties.

    bulletData.setAttackPoints(this._m_bulletConfig.collision_damage);

    let sprite = _actor.getWrappedInstance();

    let circle_radius = sprite.height * 0.5;
    sprite.body.setCircle
    (
      circle_radius, 
      (sprite.width * 0.5) - circle_radius,
      (sprite.height * 0.5) - circle_radius
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

  getID(): DC_BULLET_TYPE 
  {
    return DC_BULLET_TYPE.kHeroBasic;
  }

  destroy()
  : void 
  { 
    this._m_bulletConfig = null;
    this._m_bulletManager = null;
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
   * Bullet configuration.
   */
  private _m_bulletConfig : CnfHeroBasicBullet;

  /**
   * Reference to the bullet manger.
   */
  private _m_bulletManager : IBulletManager;

}