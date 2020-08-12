/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file stateSpiderIdle.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-12-2020
 */

import { DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite } from "../commons/1942types";
import { CmpSpiderBossController } from "../components/cmpSpiderBossController";
import { IBaseState } from "./IBaseState";

export class StateSpiderIdle
implements IBaseState
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor
  (
    _spiderController : CmpSpiderBossController,
    _spiderSprite : Ty_physicsSprite
  )
  {
    this._m_spiderControl = _spiderController;
    this._m_sprite = _spiderSprite;
    this.m_id = "Spider_Idle";
    return;
  }

  onEnter()
  : void 
  { 
    this._m_sprite.setVisible(false);
    this._m_sprite.setActive(false);
    this._m_sprite.body.enable = false;
    return;
  }

  onExit()
  : void 
  { 
    this._m_sprite.setVisible(true);
    this._m_sprite.setActive(true);
    this._m_sprite.body.enable = true;
    return;
  }

  receive(_id: number, _obj: any)
  : void 
  { 
    if(_id == DC_MESSAGE_ID.kBossEnter)
    {
      this._m_spiderControl.setActive('Spider_Enter');
    }
    return;
  }
  
  update()
  : void 
  { }

  destroy()
  : void 
  { 
    this._m_spiderControl = null;
    this._m_sprite = null;

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
   * Spider sprite.
   */
  private _m_sprite : Ty_physicsSprite;
}