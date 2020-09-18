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
import { StateHeroFFlight } from "../states/heroAnimations/stateHeroFFLight";
import { StateHeroGlide } from "../states/heroAnimations/stateHeroGlide";
import { CmpHeroBulletController } from "../components/cmpHeroBulletController";
import { IBulletManager } from "../bulletManager/iBulletManager";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { NullBulletManager } from "../bulletManager/nullBulletManager";
import { CmpHeroData } from "../components/cmpHeroData";
import { Ty_physicsActor, Ty_physicsSprite, V2 } from "../commons/1942types";
import { IPlayerController } from "./IPlayerController";
import { CmpHeroController } from "../components/cmpHeroController";
import { StateHeroBarrelRoll } from "../states/heroAnimations/stateHeroBarrelRoll";
import { SttHeroBarrelRoll } from "../states/heroController/sttHeroBarrelRoll";
import { CnfPowerShield } from "../configObjects/cnfPowerShield";
import { CmpPowerShieldController } from "../components/cmpPowerShieldController";
import { CmpPowerShieldCollisionController } from "../components/cmpPowerShieldCollisionController";
import { StateHeroPowerShield } from "../states/heroAnimations/stateHeroPowerShield";
import { CmpHeroCollision } from "../components/cmpHeroCollision";
import { CnfKalebio } from "../configObjects/cnfKalebio";

/**
 * Create and manage the hero's actor. It provides a friendly interface to control
 * the hero.
 */
