/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpSpiderBossController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-12-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID } from "../commons/1942enums";
import { Ty_physicsSprite } from "../commons/1942types";
import { GameManager } from "../gameManager/gameManager";
import { IBaseState } from "../states/IBaseState";
import { NullState } from "../states/nullState";
import { StateSpiderAttack } from "../states/stateSpiderAttack";
import { StateSpiderEnter } from "../states/stateSpiderEnter";
import { StateSpiderIdle } from "../states/stateSpiderIdle";
import { IBaseComponent } from "./iBaseComponent";

export class CmpSpiderBossController
implements IBaseComponent<Ty_physicsSprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    this.m_id = DC_COMPONENT_ID.kSpiderBossController;
    return;
  }

  init(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  { 
    this.destroy();

    this._m_speed = 200.0;
    this._m_gameManager = GameManager.GetInstance();

    // Create the states map.

    this._hStates = new Map<string, IBaseState>();

    // Idle State

    let idleState = new StateSpiderIdle(this, _actor.getWrappedInstance());
    this._hStates.set(idleState.m_id, idleState);

    // Enter State

    let enterState = new StateSpiderEnter
    (
      this, 
      _actor.getWrappedInstance(),
      GameManager.GetInstance()
    );
    this._hStates.set(enterState.m_id, enterState);

    // Attack State

    let attackState = new StateSpiderAttack();
    this._hStates.set(attackState.m_id, attackState);

    // Set default state

    this.setActive("Spider_Idle");

    return;
  }

  update(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  {
    this._activeState.update();
    return;
  }

  receive(_id: number, _obj: any)
  : void 
  {
    this._activeState.receive(_id, _obj);
    return;
  }

  setActive(_stateID : string)
  : void
  {
    if(this._hStates.has(_stateID))
    {
      let active = this._activeState;
      active.onExit();

      active = this._hStates.get(_stateID);
      active.onEnter();

      this._activeState = active;
    }
    return;
  }

  setSpeed(_speed : number)
  : void
  {
    this._m_speed = _speed;
    return;
  }

  getSpeed()
  : number
  {
    return this._m_speed;
  }

  destroy()
  : void 
  {
    if(this._hStates != null)
    {
      this._hStates.forEach
      (
        function(_state : IBaseState)
        : void
        {
          _state.destroy();
        }
      );

      this._hStates.clear();
      this._hStates = null;
    }    

    this._activeState = NullState.GetInstance();
    this._m_gameManager = null;
    return;
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Active state.
   */
  private _activeState : IBaseState;

  /**
   * State map.
   */
  private _hStates : Map<string, IBaseState>;

  /**
   * Spider speed in pix/sec.
   */
  private _m_speed : number;

  /**
   * Reference to the game manager.
   */
  private _m_gameManager : GameManager;
}