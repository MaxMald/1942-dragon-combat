/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Bullet spawner without implemenations.
 *
 * @file nullBulletSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-04-2020
 */

import { DC_BULLET_TYPE } from "../../commons/1942enums";
import { Ty_physicsActor } from "../../commons/1942types";
import { IBulletManager } from "../iBulletManager";
import { IBulletSpawner } from "./iBulletSpawner";

/**
 * Bullet spawner without implemenations.
 */
export class NullBulletSpawner implements IBulletSpawner
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Prepare()
  : void
  {
    if(NullBulletSpawner._INSTANCE == null)
    {
      NullBulletSpawner._INSTANCE = new NullBulletSpawner();
    }
    return;
  }

  static Shutdown()
  : void
  {
    NullBulletSpawner._INSTANCE = null;
    return;
  }

  static GetInstance()
  : NullBulletSpawner
  {
    return NullBulletSpawner._INSTANCE;
  }

  /**
   * No implementation.
   * 
   * @param _dt 
   */
  update(_dt: number)
  : void 
  { 
    console.log("NullBulletSpawner: update.");
    return;
  }

  /**
   * No implementation.
   * 
   * @param _actor 
   * @param _x 
   * @param _y 
   * @param _data
   */
  spawn(_actor: Ty_physicsActor, _x: number, _y: number, _data ?: any)
  : void 
  { 
    console.log("NullBulletSpawner: spawn.");
    return;
  }

  /**
   * No implementation.
   * 
   * @param _actor 
   */
  assemble(_actor: Ty_physicsActor)
  : void 
  { 
    console.log("NullBulletSpawner: assemble.");
    return;
  }

  /**
   * No implementation.
   * 
   * @param _actor 
   */
  disassemble(_actor: Ty_physicsActor)
  : void 
  { 
    console.log("NullBulletSpawner: disassemble.");
    return;
  }

  /**
   * No implementation.
   * 
   * @param _manager bullet manager 
   */
  setBulletManager(_manager : IBulletManager)
  : void
  { 
    console.log("NullBulletSpawner: setBulletManager.");
    return;
  }

  /**
   * No implementation.
   */
  getID()
  : DC_BULLET_TYPE 
  {
    console.log("NullBulletSpawner: getID.");
    return DC_BULLET_TYPE.kUndefined;
  }

  /**
   * No implementation.
   */
  destroy()
  : void 
  { }
  
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
  private static _INSTANCE : NullBulletSpawner;
}