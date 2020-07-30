/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary The EnemiesManager create, manage and provides Actors for enemy usage. This
 * class have a pool of actors with a fixed size, that can be defined with 
 * the configuration object.
 * 
 * It also has the list of physics bodies of each BaseActor, useful to handle
 * collisions with the enemies.
 *
 * @file enemiesManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-30-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { MxPoolArgs } from "optimization/mxPoolArgs";
import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID } from "../components/dcComponentID";
import { ICmpCollisionController } from "../components/iCmpCollisionController";
import { EnemiesManagerConfig } from "./enemiesManagerConfig";
import { IEnemiesManager } from "./iEnemiesManager";

type EnemyActor = BaseActor<Phaser.Physics.Arcade.Sprite>;

/**
 * The EnemiesManager create, manage and provides Actors for enemy usage. This
 * class have a pool of actors with a fixed size, that can be defined with 
 * the configuration object.
 * 
 * It also has the list of physics bodies of each BaseActor, useful to handle
 * collisions with the enemies.
 */
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

      sprite.setData('actor', actor);

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
   * Get the group of physics bodies.
   */
  getBodiesGroup()
  : Phaser.Physics.Arcade.Group
  {
    return this._m_bodiesGroup;
  }

  /**
   * Add a collision detection against a group.
   * 
   * @param _scene The scene wich the physic engine.
   * @param _bodies The bodies group.
   */
  collisionVsGroup
  (
    _scene : Phaser.Scene, 
    _bodies : Phaser.Physics.Arcade.Group
  )
  : void
  {
    _scene.physics.add.collider
    (
      _bodies,
      this._m_bodiesGroup,
      this._onCollision, 
      undefined, 
      this
    );
    return;
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
   * Called when an actor has a collision with another body.
   * 
   * @param _other the other body. 
   * @param _bullet the actor's sprite body.
   */
  private _onCollision
  (
    _other : Phaser.Physics.Arcade.Sprite,
    _sprite : Phaser.Physics.Arcade.Sprite
  )
  : void
  {
    let baseActor : BaseActor<Phaser.Physics.Arcade.Sprite> 
      = _sprite.getData("actor");

    let controller 
      = baseActor.getComponent<ICmpCollisionController>
      (
        DC_COMPONENT_ID.kCollisionController
      );

    controller.onCollision(baseActor, _other.getData('actor'));

    console.log("Collision!");
    return;
  }

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
    sprite.body.enable = true;

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
    sprite.body.enable = false;

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