/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file simpleBulletSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-12-2020
 */

import { DC_BULLET_TYPE, DC_COMPONENT_ID, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor, V2 } from "../../commons/1942types";
import { CmpBulletData } from "../../components/cmpBulletData";
import { CmpSimpleBulletController } from "../../components/cmpSimpleBulletControl";
import { GameManager } from "../../gameManager/gameManager";
import { IBulletManager } from "../iBulletManager";
import { IBulletSpawner } from "./iBulletSpawner";
import { NullBulletSpawner } from "./nullBulletSpawner";

export class SimpleBulletSpawner
implements IBulletSpawner
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  static Create()
  : SimpleBulletSpawner
  { 
    let bulletSpawner = new SimpleBulletSpawner();

    bulletSpawner._m_gameManager = GameManager.GetInstance();

    return bulletSpawner;
  }

  /**
   * Intialize this bullet spawner.
   */
  init()
  : void
  { }
  
  update(_dt: number)
  : void 
  {   }
  
  spawn(_actor: Ty_physicsActor, _x: number, _y: number, _data?: any)
  : void 
  { 
    this.assemble(_actor);
    
    let direction = _data as V2;
    let speed = direction.length();
    
    direction.normalize();

    _actor.getWrappedInstance().setTint(0x000000);

    _actor.sendMessage
    (
      DC_MESSAGE_ID.kDirection,
      direction
    );

    _actor.sendMessage
    (
      DC_MESSAGE_ID.kSpeed,
      speed
    );

    _actor.sendMessage
    (
      DC_MESSAGE_ID.kToPosition,
      new Phaser.Math.Vector3(_x, _y)
    );

    return;
  }

  assemble(_actor: Ty_physicsActor)
  : void 
  { 
    let basicControlPool = this._m_gameManager.getBasicBulletControlPool();

    let cmp : CmpSimpleBulletController = basicControlPool.get();
    if(cmp == null)
    {
      console.warn("Basic bullet controller pool out of elements.");
      this._m_bulletManager.disableActor(_actor);
      return;
    }

    let bulletData = _actor.getComponent<CmpBulletData>
    (
      DC_COMPONENT_ID.kBulletData
    );

    bulletData.setSpawner(this);

    // Set properties.

    bulletData.setAttackPoints(1);

    // Set the controller.

    _actor.addComponent(cmp);

    return;
  }

  disassemble(_actor: Ty_physicsActor)
  : void 
  { 
    // Set the bullet spawner.

    let bulletData = _actor.getComponent<CmpBulletData>
    (
      DC_COMPONENT_ID.kBulletData
    );

    bulletData.setSpawner(NullBulletSpawner.GetInstance());

    // Remove controller.

    let cmp = _actor.getComponent<CmpSimpleBulletController>
    (
      DC_COMPONENT_ID.kSimpleBulletControl
    );
    _actor.removeComponent(DC_COMPONENT_ID.kSimpleBulletControl);

    // Disable Component.

    let cmp_pool = this._m_gameManager.getBasicBulletControlPool();
    cmp_pool.desactive(cmp);

    // Disable actor.

    this._m_bulletManager.disableActor(_actor);

    return;

  }

  setBulletManager(_manager: IBulletManager)
  : void 
  { 
    this._m_bulletManager = _manager;
    return;
  }
  
  getID()
  : DC_BULLET_TYPE 
  {
    return DC_BULLET_TYPE.kSimple;
   }

  destroy()
  : void 
  { 
    this._m_gameManager = null;
    this._m_bulletManager = null;

    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the game manager.
   */
  private _m_gameManager : GameManager;

   /**
   * Reference to the bullet manger.
   */
  private _m_bulletManager : IBulletManager;
}