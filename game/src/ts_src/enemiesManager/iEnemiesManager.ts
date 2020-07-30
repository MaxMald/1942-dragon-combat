/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file iEnemiesManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-30-2020
 */

import { BaseActor } from "../actors/baseActor";

type EnemyActor = BaseActor<Phaser.Physics.Arcade.Sprite>;

export interface IEnemiesManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  getActor() : EnemyActor;

  destroy() : void;
}