/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Provides configuration object for the game systems and components.
 * This configurations can be loaded from a Tiled Object Layer.
 *
 * @file ILevelConfiguration.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-20-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileMap } from "../commons/1942types";
import { IConfigObject } from "../configObjects/IConfigObject";
import { GameManager } from "../gameManager/gameManager";

 /**
  * Provides configuration object for the game systems and components.
  * This configurations can be loaded from a Tiled Object Layer.
  */
export interface ILevelConfiguration
{
  /**
   * Initialize the level configuration.
   */
  init(_scene : Phaser.Scene, _gameManager : GameManager)
  : void;

  /**
   * Load configuration objects from a Tiled Map.
   * 
   * @param _map Tiled Map. 
   * @param _layerName Name of the object layer.
   */
  setFromMap(_map : Ty_TileMap, _layerName : string)
  : void;

  /**
   * Add a configuration object.
   * 
   * @param _config configuration object. 
   */
  addConfig(_config : IConfigObject)
  : void;

  /**
   * Get a configuartion object. Returns null if the config obj is not found.
   * 
   * @param _id Config obj. id.
   * 
   * @returns Configuration object. null if is not found. 
   */
  getConfig<T extends IConfigObject>(_id : DC_CONFIG)
  : T;

  /**
   * Clears this level configuration.
   */
  clear()
  : void;

  /**
   * Safely destroys this level configuration.
   */
  destroy()
  : void;
}