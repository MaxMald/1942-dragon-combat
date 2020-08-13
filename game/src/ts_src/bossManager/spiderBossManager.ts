/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file spiderBossManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-12-2020
 */

import { BaseActor } from "../actors/baseActor";
import { IBulletManager } from "../bulletManager/iBulletManager";
import { NullBulletManager } from "../bulletManager/nullBulletManager";
import { DC_COMPONENT_ID, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite } from "../commons/1942types";
import { CmpNullCollisionController } from "../components/cmpNullCollisionController";
import { CmpPhysicSpriteController } from "../components/cmpPhysicSpriteController";
import { CmpSpiderBossController } from "../components/cmpSpiderBossController";
import { GameManager } from "../gameManager/gameManager";
import { IPlayerController } from "../playerController/IPlayerController";
import { StateSpiderAttack } from "../states/stateSpiderAttack";
import { IBossManager } from "./IBossManager";

export class SpiderBossManager
implements IBossManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Initialize the boss manager and setup default values.
   * 
   * @param _scene phaser scene. 
   * @param _gameManager game manager.
   */
  init(_scene : Phaser.Scene, _gameManager : GameManager)
  : void
  { 
    this.destroy();

    this._m_bulletManager = NullBulletManager.GetInstance();

    let phySprite = _scene.physics.add.sprite
    (
      0.0,
      0.0,
      'spiderBoss'
    );

    let spiderActor = BaseActor.Create<Ty_physicsSprite>
    (
      phySprite, 
      'SpiderBoss'
    );

    phySprite.setData('actor', spiderActor);

    spiderActor.addComponent(CmpPhysicSpriteController.Create());
    spiderActor.addComponent(new CmpSpiderBossController());
    spiderActor.addComponent(CmpNullCollisionController.GetInstance());

    spiderActor.init();

    this._m_spider = spiderActor;
    return;
  }

  /**
   * Updat the spider.
   * 
   * @param _dt delta time 
   */
  update(_dt: number)
  : void 
  { 
    this._m_spider.update();
    return;
  }

  /**
   * Get the Boss HealtPoints.
   * 
   * @returns health points.
   */
  getBossHealth()
  : number
  {
    let spiderController = this._m_spider.getComponent<CmpSpiderBossController>
    (
      DC_COMPONENT_ID.kSpiderBossController
    );

    return spiderController.getHealth();
  }

  /**
   * Set the spider position.
   * 
   * @param _x x component. 
   * @param _y y component.
   */
  setPosition(_x : number, _y : number)
  : void
  {
    this._m_spider.sendMessage
    (
      DC_MESSAGE_ID.kToPosition,
      new Phaser.Math.Vector3(_x, _y, 0.0)
    );
    return;
  }

  /**
   * Set the hero.
   * 
   * @param _playerController player controller.
   * @param _actor actor. 
   */
  setHero(_playerController : IPlayerController, _actor: Ty_physicsActor)
  : void 
  {    
    // Collision with the player bullet manager.

    let heroBulletManager = _playerController.getBulletManager();

    let gameManager = GameManager.GetInstance();

    heroBulletManager.collisionVsSprite
    (
      gameManager.getGameScene(),
      this._m_spider.getWrappedInstance()
    );

    this._m_hero = _actor;
    return;
  }

  /**
   * Get the hero.
   * 
   * @returns actor.
   */
  getHero()
  : Ty_physicsActor 
  {
    return this._m_hero;
  }

  /**
   * Set the bullet manager for the boss.
   * 
   * @param _bulletManager bullet manager.
   */
  setBulletManager(_bulletManager: IBulletManager)
  : void 
  {
    this._m_bulletManager = _bulletManager;

    let spiderControl = this._m_spider.getComponent<CmpSpiderBossController>
    (
      DC_COMPONENT_ID.kSpiderBossController
    );

    let attackState 
      = spiderControl.getState('Spider_Attack') as StateSpiderAttack;

    attackState.setBulletManager(_bulletManager);

    spiderControl
    return;
  }

  /**
   * Get the bullet manager of the boss.
   * 
   * @returns bullet manager.
   */
  getBulletManager()
  : IBulletManager 
  {    
    return this._m_bulletManager;
  }

  /**
   * Active the boss.
   */
  active()
  : void 
  {
    this._m_spider.sendMessage(DC_MESSAGE_ID.kBossEnter, null);
    return;
  }

  /**
   * Desactive the boss.
   */
  desactive()
  : void 
  {
    return;
  }

  /**
   * Suscribe to an event.
   * 
   * * onHealthChanged : Trigger when the health of the boss changed. Args:
   *   {number} healt points.
   * 
   * @param _event event key. 
   * @param _username username.
   * @param _fn function.
   * @param _context context.
   */
  suscribe
  (
    _event : string, 
    _username : string, 
    _fn : (_bossManager : IBossManager, _args : any) => void,
    _context : any
  ) : void
  {
    let spiderController = this._m_spider.getComponent<CmpSpiderBossController>
    (
      DC_COMPONENT_ID.kSpiderBossController
    );

    spiderController.suscribe(_event, _username, _fn, _context);
    return;
  }

  /**
   * Unsuscribe to an event.
   * 
   * * onHealthChanged : Trigger when the health of the boss changed. Args:
   *   {number} healt points.
   * 
   * @param _event event key. 
   * @param _username username.
   */
  unsuscribe(_event : string, _username : string) 
  : void
  {
    let spiderController = this._m_spider.getComponent<CmpSpiderBossController>
    (
      DC_COMPONENT_ID.kSpiderBossController
    );

    spiderController.unsuscribe(_event, _username);
    return;
  }

  /**
   * Receive a message;
   * 
   * @param _id message id.
   * @param _msg message
   */
  receive(_id : DC_MESSAGE_ID, _msg : any)
  : void
  {
    if(_id == DC_MESSAGE_ID.kBossEnter)
    {
      this.active();
    }
    return;
  }
  
  /**
   * Safely destroys the boss.
   */
  destroy()
  : void 
  {
    if(this._m_spider != null)
    {
      this._m_spider.destroy();
      this._m_spider = null;
    }

    this._m_bulletManager = null;
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the hero's actor.
   */
  private _m_hero : Ty_physicsActor;

  /**
   * Reference to the spider's actor.
   */
  private _m_spider : Ty_physicsActor;

  /**
   * Reference to the bullet manager.
   */
  private _m_bulletManager : IBulletManager;
}