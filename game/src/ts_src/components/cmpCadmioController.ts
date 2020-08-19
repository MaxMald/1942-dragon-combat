/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Control the force of movement of the item.
 *
 * @file cmpCadmioController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-19-2020
 */

import { DC_COMPONENT_ID, DC_ITEM_TYPE, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor, V2, V3 } from "../commons/1942types";
import { CnfCadmio } from "../configObjects/cnfCadmio";
import { ICmpItemController } from "./iCmpItemController";

/**
 * Control the force of movement of the item.
 */
export class CmpCadmioController
implements ICmpItemController
{

  /****************************************************/
  /* Public                                           */
  /****************************************************/  

  /**
   * Creates a Cadmio controller with default values.
   */
  static Create()
  : CmpCadmioController
  {
    let controller = new CmpCadmioController();

    controller.m_id = DC_COMPONENT_ID.kItemController;
    controller._m_direction = new Phaser.Math.Vector2();
    controller._m_force = new Phaser.Math.Vector3();

    return controller;
  }

  /**
   * Set the speed and force direction with a configuration object.
   * 
   * @param _config configuration object. 
   */
  config(_config : CnfCadmio)
  : void
  {
    this.setSpeed(_config.speed);
    this.setDirection(_config.direction_x, _config.direction_y);
    return;
  }

  /**
   * Get the type of this item.
   * 
   * @returns item type.
   */
  getType()
  : number 
  { 
    return DC_ITEM_TYPE.kCadmio;
  }
  
  init(_actor: Ty_physicsActor)
  : void 
  { }

  /**
   * Recalculate the motion force with a delta time.
   * 
   * @param _dt delta time. 
   */
  preUpdate(_dt : number)
  : void
  {
    let mult = _dt * this._m_speed;

    this._m_force.x = this._m_direction.x * mult;
    this._m_force.y = this._m_direction.y * mult;
    return;
  }

  /**
   * Apply motion force to item.
   * 
   * @param _actor actor. 
   */
  update(_actor: Ty_physicsActor)
  : void 
  { 
    _actor.sendMessage
    (
      DC_MESSAGE_ID.kAgentMove,
      this._m_force
    );
    return;
  }

  receive(_id: number, _obj: any)
  : void 
  { }

  /**
   * Set the motion direction.
   * 
   * @param _x x component. 
   * @param _y y component.
   */
  setDirection(_x : number, _y : number)
  : void
  {
    this._m_direction.setTo(_x, _y);
    return;
  }

  /**
   * Get the motion direction.
   * 
   * @returns vector 2.
   */
  getDirection()
  : V2
  {
    return this._m_direction;
  }

  /**
   * Set the item speed in the world (pix./sec.).
   * 
   * @param _speed speed in pixels per second.
   */
  setSpeed(_speed : number)
  : void
  {
    this._m_speed = _speed;
    return;
  }

  /**
   * Get the item speed in the world (pix./sec.).
   * 
   * @returns speed in pixels per second.
   */
  getSpeed()
  : number
  {
    return this._m_speed;
  }

  /**
   * Destroys the component.
   */
  destroy()
  : void 
  {
    this._m_direction = null;
    this._m_force = null;
    return;
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Item speed in the world (pix./sec.).
   */
  private _m_speed : number;
  
  /**
   * Direction of motion.
   */
  private _m_direction : V2;

  /**
   * motion force.
   */
  private _m_force : V3;
}