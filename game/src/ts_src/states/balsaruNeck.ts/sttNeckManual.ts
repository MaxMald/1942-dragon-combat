/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file sttNeckShrink.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-09-2020
 */

import { V2 } from "../../commons/1942types";
import { CmpNeckController } from "../../components/cmpNeckController";
import { ICmpState } from "../ICmpState";

export class SttNeckManual
implements ICmpState<CmpNeckController>
{
  constructor()
  {
    this.m_id = "manual";

    this._m_headPosition = new Phaser.Math.Vector2();

    this._m_shipPosition = new Phaser.Math.Vector2();

    this._m_pivotPoint_A = new Phaser.Math.Vector2();

    this._m_pivotPoint_B = new Phaser.Math.Vector2();

    return;
  }

  setup()
  : void
  {    
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
    let neckControl = this._m_control; 

    let pA = this._m_pivotPoint_A;

    let pB = this._m_pivotPoint_B;

    // Get ship position.

    let shipPosition = this._m_shipPosition;

    let ship = neckControl.m_body;

    shipPosition.set(ship.x, ship.y);

    // Get head position.
    
    let headPosition = this._m_headPosition;

    let headSprite = neckControl.m_head;

    headPosition.set(headSprite.x, headSprite.y);

    // Calculate PA

    pA.set
    (
      shipPosition.x,
      shipPosition.y + 250
    );

    // Calculate PB
    
    pB.setTo
    (
      headPosition.x,
      headPosition.y - 200
    );

    // Bezier curve

    neckControl.getBezierFormation
    (
      shipPosition,
      pA,
      pB,
      headPosition,
      neckControl.m_keys_C
    );

    neckControl.applyKeys(neckControl.m_keys_C);

    return;
  }

  destroy()
  : void 
  {
    this._m_control = null;

    this._m_pivotPoint_A = null;
    this._m_pivotPoint_B = null;

    this._m_headPosition = null;
    this._m_shipPosition = null;
    return;
  }

  /**
   * The state identifier.
   */
  m_id: string;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the neck controller
   */
  private _m_control : CmpNeckController;  

  ///////////////////////////////////
  // Animation properties

  /**
   * The body position.
   */
  private _m_shipPosition : V2;

  /**
   * The position of the head.s
   */
  private _m_headPosition : V2;

  ///////////////////////////////////
  // Physics properties

  /**
   * Bezier curve point A
   */
  private _m_pivotPoint_A : V2;

  /**
   * Bezier curve point B
   */
  private _m_pivotPoint_B : V2;
}