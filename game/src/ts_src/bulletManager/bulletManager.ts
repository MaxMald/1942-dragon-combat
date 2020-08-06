/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Create, manage and provides bullets. The BulletManager storage a
 * group of bullets in an object pool and saves its physics body in an array.
 *
 * @file bulletManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-29-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { MxPoolArgs } from "optimization/mxPoolArgs";
import { BaseActor } from "../actors/baseActor";
import { DC_BULLET_TYPE, DC_COMPONENT_ID } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsGroup, Ty_physicsSprite } from "../commons/1942types";
import { CmpBulletCollisionController } from "../components/cmpBulletCollisionController";
import { CmpBulletData } from "../components/cmpBulletData";
import { CmpMovementBullet } from "../components/cmpMovementBullet";
import { CmpNullCollisionController } from "../components/cmpNullCollisionController";
import { CmpPlayZone } from "../components/cmpPlayZone";
import { ICmpCollisionController } from "../components/iCmpCollisionController";
import { BulletManagerConfig } from "./bulletManagerConfig";
import { IBulletSpawner } from "./bulletSpawner/iBulletSpawner";
import { NullBulletSpawner } from "./bulletSpawner/nullBulletSpawner";
import { IBulletManager } from "./iBulletManager";

/**
 * Create, manage and provides bullets. The BulletManager storage a group of 
 * bullets in an object pool and saves its physics body in an array.
 */
