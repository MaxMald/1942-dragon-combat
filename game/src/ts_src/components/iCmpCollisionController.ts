/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Provides common methods to handle a collision between objects.
 *
 * @file iCmpCollisionController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-30-2020
 */

import { BaseActor } from "../actors/baseActor";
import { IBaseComponent } from "./iBaseComponent";

/**
 * Provides common methods to handle a collision between objects.
 */
export interface ICmpCollisionController
  extends IBaseComponent<Phaser.Physics.Arcade.Sprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * This method is called once when a collision occurs between the actor and
   * other object.
   * 
   * @param _other other object. 
   * @param _this self.
   */
  onCollision
  (
    _other : BaseActor<Phaser.Physics.Arcade.Sprite>, 
    _this : BaseActor<Phaser.Physics.Arcade.Sprite>
  ) : void;
}