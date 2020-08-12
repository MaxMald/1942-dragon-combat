/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpPhysicSpriteController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-12-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite, V3 } from "../commons/1942types";
import { IBaseComponent } from "./iBaseComponent";

export class CmpPhysicSpriteController
implements IBaseComponent<Ty_physicsSprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : CmpPhysicSpriteController
  {
    let controller = new CmpPhysicSpriteController();

    controller.m_id = DC_COMPONENT_ID.kPhysicSpriteController;

    return controller;
  }

  init(_actor: Ty_physicsActor)
  : void 
  {
    this._m_sprite = _actor.getWrappedInstance();
    return;
  }

  update(_actor : Ty_physicsActor)
  : void 
  { }

  receive(_id: number, _obj: any)
  : void 
  {
    switch(_id)
    {
      case DC_MESSAGE_ID.kToPosition :
      {
        let position = _obj as V3;

        this._m_sprite.setPosition(position.x, position.y);
      }  
      return;

      case DC_MESSAGE_ID.kAgentMove : 
      {
        let movement = _obj as V3;

        this._m_sprite.x += movement.x;
        this._m_sprite.y += movement.y;
      }
      return;
    }
  }

  destroy()
  : void 
  {
    if(this._m_sprite != null)
    {
      this._m_sprite.destroy();
      this._m_sprite = null;
    }
    return;
  }

  m_id: number;
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Private constructor.
   */
  private constructor()
  { }

  /**
   * Reference to the physic sprite.
   */
  private _m_sprite : Ty_physicsSprite;
}