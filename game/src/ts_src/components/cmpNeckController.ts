/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpNeckController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-04-2020
 */

import { DC_CONFIG, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_Image, Ty_physicsActor, Ty_physicsSprite, Ty_Sprite, V2, V3 } from "../commons/1942types";
import { CnfBalsaruIdle } from "../configObjects/cnfBalsaruIdle";
import { CnfBalsaruInit } from "../configObjects/cnfBalsaruInit";
import { CnfBalsaruShrink } from "../configObjects/cnfBalsaruShrink";
import { GameManager } from "../gameManager/gameManager";
import { NeckBallKey } from "../states/balsaruNeck.ts/neckBallKey";
import { SttNeckIdle } from "../states/balsaruNeck.ts/sttNeckIlde";
import { SttNeckFollow } from "../states/balsaruNeck.ts/sttNeckFollow";
import { SttNeckEvade } from "../states/balsaruNeck.ts/sttNeckEvade";
import { SttNeckRumble } from "../states/balsaruNeck.ts/sttNeckRumble";
import { SttNeckShrink } from "../states/balsaruNeck.ts/sttNeckShrink";
import { IBaseState } from "../states/IBaseState";
import { NullState } from "../states/nullState";
import { cmpFSM } from "./cmpFSM";
import { CnfBalsaruHead } from "../configObjects/cnfBalsaruHead";

