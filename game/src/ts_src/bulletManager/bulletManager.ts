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
import { CmpMovement } from "../components/cmpMovement";
import { BulletManagerConfig } from "./bulletManagerConfig";

type Bullet = BaseActor<Phaser.Physics.Arcade.Sprite>;

/**
 * 
 */
export class BulletManager
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

    return bulletMng;
  }

  /**
   * Intialize this Bullet manager with a configuration file.
   * 
   * @param _scene Scene where the bullets are going to be build.
   * @param _config Configuration file.
   */
  init(_scene : Phaser.Scene, _config : BulletManagerConfig)
  : void
  {
    let size = _config.size;
    
    let bullet : Bullet;
    let a_bullets : Bullet[] = new Array<Bullet>();

    let sprite : Phaser.Physics.Arcade.Sprite;

    while(size > 0)
    {
      sprite = _scene.physics.add.sprite
      (
        0.0,
        0.0,
        'fireball'
      );

      sprite.active = false;
      sprite.visible = false;

      bullet = BaseActor.Create(sprite, "Bullet_" + size.toString());

      bullet.addComponent(new CmpMovement());

      a_bullets.push(bullet);

      --size;
    }

    this._m_pool.init(a_bullets);
    return;
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

  /**
   * Object pool of Phaser Sprites (bullets).
   */
  private _m_pool : MxObjectPool<Bullet>;
}