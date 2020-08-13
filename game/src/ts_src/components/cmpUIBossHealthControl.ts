/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpUIBossHealthControl.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-12-2020
 */

import { BaseActor } from "../actors/baseActor";
import { IBossManager } from "../bossManager/IBossManager";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_Text } from "../commons/1942types";

export class CmpUIBossHealthControl
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : CmpUIBossHealthControl
  {
    let healthController = new CmpUIBossHealthControl();

    healthController.m_id = DC_COMPONENT_ID.kUIBossHealthControl;
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

  onHealthChanged(_bossManager : IBossManager, _args : any)
  : void
  {
    let sHealth : string = "Boss Health : " + (_args as number).toString();

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