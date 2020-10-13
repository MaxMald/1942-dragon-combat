/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file fcUIHealth.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-06-2020
 */

import { BaseActor } from "../actors/baseActor";
import { GetUIDepth } from "../commons/1942config";
import { Ty_Text } from "../commons/1942types";
import { CmpTextController } from "../components/cmpTextController";
import { CmpUIHealthController } from "../components/cmpUIHealthController";

export class FcUIHealth 
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Create a UI health
   */
  static Create(_scene : Phaser.Scene)
  : BaseActor<Ty_Text>
  {
    let text = _scene.add.text
    (
      0, 
      0, 
      "Health: 10", 
      { fontFamily: 'Arial', fontSize: 64, color: '#000000' }
    );

    text.setDepth(GetUIDepth());

    let actor = BaseActor.Create<Ty_Text>(text, "hero_ui_health");

    actor.addComponent(CmpTextController.Create());
    actor.addComponent(CmpUIHealthController.Create());

    actor.init();

    return actor;
  }
}