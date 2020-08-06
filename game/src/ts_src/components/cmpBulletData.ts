/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Provides common information of a bullet actor.
 *
 * @file cmpBulletData.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-05-2020
 */

import { IBaseComponent } from "./iBaseComponent";
import { BaseActor } from "../actors/baseActor";
import { Ty_physicsSprite } from "../commons/1942types";
import { IBulletSpawner } from "../bulletManager/bulletSpawner/iBulletSpawner";
import { NullBulletSpawner } from "../bulletManager/bulletSpawner/nullBulletSpawner";
import { DC_COMPONENT_ID } from "../commons/1942enums";

/**
 * Provides common information of a bullet actor.
 */
export class CmpBulletData 
implements IBaseComponent<Ty_physicsSprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  static Create()
  : CmpBulletData
  {
    let component = new CmpBulletData;

    component.m_id = DC_COMPONENT_ID.kBulletData;

    return component;
  }
  
  init(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  { }

  update(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  { }

  /**
   * Get the bullet spawner of this actor.
   */
  getSpawner()
  : IBulletSpawner
  {
    return this._m_bulletSpawner;
  }

  /**
   * Set the bullet spawner of this actor.
   * 
   * @param _spawner bullet spawner. 
   */
  setSpawner( _spawner : IBulletSpawner )
  : void
  {
    this._m_bulletSpawner = _spawner;
    return;
  }

  /**
   * Get the attack points of this actor.
   * 
   * @returns attack points.
   */
  getAttackPoints()
  : integer
  {
    return this._m_attackPoints;
  }

  /**
   * Set the attack points of this actor.
   * 
   * @param _attackPoints attack points. 
   */
  setAttackPoints(_attackPoints : integer)
  : void
  {
    this._m_attackPoints = _attackPoints;
    return;
  }

  receive(_id: number, _obj: any)
  : void 
  { }

  destroy()
  : void 
  {
    this._m_bulletSpawner = null;
    return;
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
 
  /**
   * private constructor.
   */
  private constructor()
  {
    this._m_bulletSpawner = NullBulletSpawner.GetInstance();
    this._m_attackPoints = 0.0;
    return;
  }

  /**
   * Reference to the bullet spawner.
   */
  private _m_bulletSpawner : IBulletSpawner;

  /**
   * Attack points.
   */
  private _m_attackPoints : integer;
}