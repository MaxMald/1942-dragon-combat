/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file fcUIBossHealth.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-12-2020
 */

import { BaseActor } from "../actors/baseActor";
import { Ty_Text } from "../commons/1942types";
import { CmpTextController } from "../components/cmpTextController";
import { CmpUIBossHealthControl } from "../components/cmpUIBossHealthControl";

export class FCUIBossHealth 
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
      "BossHealth : ", 
      { fontFamily: 'Arial', fontSize: 64, color: '#000000' }
    );

    let actor = BaseActor.Create<Ty_Text>(text, "hero_ui_health");

    actor.addComponent(CmpTextController.Create());
    actor.addComponent(CmpUIBossHealthControl.Create());

    actor.init();

    return actor;
  }
}