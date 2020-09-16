/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpHeroController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-18-2020
 */

import { CnfHero } from "../commons/1942config";
import { DC_COMPONENT_ID, DC_MESSAGE_ID, DC_SECONDARY_ACTION } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite } from "../commons/1942types";
import { SttHeroBarrelRoll } from "../states/heroController/sttHeroBarrelRoll";
import { SttHeroNormal } from "../states/heroController/sttHeroNormal";
import { SttHeroPowerShield } from "../states/heroController/sttHeroPowerShield";
import { ICmpState } from "../states/ICmpState";
import { IBaseComponent } from "./iBaseComponent";
import { ICmpItemController } from "./iCmpItemController";

export class CmpHeroController
implements IBaseComponent<Ty_physicsSprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : CmpHeroController
  {
    let controller = new CmpHeroController();

    controller.m_id = DC_COMPONENT_ID.kHeroController;
    controller._m_hStates = new Map<string, ICmpState<CmpHeroController>>();
    controller._m_pressingPointer = false;
    controller._m_secondary_action = DC_SECONDARY_ACTION.kUndefined;

    controller.addState(new SttHeroBarrelRoll());
    controller.addState(new SttHeroPowerShield());

    controller._m_activeState = new SttHeroNormal();
    controller.addState(controller._m_activeState);

    controller._m_config = new CnfHero();
    return controller;
  }
  
  /**
   * Save the hero actor.
   * 
   * @param _actor actor.
   */
  init(_actor: Ty_physicsActor)
  : void 
  {
    this._m_actor = _actor;

    this._m_activeState.onEnter();
    return;
  }
  
  /**
   * 
   * @param _actor 
   */
  update(_actor: Ty_physicsActor)
  : void 
  { 
    this._m_activeState.update();
    return;
  }

  /**
   * * hola 
   * 
   * @param _id message id
   * @param _obj message.
   */
  receive(_id: number, _obj: any)
  : void 
  { 
    switch(_id)
    {
      /**
       * -> Register when the pointer is pressed. 
       * -> Desacive shield.
       */
      case DC_MESSAGE_ID.kPointerPressed:
        this._m_pressingPointer = true;

        if(this._m_secondary_action == DC_SECONDARY_ACTION.kShield)
        {
          this._m_powerShieldActor.sendMessage
          (
            DC_MESSAGE_ID.kDesactive,
            this._m_powerShieldActor
          );
          return
        }
      break;

      /**
       * Register when the pointer is released.
       * 
       * If the pointer is released, Kalebio generate a barrel roll, its default
       * secondary action.
       */
      case DC_MESSAGE_ID.kPointerReleased:
        this._m_pressingPointer = false;
      break;

      /**
       * A collision with an item had ocurred.
       */
      case DC_MESSAGE_ID.kCollisionItem:
        this._onCollisionWithItem(_obj as ICmpItemController);
      break;

      /**
       * The powershield had been explode and is lost.
       */
      case DC_MESSAGE_ID.kPowerShieldExplodes:

      this._m_secondary_action = DC_SECONDARY_ACTION.kUndefined;
      break;

      /**
       * Desactive the power ups.
       */
      case DC_MESSAGE_ID.kDesactivePowerUps:

      this._m_secondary_action = DC_SECONDARY_ACTION.kUndefined;
      break;

      default:
      break;
    }

    this._m_activeState.receive(_id, _obj);
    return;
  }

  /**
   * Set the active state.
   * 
   * @param _id state identifier. 
   */
  setActive(_id : string)
  : void
  {
    if(this._m_hStates.has(_id))
    {
      let activeState = this._m_activeState;
      
      activeState.onExit();
      
      activeState = this._m_hStates.get(_id);
      
      activeState.onEnter();

      this._m_activeState = activeState;
    }
    return;
  }

  /**
   * Add a new state.
   * 
   * @param _state state. 
   */
  addState(_state : ICmpState<CmpHeroController>)
  : void
  {
    this._m_hStates.set(_state.m_id, _state);
    _state.setComponent(this);
    return
  }

  /**
   * Get a state.
   * 
   * @param _id state identifier. 
   */
  getState(_id : string)
  : ICmpState<CmpHeroController>
  {
    if(this._m_hStates.has(_id))
    {
      return this._m_hStates.get(_id);
    }
    else
    {
      console.error("State : " + _id + " not found.");
      return null;
    }
  }

  /**
   * Get the actor of this component.
   * 
   * @returns actor.
   */
  getActor()
  : Ty_physicsActor
  {
    return this._m_actor;
  }

  /**
   * Get the secondary action.
   */
  getSecondaryAction()
  : DC_SECONDARY_ACTION
  {
    return this._m_secondary_action;
  }

  /**
   * Check if the pointer is been pressed.
   * 
   * @returns true if the pointer is pressed.
   */
  isPointerPressed()
  : boolean
  {
    return this._m_pressingPointer;
  }

  /**
   * Set the configuration object.
   * 
   * @param _config configuration object. 
   */
  setConfiguration(_config : CnfHero)
  : void
  {
    this._m_config = _config;
    return;
  }

  setPowerShieldActor(_powerShield : Ty_physicsActor)
  : void
  {
    this._m_powerShieldActor = _powerShield;
    return;
  }

  getPowerShieldActor()
  : Ty_physicsActor
  {
    return this._m_powerShieldActor;
  }

  /**
   * Destroys this component.
   */
  destroy()
  : void 
  { 
    this._m_actor = null;
    return;
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
 
  private _onCollisionWithItem(_itemController : ICmpItemController)
  : void
  {
    // Restore health.

    this._m_actor.sendMessage
    (
      DC_MESSAGE_ID.kSetHealthPoints,
      this._m_config.health
    )

    this._m_secondary_action 
      = _itemController.getEffectType() as DC_SECONDARY_ACTION;
    return;
  }

  /**
   * Private constructor.
   */
  private constructor()
  { }

  /**
   * Reference to the hero configuartion object.
   */
  private _m_config : CnfHero;

  /**
   * Reference to the hero actor.
   */
  private _m_actor : Ty_physicsActor;

  /**
   * Reference to the power shield actor.
   */
  private _m_powerShieldActor : Ty_physicsActor;

  /**
   * Indicates the secondary action.
   */
  private _m_secondary_action : DC_SECONDARY_ACTION;

  /**
   * Active state.
   */
  private _m_activeState : ICmpState<CmpHeroController>;

  /**
   * Indicates if the pointer is been pressing.
   */
  private _m_pressingPointer : boolean;

  /**
   * Table of states.
   */
  private _m_hStates : Map<string, ICmpState<CmpHeroController>>;
}