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
  kEnemyHealth : 7 as 7,

  /**
   * CmpBasicBulletController
   */
  kBasicBulletController : 8 as 8,

  /**
   * CmpBulletData.
   */
  kBulletData : 9 as 9,

  /**
   * CmpPlayZone.
   */
  kPlayZone : 10 as 10,

  /**
   * ICmpEnemyController.
   */
  kEnemyController : 11 as 11,

  /**
   * CmpHeroData
   */
  kHeroData : 12 as 12,

  /**
   * CmpHeroController
   */
  kTextController : 13 as 13,

  /**
   * CmpUIHealthController
   */
  kUIHealthController : 14 as 14,

  /**
   * CmpUIScoreController
   */
  kUIScoreController : 15 as 15,

  /**
   * CmpActorGroup
   */
  kActorGroup : 16 as 16,

  /**
   * CmpImageController
   */
  kImageController : 17 as 17,

  /**
   * CmpPhysicSpriteController
   */
  kPhysicSpriteController : 18 as 18,

  /**
   * CmpPhysicSpriteController
   */
  kSpiderBossController : 19 as 19
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
   * Undefined.
   * 
   * msg : undefined.
   */
  kUndefined : 499 as 499,

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
  kHit : 506 as 506,

  /**
   * Kill the actor.
   * 
   * msg : Ty_physicsActor.
   */
  kKill : 507 as 507,

  /**
   * Set text.
   * 
   * msg : string.
   */
  kSetText : 508 as 508,

  /**
   * Add point to the main score.
   * 
   * msg : integer
   */
  kAddScorePoints : 509 as 509,

  /**
   * Spawn an enemy.
   * 
   * msg : MsgEnemySpawn
   */
  KSpawnEnemy : 510 as 510,

  /**
   * Desactive actor.
   * 
   * msg : BaseActor.
   */
  kDesactive : 511 as 511,

  /**
   * Show the actor.
   * 
   * msg : null.
   */
  kShow : 512 as 512,

  /**
   * Close the actor.
   * 
   * msg : null.
   */
  kClose : 513 as 513,

  /**
   * Level had been completed.
   * 
   * msg : game manager
   */
  kMisionCompleted : 514 as 514,

  /**
   * Mission failure.
   * 
   * msg : game manager
   */
  kMisionFailure : 515 as 515,

  /**
   * Reset the game.
   * 
   * msg : game manager
   */
  kGameReset : 516 as 516,

  /**
   * Boss enter to scene.
   * 
   * msg : null
   */
  kBossEnter : 517 as 517
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

/****************************************************/
/* Bullet Type                                      */
/****************************************************/

/**
 * Animation state identifier.
 */

export type DC_BULLET_TYPE = EnumLiteralsOf<typeof DC_BULLET_TYPE>;

export const DC_BULLET_TYPE = Object.freeze
({
  /**
   * Undefined bullet.
   */
  kUndefined : 0 as 0, 

  /**
   * Hero's basic bullet.
   */
  kHeroBasic : 1 as 1,

  /**
   * Enemy basic bullet.
   */
  kEnemyBasic : 2 as 2,
});

/****************************************************/
/* Actor Command                                    */
/****************************************************/

/**
 * Animation state identifier.
 */

export type DC_ACTOR_COMMAND = EnumLiteralsOf<typeof DC_ACTOR_COMMAND>;

export const DC_ACTOR_COMMAND = Object.freeze
({
  /**
   * Remove a component
   */
  kRemoveComponent : 0 as 0
});