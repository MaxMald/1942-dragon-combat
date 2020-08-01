/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary An EnemySpawner without implementations. 
 *
 * @file nullEnemySpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-31-2020
 */

import { DC_ENEMY_TYPE } from "../../commons/1942enums";
import { Ty_physicsActor } from "../../commons/1942types";
import { IEnemiesManager } from "../iEnemiesManager";
import { NullEnemiesManager } from "../nullEnemiesManager";
import { IEnemySpawner } from "./iEnemySpawner";

/**
 * An EnemySpawner without implementations.
 */
export class NullEnemySpawner implements IEnemySpawner
{
  
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  static Prepare()
  : void
  {
    if(NullEnemySpawner._INSTANCE == null)
    {
      NullEnemySpawner._INSTANCE = new NullEnemySpawner();
    }
    return;
  }

  static Shutdown()
  : void
  {
    NullEnemySpawner._INSTANCE = null;
    return;
  }

  static GetInstance()
  : NullEnemySpawner
  {
    return NullEnemySpawner._INSTANCE;
  }
  
  /**
   * No implementation.
   * 
   * @param _dt 
   */
  update(_dt: number)
  : void 
  {
    return;
  }

  /**
   * No implementation.
   * 
   * @param _actor : actor where the components are going to be assembled.
   * @param _x 
   * @param _y 
   */
  spawn(_actor : Ty_physicsActor, _x: number, _y: number)
  : void 
  {
    return;
  }

  /**
   * No implemenatation.
   * 
   * @param _enemiesManager 
   */
  setEnemiesManager(_enemiesManager: IEnemiesManager)
  : void 
  { }
  
  /**
   * Allways retunrs a NullEnemiesManager.
   * 
   * @returns NullEnemiesManager.
   */
  getEnemiesManager()
  : IEnemiesManager 
  {
    return NullEnemiesManager.GetInstance();
  } 

  /**
   * Get identifier of the EnemySpawner.
   */
  getID()
  : DC_ENEMY_TYPE
  {
    return DC_ENEMY_TYPE.kUndefined;
  }

  /**
   * Assemble the components into the Actor.
   * 
   * @param _actor Actor. 
   */
  assemble(_actor : Ty_physicsActor)
  : void
  { }

  /**
   * Disassemble the component of the given actor.
   * 
   * @param _actor Actor.
   */
  disasemble(_actor : Ty_physicsActor)
  : void
  { }

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
  static _INSTANCE : NullEnemySpawner;
}