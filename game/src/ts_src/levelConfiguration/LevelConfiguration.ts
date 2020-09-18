/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Provides configuration object for the game systems and components.
 * This configurations can be loaded from a Tiled Object Layer.
 *
 * @file LevelConfiguration.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-20-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileMap, Ty_TileObject } from "../commons/1942types";
import { CnfArponBullet } from "../configObjects/cnfArponBullet";
import { CnfArponBulletSpawner } from "../configObjects/cnfArponBulletSpawner";
import { CnfArponShipSpawner } from "../configObjects/cnfArponShipSpawner";
import { CnfBalsaruHead } from "../configObjects/cnfBalsaruHead";
import { CnfBalsaruIdle } from "../configObjects/cnfBalsaruIdle";
import { CnfBalsaruInit } from "../configObjects/cnfBalsaruInit";
import { CnfBalsaruShrink } from "../configObjects/cnfBalsaruShrink";
import { CnfBulletStateNormal } from "../configObjects/cnfBulletStateNormal";
import { CnfBulletStateTriple } from "../configObjects/cnfBulletStateTriple";
import { CnfCadmio } from "../configObjects/cnfCadmio";
import { CnfCanus } from "../configObjects/cnfCanus";
import { CnfEnemyBasicBullet } from "../configObjects/cnfEnemyBasicBullet";
import { CnfErranteSpawner } from "../configObjects/cnfErranteSpawner";
import { CnfHeroBasicBullet } from "../configObjects/cnfHeroBasicBullet";
import { CnfHeroTripleShotBullet } from "../configObjects/cnfHeroTripleShotBullet";
import { CnfItemManager } from "../configObjects/cnfItemManager";
import { CnfKalebio } from "../configObjects/cnfKalebio";
import { CnfPowerShield } from "../configObjects/cnfPowerShield";
import { CnfRangerSpawner } from "../configObjects/cnfRangerSpawnerConfig";
import { CnfScoreManager } from "../configObjects/cnfScoreManager";
import { CnfSonicSpawner } from "../configObjects/cnfSonicSpawner";
import { IConfigObject } from "../configObjects/IConfigObject";
import { GameManager } from "../gameManager/gameManager";
import { ILevelConfiguration } from "./ILevelConfiguration";

/**
  * Provides configuration object for the game systems and components.
  * This configurations can be loaded from a Tiled Object Layer.
  */
export class LevelConfiguration
implements ILevelConfiguration
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Creates an empty Level configuration.
   */
  constructor()
  {
    this._m_hConfig = new Map<DC_CONFIG, IConfigObject>();
    return;
  }

  /**
   * Initialize the level configuration with default configuration objects.
   */
  init(_scene : Phaser.Scene, _gameManager : GameManager)
  : void
  {
   
    this.addConfig(new CnfCanus());
    this.addConfig(new CnfCadmio());
    this.addConfig(new CnfItemManager());
    this.addConfig(new CnfBulletStateNormal());
    this.addConfig(new CnfBulletStateTriple());
    this.addConfig(new CnfHeroBasicBullet());
    this.addConfig(new CnfHeroTripleShotBullet());
    this.addConfig(new CnfPowerShield());
    this.addConfig(new CnfRangerSpawner());
    this.addConfig(new CnfSonicSpawner());
    this.addConfig(new CnfArponShipSpawner());
    this.addConfig(new CnfArponBullet());
    this.addConfig(new CnfArponBulletSpawner());
    this.addConfig(new CnfErranteSpawner());
    this.addConfig(new CnfEnemyBasicBullet());
    this.addConfig(new CnfScoreManager());
    this.addConfig(new CnfBalsaruInit());
    this.addConfig(new CnfBalsaruIdle());
    this.addConfig(new CnfBalsaruShrink());
    this.addConfig(new CnfBalsaruHead());
    this.addConfig(new CnfKalebio());

    return;
  }

  /**
   * Load configuration objects from a Tiled Map.
   * 
   * @param _map Tiled Map. 
   * @param _layerName Name of the object layer.
   */
  setFromMap(_map : Ty_TileMap, _layerName : string)
  : void
  {
    let objectLayer : Phaser.Tilemaps.ObjectLayer 
      = _map.getObjectLayer(_layerName);

    if(objectLayer == null)
    {
      console.warn("LevelConfiguration : Layer don't found : " + _layerName);
      return;
    }

    let hConfig = this._getConfigMapByName();
    let configObject : IConfigObject;

    let aElements : Ty_TileObject[] = objectLayer.objects;
    let elementSize : number = aElements.length;
    let element : Ty_TileObject;
    let index : number = 0;

    while(index < elementSize)
    {
      element = aElements[index];

      if(element.type !== undefined && element.type !== '')
      {
        if(hConfig.has(element.type))
        {
          configObject = hConfig.get(element.type);
          configObject.setFromObject(element);
        }
        else
        {
          console.log("LevelConfiguration doesn't has a configuration object of" 
                      + " type : " + element.type);
        }
      }

      ++index;
    }

    hConfig.clear();
    hConfig = null;
    return;
  }

  /**
   * Add a configuration object.
   * 
   * @param _config configuration object. 
   */
  addConfig(_config : IConfigObject)
  : void
  {
    this._m_hConfig.set(_config.getID(), _config);
    return;
  }

  /**
   * Get a configuartion object. Returns null if the config obj is not found.
   * 
   * @param _id Config obj. id.
   * 
   * @returns Configuration object. null if is not found. 
   */
  getConfig<T extends IConfigObject>(_id: DC_CONFIG)
  : T 
  {
    let hConfig = this._m_hConfig;
    
    if(hConfig.has(_id))
    {
      return hConfig.get(_id) as T;
    }    
    return null;
  }

  /**
   * Removes the level configuration objects.
   */
  clear()
  : void
  {
    this._m_hConfig.clear();
    return;
  }

  /**
   * Destroy the config map.
   */
  destroy()
  : void
  {
    this.clear();
    this._m_hConfig = null;
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Get a map of configuration objects using the name as the key value.
   * 
   * @returns map of configuration objects.
   */
  _getConfigMapByName()
  : Map<string, IConfigObject>
  {
    let hConfigName = new Map<string, IConfigObject>();
    
    this._m_hConfig.forEach
    (
      function(_config : IConfigObject)
      : void
      {
        hConfigName.set(_config.getConfigName(), _config);
      }
    );

    return hConfigName;
  }
  
  /**
   * Map of configuration objects.
   */
  _m_hConfig : Map<DC_CONFIG, IConfigObject>;
}