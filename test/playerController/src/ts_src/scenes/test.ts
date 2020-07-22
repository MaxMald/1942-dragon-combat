export class Test extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  preload()
  : void
  {
    this.load.path = "../assets/";
    this.load.glsl
    (
      {
        key : 'terrain_painter_01',
        shaderType : 'fragment',
        url : 'shaders/terrain_painter_01.frag' 
      }
    );

    this.load.image
    (
      'colorTerrainTexture',
      'images/terrain_01.png'
    );

    this.load.image
    (
      'perlinTexture',
      'images/perlin_256_01.png'
    );

    this.load.image
    (
      'waterNormalMap',
      'images/water_normal.png'
    );

    this.load.atlas
    (
      "summer_props",
      "atlas/rpg_summer_tileset_props.png",
      "atlas/rpg_summer_tileset_props.js"
    );

    this.load.text
    (
      'ambConfigFile',
      'configFiles/ambGen_01.json'
    );
    return;
  }
  
  create()
  : void
  {
    this._m_text 
      = this.add.text(10, 10, '', { font: '50px Courier', fill: '#000000' });

    this._m_g = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });

    this._m_line = new Phaser.Geom.Line
    (
      this.game.canvas.width * 0.5, 
      this.game.canvas.height * 0.5, 
      this.game.canvas.width * 0.5, 
      this.game.canvas.height * 0.5
    );
    
    this._m_p = this.input.activePointer;
    return;
  }


  update(_time : number, _delta : number)
  : void
  {
    // Get Delta Direction.

    let direction : Phaser.Math.Vector2 = new Phaser.Math.Vector2();
    if(this._m_p.isDown) {
      direction.x = this._m_p.position.x - this._m_p.prevPosition.x;
      direction.y = this._m_p.position.y - this._m_p.prevPosition.y;
      direction.normalize();
    }

    // Line

    this._m_line.x2 = this._m_line.x1 + direction.x * 100.0;
    this._m_line.y2 = this._m_line.y1 + direction.y * 100.0;

    // Draw

    this._m_g.clear();
    this._m_g.strokeLineShape(this._m_line);

    this._m_text.setText([
      'dx : ' + direction.x,
      'dy : ' + direction.y
    ]);
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_text : Phaser.GameObjects.Text;

  private _m_p : Phaser.Input.Pointer;

  private _m_g : Phaser.GameObjects.Graphics;

  private _m_line : Phaser.Geom.Line;
}