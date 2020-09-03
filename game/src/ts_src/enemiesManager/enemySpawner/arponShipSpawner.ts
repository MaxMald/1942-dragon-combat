/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file arponShipSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-27-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { BaseActor } from "../../actors/baseActor";
import { IBulletManager } from "../../bulletManager/iBulletManager";
import { NullBulletManager } from "../../bulletManager/nullBulletManager";
import { DC_COMPONENT_ID, DC_ENEMY_TYPE, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor, Ty_Sprite } from "../../commons/1942types";
import { CmpArponShipController } from "../../components/cmpArponShipController";
import { CmpArponWeaponController } from "../../components/cmpArponWeaponController";
import { CmpNullEnemyController } from "../../components/cmpNullEnemyController";
import { CmpPlayZone } from "../../components/cmpPlayZone";
import { CmpSpriteController } from "../../components/cmpSpriteController";
import { CnfArponShip } from "../../configObjects/cnfArponShip";
import { CnfArponShipSpawner } from "../../configObjects/cnfArponShipSpawner";
import { GameManager } from "../../gameManager/gameManager";
import { IEnemiesManager } from "../iEnemiesManager";
import { NullEnemiesManager } from "../nullEnemiesManager";
import { IEnemySpawner } from "./iEnemySpawner";

export class ArponShipSpawner 
implements IEnemySpawner
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : ArponShipSpawner
  {
    let spawner : ArponShipSpawner = new ArponShipSpawner();

    spawner._m_enemiesManager = NullEnemiesManager.GetInstance();

    return spawner;
  }
 
  init(_config ?: CnfArponShipSpawner)
  : void
  {
    if(_config === undefined)
    {
      // Use default properties.
      _config = new CnfArponShipSpawner();
    }

    let scene : Phaser.Scene = GameManager.GetInstance().getGameScene();
    let canvas = scene.game.canvas;

    ///////////////////////////////////
    // PlayZone

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
    
    let aControllers : CmpArponShipController[] = new Array<CmpArponShipController>();
    let controller : CmpArponShipController;   

    let index : number = 0;
    while(index < _config.pool_size)
    {
      controller = CmpArponShipController.Create();

      controller.setSpawner(this);

      aControllers.push(controller);

      ///////////////////////////////////
      // Arpon Actor

      let weaponActor : BaseActor<Ty_Sprite> = BaseActor.Create<Ty_Sprite>
      (
        scene.add.sprite
        (
          0.0,
          0.0,
          'enemy'
        ),
        'ArponWeapon_' + index.toString()
      );

      weaponActor.addComponent(CmpSpriteController.Create());
      weaponActor.addComponent(CmpArponWeaponController.Create());

      weaponActor.init();

      weaponActor.sendMessage
      (
        DC_MESSAGE_ID.kDesactive,
        weaponActor
      );

      // Add weapon actor to controller

      controller.setWeapon(weaponActor);
      
      ++index;
    }

    poolController = MxObjectPool.Create<CmpArponShipController>();
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
    return DC_ENEMY_TYPE.kArponShip;
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
      let config = _data as CnfArponShip;

      _actor.addComponent(controller);
      
      controller.init(_actor);
      controller.setEnemiesManager(this._m_enemiesManager);
      controller.setConfig(config);

      // Set Texture.

      let sprite = _actor.getWrappedInstance();
      sprite.setTexture(config.texture_key);
    
      sprite.body.setSize
      (
        sprite.height, 
        sprite.width,
        true 
      );

      sprite.setAngle(-90.0);

      // Health Points.

      _actor.sendMessage
      (
        DC_MESSAGE_ID.kSetHealthPoints,
        config.health
      );

      // PlayZOne Padding

      _actor.addComponent(this._m_playZone);

      // Send "Active" msg. Active Arpon Weapon.

      _actor.sendMessage(DC_MESSAGE_ID.kActive, _actor);

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

    let controller = _actor.getComponent<CmpArponShipController>
    (
      DC_COMPONENT_ID.kEnemyController
    );

    this._m_poolController.desactive(controller);

    // Errante controller.

    _actor.addComponent(CmpNullEnemyController.GetInstance());

    // Remove playzone component.

    _actor.removeComponent(DC_COMPONENT_ID.kPlayZone);
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
  private _m_poolController : MxObjectPool<CmpArponShipController>;

  ///////////////////////////////////
  // Shared components

  private _m_playZone : CmpPlayZone;
}