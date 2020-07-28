import { PlayerController } from "../../../../../game/src/ts_src/playerController/playerController";
import { PlayerControllerConfig } from "../../../../../game/src/ts_src/playerController/playerControllerConfig";
import { NullState } from "../../../../../game/src/ts_src/states/nullState";

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

    this.load.image
    (
      'button',
      'images/button.png'
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

    // Show the input mode.

    this._m_inputMode = this.add.text
    (
      250,
      1600,
      '',
      { fontFamily: 'Arial', fontSize: 20, color: '#00ff00' }
    ); 
    this._m_pt_label.setAlign('left');
    this._m_pt_label.setOrigin(0.0, 0.0);

    // input mode buttons.    

    let y = 1550;
    
    this._createButton
    (
      950,
      y ,
      'Relative',
      this._onClick_relative,
      this
    );

    this._createButton
    (
      950,
      y += 100,
      'Absolute',
      this._onClick_absolute,
      this
    );

    this._createButton
    (
      950,
      y += 100,
      'Mixed',
      this._onClick_mixed,
      this
    );

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

    // Only for debuggin purpuses.

    this._m_pt_label.text = 'Speed : ' + pcConfig.player_speed.toString();

    // Set local properties.

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

    // Display the innput mode.

    this._m_inputMode.text = 
      "Mode: " + this._m_heroController.getInputMode();

    // Display the pointer direction.

    let pointer : Phaser.Input.Pointer = this.input.activePointer;

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

    let hero = this._m_heroController.getPlayer();
    let heroSpr = hero.getWrappedInstance();

    let v2 : Phaser.Math.Vector2 = this._m_heroController.getDirection();
    let heroPos : Phaser.Math.Vector3 = new Phaser.Math.Vector3
    (
      heroSpr.x,
      heroSpr.y,
      0.0
    );

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

  private _onClick_mixed()
  : void
  {
    this._m_heroController.setInputMode("MIXED");
    return;
  }

  private _onClick_absolute()
  : void
  {
    this._m_heroController.setInputMode("ABSOLUTE");
    return;
  }

  private _onClick_relative()
  : void
  {
    this._m_heroController.setInputMode("RELATIVE");
    return;
  }

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

  ///////////////////////////////////
  // Labels

  private _m_inputMode : Phaser.GameObjects.Text;
}