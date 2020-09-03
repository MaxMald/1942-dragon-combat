import { BaseActor } from "../actors/baseActor";
import { Ty_Text } from "../commons/1942types";
import { CmpTextController } from "../components/cmpTextController";
import { CmpUIScoreMultiplier } from "../components/cmpUIScoreMultiplier";

export class FcUIScoreMultiplier
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
      "x 1", 
      { fontFamily: 'Arial', fontSize: 32, color: '#000000' }
    );

    let actor = BaseActor.Create<Ty_Text>(text, "hero_ui_health");

    actor.addComponent(CmpTextController.Create());
    actor.addComponent(CmpUIScoreMultiplier.Create());

    actor.init();

    return actor;
  }
}