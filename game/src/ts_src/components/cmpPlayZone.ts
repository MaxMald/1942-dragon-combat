/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Define a two dimensional zone where the actor can live. If it gets
 * outside the boundings it will be killed.
 *
 * @file cmpPlayZone.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-05-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Point, Ty_physicsSprite } from "../commons/1942types";
import { IBaseComponent } from "./iBaseComponent";

/**
 * Define a two dimensional zone where the actor can live. If it gets outside
 * the boundings it will be killed.
 */
export class CmpPlayZone implements IBaseComponent<Ty_physicsSprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  static Create()
  : CmpPlayZone
  {
    let playZone = new CmpPlayZone();

    playZone._m_p1 = new Phaser.Geom.Point();
    playZone._m_p2 = new Phaser.Geom.Point();

    playZone.m_id = DC_COMPONENT_ID.kPlayZone;

    return playZone;
  }
  
  init(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  { }

  /**
   * Define the play zone.
   * 
   * @param _x1 Point 1 of the rectangle zone : x.
   * @param _y1 Point 1 of the rectangle zone : y.
   * @param _x2 Point 2 of the rectangle zone : x.
   * @param _y2 Point 2 of the rectangle zone : y.
   */
  setBoundings( _x1 : number, _y1 : number, _x2 : number, _y2 : number)
  : void
  {
    this._m_p1.setTo(_x1, _y1);
    this._m_p2.setTo(_x2, _y2);
    return;
  }

  /**
   * Check if the actor is inside the play zone, if not thiw method will send a
   * "kill" message.
   * 
   * @param _actor actor.
   */
  update(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  {
    let sprite = _actor.getWrappedInstance();

    let p1 = this._m_p1;
    let p2 = this._m_p2;

    if((p1.x < sprite.x && sprite.x < p2.x) 
      && (p1.y < sprite.y && sprite.y < p2.y))
    {
      return;
    }

    _actor.sendMessage(DC_MESSAGE_ID.kKill, _actor);
    return;
  }

  receive(_id: number, _obj: any)
  : void 
  { }

  destroy()
  : void 
  { }

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
   * Rectangle area: point 1.
   */
  private _m_p1 : Point;

  /**
   * Rectange area : point 2.
   */
  private _m_p2 : Point;
  
}