/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file enemiesManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-30-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { MxPoolArgs } from "optimization/mxPoolArgs";
import { BaseActor } from "../actors/baseActor";
import { EnemiesManagerConfig } from "./enemiesManagerConfig";
import { IEnemiesManager } from "./iEnemiesManager";

type EnemyActor = BaseActor<Phaser.Physics.Arcade.Sprite>;

export class EnemiesManager implements IEnemiesManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Creates an empty Enemies Manager.
   */
  static Create()
  : EnemiesManager
  {
    let manager : EnemiesManager = new EnemiesManager();

    let pool : MxObjectPool<EnemyActor> = MxObjectPool.Create<EnemyActor>();
    manager._m_actorPool = pool;

    pool.suscribe
    (
      'elementActive', 
      'EnemiesManager', 
      manager._onActive, 
      manager
    );

    pool.suscribe
    (
      'elementDesactive', 
      'EnemiesManager', 
      manager._onDesactive, 
      manager
    );

    return manager;
  }

  /**
   * Initialize the Enemies manager.
   */
  init(_scene : Phaser.Scene, _config : EnemiesManagerConfig)
  : void
  {
    // Clear the group of physics bodies.

    let bodiesGroup = this._m_bodiesGroup;

    if(bodiesGroup != null)
    {
      bodiesGroup.destroy();
    }

    bodiesGroup = _scene.physics.add.group();
    this._m_bodiesGroup = bodiesGroup;

    // Clear actors pool

    let actorPool = this._m_actorPool;

    actorPool.clear();

    // Create Actors.

    let size = _config.pool_size;
    let actor : EnemyActor;
    let sprite : Phaser.Physics.Arcade.Sprite;

    let a_actors : EnemyActor[] = new Array<EnemyActor>();

    while(size > 0)
    {
      sprite = bodiesGroup.create
      (
        0.0,
        0.0,
        _config.texture_key
      );

      sprite.visible = false;
      sprite.active = false;

      actor = BaseActor.Create(sprite, "Enemy_" + size.toString());
      a_actors.push(actor);

      --size;
    }

    actorPool.init(a_actors);

    return;
  }

  /**
   * Get an Enemy Actor, if there is not an actor avaliable, it will returns
   * null.
   * 
   * @retunrs An avaliable enemy actor. Null if there isn't any avaliable actor. 
   */
  getActor()
  : EnemyActor
  {
    return this._m_actorPool.get();
  }

  /**
   * Safely destroys this object.
   */
  destroy()
  : void
  {
    this._m_bodiesGroup.destroy();
    this._m_actorPool.destroy();
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Called by the pool when an element had been activated.
   * 
   * @param _pool Pool.
   * @param _args Pool arguments.
   */
  private _onActive
  (
    _pool : MxObjectPool<EnemyActor>,
    _args : MxPoolArgs<EnemyActor>
  )
  : void
  {

    let actor : EnemyActor = _args.element;
    let sprite : Phaser.Physics.Arcade.Sprite = actor.getWrappedInstance();

    sprite.visible = true;
    sprite.active = true;

    return;
  }

  /**
   * Called by the pool when an element had been desactivated.
   * 
   * @param _pool Pool.
   * @param _args Pool arguments.
   */
  private _onDesactive
  (
    _pool : MxObjectPool<EnemyActor>,
    _args : MxPoolArgs<EnemyActor>
  )
  : void
  {

    let actor : EnemyActor = _args.element;
    let sprite : Phaser.Physics.Arcade.Sprite = actor.getWrappedInstance();

    sprite.visible = false;
    sprite.active = false;

    return;
  }

  /**
   * Private constructor.
   */
  private constructor()
  { }

  /**
   * Pool of actor for enemies usage.
   */
  private _m_actorPool : MxObjectPool<EnemyActor>;

  /**
   * Group of physics bodies.
   */
  private _m_bodiesGroup : Phaser.Physics.Arcade.Group;
}