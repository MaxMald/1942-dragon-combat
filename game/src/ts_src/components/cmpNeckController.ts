/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpNeckController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-04-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_Image, Ty_physicsActor, Ty_physicsSprite, Ty_Sprite, V2 } from "../commons/1942types";
import { CnfBalsaruIdle } from "../configObjects/cnfBalsaruIdle";
import { CnfBalsaruInit } from "../configObjects/cnfBalsaruInit";
import { GameManager } from "../gameManager/gameManager";
import { SttNeckIdle } from "../states/balsaruNeck.ts/sttNeckIlde";
import { IBaseState } from "../states/IBaseState";
import { NullState } from "../states/nullState";
import { cmpFSM } from "./cmpFSM";

export class CmpNeckController 
extends cmpFSM<Ty_physicsSprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
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
    _config : CnfBalsaruInit
  )
  : void
  {
    // Object properties.

    this.m_aNeckBalls = _aNeckBalls;
    this.m_head = _head;
    this.m_body = _body;
    this.m_config = _config;

    // Prepare animation properties

    this.m_time = 0;

    this._m_v_A = new Phaser.Math.Vector2();
    this._m_v_B = new Phaser.Math.Vector2();

    this.m_direction = new Phaser.Math.Vector2();

    this.m_aPosition_A = new Array<V2>();
    this.m_aPosition_B = new Array<V2>();
    this.m_aPosition_C = new Array<V2>();

    let index : number  = 0;

    let size : number = _config.num_neck_balls;

    while(index < size)
    {
      this.m_aPosition_A.push(new Phaser.Math.Vector2());
      this.m_aPosition_B.push(new Phaser.Math.Vector2());
      this.m_aPosition_C.push(new Phaser.Math.Vector2());

      ++index;
    }
    return;
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
    _aPosition : V2[] 
  )
  : void
  {
    let index : number = 0;

    let length : number = 0;

    while(index < _aPosition.length)
    {
      _aPosition[index].setTo
      (
        _start_position.x + _direction.x * length,
        _start_position.y + _direction.y * length 
      );

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
    _aPosition : V2[]
  )
  : void
  {
    // Perpendicular vector

    this.getNormal(_direction, this._m_v_A);

    let normal = this._m_v_A;

    let index : number = 0;

    let size = _aPosition.length;

    let length = 0;

    while(index < size)
    {
      
      this.getWavePosition
      (
        _direction,
        normal,
        _amplitude,
        _period,
        _time,
        length,
        _aPosition[index]
      );      

      _aPosition[index].setTo
      (
        _aPosition[index].x + _start_position.x,
        _aPosition[index].y + _start_position.y
      );

      length += _offset;

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
    _output : V2
  )
  : void
  {
    // Get the wave Y value.

    let fn_x = this.waveFnX(_amplitude, _period, _time, _offset);

    _output.setTo
    (
      _direction.x * _offset + (_normal.x * fn_x),
      _direction.y * _offset + (_normal.y * fn_x)  
    );

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
   * Re-position the neck ball to the given list of the positions.
   * 
   * Rotates each neck towards the vector from the previous ball position to the
   * itself. The first ball doen't has a previous position, thats the reason 
   * why it need a direction.
   * 
   * @param _direction_first the direction of the first ball.
   * @param _aPositions list of positions.
   */
  public setNeckBallPosition
  (
    _direction_first : V2, 
    _aPositions : V2[]
  )
  : void
  {
    let index : number = 0;

    let size : number = _aPositions.length;

    let aNeckBalls = this.m_aNeckBalls;

    let neckBall : Ty_Image;

    let vA = this._m_v_A;

    while(index < size)
    {

      neckBall = aNeckBalls[index];

      neckBall.setPosition
      (
        _aPositions[index].x,
        _aPositions[index].y
      );

      // Rotate the neck ball towards the vector from the previous position to
      // this neck ball position.

      if(index > 0)
      {
        // Rotate towards the vector from previous position to this neck ball
        // position. 

        vA.setTo
        (
          neckBall.x - _aPositions[index - 1].x,
          neckBall.y - _aPositions[index - 1].y
        );

        vA.normalize();

        neckBall.setAngle
        (
          Phaser.Math.RadToDeg(vA.angle())
        );
      }
      else
      {
        // Rotate towards neck direction.

        neckBall.setAngle
        (
          Phaser.Math.RadToDeg(_direction_first.angle())
        );
      }

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

  m_aPosition_A : V2[];

  m_aPosition_B : V2[];

  m_aPosition_C : V2[];

  m_direction : V2;
  
  m_aNeckBalls : Ty_Image[];

  m_actor : Ty_physicsActor;
  
  m_head : Ty_Sprite;

  m_body : Ty_Image;

  m_vecToHead : Phaser.Math.Vector2;

  m_config : CnfBalsaruInit;
  
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