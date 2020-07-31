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
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsGroup, Ty_physicsSprite } from "../commons/1942types";
import { CmpBulletCollisionController } from "../components/cmpBulletCollisionController";
import { CmpMovementBullet } from "../components/cmpMovementBullet";
import { ICmpCollisionController } from "../components/iCmpCollisionController";
import { BulletManagerConfig } from "./bulletManagerConfig";
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

    let pool : MxObjectPool<Ty_physicsActor> = MxObjectPool.Create<Ty_physicsActor>();

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

    bulletMng._m_v3 = new Phaser.Math.Vector3();

    bulletMng._m_playZone_p1 = new Phaser.Geom.Point();
    bulletMng._m_playZone_p2 = new Phaser.Geom.Point();

    bulletMng._m_dt = 0.0;
    bulletMng._m_bulletSpeed = 50.0;

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
      bullet.addComponent(CmpBulletCollisionController.Create());

      bullet.init();

      a_bullets.push(bullet);

      --size;
    }

    // Add bullets to the pool.

    this._m_pool.init(a_bullets);

    // Define the playzone area.

    this._m_playZone_p1.setTo
    (
      -_config.playZone_padding, 
      -_config.playZone_padding
    );

    this._m_playZone_p2.setTo
    (
      _scene.game.canvas.width + _config.playZone_padding,
      _scene.game.canvas.height + _config.playZone_padding
    );

    // Set bullet properties.

    this._m_bulletSpeed = _config.speed;

    return;
  }

  /**
   * Update each active bullet.
   */
  update(_dt : number)
  : void 
  {    
    this._m_dt = _dt;
    this._m_v3.y = -_dt * this._m_bulletSpeed;

    this._m_pool.forEachActive
    (
      this._updateBullet,
      this
    );

    return;
  }

  /**
   * Get the speed of the bullets in pixels per second.
   */
  getBulletSpeed()
  : number
  {
    return this._m_bulletSpeed;
  }

  /**
   * Spawn a bullet in the world.
   */
  spawn(_x : number, _y : number)
  : void
  {
    let bullet : Ty_physicsActor = this._m_pool.get();

    if(bullet !== null) 
    {
      let sprite = bullet.getWrappedInstance();

      sprite.x = _x;
      sprite.y = _y;
    }

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
   * Destroy all the bullets of this BulletManager and clear the pool.
   */
  clear()
  : void
  {
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

    this._m_pool.clear();
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
    )
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

    // Desactive bullet.

    this._m_pool.desactive(bulletActor);

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
    _bullet.sendMessage(DC_MESSAGE_ID.kAgentMove, this._m_v3);

    let sprite = _bullet.getWrappedInstance();
    
    if(!this._isPlayzone(sprite.x, sprite.y))
    {
      this._m_pool.desactive(_bullet);
    }

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
   * Check if the position is inside the playzone area. The playzone area defines
   * the zone where a bullet can live, if it get out of this zone it must be
   * desactivated.
   * 
   * @param _x position in x axis. 
   * @param _y position in y axis.
   * 
   * @returns true if the given position is inside the playzone area.
   */
  private _isPlayzone(_x : number, _y : number)
  : boolean
  {
    let p1 : Phaser.Geom.Point = this._m_playZone_p1;
    let p2 : Phaser.Geom.Point = this._m_playZone_p2;

    return (_y > p1.y && _y < p2.y);
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
   * Vector 3.
   */
  private _m_v3 : Phaser.Math.Vector3;

  /**
   * Playzone limits point 1.
   */
  private _m_playZone_p1 : Phaser.Geom.Point;

  /**
   * Playzone limits point 2.
   */
  private _m_playZone_p2 : Phaser.Geom.Point;

  /**
   * Speed of the bullets in pixels per second.
   */
  private _m_bulletSpeed : number;

  /**
   * The physic bodies of the bullets.
   */
  private _m_bodiesGroup : Ty_physicsGroup;
}