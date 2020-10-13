/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file ImageBuilder.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-02-2020
 */

import { BaseActor } from "../../actors/baseActor";
import { IActor } from "../../actors/iActor";
import { Ty_Image, Ty_TileObject } from "../../commons/1942types";
import { CmpImageController } from "../../components/cmpImageController";
import { BaseBuilder } from "./BaseBuilder";

export class ImageBuilder 
extends BaseBuilder
{
  static Create(_scene : Phaser.Scene, _object : Ty_TileObject)
  : Ty_Image
  {
    let texture : string = '';
    
    let frame_str : string = undefined;
    let frame_num : number = 0;
    
    let x : number = 0;
    let y : number = 0;

    let flipX : boolean = false;
    let flipY : boolean = false;

    let visible : boolean = true;

    let width : number = 0;
    let height : number = 0;

    let rotation : number = 0;

    // Get object properties.

    if(_object.visible !== undefined)
    {
      visible = _object.visible;
    }

    if(_object.width !== undefined)
    {
      width = _object.width;
    }

    if(_object.height !== undefined)
    {
      height = _object.height;
    }

    if(_object.x !== undefined)
    {
      x = _object.x + (width * 0.5); 
    } 

    if(_object.y !== undefined)
    {
      y = _object.y - (height * 0.5 );
    }   

    if(_object.rotation !== undefined)
    {
      rotation = _object.rotation;
    }

    if(_object.flippedHorizontal !== undefined)
    {
      flipX = _object.flippedHorizontal;
    }

    if(_object.flippedVertical !== undefined)
    {
      flipY = _object.flippedVertical;
    }

    // Get custom properties.

    if(_object.properties === undefined)
    {
      console.warn('Object does not has custom properties.');
    }
    else
    {
      let aProperties : Array<any> = _object.properties;
      let propertyIndex = 0;
      let property : any;

      while(propertyIndex < aProperties.length)
      {
        property = aProperties[propertyIndex];

        switch(property.name)
        {
          case "texture":

          texture = property.value as string;
          break;     
          
          case "frame_key":

          {
            let str = property.value as string;
            if(str !== '')
            {
              frame_str = str;
            }
          }
          break;

          case "frame_index":

          {
            let frameIndex = property.value as number;
            if(frameIndex >= 0)
            {
              frame_num = frameIndex;
            }
          }
          break;

          default:
          break;
        }

        ++propertyIndex;
      }
    }

    // Create Image.

    let image : Ty_Image = _scene.add.image
    (
      x,
      y,
      texture,
      ((frame_str !== undefined) ? frame_str : frame_num)
    );

    image.setVisible(visible);
    
    image.setFlipX(flipX);    
    image.setFlipY(flipY);
    
    image.setScale
    (
      width / image.width, 
      height / image.height
    );

    image.setRotation(rotation);

    return image;
  }

  init()
  : void 
  { }

  build
  (
    _scene : Phaser.Scene, 
    _object: Ty_TileObject,
    _xOffset ?: number,
    _yOffset ?: number
  )
  : IActor 
  {
    let name : string = _object.name;

    if(name === '' || name === undefined)
    {
      console.warn('Object does not has name');

      name = 'object';
    }       

    // Create Image.

    let image = ImageBuilder.Create(_scene, _object);

    // Create Actor.

    let actor = BaseActor.Create<Ty_Image>(image, name);

    actor.addComponent(CmpImageController.Create());

    actor.init();

    return actor;
  }

  destroy()
  : void 
  { }
}