/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary This component agroup actors. Actors are updated, initalizated and
 * destroyed by the update, init and destroy native method of the component.
 *
 * @file cmpActorGroup.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-10-2020
 */

import { BaseActor } from "../actors/baseActor";
import { IActor } from "../actors/iActor";
import { DC_COMPONENT_ID } from "../commons/1942enums";
import { Ty_Image } from "../commons/1942types";
import { IBaseComponent } from "./iBaseComponent";

/**
 * This component a group actors. Actors are updated, initalizated and destroyed
 * by the update, init and destroy native method of the component.
 */
export class CmpActorGroupImage
implements IBaseComponent<Ty_Image>
{
  
  /**
   * Create a new component.
   */
  static Create()
  : CmpActorGroupImage
  {
    let group : CmpActorGroupImage = new CmpActorGroupImage();

    group.m_id = DC_COMPONENT_ID.kActorGroup;
    group._m_hActors = new Map<string, IActor>();

    return group;
  }

  /**
   * Initialize each actor in this component.
   * 
   * @param _actor actor. 
   */
  init(_actor: BaseActor<Phaser.GameObjects.Image>)
  : void 
  {
    this._m_hActors.forEach
    (
      function(_actor : IActor)
      : void
      {
        _actor.init();
      }
    );
    return;
  }

  /**
   * Updates each actor in this component.
   * 
   * @param _actor actor. 
   */
  update(_actor: BaseActor<Phaser.GameObjects.Image>)
  : void 
  {
    this._m_hActors.forEach
    (
      this.updateActor,
      this
    );
    return;
  }

  /**
   * Updates an actor.
   * 
   * @param _actor actor. 
   */
  updateActor(_actor : IActor)
  : void
  {
    _actor.update();
    return;
  }

  /**
   * Adds a new actor.
   * 
   * @param _actor actor. 
   */
  addActor(_actor : IActor)
  : void
  {
    this._m_hActors.set(_actor.getName(), _actor);
    return;
  }

  /**
   * Get an actor. Returns null if doesn't exists.
   * 
   * @param _name actor's name.
   * 
   * @return actor. null if doesn't exists. 
   */
  getActor(_name : string)
  : IActor
  {
    return this._m_hActors.get(_name);
  }

  /**
   * Receive and resend the message to the actors.
   * 
   * @param _id message id. 
   * @param _obj message.
   */
  receive(_id: number, _obj: any)
  : void 
  {
    this._m_hActors.forEach
    (
      function(_actor : IActor)
      {
        _actor.sendMessage(_id, _obj);
        return;
      },
      this
    );

    return;
  }

  /**
   * Destroy the actors.
   */
  destroy()
  : void 
  {
    this._m_hActors.forEach
    (
      function(_actor : IActor)
      {
        _actor.destroy();
        return;
      },
      this
    );

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
   * Table of actors.
   */
  private _m_hActors : Map<string, IActor>;
}