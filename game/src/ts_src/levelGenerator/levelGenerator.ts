/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary The LevelGenerator create the game scene like the ambience background,
 * props, items and enemies.
 *
 * @file levelGenerator.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-08-2020
 */

import { CmdSpawnErrante } from "../commands/levelCommands/cmdSpawnErrante";
import { ILevelCommand } from "../commands/levelCommands/iLevelCommands";
import { Point, Ty_TileMap, Ty_TileObject } from "../commons/1942types";
import { ILevelGenerator } from "./iLevelGenerator";
import { LevelGeneratorConfig } from "./levelGeneratorConfig";

 /**
  * The LevelGenerator create the game scene like the ambience background,
  * props, items and enemies.
  */
export class LevelGenerator
implements ILevelGenerator
{  
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : LevelGenerator
  {
    let levelGenerator : LevelGenerator = new LevelGenerator();

    levelGenerator._m_aLevelCommands = new Array<ILevelCommand>();

    // Default properties

    levelGenerator._m_cameraHeight = 1080;

    return levelGenerator;
  }

  /**
   * Create and initalize this LevelGenerator's member. This method should be 
   * called once after the creation of this LevelGenerator.
   * 
   * @param _scene : phaser sccene.
   * @param _config : level generator file configuration.
   */
  init(_scene : Phaser.Scene, _config : LevelGeneratorConfig)
  : void
  {

    if(!_scene.cache.tilemap.has(_config.map_key))
    {
      console.log("map didn't found: " + _config.map_key);
      return;
    }

    // Get the map.

    let map : Ty_TileMap = _scene.add.tilemap(_config.map_key);

    // Load map

    this.loadMap(map);

    return;
  }

  /**
   * Load map.
   * 
   * @param _map 
   */
  loadMap(_map: Ty_TileMap)
  : void 
  {

    let map_height = _map.heightInPixels;

    ////////////////////////////////////
    // Tile Objects

    // Get all the tile objects in the tiled map. A list of commands will be
    // created with objects that has valid types.

    let aLayerNames : string[] = _map.getObjectLayerNames();
    let layerName : string;
    let objectLayer : Phaser.Tilemaps.ObjectLayer;

    // Iterate over each object layer.

    while(aLayerNames.length)
    {
      layerName = aLayerNames.pop();

      objectLayer = _map.getObjectLayer(layerName);

      // Check if object layer exists.

      if(objectLayer == null)
      {
        continue;
      }

      let index = 0;      
      let objectSize = objectLayer.objects.length;

      let object : Ty_TileObject;
      let objectType : string;

      while(index < objectSize)
      {
        object = objectLayer.objects[index];
        objectType = object.type;

        if(objectType != null && objectType != "")
        {
                    
          // Check if the object has the position components.

          if(object.x === undefined && object.y === undefined)
          {
            ++index;
            continue;
          }

          // Recalculate the y component of the object's posiion

          object.y = map_height - object.y;

          // Add a new command from the object.

          this.addSpawnCommandFromObject(object);          
        }

        ++index;
      }
    }

    // Order commands by its y position (ascending).

    this.orderCommands();

    return;
  } 

  /**
   * Updates the LevelGenerator.
   * 
   * @param _dt delta time. 
   * @param _distance distance traveled by the camera.
   */
  update(_dt: number, _distance : number)
  : void 
  { 
    let aCommands = this._m_aLevelCommands;
    let command : ILevelCommand;
    let position : Point;

    while(aCommands.length)
    {
      command = aCommands[aCommands.length - 1];

      position = command.getPosition();

      if(position.y <= _distance)
      {

        // Reset height.

        position.y = -50.0;
        command.setPosition(position.x, position.y);

        // Execute and destroy the command.
        
        command.exec(this);
        command.destroy();
        
        // Command out!
        
        aCommands.pop();
      }
      else
      {
        break;
      }      
    }

    return;
  }

  /**
   * Order the commands in ascending order, by its position in y axis.
   */
  orderCommands()
  : void
  {
    this._m_aLevelCommands.sort
    (
      function(a : ILevelCommand, b : ILevelCommand)
      : number
      {
        return b.getPosition().y - a.getPosition().y;
      }
    );

    return;
  }

  /**
   * Adds a new LevelCommand that spawns a gameobject from a tile object.
   * 
   * @param _object tiled object.
   */
  addSpawnCommandFromObject(_object : Ty_TileObject)
  : void
  {
    // Check if the object has position components.

    if(_object.x == null || _object.y == null)
    {
      return;
    }

    let type = _object.type;

    switch(type)
    {
      case "Errante" :

      this._createErranteCommand(_object);

      return;
      
      default:
        // No command.
      return;
    }
  }

  /**
   * Set the camera's height.
   * 
   * @param _height camera height (pix).
   */
  setCameraHeigth(_height: number)
  : void 
  {
    this._m_cameraHeight = _height;
  }

  /**
   * Call the destroy() method of each member in this LeveGenerator. Destroy
   * this object's properties.
   */
  destroy()
  : void
  {  
    let aCommands = this._m_aLevelCommands;
    let command : ILevelCommand;

    while(aCommands.length)
    {
      command = aCommands.pop();
      command.destroy();
    }

    aCommands = null;
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Private constructor.
   */
  private constructor()
  { }  

  /**
   * Creates a new level command from the tiled object. The is command spawns a
   * errante in the object position.
   * 
   * @param _object tiled object.
   */
  private _createErranteCommand(_object : Ty_TileObject)
  : void
  { 
    let command : CmdSpawnErrante 
      = new CmdSpawnErrante(_object.x, _object.y);

    this._m_aLevelCommands.push(command);    
    return;
  }

  /**
   * List of level commands.
   */
  private _m_aLevelCommands : Array<ILevelCommand>; 

  /**
   * Height of the camera (pix).
   */
  private _m_cameraHeight : number;
 
}