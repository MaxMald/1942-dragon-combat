/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttNeckShrink.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-09-2020
 */

import { DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_Image, V2 } from "../../commons/1942types";
import { CmpNeckController } from "../../components/cmpNeckController";
import { CnfBalsaruShrink } from "../../configObjects/cnfBalsaruShrink";
import { GameManager } from "../../gameManager/gameManager";
import { ICmpState } from "../ICmpState";
import { NeckBallKey } from "./neckBallKey";

export class SttNeckShrink
implements ICmpState<CmpNeckController>
{
  constructor()
  {
    this.m_id = "shrink";

    this._m_gm = GameManager.GetInstance();

    this._m_start_position = new Phaser.Math.Vector2();
    this._m_direction = new Phaser.Math.Vector2();
    this._m_time = 0.0;

    this._m_keyA = new NeckBallKey();
    this._m_keyB = new NeckBallKey();
    this._m_keyC = new NeckBallKey();

    return;
  }

  setup(_config : CnfBalsaruShrink)
  : void
  {
    this._m_config = _config;
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

    this._m_start_position.setTo
    (
      neckControl.m_body.x,
      neckControl.m_body.y
    );

    this._m_direction.setTo(0.0, 1.0);
    
    this._m_time = 0.0;

    // Capture the actual position and Neck Ball state    

    neckControl.captureNeck(neckControl.m_keys_A);

    // Get the distance.

    neckControl.getLineFormation
    (
      this._m_start_position,
      this._m_direction,
      this._m_config.length / (neckControl.m_config.num_neck_balls + 1),
      neckControl.m_keys_B
    );

    // Capture head.

    this._m_keyA.set
    (
      neckControl.m_head.x,
      neckControl.m_head.y,
      1.0,
      1.0,
      0
    );

    // Desire Head transform.

    this._m_keyB.set
    (
      this._m_start_position.x + (this._m_direction.x * this._m_config.length),
      this._m_start_position.y + (this._m_direction.y * this._m_config.length),
      1.0,
      1.0,
      0
    );

    return;
  }

  onExit()
  : void 
  {
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
    
    this._m_time += this._m_gm.m_dt;
    let time = this._m_time;

    if(time < this._m_config.time)
    {
      let step : number = time / this._m_config.time;

      let neckControl = this._m_control;

      neckControl.neckKeyArrayLinearInterpolation
      (
        neckControl.m_keys_A,
        neckControl.m_keys_B,
        step,
        neckControl.m_keys_C
      );

      neckControl.applyKeys(neckControl.m_keys_C);

      // Head.

      let keyC = this._m_keyC;

      neckControl.neckKeyLinearInterpolation
      (
        this._m_keyA, 
        this._m_keyB, 
        step, 
        this._m_keyC
      );

      neckControl.m_head.setPosition
      (
        keyC.x,
        keyC.y
      );
    }
    else
    {
      this._m_control.m_actor.sendMessage
      (
        DC_MESSAGE_ID.kSetNeckState,
        'rumble'
      );
    }
    return;
  }

  destroy()
  : void 
  {
    this._m_control = null;
    this._m_config = null;
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

  private _m_config : CnfBalsaruShrink;

  private _m_gm : GameManager;

  ///////////////////////////////////
  // Animation properties

  private _m_start_position : V2;

  private _m_direction : V2;

  private _m_time : number;

  private _m_keyA : NeckBallKey;

  private _m_keyB : NeckBallKey;

  private _m_keyC : NeckBallKey;
}