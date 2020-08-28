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
  kRanger : 2 as 2,

  /**
   * Arpon ship.
   */
  kArponShip : 3 as 3
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
  kSpiderBossController : 19 as 19,

  /**
   * CmpSimpleBulletController
   */
  kSimpleBulletControl : 20 as 20,

  /**
   * CmpUIBossHealthControl
   */
  kUIBossHealthControl : 21 as 21,

  /**
   * CmpHeroController.
   */
  kHeroController : 22 as 22,

  /**
   * ICmpItemController.
   */
  kItemController : 23 as 23,

  /**
   * CmpPowerShieldController
   */
  kPowerShieldComponent : 24 as 24,

  /**
   * CmpSpriteController
   */
  kSpriteController : 25 as 25,

  /**
   * CmpArponWeaponController
   */
  kArponWeaponController : 26 as 26,

  /**
   * CmpArponBulletController
   */
  kArponBulletController : 27 as 27,

  /**
   * CmpUIPowerShieldController
   */
  kUIPowerShieldController : 28 as 28
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
  kBossEnter : 517 as 517,

  /**
   * Set the actor direction.
   * 
   * msg : Vector2
   */
  kDirection : 518 as 518,

  /**
   * Set the actor speed.
   * 
   * msg : number
   */
  kSpeed : 519 as 519,

  /**
   * Hero had been enter to barrel roll state.
   * 
   * msg : undefined.
   */
  kEnterBarrelRoll : 520 as 520,

  /**
   * Hero had been exit from barrel roll state.
   * 
   * msg : undefined.
   */
  kExitBarrelRoll : 521 as 521,

  /**
   * The actor had been collide with an item.
   * 
   * msg : ICmpItemController.
   */
  kCollisionItem : 522 as 522,

  /**
   * Set the health points.
   * 
   * msg : integer.
   */
  kSetHealthPoints : 523 as 523,

  /**
   * Set the bullet manager.
   * 
   * msg : IBulletManager
   */
  kSetBulletManager : 524 as 524, 

  /**
   * Active the actor.
   * 
   * msg : undefined.
   */
  kActive : 525 as 525,

  /**
   * The power shield had been activated.
   * 
   * msg : Power shield actor.
   */
  kPowerShieldActivated : 526 as 526,

  /**
   * The power shield had been desactivated.
   * 
   * msg : Poser shield actor.
   */
  kPowerShieldDesactivated : 527 as 527,

  /**
   * Collision with the hero.
   * 
   * msg : Actor of the Hero.
   */
  kCollisionWithHero : 528 as 528,

  /**
   * Hit by the ranger explosion.
   * 
   * msg : hit points.
   */
  kRangerExplosionHit : 529 as 529,

  /**
   * Set the angle of the actor.
   * 
   * msg : degrees (number).
   */
  kSetAngle : 530 as 530,

  /**
   * Set the texture key of the actor.
   * 
   * msg : texture key (string).
   */
  kSetTexture : 531 as 531,

  /**
   * The powershield had been explode.
   * 
   * msg : CmpPowerShieldController
   */
  kPowerShieldExplodes : 532 as 532,

  /**
   * Desctive the power ups.
   */
  kDesactivePowerUps : 533 as 533
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
/* Hero State                                       */
/****************************************************/

/**
 * Animation state identifier.
 */

export type DC_HERO_STATE = EnumLiteralsOf<typeof DC_HERO_STATE>;

export const DC_HERO_STATE = Object.freeze
({
  /**
   * Undefined state.
   */
  kUndefined : 0 as 0,

  /**
   * Normal state.
   */
  kNormal : 1 as 1,

  /**
   * Barrel Roll state.
   */
  kBarrelRoll : 2 as 2
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

  /**
   * A simple bullet.
   */
  kSimple : 3 as 3,

  /**
   * A bullet from the triple shot attack.
   */
  kTripleSHot : 4 as 4,

  /**
   * Arpon bullet.
   */
  kArpon : 5 as 5
});

/****************************************************/
/* Item Type                                        */
/****************************************************/

/**
 * Animation state identifier.
 */

export type DC_ITEM_TYPE = EnumLiteralsOf<typeof DC_ITEM_TYPE>;

export const DC_ITEM_TYPE = Object.freeze
({
  /**
   * Undefined item.
   */
  kUndefined : -1 as -1,

  /**
   * Camdio item
   */
  kCadmio : 0 as 0,

  /**
   * Canus Item.
   */
  kCanus : 1 as 1,
});

/****************************************************/
/* Actor Command                                    */
/****************************************************/

/**
 * Actor Command.
 */

export type DC_ACTOR_COMMAND = EnumLiteralsOf<typeof DC_ACTOR_COMMAND>;

export const DC_ACTOR_COMMAND = Object.freeze
({
  /**
   * Remove a component
   */
  kRemoveComponent : 0 as 0
});

/****************************************************/
/* Dragon Secundary Effects Type                   */
/****************************************************/

/**
 * Dragon secundary acctions.
 */

export type DC_SECONDARY_ACTION = EnumLiteralsOf<typeof DC_SECONDARY_ACTION>;

export const DC_SECONDARY_ACTION = Object.freeze
({

  /**
   * Undefined secondary action.
   */
  kUndefined : -1 as -1,

  /**
   * Triple Shot.
   */
  KTripleShot : 0 as 0,

  /**
   * Dragon Shield.
   */
  kShield : 1 as 1
});

/****************************************************/
/* Configuration Objects                            */
/****************************************************/

/**
 * Configuration objects identifiers.
 */

export type DC_CONFIG = EnumLiteralsOf<typeof DC_CONFIG>;

export const DC_CONFIG = Object.freeze
({
  /**
   * Canus Configuration Object.
   */
  kCanus : 0 as 0,

  /**
   * Cadmio Configuration Object.
   */
  kCadmio : 1 as 1,

  /**
   * Item Manager configuration object.
   */
  kItemManager : 2 as 2,

  /**
   * Hero bullet state : Normal, configuration object.
   */
  kHeroBulletStateNormal : 3 as 3,

  /**
   * Hero basic bullet configuration.
   */
  kHeroBasicBullet : 4 as 4,

  /**
   * Hero bullet from the triple shot.
   */
  kHeroTripleShotBullet : 5 as 5,

  /**
   * Hero bullet state : Triple Shot, configuration object.
   */
  kHeroBulletStateTriple : 6 as 6,

  /**
   * Hero power shield config object.
   */
  kHeroPowerShield : 7 as 7,

  /**
   * Ranger Configuration object.
   */
  kRanger : 8 as 8,

  /**
   * Ranger Spawner config object.
   */
  kRangerSpawner : 9 as 9,

  /**
   * Sonic configuration object.
   */
  kSonic : 10 as 10,

  /**
   * Sonic Spawner config object.
   */
  kSonicSpawner : 10 as 10,

  /**
   * Arpon Ship config object.
   */
  kArponShip : 11 as 11,

  /**
   * Arpon Ship Spawner config object.
   */
  kArponShipSpawner : 12 as 12,

  /**
   * Arpon Bullet config object.
   */
  kArponBullet : 13 as 13,

  /**
   * Arpon Bullet Spanwer config object.
   */
  kArponBulletSpawner : 14 as 14,

  /**
   * Errante enemy config object.
   */
  kErrante : 15 as 15,

  /**
   * Errante Spanwer config object.
   */
  kErranteSpawner : 16 as 16,

  /**
   * Enemy basic bullet config object.
   */
  kEnemyBasicBullet : 17 as 17
});