export class PlayerController
implements IPlayerController
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
    _cnfHero : CnfKalebio,
    _cnfPowerShield : CnfPowerShield
  ) : void
  {
    this._m_kill_count = 0;

    ///////////////////////////////////
    // Hero

    // Create the Arcade Sprite

    let heroSprite : Phaser.Physics.Arcade.Sprite 
      = _scene.physics.add.sprite
      (
        0, 
        0, 
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
    hero.addComponent(CmpHeroCollision.Create());
    hero.addComponent(CmpHeroController.Create());

    hero.init();

    this.setPlayer(hero);

    ///////////////////////////////////
    // Hero Power Shield

    let powerShieldSprite : Ty_physicsSprite = _scene.physics.add.sprite
    (
      _scene.game.canvas.width * 0.5, 
      _scene.game.canvas.height * 0.5, 
      _cnfPowerShield.texture_key
    );

    let powerShield = BaseActor.Create
    (
      powerShieldSprite,
      'Hero Power Shield'
    );

    powerShieldSprite.setData('actor', powerShield);

    let cmpShieldController = CmpPowerShieldController.Create();    
    powerShield.addComponent(cmpShieldController);

    let cmpShieldCollision = CmpPowerShieldCollisionController.Create();
    powerShield.addComponent(cmpShieldCollision);

    powerShield.init();    

    // Setup the shield controller.

    cmpShieldController.setHeroActor(hero);
    cmpShieldController.setConfiguration(_cnfPowerShield);    

    ///////////////////////////////////
    // Animations

    let anim : CmpAnimation 
      = hero.getComponent<CmpAnimation>(DC_COMPONENT_ID.kAnimation);

    anim.addState(new StateHeroFFlight());
    anim.addState(new StateHeroGlide());
    anim.addState(new StateHeroBarrelRoll());
    anim.addState(new StateHeroPowerShield());

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

    // Set the movement padding.

    let canvas = _scene.game.canvas;

    this.setMovementPadding
    (
      _cnfHero.hero_playzone_padding,
      _cnfHero.hero_playzone_padding,
      canvas.width - _cnfHero.hero_playzone_padding,
      canvas.height - _cnfHero.hero_playzone_padding
    );
    
    // Set the hero configuration.

    this.setHeroConfiguration(_cnfHero);    

    this.setPowerShieldActor(powerShield);
    cmpShieldController.activeDesactiveState();

    // Set the hero Collider.

    heroSprite.body.setSize(_cnfHero.collider_width, _cnfHero.collider_height);

    heroSprite.body.offset.setTo
    (
      ((heroSprite.width - _cnfHero.collider_width) * 0.5) + _cnfHero.collider_x,
      ((heroSprite.height - _cnfHero.collider_height) * 0.5) + _cnfHero.collider_y,
    );

    return;
  }

  setPowerShieldActor(_actor : Ty_physicsActor)
  : void
  {
    let heroController : CmpHeroController
      = this._m_player.getComponent<CmpHeroController>(DC_COMPONENT_ID.kHeroController);

    heroController.setPowerShieldActor(_actor);
    this._m_shield = _actor;
    return;
  }

  getPowerShield()
  : Ty_physicsActor
  {
    return this._m_shield;
  }

  /**
   * Set the hero's bullet manager.
   * 
   * @param _bulletManager bullet manager.
   */
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
   * Get the hero's bullet manager.
   * 
   * @returns bullet manager.
   */
  getBulletManager()
  : IBulletManager
  {
    return this._m_bulletManager;
  }

  /**
   * Set the input pointer that controls the hero states.
   * 
   * @param _pointer phaser input pointer. 
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
   * Get the input pointer that controls the hero states.
   */
  getPointer()
  : Phaser.Input.Pointer
  {
    let input : CmpHeroInput 
      = this._m_player.getComponent<CmpHeroInput>(DC_COMPONENT_ID.kHeroInput);

    return input.getPointer();
  }

 /**
   * Set the movement mode of the hero. The modes define the behaviour wich the
   * actor will react to the events of the pointer.
   * 
   * * ABSOLUTE : The hero moves to the pointer position.
   * * RELATIVE : The hero moves the same ammount and direction as the pointer. 
   * * MIXED : The hero moves moves tho the pointer X position, but relative to
   * its Y position.
   * 
   * @param _mode input mode.
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
   * Get the movement mode of the hero. The mode defines the behaviour which the
   * actor react to the events of the pointer
   * 
   * * ABSOLUTE : The hero moves to the pointer position.
   * * RELATIVE : The hero moves the same ammount and direction as the pointer. 
   * * MIXED : The hero moves moves tho the pointer X position, but relative to
   * its Y position.
   * 
   * @returns input mode.
   */
  getInputMode()
  : string
  {
    let input : CmpHeroInput 
      = this._m_player.getComponent<CmpHeroInput>(DC_COMPONENT_ID.kHeroInput);

    return input.getMode();
  }

  setHeroConfiguration(_config : CnfKalebio)
  : void
  {
    let heroController : CmpHeroController
      = this._m_player.getComponent<CmpHeroController>(DC_COMPONENT_ID.kHeroController);

    heroController.setConfiguration(_config);

    this.setPosition(_config.x, _config.y);
    this.setInputMode(_config.movement_mode);
    this.setHeroSpeed(_config.maximum_speed);
    this.setBarrelRollDuration(_config.barrel_roll_duration);
    this.setHeroHealth(_config.health);
    return;
  }

  setHeroHealth(_health : integer)
  : void
  {
    this._m_player.sendMessage
    (
      DC_MESSAGE_ID.kSetHealthPoints,
      _health
    );
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
   * Get the maximum speed (pixels per frame) of the hero when it moves to 
   * the pointer position in a ABSOLUTE or MIXED mode.
   * 
   * @returns maximum speed in pixels per frame. 
   */
  getHeroSpeed()
  : number
  {
    let input : CmpHeroInput 
      = this._m_player.getComponent<CmpHeroInput>(DC_COMPONENT_ID.kHeroInput);

    return input.getSpeed();
  }  

  /**
   * Set the hero's barrel roll action duration in seconds.
   * 
   * @param _duration duration in seconds. 
   */
  setBarrelRollDuration(_duration : number)
  : void
  {
    let heroController : CmpHeroController
      = this._m_player.getComponent<CmpHeroController>
      (
        DC_COMPONENT_ID.kHeroController
      );
    
    let barrelRollState : SttHeroBarrelRoll
      = heroController.getState('barrelRoll') as SttHeroBarrelRoll;
    
    barrelRollState.setStateDuration(_duration);
    return;
  }

  /**
   * Set the zone of free movement. The hero's position is limited by the 
   * boudings of this zone.
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
   * Set the hero's actor.
   * 
   * @param _player actor.
   */
  setPlayer(_player : Ty_physicsActor)
  : void
  {
    this._m_player = _player;
    return;
  }

  /**
   * Get the hero's actor
   * 
   * @returns actor.
   */
  getPlayer()
  : Ty_physicsActor
  {
    return this._m_player;
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
   * Get the current hero position.
   * 
   * @returns hero's position.
   */
  getPosition()
  : V2
  {
    let sprite = this._m_player.getWrappedInstance();

    return new Phaser.Math.Vector2(sprite.x, sprite.y);
  }

  /**
   * Get the player direction vector.
   * 
   * @reaturns Phaser Vector2
   */
  getDirection()
  : V2
  {
    let movement : CmpMovement
      = this._m_player.getComponent<CmpMovement>(DC_COMPONENT_ID.kMovement);

    return movement.getDirection();
  }

  /**
   * Handle the pointer events and update the actor components.
   * 
   * The playerController must have a reference to the hero and the InputPlugin
   * when this method is called.
   * 
   * @param _dt delta time. 
   */
  update(_dt : number)
  : void
  {
    // Update logic

    this._m_player.update();
    this._m_shield.update();

    this._m_bulletManager.update(_dt);

    return;
  }

  /**
   * Add kills to the kill count.
   * 
   * @param _kills number of kills to add.
   * 
   * @returns returns the number of kills, after addition. 
   */
  addKills(_kills : integer)
  : integer
  {
    this._m_kill_count += _kills;
    return this._m_kill_count;
  }

  /**
   * Get the kill counter.
   * 
   * @returns number of kills.
   */
  getKillCount()
  : integer
  {
    return this._m_kill_count;
  }

  /**
   * Safely destroys this game controller.
   */
  destroy()
  : void
  {
    // Destroy BulletManager.

    this._m_bulletManager.destroy();
    this._m_bulletManager = null;
    
    // Destroy Dragon.

    let sprite = this._m_player.getWrappedInstance();
    
    this._m_player.destroy();
    sprite.destroy();
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Number of kills.
   */
  private _m_kill_count : integer;

  /**
   * Reference to the Hero.
   */
  private _m_player : Ty_physicsActor;

  /**
   * Reference to the Hero's Power Shield.
   */
  private _m_shield : Ty_physicsActor;

  /**
   * Reference to the bullet manager.
   */
  private _m_bulletManager : IBulletManager;
}