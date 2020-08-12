/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary A bullet spawner spawns an especific type of bullet in the world.
 * The bullet spawner is responsable for assemble and disassemble the components
 * that defines the behaviour of the bullet.  
 *
 * @file iBulletSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-04-2020
 */

import { DC_BULLET_TYPE } from "../../commons/1942enums";
import { Ty_physicsActor } from "../../commons/1942types";
import { IBulletManager } from "../iBulletManager";

/**
 * A bullet spawner spawns an especific type of bullet in the world. The bullet
 * spawner is responsable for assemble and disassemble the components that
 * defines the behaviour of the bullet. 
 */
export interface IBulletSpawner 
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Update the bullet spawner.
   * 
   * @param _dt delta time. 
   */
  update(_dt : number)
  : void;

  /**
   * Spawns a bullet in the world.
   * 
   * @param _actor actor. 
   * @param _x position in x axis.
   * @param _y position in y axis.
   * @param _data data.
   */
  spawn(_actor : Ty_physicsActor, _x : number, _y : number, _data ?: any)
  : void;

  /**
   * assemble the bullet components.
   * 
   * @param _actor 
   */
  assemble(_actor : Ty_physicsActor)
  : void;

  /**
   * disassemble the bullet components.
   * 
   * @param _actor 
   */
  disassemble(_actor : Ty_physicsActor)
  : void;

  /**
   * Set the bullet manager.
   * 
   * @param _manager bullet manager 
   */
  setBulletManager(_manager : IBulletManager)
  : void;

  /**
   * Get this bullet spawner identifier.
   */
  getID()
  : DC_BULLET_TYPE;

  /**
   * Safely destroys the bullet spawner.
   */
  destroy()
  : void;
}