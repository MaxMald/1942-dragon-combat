/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpArponShipController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-27-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite, Ty_Sprite, V3 } from "../commons/1942types";
import { CnfArponShip } from "../configObjects/cnfArponShip";
import { IEnemySpawner } from "../enemiesManager/enemySpawner/iEnemySpawner";
import { IEnemiesManager } from "../enemiesManager/iEnemiesManager";
import { GameManager } from "../gameManager/gameManager";
import { CmpArponWeaponController } from "./cmpArponWeaponController";
import { ICmpEnemyController } from "./iCmpEnemyController";

export class CmpArponShipController
implements ICmpEnemyController
{  
  /****************************************************/
  /* Public                                           */
  /****************************************************/  

  static Create()
  : CmpArponShipController
  {
    let cmp = new CmpArponShipController();

    cmp.m_id = DC_COMPONENT_ID.kEnemyController;
    cmp._m_gameManager = GameManager.GetInstance();
    cmp._m_force = new Phaser.Math.Vector3();

    return cmp;
  }

  init(_actor: Ty_physicsActor)
  : void 
  {
    this._m_actor = _actor;
    return;
  }

  setWeapon(_actor : BaseActor<Ty_Sprite>)
  : void
  {
    this._weaponActor = _actor;
    return;
  }

  update(_actor: Ty_physicsActor)
  : void 
  {    
    let force = this._m_force;

    force.set(0.0, this._m_config.speed * this._m_gameManager.m_dt );
    
    _actor.sendMessage
    (
      DC_MESSAGE_ID.kAgentMove,
      force
    );
    
    let weaponActor = this._weaponActor;

    weaponActor.sendMessage
    (
      DC_MESSAGE_ID.kAgentMove,
      force
    );

    weaponActor.update();

    return;
  }

  receive(_id: number, _obj: any)
  : void 
  {
    switch(_id)
    {
      case DC_MESSAGE_ID.kActive:

      this.activeActor();
      break;

      case DC_MESSAGE_ID.kDesactive:

      this.desactiveActor();
      break;

      case DC_MESSAGE_ID.kKill:

      this._onHit();
      this._explode();
      this.desactiveActor();
      break;

      case DC_MESSAGE_ID.kCollisionWithHero:

      this._onCollisionWithHero(_obj as Ty_physicsActor);
      this._explode();
      this.desactiveActor();
      break;
    }
    return;
  }

  setConfig(_config : CnfArponShip)
  : void
  {
    this._m_config = _config;

    let weaponController 
      = this._weaponActor.getComponent<CmpArponWeaponController>
      (
        DC_COMPONENT_ID.kArponWeaponController
      );
        
    weaponController.setConfig(_config);
    return;
  }

  getCollisionDamage()
  : number 
  {
    return this._m_config.collision_damage;
  }

  setSpawner(_spawner: IEnemySpawner)
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

  getScorePoints()
  : number 
  {
    return this._m_config.score;
  }

  setScorePoints(_points: number)
  : void 
  {
    this._m_config.score = _points;
  }

  setEnemiesManager(_enemyManager: IEnemiesManager)
  : void 
  {
    this._m_enemiesManager = _enemyManager;
  }

  getEnemiesManager()
  : IEnemiesManager 
  {
    return this._m_enemiesManager;
  }

  getActor()
  : Ty_physicsActor
  {
    return this._m_actor;
  }

  activeActor()
  : void
  {
    let sprite = this._m_actor.getWrappedInstance();
    let weapon = this._weaponActor;

    weapon.sendMessage
    (
      DC_MESSAGE_ID.kToPosition,
      new Phaser.Math.Vector3(sprite.x, sprite.y)
    );

    weapon.sendMessage
    (
      DC_MESSAGE_ID.kActive,
      weapon
    );
    return;
  }

  desactiveActor()
  : void
  {
    let self = this._m_actor;

    this._weaponActor.sendMessage
    (
      DC_MESSAGE_ID.kDesactive,
      this._weaponActor
    );

    this._m_spawner.disasemble(self);

    this._m_enemiesManager.disableActor(self);
    return;
  }

  destroy()
  : void 
  {
    this._m_spawner = null;
    this._m_enemiesManager = null;
    return;
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _onHit()
  : void
  {
    GameManager.ReceiveMessage
    (
      DC_MESSAGE_ID.kAddScorePoints,
      this._m_config.score
    );
    return;
  }

  private _onCollisionWithHero(_hero : Ty_physicsActor)
  : void
  {
    _hero.sendMessage
    (
      DC_MESSAGE_ID.kHit,
      this._m_config.collision_damage
    );
    return;
  }

  private _explode()
  : void
  {
    // TODO
    return;
  }
  
  
  private _m_config : CnfArponShip;

  private _m_spawner : IEnemySpawner;

  private _m_enemiesManager : IEnemiesManager;

  private _m_actor : Ty_physicsActor;

  private _m_force : V3;

  private _m_gameManager : GameManager;

  private _weaponActor : BaseActor<Ty_Sprite>;
}