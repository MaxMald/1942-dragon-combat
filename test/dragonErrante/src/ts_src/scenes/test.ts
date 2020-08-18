import { PlayerController } from "../../../../../game/src/ts_src/playerController/playerController";
import { NullState } from "../../../../../game/src/ts_src/states/nullState";
import { BulletManager } from "../../../../../game/src/ts_src/bulletManager/bulletManager";
import { GameManager } from "../../../../../game/src/ts_src/gameManager/gameManager";
import { EnemiesManager } from "../../../../../game/src/ts_src/enemiesManager/enemiesManager";
import { EnemiesManagerConfig } from "../../../../../game/src/ts_src/enemiesManager/enemiesManagerConfig";
import { DC_ENEMY_TYPE } from "../../../../../game/src/ts_src/commons/1942enums";
import { ErranteSpawner } from "../../../../../game/src/ts_src/enemiesManager/enemySpawner/erranteSpawner";
import { IEnemiesManager } from "../../../../../game/src/ts_src/enemiesManager/iEnemiesManager";
import { HeroBasicBulletSpawner } from "../../../../../game/src/ts_src/bulletManager/bulletSpawner/heroBasicBulletSpawner";
import { EnemyBasicBulletSpawner } from "../../../../../game/src/ts_src/bulletManager/bulletSpawner/enemyBasicBulletSpawner";
import { BaseActor } from "../../../../../game/src/ts_src/actors/baseActor";
import { Ty_Text } from "../../../../../game/src/ts_src/commons/1942types";
import { CnfBulletManager, CnfHero } from "../../../../../game/src/ts_src/commons/1942config";
import { UIManager } from "../../../../../game/src/ts_src/uiManager/UIManager";
import { IPlayerController } from "../../../../../game/src/ts_src/playerController/IPlayerController";
import { heroBasicBulletConfig } from "../../../../../game/src/ts_src/bulletManager/bulletSpawner/heroBasicBulletConfig";
import { EnemyBasicBulletConfig } from "../../../../../game/src/ts_src/bulletManager/bulletSpawner/enemyBasicBulletConfig";


