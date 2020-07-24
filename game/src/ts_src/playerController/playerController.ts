/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Create and manage the hero's actor. It provides a friendly interface 
 * to control the hero.
 *
 * @file playerController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-22-2020
 */

import { BaseActor } from "../actors/baseActor";
import { PlayerControllerConfig } from "./playerControllerConfig";
import { CmpHeroInput } from "../components/cmpHeroInput"
import { DC_COMPONENT_ID } from "../components/dcComponentID";
import { CmpMovement } from "../components/cmpMovement";
import { CmpAnimation } from "../components/cmpAnimation";
import { StateHeroIdle } from "../states/stateHeroIdle";

/**
 * Create and manage the hero's actor. It provides a friendly interface to control
 * the hero.
 */
export class PlayerController
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor()
  { }
  
  /**
   * Creates the hero's actor and setup the properties of the hero behaviour with
   * a configuration object.
   * 
   * @param _scene The phaser scene that will create the hero.
   * @param _activePointer The pointer used to handle the hero input. The active 
   * pointer of the scene is used by default.
   * @param _config The user configuration object.
   */
  public init
  (
    _scene : Phaser.Scene,
    _activePointer ?: Phaser.Input.Pointer,
    _config ?: PlayerControllerConfig
  ) : void
  {
    ///////////////////////////////////
    // Hero

    // Create the Arcade Sprite

    let heroSprite : Phaser.Physics.Arcade.Sprite 
      = _scene.physics.add.sprite(0.0, 0.0, 'DragonFlight', 0);

    // Create the Hero Actor
    
    let hero : BaseActor<Phaser.Physics.Arcade.Sprite> 
      = BaseActor.Create(heroSprite, "hero");
    
    hero.addComponent(CmpHeroInput.Create()); // Input Controller
    hero.addComponent(CmpMovement.Create()); // Movement Controller
    hero.addComponent(CmpAnimation.Create());
    
    this.setPlayer(hero);

    // Setup the input pointer.

    if(_activePointer !== undefined) {
      this.setPointer(_activePointer);
    }
    else {
      this.setPointer(_scene.input.activePointer);
    }

    ///////////////////////////////////
    // User Configuration

    if(_config !== undefined) 
    {
      this.setInputMode(_config.control_type);
      this.setHeroSpeed(_config.player_speed);
      this.setMovementPadding
      (
        _config.movement_rect_p1_x,
        _config.movement_rect_p1_y,
        _config.movement_rect_p2_x,
        _config.movement_rect_p2_y
      );
    }   
    
    // Initialize the Hero
    
    hero.init();

    ///////////////////////////////////
    // Animations

    let anim : CmpAnimation 
      = hero.getComponent<CmpAnimation>(DC_COMPONENT_ID.kAnimation);

    anim.addState(new StateHeroIdle());

    anim.setActive('Hero_Idle');
    return;
  }

  /**
   * Set the pointer that is associated to the player input.
   * 
   * @param _pointer Phaser pointer.
   */
  public setPointer(_pointer : Phaser.Input.Pointer)
  : void
  {
    let input : CmpHeroInput 
      = this._m_player.getComponent<CmpHeroInput>(DC_COMPONENT_ID.kHeroInput);

    input.setPointer(_pointer);
    return;
  }

  /**
   * Set the input mode to control the hero.
   * 
   * ABSOLUTE : The hero moves to the pointer position.
   * 
   * RELATIVE : The hero moves the same ammount and direction as the pointer.
   * 
   * MIXED : The hero moves moves tho the pointer X position, but relative to
   * its Y position.
   * 
   * @param _mode Input Mode.
   */
  public setInputMode(_mode : string)
  : void
  {
    let input : CmpHeroInput 
      = this._m_player.getComponent<CmpHeroInput>(DC_COMPONENT_ID.kHeroInput);

    input.setMode(_mode);
    return;
  }

  /**
   * Set the maximum speed (pixels per frame) of the hero when it moves to 
   * the pointer position in a ABSOLUTE or MIXED mode.
   * 
   * @param _speed Maximum speed in pixels per frame. 
   */
  setHeroSpeed(_speed : number)
  : void
  {
    let input : CmpHeroInput 
      = this._m_player.getComponent<CmpHeroInput>(DC_COMPONENT_ID.kHeroInput);

    input.setSpeed(_speed);
    return;
  }

  /**
   * Set the hero limit of movement in the world. 
   * 
   * @param _p1_x Rect point 1, x value.
   * @param _p1_y Rect point 1, y value.
   * @param _p2_x Rect point 2, x value.
   * @param _p2_y Rect point 2, y value.
   */
  setMovementPadding
  (
    _p1_x : number, 
    _p1_y : number, 
    _p2_x : number, 
    _p2_y : number
  )
  : void
  {
    let movement : CmpMovement
      = this._m_player.getComponent<CmpMovement>(DC_COMPONENT_ID.kMovement);
    
    movement.setBounding(_p1_x, _p1_y, _p2_x, _p2_y);
    return;
  }

  /**
   * Set the Hero.
   * 
   * @param _player 
   */
  public setPlayer(_player : BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void
  {
    this._m_player = _player;
    return;
  }

  /**
   * Get the Hero.
   */
  public getPlayer()
  : BaseActor<Phaser.Physics.Arcade.Sprite>
  {
    return this._m_player;
  }

  /**
   * Handle the inputs and update any logic proccess.
   * 
   * The playerController must have a reference to the hero and the InputPlugin
   * when this method is called.
   * 
   * @param _dt Delta time. 
   */
  public update(_dt : number)
  : void
  {
    // Update logic

    this._m_player.update();

    return;
  }

  /**
   * Safely destroys this object.
   */
  public destroy()
  : void
  {
    this._m_player.destroy();
    return;
  } 

  /**
   * Get the player direction vector.
   * 
   * @reaturns Phaser Vector2
   */
  public getDirection()
  : Phaser.Math.Vector2
  {
    let movement : CmpMovement
      = this._m_player.getComponent<CmpMovement>(DC_COMPONENT_ID.kMovement);

    return movement.getDirection();
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the Hero.
   */
  private _m_player : BaseActor<Phaser.Physics.Arcade.Sprite>;
}