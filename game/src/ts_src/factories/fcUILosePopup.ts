/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file fcUIScorePopup.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-03-2020
 */

import { BaseActor } from "../actors/baseActor";
import { PrefabActor } from "../actors/prefabActor";
import { Ty_Image } from "../commons/1942types";
import { GameManager } from "../gameManager/gameManager";
import { PrefabBuilder } from "../prefabBuilder/prefabBuilder";

export class FcUILosePopup
{

  static Create(_scene : Phaser.Scene, _builder : PrefabBuilder)
  : PrefabActor
  {
    let scorePopup : PrefabActor 
      = _builder.build
      (
        _scene, 
        'prefab_lose_popup', 
        'lose_popup'
      );

    let restartButton 
      = scorePopup.getChild<BaseActor<Ty_Image>>('restart_button');

    if(restartButton != null)
    {
      let button = restartButton.getWrappedInstance();
      
      button.on('pointerdown', function()
      {
        let gm : GameManager = GameManager.GetInstance();
        gm.gameReset();

        return;
      });
    }

    return scorePopup;
  }
}