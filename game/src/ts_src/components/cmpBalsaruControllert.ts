/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpBalsaruControllert.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-09-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_Image, Ty_physicsSprite, V2 } from "../commons/1942types";
import { SttBalsaruIdle } from "../states/balsaruController.ts/sttBalsaruIdle";
import { SttBalsaruEvade } from "../states/balsaruController.ts/sttBalsaruEvade";
import { IBaseState } from "../states/IBaseState";
import { NullState } from "../states/nullState";
import { cmpFSM } from "./cmpFSM";
import { SttBalsaruAttackAnticipation } from "../states/balsaruController.ts/sttBalsaruAttackAticipation";
import { SttBalsaruIn } from "../states/balsaruController.ts/sttBalsaruIn";
import { SttBalsaruOut } from "../states/balsaruController.ts/sttBalsaruOut";
import { CnfBalsaruHead } from "../configObjects/cnfBalsaruHead";
import { CnfBalsaruInit } from "../configObjects/cnfBalsaruInit";
import { SttBalsaruAttack } from "../states/balsaruController.ts/sttBalsaruAttack";
import { DCForceController } from "../physics/dcForceController";
import { GameManager } from "../gameManager/gameManager";
import { MxListenerManager } from "listeners/mxListenerManager";
import { IBossManager } from "../bossManager/IBossManager";
import { MxListener } from "listeners/mxListener";
import { CnfBalsaruEvade } from "../configObjects/cnfBalsaruEvade";
import { ILevelGenerator } from "../levelGenerator/iLevelGenerator";

