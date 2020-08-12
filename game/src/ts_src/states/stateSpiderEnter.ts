/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file stateSpiderEnter.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-12-2020
 */

import { Ty_physicsSprite } from "../commons/1942types";
import { CmpSpiderBossController } from "../components/cmpSpiderBossController";
import { GameManager } from "../gameManager/gameManager";
import { IBaseState } from "./IBaseState";

export class StateSpiderEnter
implements IBaseState
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor
  (
    _spiderController : CmpSpiderBossController,
    _spiderSprite : Ty_physicsSprite,
    _gameManager : GameManager
  )
  {
    this._m_spiderControl = _spiderController;
    this._m_spider = _spiderSprite;
    this._m_gameManager = _gameManager;
    this.m_id = "Spider_Enter";
    return;
  }

  onEnter()
  : void 
  { }

  onExit()
  : void 
  { }

  receive(_id: number, _obj: any)
  : void 
  { }

  update()
  : void 
  { 
    let sprite = this._m_spider;

    let toPosition = new Phaser.Math.Vector2
    (
      540.0 - sprite.x,
      350.0 - sprite.y
    );

    let mag = toPosition.length();
    if(mag > 0.1)
    {
      let dist = this._m_gameManager.m_dt * this._m_spiderControl.getSpeed();
      if(mag > dist)
      {
        toPosition.normalize();
        
        toPosition.x *= dist;
        toPosition.y *= dist;
      }

      sprite.x += toPosition.x;
      sprite.y += toPosition.y;
    }
    else
    {
      this._m_spiderControl.setActive("Spider_Attack");
    }
    return;
  }

  destroy()
  : void 
  { 
    this._m_spiderControl = null;
    this._m_gameManager = null;
    this._m_spider = null;

    return;
  }
  
  m_id: string;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Spider controller.
   */
  private _m_spiderControl : CmpSpiderBossController;

  /**
   * Reference to the game manager.
   */
  private _m_gameManager : GameManager;

  /**
   * Spider sprite.
   */
  private _m_spider : Ty_physicsSprite;
}