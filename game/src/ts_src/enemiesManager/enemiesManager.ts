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
import { DC_COMPONENT_ID, DC_ENEMY_TYPE } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsGroup, Ty_physicsSprite } from "../commons/1942types";
import { CmpMovementEnemy } from "../components/cmpMovementEnemy";
import { ICmpCollisionController } from "../components/iCmpCollisionController";
import { EnemiesManagerConfig } from "./enemiesManagerConfig";
import { IEnemySpawner } from "./enemySpawner/iEnemySpawner";
import { NullEnemySpwaner } from "./enemySpawner/nullEnemySpawner";
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

    // Enemy spawners map.

    manager._m_hSpawner = new Map<DC_ENEMY_TYPE, IEnemySpawner>();

    return manager;
  }

  /**
   * Initialize the EnemiesManager. This method needs a configuration object to
   * initialize this manager.
   */
  init(_scene : Phaser.Scene, _config : EnemiesManagerConfig)
  : void
  {
    // Clear this enemy manager.

    this.clear();

    // Create the physics bodies group.

    let bodiesGroup = this._m_bodiesGroup;

    bodiesGroup = _scene.physics.add.group();
    this._m_bodiesGroup = bodiesGroup;

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

      // Set default sprite state.

      sprite.visible = false;
      sprite.active = false;
      sprite.body.enable = false;
      sprite.body.immovable = true;

      // Create the actor.

      actor = BaseActor.Create(sprite, "Enemy_" + size.toString());

      // Add common components

      actor.addComponent(CmpMovementEnemy.Create());

      // Initialize the actor.

      actor.init();

      // Set data.

      sprite.setData('actor', actor);

      // Add actor to the list.

      a_actors.push(actor);      

      --size;
    }

    this._m_actorPool.init(a_actors);

    return;
  }

  /**
   * Adds an EnemySpawner to this EnemiesManager. If exists an EnemySpawner with
   * the same ID, it will be destroyed and replaced by the new one.
   * 
   * @param _spawner EnemySpawner.
   */
  addSpawner(_spawner : IEnemySpawner)
  : void
  {
    let hSpawner = this._m_hSpawner;
    let id = _spawner.getID();

    if(hSpawner.has(id))
    {
      hSpawner.get(id).destroy();
    }

    hSpawner.set(id, _spawner);

    return;
  }

  /**
   * Get an EnemySpawner of this EnemiesManager.
   * 
   * @param _id EnemySpawner identifier.
   * 
   * @returns The EnemySpawner. If the EnemySpawner was not found, it will
   * returns the NullEnemySpawner object. 
   */
  getSpawner(_id : DC_ENEMY_TYPE)
  : IEnemySpawner
  {
    let hSpawner = this._m_hSpawner;

    if(hSpawner.has(_id))
    {
      return hSpawner.get(_id);
    }

    console.warn("Enemy Spawner not found!");
    return new NullEnemySpwaner();
  }

  /**
   * Updates active actors and enemySpawners.
   * 
   * @param _dt delta time. 
   */
  update(_dt: number)
  : void 
  {
    this._m_dt = _dt;
    
    // Update spawners.
    
    this._m_hSpawner.forEach(this._updateSpawner, this);

    // Update actors.

    this._m_actorPool.forEachActive(this._updateActor, this);

    return;
  }

  /**
   * Spawn an enemy in the world.
   * 
   * @param _x position in x axis.
   * @param _y position in y axis.
   * @param _type enemy type.
   */
  spawn(_x: number, _y: number, _type: DC_ENEMY_TYPE)
  : void 
  {
    
    let hSpawner = this._m_hSpawner;

    if(hSpawner.has(_type))
    {

      let actor = this.getActor();

      if(actor != null)
      {
        hSpawner.get(_type).spawn(actor, _x, _y);
      }      
    }
    else
    {
      console.warn("Enemy spawner didn't found.");
    }

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
   * Clears this EnemyManager. Destroy the list of bodies group. Clear the pool.
   * Destroy and clear the map of spawners.
   */
  clear()
  : void
  {
    // Clear the group of physics bodies.

    let bodiesGroup = this._m_bodiesGroup;

    if(bodiesGroup != null)
    {
      bodiesGroup.destroy();
    }

    this._m_bodiesGroup = null;

    // Clear actors pool

    this._m_actorPool.clear();

    // Clear the Map of spawners.

    let hSpawner = this._m_hSpawner;

    hSpawner.forEach
    (
      function(_spawner : IEnemySpawner)
      {
        _spawner.destroy();
      }
    );
    hSpawner.clear();

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
   * Called once for each active actor in the pool during the game loop.
   * 
   * @param _actor 
   */
  private _updateActor(_actor : Ty_physicsActor)
  : void
  {
    _actor.update();
    return;
  }

  /**
   * Called once for each EnemySpawner during the game loop.
   * 
   * @param _spawner  
   */
  private _updateSpawner(_spawner : IEnemySpawner)
  : void
  {
    _spawner.update(this._m_dt);
    return;
  }

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

  /**
   * Map of enemy spawners.
   */
  private _m_hSpawner : Map<DC_ENEMY_TYPE, IEnemySpawner>;

  /**
   * delta time.
   */
  private _m_dt : number;
}