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

import { CmdEnterBoss } from "../commands/levelCommands/cmdEnterBoss";
import { CmdSpawnCadmio } from "../commands/levelCommands/cmdSpawnCadmio";
import { CmdSpawnErrante } from "../commands/levelCommands/cmdSpawnErrante";
import { ILevelCommand } from "../commands/levelCommands/iLevelCommands";
import { Point, Ty_TileMap, Ty_TileObject } from "../commons/1942types";
import { CnfCadmio } from "../configObjects/cnfCadmio";
import { CnfItemManager } from "../configObjects/cnfItemManager";
import { GameManager } from "../gameManager/gameManager";
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
    levelGenerator._m_cadmioConfig = new CnfCadmio();
    levelGenerator._m_itemManagerConfig = new CnfItemManager();

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

    // Setup map properties.

    let gameManager = GameManager.GetInstance();

    let properties : any = map.properties as any;
    let propertiesSize : number = properties.length;
    let propertyIndex : number = 0;
    let property : any;
    let propertyName : string;
    let propertyValue : any;

    while(propertyIndex < propertiesSize)
    {
      property = properties[propertyIndex];

      propertyName = property.name;
      propertyValue = property.value;

      if(propertyName == "camera_speed")
      {
        gameManager.setCameraSpeed(propertyValue as number);
      }

      ++propertyIndex;
    }
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

    // Load the configuration objects from the configuration layer.

    let objectLayer : Phaser.Tilemaps.ObjectLayer;
    objectLayer = _map.getObjectLayer('ConfigurationObjects');

    if(objectLayer != null)
    {
      this.loadConfigObjects(objectLayer);
    }

    ////////////////////////////////////
    // Tile Objects

    // Get all the tile objects in the tiled map. A list of commands will be
    // created with objects that has valid types.

    let aLayerNames : string[] = _map.getObjectLayerNames();
    let layerName : string;    

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
   * Search in the given object layer all the Tiled Objects that have valid
   * types as "Configuartion Objecs". Then will set the level configuartion
   * objects with the Tiled Objects data.
   * 
   * @param _layer : Object layer.
   */
  loadConfigObjects(_layer : Phaser.Tilemaps.ObjectLayer)
  : void
  {
    let index : number = 0;
    let object : Ty_TileObject;
    let objectSize : number = _layer.objects.length;
    let objectType : string;

    while(index < objectSize)
    {
      object = _layer.objects[index];
      objectType = object.type;

      if(objectType != null && objectType != "")
      {
        switch(objectType)
        {
          // Cadmio Fruit Configuration Object.

          case 'CadmioConfig' :
          this._m_cadmioConfig.setFromObject(object);
          break;
        }
      }
      
      ++index;
    }
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
      ///////////////////////////////////
      // Enemies

      // Spawn Errante in position.      
      case "Errante" :

      this._createErranteCommand(_object);
      return;

      ///////////////////////////////////
      // Items

      // Spawn a Cadmio Fruit.
      case "Cadmio" : 

      this._createCadmioSpawnCommand(_object);
      return;

      ///////////////////////////////////
      // Bosses

      // Boss enter in position.
      case "Boss":

      this._bossEnter(_object);
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
   * Get the cadmio configuration object.
   * 
   * @returns cadmio config object.
   */
  getCadmioConfig()
  : CnfCadmio
  {
    return this._m_cadmioConfig;
  }

  /**
   * Get the item manager configuartion object.
   * 
   * @returns item manager config object.
   */
  getItemManagerConfig()
  : CnfItemManager
  {
    return this._m_itemManagerConfig;
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
   * The position of the Camdio Fruit will be -50 at y. The x value will the
   * same as the command position x value.
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
   * Creates a new level command from the given tiled object. This command
   * spawns a Cadmio Fruit when the game camera canvas reach the command height
   * (position y component).
   *
   * The position of the Camdio Fruit will be -50 at y. The x value will the
   * same as the command position x value.
   *
   * @param _object tiled object. 
   */
  private _createCadmioSpawnCommand(_object : Ty_TileObject)
  : void
  {
    let x : number = _object.x;
    let y : number = _object.y;

    if(_object.width !== undefined && _object.height !== undefined)
    {
      x -= _object.width * 0.5;
      y -= _object.width * 0.5;
    }

    let command : CmdSpawnCadmio = new CmdSpawnCadmio(x, y);
    this._m_aLevelCommands.push(command);
    return;
  }

  private _bossEnter(_object : Ty_TileObject)
  : void
  {
    let command : CmdEnterBoss = new CmdEnterBoss();
    command.setPosition(_object.x, _object.y);

    this._m_aLevelCommands.push(command);
  }

  /**
   * List of level commands.
   */
  private _m_aLevelCommands : Array<ILevelCommand>; 

  /**
   * Height of the camera (pix).
   */
  private _m_cameraHeight : number;

  ///////////////////////////////////
  // Configuration Objects
 
  /**
   * Cadmio configuartion object.
   */
  private _m_cadmioConfig : CnfCadmio;

  /**
   * Item Manager configuartion object.
   */
  private _m_itemManagerConfig : CnfItemManager;
}