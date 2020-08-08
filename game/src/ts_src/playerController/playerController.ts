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
import { CmpHeroInput } from "../components/cmpHeroInput"
import { CmpMovement } from "../components/cmpMovement";
import { CmpAnimation } from "../components/cmpAnimation";
import { StateHeroFFlight } from "../states/stateHeroFFLight";
import { StateHeroGlide } from "../states/stateHeroGlide";
import { CmpHeroBulletController } from "../components/cmpHeroBulletController";
import { IBulletManager } from "../bulletManager/iBulletManager";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { NullBulletManager } from "../bulletManager/nullBulletManager";
import { CmpHeroData } from "../components/cmpHeroData";
import { CmpNullCollisionController } from "../components/cmpNullCollisionController";
import { Point, Ty_physicsActor } from "../commons/1942types";
import { CnfHero } from "../commons/1942config";

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
  { 
    this._m_bulletManager = NullBulletManager.GetInstance();
    return;
  }
  
  /**
   * Creates the hero's actor and setup the properties of the hero behaviour with
   * a configuration object.
   * 
   * @param _scene The phaser scene that will create the hero.
   * @param _bulletManager The hero's bullet manager.
   * @param _activePointer The pointer used to handle the hero input. The active 
   * pointer of the scene is used by default.
   * @param _config The user configuration object.
   */
  init
  (
    _scene : Phaser.Scene,
    _cnfHero : CnfHero
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
        _cnfHero.texture, 
        _cnfHero.frame
      );

    // Create the actor.

    let hero : BaseActor<Phaser.Physics.Arcade.Sprite> 
      = BaseActor.Create(heroSprite, "Hero");
    
    heroSprite.setData('actor', hero);

    // Create the hero's compnents.

    hero.addComponent(CmpHeroInput.Create());
    hero.addComponent(CmpMovement.Create());
    hero.addComponent(CmpAnimation.Create());
    hero.addComponent(CmpHeroData.Create());
    hero.addComponent(CmpHeroBulletController.Create());
    hero.addComponent(CmpNullCollisionController.GetInstance());

    hero.init();

    this.setPlayer(hero);

    ///////////////////////////////////
    // Animations

    let anim : CmpAnimation 
      = hero.getComponent<CmpAnimation>(DC_COMPONENT_ID.kAnimation);

    anim.addState(new StateHeroFFlight());
    anim.addState(new StateHeroGlide());

    anim.setActive('Hero_Forward_Flight');

    ///////////////////////////////////
    // Properties

    // Define the active pointer.

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

    this.setPosition(_cnfHero.x, _cnfHero.y);
    this.setInputMode(_cnfHero.movement_mode);
    this.setHeroSpeed(_cnfHero.maximum_speed);
    this.setHeroFireRate(_cnfHero.fireRate);

    let canvas = _scene.game.canvas;

    this.setMovementPadding
    (
      _cnfHero.hero_playzone_padding,
      _cnfHero.hero_playzone_padding,
      canvas.width - _cnfHero.hero_playzone_padding,
      canvas.height - _cnfHero.hero_playzone_padding
    );    
    return;
  }

  setBulletManager(_bulletManager : IBulletManager)
  : void
  {
    this._m_bulletManager = _bulletManager;

    let bulletCntrl = this._m_player.getComponent<CmpHeroBulletController>
    (
      DC_COMPONENT_ID.kHeroBulletController
    );

    bulletCntrl.setBulletManager(_bulletManager);

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
  setPlayer(_player : Ty_physicsActor)
  : void
  {
    this._m_player = _player;
    return;
  }

  /**
   * Get the Hero.
   */
  getPlayer()
  : Ty_physicsActor
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

    this._m_bulletManager.update(_dt);

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
   * Set player to the given position.
   * 
   * @param _x x component. 
   * @param _y y component.
   */
  setPosition(_x : number, _y : number)
  : void
  {
    this._m_player.sendMessage
    (
      DC_MESSAGE_ID.kToPosition, 
      new Phaser.Math.Vector3(_x, _y, 0.0)
    );
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
  private _m_player : Ty_physicsActor;

  /**
   * Reference to the bullet manager.
   */
  private _m_bulletManager : IBulletManager;
}