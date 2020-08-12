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

    ///////////////////////////////////
    // Tiled Map

    this.load.tilemapTiledJSON
    (
      'map_pilot',
      'levels/tlevel_pilot_001.json'
    );

    ///////////////////////////////////
    // Configuration Files

    // Hero's configuration file.

    this.load.text
    (
      'cnf_hero',
      'configFiles/cnf_hero_001.json'
    );

    // Hero's BulletManager file.

    this.load.text
    (
      'cnf_bulletManager_hero',
      'configFiles/cnf_bulletManager_001.json'
    );

    // Enemies BulletManager file.
    this.load.text
    (
      'cnf_bulletManager_enemies',
      'configFiles/cnf_bulletManager_002.json'
    );

    // Errante Spawner file.

    this.load.text
    (
      'cnf_spawner_errante',
      'configFiles/cnf_spawner_errante_001.json'
    );

    // Ambient Generator file.

    this.load.text
    (
      'cnf_ambient',
      'configFiles/cnf_ambient_001.json'
    );

    // Level Generator file.

    this.load.text
    (
      'cnf_pilot',
      'configFiles/cnf_level_001.json'
    );

    // Scene file.

    this.load.text
    (
      'cnf_pilot_scene',
      'configFiles/cnf_scene_001.json'
    );

    // Score Manager config file.

    this.load.text
    (
      'cnf_scoreManager',
      'configFiles/cnf_scoreManager_001.json'
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