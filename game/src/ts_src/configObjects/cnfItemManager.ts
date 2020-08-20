/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Configuartion object of the Item Manager.
 *
 * @file cnfItemManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-19-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";
import { IConfigObject } from "./IConfigObject";

 /**
  * Configuration object of the Item Manager.
  */
export class CnfItemManager
implements IConfigObject
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Creates a configuartion object with default values.
   */
  constructor()
  {
    this.pool_size = 3;
    this.playZone_extrude = 100.0;

    return;
  }

  /**
   * Set this configuration object from a tiled object.
   * 
   * @param _object tiled object. 
   */
  setFromObject(_object : Ty_TileObject)
  : void
  {
    return;
  }

  /**
   * Get the object identifier.
   */
  getID()
  : DC_CONFIG
  {
    return DC_CONFIG.kItemManager;
  }

  /**
   * Get the name of the configuration object.
   */
  getConfigName()
  : string
  {
    return "ItemManagerConfig";
  }

  /**
   * Number of pool objects.
   */
  pool_size : integer;

  /**
   * 
   */
  playZone_extrude : integer;
}