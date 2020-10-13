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
import { DC_CONFIG } from "../commons/1942enums";
import { Ty_Image, Ty_physicsSprite, Ty_TileMap, Ty_TileObject } from "../commons/1942types";
import { CmpBalsaruBulletController } from "../components/cmpBalsaruBulletController";
import { CmpBalsaruController } from "../components/cmpBalsaruControllert";
import { CmpDbgBalsaruHead } from "../components/cmpDbgBalsaruHead";
import { CmpGroupController } from "../components/cmpGroupController";
import { CmpNeckController } from "../components/cmpNeckController";
import { CmpNullCollisionController } from "../components/cmpNullCollisionController";
import { CmpPhysicSpriteController } from "../components/cmpPhysicSpriteController";
import { CnfBalsaruHead } from "../configObjects/cnfBalsaruHead";
import { CnfBalsaruInit } from "../configObjects/cnfBalsaruInit";
import { GameManager } from "../gameManager/gameManager";
import { ILevelConfiguration } from "../levelConfiguration/ILevelConfiguration";
import { ImageBuilder } from "../prefabBuilder/objectBuilder/ImageBuilder";

export class FcBalsaru
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create
  (
    _scene : Phaser.Scene, 
    _cnf_init : CnfBalsaruInit,
    _cnf_head : CnfBalsaruHead
  )
  : PrefabActor
  {
    let prefabActor : PrefabActor = PrefabActor.Create('Balsaru');
    
    let topSpritesDepth : number = 10;

    /****************************************************/
    /* Balsaru Ship                                     */
    /****************************************************/    

    // Get the prefab balsaru.

    let key : string = "prefab_balsaru";

    if(!_scene.cache.tilemap.has(key))
    {
      throw new Error("Prefab Tiled Map of key : " + key + " not found.");
    }

    // Get the map.

    let prefabMap : Ty_TileMap = _scene.add.tilemap(key);

    // Iterate over object layers

    let a_oLayersNames : string[] = prefabMap.getObjectLayerNames();

    let index : number = 0;

    let objLayer : Phaser.Tilemaps.ObjectLayer;

    let group : Phaser.GameObjects.Group = _scene.add.group();

    let shipSprite : Ty_Image;

    while(index < a_oLayersNames.length)
    {
      // Object Layer

      objLayer = prefabMap.getObjectLayer(a_oLayersNames[index]);

      // Iterate over objects in this object layer.

      let objectIndex : number = 0;

      let aObjects : Ty_TileObject[] = objLayer.objects;

      let object : Ty_TileObject;   

      while(objectIndex < aObjects.length)
      {
        object = aObjects[objectIndex];
        
        if(object.name == "ship_top")
        {
          shipSprite = ImageBuilder.Create(_scene, object);

          shipSprite.setDepth(topSpritesDepth);

          group.add(shipSprite);
        }
        else if(object.name == "ship_bottom")
        {
          let shipBottom = ImageBuilder.Create(_scene, object);
          
          shipBottom.setDepth(-100);

          group.add(shipBottom);
        }

        ++objectIndex;
      }

      ++index;
    }

    let ship = BaseActor.Create<Phaser.GameObjects.Group>(group, 'ship');

    ship.addComponent(CmpGroupController.Create());

    ship.init();

    prefabActor.addChild(ship);

    /****************************************************/
    /* Balsaru Neck                                     */
    /****************************************************/

    let aNeckBalls = new Array<Ty_Image>();

    let neck_ball_sprite : Ty_Image;
    
    index = 0;

    while(index < _cnf_init.num_neck_balls)
    {
      neck_ball_sprite = _scene.add.image
      (
        0, -300,
        _cnf_init.texture_neck_ball
      );

      neck_ball_sprite.setDepth(topSpritesDepth);

      aNeckBalls.push(neck_ball_sprite);

      ++index;
    }

    /****************************************************/
    /* Balsaru Head                                     */
    /****************************************************/

    let head_sprite : Ty_physicsSprite = _scene.physics.add.sprite
    (
      shipSprite.x, 
      shipSprite.y + _cnf_head.neck_length,
      _cnf_init.texture_head
    );

    head_sprite.setDepth(topSpritesDepth);

    head_sprite.setOrigin(0.5, 0.6);

    let head = BaseActor.Create<Ty_physicsSprite>(head_sprite, 'head');

    head_sprite.setData('actor', head);

    head.addComponent(CmpPhysicSpriteController.Create());
    head.addComponent(CmpNullCollisionController.GetInstance());

    ///////////////////////////////////
    // Neck Behavior Controller

    let neckController : CmpNeckController = CmpNeckController.Create(_scene);

    neckController.setup
    (
      head_sprite, 
      shipSprite,
      aNeckBalls,
      _cnf_init,
      _cnf_head
    );

    head.addComponent(neckController);

    ///////////////////////////////////
    // Balsaru Controller

    let gameManager : GameManager = GameManager.GetInstance();

    let levelConfiguration : ILevelConfiguration 
      = gameManager.getLevelConfiguration();

    let balsaruController : CmpBalsaruController 
      = CmpBalsaruController.Create
      (
        _scene,
        levelConfiguration.getConfig(DC_CONFIG.kBalsaruEvade)
      );

    balsaruController.setup
    (
      _scene,
      ship,
      shipSprite,
      _cnf_init,
      _cnf_head
    );
    
    // Add controller to head.

    head.addComponent(balsaruController);    
    
    ///////////////////////////////////
    // Bullet Controller

    head.addComponent(CmpBalsaruBulletController.Create());

    // Head Debugging

    let headDebug = CmpDbgBalsaruHead.Create();

    headDebug.setup(_scene, _cnf_head, head_sprite, shipSprite);

    head.addComponent(headDebug);

    // Init head.

    head.init();

    prefabActor.addChild(head);

    return prefabActor
  }
}