/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary EnemyData without implementations. Avaliable by its GetInstance()
 * static method.
 *
 * @file cmpNullEnemyController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-05-2020
 */

import { DC_COMPONENT_ID } from "../commons/1942enums";
import { Ty_physicsActor } from "../commons/1942types";
import { IEnemySpawner } from "../enemiesManager/enemySpawner/iEnemySpawner";
import { NullEnemySpawner } from "../enemiesManager/enemySpawner/nullEnemySpawner";
import { IEnemiesManager } from "../enemiesManager/iEnemiesManager";
import { NullEnemiesManager } from "../enemiesManager/nullEnemiesManager";
import { ICmpEnemyController } from "./iCmpEnemyController";

/**
 * EnemyData without implementations. Avaliable by its GetInstance()
 * static method.
 */
export class CmpNullEnemyController 
implements ICmpEnemyController
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Start the module.
   */
  static Prepare()
  : void
  {
    if(CmpNullEnemyController._INSTANCE == null)
    {
      CmpNullEnemyController._INSTANCE = new CmpNullEnemyController();
      CmpNullEnemyController._INSTANCE.m_id 
        = DC_COMPONENT_ID.kEnemyController;
    }
    return;
  }

  /**
   * Shutdown the module.
   */
  static Shutdown()
  : void
  {
    CmpNullEnemyController._INSTANCE = null;
    return;
  }

  /**
   * Get the singleton.
   */
  static GetInstance()
  : CmpNullEnemyController
  {
    return CmpNullEnemyController._INSTANCE;
  }

  /**
   * No implementation.
   */
  init(_actor: Ty_physicsActor)
  : void 
  { }

  /**
   * No implementation.
   */
  update(_actor: Ty_physicsActor)
  : void 
  { }

  /**
   * Allways returns 0.
   * 
   * @returns 0.
   */
  getCollisionDamage()
  : number 
  {
    return 0;
  }

  /**
   * No implementation.
   * 
   * @param _spawner 
   */
  setSpawner(_spawner: IEnemySpawner)
  : void 
  { }

  /**
   * Allways returns NullEnemySpawner.
   */
  getSpawner()
  : IEnemySpawner 
  {
    return NullEnemySpawner.GetInstance();
  }

  /**
   * No implementation.
   * 
   * @param _enemyManager 
   */
  setEnemiesManager(_enemyManager: IEnemiesManager)
  : void 
  { }

  /**
   * Allways returns the NullEnemiesManager.
   * 
   * @returns NullEnemiesManager.
   */
  getEnemiesManager()
  : IEnemiesManager 
  {
    return NullEnemiesManager.GetInstance();
  }

  /**
   * No implementation.
   */
  receive(_id: number, _obj: any)
  : void 
  { }

  /**
   * No implementation.
   */
  destroy()
  : void 
  { }

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
   * The module singleton.
   */
  private static _INSTANCE : CmpNullEnemyController;

}