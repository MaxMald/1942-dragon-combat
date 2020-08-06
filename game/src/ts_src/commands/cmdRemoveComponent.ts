import { DC_COMPONENT_ID } from "../commons/1942enums";
import { Ty_physicsActor } from "../commons/1942types";
/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmdRemoveComponent.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-06-2020
 */

import { ICommand } from "./iCommand";

/**
 * Removes a component from an actor.
 */
export class CmdRemoveComponent 
implements ICommand
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Remove the component.
   */
  exec()
  : void 
  { 
    this.m_actor.removeComponent(this.m_component_id);
    return;
  }

  /**
   * Actor where the component will be removed.
   */
  m_actor : Ty_physicsActor;

  /**
   * Identifier of the component to remove.
   */
  m_component_id : DC_COMPONENT_ID;  
}