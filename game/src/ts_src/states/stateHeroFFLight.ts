import { DC_MESSAGE_ID } from "../commons/1942enums";
/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file StateHeroFFlight.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-24-2020
 */

import { CmpAnimation } from "../components/cmpAnimation";
import { IAnimationState } from "./IAnimationState";

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
    this._m_isMoving = false;
    return;
  }
  
  onEnter()
  : void 
  { 
    let sprite = this.m_component.getSprite();
    sprite.play('D001_Flight');

    this._m_isMoving = true;
    
    sprite.anims.currentAnim.once('repeat', this._onRepeat, this);
    
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
        this._m_isMoving = true;
      return;

      case DC_MESSAGE_ID.kPointerReleased:
        this._m_isMoving = false;
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

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _onRepeat()
  : void
  {    
    if(this._m_isMoving) 
    {
      let sprite = this.m_component.getSprite();
      sprite.anims.currentAnim.once('repeat', this._onRepeat, this);
    }
    else
    {
      this.m_component.setActive('Hero_Glide');
    }    
    return;
  }

  private _m_isMoving : boolean;
}