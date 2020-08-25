/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file stateHeroGlide.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-24-2020
 */

import { DC_MESSAGE_ID } from "../../commons/1942enums";
import { CmpAnimation } from "../../components/cmpAnimation";
import { IAnimationState } from "./../IAnimationState";

/**
 * Glide animation.
 */
export class StateHeroGlide implements IAnimationState
{  
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor()
  {
    this.m_id = "Hero_Glide";
    return;
  }
  
  onEnter()
  : void 
  { 
    let sprite = this.m_component.getSprite();
    sprite.play('D001_Glide');
    return;
  }
  
  onExit()
  : void 
  { }

  receive(_id: number, _obj: any)
  : void 
  { 
    switch(_id)
    {
      case DC_MESSAGE_ID.kPointerPressed:
        this.m_component.setActive("Hero_Forward_Flight");
      return;

      case DC_MESSAGE_ID.kEnterBarrelRoll:
        this.m_component.setActive("Hero_Barrel_Roll");
      return;

      case DC_MESSAGE_ID.kPowerShieldActivated:
        this.m_component.setActive("Hero_PowerShield");
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