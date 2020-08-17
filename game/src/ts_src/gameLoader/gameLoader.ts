/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file gameLoader.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-14-2020
 */

import { TextFile } from "./textFile";

export class GameLoader
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    this.aText = new Array<TextFile>();
    return;
  }

  public load(_scene : Phaser.Scene)
  : void
  {
    _scene.load.baseURL = this.basePath;

    // Load text files.

    let textFile : TextFile;
    let aText = this.aText;

    while(aText.length)
    {
      textFile = aText.pop();
      _scene.load.text(textFile.key, textFile.path);
    }
  }

  basePath : string;

  aText : Array<TextFile>;
}