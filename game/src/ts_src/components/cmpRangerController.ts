/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpRangerController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-25-2020
 */

import { DC_COMPONENT_ID } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite, V2 } from "../commons/1942types";
import { CnfRangerConfig } from "../configObjects/cnfRangerConfig";
import { IEnemySpawner } from "../enemiesManager/enemySpawner/iEnemySpawner";
import { IEnemiesManager } from "../enemiesManager/iEnemiesManager";
import { GameManager } from "../gameManager/gameManager";
import { DCForceController } from "../physics/dcForceController";
import { IBaseState } from "../states/IBaseState";
import { IRangerState } from "../states/rangerController/iRangerState";
import { SttRangerAim } from "../states/rangerController/sttRangerAim";
import { SttRangerBackEntrance } from "../states/rangerController/sttRangerBackEntrance";
import { SttRangerEntrance } from "../states/rangerController/sttRangerEntrance";
import { SttRangerExplosion } from "../states/rangerController/sttRangerExplosion";
import { SttRangerIdle } from "../states/rangerController/sttRangerIdle";
import { SttRangerPursuit } from "../states/rangerController/sttRangerPursuit";
import { ICmpEnemyController } from "./iCmpEnemyController";

/**
 * 
 */
export class CmpRangerController
implements ICmpEnemyController
{  
  /****************************************************/
  /* Public                                           */
  /****************************************************/  

  static Create()
  : CmpRangerController
  {
    let cmp = new CmpRangerController();

    cmp.m_id = DC_COMPONENT_ID.kEnemyController;
    
    cmp._m_hStates = new Map<string, IRangerState>();

    cmp.addState(new SttRangerExplosion());
    cmp.addState(new SttRangerPursuit());
    cmp.addState(new SttRangerAim());
    cmp.addState(new SttRangerEntrance());
    cmp.addState(new SttRangerBackEntrance());

    let idleState = new SttRangerIdle();

    cmp.addState(idleState);

    cmp.m_forceController = new DCForceController();

    cmp._m_active_state = idleState;

    return cmp;
  }

  init(_actor: Ty_physicsActor)
  : void 
  {
    this.m_forceController.init(_actor);

    this._m_actor = _actor;

    this._m_hStates.forEach
    (
      function(_state : IRangerState)
      : void
      {
        _state.init(this, _actor);
        return;
      },
      this
    );

    this._m_gameManager = GameManager.GetInstance();
    return;
  }

  update(_actor: Ty_physicsActor)
  : void 
  {    
    this._m_active_state.update();

    this.m_forceController.update(this._m_gameManager.m_dt);

    ///////////////////////////////////
    // Rotation

    let sprite : Ty_physicsSprite = this._m_actor.getWrappedInstance();

    let direction : V2 = this.m_forceController.getDirection();

    sprite.setAngle(Phaser.Math.RadToDeg(direction.angle()));
    
    return;

  }

  receive(_id: number, _obj: any)
  : void 
  {
    this._m_active_state.receive(_id, _obj);
    return;
  }

  setActiveState(_state_name: string)
  : void 
  {
    if(this._m_hStates.has(_state_name))
    {
      let activeState = this._m_active_state;

      activeState.onExit();
      activeState = this._m_hStates.get(_state_name);
      activeState.onEnter();

      this._m_active_state = activeState;
    }
    return;
  }

  addState(_state: IRangerState)
  : void 
  {
    this._m_hStates.set(_state.m_id, _state);
    return;
  }

  getState(_state_name: string)
  : IBaseState 
  {
    return this._m_hStates.get(_state_name);
  }

  setConfig(_config : CnfRangerConfig)
  : void
  {
    this._m_config = _config;
    this._m_hStates.forEach
    (
      function(_state : IRangerState)
      : void
      {
        _state.setConfig(_config);
        return;
      },
      this
    );

    ///////////////////////////////////
    // Set Physics data

    this.m_forceController.setMaxSpeed(_config.speed);
    this.m_forceController.setMass(_config.mass);

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

  desactiveActor()
  : void
  {
    let self = this._m_actor;

    this._m_spawner.disasemble(self);

    this._m_enemiesManager.disableActor(self);
    return;
  }

  destroy()
  : void 
  {
    this._m_spawner = null;
    this._m_enemiesManager = null;
    this._m_config = null;
    this._m_actor = null;
    
    this.m_forceController.destroy();
    this.m_forceController = null;
    return;
  }

  m_id: number;

  m_forceController : DCForceController;

  /****************************************************/
  /* Protected                                        */
  /****************************************************/ 

  protected _m_active_state: IBaseState;
  
  protected _m_hStates: Map<string, IRangerState>;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_config : CnfRangerConfig;

  private _m_spawner : IEnemySpawner;

  private _m_enemiesManager : IEnemiesManager;

  private _m_actor : Ty_physicsActor;

  private _m_gameManager : GameManager;
}