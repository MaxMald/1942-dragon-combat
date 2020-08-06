/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary This class has no implementations, it is used by the GameManager
 * when no implementation of the IBulletManager was given.
 *
 * @file nullBulletManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-29-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { DC_BULLET_TYPE } from "../commons/1942enums";
import { Ty_physicsActor } from "../commons/1942types";
import { IBulletSpawner } from "./bulletSpawner/iBulletSpawner";
import { NullBulletSpawner } from "./bulletSpawner/nullBulletSpawner";
import { IBulletManager } from "./iBulletManager";

/**
 * This class has no implementations, it is used by the GameManager when no 
 * implementation of the IBulletManager was given.
 */
export class NullBulletManager implements IBulletManager
{ 
  /****************************************************/
  /* Public                                           */
  /****************************************************/ 

  static Prepare()
  : void
  {
    if(NullBulletManager._SINGLETON == null)
    {
      NullBulletManager._SINGLETON = new NullBulletManager();
    }    
    return;
  }

  static Shutdown()
  : void
  {
    if(NullBulletManager._SINGLETON != null)
    {
      NullBulletManager._SINGLETON.destroy();
    }
    NullBulletManager._SINGLETON = null;
    return;
  }

  static GetInstance()
  : NullBulletManager
  {
    return NullBulletManager._SINGLETON;
  }

  /**
   * No implementation.
   * 
   * @param _spawner 
   */
  addSpawner(_spawner: IBulletSpawner)
  : void 
  { 
    console.log("NullBulletManager : addSpawner.");
    return;
  }

  /**
   * Allways returns the NullBulletSpawner singleton.
   * 
   * @param _type 
   */
  getSpawner(_type: DC_BULLET_TYPE)
  : IBulletSpawner 
  {
    console.log("NullBulletManager : getSpawner.");
    return NullBulletSpawner.GetInstance();
  }

  /**
   * Allways returns null.
   * 
   * @returns returns null.
   */
  getActor()
  : Ty_physicsActor 
  {
    console.log("NullBulletManager : getActor");
    return null;
  }

  /**
   * No implementation.
   * 
   * @param _dt 
   */
  update(_dt : number) 
  : void
  { }

  /**
   * No implementation.
   */
  spawn(_x : number, _y : number, _type : DC_BULLET_TYPE) : void 
  {
    console.log("NullBulletManager : spawn.");
    return;
  };

  /**
   * Returns an empty pool.
   * 
   * @returns empty pool.
   */
  getPool() : MxObjectPool<Ty_physicsActor> 
  {
    console.log("NullBulletManager : get pool.");
    return this._m_pool; 
  }

  /**
   * Disable the given actor.
   * 
   * @param _actor actor. 
   */
  disableActor(_actor: Ty_physicsActor)
  : void 
  {
    console.log("NullBulletManager : disableActor");
    return;
  }

  /**
   * No implementation.
   */
  clear() : void 
  {
    console.log("NullBulletManager : clear.");
    return;
  }

  /**
   * Destroys its empty pool.
   */
  destroy() : void 
  { 
    this._m_pool.destroy();
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Creates a BulletManager with no implementations. It will have an empty
   * pool.
   */
  private constructor()
  { 
    this._m_pool = MxObjectPool.Create();
    this._m_pool.init(new Array<Ty_physicsActor>());
    return;
  }  

  /**
   * Empty pool.
   */
  private _m_pool : MxObjectPool<Ty_physicsActor>;

  /**
   * Singleton.
   */
  private static _SINGLETON : NullBulletManager;
}