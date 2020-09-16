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
import { PrefabActor } from "../actors/prefabActor";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_Image, Ty_Text } from "../commons/1942types";
import { CmpHeroController } from "../components/cmpHeroController";
import { CmpHeroData } from "../components/cmpHeroData";
import { CmpPowerShieldController } from "../components/cmpPowerShieldController";
import { CmpUIBossHealthControl } from "../components/cmpUIBossHealthControl";
import { CmpUIHealthController } from "../components/cmpUIHealthController";
import { CmpUIPowerShieldController } from "../components/cmpUIPowerShieldController";
import { CmpUIScoreController } from "../components/cmpUIScoreController";
import { CmpUIScoreMultiplier } from "../components/cmpUIScoreMultiplier";
import { FCUIBossHealth } from "../factories/fcUIBossHealth";
import { FcUIHealth } from "../factories/fcUIHealth";
import { FcUIMessage } from "../factories/fcUIMessage";
import { FcUIPowerShield } from "../factories/fcUIPowerShield";
import { FcUIScore } from "../factories/fcUIScore";
import { FcUIScoreMultiplier } from "../factories/fcUIScoreMultiplier";
import { FcUIScorePopup } from "../factories/fcUIScorePopup";
import { FcUILosePopup } from "../factories/fcUILosePopup";
import { GameManager } from "../gameManager/gameManager";
import { PrefabBuilder } from "../prefabBuilder/prefabBuilder";
import { IScoreManager } from "../scoreManager/iScoreManager";
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
    this._m_heroHealth = heroHealth;

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

      hpData.onHealthChanged(heroData, undefined);
    }

    ///////////////////////////////////
    // Hero's score points

    let heroScore = FcUIScore.Create(_scene);
    this._m_heroScore = heroScore;

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
    // Score Multiplier

    let scoreMult = FcUIScoreMultiplier.Create(_scene);
    this._m_scoreMultiplier = scoreMult;

    let scoreMultController = scoreMult.getComponent<CmpUIScoreMultiplier>
    (
      DC_COMPONENT_ID.kUIScoreMultiplier
    );

    scoreManager.suscribe
    (
      'multiplierChanged',
      'ScoreMultiplerUI',
      scoreMultController.onMultiplierChange,
      scoreMultController
    );

    ///////////////////////////////////
    // Heros's Power Shield

    let powerShieldUI = FcUIPowerShield.Create(_scene);
    this._m_powerShield = powerShieldUI;

    let heroController = hero.getComponent<CmpHeroController>
    (
      DC_COMPONENT_ID.kHeroController
    );

    let powerShield = heroController.getPowerShieldActor();

    let powerShieldController = powerShield.getComponent<CmpPowerShieldController>
    (
      DC_COMPONENT_ID.kPowerShieldComponent
    );

    let powerShieldUIController 
      = powerShieldUI.getComponent<CmpUIPowerShieldController>
      (
        DC_COMPONENT_ID.kUIPowerShieldController
      )

    powerShieldController.on
    (
      'active',
      'powerShieldUI',
      powerShieldUIController.onPowerShieldActivated,
      powerShieldUIController
    );

    powerShieldController.on
    (
      'desactive',
      'powerShieldUI',
      powerShieldUIController.onPowerShieldDesactivated,
      powerShieldUIController
    );

    powerShieldController.on
    (
      'progress',
      'powerShieldUI',
      powerShieldUIController.onProgress,
      powerShieldUIController
    );

    ///////////////////////////////////
    // Boss Score

    this._m_bossScore = FCUIBossHealth.Create(_scene);    

    let bossHealthController = this._m_bossScore.getComponent<CmpUIBossHealthControl>
    (
      DC_COMPONENT_ID.kUIBossHealthControl
    );

    let bossManager = _gameManager.getBossManager();
    bossManager.suscribe
    (
      "onHealthChanged",
      "bossHealthUI",
       bossHealthController.onHealthChanged,
       bossHealthController
    );
    
    bossHealthController.onHealthChanged
    (
      bossManager, 
      bossManager.getBossHealth()
    );

    /****************************************************/
    /* PREFABS                                          */
    /****************************************************/

    let builder = new PrefabBuilder();
    builder.init();

    ///////////////////////////////////
    // Score Popup    

    this._m_popupScore = FcUIScorePopup.Create(_scene, builder);
    this._m_popupScore.sendMessage(DC_MESSAGE_ID.kClose, undefined);

    ///////////////////////////////////
    // Lose Popup

    this._m_losePopup = FcUILosePopup.Create(_scene, builder);
    this._m_losePopup.sendMessage(DC_MESSAGE_ID.kClose, undefined);

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

    ///////////////////////////////////
    // Score Multiplier

    if(this._m_scoreMultiplier == null)
    {
      this._m_scoreMultiplier = FcUIScore.Create(_scene);
    }

    this._m_scoreMultiplier.sendMessage
    (
      DC_MESSAGE_ID.kToPosition,
      new Phaser.Math.Vector3(600, 75)
    );

    ///////////////////////////////////
    // Power Shield UI

    if(this._m_powerShield == null)
    {
      this._m_powerShield = FcUIPowerShield.Create(_scene);
    }

    this._m_powerShield.sendMessage
    (
      DC_MESSAGE_ID.kToPosition,
      new Phaser.Math.Vector3(20, 75)
    );

    this._m_powerShield.sendMessage
    (
      DC_MESSAGE_ID.kClose,
      undefined
    );

    ///////////////////////////////////
    // Boss Health UI

    this._m_bossScore.sendMessage
    (
      DC_MESSAGE_ID.kToPosition,
      new Phaser.Math.Vector3(20, 150)
    );

    this._m_bossScore.sendMessage
    (
      DC_MESSAGE_ID.kClose,
      null
    );

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

      case DC_MESSAGE_ID.kBossEnter :

      this._m_bossScore.sendMessage
      (
        DC_MESSAGE_ID.kShow,
        null
      );
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
    this._m_bossScore.update();
    this._m_powerShield.update();

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

    this._m_bossScore.destroy();
    this._m_bossScore = null;

    this._m_powerShield.destroy();
    this._m_powerShield = null;

    this._m_popupScore.destroy();
    this._m_popupScore = null;

    this._m_losePopup.destroy();
    this._m_losePopup = null;

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
    // Display Popup.

    let popupScore = this._m_popupScore;

    popupScore.sendMessage
    (
      DC_MESSAGE_ID.kShow,
      undefined
    );

    // Score Manager.

    let gm : GameManager = GameManager.GetInstance();

    let scoreManager : IScoreManager = gm.getScoreManager();

    // Score Points.

    let acScorePoints = popupScore.getChild<BaseActor<Ty_Text>>('score_points');
    
    acScorePoints.sendMessage
    (
      DC_MESSAGE_ID.kSetText, 
      scoreManager.getScore().toString()
    );

    // Kill Bonus

    let acKillBonus = popupScore.getChild<BaseActor<Ty_Text>>('kill_multiplier');

    acKillBonus.sendMessage
    (
      DC_MESSAGE_ID.kSetText,
      'x' + scoreManager.getKillsBonus().toString()
    );

    // Health Bonus

    let acHealthBonus = popupScore.getChild<BaseActor<Ty_Text>>('health_multiplier');

    acHealthBonus.sendMessage
    (
      DC_MESSAGE_ID.kSetText,
      'x' + scoreManager.getHealthBonus().toString()
    );

    // Total Points

    let acTotalPoints = popupScore.getChild<BaseActor<Ty_Text>>('total_points');

    acTotalPoints.sendMessage
    (
      DC_MESSAGE_ID.kSetText,
      scoreManager.getTotalScore().toString()
    );

    // Stars

    let starsNum : integer = scoreManager.getStarsNum();
    let textureKey : string;

    if(starsNum == 0)
    {
      textureKey = 'gui_star_4';
    }
    else if(starsNum == 1)
    {
      textureKey = 'gui_star_3';
    }
    else if(starsNum == 2)
    {
      textureKey = 'gui_star_2';
    }
    else
    {
      textureKey = 'gui_star_1';
    }

    let acStars = popupScore.getChild<BaseActor<Ty_Image>>('stars');

    acStars.sendMessage
    (
      DC_MESSAGE_ID.kSetTexture,
      textureKey
    );

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
    this._m_losePopup.sendMessage
    (
      DC_MESSAGE_ID.kShow,
      undefined
    );
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
   * Boss's health points actor.
   */
  private _m_bossScore : BaseActor<Ty_Text>;

  /**
   * Hero's power shield UI actor.
   */
  private _m_powerShield : BaseActor<Ty_Text>;

  /**
   * Score Multiplier.
   */
  private _m_scoreMultiplier : BaseActor<Ty_Text>;

  /**
   * Score Final Results popup.
   */
  private _m_popupScore : PrefabActor;

  /**
   * Lose Popup.
   */
  private _m_losePopup: PrefabActor;
}