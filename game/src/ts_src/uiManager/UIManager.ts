/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file UIManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-09-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_Image, Ty_Text } from "../commons/1942types";
import { CmpActorGroupImage } from "../components/cmpActorGroup";
import { CmpHeroData } from "../components/cmpHeroData";
import { CmpUIHealthController } from "../components/cmpUIHealthController";
import { CmpUIScoreController } from "../components/cmpUIScoreController";
import { FcUIHealth } from "../factories/fcUIHealth";
import { FcUIMessage } from "../factories/fcUIMessage";
import { FcUIScore } from "../factories/fcUIScore";
import { GameManager } from "../gameManager/gameManager";
import { IUIManager } from "./IUIManager";

/**
 * Creates and control the UI actors for the game.
 */
export class UIManager
implements IUIManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * New UIManager
   */
  constructor()
  { }

  /**
   * Initialize the UIManager. Suscribe to the hero and score events.
   * 
   * @param _scene phaser scene. 
   * @param _gameManager game manager.
   */
  init
  (
    _scene : Phaser.Scene, 
    _gameManager : GameManager
  )
  : void
  {
    ///////////////////////////////////
    // Hero health points

    let heroHealth = FcUIHealth.Create(_scene);

    let playerController = _gameManager.getPlayerController();
    let hero = playerController.getPlayer();
    
    if(hero != null)
    {
      let heroData = hero.getComponent<CmpHeroData>(DC_COMPONENT_ID.kHeroData);  
    
      let hpData = heroHealth.getComponent<CmpUIHealthController>
      (
        DC_COMPONENT_ID.kUIHealthController
      );
      
      heroData.suscribe
      (
        'onHealthChanged', 
        "UIHealth", 
        hpData.onHealthChanged, 
        hpData
      );
    }

    ///////////////////////////////////
    // Hero's score points

    let heroScore = FcUIScore.Create(_scene);

    let scoreController = heroScore.getComponent<CmpUIScoreController>
    (
      DC_COMPONENT_ID.kUIScoreController
    );

    let scoreManager = _gameManager.getScoreManager();

    scoreManager.suscribe
    (
      "scoreChanged", 
      "scoreUI", 
      scoreController.onScoreChanged, 
      scoreController
    );

    ///////////////////////////////////
    // Dialog Box.

    let dialogBox = FcUIMessage.Create(_scene);
    
    this._m_heroScore = heroScore;
    this._m_heroHealth = heroHealth;
    this._m_dialogBox = dialogBox;
    return;
  }
  
  /**
   * Create or reset the UI actors.
   * 
   * @param _scene Phaser scene. 
   * @param _gameManager game manager.
   */
  reset(_scene: Phaser.Scene, _gameManager: GameManager)
  : void 
  {

    if(this._m_heroHealth == null)
    {
      // Create the hero health actor.
      this._m_heroHealth = FcUIHealth.Create(_scene);
    }

    ///////////////////////////////////
    // Hero Healt UI

    this._m_heroHealth.sendMessage
    (
      DC_MESSAGE_ID.kToPosition,
      new Phaser.Math.Vector3(20, 20) 
    );

    ///////////////////////////////////
    // Hero Score UI

    if(this._m_heroScore == null)
    {
      // Create the hero score actor      
      this._m_heroScore = FcUIScore.Create(_scene);
    }

    this._m_heroScore.sendMessage
    (
      DC_MESSAGE_ID.kToPosition,
      new Phaser.Math.Vector3(600, 20)
    );

    ////////////////////////////////////
    // Dialog Box

    let canvas = _scene.game.canvas;

    let dialogImage = this._m_dialogBox.getWrappedInstance();
    let movement = new Phaser.Math.Vector3
    (
      canvas.width * 0.5 - dialogImage.x,
      canvas.height * 0.5 - dialogImage.y
    );

    this._m_dialogBox.sendMessage(DC_MESSAGE_ID.kAgentMove, movement);
    this._m_dialogBox.sendMessage(DC_MESSAGE_ID.kClose, null);

    return;
  }

  /**
   * No implemenation.
   * 
   * @param _id 
   * @param _msg 
   */
  receive(_id : DC_MESSAGE_ID, _msg : any)
  : void
  { 
    switch(_id)
    {
      case DC_MESSAGE_ID.kMisionCompleted :
      
      this._onMissionCompleted(_msg as GameManager);
      
      return;

      case DC_MESSAGE_ID.kMisionFailure :

      this._onMissionFailure(_msg as GameManager);
      
      return;
    }
    return;
  }

  /**
   * Update UI actors.
   * 
   * @param _dt delta time. 
   */
  update(_dt: number)
  : void 
  { 
    this._m_heroHealth.update();
    this._m_heroScore.update();
    this._m_dialogBox.update();

    return;
  }

  /**
   * Safely destroys the UI manager.
   */
  destroy()
  : void
  {
    this._m_heroHealth.destroy();
    this._m_heroHealth = null;
    
    this._m_heroScore.destroy();
    this._m_heroScore = null;

    this._m_dialogBox.destroy();
    this._m_dialogBox = null;

    return;
  }
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Called when the mision had been completed.
   * 
   * @param _gameManager game manager.
   */
  private _onMissionCompleted(_gameManager : GameManager)
  : void
  {

    let actorGroup = this._m_dialogBox.getComponent<CmpActorGroupImage>
    (
      DC_COMPONENT_ID.kActorGroup
    );

    let boxMsgActor = actorGroup.getActor("box_message");

    boxMsgActor.sendMessage(DC_MESSAGE_ID.kSetText, "Mision Completed");

    this._m_dialogBox.sendMessage(DC_MESSAGE_ID.kShow, null);

    return;
  }

  /**
   * Called when the mision had been a failure.
   * 
   * @param _gameManager game manager. 
   */
  private _onMissionFailure(_gameManager : GameManager)
  : void
  {
    let actorGroup = this._m_dialogBox.getComponent<CmpActorGroupImage>
    (
      DC_COMPONENT_ID.kActorGroup
    );

    let boxMsgActor = actorGroup.getActor("box_message");

    boxMsgActor.sendMessage(DC_MESSAGE_ID.kSetText, "Mision Failure");

    this._m_dialogBox.sendMessage(DC_MESSAGE_ID.kShow, null);

    return;
  }
  
  /**
   * Hero's health points actor.
   */
  private _m_heroHealth : BaseActor<Ty_Text>;

  /**
   * Hero's score points actor.
   */
  private _m_heroScore : BaseActor<Ty_Text>;

  /**
   * Reference to the dialog box.
   */
  private _m_dialogBox : BaseActor<Ty_Image>;
}