/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file bulletManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-29-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { MxPoolArgs } from "optimization/mxPoolArgs";
import { BaseActor } from "../actors/baseActor";
import { CmpMovementBullet } from "../components/cmpMovementBullet";
import { DC_MESSAGE_ID } from "../messages/dcMessageID";
import { BulletManagerConfig } from "./bulletManagerConfig";
import { IBulletManager } from "./iBulletManager";

type Bullet = BaseActor<Phaser.Physics.Arcade.Sprite>;

/**
 * 
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

    let pool : MxObjectPool<Bullet> = MxObjectPool.Create<Bullet>();

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
   * Intialize this Bullet manager with a configuration file.
   * 
   * @param _scene Scene where the bullets are going to be build.
   * @param _config Configuration file.
   * be desactivated.
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

    // Clear the object pool.

    let pool = this._m_pool;

    if(pool.getSize())
    {
      pool.clear();
    }

    // Create the bullets.

    let size = _config.size;
    
    let bullet : Bullet;
    let a_bullets : Bullet[] = new Array<Bullet>();

    let sprite : Phaser.Physics.Arcade.Sprite;

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

      bullet = BaseActor.Create(sprite, "Bullet_" + size.toString());

      bullet.addComponent(CmpMovementBullet.Create());

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
    let bullet : Bullet = this._m_pool.get();

    if(bullet !== null) 
    {
      let sprite = bullet.getWrappedInstance();

      sprite.x = _x;
      sprite.y = _y;
    }

    return;
  }

  /**
   * Get the object pool of this Bullet Manager.
   * 
   * @returns ObjectPool.
   */
  getPool()
  : MxObjectPool<Bullet>
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
      function(_bullet : Bullet)
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
  : Phaser.Physics.Arcade.Group
  {
    return this._m_bodiesGroup;
  }

  /**
   * Safely destroys this Bullet Manager.
   */
  destroy()
  : void
  {
    this._m_pool.destroy();
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
   * Called at every game loop.
   * 
   * @param _bullet Bullet.
   */
  private _updateBullet(_bullet : Bullet)
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
    _pool : MxObjectPool<Bullet>,
    _args : MxPoolArgs<Bullet>
  )
  : void
  {

    let bullet : Bullet = _args.element;
    let sprite : Phaser.Physics.Arcade.Sprite = bullet.getWrappedInstance();

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
    _pool : MxObjectPool<Bullet>,
    _args : MxPoolArgs<Bullet>
  )
  : void
  {

    let bullet : Bullet = _args.element;
    let sprite : Phaser.Physics.Arcade.Sprite = bullet.getWrappedInstance();

    sprite.visible = false;
    sprite.active = false;

    return;
  }

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
  private _m_pool : MxObjectPool<Bullet>;

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
  private _m_bodiesGroup : Phaser.Physics.Arcade.Group;
}