export class BulletManager implements IBulletManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Creates an empty bullet manager.
   */
  static Create()
  : BulletManager
  {
    let bulletMng : BulletManager = new BulletManager();

    let pool : MxObjectPool<Ty_physicsActor> 
      = MxObjectPool.Create<Ty_physicsActor>();

    pool.suscribe
    (
      'elementActive', 
      'BulletManager', 
      bulletMng._onActive, 
      bulletMng
    );

    pool.suscribe
    (
      'elementDesactive', 
      'BulletManager', 
      bulletMng._onDesactive, 
      bulletMng
    );
    
    bulletMng._m_pool = pool;

    // Shared components.

    bulletMng._m_playZone = CmpPlayZone.Create();
    bulletMng._m_collisionController = CmpBulletCollisionController.Create();

    bulletMng._m_dt = 0.0;

    bulletMng._m_hSpawner = new Map<DC_BULLET_TYPE, IBulletSpawner>();

    return bulletMng;
  }

  /**
   * Intialize this Ty_physicsActor manager with a configuration file.
   * 
   * @param _scene Scene where the bullets are going to be build.
   * @param _config Configuration file.
   */
  init
  (
    _scene : Phaser.Scene, 
    _config : BulletManagerConfig
  )
  : void
  {
    // Play Zone

    this._m_playZone.setBoundings(-100, -100, 1180, 2020);

    // Create the bodies group.

    let bodiesGroup = this._m_bodiesGroup;

    if(bodiesGroup != null)
    {
      bodiesGroup.destroy();
    }

    bodiesGroup = _scene.physics.add.group();
    this._m_bodiesGroup = bodiesGroup;

    // Clear the object pool.

    let pool = this._m_pool;

    if(pool.getSize())
    {
      pool.clear();
    }

    // Create the bullets.

    let size = _config.size;
    
    let bullet : Ty_physicsActor;
    let a_bullets : Ty_physicsActor[] = new Array<Ty_physicsActor>();

    let sprite : Ty_physicsSprite;

    let playZoneComponent = this._m_playZone;
    let collisionController = this._m_collisionController;

    while(size > 0)
    {
      sprite = bodiesGroup.create
      (
        0.0,
        0.0,
        'fireball'
      );

      sprite.active = false;
      sprite.visible = false;
      sprite.body.enable = false;

      bullet = BaseActor.Create(sprite, "Bullet_" + size.toString());

      sprite.setData('actor', bullet);

      bullet.addComponent(CmpMovementBullet.Create());      
      bullet.addComponent(CmpBulletData.Create());
      bullet.addComponent(collisionController);
      bullet.addComponent(playZoneComponent);

      bullet.init();

      a_bullets.push(bullet);

      --size;
    }

    // Add bullets to the pool.

    this._m_pool.init(a_bullets);

    return;
  }

  /**
   * Update each active bullet and the bullet spawners.
   */
  update(_dt : number)
  : void 
  {    
    this._m_dt = _dt;

    // Update bullet spawners.

    this._m_hSpawner.forEach
    (
      this._updateSpawner,
      this
    );

    // Update pool.

    this._m_pool.forEachActive
    (
      this._updateBullet,
      this
    );

    return;
  }

  /**
   * Add a bullet spawner to this bullet manager. If a bullet spawner with the
   * same identifier exists, it will be destroyed and replaced by the new one.
   * 
   * @param _spawner bullet spawner. 
   */
  addSpawner(_spawner : IBulletSpawner)
  : void
  {
    
    let hSpawner = this._m_hSpawner;

    let type = _spawner.getID();

    if(hSpawner.has(type))
    {
      let toRemove = hSpawner.get(type);
      toRemove.destroy();
    }

    hSpawner.set(type, _spawner);
    
    _spawner.setBulletManager(this);

    return;
  }

   /**
   * Get a bullet spawner from this bullet manager. If the spawner did not be
   * founded, it will returns NullBulletSpawner instance.
   * 
   * @param _type bullet spawner identifier.
   * 
   * @returns bullet spawner. 
   */
  getSpawner(_type : DC_BULLET_TYPE)
  : IBulletSpawner
  {
    let hSpawner = this._m_hSpawner;

    if(hSpawner.has(_type))
    {
      return hSpawner.get(_type);
    }

    return NullBulletSpawner.GetInstance();
  }

  /**
   * Spawn a bullet in the world.
   * 
   * @param _x : position in x axis.
   * @param _y : position in y axis.
   * @param _type : bullet type.
   */
  spawn(_x : number, _y : number, _type : DC_BULLET_TYPE)
  : void
  {
    let hSpawner = this._m_hSpawner;

    if(hSpawner.has(_type)) 
    {
      let spawner = hSpawner.get(_type);

      let actor : Ty_physicsActor = this._m_pool.get();

      if(actor != null) // Spawn only if any actor is available.
      {
        spawner.spawn(actor, _x, _y);
      }      
    }

    return;
  }

  /**
   * Get an actor from the pool.
   */
  getActor() 
  : Ty_physicsActor
  {
    return this._m_pool.get();
  }

  /**
   * Disable the given actor.
   * 
   * @param _actor actor. 
   */
  disableActor(_actor : Ty_physicsActor)
  : void
  {
    this._m_pool.desactive(_actor);
    return;
  }

  /**
   * Get the object pool of this Ty_physicsActor Manager.
   * 
   * @returns ObjectPool.
   */
  getPool()
  : MxObjectPool<Ty_physicsActor>
  {
    return this._m_pool;
  }

  /**
   * Destroy all the bullets of this BulletManager and clear the pool. Destroy
   * and removes the bullet spawners.
   */
  clear()
  : void
  {
    // Destroy and remove bullets spawners.

    let hSpawner = this._m_hSpawner;

    hSpawner.forEach
    (
      function(_spawner : IBulletSpawner)
      {
        _spawner.destroy();
      }
    );

    hSpawner.clear();

    // Destroy and remove actors.

    let pool = this._m_pool;

    pool.forEach
    (
      function(_bullet : Ty_physicsActor)
      : void
      {
        _bullet.destroy();
        return;
      }
    );

    pool.clear();
    return;
  }

  /**
   * Get the bodies group of this bullet manager.
   * 
   * @returns Phaser physics group.
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
  }

  /**
   * Safely destroys this Ty_physicsActor Manager.
   */
  destroy()
  : void
  {
    this._m_pool.destroy();
    this._m_bodiesGroup.destroy();
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Private constructor.
   */
  private constructor()
  { }

  /**
   * Called when a bullet has a collision with another body. This method calls
   * the onCollision method of the bullet and the other body.
   * 
   * The bullet and the other object must have an implementation of the 
   * ICmpCollisionController in one of theirs components.
   * 
   * @param _other the other body. 
   * @param _bullet the bullet body.
   */
  private _onCollision
  (
    _other : Ty_physicsSprite,
    _bullet : Ty_physicsSprite
  )
  : void
  {
    // Call onCollision method of the bullet.

    let bulletActor : Ty_physicsActor = _bullet.getData("actor");

    let bulletController 
      = bulletActor.getComponent<ICmpCollisionController>
      (
        DC_COMPONENT_ID.kCollisionController
      );

    let otherActor : BaseActor<Ty_physicsSprite>
      = _other.getData('actor');

    bulletController.onCollision(otherActor, bulletActor);

    // Call onCollision method of the other object.
    
    let otherController 
      = otherActor.getComponent<ICmpCollisionController>
      (
        DC_COMPONENT_ID.kCollisionController
      );
    
    otherController.onCollision(bulletActor, otherActor);

    return;
  }

  /**
   * Update a bullet spawner.
   * 
   * @param _spawner bullet spawner. 
   */
  private _updateSpawner(_spawner : IBulletSpawner)
  : void
  {
    _spawner.update(this._m_dt);
    return;
  }

  /**
   * Called at every game loop.
   * 
   * @param _bullet Ty_physicsActor.
   */
  private _updateBullet(_bullet : Ty_physicsActor)
  : void
  {
    _bullet.update();
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

    let bullet : Ty_physicsActor = _args.element;
    let sprite : Ty_physicsSprite = bullet.getWrappedInstance();

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

    let bullet : Ty_physicsActor = _args.element;
    let sprite : Ty_physicsSprite = bullet.getWrappedInstance();

    sprite.visible = false;
    sprite.active = false;
    sprite.body.enable = false;

    return;
  }

  /**
   * Object pool of Phaser Sprites (bullets).
   */
  private _m_pool : MxObjectPool<Ty_physicsActor>;

  /**
   * Delta time.
   */
  private _m_dt : number;

  /**
   * The physic bodies of the bullets.
   */
  private _m_bodiesGroup : Ty_physicsGroup;

  /**
   * Map of bullet spawners.
   */
  private _m_hSpawner : Map<DC_BULLET_TYPE, IBulletSpawner>;

  /****************************************************/
  /* Shared Components                                */
  /****************************************************/

  /**
   * Shared playzone component.
   */
  private _m_playZone : CmpPlayZone;

  /**
   * Shared collision controller component.
   */
  private _m_collisionController : CmpBulletCollisionController;
}
  