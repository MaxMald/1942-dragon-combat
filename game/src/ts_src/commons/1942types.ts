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

/**
 * Sprite.
 * 
 * @type Phaser.GameObjects.Sprite
 */
export type Ty_Sprite = Phaser.GameObjects.Sprite;

/**
 * Image.
 * 
 * @type Phaser.GameObjects.Image
 */
export type Ty_Image = Phaser.GameObjects.Image;

/**
 * Text.
 * 
 * @type Phaser.GameObjects.Text;
 */
export type Ty_Text = Phaser.GameObjects.Text;

/**
 * Tile Map.
 * 
 * @type Phaser.Tilemaps.Tilemap
 */
export type Ty_TileMap = Phaser.Tilemaps.Tilemap;

/**
 * Tile object.
 * 
 * @type Phaser.Types.Tilemaps.TiledObject
 */
export type Ty_TileObject = Phaser.Types.Tilemaps.TiledObject;

/**
 * Used for the enumerator pattern.
 */
export type EnumLiteralsOf<T extends object> = T[keyof T];

/**
 * Vector 3D
 * 
 * @type Phaser.Math.Vector3
 */
export type V3 = Phaser.Math.Vector3;

/**
 * Vector 2D
 * 
 * @type Phaser.Math.Vector2
 */
export type V2 = Phaser.Math.Vector2;

/**
 * Point.
 * 
 * @type Phaser.Geom.Point
 */
export type Point = Phaser.Geom.Point;