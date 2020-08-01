import { COMPONENT_ID } from "commons/mxEnums";
/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file erranteSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-31-2020
 */

import { DC_COMPONENT_ID, DC_ENEMY_TYPE, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor} from "../../commons/1942types";
import { CmpEnemyHealth } from "../../components/cmpEnemyHealth";
import { CmpErranteController } from "../../components/cmpErranteController";
import { CmpNullCollisionController } from "../../components/cmpNullCollisionController";
import { IEnemiesManager } from "../iEnemiesManager";
import { NullEnemiesManager } from "../nullEnemiesManager";
import { IEnemySpawner } from "./iEnemySpawner";
import { NullEnemySpawner } from "./nullEnemySpawner";

export class ErranteSpawner implements IEnemySpawner
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : ErranteSpawner
  {
    let spawner : ErranteSpawner = new ErranteSpawner();

    spawner._m_enemiesManager = NullEnemiesManager.GetInstance();

    spawner._m_collisionCntrl = CmpErranteController.Create();
    spawner._m_collisionCntrl.setSpawner(spawner);

    spawner._m_collisionCntrl.setPlayZoneP1(-100, -100);
    spawner._m_collisionCntrl.setPlayZoneP2(1180, 2020);

    return spawner;
  }

  update(_dt: number)
  : void 
  { 
    this._m_collisionCntrl.setDeltaTime(_dt);
    return;
  }

  spawn(_actor: Ty_physicsActor, _x: number, _y: number)
  : void 
  {
    this.assemble(_actor);    

    // Set Texture.

    let sprite = _actor.getWrappedInstance();
    sprite.setTexture('enemy');
    sprite.setAngle(90.0);
    
    sprite.body.setCircle(sprite.height * 0.5, -10.0, 0.0);   

    // Set position.

    _actor.sendMessage
    (
      DC_MESSAGE_ID.kToPosition, 
      new Phaser.Math.Vector3(_x, _y)
    );

    return;
  }

  getID()
  : DC_ENEMY_TYPE 
  {
    return DC_ENEMY_TYPE.kErrante;
  }

  /**
   * Assemble the components into the Actor.
   * 
   * @param _actor Actor. 
   */
  assemble(_actor : Ty_physicsActor)
  : void
  {
    _actor.addComponent(this._m_collisionCntrl);

    let healthComponent 
      = _actor.getComponent<CmpEnemyHealth>(DC_COMPONENT_ID.kEnemyHealth);

    healthComponent.setSpawner(this);
    healthComponent.setHP(5);
    return;
  }

  /**
   * Disassemble the component of the given actor.
   * 
   * @param _actor Actor.
   */
  disasemble(_actor : Ty_physicsActor)
  : void
  {
    _actor.addComponent(CmpNullCollisionController.GetInstance());

    let healthComponent 
      = _actor.getComponent<CmpEnemyHealth>(DC_COMPONENT_ID.kEnemyHealth);
    healthComponent.setSpawner(NullEnemySpawner.GetInstance());

    return;
  }

  setEnemiesManager(_enemiesManager : IEnemiesManager)
  : void
  {
    this._m_enemiesManager = _enemiesManager;
    return;
  }

  getEnemiesManager()
  : IEnemiesManager
  {
    return this._m_enemiesManager;
  }

  destroy()
  : void 
  {
    return;
  }
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
 
  /**
   * Private constructor.
   */
  private constructor()
  { }  
  
  /**
   * Reference to the enemies manager.
   */
  private _m_enemiesManager : IEnemiesManager;

  /**
   * Reference to the controller.
   */
  private _m_collisionCntrl : CmpErranteController; 
}