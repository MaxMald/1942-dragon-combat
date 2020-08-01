/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Common enumerators used by the game logic. 
 *
 * @file 1942enums.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-31-2020
 */

import { EnumLiteralsOf } from "commons/mxEnums";

/****************************************************/
/* Enemy Type                                       */
/****************************************************/

/**
 * Type of enemies that exixts in the game, including the mini bosses. Bosses
 * are not included.
 */

export type DC_ENEMY_TYPE = EnumLiteralsOf<typeof DC_ENEMY_TYPE>;

export const DC_ENEMY_TYPE = Object.freeze
({
  kUndefined : -1 as -1,

  /**
   * Dragón errante.
   */
  kErrante : 0 as 0, 

  /**
   * Dragón sónico.
   */
  kSonico : 1 as 1,

  /**
   * Dragón ranger.
   */
  kRanger : 2 as 2
});

/****************************************************/
/* Boss ID                                          */
/****************************************************/

/**
 * Boss identifier.
 */

export type DC_BOSS_ID = EnumLiteralsOf<typeof DC_BOSS_ID>;

export const DC_BOSS_ID = Object.freeze
({
  /**
   * Balsaru.
   */
  kBalsaru : 0 as 0
});

/****************************************************/
/* Components ID                                    */
/****************************************************/

/**
 * Actor's component identifier.
 */

export type DC_COMPONENT_ID = EnumLiteralsOf<typeof DC_COMPONENT_ID>;

export const DC_COMPONENT_ID = Object.freeze
({
  /**
   * CmpMovement.
   */
  kMovement : 0 as 0, 

  /**
   * CmpHeroInput.
   */
  kHeroInput : 1 as 1,

  /**
   * CmpAnimation.
   */
  kAnimation : 2 as 2,

  /**
   * CmpHeroBulletController.
   */
  kHeroBulletController : 3 as 3,

  /**
   * CmpMovementBullet.
   */
  kMovementBullet : 4 as 4,

  /**
   * CmpCollisionController.
   */
  kCollisionController : 5 as 5,

  /**
   * CmpMovementEnemy.
   */
  kMovementEnemy : 6 as 6,

  /**
   * CmpEnemyHealth.
   */
  kEnemyHealth : 7 as 7
});

/****************************************************/
/* Message Type                                     */
/****************************************************/

/**
 * Component's message identifier.
 */

export type DC_MESSAGE_ID = EnumLiteralsOf<typeof DC_MESSAGE_ID>;

export const DC_MESSAGE_ID = Object.freeze
({
  /**
   * Move agent.
   * 
   * msg : Phaser.Math.Vector.
   */
  kAgentMove : 500 as 500, 

  /**
   * The pointer that had been moved.
   * 
   * msg : Phaser.Input.Pointer
   */
  kPointerMoved : 501 as 501,

  /**
   * Set agent to position.
   * 
   * msg : Phaser.Math.Vector3.
   */
  kToPosition : 502 as 502,

  /**
   * The pointer had been released.
   * 
   * msg : Phaser.Input.Pointer
   */
  kPointerReleased : 503 as 503,

  /**
   * The pointer had been pressed.
   * 
   * msg : Phaser.Input.Pointer
   */
  kPointerPressed : 504 as 504,

  /**
   * X is treated as kToPosition.
   * 
   * Y is treated as kAgentMove.
   * 
   * msg: Phaser.Math.Vector3.
   */
  kMixedMovement : 505 as 505,

  /**
   * The actor has received a hit.
   * 
   * msg : integer.
   */
  kHit : 506 as 506
});

/****************************************************/
/* Animation State                                  */
/****************************************************/

/**
 * Animation state identifier.
 */

export type DC_ANIMATION_ID = EnumLiteralsOf<typeof DC_ANIMATION_ID>;

export const DC_ANIMATION_ID = Object.freeze
({
  /**
   * Forward Animation.
   */
  kForward : 0 as 0, 

  /**
   * Back Animation.
   */
  kBack : 1 as 1,

  /**
   * Right Animation.
   */
  kRight : 2 as 2,

  /**
   * Left Animation.
   */
  kLeft : 3 as 3,

  /**
   * Idle Animation.
   */
  kIdle : 4 as 4
});