export class CmpBalsaruController
extends cmpFSM<Ty_physicsSprite>
{
  static Create
  (
    _scene : Phaser.Scene,
    _evadeConfig ?: CnfBalsaruEvade
  )
  : CmpBalsaruController
  {
    
    let cmp = new CmpBalsaruController();

    cmp.m_scene = _scene;

    cmp.m_id = DC_COMPONENT_ID.kBalsaruController;

    cmp._m_hStates = new Map<string, IBaseState>();

    cmp._m_headPosition= new Phaser.Math.Vector2();
    
    cmp._m_active_state = NullState.GetInstance();

    cmp._m_stage_min_hp = 0;

    ///////////////////////////////////
    // Listeners

    cmp._m_events = new MxListenerManager<IBossManager, any>();

    cmp._m_events.addEvent("onHealthChanged");

    ///////////////////////////////////
    // States

    // Idle State

    let idle = new SttBalsaruIdle();

    idle.setComponent(cmp);

    cmp.addState(idle);

    // Follow State

    let attack = new SttBalsaruAttack();

    attack.setComponent(cmp);

    cmp.addState(attack);

    // Evade State

    let evade = new SttBalsaruEvade(_evadeConfig);

    evade.setComponent(cmp);

    cmp.addState(evade);

    // Attack Anticipation

    let attackAnticipation = new SttBalsaruAttackAnticipation();

    attackAnticipation.setComponent(cmp);

    cmp.addState(attackAnticipation);

    // Scene In

    let stateIn = new SttBalsaruIn();

    stateIn.setComponent(cmp);

    cmp.addState(stateIn);
    
    // Scene Out

    let stateOut = new SttBalsaruOut();

    stateOut.setComponent(cmp);

    cmp.addState(stateOut);

    // Force Controller

    cmp.m_forceController = new DCForceController();

    // Get GameManager.

    cmp._m_gameManager = GameManager.GetInstance();

    // Create tween.

    cmp._m_scene = _scene;
    
    return cmp;
  }

  /**
   * Get the head actor.
   * 
   * @param _actor 
   */
  init(_actor: BaseActor<Ty_physicsSprite>)
  : void 
  { 
    // Get head.

    this.m_head = _actor;
    
    // Balsaru enter the scene.

    this.setActiveState('in');

    // Force controller.

    this.m_forceController.init(_actor);

    return;
  } 

  /**
   * Update.
   * 
   */
  update()
  : void
  {
    ///////////////////////////////////
    // Behavior

    // Get delta time.

    let dt = this._m_gameManager.m_dt;

    // Update the active state.

    this._m_active_state.update();

    // Update force controller.

    this.m_forceController.update(dt);

    ///////////////////////////////////
    // Debugging

    // Get sprite position.

    let headSprite : Ty_physicsSprite = this.m_head.getWrappedInstance();

    let headPosition = this._m_headPosition;

    headPosition.set(headSprite.x, headSprite.y);

    // Debug

    this.m_forceController.debug(headPosition);

    return;
  }

  /**
   * Get balsaru health points.
   */
  getHealth()
  : number
  {
    return this._m_hp;
  }

  setStageMinHP(_hp : number)
  : void
  {
    this._m_stage_min_hp = _hp;
    return;
  }

  /**
   * 
   * @param _points 
   */
  addHealthPoints(_points : number)
  : void
  {
    this._m_hp += _points;
    
    if(this._m_hp <= this._m_stage_min_hp)
    {      
      this.setActiveState('out');

      let levelGenerator : ILevelGenerator 
        = this._m_gameManager.getLevelGenerator();

      levelGenerator.receiveMessage(DC_MESSAGE_ID.kResume, undefined);

    } else if(this._m_hp <= 0)
    {
      this._m_hp = 0;
      
      GameManager.ReceiveMessage(DC_MESSAGE_ID.kMisionCompleted, null);
    }

    this._m_events.call
    (
      'onHealthChanged', 
      this._m_gameManager.getBossManager(),
      this._m_hp
    );

    this.hitAnimation();

    return;
  }

  /**
   *  Start Balsaru behavior. 
   */
  setup
  (
    _scene : Phaser.Scene, 
    _ship : BaseActor<Phaser.GameObjects.Group>,
    _shipSprite : Ty_Image,
    _initConfig : CnfBalsaruInit,
    _headConfig : CnfBalsaruHead
  )
  : void
  {
    // Save ship

    this.m_ship = _ship;

    // Sprite ship

    this.m_shipSprite = _shipSprite

    // Save the scene reference.

    this.m_scene = _scene;  
    
    // Save configuration objects.

    this.m_config = _initConfig;

    this.m_headConfig = _headConfig;

    this._m_hp = _headConfig.health;

    return;
  }

  setShip(_actor : BaseActor<Phaser.GameObjects.Group>)
  : void
  {
    this.m_ship = _actor;
    return;
  }

  suscribe
  (
    _event : string,
    _username : string,
    _fn : (_bossManager : IBossManager, _args : any) => void,
    _context : any
  ) : void
  {
    this._m_events.suscribe
    (
      _event, 
      _username, 
      new MxListener<IBossManager, any>(_fn, _context)
    );
    return;
  }

  unsuscribe
  (
    _event : string,
    _username : string
  )
  :void
  {
    this._m_events.unsuscribe(_event, _username);

    return;
  }

  hitAnimation()
  : void
  {
    // Stop tween if it is playing.

    if(this._m_tween != null)
    {
      if(this._m_tween.isPlaying())
      {
        this._m_tween.stop();
      }
    }   

    // Get head sprite.

    let headSprite : Ty_physicsSprite = this.m_head.getWrappedInstance();

    // Add tween.

    this._m_tween = this._m_scene.tweens.addCounter
    (
      {
        from : 255,

        to : 0,

        duration : 100,

        ease : 'linear',

        repeat : 3,

        yoyo : true,

        onUpdate: function (tween)
        {
          var value = Math.floor(tween.getValue());

          headSprite.setTint(Phaser.Display.Color.GetColor(255, value, value));
        }
      }
    );

    return;
  }

  destroy()
  : void
  {
    if(this._m_events != null)
    {
      this._m_events.destroy();
      this._m_events = null;
    }

    return;
  }

  /**
   * Reference to Balsaru Head.
   */
  m_head : BaseActor<Ty_physicsSprite>;

  /**
   * Reference to Balsaru ship or body.
   */
  m_ship : BaseActor<Phaser.GameObjects.Group>;

  /**
   * Ship sprite
   */
  m_shipSprite : Ty_Image;

  /**
   * Reference to the scene.
   */
  m_scene : Phaser.Scene;

  /**
   * Balsaru configuration
   */
  m_config : CnfBalsaruInit;

  /**
   * Balsaru head configuration
   */
  m_headConfig : CnfBalsaruHead;

  ///////////////////////////////////
  // Movement properties

  /**
   * Actual 
   */
  m_forceController : DCForceController;

  /****************************************************/
  /* Private                                          */
  /****************************************************/   

  /**
   * Minimum of hp that the boss needs to be in the actual stage.
   */
  private _m_stage_min_hp : number;

  /**
   * Private Game Manager.
   */
  private _m_gameManager : GameManager;

  /**
   * Head position.
   */
  private _m_headPosition : V2;

  /**
   * 
   */
  private _m_hp : number;

  /**
   * Events manager.
   */
  private _m_events : MxListenerManager<IBossManager, any>;

  /**
   * Phaser tween.
   */
  private _m_tween : Phaser.Tweens.Tween;

  /**
   * Phaser scene.
   */
  private _m_scene : Phaser.Scene;
}