/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Disasemble and disable an enemy. 
 *
 * @file cmdKillActor.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-06-2020
 */

import { Ty_physicsActor } from "../commons/1942types";
import { IEnemySpawner } from "../enemiesManager/enemySpawner/iEnemySpawner";
import { IEnemiesManager } from "../enemiesManager/iEnemiesManager";
import { ICommand } from "./iCommand";

/**
 * Disasemble and disable an enemy.
 */
export class CmdKillEnemy
implements ICommand
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  exec()
  : void
  {
    // Disassemble actor.

    this.m_spawner.disasemble(this.m_actor);

    // Disable actor.

    this.m_enemiesManager.disableActor(this.m_actor);

    return;
  }

  /**
   * Enemy actor.
   */
  m_actor : Ty_physicsActor;

  /**
   * Enemies spawner.
   */
  m_spawner : IEnemySpawner;

  /**
   * Enemies Manager
   */
  m_enemiesManager : IEnemiesManager;
}