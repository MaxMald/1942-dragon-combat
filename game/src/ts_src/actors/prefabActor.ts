/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file prefabActor.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-02-2020
 */

import { IActor } from "./iActor";

export class PrefabActor
implements IActor
{
  /**
   * Creates a new Actor, with no components.
   * 
   * @param _instance The wrapped instance.
   * @param _name The actor's names, used as an identifier.
   * 
   * @readonly A new Actor.
   */
  static Create(_name : string)
  : PrefabActor
  {
    let actor : PrefabActor = new PrefabActor();

    actor.m_name = _name;
    actor._m_hChildren = new Map<string, IActor>();

    return actor;
  }

  /**
   * Call the init method of all the component attached to this BaseActor.
   */
  init()
  : void
  {
    this._m_hChildren.forEach
    (
      function(_child : IActor)
      {
        _child.init();
        return;
      },
      this
    );
    return;
  }

  /**
   * Calls the update method of every component attached to this BaseActor.
   */
  update()
  : void
  {
    this._m_hChildren.forEach
    (
      this._updateChild,
      this
    );
    return;
  }

  /**
   * Send a message to every component attached to this BaseActor.
   * 
   * @param _id Message ID. 
   * @param _obj Message Object.
   */
  sendMessage(_id : number, _obj : any)
  : void
  {
    this._m_message_id = _id;
    this._m_message = _obj;

    this._m_hChildren.forEach
    (
      this._sendMessageChild,
      this
    );

    this._m_message = null;
    return;
  }

  /**
   * Get a child in this prefab.
   * 
   * @param _name actor name.
   * 
   * @returns actor. Null if actor is not found. 
   */
  getChild< U extends IActor>(_name : string)
  : U
  {
    if(this._m_hChildren.has(_name))
    {
      return this._m_hChildren.get(_name) as U;
    }
    return null;
  }

  /**
   * Add a child.
   * 
   * @param _actor child.
   */
  addChild(_actor : IActor)
  : void
  {
    this._m_hChildren.set(_actor.getName(), _actor);
    return;
  }

  removeChild(_name : string)
  : void
  {
    if(this._m_hChildren.has(_name))
    {
      this._m_hChildren.delete(_name);
    }
    return;
  }

  clear()
  : void
  {
    this._m_hChildren.clear();
    return;
  }

  /**
   * Get the actor's name.
   * 
   * @returns the actor's name.
   */
  getName()
  : string
  {
    return this.m_name;
  }

  /**
   * Destroys all the component attached to this BaseActor.
   */
  destroy()
  : void
  {
    this._m_hChildren.forEach
    (
      function(_child : IActor)
      {
        _child.destroy();
        return;
      }
    );
    return;
  }  

  /**
   * The name of this BaseActor.
   */
  public m_name : string;

  /****************************************************/
  /* Protected                                        */
  /****************************************************/
  
  /**
   * Protected constructor.
   */
  protected constructor() 
  { }

  /**
   * Called in the update method.
   * 
   * @param _actor actor. 
   */
  protected _updateChild(_actor : IActor)
  : void
  {
    _actor.update();
    return;
  }

  /**
   * Send message to child.
   * 
   * @param _actor actor.
   */
  protected _sendMessageChild(_actor : IActor)
  : void
  {
    _actor.sendMessage(this._m_message_id, this._m_message);
    return;
  }

  /**
   * Map of actors.
   */
  protected _m_hChildren : Map<string, IActor>;

  protected _m_message_id : number;

  protected _m_message : any;
}