import { PlayerController } from "../../../../../game/src/ts_src/playerController/playerController";
import { PlayerControllerConfig } from "../../../../../game/src/ts_src/playerController/playerControllerConfig";
import { NullState } from "../../../../../game/src/ts_src/states/nullState";
import { BulletManager } from "../../../../../game/src/ts_src/bulletManager/bulletManager";
import { BulletManagerConfig } from "../../../../../game/src/ts_src/bulletManager/bulletManagerConfig";
import { GameManager } from "../../../../../game/src/ts_src/gameManager/gameManager";
import { EnemiesManager } from "../../../../../game/src/ts_src/enemiesManager/enemiesManager";
import { EnemiesManagerConfig } from "../../../../../game/src/ts_src/enemiesManager/enemiesManagerConfig";
import { DC_ENEMY_TYPE } from "../../../../../game/src/ts_src/commons/1942enums";
import { ErranteSpawner } from "../../../../../game/src/ts_src/enemiesManager/enemySpawner/erranteSpawner";
import { IEnemiesManager } from "../../../../../game/src/ts_src/enemiesManager/iEnemiesManager";
import { HeroBasicBulletSpawner } from "../../../../../game/src/ts_src/bulletManager/bulletSpawner/heroBasicBulletSpawner";
import { EnemyBasicBulletSpawner } from "../../../../../game/src/ts_src/bulletManager/bulletSpawner/enemyBasicBulletSpawner";


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

    this.load.text
    (
      'playerControllerConfig',
      'configFiles/playerControllerConfig.json'
    );

    this.load.text
    (
      'bulletManagerConfig',
      'configFiles/bulletManagerConfig.json'
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
      'enemy',
      'images/enemy.png'
    );
    return;
  }
  
  create()
  : void
  {
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

    // POOL Debug text.

    this._m_pool_data = this.add.text
    (
      50,
      1520,
      '',
      { fontFamily: 'Arial', fontSize: 20, color: '#00ff00' }
    ); 

    this._m_heroBulletCntrl_data = this.add.text
    (
      300,
      1520,
      '',
      { fontFamily: 'Arial', fontSize: 20, color: '#00ff00' }
    ); 

    ///////////////////////////////////
    // Game Manager

    GameManager.Prepare();

    let gameManager : GameManager = GameManager.GetInstance();

    ///////////////////////////////////
    // Bullet Manager

    // hero spawner.

    let heroSpawner : HeroBasicBulletSpawner = HeroBasicBulletSpawner.Create();

    let bulletManager : BulletManager = BulletManager.Create();

    let bmConfig : BulletManagerConfig 
      = JSON.parse(this.cache.text.get('bulletManagerConfig'));

    bulletManager.init(this, bmConfig);

    bulletManager.addSpawner(heroSpawner);

    this._m_bulletManager = bulletManager;

    // Bullet Manager : Enemies

    let enim_bulletManager = BulletManager.Create();

    enim_bulletManager.init(this, bmConfig);    

    let enemyBulletSpawner = EnemyBasicBulletSpawner.Create();

    enim_bulletManager.addSpawner(enemyBulletSpawner);

    ///////////////////////////////////
    // Enemies Manager

    let enemiesManager : EnemiesManager = EnemiesManager.Create();

    let enemiesManagerConfig = new EnemiesManagerConfig();

    enemiesManagerConfig.pool_size = 10;
    enemiesManagerConfig.texture_key = "target";

    enemiesManager.init(this, enemiesManagerConfig);

    enemiesManager.setBulletManager(enim_bulletManager);

    gameManager.setEnemiesManager(enemiesManager);    

    this._m_enemiesManager = enemiesManager;

    // Collision:

    bulletManager.collisionVsGroup(this, enemiesManager.getBodiesGroup());

    // Errante Spawner

    let erranteSpawner : ErranteSpawner = ErranteSpawner.Create();

    enemiesManager.addSpawner(erranteSpawner);

    ///////////////////////////////////
    // Player Controller

    let pcConfig : PlayerControllerConfig 
      = JSON.parse(this.cache.text.get('playerControllerConfig'));

    // Movement Boundings

    let padding : number = 100;

    pcConfig.movement_rect_p1_x = padding;
    pcConfig.movement_rect_p1_y = padding;

    pcConfig.movement_rect_p2_x = this._m_canvas_size.x - padding;
    pcConfig.movement_rect_p2_y = this._m_canvas_size.y - padding;

    let heroController : PlayerController = new PlayerController();
    
    heroController.init(this, undefined, pcConfig);

    heroController.setBulletManager(bulletManager);

    this._m_heroController = heroController;

    gameManager.setPlayerController(heroController);

    ///////////////////////////////////
    // Targets

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

  private _m_heroController : PlayerController;

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

  private _m_pool_data : Phaser.GameObjects.Text;

  private _m_heroBulletCntrl_data : Phaser.GameObjects.Text;

  private _m_triggerTime : number = 2.5;

  private _m_time : number = 10.0;
}