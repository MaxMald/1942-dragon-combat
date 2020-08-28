/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file arponBulletSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-27-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { DC_BULLET_TYPE, DC_COMPONENT_ID, DC_CONFIG, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor, V2 } from "../../commons/1942types";
import { CmpArponBulletController } from "../../components/cmpArponBulletController";
import { CmpBulletData } from "../../components/cmpBulletData";
import { CnfArponBullet } from "../../configObjects/cnfArponBullet";
import { CnfArponBulletSpawner } from "../../configObjects/cnfArponBulletSpawner";
import { GameManager } from "../../gameManager/gameManager";
import { IBulletManager } from "../iBulletManager";
import { IBulletSpawner } from "./iBulletSpawner";
import { NullBulletSpawner } from "./nullBulletSpawner";

export class ArponBulletSpawner 
implements IBulletSpawner
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : ArponBulletSpawner
  {
    let spawner = new ArponBulletSpawner;

    spawner._m_poolController = MxObjectPool.Create<CmpArponBulletController>();

    return spawner;
  }

  /**
   * Intialize this bullet spawner.
   */
  init()
  : void
  { 
    let gameManger = GameManager.GetInstance();
    let levelConfig = gameManger.getLevelConfiguration();

    let spawnerConfig = levelConfig.getConfig<CnfArponBulletSpawner>
    (
      DC_CONFIG.kArponBulletSpawner
    );
    this._m_spawnerConfig = spawnerConfig;

    let bulletConfig = levelConfig.getConfig<CnfArponBullet>
    (
      DC_CONFIG.kArponBullet
    );
    this._m_bulletConfig = bulletConfig;

    ///////////////////////////////////
    // Controllers

    let aController = Array<CmpArponBulletController>();

    let index = 0;
    while(index < spawnerConfig.pool_size)
    {
      
      let bulletController : CmpArponBulletController
        = CmpArponBulletController.Create();

      bulletController.setConfig(bulletConfig);
      bulletController.setSpawner(this);

      aController.push(bulletController);

      ++index;
    }

    this._m_poolController.init(aController);
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
    let controller = this._m_poolController.get();

    if(controller != null)
    {
      // Tint sprite.

      let sprite = _actor.getWrappedInstance();

      let circle_radius = sprite.height * 0.5;
      sprite.body.setCircle
      (
        circle_radius, 
        (sprite.width * 0.5) - circle_radius,
        (sprite.height * 0.5) - circle_radius
      );

      sprite.setTint(0x0000ff);

      let config = this._m_bulletConfig;

      sprite.setTexture(config.texture_key);

      // Set the bullet spawner.

      let bulletData = _actor.getComponent<CmpBulletData>
      (
        DC_COMPONENT_ID.kBulletData
      );

      bulletData.setSpawner(this);

      // Set properties.

      bulletData.setAttackPoints(config.collision_damage);

      // Set controller.

      _actor.addComponent(controller);

      controller.init(_actor);

      // Set direction.

      _actor.sendMessage
      (
        DC_MESSAGE_ID.kDirection,
        _data
      );

      _actor.sendMessage
      (
        DC_MESSAGE_ID.kSpeed,
        this._m_bulletConfig.speed
      )
    }
    else
    {
      this._m_bulletManager.disableActor(_actor);
    }
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

    // Disable Controller

    let controller = _actor.getComponent<CmpArponBulletController>
    (
      DC_COMPONENT_ID.kArponBulletController
    );

    this._m_poolController.desactive(controller);

    // Remove controller.

    _actor.removeComponent(DC_COMPONENT_ID.kArponBulletController);

    // tint.

    let sprite = _actor.getWrappedInstance();
    
    sprite.setTint(0xffffff);

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

    this._m_poolController.forEach
    (
      function(_controller : CmpArponBulletController)
      : void
      {
        _controller.setManager(_manager);
        return;
      }
    );
    return;
  }

  /**
   * Get the bullet's spawner ID.
   */
  getID()
  : DC_BULLET_TYPE 
  {
    return DC_BULLET_TYPE.kArpon;
  }

  /**
   * Safely destroys the bullet spawner.
   */
  destroy()
  : void 
  {
    this._m_bulletManager = null;
    this._m_spawnerConfig = null;
    this._m_bulletConfig = null;

    this._m_poolController.forEach
    (
      function(_element : CmpArponBulletController)
      : void
      {
        _element.destroy();
        return;
      }
    );
    this._m_poolController.destroy();
    this._m_poolController = null;
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
   * Spawner configuartion object.
   */
  private _m_spawnerConfig : CnfArponBulletSpawner;

  /**
   * Bullet configuration object.
   */
  private _m_bulletConfig : CnfArponBullet;

  /**
   * Reference to the bullet manger.
   */
  private _m_bulletManager : IBulletManager;

  /**
   * Pool of controllers.
   */
  private _m_poolController : MxObjectPool<CmpArponBulletController>;
}