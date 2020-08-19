/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file stateHeroBarrelRoll.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-18-2020
 */

import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite } from "../commons/1942types";
import { CmpAnimation } from "../components/cmpAnimation";
import { CmpHeroController } from "../components/cmpHeroController";
import { IAnimationState } from "./IAnimationState";

export class StateHeroBarrelRoll
implements IAnimationState
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/  
  
  constructor()
  {
    this.m_id = "Hero_Barrel_Roll";
    return;
  }

  onEnter()
  : void 
  {
    let sprite : Ty_physicsSprite = this.m_component.getSprite()
    sprite.setAlpha(0.3);
    return;
  }

  onExit()
  : void 
  {
    let sprite : Ty_physicsSprite = this.m_component.getSprite()
    sprite.setAlpha(1.0);
    return;
  }

  receive(_id: number, _obj: any)
  : void 
  {
    switch(_id)
    {
      case DC_MESSAGE_ID.kExitBarrelRoll:
      {
        let actor : Ty_physicsActor = this.m_component.getActor();
        let controller : CmpHeroController 
          = actor.getComponent<CmpHeroController>(DC_COMPONENT_ID.kHeroController);

        if(controller.isPointerPressed())
        {
          this.m_component.setActive('Hero_Forward_Flight');
        }
        else
        {
          this.m_component.setActive('Hero_Glide');
        }        
      }      
      return;
    }
    return;
  }

  update()
  : void 
  { }

  destroy()
  : void 
  {
    this.m_component = null;
    return;
  }

  m_id: string;

  m_component: CmpAnimation;
}