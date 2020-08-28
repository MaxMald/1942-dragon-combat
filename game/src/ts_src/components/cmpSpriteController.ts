/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpSpriteController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-27-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_Sprite, V3 } from "../commons/1942types";
import { IBaseComponent } from "./iBaseComponent";

export class CmpSpriteController 
implements IBaseComponent<Ty_Sprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  static Create()
  : CmpSpriteController
  {
    let controller = new CmpSpriteController();

    controller.m_id = DC_COMPONENT_ID.kSpriteController;

    return controller;
  }

  init(_actor: BaseActor<Ty_Sprite>)
  : void 
  {
    this._m_sprite = _actor.getWrappedInstance();
    return;
  }

  update(_actor: BaseActor<Ty_Sprite>)
  : void 
  {
    return;
  }

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
        let move = _obj as V3;
        
        this._m_sprite.x += move.x;
        this._m_sprite.y += move.y;
      }
      return;

      case DC_MESSAGE_ID.kSetAngle:

      this._m_sprite.setAngle(_obj as number);
      return;

      case DC_MESSAGE_ID.kSetTexture:

      this._m_sprite.setTexture(_obj as string);
      return;

      case DC_MESSAGE_ID.kShow :

      this._active();
      return;

      case DC_MESSAGE_ID.kClose : 

      this._desactive();
      return;

      case DC_MESSAGE_ID.kDesactive:

      this._desactive();
      return;

      case DC_MESSAGE_ID.kActive:

      this._active();
      return;
    }
    return;
  }

  destroy()
  : void 
  {
    this._m_sprite.destroy();
    this._m_sprite = null;
    
    return;
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _desactive()
  : void
  {
    this._m_sprite.setActive(false);
    this._m_sprite.setVisible(false);
    return;
  }

  private _active()
  : void
  {
    this._m_sprite.setActive(true);
    this._m_sprite.setVisible(true);
    return;
  }
  
  /**
   * Reference to the image.
   */
  _m_sprite : Ty_Sprite;
}