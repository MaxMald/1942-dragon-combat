/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpUIHealthController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-06-2020
 */

import { IBaseComponent } from "./iBaseComponent";
import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_Text } from "../commons/1942types";
import { CmpHeroData } from "./cmpHeroData";

export class CmpUIHealthController 
implements IBaseComponent<Ty_Text>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : CmpUIHealthController
  {
    let healthController = new CmpUIHealthController();

    healthController.m_id = DC_COMPONENT_ID.kUIHealthController;

    return healthController;
  }

  init(_actor: BaseActor<Phaser.GameObjects.Text>)
  : void 
  {
    this._actor = _actor;
    return;
  }

  update(_actor: BaseActor<Phaser.GameObjects.Text>)
  : void 
  { }

  receive(_id: number, _obj: any)
  : void 
  { }

  onHealthChanged(_heroData : CmpHeroData, _args : undefined)
  : void
  {
    let sHealth : string = "Health : " + _heroData.getHealth().toString();

    this._actor.sendMessage(DC_MESSAGE_ID.kSetText, sHealth);

    return;
  }

  destroy()
  : void 
  {    
    this._actor = null;
    return;
  }

  m_id: number;
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private constructor()
  { }

  private _actor : BaseActor<Ty_Text>;
}