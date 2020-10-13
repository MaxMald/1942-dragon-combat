/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpErranteController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-31-2020
 */

import { IBulletManager } from "../bulletManager/iBulletManager";
import { NullBulletManager } from "../bulletManager/nullBulletManager";
import { DC_BULLET_TYPE, DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor, V2, V3 } from "../commons/1942types";
import { CnfErrante } from "../configObjects/cnfErrante";
import { IEnemySpawner } from "../enemiesManager/enemySpawner/iEnemySpawner";
import { NullEnemySpawner } from "../enemiesManager/enemySpawner/nullEnemySpawner";
import { IEnemiesManager } from "../enemiesManager/iEnemiesManager";
import { NullEnemiesManager } from "../enemiesManager/nullEnemiesManager";
import { GameManager } from "../gameManager/gameManager";
import { ICmpEnemyController } from "./iCmpEnemyController";

export class CmpErranteController 
implements ICmpEnemyController
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  static Create()
  : CmpErranteController
  {
    let controller = new CmpErranteController();

    controller.m_id = DC_COMPONENT_ID.kEnemyController;

    controller._m_direction = new Phaser.Math.Vector3(0.0, 1.0);
    controller._m_force = new Phaser.Math.Vector3();
    controller._m_bullet_direction = new Phaser.Math.Vector2(0.0, 1.0);
    
    // Default properties

    controller._m_config = new CnfErrante();
    controller._m_time = 0.0;

    controller._m_bulletManager = NullBulletManager.GetInstance();
    controller._m_enemiesManager = NullEnemiesManager.GetInstance();
    controller._m_spawner = NullEnemySpawner.GetInstance();

    controller._m_gameManager = GameManager.GetInstance();

    return controller;
  }

  init(_actor: Ty_physicsActor)
  : void 
  {
    this._actor = _actor;
    this._m_time = this._m_config.init_time;
    return;
  }

  update(_actor: Ty_physicsActor)
  : void 
  {
    let config = this._m_config;
    let deltaTime = this._m_gameManager.m_dt

    // Movement

    let force = this._m_force;
    let direction = this._m_direction;
    let mult = config.speed * deltaTime;

    force.x = direction.x * mult;
    force.y = direction.y * mult;

    _actor.sendMessage(DC_MESSAGE_ID.kAgentMove, force);

    // Fire mecanism

    if(config.hasWeapon)
    {
      let time = this._m_time + deltaTime;

      if(time >= config.secondsPerBullet)
      {
        time = 0.0;

        let sprite = _actor.getWrappedInstance();

        this._m_bulletManager.spawn
        (
          sprite.x, 
          sprite.y + 100, 
          DC_BULLET_TYPE.kEnemyBasic,
          this._m_bullet_direction
        );
      }

      this._m_time = time;
    }        
    return;
  }  

  receive(_id: number, _obj: any)
  : void 
  {
    switch(_id)
    {
      case DC_MESSAGE_ID.kKill :
      
      this._onKill(_obj as Ty_physicsActor);
      return;

      case DC_MESSAGE_ID.kDesactive :

      this._onDesactived(_obj as Ty_physicsActor);
      return;

      case DC_MESSAGE_ID.kCollisionWithHero:

      this._onKill(this._actor);
      return;
    }
    return;
  }

  /**
   * Get the damage points received from this enemy if a collision occur.
   * 
   * @returns collision damage points.
   */
  getCollisionDamage()
  : number 
  {
    return this._m_config.collision_damage;
  }

  /**
   * Defines the properties of the errante controller with a configuration
   * object.
   * 
   * @param _config configuarion object.
   */
  setConfiguration(_config : CnfErrante)
  : void
  {
    this._m_config = _config;

    this._m_time = _config.init_time;
    return;
  }

  setSpawner(_spawner : IEnemySpawner)
  : void
  {
    this._m_spawner = _spawner;
    return;
  }

  getSpawner()
  : IEnemySpawner
  {
    return this._m_spawner;
  }

  setEnemiesManager(_enemyManager: IEnemiesManager)
  : void 
  {
    this._m_enemiesManager = _enemyManager;
    return;
  }

  getEnemiesManager()
  : IEnemiesManager 
  {
    return this._m_enemiesManager;
  }

  setBulletManager(_bulletManager : IBulletManager)
  : void
  {
    this._m_bulletManager = _bulletManager;
  }

  getBulletManager()
  : IBulletManager
  {
    return this._m_bulletManager;
  }  

  /**
   * Points gived when the enemy is destroyed.
   */
  getScorePoints()
  : number 
  {
    return this._m_config.score;
  }

  /**
   * Points gived when the enemy is destroyed.
   * 
   * @param _points score points 
   */
  setScorePoints(_points: number)
  : void 
  {
    this._m_config.score = _points;
    return;
  }

  /**
   * Safely destroyed this component.
   */
  destroy()
  : void 
  { 
    this._m_spawner = null;
    this._m_enemiesManager = null;
    this._m_config = null;

    return;
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Private constructor.
   */
  private constructor()
  { }  
  

  /**
   * Disasemble and disable the actor. Send score to game manager.
   * 
   * @param _actor actor. 
   */
  private _onKill(_actor : Ty_physicsActor)
  : void
  {    
    this._m_spawner.disasemble(_actor);

    this._m_enemiesManager.disableActor(_actor);

    GameManager.ReceiveMessage
    (
      DC_MESSAGE_ID.kAddScorePoints,
      this._m_config.score 
    );
    return;
  }

  /**
   * Called once, whe the actor is desactived.
   * 
   * @param _actor actor.
   */
  private _onDesactived(_actor : Ty_physicsActor)
  : void
  {
    this._m_spawner.disasemble(_actor);
    this._m_enemiesManager.disableActor(_actor);

    return;
  }

  /**
   * Errante actor.
   */
  private _actor : Ty_physicsActor;

  /**
   * Direction vector.
   */
  private _m_direction : V3;

  /**
   * Direction of the bullet.
   */
  private _m_bullet_direction : V2;

  /**
   * Force vector.
   */
  private _m_force : V3; 

  /**
   * time elapsed since the last time that the actors fire.
   */
  private _m_time : number;

  /**
   * Configuration object.
   */
  private _m_config : CnfErrante;

  /**
   * Reference ot the Errante Spawner.
   */
  private _m_spawner : IEnemySpawner;

  /**
   * Reference to the enemies manager.
   */
  private _m_enemiesManager : IEnemiesManager;

  /**
   * Reference to the bullet manager.
   */
  private _m_bulletManager : IBulletManager;

  /**
   * Game Manager.
   */
  private _m_gameManager : GameManager;
}