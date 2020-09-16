/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpImageInteractive.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-03-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_Image } from "../commons/1942types";
import { msgInputEvent } from "../messages/msgInputEvent";
import { IBaseComponent } from "./iBaseComponent";

export class CmpImageInteractive 
implements IBaseComponent<Ty_Image>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  static Create()
  : CmpImageInteractive
  {
    let component : CmpImageInteractive = new CmpImageInteractive();

    component.m_id = DC_COMPONENT_ID.kCmpImageInteractive;
    component._sharedMessage = new msgInputEvent();

    return component;
  }
  
  init(_actor: BaseActor<Ty_Image>)
  : void 
  {
    let image = _actor.getWrappedInstance();
    this._actor = _actor;

    image.setInteractive();
    
    image.on('pointerdown', this._onPointerDown, this);
    image.on('pointerup', this._onPointerUp, this);
    image.on('pointermove', this._onPointerMove, this);
    image.on('pointerover', this._onPointerOver, this);
    image.on('pointerout', this._onPointerOut, this);
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
    return;
  }

  destroy()
  : void 
  {
    this._sharedMessage = null;
    return;
  }

  m_id: number;
  
  /****************************************************/
  /* Protected                                        */
  /****************************************************/

  protected constructor()
  { }
  
  protected _onPointerDown
  (
    _pointer : Phaser.Input.Pointer, 
    _localX : number, 
    _localY : number, 
    _event : any
  )
  : void
  {
    let msg = this._sharedMessage;

    msg.pointer = _pointer;
    msg.localX = _localX;
    msg.localY = _localY;
    msg.event = _event;

    this._actor.sendMessage
    (
      DC_MESSAGE_ID.kPointerDown,
      msg
    );

    msg.pointer = null;
    msg.event = null;
    return;
  }

  protected _onPointerUp
  (
    _pointer : Phaser.Input.Pointer, 
    _localX : number, 
    _localY : number, 
    _event : any
  )
  : void
  {
    let msg = this._sharedMessage;

    msg.pointer = _pointer;
    msg.localX = _localX;
    msg.localY = _localY;
    msg.event = _event;

    this._actor.sendMessage
    (
      DC_MESSAGE_ID.kPointerUp,
      msg
    );

    msg.pointer = null;
    msg.event = null;
    return;
  }

  protected _onPointerMove
  (
    _pointer : Phaser.Input.Pointer, 
    _localX : number, 
    _localY : number, 
    _event : any
  )
  : void
  {
    let msg = this._sharedMessage;

    msg.pointer = _pointer;
    msg.localX = _localX;
    msg.localY = _localY;
    msg.event = _event;

    this._actor.sendMessage
    (
      DC_MESSAGE_ID.kPointerMove,
      msg
    );

    msg.pointer = null;
    msg.event = null;
    return;
  }

  protected _onPointerOver
  (
    _pointer : Phaser.Input.Pointer, 
    _localX : number, 
    _localY : number, 
    _event : any
  )
  : void
  {
    let msg = this._sharedMessage;

    msg.pointer = _pointer;
    msg.localX = _localX;
    msg.localY = _localY;
    msg.event = _event;

    this._actor.sendMessage
    (
      DC_MESSAGE_ID.kPointerOver,
      msg
    );

    msg.pointer = null;
    msg.event = null;
    return;
  }

  protected _onPointerOut
  (
    _pointer : Phaser.Input.Pointer,
    _event : any
  )
  : void
  {
    let msg = this._sharedMessage;

    msg.pointer = _pointer;
    msg.localX = null;
    msg.localY = null;
    msg.event = _event;

    this._actor.sendMessage
    (
      DC_MESSAGE_ID.kPointerOut,
      msg
    );

    msg.pointer = null;
    msg.event = null;
    return;
  }

  /**
   * Shared input event.
   */
  protected _sharedMessage : msgInputEvent;

  /**
   * Actor.
   */
  protected _actor : BaseActor<Ty_Image>;
}