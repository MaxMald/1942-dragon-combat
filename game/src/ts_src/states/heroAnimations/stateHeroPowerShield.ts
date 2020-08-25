/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file stateHeroPowerShield.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-24-2020
 */

import { DC_MESSAGE_ID } from "../../commons/1942enums";
import { CmpAnimation } from "../../components/cmpAnimation";
import { IAnimationState } from "./../IAnimationState";

/**
 * Glide animation.
 */
export class StateHeroPowerShield 
implements IAnimationState
{  
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor()
  {
    this.m_id = "Hero_PowerShield";
    return;
  }
  
  onEnter()
  : void 
  { 
    let sprite = this.m_component.getSprite();
    sprite.setAlpha(0.3);
    return;
  }
  
  onExit()
  : void 
  { 
    let sprite = this.m_component.getSprite();
    sprite.setAlpha(1.0);
    return;
  }

  receive(_id: number, _obj: any)
  : void 
  { 
    switch(_id)
    {  
      case DC_MESSAGE_ID.kEnterBarrelRoll:
        this.m_component.setActive("Hero_Barrel_Roll");
      return;

      case DC_MESSAGE_ID.kPowerShieldDesactivated:
        this.m_component.setActive('Hero_Forward_Flight');
      return;
      

      default:
      return;
    }
  }

  update()
  : void 
  { }

  destroy()
  : void 
  { }
  
  m_id: string;
  
  m_component: CmpAnimation;
}