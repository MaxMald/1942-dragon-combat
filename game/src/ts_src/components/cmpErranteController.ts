/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpErranteController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-31-2020
 */

import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor, V3 } from "../commons/1942types";
import { ErranteSpawner } from "../enemiesManager/enemySpawner/erranteSpawner";
import { ICmpCollisionController } from "./iCmpCollisionController";

export class CmpErranteController implements ICmpCollisionController
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  static Create()
  : CmpErranteController
  {
    let controller = new CmpErranteController();

    controller.m_id = DC_COMPONENT_ID.kCollisionController;

    controller._m_playZone_p1 = new Phaser.Geom.Point();
    controller._m_playZone_p2 = new Phaser.Geom.Point();

    controller._m_direction = new Phaser.Math.Vector3(0.0, 1.0);
    controller._m_force = new Phaser.Math.Vector3();
    controller._m_speed = 400.0;

    controller.setDeltaTime(0.0);

    return controller;
  }

  setSpawner(_spawner : ErranteSpawner)
  : void
  {
    this._m_spawner = _spawner;
    return;
  }
  
  onCollision
  (
    _other: Ty_physicsActor, 
    _this: Ty_physicsActor
  ) : void     
  {
    return;
  }
  
  init(_actor: Ty_physicsActor)
  : void 
  {
    return;
  }

  update(_actor: Ty_physicsActor)
  : void 
  {
    _actor.sendMessage(DC_MESSAGE_ID.kAgentMove, this._m_force);

    let sprite = _actor.getWrappedInstance();
    if(!this._isPlayzone(sprite.x, sprite.y))
    {
      let spawner = this._m_spawner;
      let enemiesManager = spawner.getEnemiesManager();

      spawner.disasemble(_actor);

      enemiesManager.disableActor(_actor);

      console.log("Errante disable");
    }

    return;
  }

  receive(_id: number, _obj: any)
  : void 
  {
    return;
  }

  setDeltaTime(_dt : number)
  : void
  {
    this._m_dt = _dt;

    let force = this._m_force;
    let direction = this._m_direction;
    let mult = this._m_speed * _dt;

    force.x = direction.x * mult;
    force.y = direction.y * mult;
    return;
  }

  setPlayZoneP1(_x : number, _y : number)
  : void
  {
    this._m_playZone_p1.setTo(_x, _y);
    return;
  }

  setPlayZoneP2(_x : number, _y : number)
  : void
  {
    this._m_playZone_p2.setTo(_x, _y);
    return;
  }

  destroy()
  : void 
  {
    throw new Error("Method not implemented.");
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Private constructor.
   */
  private constructor()
  { }

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

    return (_y > p1.y && _y < p2.y) && (_x > p1.x && _x < p2.x);
  }

  /**
   * Direction vector.
   */
  private _m_direction : V3;

  /**
   * Force vector.
   */
  private _m_force : V3;

  /**
   * Dragon speed.
   */
  private _m_speed : number;

  /**
   * Delta time.
   */
  private _m_dt : number;

  /**
   * Playzone limits point 1.
   */
  private _m_playZone_p1 : Phaser.Geom.Point;

  /**
   * Playzone limits point 2.
   */
  private _m_playZone_p2 : Phaser.Geom.Point;

  /**
   * Reference ot the Errante Spawner.
   */
  private _m_spawner : ErranteSpawner;

}