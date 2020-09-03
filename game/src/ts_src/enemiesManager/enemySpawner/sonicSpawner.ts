/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sonicSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-26-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { IBulletManager } from "../../bulletManager/iBulletManager";
import { NullBulletManager } from "../../bulletManager/nullBulletManager";
import { DC_COMPONENT_ID, DC_ENEMY_TYPE, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor } from "../../commons/1942types";
import { CmpNullEnemyController } from "../../components/cmpNullEnemyController";
import { CmpPlayZone } from "../../components/cmpPlayZone";
import { CmpSonicController } from "../../components/cmpSonicController";
import { CnfSonic } from "../../configObjects/cnfSonic";
import { CnfSonicSpawner } from "../../configObjects/cnfSonicSpawner";
import { GameManager } from "../../gameManager/gameManager";
import { IEnemiesManager } from "../iEnemiesManager";
import { NullEnemiesManager } from "../nullEnemiesManager";
import { IEnemySpawner } from "./iEnemySpawner";

export class SonicSpawner 
implements IEnemySpawner
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : SonicSpawner
  {
    let spawner : SonicSpawner = new SonicSpawner();

    spawner._m_enemiesManager = NullEnemiesManager.GetInstance();
    return spawner;
  }
 
  init(_config ?: CnfSonicSpawner)
  : void
  {
    if(_config === undefined)
    {
      // Use default properties.
      _config = new CnfSonicSpawner();
    }

    let scene : Phaser.Scene = GameManager.GetInstance().getGameScene();
    let canvas = scene.game.canvas;

    this._m_playZone = CmpPlayZone.Create();
    this._m_playZone.setBoundings
    (
      -_config.playZone_padding, 
      -_config.playZone_padding, 
      canvas.width + _config.playZone_padding, 
      canvas.height + _config.playZone_padding
    );

    let poolController = this._m_poolController;

    if(poolController != null)
    {
      poolController.destroy();
    }   
    
    let aControllers : CmpSonicController[] = new Array<CmpSonicController>();
    let controller : CmpSonicController;

    let index : number = 0;
    while(index < _config.pool_size)
    {
      controller = CmpSonicController.Create();

      controller.setSpawner(this);

      aControllers.push(controller);
      ++index;
    }

    poolController = MxObjectPool.Create<CmpSonicController>();
    poolController.init(aControllers);

    this._m_poolController = poolController;
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
    // Set position.

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
    return DC_ENEMY_TYPE.kSonico;
  }

  /**
   * Assemble the components into the Actor.
   * 
   * @param _actor Actor. 
   */
  assemble(_actor : Ty_physicsActor, _data ?: any)
  : void
  {
    let controller = this._m_poolController.get();
    if(controller != null)
    {
      let config = _data as CnfSonic;

      _actor.addComponent(controller);
      
      controller.init(_actor);
      controller.setEnemiesManager(this._m_enemiesManager);
      controller.setConfig(config);

      controller.setActiveState('pursuit');

      // Set Texture.

      let sprite = _actor.getWrappedInstance();
      sprite.setTexture(config.texture_key);
      sprite.setTint(0xD4D06A);
    
      let circle_radius = sprite.height * 0.5;
      sprite.body.setCircle
      (
        circle_radius, 
        (sprite.width * 0.5) - circle_radius,
        (sprite.height * 0.5) - circle_radius
      );

      // Health Points.

      _actor.sendMessage
      (
        DC_MESSAGE_ID.kSetHealthPoints,
        config.health
      );

      // PlayZOne Padding

      _actor.addComponent(this._m_playZone);

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
    // Desactive controller.

    let controller = _actor.getComponent<CmpSonicController>
    (
      DC_COMPONENT_ID.kEnemyController
    );

    this._m_poolController.desactive(controller);

    _actor.addComponent(CmpNullEnemyController.GetInstance());

    // Remove playzone component.

    _actor.removeComponent(DC_COMPONENT_ID.kPlayZone);

    // Sonic Color

    let sprite = _actor.getWrappedInstance();
    sprite.setTint(0xffffff);
    return;
  }

  setEnemiesManager(_enemiesManager : IEnemiesManager)
  : void
  {
    this._m_enemiesManager = _enemiesManager;
    return;
  }

  getEnemiesManager()
  : IEnemiesManager
  {
    return this._m_enemiesManager;
  }

  setBulletManager(_bulletManager: IBulletManager)
  : void 
  {    
    return;
  }

  getBulletManager()
  : IBulletManager 
  {
    return NullBulletManager.GetInstance();
  } 

  destroy()
  : void 
  {
    this._m_enemiesManager = null;
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
   * The controller pool.
   */
  private _m_poolController : MxObjectPool<CmpSonicController>;

  ///////////////////////////////////
  // Shared components

  /**
   * Referece to the playzone component.
   */
  private _m_playZone : CmpPlayZone;
}