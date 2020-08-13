/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpHeroBulletController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-29-2020
 */

import { BaseActor } from "../actors/baseActor";
import { IBulletManager } from "../bulletManager/iBulletManager";
import { NullBulletManager } from "../bulletManager/nullBulletManager";
import { DC_BULLET_TYPE, DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { GameManager } from "../gameManager/gameManager";
import { IBaseComponent } from "./iBaseComponent";

/**
 * Spwan bullets relative to the hero position. It needs a BulletManager.
 */
export class CmpHeroBulletController 
  implements IBaseComponent<Phaser.Physics.Arcade.Sprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Creates a new hero bullet controller.
   */
  static Create()
  : CmpHeroBulletController
  {
    let bulletController : CmpHeroBulletController = new CmpHeroBulletController();

    bulletController.m_id = DC_COMPONENT_ID.kHeroBulletController;
    bulletController._m_loadingMult = 0.0;

    bulletController._m_bulletManager = NullBulletManager.GetInstance();

    return bulletController;
  }
  
  /**
   * Get the reference to the GameManager.
   */
  init(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void
  {
    this._m_gameManager = GameManager.GetInstance();
    
    this._m_loadingTime = 0.0;
    return;
  }

  /**
   * Set the bullet manager.
   * 
   * @param _bulletManager bullet manager. 
   */
  setBulletManager(_bulletManager : IBulletManager)
  : void
  {
    this._m_bulletManager = _bulletManager;
    return;
  }

  /**
   * Spawn bullets.
   * 
   * @param _actor 
   */
  update(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  {
    let loading : number = this._m_loadingTime;

    loading += (this._m_gameManager.m_dt * this._m_loadingMult);
    
    if(loading >= this._m_frecuency)
    {
      let sprite = _actor.getWrappedInstance();

      this._m_bulletManager.spawn
      (
        sprite.x , 
        sprite.y - 110.0, 
        DC_BULLET_TYPE.kHeroBasic
      );
      
      loading = 0.0;
    }
    
    this._m_loadingTime = loading;
    return;
  }

  /**
   * 
   * @param _id 
   * @param _obj 
   */
  receive(_id: number, _obj: any)
  : void 
  {
    switch(_id)
    {
      case DC_MESSAGE_ID.kPointerPressed :

      this._m_loadingMult = 1.0;
      return;

      case DC_MESSAGE_ID.kPointerReleased : 

      this._m_loadingMult = 0.0;
      return;
    }
    return;
  }

  /**
   * Set the fire rate in bullets per second.
   * 
   * @param _fireRate Number of bullets spawned per second. 
   */
  setFireRate(_fireRate : number)
  : void
  {
    if(_fireRate == 0.0)
    {
      this._m_frecuency = 10000.0;
    }
    else
    {
      this._m_frecuency = 1.0 / _fireRate;
    }

    return;
  }

  /**
   * Get the number of bullets spawned per second.
   * 
   * @returns Number of bullets spawned per second.
   */
  getFireRate()
  : number
  {
    return this._m_frecuency;
  }

  /**
   * Safely destroys this component.
   */
  destroy()
  : void 
  {
    this._m_bulletManager = null;
    this._m_gameManager = null;
    return;
  }

  m_id: number;
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the BulletManager.
   */
  private _m_bulletManager : IBulletManager;

  /**
   * Referenc to the GameManager.
   */
  private _m_gameManager : GameManager;

  /**
   * Frecuency of fire (bullets per second).
   */
  private _m_frecuency : number;

  /**
   * Loading time since the last time that a bullet had spawn.
   */
  private _m_loadingTime : number;

  /**
   * Loading multiplier.
   */
  private _m_loadingMult : number;
}