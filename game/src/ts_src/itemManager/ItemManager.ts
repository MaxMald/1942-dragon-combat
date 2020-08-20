/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file ItemManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-19-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { MxPoolArgs } from "optimization/mxPoolArgs";
import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID, DC_CONFIG, DC_ITEM_TYPE } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsGroup, Ty_physicsSprite } from "../commons/1942types";
import { CmpNullCollisionController } from "../components/cmpNullCollisionController";
import { CmpPhysicSpriteController } from "../components/cmpPhysicSpriteController";
import { CmpPlayZone } from "../components/cmpPlayZone";
import { ICmpCollisionController } from "../components/iCmpCollisionController";
import { CnfCadmio } from "../configObjects/cnfCadmio";
import { CnfItemManager } from "../configObjects/cnfItemManager";
import { GameManager } from "../gameManager/gameManager";
import { ILevelConfiguration } from "../levelConfiguration/ILevelConfiguration";
import { IItemManager } from "./IItemManager";
import { CadmioSpawner } from "./itemSpawner/cadmioSpawner";
import { CanusSpawner } from "./itemSpawner/canusSpawner";
import { IItemSpawner } from "./itemSpawner/IItemSpawner";

export class ItemManager
implements IItemManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  init(_scene: Phaser.Scene, _gameManager: GameManager)
  : void 
  {
    this.destroy();    

    // Get configuration objects.

    let levelConfig : ILevelConfiguration = _gameManager.getLevelConfiguration();

    let cadmioConfig : CnfCadmio 
      = levelConfig.getConfig<CnfCadmio>(DC_CONFIG.kCadmio);

    if(cadmioConfig == null)
    {
      cadmioConfig = new CnfCadmio();
    }
    
    let itemManagerConfig : CnfItemManager
      = levelConfig.getConfig<CnfItemManager>(DC_CONFIG.kItemManager); 

    if(itemManagerConfig == null)
    {
      itemManagerConfig = new CnfItemManager();
    }

    // Create the Playzone component.

    this._m_playZone = CmpPlayZone.Create();
    this._m_playZone.setBoundings
    (
      -itemManagerConfig.playZone_extrude,
      -itemManagerConfig.playZone_extrude,
      _scene.game.canvas.width + itemManagerConfig.playZone_extrude,
      _scene.game.canvas.height + itemManagerConfig.playZone_extrude
    );

    // create actor pool.

    let pool : MxObjectPool<Ty_physicsActor> 
      = MxObjectPool.Create<Ty_physicsActor>();
    this._m_pool = pool;

    // create physic bodies group.

    let bodiesGroup = _scene.physics.add.group();
    this._m_bodiesGroup = bodiesGroup;

    // suscribe to pool events.

    pool.suscribe
    (
      'elementActive', 
      'ItemManager', 
      this._onActive, 
      this
    );

    pool.suscribe
    (
      'elementDesactive', 
      'ItemManager', 
      this._onDesactive, 
      this
    );

    let aitems : Array<Ty_physicsActor> = new Array<Ty_physicsActor>();
    let item : Ty_physicsActor;
    let sprite : Ty_physicsSprite;

    let index : number = 0;
    while(index < itemManagerConfig.pool_size)
    {
      // create physic sprite.

      sprite = bodiesGroup.create
      (
        0.0,
        0.0,
        cadmioConfig.texture_key
      );

      // default properties.

      sprite.active = false;
      sprite.visible = false;
      sprite.body.enable = false;

      // create actor.

      item = BaseActor.Create(sprite, "Item_" + index.toString());

      sprite.setData('actor', item);

      // add components.

      item.addComponent(CmpNullCollisionController.GetInstance()); 
      item.addComponent(CmpPhysicSpriteController.Create());     
      item.addComponent(this._m_playZone);      

      // initialize actor.

      item.init();

      aitems.push(item);
      ++index;
    }

    this._m_pool.init(aitems);

    // Create Spawners Map

    this._hSpawner = new Map<DC_ITEM_TYPE, IItemSpawner>();

    ///////////////////////////////////
    // Create Items Spawners

    // Cadmio Spawner

    let cadmioSpawner = new CadmioSpawner();
    cadmioSpawner.init(_scene, _gameManager, this);

    this.addSpawner(cadmioSpawner);

    // Canus Spawner

    let canusSpawner = new CanusSpawner();
    canusSpawner.init(_scene, _gameManager, this);

    this.addSpawner(canusSpawner);
    return;
  }

  /**
   * Update the item spawners, then update the active objects.
   * 
   * @param _dt delta time. 
   */
  update(_dt: number)
  : void 
  {
    this._m_dt = _dt;

    // Update Spawners.

    this._hSpawner.forEach
    (
      this._updateSpawner,
      this
    );

    // Update Pool.

    this._m_pool.forEachActive
    (
      this._updateItem,
      this
    );
    return;
  }

  /**
   * Spawn an item in the given position.
   * 
   * @param _x position x axis. 
   * @param _y position y axis.
   * @param _type item type.
   * @param _data optional data.
   */
  spawn(_x: number, _y: number, _type: DC_ITEM_TYPE, _data?: any)
  : void 
  {
    if(this._hSpawner.has(_type))
    {
      let spawner : IItemSpawner = this._hSpawner.get(_type);
      
      let actor = this._m_pool.get();
      if(actor != null)
      {
        spawner.spawn(actor, _x, _y, _data);
      }
    }
    return;
  }

  /**
   * Add an item spawner to this ItemManager.
   * 
   * @param _spawner Item Manager.
   */
  addSpawner(_spawner : IItemSpawner)
  : void
  {
    _spawner.setItemManager(this);
    this._hSpawner.set(_spawner.getID(), _spawner);
    return;
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
   * Add a collision detection ageinst a sprite.
   * 
   * @param _scene the scene with the physics engine.
   * @param _body the sprite body.
   */
  collisionVsSprite
  (
    _scene : Phaser.Scene,
    _body : Ty_physicsSprite
  )
  : void
  {
    _scene.physics.add.collider
    (
      _body,
      this._m_bodiesGroup,
      this._onCollision,
      undefined,
      this
    );
    return;
  }

  /**
   * 
   */
  clear()
  : void 
  {
    // Clear objects.

    if(this._m_pool != null)
    {
      this._m_pool.forEach
      (
        function(_actor : Ty_physicsActor)
        : void
        {
          _actor.destroy();
          return;
        }
      );
      this._m_pool.clear();
    }   

    // Clear spawners.

    if(this._hSpawner != null)
    {
      this._hSpawner.forEach
      (
        function(_spawner : IItemSpawner)
        {
          _spawner.destroy();
          return;
        }
      );
      this._hSpawner.clear();
    }    

    if(this._m_bodiesGroup)
    {
      this._m_bodiesGroup.destroy();
      this._m_bodiesGroup = null;
    }
    return;
  }

  /**
   * Safely destroys this item manager.
   */
  destroy()
  : void 
  {
    this.clear();

    this._m_pool = null;
    this._hSpawner = null;
    this._m_playZone = null;
    return;
  }
 
  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Called when an item has a collision with another body. This method calls
   * the onCollision method of the bullet and the other body.
   * 
   * The bullet and the other object must have an implementation of the 
   * ICmpCollisionController in one of theirs components.
   * 
   * @param _other the other body. 
   * @param _item the item body.
   */
  private _onCollision
  (
    _other : Ty_physicsSprite,
    _item : Ty_physicsSprite
  )
  : void
  {
    // Call onCollision method of the item.

    let itemActor : Ty_physicsActor = _item.getData("actor");

    let bulletController 
      = itemActor.getComponent<ICmpCollisionController>
      (
        DC_COMPONENT_ID.kCollisionController
      );

    let otherActor : BaseActor<Ty_physicsSprite>
      = _other.getData('actor');

    bulletController.onCollision(otherActor, itemActor);

    // Call onCollision method of the other object.
    
    let otherController 
      = otherActor.getComponent<ICmpCollisionController>
      (
        DC_COMPONENT_ID.kCollisionController
      );
    
    otherController.onCollision(itemActor, otherActor);

    return;
  }

  /**
   * Update spanwer.
   * 
   * @param _spawner spawner. 
   */
  private _updateSpawner(_spawner : IItemSpawner)
  : void
  {
    _spawner.update(this._m_dt);
    return;
  }

  /**
   * Update item actor.
   * 
   * @param _item item actor. 
   */
  private _updateItem(_item : Ty_physicsActor)
  : void
  {
    _item.update();
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

    let item : Ty_physicsActor = _args.element;
    let sprite : Ty_physicsSprite = item.getWrappedInstance();

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

    let item : Ty_physicsActor = _args.element;
    let sprite : Ty_physicsSprite = item.getWrappedInstance();

    sprite.visible = false;
    sprite.active = false;
    sprite.body.enable = false;

    return;
  }

   /**
   * Object pool of Phaser Sprites (items).
   */
  private _m_pool : MxObjectPool<Ty_physicsActor>;

  /**
   * Physic bodies group.
   */
  private _m_bodiesGroup : Ty_physicsGroup;
  
  /**
   * Map of spawners.
   */
  private _hSpawner : Map<DC_ITEM_TYPE, IItemSpawner>;

  /**
   * delta time.
   */
  private _m_dt : number;

  ///////////////////////////////////
  // Shared Component

  /**
   * Playzone component.
   */
  private _m_playZone : CmpPlayZone;
}