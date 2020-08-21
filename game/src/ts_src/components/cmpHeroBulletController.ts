/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpHeroBulletController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-29-2020
 */

import { IBulletManager } from "../bulletManager/iBulletManager";
import { DC_COMPONENT_ID, DC_CONFIG, DC_MESSAGE_ID } from "../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite } from "../commons/1942types";
import { CnfBulletStateNormal } from "../configObjects/cnfBulletStateNormal";
import { CnfBulletStateTriple } from "../configObjects/cnfBulletStateTriple";
import { GameManager } from "../gameManager/gameManager";
import { ILevelConfiguration } from "../levelConfiguration/ILevelConfiguration";
import { SttHeroBulletNormal } from "../states/heroBulletController.ts/sttHeroBulletNormal";
import { SttHeroBulletTriple } from "../states/heroBulletController.ts/sttHeroBulletTriple";
import { IBaseState } from "../states/IBaseState";
import { NullState } from "../states/nullState";
import { cmpFSM } from "./cmpFSM";

/**
 * Spwan bullets relative to the hero position. It needs a BulletManager.
 */
export class CmpHeroBulletController 
extends cmpFSM<Ty_physicsSprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Creates a new hero bullet controller.
   */
  static Create()
  : CmpHeroBulletController
  {
    let bulletController : CmpHeroBulletController = new CmpHeroBulletController();
    
    bulletController.m_id = DC_COMPONENT_ID.kHeroBulletController;

    bulletController._m_active_state = NullState.GetInstance();
    bulletController._m_hStates = new Map<string, IBaseState>();
    
    return bulletController;
  }
  
  /**
   * Get the reference to the GameManager.
   */
  init(_actor: Ty_physicsActor)
  : void
  {
    
    let gameManager : GameManager = GameManager.GetInstance();
    let levelConfig : ILevelConfiguration = gameManager.getLevelConfiguration();
    
    let stateNormal_config = levelConfig.getConfig<CnfBulletStateNormal>
    (
      DC_CONFIG.kHeroBulletStateNormal
    );

    if(stateNormal_config == null)
    {
      stateNormal_config = new CnfBulletStateNormal();
    }

    ///////////////////////////////////
    // States

    // Normal State.

    let heroBulletManager =gameManager.getPlayerController().getBulletManager();

    let stateNormal = new SttHeroBulletNormal();
    stateNormal.init(_actor, this, heroBulletManager, stateNormal_config);

    this.addState(stateNormal);

    // Triple Shot State.

    let stateTripleConfig = levelConfig.getConfig<CnfBulletStateTriple>
    (
      DC_CONFIG.kHeroBulletStateTriple
    );

    if(stateTripleConfig == null)
    {
      stateTripleConfig = new CnfBulletStateTriple();
    }

    let stateTriple = new SttHeroBulletTriple();
    stateTriple.init(_actor, this, heroBulletManager, stateTripleConfig);

    this.addState(stateTriple);

    // default state.

    this.setActiveState('Normal');
    return;
  }

  /**
   * Set the bullet manager.
   * 
   * @param _bulletManager bullet manager. 
   */
  setBulletManager(_bulletManager : IBulletManager)
  : void
  {
    this._m_hStates.forEach
    (
      function(state : IBaseState)
      {
        state.receive
        (
          DC_MESSAGE_ID.kSetBulletManager,
          _bulletManager
        );
        return;
      }
    );
    return;
  }

  m_id: number;
}