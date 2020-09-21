/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttNeckIlde.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-08-2020
 */

import { V2 } from "../../commons/1942types";
import { CmpNeckController } from "../../components/cmpNeckController";
import { CnfBalsaruIdle } from "../../configObjects/cnfBalsaruIdle";
import { GameManager } from "../../gameManager/gameManager";
import { ICmpState } from "../ICmpState";
import { NeckBallKey } from "./neckBallKey";

export class SttNeckIdle 
implements ICmpState<CmpNeckController>
{ 
  /****************************************************/
  /* Public                                           */
  /****************************************************/  

  constructor()
  {
    this.m_id = 'idle';

    this._m_gm = GameManager.GetInstance();
    
    this._m_direction = new Phaser.Math.Vector2();
    this._m_startPosition = new Phaser.Math.Vector2();

    this._m_v_A = new Phaser.Math.Vector2();
    this._m_v_B = new Phaser.Math.Vector2();

    this._m_neckKey = new NeckBallKey();
    
    return;
  }

  setup(_config : CnfBalsaruIdle)
  : void
  {
    this._m_config = _config;
    return;
  }

  onEnter()
  : void 
  {    
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
    // Get the Neck controller.

    let neckControl = this._m_controller;

    // Time

    let time : number = neckControl.m_time + this._m_gm.m_dt;
    neckControl.m_time = time;

    // Config 

    let config = this._m_config;

    // Balsaru body

    let body = neckControl.m_body;

    ///////////////////////////////////
    // Neck
    
    // Neck length

    let distance = config.length;

    let offset : number = distance / neckControl.m_config.num_neck_balls;    

    // Start position is from the position of balsaru body.

    let startPosition = this._m_startPosition.setTo(body.x, body.y);

    // Neck Direction

    let direction = this._m_direction.setTo(0.0, 1.0);

    // Formation A : Line Formation
    
    neckControl.getLineFormation
    (
      startPosition,
      direction,
      offset,
      neckControl.m_keys_A
    );    

    // Formation B : Wave formation.

    neckControl.getWaveFormation
    (
      startPosition,
      direction,
      offset,
      config.neck_amplitude,
      config.neck_period,
      time,
      neckControl.m_keys_B
    );

    /**
     * Get a new list of position, interpolated from Formation A (Linear) to 
     * Formation B (Wave). The interpolation starts from step 0.0 (Full Linear) 
     * to 1.0 (Full Wave).
     */ 

    let index : number = 0;

    let size : number = neckControl.m_config.num_neck_balls;

    while(index < size)
    {
      neckControl.neckKeyLinearInterpolation
      (
        neckControl.m_keys_A[index],
        neckControl.m_keys_B[index],
        (offset * index) / distance,
        neckControl.m_keys_C[index]
      );

      ++index;
    }

    /** 
     * Position neck balls according to the new list of positions. Rotate each
     * neck ball to produce a more natural effect.
    */

    neckControl.applyKeys(neckControl.m_keys_C);    

    ////////////////////////////////////
    // Balsaru Head

    let vA = this._m_v_A;

    // Head Position.

    let vB = this._m_v_B;

    neckControl.getNormal(direction, vA);

    neckControl.getWavePosition
    (
      direction, 
      vA, 
      config.neck_amplitude,
      config.neck_period,
      time,
      distance,
      this._m_neckKey
    );

    vB.setTo
    (
      this._m_neckKey.x + body.x,
      this._m_neckKey.y + body.y
    );

    neckControl.m_head.setPosition(vB.x, vB.y);
    
    return;
  }

  setComponent(_component: CmpNeckController)
  : void 
  {
    this._m_controller = _component;
    return;
  }

  getComponent()
  : CmpNeckController 
  {
    return this._m_controller;
  }

  destroy()
  : void 
  {
    this._m_controller = null;

    return;
  }

  m_id: string;
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  ///////////////////////////////////
  // Animation properties

  private _m_direction : V2;

  private _m_v_A : V2;

  private _m_v_B : V2;

  private _m_neckKey : NeckBallKey;

  private _m_startPosition : Phaser.Math.Vector2;

  ///////////////////////////////////
  // References

  private _m_config : CnfBalsaruIdle;

  private _m_controller : CmpNeckController;

  private _m_gm : GameManager;
}