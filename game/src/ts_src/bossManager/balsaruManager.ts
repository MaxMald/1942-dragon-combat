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
import { NullBulletManager } from "../bulletManager/nullBulletManager";
import { DC_CONFIG, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_Image, Ty_physicsActor, V3 } from "../commons/1942types";
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

    // Create balsaru.

    let balsaru = FcBalsaru.Create(_scene, initConfig);
    this._m_balsaru = balsaru;

    return;
  }

  update(_dt: number)
  : void 
  {
    this._m_balsaru.update();
    return;
  }

  getBossHealth()
  : number 
  {
    // TODO

    return 0;
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
    // TODO

    return;
  }

  getHero()
  : Ty_physicsActor 
  {
    // TODO

    return null;
  }

  setBulletManager(_bulletManager: IBulletManager)
  : void 
  {
    // TODO
    
    return;
  }

  getBulletManager()
  : IBulletManager 
  {
    // TODO

    return NullBulletManager.GetInstance();
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
    // TODO

    return;
  }

  unsuscribe(_event: string, _username: string)
  : void 
  {
    // TODO

    return;
  }

  receive(_id: DC_MESSAGE_ID, _msg: any)
  : void 
  {
    // TODO

    return;
  }

  active()
  : void 
  {
    // TODO

    return;
  }

  desactive()
  : void 
  {
    // TODO

    return;
  }

  destroy()
  : void 
  {
    this._m_balsaru.destroy();
    return;
  }
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Balsaru.
   */
  private _m_balsaru : PrefabActor;
}