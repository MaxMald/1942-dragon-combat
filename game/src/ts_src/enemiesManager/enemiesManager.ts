/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary The EnemiesManager create, manage and provides Actors for enemy
 * usage. This class have a pool of actors with a fixed size, that can be
 * defined with the configuration object.
 * 
 * It also has the list of physics bodies of each BaseActor, useful to handle
 * collisions between the actors and other objects.
 *
 * @file enemiesManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-30-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { MxPoolArgs } from "optimization/mxPoolArgs";
import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsGroup, Ty_physicsSprite } from "../commons/1942types";
import { ICmpCollisionController } from "../components/iCmpCollisionController";
import { EnemiesManagerConfig } from "./enemiesManagerConfig";
import { IEnemiesManager } from "./iEnemiesManager";

/**
 * The EnemiesManager create, manage and provides Actors for enemy usage. This
 * class have a pool of actors with a fixed size, that can be defined with 
 * the configuration object.
 * 
 * It also has the list of physics bodies of each BaseActor, useful to handle
 * collisions between the actors and other objects.
 */
export class EnemiesManager implements IEnemiesManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Creates an empty EnemiesManager.
   */
  static Create()
  : EnemiesManager
  {
    let manager : EnemiesManager = new EnemiesManager();

    // Create the pool object.

    let pool : MxObjectPool<Ty_physicsActor> = MxObjectPool.Create<Ty_physicsActor>();
    manager._m_actorPool = pool;

    // Pool suscriptions.

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
   * Initialize the EnemiesManager. This method needs a configuration object to
   * initialize this manager.
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
    let actor : Ty_physicsActor;
    let sprite : Phaser.Physics.Arcade.Sprite;

    let a_actors : Ty_physicsActor[] = new Array<Ty_physicsActor>();

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
   * Updates each EnemySpawner in this this EnemiesManager.
   * 
   * @param _dt delta time. 
   */
  update(_dt: number)
  : void 
  {
    // TODO.

    return;
  }

  /**
   * Spawn an enemy in the world.
   * 
   * @param _x position in x axis.
   * @param _y position in y axis.
   * @param _type enemy type.
   */
  spawn(_x: number, _y: number, _type: number)
  : void 
  {
    // TODO.

    return;
  }

  /**
   * Get an availabe Actor, if there isn't, it will returns null.
   * 
   * @retunrs An available Actor. null if there isn't any available Actor. 
   */
  getActor()
  : Ty_physicsActor
  {
    return this._m_actorPool.get();
  }

  /**
   * Get the group of physics bodies.
   */
  getBodiesGroup()
  : Ty_physicsGroup
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
    _bodies : Ty_physicsGroup
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
    _other : Ty_physicsSprite,
    _sprite : Ty_physicsSprite
  )
  : void
  {
    let baseActor : Ty_physicsActor = _sprite.getData("actor");

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
    _pool : MxObjectPool<Ty_physicsActor>,
    _args : MxPoolArgs<Ty_physicsActor>
  )
  : void
  {

    let actor : Ty_physicsActor = _args.element;
    let sprite : Ty_physicsSprite = actor.getWrappedInstance();

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
    _pool : MxObjectPool<Ty_physicsActor>,
    _args : MxPoolArgs<Ty_physicsActor>
  )
  : void
  {

    let actor : Ty_physicsActor = _args.element;
    let sprite : Ty_physicsSprite = actor.getWrappedInstance();

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
  private _m_actorPool : MxObjectPool<Ty_physicsActor>;

  /**
   * Group of physics bodies.
   */
  private _m_bodiesGroup : Phaser.Physics.Arcade.Group;
}