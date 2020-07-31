/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Common types used by the game logic. 
 *
 * @file 1942types.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-30-2020
 */

import { BaseActor } from "../actors/baseActor";

/**
 * Sprite with physics body.
 * 
 * @type Phaser.Physics.Arcade.Sprite
 */
export type Ty_physicsSprite = Phaser.Physics.Arcade.Sprite;

/**
 * Group of sprites whit physics bodies.
 * 
 * @type Phaser.Physics.Arcade.Group
 */
export type Ty_physicsGroup = Phaser.Physics.Arcade.Group;

/**
 * Base Actor
 * 
 * @type BaseActor<Ty_Sprite>
 */
export type Ty_physicsActor = BaseActor<Ty_physicsSprite>;