import { Game } from "phaser";
import { GameManager } from "../../../../../game/src/ts_src/gameManager/gameManager";

/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary This scene should called once in the game. Start the game manager
 * module.
 *
 * @file boot.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-11-2020
 */

/**
 * This scene should called once in the game. Start the game manager module.
 */
export class Boot
extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Preload needed assets.
   */
  preload()
  : void
  {
    this.load.path = "../assets/";
    
    this.load.text
    (
      'TiledMap_Pack', 
      'packs/tiledMap_pack.json'
    );
  }
  
  /**
   * Start the game manager module and start the preload scene.
   */
  create()
  : void
  {
    GameManager.Prepare();
    let gameManager = GameManager.GetInstance();

    this.scene.start('preload');
    return;
  }
}