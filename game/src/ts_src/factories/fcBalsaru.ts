/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file fcBalsaru.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-04-2020
 */

import { BaseActor } from "../actors/baseActor";
import { PrefabActor } from "../actors/prefabActor";
import { Ty_Image, Ty_physicsSprite } from "../commons/1942types";
import { CmpImageController } from "../components/cmpImageController";
import { CmpNeckController } from "../components/cmpNeckController";
import { CmpSpriteController } from "../components/cmpSpriteController";
import { CnfBalsaruInit } from "../configObjects/cnfBalsaruInit";

export class FcBalsaru
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create(_scene : Phaser.Scene, _cnf_init : CnfBalsaruInit)
  : PrefabActor
  {
    let prefabActor : PrefabActor = PrefabActor.Create('Balsaru');
    
    /****************************************************/
    /* Balsaru Ship                                     */
    /****************************************************/    

    let shipSprite : Ty_Image = _scene.add.image
    (
      0.0,
      0.0,
      _cnf_init.texture_ship
    );

    let ship = BaseActor.Create<Ty_Image>(shipSprite, 'ship');

    ship.addComponent(CmpImageController.Create());

    ship.init();

    prefabActor.addChild(ship);

    /****************************************************/
    /* Balsaru Neck                                     */
    /****************************************************/

    let aNeckBalls = new Array<Ty_Image>();

    let neck_ball_sprite : Ty_Image;
    let index : number = 0;

    while(index < _cnf_init.num_neck_balls)
    {
      neck_ball_sprite = _scene.add.image
      (
        0, 300,
        _cnf_init.texture_neck_ball
      );

      aNeckBalls.push(neck_ball_sprite);

      ++index;
    }

    /****************************************************/
    /* Balsaru Head                                     */
    /****************************************************/

    let head_sprite : Ty_physicsSprite = _scene.physics.add.sprite
    (
      0, 1000,
      _cnf_init.texture_head
    );

    head_sprite.setOrigin(0.5, 0.6);

    let head = BaseActor.Create<Ty_physicsSprite>(head_sprite, 'head');

    head_sprite.setData('actor', head);

    head.addComponent(CmpSpriteController.Create());

    // Neck Controller

    let neckController : CmpNeckController = CmpNeckController.Create();

    neckController.setup(head_sprite, shipSprite, aNeckBalls, _cnf_init);

    head.addComponent(neckController);

    // Init head.

    head.init();

    prefabActor.addChild(head);


    return prefabActor
  }
}