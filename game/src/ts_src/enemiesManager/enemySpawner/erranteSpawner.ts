import { BulletManager } from "../../bulletManager/bulletManager";
import { IBulletManager } from "../../bulletManager/iBulletManager";
import { NullBulletManager } from "../../bulletManager/nullBulletManager";
/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file erranteSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-31-2020
 */

import { DC_COMPONENT_ID, DC_ENEMY_TYPE, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor} from "../../commons/1942types";
import { CmpEnemyHealth } from "../../components/cmpEnemyHealth";
import { CmpErranteController } from "../../components/cmpErranteController";
import { CmpNullEnemyController } from "../../components/cmpNullEnemyController";
import { CmpPlayZone } from "../../components/cmpPlayZone";
import { IEnemiesManager } from "../iEnemiesManager";
import { NullEnemiesManager } from "../nullEnemiesManager";
import { ErranteConfig } from "./erranteConfig";
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

    spawner._m_controller = CmpErranteController.Create();
    spawner._m_controller.setSpawner(spawner);
    spawner._m_controller.setConfiguration(new ErranteConfig());

    spawner._m_playZone = CmpPlayZone.Create();
    spawner._m_playZone.setBoundings(-100, -100, 1180, 2020);

    return spawner;
  }

  /**
   * Initialize the errante spawner. Actor properties are defined with the
   * configuration object. If no configuration object is gived, default
   * properties will be used.
   * 
   * @param _config configuration object. 
   */
  init(_config ?: ErranteConfig)
  : void
  {
    if(_config === undefined)
    {
      // Use default properties.
      _config = new ErranteConfig();
    }

    this.setErranteConfig(_config);
    return;
  }

  /**
   * Set the errante configuration object. This defines the initial properties
   * of the actor.
   * 
   * @param _config configuration object. 
   */
  setErranteConfig(_config : ErranteConfig)
  : void
  {
    this._m_controller.setConfiguration(_config);
    this._m_erranteConfig = _config;    
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
    this._m_controller.setDeltaTime(_dt);
    return;
  }

  spawn(_actor: Ty_physicsActor, _x: number, _y: number)
  : void 
  {
    this.assemble(_actor);    

    // Set Texture.

    let sprite = _actor.getWrappedInstance();
    sprite.setTexture(this._m_erranteConfig.texture_key);
    sprite.setAngle(90.0);
    
    sprite.body.setCircle(sprite.height * 0.5, -10.0, 0.0);   

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
    return DC_ENEMY_TYPE.kErrante;
  }

  /**
   * Assemble the components into the Actor.
   * 
   * @param _actor Actor. 
   */
  assemble(_actor : Ty_physicsActor)
  : void
  {
    // Health component.

    let healthComponent 
      = _actor.getComponent<CmpEnemyHealth>(DC_COMPONENT_ID.kEnemyHealth);
    healthComponent.setHP(this._m_erranteConfig.health);

    // Errante Controller.

    _actor.addComponent(this._m_controller);

    // Playzone component.

    _actor.addComponent(this._m_playZone);
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

    _actor.addComponent(CmpNullEnemyController.GetInstance());

    // Remove playzone component.

    _actor.removeComponent(DC_COMPONENT_ID.kPlayZone);
    return;
  }

  setEnemiesManager(_enemiesManager : IEnemiesManager)
  : void
  {
    this._m_enemiesManager = _enemiesManager;
    this._m_controller.setEnemiesManager(_enemiesManager);
    return;
  }

  setBulletManager(_bulletManager: IBulletManager)
  : void 
  {
    this._m_bulletManager = _bulletManager;
    this._m_controller.setBulletManager(_bulletManager);
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
    this._m_controller.destroy();
    this._m_controller = null;

    this._m_playZone.destroy();
    this._m_playZone = null;

    this._m_enemiesManager = null;
    this._m_erranteConfig = null;
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
   * Errante configuration object.
   */
  private _m_erranteConfig : ErranteConfig;

  ///////////////////////////////////
  // Shared components

  /**
   * Reference to the controller.
   */
  private _m_controller : CmpErranteController;

  /**
   * Referece to the playzone component.
   */
  private _m_playZone : CmpPlayZone;
}