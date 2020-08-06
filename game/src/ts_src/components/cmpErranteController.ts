/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpErranteController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-31-2020
 */

import { CmdKillEnemy } from "../commands/cmdKillEnemy";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor, V3 } from "../commons/1942types";
import { IEnemySpawner } from "../enemiesManager/enemySpawner/iEnemySpawner";
import { NullEnemySpawner } from "../enemiesManager/enemySpawner/nullEnemySpawner";
import { IEnemiesManager } from "../enemiesManager/iEnemiesManager";
import { NullEnemiesManager } from "../enemiesManager/nullEnemiesManager";
import { ICmpEnemyController } from "./iCmpEnemyController";

export class CmpErranteController implements ICmpEnemyController
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
    controller._m_speed = 400.0;
    controller._m_enemiesManager = NullEnemiesManager.GetInstance();
    controller._m_spawner = NullEnemySpawner.GetInstance();

    controller.setDeltaTime(0.0);

    return controller;
  }

  init(_actor: Ty_physicsActor)
  : void 
  {
    return;
  }

  update(_actor: Ty_physicsActor)
  : void 
  {
    _actor.sendMessage(DC_MESSAGE_ID.kAgentMove, this._m_force);
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
    }
    return;
  }

  getCollisionDamage()
  : number 
  {
    return this._m_collisionDamage;
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

  setDeltaTime(_dt : number)
  : void
  {
    this._m_dt = _dt;

    let force = this._m_force;
    let direction = this._m_direction;
    let mult = this._m_speed * _dt;

    force.x = direction.x * mult;
    force.y = direction.y * mult;
    return;
  }

  destroy()
  : void 
  { 
    this._m_spawner = null;
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
   * Called once, when the actor is killed.
   * 
   * @param _actor actor. 
   */
  private _onKill(_actor : Ty_physicsActor)
  : void
  {    
    this._m_spawner.disasemble(_actor);

    this._m_enemiesManager.disableActor(_actor);

    return;
  }

  /**
   * Direction vector.
   */
  private _m_direction : V3;

  /**
   * Force vector.
   */
  private _m_force : V3;

  /**
   * Dragon speed.
   */
  private _m_speed : number;

  /**
   * Delta time.
   */
  private _m_dt : number;

  /**
   * Reference ot the Errante Spawner.
   */
  private _m_spawner : IEnemySpawner;

  /**
   * Damage inflected by this actor when collide with other.
   */
  private _m_collisionDamage : number;

  /**
   * Reference to the enemies manager.
   */
  private _m_enemiesManager : IEnemiesManager;
}