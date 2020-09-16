/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file iObjectBuilder.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-02-2020
 */

import { IActor } from "../../actors/iActor";
import { Ty_TileObject } from "../../commons/1942types";

export interface IObjectBuilder
{
  init()
  : void;

  build
  (
    _scene : Phaser.Scene, 
    _object : Ty_TileObject,
    _xOffset ?: number,
    _yOffset ?: number
  )
  : IActor;

  destroy()
  : void;
}