/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cadmioSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-19-2020
 */

import { DC_COMPONENT_ID, DC_CONFIG, DC_ITEM_TYPE, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor, Ty_physicsSprite } from "../../commons/1942types";
import { CmpCadmioController } from "../../components/cmpCadmioController";
import { CmpItemCollisionController } from "../../components/cmpItemCollisionController";
import { CmpNullCollisionController } from "../../components/cmpNullCollisionController";
import { CnfCadmio } from "../../configObjects/cnfCadmio";
import { GameManager } from "../../gameManager/gameManager";
import { ILevelConfiguration } from "../../levelConfiguration/ILevelConfiguration";
import { IItemManager } from "../IItemManager";
import { IItemSpawner } from "./IItemSpawner";

export class CadmioSpawner 
implements IItemSpawner
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Initialize the item spawner.
   * 
   * @param _scene Phaser scene. 
   * @param _gameManager Game Manager.
   * @param _itemManager Item Manager.
   */
  init
  (
    _scene : Phaser.Scene, 
    _gameManager : GameManager, 
    _itemManager : IItemManager
  )
  : void
  {
    // Create and configuration the Cadmio Controller.

    let cadmioController = this._m_cadmioController;

    if(this._m_cadmioController == null)
    {
      cadmioController = CmpCadmioController.Create();
      this._m_cadmioController = cadmioController;
    }

    // Get configuration object

    let levelConfig : ILevelConfiguration = _gameManager.getLevelConfiguration();

    let cadmioConfig : CnfCadmio 
      = levelConfig.getConfig<CnfCadmio>(DC_CONFIG.kCadmio);

    if(cadmioConfig == null)
    {
      cadmioConfig = new CnfCadmio();
    }

    // Setup.

    cadmioController.config(cadmioConfig);    
    cadmioController.setItemSpawner(this);

    // Create and configuration the Item Collision Controller.

    if(this._m_itemCollisionController == null)
    {
      this._m_itemCollisionController = CmpItemCollisionController.Create();
    }

    this._m_cadmioController = cadmioController;

    this._m_config = cadmioConfig;
    this.setItemManager(_itemManager);
    return;
  }

  /**
   * Preupdate the cadmio controller.
   * 
   * @param _dt delta time. 
   */
  update( _dt : number ) 
  : void
  {
    this._m_cadmioController.preUpdate(_dt);
    return;
  }

  /**
   * Spawns a Cadmio Fruit in the given position.
   * 
   * @param _actor item actor.
   * @param _x position x axis.
   * @param _y position y axis.
   * @param _data optional data.
   */
  spawn(_actor : Ty_physicsActor,_x : number, _y : number, _data ?: any)
  : void
  {
    this.assemble(_actor);

    _actor.sendMessage
    (
      DC_MESSAGE_ID.kToPosition,
      new Phaser.Math.Vector3(_x, _y)
    );
    return;
  }

  /**
   * assemble the item components.
   * 
   * @param _actor actor.
   */
  assemble(_actor : Ty_physicsActor)
  : void
  {
    _actor.addComponent(this._m_cadmioController);
    _actor.addComponent(this._m_itemCollisionController);

    let sprite : Ty_physicsSprite = _actor.getWrappedInstance();
    sprite.setTexture(this._m_config.texture_key);
    return;
  }

  /**
   * disassemble the item components.
   * 
   * @param _actor actor.
   */
  disassemble(_actor : Ty_physicsActor)
  : void
  {
    _actor.removeComponent(DC_COMPONENT_ID.kItemController);
    _actor.addComponent(CmpNullCollisionController.GetInstance());
    return;
  }

  /**
   * Set the item manager.
   * 
   * @param _manager item manager 
   */
  setItemManager(_manager : IItemManager)
  : void
  {
    this._m_cadmioController.setItemManager(_manager);
    this._m_itemManager = _manager;
    return;
  }

  /**
   * Get this item spawner identifier.
   */
  getID()
  : DC_ITEM_TYPE
  {
    return DC_ITEM_TYPE.kCadmio;
  }

  /**
   * Safely destroys the item spawner.
   */
  destroy()
  : void
  {
    if(this._m_cadmioController != null)
    {
      this._m_cadmioController.destroy();
      this._m_cadmioController = null;
    }

    if(this._m_itemCollisionController != null)
    {
      this._m_itemCollisionController.destroy();
      this._m_itemCollisionController = null; 
    }

    this._m_itemManager = null;
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the Item Manager of this spawner.
   */
  private _m_itemManager : IItemManager;

  /**
   * Reference to the configuration object.
   */
  private _m_config : CnfCadmio;

  ///////////////////////////////////
  // Shared Components

  /**
   * Cadmio controller component.
   */
  private _m_cadmioController : CmpCadmioController;

  /**
   * Item collision controller component.
   */
  private _m_itemCollisionController : CmpItemCollisionController;
}