export class CmpNeckController 
extends cmpFSM<Ty_physicsSprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create(_scene : Phaser.Scene)
  : CmpNeckController
  {
    let cmp = new CmpNeckController();

    cmp.m_vecToHead = new Phaser.Math.Vector2();
    cmp.m_time = 0;

    cmp._m_hStates = new Map<string, IBaseState>();
    cmp._m_active_state = NullState.GetInstance();

    ///////////////////////////////////
    // Neck States

    let gameManger = GameManager.GetInstance();
    let levelConfig = gameManger.getLevelConfiguration();
    
    // Idle state

    let idle = new SttNeckIdle();

    let idle_config = levelConfig.getConfig<CnfBalsaruIdle>
    (
      DC_CONFIG.kBalsaruIdle
    );

    idle.setup(idle_config);
    idle.setComponent(cmp);

    cmp.addState(idle);

    // Shrink State

    let shrink = new SttNeckShrink();

    let shrink_config = levelConfig.getConfig<CnfBalsaruShrink>
    (
      DC_CONFIG.kBalsaruShrink
    );

    shrink.setup(shrink_config);
    shrink.setComponent(cmp);

    cmp.addState(shrink);

    // Rumble State

    let rumble = new SttNeckRumble();

    rumble.setComponent(cmp);

    cmp.addState(rumble);

    // Follow State

    let follow = new SttNeckFollow();

    follow.setComponent(cmp);
    follow.setup();

    cmp.addState(follow);

    // Evade State

    let evade = new SttNeckEvade();

    evade.setComponent(cmp);
    evade.setup(_scene);

    cmp.addState(evade);

    // Set active state.

    cmp.setActiveState('idle');
    return cmp;
  }

  init(_actor: Ty_physicsActor)
  : void 
  {
    this.m_actor = _actor;
    this._m_gm = GameManager.GetInstance();
    return;
  }

  setup
  (
    _head : Ty_Sprite, 
    _body : Ty_Image, 
    _aNeckBalls : Ty_Image[],
    _config : CnfBalsaruInit,
    _headConfig : CnfBalsaruHead
  )
  : void
  {
    // Object properties.

    this.m_aNeckBalls = _aNeckBalls;
    this.m_head = _head;
    this.m_body = _body;

    this.m_config = _config;
    this.m_headConfig = _headConfig;

    // Prepare animation properties

    this.m_time = 0;

    this._m_v_A = new Phaser.Math.Vector2();
    this._m_v_B = new Phaser.Math.Vector2();

    this.m_direction = new Phaser.Math.Vector2();

    this.m_keys_A = new Array<NeckBallKey>();
    this.m_keys_B = new Array<NeckBallKey>();
    this.m_keys_C = new Array<NeckBallKey>();

    let index : number  = 0;

    let size : number = _config.num_neck_balls;

    while(index < size)
    {
      this.m_keys_A.push(new NeckBallKey());
      this.m_keys_B.push(new NeckBallKey());
      this.m_keys_C.push(new NeckBallKey());

      ++index;
    }
    return;
  }

  receive(_id : number, _msg : any)
  : void
  {    
    switch(_id)
    {
      case DC_MESSAGE_ID.kSetNeckState:

      this.setActiveState(_msg as string);
      return;

      default:
      return;
    }
  }

  destroy()
  : void 
  {
    
    super.destroy();
    return;
  }
  
  /**
   * Get an array of position in line formation (for Neck balls).
   *     
   *  X = = = = = = = = = = = = = = = = = > 
   * 
   * @param _start_position start position, of body position. 
   * @param _direction direction to head.
   * @param _offset offset (distance between head and body / num of neck balls).
   * @param _aPosition array of position to output positions.
   */
  public getLineFormation
  (
    _start_position : V2,
    _direction : V2, 
    _offset : number,
    _aKeys : NeckBallKey[] 
  )
  : void
  {
    let index : number = 0;

    let length : number = 0;

    let maxLength : number = _aKeys.length * _offset;

    let key : NeckBallKey;

    while(index < _aKeys.length)
    {
      key = _aKeys[index];

      key.x = _start_position.x + _direction.x * length;
      key.y = _start_position.y + _direction.y * length;

      key.angle = Phaser.Math.RadToDeg(_direction.angle());

      key.scale_x = this.linearInterpolation(1.0, 0.6, length / maxLength);
      key.scale_y = key.scale_x;

      length += _offset;

      ++index;
    }
    return;
  }

  /**
   * Get an array of position in wave formation (for Neck balls).
   * 
   *     ==           ==
   *    =   =       =   =
   *   =     =     =     = >
   *          =  =
   *           ==
   * 
   * @param _start_position start position, of body position. 
   * @param _direction direction to head.
   * @param _offset offset (distance between head and body / num of neck balls).
   * @param _amplitude wave amplitude
   * @param _period wave period
   * @param _time time factor.
   * @param _aPosition array of position to output positions.
   */
  public getWaveFormation
  (
    _start_position : V2,
    _direction : V2,
    _offset : number,
    _amplitude : number,
    _period : number,
    _time : number,
    _aKeys : NeckBallKey[] 
  )
  : void
  {
    // Perpendicular vector

    this.getNormal(_direction, this._m_v_A);

    let normal = this._m_v_A;

    let index : number = 0;

    let size = _aKeys.length;

    let length = 0;

    let vA = this._m_v_B;

    let key : NeckBallKey;

    let maxLength : number = _aKeys.length * _offset;

    while(index < size)
    {
      key = _aKeys[index];

      this.getWavePosition
      (
        _direction,
        normal,
        _amplitude,
        _period,
        _time,
        length,
        key
      );      

      key.x = key.x + _start_position.x;
      key.y = key.y + _start_position.y; 

      length += _offset;

      // Angle

      if(index > 0)
      {
        vA.x = key.x - _aKeys[index - 1].x;
        vA.y = key.y - _aKeys[index - 1].y;

        key.angle = Phaser.Math.RadToDeg(vA.angle());
      }
      else
      {
        key.angle = Phaser.Math.RadToDeg(_direction.angle());
      }

      // Scale

      key.scale_x = this.linearInterpolation(1.0, 0.6, length / maxLength);
      key.scale_y = key.scale_x;

      ++index;
    }

    return;
  }

  /**
   * Get a position in the Wave position, using the waveFnX method.
   * 
   * @param _direction The direction of the wave.
   * @param _normal The perpendicular vector to the wave direction.
   * @param _amplitude wave amplitude.
   * @param _period wave period.
   * @param _time time.
   * @param _offset wave offset.
   * @param _output output vector.
   */
  public getWavePosition
  (
    _direction : V2,
    _normal : V2,
    _amplitude : number,
    _period : number,
    _time : number,
    _offset : number,
    _output : NeckBallKey
  )
  : void
  {
    // Get the wave Y value.

    let fn_x = this.waveFnX(_amplitude, _period, _time, _offset);

    _output.x = _direction.x * _offset + (_normal.x * fn_x);
    _output.y = _direction.y * _offset + (_normal.y * fn_x);
    return;
  }

  /**
   * Sin function, used for the wave movement.
   * 
   * @param _amplitude wave amplitude
   * @param _period wave period.
   * @param _time time.
   * @param _offset wave offset.
   */
  public waveFnX
  (
    _amplitude : number, 
    _period : number, 
    _time : number, 
    _offset : number
  )
  : number
  {
    return _amplitude * Math.sin(_period * (_time + _offset));
  }

  /**
   * 
   * @param _bodyPoint 
   * @param _p1 
   * @param _p2 
   * @param _headPoint 
   * @param _aKeys 
   */
  getBezierFormation
  (
    _bodyPoint : V2, 
    _p1 : V2, 
    _p2 : V2, 
    _headPoint : V2,
    _aKeys : NeckBallKey[]
  )
  {
    let index : number = 0;

    let size : number = _aKeys.length;

    let key : NeckBallKey;

    let t : number;

    let vA = this._m_v_A;

    while(index < _aKeys.length)
    {
      key = _aKeys[index];

      t = index / size;

      this.getBezierPosition
      (
        _bodyPoint,
        _p1,
        _p2,
        _headPoint,
        t,
        key
      );

      // Key Angle

      if(index > 0)
      {
        vA.x = key.x - _aKeys[index - 1].x;
        vA.y = key.y - _aKeys[index - 1].y;

        key.angle = Phaser.Math.RadToDeg(vA.angle());
      }
      else
      {
        vA.setTo
        (
          _p1.x - _bodyPoint.x,
          _p1.y - _bodyPoint.y
        );

        key.angle = Phaser.Math.RadToDeg(vA.angle());
      }

      // Key Scale

      key.scale_x = this.linearInterpolation(1.0, 0.6, t);
      key.scale_y = key.scale_x;

      ++index;
    }
    return;
  }

  /**
   * Get a position from a bezier curve.
   * 
   * @param _p0 
   * @param _p1 
   * @param _p2 
   * @param _p3 
   * @param _t 
   * @param _output 
   */
  getBezierPosition
  (
    _p0 : V2, 
    _p1 : V2, 
    _p2 : V2, 
    _p3 : V2, 
    _t : number,
    _output : NeckBallKey
  )
  : void
  {
    // Calculate Q0

    let l0_x : number = this.linearInterpolation(_p0.x, _p1.x, _t);
    let l0_y : number = this.linearInterpolation(_p0.y, _p1.y, _t);

    let l1_x : number = this.linearInterpolation(_p1.x, _p2.x, _t);
    let l1_y : number = this.linearInterpolation(_p1.y, _p2.y, _t);

    let q0_x : number = this.linearInterpolation(l0_x, l1_x, _t);
    let q0_y : number = this.linearInterpolation(l0_y, l1_y, _t);

    // Calculate Q1

    let l2_x : number = this.linearInterpolation(_p2.x, _p3.x, _t);
    let l2_y : number = this.linearInterpolation(_p2.y, _p3.y, _t);
    
    let q1_x : number = this.linearInterpolation(l1_x, l2_x, _t);
    let q1_y : number = this.linearInterpolation(l1_y, l2_y, _t);

    _output.x = this.linearInterpolation(q0_x, q1_x, _t);
    _output.y = this.linearInterpolation(q0_y, q1_y, _t);
    return;
  }

  /**
   * 
   * @param _keys 
   */
  public applyKeys(_keys : NeckBallKey[])
  : void
  {
    let index = 0;

    let size = _keys.length;

    let aNeckBalls = this.m_aNeckBalls;

    while(index < size)
    {
      _keys[index].apply(aNeckBalls[index]);
      ++index;
    }
    return;
  }

  /**
   * Get the vector interpolation.
   * 
   * @param _vA vector a. 
   * @param _vB vector b.
   * @param _step step (0.0 - 1.0)
   * @param _vO output vector.
   */
  public vecInterpolation(_vA : V2, _vB : V2, _step : number, _vO : V2)
  : void
  {
    _vO.setTo
    (
      _vA.x + (_vB.x - _vA.x) * _step,
      _vA.y + (_vB.y - _vA.y) * _step,
    );
    return;
  }

  /**
   * Interpolate an array of neck keys.
   * 
   * @param _A from. 
   * @param _B to.
   * @param _step step (0.0 - 1.0).
   * @param _output output.
   */
  public neckKeyArrayLinearInterpolation
  (
    _A : NeckBallKey[],
    _B : NeckBallKey[],
    _step : number,
    _output : NeckBallKey[]
  )
  : void
  {
    let index = 0;

    let size : number = _output.length;

    while(index < size)
    {      
      this.neckKeyLinearInterpolation
      (
        _A[index],
        _B[index],
        _step,
        _output[index]
      );

      ++index;
    }
    return;
  }

  /**
   * Interpolate neck keys.
   * 
   * @param _A from. 
   * @param _B to.
   * @param _step step (0.0 - 1.0).
   * @param _output output.
   */
  public neckKeyLinearInterpolation
  (
    _A : NeckBallKey, 
    _B : NeckBallKey,
    _step : number, 
    _output : NeckBallKey
  )
  : void
  {
    _output.x = this.linearInterpolation(_A.x, _B.x, _step);
    _output.y = this.linearInterpolation(_A.y, _B.y, _step);

    _output.scale_x = this.linearInterpolation(_A.scale_x, _B.scale_x, _step);
    _output.scale_y = this.linearInterpolation(_A.scale_y, _B.scale_y, _step);
    
    _output.angle = this.linearInterpolation(_A.angle, _B.angle, _step);
    return;
  }

  public captureNeck(_akey : NeckBallKey[])
  : void
  {
    let index = 0;

    let size = _akey.length;

    let aNeckBalls = this.m_aNeckBalls;

    while(index < size)
    {
      _akey[index].capture(aNeckBalls[index]);

      ++index;
    }
    return;
  }

  /**
   * Linear interpolation
   * 
   * @param _a from. 
   * @param _b to.
   * @param _step (0.0 - 1.0).
   */
  public linearInterpolation(_a : number, _b : number, _step : number)
  : number
  {
    return _a + (_b - _a) * _step;
  }

  /**
   * Get the normal vector.
   * 
   * @param _vA vector. 
   * @param _vOutput normal vector.
   */
  public getNormal(_vA : V2, _vOutput : V2)
  : void
  {
    _vOutput.setTo(_vA.y, -_vA.x);
    return;
  }

  m_id: number;

  ///////////////////////////////////
  // Animation properties

  m_keys_A : NeckBallKey[];

  m_keys_B : NeckBallKey[];

  m_keys_C : NeckBallKey[];

  m_direction : V2;
  
  m_aNeckBalls : Ty_Image[];

  m_actor : Ty_physicsActor;
  
  m_head : Ty_Sprite;

  m_body : Ty_Image;

  m_vecToHead : Phaser.Math.Vector2;

  m_config : CnfBalsaruInit;

  m_headConfig : CnfBalsaruHead;
  
  m_time : number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  ///////////////////////////////////
  // Animation Properties (Private)
  
  private _m_v_A : V2;

  private _m_v_B : V2;  

  private _m_gm : GameManager;
}