export class Test extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  preload()
  : void
  {
    this.load.path = "../assets/";

    this.load.atlas
    (
      "DragonFlight",
      "atlas/DragonFlight.png",
      "atlas/DragonFlight.js"
    );

    this.load.animation
    (
      "dragon_anim",
      "animations/DragonFlight.json"
    );

    this.load.image
    (
      'target',
      'images/target.png'
    );

    this.load.image
    (
      'fireball',
      'images/fireball.png'
    );

    this.load.image
    (
      'dialogBox',
      'images/dialogBox_01.png'
    );

    this.load.image
    (
      'enemy',
      'images/enemy.png'
    );

     ///////////////////////////////////
    // Configuration Files

    this.load.pack
    (
      'configuration_pilot_pack',
      'packs/configuration_pack.json',
      'pilot'
    );
    return;
  }
  
  create()
  : void
  {
    let gameCache = this.game.cache;

    ///////////////////////////////////
    // Prepare Modules

    NullState.Prepare();

    // Canvas Size

    this._m_canvas_size 
      = new Phaser.Geom.Point(this.game.canvas.width, this.game.canvas.height);

    ///////////////////////////////////
    // Graphics (only for debugging purposes)
    
    // Common graphics objects.
    
    this._m_graph_box = this.add.graphics
    (
      { lineStyle: { width: 2, color: 0xaa0000 }, fillStyle: { color: 0x000000 } }
    );

    this._m_graph_green = this.add.graphics
    (
      { lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { color: 0x00ff00 } }
    );

    this._m_graph_red = this.add.graphics
    (
      { lineStyle: { width: 4, color: 0xff0000 }, fillStyle: { color: 0xff0000 } }
    );
    
    // Background box

    this._m_rect_box = new Phaser.Geom.Rectangle
    (
      0,
      1500,
      this._m_canvas_size.x,
      this._m_canvas_size.y - 1500
    );    

    ///////////////////////////////////
    // Game Manager

    GameManager.Prepare();

    let gameManager : GameManager = GameManager.GetInstance();
    gameManager.setGameScene(this);
    
    ///////////////////////////////////
    // Hero's Bullet Manager

    let cnfBulletMng : CnfBulletManager 
      = JSON.parse(this.game.cache.text.get('cnf_bulletManager_hero'));

    let bulletMng : BulletManager = BulletManager.Create();

    let padding = cnfBulletMng.playzone_padding;
    let canvas = this.game.canvas;

    bulletMng.init
    (
      this,
      cnfBulletMng.pool_size,
      cnfBulletMng.texture_key,
      new Phaser.Geom.Point(-padding, -padding),
      new Phaser.Geom.Point(canvas.width + padding, canvas.height + padding)
    );

    // BulletSpawner : Basic Bullet.

    let heroBulletSpawner = HeroBasicBulletSpawner.Create();

    if(gameCache.text.has('cnf_bullet_heroBasic'))
    {
      let heroBasicConfig : heroBasicBulletConfig 
        = JSON.parse(gameCache.text.get('cnf_bullet_heroBasic'));

      heroBulletSpawner.setBulletConfiguration(heroBasicConfig);
    }

    bulletMng.addSpawner(heroBulletSpawner); 

    this._m_bulletManager = bulletMng;

    ///////////////////////////////////
    // Player Controller
       
    let heroConfig : CnfHero 
      = JSON.parse(this.game.cache.text.get('cnf_hero'));

    heroConfig.x = this.game.canvas.width * 0.5;
    heroConfig.y = this.game.canvas.height * 0.5;
    
    gameManager.initHero(this, heroConfig);

    // Bounds the playercontroller with the bullet manager

    let playercontroller = gameManager.getPlayerController();

    playercontroller.setBulletManager(bulletMng);   

    this._m_heroController = playercontroller;

    ///////////////////////////////////
    // Bullet Manager : Enemies

    let cnfEnemiesBulletMng : CnfBulletManager 
      = JSON.parse(gameCache.text.get('cnf_bulletManager_enemies'));

    let enim_bulletManager = BulletManager.Create();
    let enim_padding = cnfEnemiesBulletMng.playzone_padding;

    enim_bulletManager.init
    (
      this,
      cnfEnemiesBulletMng.pool_size,
      cnfEnemiesBulletMng.texture_key,
      new Phaser.Geom.Point(-enim_padding, -enim_padding),
      new Phaser.Geom.Point
      (
        canvas.width + enim_padding, 
        canvas.height + enim_padding
      )
    );

    ///////////////////////////////////
    // Spawner : Enemy Basic Bullet

    let enemyBulletSpawner = EnemyBasicBulletSpawner.Create();

    if(gameCache.text.has('cnf_bullet_enemyBasic'))
    {
      let enemyBasicConfig : EnemyBasicBulletConfig 
        = JSON.parse(gameCache.text.get('cnf_bullet_enemyBasic'));

      enemyBulletSpawner.setBulletConfiguartion(enemyBasicConfig);
    }

    enim_bulletManager.addSpawner(enemyBulletSpawner);    

    ///////////////////////////////////
    // Enemies Manager

    let enemiesManager : EnemiesManager = EnemiesManager.Create();

    let enemiesManagerConfig 
      = JSON.parse(this.game.cache.text.get('cnf_spawner_errante'));

    enemiesManager.init(this, enemiesManagerConfig);

    enemiesManager.setBulletManager(enim_bulletManager);

    gameManager.setEnemiesManager(enemiesManager);    

    this._m_enemiesManager = enemiesManager;

    // Collision:

    bulletMng.collisionVsGroup(this, enemiesManager.getBodiesGroup());

    ///////////////////////////////////
    // Spawner : Errante

    let erranteSpawner : ErranteSpawner = ErranteSpawner.Create();

    if(this.game.cache.text.has('cnf_errante'))
    {
      let erranteConfig 
        = JSON.parse(gameCache.text.get('cnf_errante'));

      erranteSpawner.setErranteConfig(erranteConfig);
    }

    enemiesManager.addSpawner(erranteSpawner);

    // Set player collision

    /*
    let heroController = gameManager.getPlayerController();

    let hero = heroController.getPlayer();

    enim_bulletManager.collisionVsSprite(this, hero.getWrappedInstance());
*/
    ///////////////////////////////////
    // UI

    let uiManager = new UIManager();
    uiManager.init(this, gameManager);
    uiManager.reset(this, gameManager);

    gameManager.setUIManager(uiManager);
   
    return;
  }

  update(_time : number, _delta : number)
  : void
  {  
    let dt : number = _delta * 0.001;
    
    GameManager.GetInstance().update(dt);

    // Clear the pointer previous position.

    let pointer = this._m_heroController.getPointer();

    pointer.prevPosition.x = pointer.position.x;
    pointer.prevPosition.y = pointer.position.y;

    this._m_time += dt;
    if(this._m_time >= this._m_triggerTime)
    {
      this._m_time = 0.0;

      this._buildDragons();
    }

    return;
  }

  /**
   * Debugs a vector direction.
   * 
   * @param _x center x.
   * @param _y center y
   * @param _radius circle radius. 
   * @param _direction direction.
   */
  debugDirection
  (
    _x : number,
    _y : number,
    _radius : number,
    _direction : Phaser.Math.Vector3
  )
  : void
  {
    this._m_graph_green.strokeCircle
    (
      _x,
      _y,
      _radius
    );   

    this._m_graph_red.strokeLineShape
    (
      new Phaser.Geom.Line
      (
        _x, _y,
        _x + _direction.x * _radius,
        _y + _direction.y * _radius
      )
    );
    return;
  }  

  /****************************************************/
  /* Private                                          */
  /****************************************************/  

  private _buildDragons()
  : void
  {
    let canvas_w = this._m_canvas_size.x;

    let offset = canvas_w / 4;
    let size = 3;

    while(size > 0)
    {
      this._m_enemiesManager.spawn
      (
        offset * size, 
        -90.0, 
        DC_ENEMY_TYPE.kErrante
      );
      --size;
    }

    return;
  }

  private _createButton
  (
    _x : number,
    _y : number,
    _label : string,
    _fn : Function,
    _context : any
  )
  : void
  {
    MxTools.UI.MxButtonTinted.Create
    (
      this,
      _x,
      _y,
      'button',
      0,
      _fn,
      _context,
      0xffffff,
      0xb3b3b3,
      0x000000,
      0xffffff
    );

    let text =
    this.add.text
    (
      _x - 20,
      _y - 20,
      _label,
      { fontFamily: 'Arial', fontSize: 30, color: '#000000' }
    );

    text.setAlign('center');
    return;
  }

  private _m_heroController : IPlayerController;

  private _m_bulletManager : BulletManager;

  private _m_enemiesManager : IEnemiesManager;

  ///////////////////////////////////
  // Graphics

  private _m_graph_box : Phaser.GameObjects.Graphics;

  private _m_graph_green : Phaser.GameObjects.Graphics;

  private _m_graph_red : Phaser.GameObjects.Graphics;

  ///////////////////////////////////
  // Background Box  

  private _m_rect_box : Phaser.Geom.Rectangle;

  private _m_canvas_size : Phaser.Geom.Point;

  // POOL

  private _m_triggerTime : number = 2.5;

  private _m_time : number = 10.0;

  ///////////////////////////////////
  // UI

  private _m_heroHP : BaseActor<Ty_Text>;

  private _m_heroScore : BaseActor<Ty_Text>;
}