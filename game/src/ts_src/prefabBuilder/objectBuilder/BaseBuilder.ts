/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file BaseBuilder.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-02-2020
 */

import { IActor } from "../../actors/iActor";
import { DC_MESSAGE_ID } from "../../commons/1942enums";
import { IObjectBuilder } from "./iObjectBuilder";

export class BaseBuilder
implements IObjectBuilder
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/  

  init()
  : void 
  {
    throw new Error("Method not implemented.");
  }

  build
  (
    _scene: Phaser.Scene, 
    _object: Phaser.Types.Tilemaps.TiledObject, 
    _xOffset?: number, 
    _yOffset?: number
  )
  : IActor 
  {
    throw new Error("Method not implemented.");
  }

  destroy()
  : void 
  {
    throw new Error("Method not implemented.");
  }

  /****************************************************/
  /* Protected                                        */
  /****************************************************/ 
  
}