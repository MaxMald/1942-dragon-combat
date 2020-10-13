/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttBalsaruIn.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-23-2020
 */

import { DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_Image, V2 } from "../../commons/1942types";
import { CmpBalsaruController } from "../../components/cmpBalsaruControllert";
import { GameManager } from "../../gameManager/gameManager";
import { ICmpState } from "../ICmpState";

/**
 * Balsaru go out of scene.
 */
export class SttBalsaruIn
implements ICmpState<CmpBalsaruController>
{

  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    this.m_id = 'in';
    
    this._m_gm = GameManager.GetInstance();
    
    this._m_duration = 2.0;

    this._m_desirePosition = new Phaser.Math.Vector2();

    this._m_headDestination = new Phaser.Math.Vector2();

    this._m_translation = new Phaser.Math.Vector2();

    this._m_headPosition = new Phaser.Math.Vector2();
    
    this._m_start = new Phaser.Math.Vector2();
    
    return;
  }

  setComponent(_component: CmpBalsaruController)
  : void 
  {
    this._m_cmp = _component;

    return;
  }

  getComponent()
  : CmpBalsaruController 
  {
    return this._m_cmp;
  }

  setDesirePosition(_x : number, _y : number)
  : void
  {
    this._m_desirePosition.setTo(_x, _y);
    return;
  }

  setDuration(_seconds : number)
  : void
  {
    this._m_duration = _seconds;
    return;
  }

  onEnter()
  : void 
  {
    // Reset time.

    this._m_time = 0.0;

    // Set the desire position.

    let ship : Ty_Image = this._m_cmp.m_shipSprite;

    this._m_desirePosition.setTo
    (
      this._m_cmp.m_scene.game.canvas.width * 0.5,
      ship.height * 0.5
    );   

    this._m_start.setTo(ship.x, ship.y);

    // Get the vector to the desire position.    

    this._m_translation.setTo
    (
      this._m_desirePosition.x - ship.x,
      this._m_desirePosition.y - ship.y
    );

    // Set Neck State.

    this._m_cmp.m_head.sendMessage
    (
      DC_MESSAGE_ID.kSetNeckState,
      'manual'
    );

    // Force Controller

    let forceController = this._m_cmp.m_forceController;

    forceController.setSpeed(500);

    let direction : V2 = forceController.getDirection();

    direction.set(0.0, 1.0);

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
    // clock

    this._m_time += this._m_gm.m_dt;
    
    let time = this._m_time;

    let shipSprite = this._m_cmp.m_shipSprite;

    ///////////////////////////////////
    // Ship Movement

    if(time > this._m_duration)
    {
      // Next state.

      this._m_cmp.setActiveState('idle');
    }
    else
    {
      // Move Balsaru out of scene.

      let step = time / this._m_duration;

      step = -Math.pow(step - 1, 2) + 1;
      
      let ship = this._m_cmp.m_ship.getWrappedInstance();

      // destination 

      let desirePosition : V2 = this._m_desirePosition;

      desirePosition.set
      (
        this._m_start.x + this._m_translation.x * step,
        this._m_start.y + this._m_translation.y * step
      );      

      ship.incXY
      (
        desirePosition.x - shipSprite.x,
        desirePosition.y - shipSprite.y
      );
    }

    ///////////////////////////////////
    // Head Desire Position

    let headDestination = this._m_headDestination;

    let neck_len = this._m_cmp.m_headConfig.neck_length;

    headDestination.set
    (
      shipSprite.x, 
      shipSprite.y + neck_len
    );

    let headPosition = this._m_headPosition;

    let headSprite = this._m_cmp.m_head.getWrappedInstance();

    headPosition.set(headSprite.x, headSprite.y);

    this._m_cmp.m_forceController.arrive
    (
      headDestination,
      headPosition,
      500
    );

    return;
  }

  destroy()
  : void 
  {
    this._m_gm = null;
    
    this._m_cmp = null;

    this._m_start = null;

    this._m_desirePosition = null;
    
    this._m_translation = null;

    return;
  }

  m_id: string;
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Elapsed time since this state start.
   */
  private _m_time : number;

  /**
   * The state duration.
   */
  private _m_duration : number;

  /**
   * The desire position of the ship.
   */
  private _m_desirePosition : V2;

  /**
   * The desire position fo the head.
   */
  private _m_headDestination : V2;

  /**
   * The head position.
   */
  private _m_headPosition : V2;

  /**
   * The vector from the start position to the desire position.
   */
  private _m_translation : V2;

  /**
   * The start position of the ship.
   */
  private _m_start : V2;

  /**
   * Reference to the game manager.
   */
  private _m_gm : GameManager;

  /**
   * Reference to the balsaru controller.
   */
  private _m_cmp : CmpBalsaruController;
}