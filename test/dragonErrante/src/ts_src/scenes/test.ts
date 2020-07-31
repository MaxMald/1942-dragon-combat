import { PlayerController } from "../../../../../game/src/ts_src/playerController/playerController";
import { PlayerControllerConfig } from "../../../../../game/src/ts_src/playerController/playerControllerConfig";
import { NullState } from "../../../../../game/src/ts_src/states/nullState";
import { BulletManager } from "../../../../../game/src/ts_src/bulletManager/bulletManager";
import { BulletManagerConfig } from "../../../../../game/src/ts_src/bulletManager/bulletManagerConfig";
import { GameManager } from "../../../../../game/src/ts_src/gameManager/gameManager";
import { EnemiesManager } from "../../../../../game/src/ts_src/enemiesManager/enemiesManager";
import { CmpHeroBulletController } from "../../../../../game/src/ts_src/components/cmpHeroBulletController";
import { EnemiesManagerConfig } from "../../../../../game/src/ts_src/enemiesManager/enemiesManagerConfig";
import { BaseActor } from "../../../../../game/src/ts_src/actors/baseActor";
import { CmpTargetController } from "../../../../../game/src/ts_src/components/cmpTargetController";
import { DC_COMPONENT_ID } from "../../../../../game/src/ts_src/commons/1942enums";


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
    // Bullet Controller

    let bulletManager : BulletManager = BulletManager.Create();

    let bmConfig : BulletManagerConfig 
      = JSON.parse(this.cache.text.get('bulletManagerConfig'));

    bulletManager.init(this, bmConfig);

    this._m_bulletManager = bulletManager;

    gameManager.setBulletManager(bulletManager);

    ///////////////////////////////////
    // Enemies Manager

    let enemiesManager : EnemiesManager = EnemiesManager.Create();

    let enemiesManagerConfig = new EnemiesManagerConfig();

    enemiesManagerConfig.pool_size = 3;
    enemiesManagerConfig.texture_key = "target";

    enemiesManager.init(this, enemiesManagerConfig);

    gameManager.setEnemiesManager(enemiesManager);

    // Collision:

    bulletManager.collisionVsGroup(this, enemiesManager.getBodiesGroup());

    ///////////////////////////////////
    // Targets

    let target_size = 3;
    let off = this._m_canvas_size.x * 0.25;
    
    let actor : BaseActor<Phaser.Physics.Arcade.Sprite>;
    let sprite : Phaser.Physics.Arcade.Sprite;

    while(target_size > 0)
    {

      actor = enemiesManager.getActor();

      if(actor != null)
      {
        actor.addComponent(CmpTargetController.Create());
        actor.init();

        sprite = actor.getWrappedInstance();

        sprite.x = off * target_size;
        sprite.y = 200.0;
      }
      
      --target_size;
    }
    
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

    // Updates the hero controller.

    this._m_heroController.update(dt);

    // Only for debugging purposes.

    this.debugGraphics();

    // Clear the pointer previous position.

    let pointer = this._m_heroController.getPointer();

    pointer.prevPosition.x = pointer.position.x;
    pointer.prevPosition.y = pointer.position.y;

    return;
  }

  debugGraphics()
  : void
  {
    // Clear graphics, before drawing again.

    this._m_graph_green.clear();
    this._m_graph_red.clear();

    // Draw the bacground box.
    
    this._m_graph_box.clear();
    this._m_graph_box.fillRectShape(this._m_rect_box);   

    // Debug Pool Data:

    let bulletManager : BulletManager = this._m_bulletManager;
    let pool = this._m_bulletManager.getPool();


    this._m_pool_data.text 
      = "-- Hero Bullet Mng --\n"
      + "\n Bullet speed : " + bulletManager.getBulletSpeed() + " px./s.\n"
      + "\n** Pool **\n"
      + "\nSize : " + pool.getSize().toString()
      + "\nActive : " + pool.getActiveSize().toString()
      + "\nDesactive : " + pool.getDesactiveSize().toString();

    let hero = this._m_heroController.getPlayer(); 

    let heroBulletCntrl : CmpHeroBulletController 
      = hero.getComponent<CmpHeroBulletController>(DC_COMPONENT_ID.kHeroBulletController);

    this._m_heroBulletCntrl_data.text
      = "-- Hero Bullet Controller --\n"
      + "\n Fire rate : " + (1.0 / heroBulletCntrl.getFireRate()).toString() + " bullets/s."; 
    
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
}