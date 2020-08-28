/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file rangerSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-25-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { IBulletManager } from "../../bulletManager/iBulletManager";
import { NullBulletManager } from "../../bulletManager/nullBulletManager";
import { DC_COMPONENT_ID, DC_ENEMY_TYPE, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor } from "../../commons/1942types";
import { CmpNullEnemyController } from "../../components/cmpNullEnemyController";
import { CmpRangerController } from "../../components/cmpRangerController";
import { CnfRangerConfig } from "../../configObjects/cnfRangerConfig";
import { CnfRangerSpawner } from "../../configObjects/cnfRangerSpawnerConfig";
import { IEnemiesManager } from "../iEnemiesManager";
import { NullEnemiesManager } from "../nullEnemiesManager";
import { IEnemySpawner } from "./iEnemySpawner";

export class RangerSpawner 
implements IEnemySpawner
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : RangerSpawner
  {
    let spawner : RangerSpawner = new RangerSpawner();

    spawner._m_enemiesManager = NullEnemiesManager.GetInstance();

    return spawner;
  }
 
  init(_config ?: CnfRangerSpawner)
  : void
  {
    if(_config === undefined)
    {
      // Use default properties.
      _config = new CnfRangerSpawner();
    }

    let poolController = this._m_poolController;

    if(poolController != null)
    {
      poolController.destroy();
    }   
    
    let aControllers : CmpRangerController[] = new Array<CmpRangerController>();
    let controller : CmpRangerController;

    let index : number = 0;
    while(index < _config.pool_size)
    {
      controller = CmpRangerController.Create();

      controller.setSpawner(this);

      aControllers.push(controller);
      ++index;
    }

    poolController = MxObjectPool.Create<CmpRangerController>();
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
    this.assemble(_actor, _data);  
    
    // Set position.

    _actor.sendMessage
    (
      DC_MESSAGE_ID.kToPosition, 
      new Phaser.Math.Vector3(_x, _y)
    );
    return;
  }

  /**
   * Get the dragon ID.
   */
  getID()
  : DC_ENEMY_TYPE 
  {
    return DC_ENEMY_TYPE.kRanger;
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
      let config = _data as CnfRangerConfig;

      _actor.addComponent(controller);
      
      controller.init(_actor);
      controller.setEnemiesManager(this._m_enemiesManager);
      controller.setConfig(config);

      controller.setActiveState('pursuit');

      // Set Texture.

      let sprite = _actor.getWrappedInstance();
      sprite.setTexture(config.texture_key);
    
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

    let controller = _actor.getComponent<CmpRangerController>
    (
      DC_COMPONENT_ID.kEnemyController
    );

    this._m_poolController.desactive(controller);

    // Errante controller.

    _actor.addComponent(CmpNullEnemyController.GetInstance());
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
  private _m_poolController : MxObjectPool<CmpRangerController>;

  ///////////////////////////////////
  // Shared components
}