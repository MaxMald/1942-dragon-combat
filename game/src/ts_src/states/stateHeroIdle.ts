/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file stateHeroIdle.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-24-2020
 */

import { CmpAnimation } from "../components/cmpAnimation";
import { IAnimationState } from "./IAnimationState";

/**
 * Idle animation of the Hero.
 */
export class StateHeroIdle implements IAnimationState
{  
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor()
  {
    this.m_id = "Hero_Idle";
    return;
  }
  
  onEnter()
  : void 
  { 
    let sprite = this.m_component.getSprite();
    sprite.play('Flight');
    return;
  }
  
  onExit()
  : void 
  { }

  receive(_id: number, _obj: any)
  : void 
  { }

  update()
  : void 
  { }

  destroy()
  : void 
  { }
  
  m_id: string;
  
  m_component: CmpAnimation;
}