/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttNeckRumble.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-09-2020
 */

import { V2 } from "../../commons/1942types";
import { CmpNeckController } from "../../components/cmpNeckController";
import { GameManager } from "../../gameManager/gameManager";
import { ICmpState } from "../ICmpState";

export class SttNeckRumble
implements ICmpState<CmpNeckController>
{
  constructor()
  {
    this.m_id = "rumble";

    this._m_gm = GameManager.GetInstance();

    this._m_start_position = new Phaser.Math.Vector2();
    
    this._m_direction = new Phaser.Math.Vector2();
    this._m_normal = new Phaser.Math.Vector2();
    
    this._m_time = 0.0;
    this._m_duration = 1.0;
    return;
  }

  setComponent(_component: CmpNeckController)
  : void 
  {
    this._m_control = _component;
    return;
  }

  getComponent()
  : CmpNeckController 
  {
    return this._m_control;
  }

  onEnter()
  : void 
  {
    let neckControl = this._m_control;

    // Capture Head position.

    this._m_start_position.setTo
    (
      neckControl.m_head.x,
      neckControl.m_head.y
    );

    // Set direction and normal.

    this._m_direction.setTo(0.0, 1.0);

    this._m_normal.setTo
    (
      this._m_direction.y,
      -this._m_direction.x
    );
    
    // Reset time.

    this._m_time = 0.0;
    return;
  }

  onExit()
  : void 
  {
    this._m_control.m_head.setPosition
    (
      this._m_start_position.x,
      this._m_start_position.y
    );

    return;
  }
  
  receive(_id: number, _obj: any)
  : void 
  {
    return;
  }

  update()
  : void 
  {
    let neckControl = this._m_control;
    let time = this._m_time + this._m_gm.m_dt;

    this._m_time = time;
    
    let fx : number = neckControl.waveFnX(5, 100, time, 0);

    neckControl.m_head.setPosition
    (
      this._m_start_position.x + (this._m_normal.x * fx),
      this._m_start_position.y + (this._m_normal.y * fx)
    );
    return;
  }

  destroy()
  : void 
  {
    this._m_control = null;
    this._m_gm = null;
    this._m_start_position = null;
    this._m_direction = null;

    return;
  }

  m_id: string;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_control : CmpNeckController;

  private _m_gm : GameManager;

  ///////////////////////////////////
  // Animation properties

  private _m_start_position : V2;

  private _m_direction : V2;

  private _m_normal : V2;

  private _m_time : number;

  private _m_duration : number;
}