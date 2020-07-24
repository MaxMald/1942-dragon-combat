import { BaseActor } from "../actors/baseActor";
import { IBaseState } from "../states/IBaseState";
import { DC_COMPONENT_ID } from "./dcComponentID";
/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file CmpAnimation.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-24-2020
 */

import { IBaseComponent } from "./iBaseComponent";

export class CmpAnimation implements IBaseComponent<Phaser.Physics.Arcade.Sprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : CmpAnimation
  {
    let anim : CmpAnimation = new CmpAnimation();

    anim.m_id = DC_COMPONENT_ID.kAnimation;

    return anim;
  }

  init(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  {
    throw new Error("Method not implemented.");
  }
  
  update(_actor: BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void 
  {
    throw new Error("Method not implemented.");
  }

  receive(_id: number, _obj: any)
  : void 
  {
    throw new Error("Method not implemented.");
  }

  destroy()
  : void 
  {
    this.m_sprite = null;
    return;
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the physic sprite.
   */
  private _m_sprite : Phaser.Physics.Arcade.Sprite;

  private _m_states : Map<string, IBaseState>;

  private _m_activeState : Map<string, IBaseState>;
}