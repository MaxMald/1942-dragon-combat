/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file StateHeroFFlight.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-24-2020
 */

import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor } from "../../commons/1942types";
import { CmpAnimation } from "../../components/cmpAnimation";
import { CmpHeroController } from "../../components/cmpHeroController";
import { IAnimationState } from "./../IAnimationState";

/**
 * Forward fly animation.
 */
export class StateHeroFFlight implements IAnimationState
{  
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor()
  {
    this.m_id = "Hero_Forward_Flight";
    return;
  }
  
  onEnter()
  : void 
  { 
    let sprite = this.m_component.getSprite();

    sprite.play('D001_Flight');

    sprite.once('animationrepeat', this._onRepeat, this);

    return;
  }
  
  onExit()
  : void 
  {
    this._removeListener();
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
  { 
    this._removeListener();
    return;
  }
  
  m_id: string;
  
  m_component: CmpAnimation;

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Removew listeners from current animation.
   */
  private _removeListener()
  : void
  {
    let sprite = this.m_component.getSprite();
    sprite.removeAllListeners('animationrepeat');
    return;
  }
  
  private _onRepeat()
  : void
  {
    let actor : Ty_physicsActor = this.m_component.getActor();
    let heroController : CmpHeroController 
      = actor.getComponent<CmpHeroController>(DC_COMPONENT_ID.kHeroController);
    
    if(heroController.isPointerPressed()) 
    {
      let sprite = this.m_component.getSprite();
      sprite.once('animationrepeat', this._onRepeat, this);
    }
    else
    {
      this.m_component.setActive('Hero_Glide');
    }    
    return;
  }
}