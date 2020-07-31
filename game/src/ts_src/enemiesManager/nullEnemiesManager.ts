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

/**
 * This class has no implementations, it is used by the GameManager when no 
 * implementation of the IEnemiesManager was given.
 */
export class NullEnemiesManager implements IEnemiesManager
{ 
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
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
  spawn(_x: number, _y: number, _type: number)
  : void 
  {
    console.log("NullEnemiesManager : spawn. ");
    return;
  }

  /**
   * No implementation.
   */
  destroy()
  : void
  { 
    return;
  }
}