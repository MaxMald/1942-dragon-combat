/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary This class has no implementations, it is used by the GameManager 
 * when no implementation of the IEnemiesManager was given.
 *
 * @file nullEnemiesManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-30-2020
 */

import { IEnemiesManager } from "./iEnemiesManager";
import { Ty_physicsActor } from "../commons/1942types";
import { DC_ENEMY_TYPE } from "../commons/1942enums";
import { IEnemySpawner } from "./enemySpawner/iEnemySpawner";
import { NullEnemySpawner } from "./enemySpawner/nullEnemySpawner";
import { IBulletManager } from "../bulletManager/iBulletManager";
import { NullBulletManager } from "../bulletManager/nullBulletManager";

/**
 * This class has no implementations, it is used by the GameManager when no 
 * implementation of the IEnemiesManager was given.
 */
export class NullEnemiesManager implements IEnemiesManager
{  
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  static Prepare()
  : void
  {
    if(NullEnemiesManager._INSTANCE == null)
    {
      NullEnemiesManager._INSTANCE = new NullEnemiesManager();
    }
    return;
  }

  static Shutdown()
  : void
  {
    NullEnemiesManager._INSTANCE = null;
    return;
  }

  static GetInstance()
  : NullEnemiesManager
  {
    return NullEnemiesManager._INSTANCE;
  }
  
  /**
   * No implementation.
   * 
   * @param _spawner 
   */
  addSpawner(_spawner: IEnemySpawner)
  : void 
  { 
    console.log("NullEnemiesManager : addSpawner. ");
    return;
  }

  /**
   * No implementation.
   * 
   * @param _id 
   */
  getSpawner(_id: DC_ENEMY_TYPE)
  : IEnemySpawner 
  {
    console.log("NullEnemiesManager : getSpawner. ");

   return NullEnemySpawner.GetInstance(); 
  } 

  /**
   * Allways returns null.
   * 
   * @returns null.
   */
  getActor()
  : Ty_physicsActor
  {
    console.log("NullEnemiesManager : getActor. ");
    return null;  
  }

  /**
   * No implementation.
   * 
   * @param _actor Actor. 
   */
  disableActor(_actor : Ty_physicsActor) 
  : void
  { }

  /**
   * No implementation
   * 
   * @param _dt 
   */
  update(_dt: number)
  : void 
  {
    console.log("NullEnemiesManager : update. ");
    return;
  }

  /**
   * No implementation.
   * 
   * @param _x 
   * @param _y 
   * @param _type 
   */
  spawn(_x: number, _y: number, _type: DC_ENEMY_TYPE)
  : void 
  {
    console.log("NullEnemiesManager : spawn. ");
    return;
  }

  /**
   * No implemetation.
   * 
   * @param _bulletManager 
   */
  setBulletManager(_bulletManager: IBulletManager)
  : void 
  { }

  /**
   * Allways returns NullBulletManager.
   * 
   * @returns NullBulletManager.
   */
  getBulletManager()
  : IBulletManager 
  {
    return NullBulletManager.GetInstance();
  }

  /**
   * No implementation.
   */
  destroy()
  : void
  { 
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
   * Singleton.
   */
  private static _INSTANCE : NullEnemiesManager;
}