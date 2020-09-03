/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file TextBuilder.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-02-2020
 */

import { BaseActor } from "../../actors/baseActor";
import { IActor } from "../../actors/iActor";
import { Ty_Image, Ty_Text, Ty_TileObject } from "../../commons/1942types";
import { CmpImageController } from "../../components/cmpImageController";
import { CmpTextController } from "../../components/cmpTextController";
import { BaseBuilder } from "./BaseBuilder";

export class TextBuilder 
extends BaseBuilder
{

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
    
    let x : number = 0;
    let y : number = 0;

    let visible : boolean = true;

    let width : number = 0;
    let height : number = 0;

    let rotation : number = 0;

    let text : string = "";

    let horizontalAlignment : string = "center";

    let fontFamily = "Arial";
    let fontSize : number = 12;
    
    let bold : boolean = false;
    let italic : boolean = false;

    let fontColor : string = "0x000000";

    let wordWrap : boolean = false;

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
      x = _object.x;
    } 

    if(_object.y !== undefined)
    {
      y = _object.y;
    }   

    if(_object.rotation !== undefined)
    {
      rotation = _object.rotation;
    }

    if(_object.text !== undefined)
    {

      text = _object.text.text as string;

      horizontalAlignment = _object.text.halign as string;

      fontFamily = _object.text.fontfamily as string;

      fontSize = _object.text.pixelsize as number;

    }

    // Custom Properties

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
          case "bold":

          bold = property.value as boolean;
          break;     

          case "italic":

          italic = property.value as boolean;
          break;

          case "font_color":
          {
            fontColor = property.value as string;

            let alpha : string = fontColor.substring(1, 3);
            let color : string = fontColor.substring(3, fontColor.length);

            fontColor = "#" + color + alpha;
          }          
          break;

          default:
          break;
        }

        ++propertyIndex;
      }
    }

    let textGameObject : Ty_Text = _scene.add.text
    (
      x,
      y,
      text,
      {
        fontFamily : fontFamily,
        fontSize : fontSize.toString() + 'px',
        align : horizontalAlignment,
        color : fontColor
      }
    );

    textGameObject.setWordWrapWidth(width);

    // center alignment

    if(horizontalAlignment === 'center')
    {
      textGameObject.setOrigin(0.5, 0.0);
      textGameObject.setPosition
      (
        textGameObject.x + (width * 0.5),
        textGameObject.y
      );
    }
    else if(horizontalAlignment === 'right')
    {
      textGameObject.setOrigin(1.0, 0.0);
      textGameObject.setPosition
      (
        textGameObject.x + width,
        textGameObject.y
      );
    }

    // Bold & Italic style

    let fontStyle : string = "";

    if(bold)
    {
      fontStyle = "bold";
    }

    if(italic)
    {
      if(fontStyle != "")
      {
        fontStyle += " ";
      }      

      fontStyle += "italic";
    }

    if(fontStyle != "")
    {
      textGameObject.setFontStyle(fontStyle);
    }

    // Rotation

    textGameObject.setRotation(rotation);

    // Create Actor.

    let actor = BaseActor.Create<Ty_Text>(textGameObject, name);

    actor.addComponent(CmpTextController.Create());

    actor.init();

    return actor;
  }

  destroy()
  : void 
  { }  
}