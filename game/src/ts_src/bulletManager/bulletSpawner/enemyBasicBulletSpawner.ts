/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file enemyBasicBulletSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-06-2020
 */

import { DC_BULLET_TYPE, DC_COMPONENT_ID, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor } from "../../commons/1942types";
import { CmpBasicBulletController } from "../../components/cmpBasicBulletController";
import { CmpBulletData } from "../../components/cmpBulletData";
import { IBulletManager } from "../iBulletManager";
import { IBulletSpawner } from "./iBulletSpawner";
import { NullBulletSpawner } from "./nullBulletSpawner";

export class EnemyBasicBulletSpawner implements IBulletSpawner
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : EnemyBasicBulletSpawner
  {
    let spawner = new EnemyBasicBulletSpawner;

    let basicMovement = CmpBasicBulletController.Create();
    basicMovement.setDirection(0.0, 1.0);
    basicMovement.setSpeed(1200.0);

    spawner._m_controller = basicMovement;
    return spawner;
  }

  update(_dt: number)
  : void 
  {
    this._m_controller.resetForce(_dt);
    return;
  }

  spawn(_actor: Ty_physicsActor, _x: number, _y: number)
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
    // Tint sprite.

    let sprite = _actor.getWrappedInstance();

    sprite.setTint(0xff0000);

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
    return DC_BULLET_TYPE.kEnemyBasic;
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