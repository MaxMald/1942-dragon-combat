import { CmpSprite } from "behaviour/components/cmpSprite";
import { MxActor } from "behaviour/mxActor";
import { CmpCharTransform } from "../../../../../game/src/ts_src/components/cmpCharTransform";
import { PlayerController } from "../../../../../game/src/ts_src/playerController/playerController";
import { PlayerControllerConfig } from "../../../../../game/src/ts_src/playerController/playerControllerConfig";

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
      "summer_props",
      "atlas/rpg_summer_tileset_props.png",
      "atlas/rpg_summer_tileset_props.js"
    );

    this.load.atlas
    (
      "dragon",
      "atlas/DragonFlight.png",
      "atlas/DragonFlight.js"
    );

    this.load.text
    (
      'playerControllerConfig',
      'configFiles/playerControllerConfig.json'
    )
    return;
  }
  
  create()
  : void
  {
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

    // Shows the speed of the hero.

    this._m_pt_label = this.add.text
    (
      250,
      1550,
      '',
      { fontFamily: 'Arial', fontSize: 20, color: '#00ff00' }
    ); 
    this._m_pt_label.setAlign('left');
    this._m_pt_label.setOrigin(0.0, 0.0);

    ///////////////////////////////////
    // Hero

    let hero : MxActor = MxActor.Create("player");

    hero.clearComponentManager();
    
    hero.m_transform = new CmpCharTransform();
    hero.m_transform.setParent(null); 

    hero.m_transform.setPosition(100.0, 200.0);

    hero.addComponent(hero.m_transform);

    let sprCmp : CmpSprite = new CmpSprite();
    sprCmp.prepare
    (
      this.add.sprite(0.0, 0.0, 'dragon', 0)
    );
    hero.addComponent(sprCmp);

    ///////////////////////////////////
    // Player Controller

    let pcConfig : PlayerControllerConfig 
      = JSON.parse(this.cache.text.get('playerControllerConfig'));

    let heroController : PlayerController = new PlayerController(pcConfig);
    
    heroController.init(this.input.activePointer, hero);

    // Only for debuggin purpuses.

    this._m_pt_label.text = 'Speed : ' + pcConfig.player_speed.toString();

    // Set local properties.

    this._m_hero = hero;
    this._m_heroController = heroController;

    return;
  }

  update(_time : number, _delta : number)
  : void
  {    
    // Updates the hero controller.

    this._m_heroController.update(_delta * 0.001);

    // Only for debugging purposes.

    this.debugGraphics();

    // Clear the pointer previous position.

    let pointer = this.game.input.activePointer;

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

    // Display the pointer direction.

    let pointer : Phaser.Input.Pointer = this.game.input.activePointer;

    let v3 : Phaser.Math.Vector3 = new Phaser.Math.Vector3
    (
      pointer.position.x - pointer.prevPosition.x,
      pointer.position.y - pointer.prevPosition.y
    );
    v3.normalize();

    this.debugDirection
    (
      this._m_rect_box.x + 120,
      this._m_rect_box.y + 120,
      100,
      v3
    );

    // Display the hero's direction.

    let v2 : Phaser.Math.Vector2 = this._m_heroController.getDirection();
    let heroPos : Phaser.Math.Vector3 = this._m_hero.m_transform.getGlobalPoisition();

    v3.x = v2.x;
    v3.y = v2.y;

    this.debugDirection
    (
      heroPos.x,
      heroPos.y,
      200,
      v3
    );
    
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
  
  private _m_hero : MxActor;

  private _m_heroController : PlayerController;

  ///////////////////////////////////
  // Graphics

  private _m_graph_box : Phaser.GameObjects.Graphics;

  private _m_graph_green : Phaser.GameObjects.Graphics;

  private _m_graph_red : Phaser.GameObjects.Graphics;

  ///////////////////////////////////
  // Background Box  

  private _m_rect_box : Phaser.Geom.Rectangle;

  ///////////////////////////////////
  // Pointer Direction

  private _m_pt_label : Phaser.GameObjects.Text;

  private _m_canvas_size : Phaser.Geom.Point;
}