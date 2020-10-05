/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file debugManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-29-2020
 */

 /**
  * 
  */
export class DebugManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * 
   */
  static Create()
  : DebugManager
  {
    let dm : DebugManager = new DebugManager();

    dm._m_line_A = new Phaser.Geom.Line();

    return dm;
  }

  /**
   * Clear graphics.
   */
  clearGraphics()
  : void
  {
    this._m_graphic.clear();
    return;
  }

  /**
   * Initialize it with a phaser scene.
   * 
   * @param _scene phaser scene. 
   */
  init(_scene : Phaser.Scene)
  : void
  {
    this._m_graphic = _scene.add.graphics();

    return;
  }

  /**
   * Destroys the graphics object.
   */
  destroyGraphics()
  : void
  {
    if(this._m_graphic)
    {
      this._m_graphic.destroy();
      this._m_graphic = null;
    }
    return;
  }

  /**
   * Draw a line.
   * 
   * @param _x1 
   * @param _y1 
   * @param _x2 
   * @param _y2 
   * @param _line_width 
   * @param _color 
   */
  drawLine
  (
    _x1 : number, 
    _y1 : number, 
    _x2 : number, 
    _y2 : number, 
    _line_width : number,
    _color : number
  )
  : void
  {
    this._m_graphic.lineStyle(_line_width, _color);

    this._m_line_A.setTo(_x1, _y1, _x2, _y2);

    this._m_graphic.strokeLineShape(this._m_line_A);

    return;
  }

  /**
   * Draw circle
   * 
   * @param _center_x 
   * @param _center_y 
   * @param _radius 
   * @param _line_width 
   * @param _color 
   */
  drawCircle
  (
    _center_x : number,
    _center_y : number,
    _radius : number,
    _line_width : number,
    _color : number
  )
  : void
  {
    this._m_graphic.lineStyle(_line_width, _color);

    this._m_graphic.strokeCircle(_center_x, _center_y, _radius);

    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * 
   */
  private constructor()
  { }

  /**
   * Phaser's Graphics Object.
   */
  private _m_graphic : Phaser.GameObjects.Graphics;

  /**
   * Line A.
   */
  private _m_line_A: Phaser.Geom.Line;
}