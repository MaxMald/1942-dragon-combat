/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file nullEnemiesManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-30-2020
 */

import { IEnemiesManager } from "./iEnemiesManager";
import { BaseActor } from "../actors/baseActor";

/**
 * This class is used when the GameManager had not receive any EnemiesManager.
 */
export class NullEnemiesManager implements IEnemiesManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  getActor()
  : BaseActor<Phaser.Physics.Arcade.Sprite> 
  {
    console.log("NullEnemiesManager : getActor. ");
    return null;  
  }

  destroy()
  : void
  { }
}