/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file prefabBuilder.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-02-2020
 */

import { BaseActor } from "../actors/baseActor";
import { IActor } from "../actors/iActor";
import { PrefabActor } from "../actors/prefabActor";
import { Ty_TileMap, Ty_TileObject } from "../commons/1942types";
import { ImageBuilder } from "./objectBuilder/ImageBuilder";
import { ImageButtonBuilder } from "./objectBuilder/ImageButtonBuilder";
import { IObjectBuilder } from "./objectBuilder/iObjectBuilder";
import { TextBuilder } from "./objectBuilder/TextBuilder";

export class PrefabBuilder 
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    this._m_hBuilders = new Map<string, IObjectBuilder>();
    return;
  }

  init()
  : void
  {
    
    this._m_hBuilders.set('ph_Image', new ImageBuilder());
    this._m_hBuilders.set('ph_Text', new TextBuilder());
    this._m_hBuilders.set('ph_ImageButton', new ImageButtonBuilder());

    return;
  }

  build(_scene : Phaser.Scene, _key : string, _name : string)
  : PrefabActor
  {
    // Pefab.

    let prefab = PrefabActor.Create(_name);

    // Map

    if(!_scene.cache.tilemap.has(_key))
    {
      console.error("Prefab Tiled Map of key : " + _key + " not found.");
      return prefab;
    }

    // Get the map.

    let prefabMap : Ty_TileMap = _scene.add.tilemap(_key);

    // Array of actors.

    let aActors : IActor[] = new Array<IActor>();    

    // Map offset.

    let xOffset : number = undefined;
    let yOffset : number = prefabMap.heightInPixels;

    // Iterate over each object layer.

    let aObjectLayers : string[] = prefabMap.getObjectLayerNames();
    let objectLayer : Phaser.Tilemaps.ObjectLayer;    

    let index : integer = 0;
    let size : integer = aObjectLayers.length;

    while(index < size)
    {

      objectLayer = prefabMap.getObjectLayer(aObjectLayers[index]);

      let aObjects : Ty_TileObject[] = objectLayer.objects;
      let object : Ty_TileObject;

      let objectSize : integer = aObjects.length;
      let objectIndex : integer = 0;

      let builder : IObjectBuilder;
      let actor : IActor;

      // Build each object from this object layer.

      while(objectIndex < objectSize)
      {

        object = aObjects[objectIndex];

        // Skip un-typed objects.

        if(object.type === '' || object.type === undefined)
        {
          ++objectIndex;
          continue;
        }

        // Get object builder.

        builder = this._m_hBuilders.get(object.type);
        
        // Check if builder exists.        
        if(builder == null)
        {
          console.warn('Builder type : ' + object.type + ' not found.');

          ++objectIndex;
          continue;
        }

        // Build actor.

        actor = builder.build(_scene, object, xOffset, yOffset);

        prefab.addChild(actor);

        ++objectIndex;
      }      

      ++index;
    }

    return prefab;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Map of object builders.
   */
  private _m_hBuilders : Map<string, IObjectBuilder>;
}