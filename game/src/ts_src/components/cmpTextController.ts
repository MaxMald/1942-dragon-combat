/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpTextController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-06-2020
 */

import { IBaseComponent } from "./iBaseComponent";
import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_Text, V3 } from "../commons/1942types";

export class CmpTextController 
implements IBaseComponent<Ty_Text>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  static Create()
  : CmpTextController
  {
    let controller = new CmpTextController();

    controller.m_id = DC_COMPONENT_ID.kTextController;

    return controller;
  }
  
  init(_actor: BaseActor<Phaser.GameObjects.Text>)
  : void 
  {
    this._m_text = _actor.getWrappedInstance();
    return;
  }

  update(_actor: BaseActor<Phaser.GameObjects.Text>)
  : void 
  { }

  receive(_id: number, _obj: any)
  : void 
  {
    switch(_id)
    {
      case DC_MESSAGE_ID.kSetText :

        this._m_text.text = _obj as string;
      
      return;

      case DC_MESSAGE_ID.kToPosition :

      {
        let position = _obj as V3;

        this._m_text.setPosition(position.x, position.y);
      }

      return;
      
      case DC_MESSAGE_ID.kAgentMove :

      {
        let movement = _obj as V3;
        let text = this._m_text;

        text.x += movement.x;
        text.y += movement.y;
      }

      return;
    }
  }

  destroy()
  : void 
  {
    this._m_text = null;
    return;
  }

  m_id: number;
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
 
  /**
   * Private contructor.
   */
  private constructor()
  { }

  /**
   * Reference to the text.
   */
  private _m_text : Ty_Text;
}