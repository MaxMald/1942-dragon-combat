/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file fcUIMessage.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-10-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_Image, Ty_Text } from "../commons/1942types";
import { CmpActorGroupImage } from "../components/cmpActorGroup";
import { CmpImageController } from "../components/cmpImageController";
import { CmpTextController } from "../components/cmpTextController";
import { GameManager } from "../gameManager/gameManager";

export class FcUIMessage 
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Creates a dialog box.
   */
  static Create(_scene : Phaser.Scene)
  : BaseActor<Ty_Image>
  {

    // Main actor.

    let actor = BaseActor.Create<Ty_Image>
    (
      _scene.add.sprite(0.0, 0.0, 'dialogBox'), 
      "dialogBox"
    );

    let groupComponent = CmpActorGroupImage.Create(); 
    actor.addComponent(groupComponent);
    actor.addComponent(CmpImageController.Create());

    ////////////////////////////////////
    // Create children

    // Child : Button.

    let text = _scene.add.text
    (
      0, 
      0, 
      "Reset", 
      { fontFamily: 'Arial', fontSize: 64, color: '#000000' }
    );

    text.setOrigin(0.5, 0.5);
    text.setAlign('center');

    text.setInteractive();

    let gameManager = GameManager.GetInstance();
    text.on
    (
      'pointerdown',
      gameManager.gameReset,
      gameManager 
    );

    let buttonActor 
      = BaseActor.Create<Ty_Text>(text, 'reset_button');

    buttonActor.addComponent(CmpTextController.Create());

    // Child : Label

    let lblMessage = _scene.add.text
    (
      0,
      0,
      "Perdiste", 
      { fontFamily: 'Arial', fontSize: 64, color: '#000000' }
    );

    lblMessage.setOrigin(0.5, 0.5);
    lblMessage.setAlign('center');

    let messageActor 
      = BaseActor.Create<Ty_Text>(lblMessage, 'box_message');

    messageActor.addComponent(CmpTextController.Create());

    // Add children

    groupComponent.addActor(messageActor);
    groupComponent.addActor(buttonActor);

    actor.init();

    messageActor.sendMessage
    (
      DC_MESSAGE_ID.kAgentMove,
      new Phaser.Math.Vector3(0.0, -50.0)
    );

    buttonActor.sendMessage
    (
      DC_MESSAGE_ID.kAgentMove, 
      new Phaser.Math.Vector3(0.0, 150.0)
    );

    return actor;
  }
}