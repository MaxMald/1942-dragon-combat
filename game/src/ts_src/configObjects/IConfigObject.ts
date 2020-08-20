/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Provides a base controller for multiple configuration objects. 
 *
 * @file IConfigObject.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-20-2020
 */

import { DC_CONFIG } from "../commons/1942enums";
import { Ty_TileObject } from "../commons/1942types";

/**
 * Provides a base controller for multiple configuration objects.
 */
export interface IConfigObject 
{

  /**
   * Set this configuration object from a tiled object.
   * 
   * @param _object tiled object. 
   */
  setFromObject(_object : Ty_TileObject)
  : void;
  
  /**
   * Get the identifier of the configuration object.
   * 
   * @returns id.
   */
  getID()
  : DC_CONFIG;

  /**
   * Get the name of the configuration object.
   */
  getConfigName()
  : string;
}