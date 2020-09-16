/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file fcUIPowerShield.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-28-2020
 */

import { BaseActor } from "../actors/baseActor";
import { Ty_Text } from "../commons/1942types";
import { CmpTextController } from "../components/cmpTextController";
import { CmpUIHealthController } from "../components/cmpUIHealthController";
import { CmpUIPowerShieldController } from "../components/cmpUIPowerShieldController";
import { CmpUIScoreController } from "../components/cmpUIScoreController";

export class FcUIPowerShield
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Create a UI Score
   */
  static Create(_scene : Phaser.Scene)
  : BaseActor<Ty_Text>
  {
    let text = _scene.add.text
    (
      0, 
      0, 
      "PowerShield : 0", 
      { fontFamily: 'Arial', fontSize: 50, color: '#EC1D87' }
    );

    let actor = BaseActor.Create<Ty_Text>(text, "hero_power_shield");

    actor.addComponent(CmpTextController.Create());
    actor.addComponent(CmpUIPowerShieldController.Create());

    actor.init();

    return actor;
  }
}