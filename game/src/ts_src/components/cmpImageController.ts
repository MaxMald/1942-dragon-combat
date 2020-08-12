/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpImageController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-10-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_Image, V3 } from "../commons/1942types";
import { IBaseComponent } from "./iBaseComponent";

export class CmpImageController 
implements IBaseComponent<Ty_Image>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  static Create()
  : CmpImageController
  {
    let controller = new CmpImageController();

    controller.m_id = DC_COMPONENT_ID.kImageController;

    return controller;
  }

  init(_actor: BaseActor<Ty_Image>)
  : void 
  {
    this._m_image = _actor.getWrappedInstance();
    return;
  }

  update(_actor: BaseActor<Ty_Image>)
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
        this._m_image.setPosition(position.x, position.y);
      }

      return;

      case DC_MESSAGE_ID.kAgentMove :

      {
        let move = _obj as V3;
        
        this._m_image.x += move.x;
        this._m_image.y += move.y;
      }

      return;

      case DC_MESSAGE_ID.kShow :

      this._m_image.setVisible(true);
      this._m_image.setActive(true);

      return;

      case DC_MESSAGE_ID.kClose : 

      this._m_image.setVisible(false);
      this._m_image.setActive(false);

      return;
    }
    return;
  }

  destroy()
  : void 
  {
    this._m_image.destroy();
    this._m_image = null;
    
    return;
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the image.
   */
  _m_image : Ty_Image;
}