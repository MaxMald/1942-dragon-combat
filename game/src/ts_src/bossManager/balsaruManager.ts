/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file balsaruManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-04-2020
 */

import { BaseActor } from "../actors/baseActor";
import { PrefabActor } from "../actors/prefabActor";
import { IBulletManager } from "../bulletManager/iBulletManager";
import { DC_COMPONENT_ID, DC_CONFIG, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_Image, Ty_physicsActor, Ty_physicsSprite, V3 } from "../commons/1942types";
import { CmpBalsaruController } from "../components/cmpBalsaruControllert";
import { CnfBalsaruHead } from "../configObjects/cnfBalsaruHead";
import { CnfBalsaruInit } from "../configObjects/cnfBalsaruInit";
import { FcBalsaru } from "../factories/fcBalsaru";
import { GameManager } from "../gameManager/gameManager";
import { ILevelConfiguration } from "../levelConfiguration/ILevelConfiguration";
import { IPlayerController } from "../playerController/IPlayerController";
import { IBossManager } from "./iBossManager";

export class BalsaruManager 
implements IBossManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  init(_scene: Phaser.Scene, _gameManager: GameManager)
  : void 
  {
    let levelConfiguration : ILevelConfiguration 
      = _gameManager.getLevelConfiguration();

    let initConfig = levelConfiguration.getConfig<CnfBalsaruInit>
    (
      DC_CONFIG.kBalsaruInit
    );

    let headConfig = levelConfiguration.getConfig<CnfBalsaruHead>
    (
      DC_CONFIG.kBalsaruHead
    );

    // Create balsaru.

    let balsaru = FcBalsaru.Create(_scene, initConfig, headConfig);

    this._m_balsaru = balsaru;

    // Get Balsaru Controller.

    let head : BaseActor<Ty_physicsSprite> = balsaru.getChild('head');

    this._m_balsaruController = head.getComponent
    (
      DC_COMPONENT_ID.kBalsaruController
    );

    // active
    
    this.desactive();

    return;
  }

  update(_dt: number)
  : void 
  {
    // Update Prefab.

    if(this._m_isActive)
    {
      this._m_balsaru.update();
    }    

    return;
  }

  getBossHealth()
  : number 
  {
    return this._m_balsaruController.getHealth();
  }

  setPosition(_x: number, _y: number)
  : void 
  {
    let balsaru = this._m_balsaru;

    // Get the Ship Actor

    let ship : BaseActor<Ty_Image> 
      = balsaru.getChild<BaseActor<Ty_Image>>('ship');

    // Get the ship actual position.

    let shipSprite : Ty_Image = ship.getWrappedInstance();

    let move : V3 = new Phaser.Math.Vector3
    (
      _x - shipSprite.x, 
      _y - shipSprite.y
    );

    // Send Movement.

    balsaru.sendMessage(DC_MESSAGE_ID.kAgentMove, move);

    return;
  }

  setHero(_playerController: IPlayerController, _actor: Ty_physicsActor)
  : void 
  {
    // Get the head actor.

    let head = this._m_balsaru.getChild<BaseActor<Ty_physicsSprite>>('head');

    // Collision with the player bullet manager.

    let heroBulletManager = _playerController.getBulletManager();

    let gameManager = GameManager.GetInstance();

    heroBulletManager.collisionVsSprite
    (
      gameManager.getGameScene(),
      head.getWrappedInstance()
    );
    
    // Save hero.

    this._m_hero = _actor;

    return;
  }

  getHero()
  : Ty_physicsActor 
  {
    return this._m_hero;
  }

  setBulletManager(_bulletManager: IBulletManager)
  : void 
  {
    this._m_balsaru.sendMessage
    (
      DC_MESSAGE_ID.kSetBulletManager,
      _bulletManager
    );

    this._m_bulletManager = _bulletManager;

    return;
  }

  getBulletManager()
  : IBulletManager 
  {
    return this._m_bulletManager;
  }

  suscribe
  (
    _event: string, 
    _username: string, 
    _fn: (_bossManager: IBossManager, _args: any) => void, 
    _context: any
  )
  : void 
  {
    // Subscribe.

    this._m_balsaruController.suscribe
    (
      _event,
      _username,
      _fn,
      _context
    );

    return;
  }

  unsuscribe(_event: string, _username: string)
  : void 
  {
    this._m_balsaruController.unsuscribe
    (
      _event,
      _username
    );

    return;
  }

  receive(_id: DC_MESSAGE_ID, _msg: any)
  : void 
  {
    if(_id == DC_MESSAGE_ID.kBossEnter)
    {
      this.active();

      this._m_balsaruController.setStageMinHP(_msg as number);
    }

    this._m_balsaru.sendMessage
    (
      _id, 
      _msg
    );
    return;
  }

  active()
  : void 
  {
    this._m_isActive = true;
    
    this._m_balsaru.sendMessage
    (
      DC_MESSAGE_ID.kActive,
      undefined
    );
    return;
  }

  desactive()
  : void 
  {
    this._m_isActive = false;

    this._m_balsaru.sendMessage
    (
      DC_MESSAGE_ID.kDesactive,
      undefined
    );
    return;
  }

  destroy()
  : void 
  {
    this._m_balsaruController = null;
    
    this._m_balsaru.destroy();

    this._m_hero = null;

    this._m_bulletManager = null;
    return;
  }
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the balsaru controller.
   */
  private _m_balsaruController : CmpBalsaruController;

  /**
   * Balsaru.
   */
  private _m_balsaru : PrefabActor;

  /**
   * Reference of the hero.
   */
  private _m_hero : BaseActor<Ty_physicsSprite>;

  /**
   * Reference of the boss's bullet manager.
   */
  private _m_bulletManager : IBulletManager;

  /**
   * Health Points
   */
  private _m_isActive : boolean;
}