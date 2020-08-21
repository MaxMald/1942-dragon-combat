/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file heroTripleShotSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-20-2020
 */

import { DC_BULLET_TYPE, DC_COMPONENT_ID, DC_CONFIG, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor } from "../../commons/1942types";
import { CmpBulletData } from "../../components/cmpBulletData";
import { CnfBulletProperties } from "../../configObjects/cnfBulletProperties";
import { CnfHeroTripleShotBullet } from "../../configObjects/cnfHeroTripleShotBullet";
import { GameManager } from "../../gameManager/gameManager";
import { IBulletManager } from "../iBulletManager";
import { IBulletSpawner } from "./iBulletSpawner";
import { NullBulletSpawner } from "./nullBulletSpawner";

export class heroTripleShotSpawner
implements IBulletSpawner
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

    let config : CnfHeroTripleShotBullet 
      = levelConfiguration.getConfig<CnfHeroTripleShotBullet>
      (
        DC_CONFIG.kHeroTripleShotBullet
      );
    
    if(config == null)
    {
      config = new CnfHeroTripleShotBullet();
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
  : heroTripleShotSpawner
  {
    let spawner = new heroTripleShotSpawner;
    
    spawner.setBulletConfiguration(new CnfHeroTripleShotBullet());
    return spawner;
  }

  setBulletConfiguration(_config : CnfHeroTripleShotBullet)
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

    let bulletProperties : CnfBulletProperties;
    if(_data !== undefined)
    {
      bulletProperties = _data as CnfBulletProperties;
    }
    else
    {
      bulletProperties = new CnfBulletProperties();
    }

    _actor.sendMessage
    (
      DC_MESSAGE_ID.kToPosition,
      new Phaser.Math.Vector3(_x, _y, 0.0) 
    );

    _actor.sendMessage
    (
      DC_MESSAGE_ID.kDirection,
      bulletProperties.direction
    )

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
    return DC_BULLET_TYPE.kTripleSHot;
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
  private _m_bulletConfig : CnfHeroTripleShotBullet;

  /**
   * Reference to the bullet manger.
   */
  private _m_bulletManager : IBulletManager;

}