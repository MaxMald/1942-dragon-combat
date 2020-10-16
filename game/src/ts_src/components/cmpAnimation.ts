/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Animation component provides a map of states that can be used to handle 
 * diferents animation states.
 *
 * @file CmpAnimation.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-24-2020
 */

import { DC_COMPONENT_ID } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite } from "../commons/1942types";
import { IAnimationState } from "../states/IAnimationState";
import { IBaseState } from "../states/IBaseState";
import { NullState } from "../states/nullState";
import { IBaseComponent } from "./iBaseComponent";

/**
 * Animation component provides a map of states that can be used to handle 
 * diferents animation states.
 */
export class CmpAnimation 
  implements IBaseComponent<Phaser.Physics.Arcade.Sprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Creates a new animation component with empty states.
   */
  static Create()
  : CmpAnimation
  {
    let anim : CmpAnimation = new CmpAnimation();

    anim.m_id = DC_COMPONENT_ID.kAnimation;

    anim._m_states = new Map<string, IAnimationState>();

    anim._m_activeState = NullState.GetInstance();

    return anim;
  }

  /**
   * Initialize the animation component.
   * 
   * @param _actor Base Actor. 
   */
  init(_actor: Ty_physicsActor)
  : void 
  {
    this._m_actor = _actor;
    this._m_sprite = _actor.getWrappedInstance();
    return;
  }
  
  /**
   * Updates the active state.
   * 
   * @param _actor 
   */
  update(_actor: Ty_physicsActor)
  : void 
  {
    this._m_activeState.update();
    return;
  }

  /**
   * Send message to the active state receptor.
   * 
   * @param _id Message ID. 
   * @param _obj Message object.
   */
  receive(_id: number, _obj: any)
  : void 
  {
    this._m_activeState.receive(_id, _obj);
    return;
  }

  /**
   * Attach an animation state to this animation component. If a state with the
   * same id exists, it will be replaced.
   * 
   * @param _state Animation state.
   */
  addState(_state : IAnimationState)
  : void
  {
    _state.m_component = this;
    this._m_states.set(_state.m_id, _state);
    
    return;
  }

  /**
   * Removes an animation state from this animation component. The animation 
   * state will not be destroyed.
   * 
   * @param _id The id of the animatio state to remove.
   */
  removeState(_id : string)
  : void
  {
    if(this._m_states.has(_id)) 
    {
      this._m_states.delete(_id);
    }
    return;
  }

  /**
   * Set the active state of this animation component. If the _id is undefined 
   * the Null State will be set.
   * 
   * @param _id The id of the state. Set undefined to active a Null State.
   */
  setActive(_id : string)
  : void
  {
    let state : IBaseState;
    
    if(_id === undefined) 
    {
      state = NullState.GetInstance();
    }
    else
    {
      state = this.getState(_id);
    }
    
    this._m_activeState.onExit();
    this._m_activeState = state;
    this._m_activeState.onEnter();
    
    return;
  }

  /**
   * Get an animation state attached to this animation component. If the 
   * animation state do not exists, it will returns the Null State.
   * 
   * @param _id State identifier. 
   */
  getState(_id : string)
  : IBaseState
  {
    if(this._m_states.has(_id)) 
    {
      return this._m_states.get(_id);
    }
    else 
    {
      return NullState.GetInstance();
    }
  }

  /**
   * Get the Physic sprite of the BaseActor wich this animation component is
   * attached.
   */
  getSprite()
  : Phaser.Physics.Arcade.Sprite
  {
    return this._m_sprite;
  }

  /**
   * Get the physic actor wich this animation component is attached.
   * 
   * @returns actor.
   */
  getActor()
  : Ty_physicsActor
  {
    return this._m_actor;
  }

  /**
   * Destroys all the animation states.
   */
  destroy()
  : void 
  {
    this._m_states.forEach
    (
      function(_state : IAnimationState)
      {
        _state.destroy();
      }
    );
    this._m_states.clear();
    this._m_states = null;

    this._m_activeState = NullState.GetInstance();

    this._m_sprite = null;
    this._m_actor = null;
    return;
  }
  
  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the physic sprite.
   */
  private _m_sprite : Ty_physicsSprite;

  /**
   * Reference to the physic actor.
   */
  private _m_actor : Ty_physicsActor;

  /**
   * Map of animation states.
   */
  private _m_states : Map<string, IAnimationState>;

  /**
   * Active state.
   */
  private _m_activeState : IBaseState;
}