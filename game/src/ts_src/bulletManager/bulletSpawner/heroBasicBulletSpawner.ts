/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file heroBasicBulletSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-04-2020
 */

import { DC_BULLET_TYPE, DC_COMPONENT_ID, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor, V2 } from "../../commons/1942types";
import { CmpBasicBulletController } from "../../components/cmpBasicBulletController";
import { CmpBulletData } from "../../components/cmpBulletData";
import { IBulletManager } from "../iBulletManager";
import { IBulletSpawner } from "./iBulletSpawner";
import { NullBulletSpawner } from "./nullBulletSpawner";

export class HeroBasicBulletSpawner implements IBulletSpawner
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Create a new Bullet spawner.
   * 
   * @param _direction bullet default direction. default : (0.0, -1.0).
   * @param _speed bullet speed (pix/s). default : 1200 pix/sec.
   * 
   * @returns HeroBasiBulletSpawner
   */
  static Create
  (
    _direction ?: V2,
    _speed ?: number
  )
  : HeroBasicBulletSpawner
  {
    let spawner = new HeroBasicBulletSpawner;

    let basicMovement = CmpBasicBulletController.Create();

    // Bullet default direction.

    if(_direction != undefined)
    {
      basicMovement.setDirection(_direction.x, _direction.y);
    }
    else
    {
      basicMovement.setDirection(0.0, -1.0);
    }
    
    // Bullet default speed.

    if(_speed != undefined)
    {
      basicMovement.setSpeed(_speed);
    }
    else
    {
      basicMovement.setSpeed(1200.0);
    }    

    spawner._m_controller = basicMovement;

    return spawner;
  }

  update(_dt: number)
  : void 
  {
    this._m_controller.resetForce(_dt);
    return;
  }

  spawn(_actor: Ty_physicsActor, _x: number, _y: number, _data ?: any)
  : void 
  {
    this.assemble(_actor);

    _actor.sendMessage
    (
      DC_MESSAGE_ID.kToPosition,
      new Phaser.Math.Vector3(_x, _y, 0.0) 
    );
    return;
  }

  assemble(_actor: Ty_physicsActor)
  : void 
  {
    // Set the bullet spawner.

    let bulletData = _actor.getComponent<CmpBulletData>
    (
      DC_COMPONENT_ID.kBulletData
    );

    bulletData.setSpawner(this);

    // Set properties.

    bulletData.setAttackPoints(1);

    // Set the controller.

    _actor.addComponent(this._m_controller);

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

    _actor.removeComponent(DC_COMPONENT_ID.kBasicBulletController);

    // Disable actor.

    this._m_bulletManager.disableActor(_actor);

    return;
  }

  /**
   * Set the bullet manager.
   * 
   * @param _manager bullet manager 
   */
  setBulletManager(_manager : IBulletManager)
  : void
  {
    this._m_bulletManager = _manager;
    return;
  }

  getID(): DC_BULLET_TYPE 
  {
    return DC_BULLET_TYPE.kHeroBasic;
  }

  destroy()
  : void 
  { 
    this._m_controller.destroy();
    this._m_controller = null;

    this._m_bulletManager = null;
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * private constructor.
   */
  private constructor()
  { } 
  
  /**
   * Shared bullet controller.
   */
  private _m_controller : CmpBasicBulletController;

  /**
   * Reference to the bullet manger.
   */
  private _m_bulletManager : IBulletManager;

}