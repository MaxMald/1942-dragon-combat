/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file erranteSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-31-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { IBulletManager } from "../../bulletManager/iBulletManager";
import { NullBulletManager } from "../../bulletManager/nullBulletManager";
import { DC_COMPONENT_ID, DC_ENEMY_TYPE, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor} from "../../commons/1942types";
import { CmpEnemyHealth } from "../../components/cmpEnemyHealth";
import { CmpErranteController } from "../../components/cmpErranteController";
import { CmpNullEnemyController } from "../../components/cmpNullEnemyController";
import { CmpPlayZone } from "../../components/cmpPlayZone";
import { CnfErrante } from "../../configObjects/cnfErrante";
import { CnfErranteSpawner } from "../../configObjects/cnfErranteSpawner";
import { GameManager } from "../../gameManager/gameManager";
import { IEnemiesManager } from "../iEnemiesManager";
import { NullEnemiesManager } from "../nullEnemiesManager";
import { IEnemySpawner } from "./iEnemySpawner";

export class ErranteSpawner implements IEnemySpawner
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : ErranteSpawner
  {
    let spawner : ErranteSpawner = new ErranteSpawner();

    spawner._m_enemiesManager = NullEnemiesManager.GetInstance();
    spawner._m_bulletManager = NullBulletManager.GetInstance();

    spawner._m_poolControllers = MxObjectPool.Create<CmpErranteController>();

    spawner._m_playZone = CmpPlayZone.Create();

    return spawner;
  }

  /**
   * Initialize the errante spawner. Actor properties are defined with the
   * configuration object. If no configuration object is gived, default
   * properties will be used.
   * 
   * @param _config configuration object. 
   */
  init(_config ?: CnfErranteSpawner)
  : void
  {
    if(_config === undefined)
    {
      // Use default properties.
      _config = new CnfErranteSpawner();
    }

    // Define playzone boundings

    let gameManager = GameManager.GetInstance();

    let scene : Phaser.Scene = gameManager.getGameScene();
    
    let canvas = scene.game.canvas;
    
    this._m_playZone.setBoundings
    (
      -_config.playZone_padding, 
      -_config.playZone_padding, 
      canvas.width + _config.playZone_padding, 
      canvas.height + _config.playZone_padding
    );

    // controllers pools

    let aControllers = new Array<CmpErranteController>();

    let index : number = 0;
    while(index < _config.pool_size)
    {
      let controller : CmpErranteController = CmpErranteController.Create();

      controller.setSpawner(this);

      aControllers.push(controller);
      ++index;
    }

    this._m_poolControllers.init(aControllers);
    return;
  }

  /**
   * Updates the shared components.
   * 
   * @param _dt delta time. 
   */
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
      new Phaser.Math.Vector3(_x, _y)
    );

    this.assemble(_actor, _data);   
    return;
  }

  /**
   * Get the dragon ID.
   */
  getID()
  : DC_ENEMY_TYPE 
  {
    return DC_ENEMY_TYPE.kErrante;
  }

  /**
   * Assemble the components into the Actor.
   * 
   * @param _actor Actor. 
   */
  assemble(_actor : Ty_physicsActor, _data ?: any)
  : void
  {
    let config : CnfErrante = _data as CnfErrante;
    
    let controller = this._m_poolControllers.get();

    if(controller != null)
    {
      // Health component.

      let healthComponent 
        = _actor.getComponent<CmpEnemyHealth>(DC_COMPONENT_ID.kEnemyHealth);
      healthComponent.setHP(config.health);

      // Setup controller

      controller.setConfiguration(config);

      _actor.addComponent(controller);

      controller.init(_actor);

      // Playzone component.

      _actor.addComponent(this._m_playZone);

      // Sprite Configuration.

      let sprite = _actor.getWrappedInstance();
      sprite.setTexture(config.texture_key);
      sprite.setAngle(90.0);
    
      let circle_radius = sprite.height * 0.5;
      sprite.body.setCircle
      (
        circle_radius, 
        (sprite.width * 0.5) - circle_radius,
        (sprite.height * 0.5) - circle_radius
      );

      // Enemies counter.

      this._m_enemiesManager.addEnemies(1);
    }
    else
    {
      this._m_enemiesManager.disableActor(_actor);
    }    
    return;
  }

  /**
   * Disassemble the component of the given actor.
   * 
   * @param _actor Actor.
   */
  disasemble(_actor : Ty_physicsActor)
  : void
  {
    // Errante controller.

    let controller = _actor.getComponent<CmpErranteController>
    (
      DC_COMPONENT_ID.kEnemyController
    );

    this._m_poolControllers.desactive(controller);

    _actor.addComponent(CmpNullEnemyController.GetInstance());

    // Remove playzone component.

    _actor.removeComponent(DC_COMPONENT_ID.kPlayZone);
    return;
  }

  setEnemiesManager(_enemiesManager : IEnemiesManager)
  : void
  {
    this._m_enemiesManager = _enemiesManager;
    
    this._m_poolControllers.forEach
    (
      function(_cmp : CmpErranteController)
      : void
      {
        _cmp.setEnemiesManager(_enemiesManager);
        return;
      }
    );
    return;
  }

  setBulletManager(_bulletManager: IBulletManager)
  : void 
  {
    this._m_bulletManager = _bulletManager;
    
    this._m_poolControllers.forEach
    (
      function(_cmp : CmpErranteController)
      : void
      {
        _cmp.setBulletManager(_bulletManager);
        return;
      }
    );
    return;
  }

  getBulletManager()
  : IBulletManager 
  {
    return this._m_bulletManager;
  }

  getEnemiesManager()
  : IEnemiesManager
  {
    return this._m_enemiesManager;
  }

  destroy()
  : void 
  {
    this._m_playZone.destroy();
    this._m_playZone = null;

    this._m_enemiesManager = null;

    this._m_poolControllers.forEach
    (
      function(_cmp : CmpErranteController)
      : void
      {
        _cmp.destroy();
        return;
      }
    );
    this._m_poolControllers.clear();
    this._m_poolControllers = null;
    return;
  }
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
 
  /**
   * Private constructor.
   */
  private constructor()
  { }    
  
  /**
   * Reference to the enemies manager.
   */
  private _m_enemiesManager : IEnemiesManager;

  /**
   * Reference to the bullet manager.
   */
  private _m_bulletManager : IBulletManager;

  /**
   * Errante controlles, object pool
   */
  private _m_poolControllers : MxObjectPool<CmpErranteController>;

  ///////////////////////////////////
  // Shared components

  /**
   * Referece to the playzone component.
   */
  private _m_playZone : CmpPlayZone;
}