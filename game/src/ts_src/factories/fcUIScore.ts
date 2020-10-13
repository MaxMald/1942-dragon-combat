/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file fcUIScore.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-06-2020
 */

import { BaseActor } from "../actors/baseActor";
import { Ty_Text } from "../commons/1942types";
import { CmpTextController } from "../components/cmpTextController";
import { CmpUIScoreController } from "../components/cmpUIScoreController";

export class FcUIScore
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
      "Health: 10", 
      { fontFamily: 'Arial', fontSize: 64, color: '#000000' }
    );

    let actor = BaseActor.Create<Ty_Text>(text, "hero_ui_health");

    actor.addComponent(CmpTextController.Create());
    actor.addComponent(CmpUIScoreController.Create());

    actor.init();

    return actor;
  }
}