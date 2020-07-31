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
import { CmpMovement } from "../components/cmpMovement";
import { CmpAnimation } from "../components/cmpAnimation";
import { StateHeroFFlight } from "../states/stateHeroFFLight";
import { StateHeroGlide } from "../states/stateHeroGlide";
import { CmpHeroBulletController } from "../components/cmpHeroBulletController";
import { GameManager } from "../gameManager/gameManager";
import { IBulletManager } from "../bulletManager/iBulletManager";
import { DC_COMPONENT_ID } from "../commons/1942enums";

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
  init
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
      = _scene.physics.add.sprite
      (
        _scene.game.canvas.width * 0.5, 
        _scene.game.canvas.height * 0.5, 
        'DragonFlight', 
        0
      );

    // Create the Hero Actor
    
    let bulletManager : IBulletManager 
      = GameManager.GetInstance().getBulletManager();

    let hero : BaseActor<Phaser.Physics.Arcade.Sprite> 
      = BaseActor.Create(heroSprite, "hero");
    
    hero.addComponent(CmpHeroInput.Create()); // Input Controller
    hero.addComponent(CmpMovement.Create()); // Movement Controller
    hero.addComponent(CmpAnimation.Create()); // Animation Controller
    hero.addComponent(CmpHeroBulletController.Create(bulletManager)); // Bullet Controller
    
    this.setPlayer(hero);

    // Setup the input pointer.

    if(_activePointer !== undefined) {
      this.setPointer(_activePointer);
    }
    else 
    {
      if(_scene.game.device.input.touch) 
      {
        if(_scene.input.pointer1 === undefined)
        {
          _scene.input.addPointer();
        }

        this.setPointer(_scene.input.pointer1);
      }
      else
      {
        this.setPointer(_scene.input.activePointer);
      }
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
      this.setHeroFireRate(_config.player_fireRate);
    }
    else
    {
      this.setHeroFireRate(2);
    }
    
    // Initialize the Hero
    
    hero.init();

    ///////////////////////////////////
    // Animations

    let anim : CmpAnimation 
      = hero.getComponent<CmpAnimation>(DC_COMPONENT_ID.kAnimation);

    anim.addState(new StateHeroFFlight());
    anim.addState(new StateHeroGlide());

    anim.setActive('Hero_Forward_Flight');
    return;
  }

  /**
   * Set the pointer that is associated to the player input.
   * 
   * @param _pointer Phaser pointer.
   */
  setPointer(_pointer : Phaser.Input.Pointer)
  : void
  {
    let input : CmpHeroInput 
      = this._m_player.getComponent<CmpHeroInput>(DC_COMPONENT_ID.kHeroInput);

    input.setPointer(_pointer);
    return;
  }

  /**
   * Get the pointer that is associated to the player input.
   */
  getPointer()
  : Phaser.Input.Pointer
  {
    let input : CmpHeroInput 
      = this._m_player.getComponent<CmpHeroInput>(DC_COMPONENT_ID.kHeroInput);

    return input.getPointer();
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
  setInputMode(_mode : string)
  : void
  {
    let input : CmpHeroInput 
      = this._m_player.getComponent<CmpHeroInput>(DC_COMPONENT_ID.kHeroInput);

    input.setMode(_mode);
    return;
  }

  /**
   * 
   */
  getInputMode()
  : string
  {
    let input : CmpHeroInput 
      = this._m_player.getComponent<CmpHeroInput>(DC_COMPONENT_ID.kHeroInput);

    return input.getMode();
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
   * Set the Hero's fire rate in bullets per second.
   * 
   * @param _fireRate Number of bullets spawned per second. 
   */
  setHeroFireRate(_fireRate : number)
  : void
  {
    let bulletController : CmpHeroBulletController
      = this._m_player.getComponent<CmpHeroBulletController>(DC_COMPONENT_ID.kHeroBulletController);

    bulletController.setFireRate(_fireRate);
    return;
  }

  /**
   * Get the hero's fire rate in bullets per second.
   * 
   * @returns Number of bullets spawned per second. 
   */
  getHeroFireRate()
  : number
  {
    let bulletController : CmpHeroBulletController
      = this._m_player.getComponent<CmpHeroBulletController>(DC_COMPONENT_ID.kHeroBulletController);

    return bulletController.getFireRate();
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
  setPlayer(_player : BaseActor<Phaser.Physics.Arcade.Sprite>)
  : void
  {
    this._m_player = _player;
    return;
  }

  /**
   * Get the Hero.
   */
  getPlayer()
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
  update(_dt : number)
  : void
  {
    // Update logic

    this._m_player.update();

    return;
  }

  /**
   * Safely destroys this object.
   */
  destroy()
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
  getDirection()
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