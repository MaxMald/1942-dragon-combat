/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Preload test assets and start pilot level. 
 *
 * @file preload.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-11-2020
 */

/**
 * Preload test assets and start pilot level.
 */
export class Preload
extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  preload()
  : void
  {
    this.load.path = "../assets/";

    ///////////////////////////////////
    // Atlas

    this.load.atlas
    (
      "DragonFlight",
      "atlas/DragonFlight.png",
      "atlas/DragonFlight.js"
    );

    ///////////////////////////////////
    // Shaders

    this.load.glsl
    (
      {
        key : 'terrain_painter_01',
        shaderType : 'fragment',
        url : 'shaders/terrain_painter_02.frag' 
      }
    );

    ///////////////////////////////////
    // Animations

    this.load.animation
    (
      "dragon_anim",
      "animations/DragonFlight.json"
    );   

    ///////////////////////////////////
    // Images        

    this.load.image
    (
      'dialogBox',
      'images/dialogBox_01.png'
    );

    this.load.image
    (
      'colorTerrainTexture',
      'images/terrain_01.png'
    );

    this.load.image
    (
      'perlinTexture',
      'images/perlin_256_01.png'
    );

    this.load.image
    (
      'waterNormalMap',
      'images/water_normal.png'
    );

    this.load.image
    (
      'fireball',
      'images/fireball.png'
    );

    this.load.image
    (
      'enemy',
      'images/enemy.png'
    );

    this.load.image
    (
      'spiderBoss',
      'images/boss.png'
    );   

    ///////////////////////////////////
    // Packs

    // Configuration files.

    this.load.pack
    (
      'configuration_pilot_pack',
      'packs/configuration_pack.json',
      'pilot'
    );

    // Art pack : Items

    this.load.pack
    (
      'art_pack_items',
      'packs/art_pack_items.json',
      'pilot'
    );

    this.load.pack
    (
      'art_pack_kalebio',
      'packs/art_pack_kalebio.json',
      'pilot'
    );

    this.load.pack
    (
      'art_pack_minions',
      'packs/art_pack_minions.json',
      'pilot'
    );

    this.load.pack
    (
      'art_pack_bullets',
      'packs/art_pack_bullets.json',
      'pilot'
    );

    let tiledMapPack = JSON.parse(this.game.cache.text.get('TiledMap_Pack'));
    let tiledMap = tiledMapPack.pilot.files[0];

    this.load.tilemapTiledJSON
    (
      tiledMap.key,
      tiledMap.url
    );

    return;
  }

  create()
  : void
  {
    // Start pilot scene

    this.scene.start('test');
    return;
  }
}