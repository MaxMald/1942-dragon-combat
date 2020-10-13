/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpGroupController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since October-05-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { V3 } from "../commons/1942types";
import { IBaseComponent } from "./iBaseComponent";

export class CmpGroupController 
implements IBaseComponent<Phaser.GameObjects.Group>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  static Create()
  : CmpGroupController
  {
    let controller = new CmpGroupController();

    controller.m_id = DC_COMPONENT_ID.kGroupController;

    return controller;
  }

  init(_actor: BaseActor<Phaser.GameObjects.Group>)
  : void 
  {
    this._m_group = _actor.getWrappedInstance();
    return;
  }

  update(_actor: BaseActor<Phaser.GameObjects.Group>)
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
        this._m_group.setXY(position.x, position.y);
      }

      return;

      case DC_MESSAGE_ID.kAgentMove :

      {
        let move = _obj as V3;
        
        this._m_group.incXY(move.x, move.y);
      }
      return;

      case DC_MESSAGE_ID.kSetAngle:

      this._m_group.angle(_obj as number);
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
    this._m_group.destroy();
    this._m_group = null;
    
    return;
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _desactive()
  : void
  {
    this._m_group.setActive(false);
    this._m_group.setVisible(false);
    return;
  }

  private _active()
  : void
  {
    this._m_group.setActive(true);
    this._m_group.setVisible(true);
    return;
  }
  
  /**
   * Reference to the image.
   */
  _m_group : Phaser.GameObjects.Group;
}