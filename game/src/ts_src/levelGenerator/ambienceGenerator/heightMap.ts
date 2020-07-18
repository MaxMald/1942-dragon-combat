/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary A bunch of integers where each one represents a height value in a range of 
 * (0 255). These values are defined by a simplex noise algorithm in 2D.
 *
 * @file heightMap.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-11-2020
 */

import { makeNoise2D } from "../../perlinNoise/perlinNoise";

/**
 * A bunch of integers where each one represents a height value in a range of 
 * (0 255). These values are defined by a simplex noise algorithm in 2D.
 */
export class HeightMap 
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
 
  /**
   * Creates a new terrain data with the especified dimension (width and height).
   * These dimensions define the number of cells that the data grid will have, 
   * they don't refer to the canvas or screen dimension.
   * 
   * The amplitud is used to define the range of the simplex noise algorithm. An
   * amplitud of value 1 (default value) use the default range of the algorithm, 
   * however an amplitud of value 0.01 will reduce the range of the algorithm producing
   * a more "cloudy" effect.
   * 
   * The ratio define the relationship between the range in the Y and X axis.
   * This is very useful, if the terrain data will be used in a rectangle canvas;
   * for example: A terrain data used in a canvas with a size of w : 1080 h : 1920 
   * should have a ratio equals to the result of 1080 / 1920.
   * 
   * @param _width The number of columns in the data grid.
   * @param _height The number of rows in the data grid.
   * @param _amplitude The range used in the simplex noise algorthim.
   * @param _ratio The relationship between the width and height of the target
   * canvas.
   */
  init
  (
    _width : integer, 
    _height : integer, 
    _amplitude ?: number, 
    _ratio ?: number
  ) : void
  {

    if(_amplitude === undefined) {
      _amplitude = 1.0;
    }

    if(_ratio === undefined) {
      _ratio = 1.0;
    }

    if(_width <= 0) {
      _width = 1;
    }

    if(_height <= 0){
      _height = 1;
    }

    this._m_width = _width;
    this._m_height = _height;

    this._m_data = new Uint8Array(_width * _height);

    let yFactor : number = _amplitude;
    let xFactor : number = yFactor * _ratio;

    let col : number = 0;
    let row : number = 0;

    let noiseFn = makeNoise2D(Date.now());

    while(row < _height)
    {
      while(col < _width)
      {
        this._m_data[(row * _width) + col] 
          = (noiseFn(col * xFactor, row * yFactor) + 1.0) * 128;
        ++col;
      }
      
      col = 0;
      ++row;
    }
    return;
  }

  /**
   * Get the height value using coordinates in the range of (0 1).
   * 
   * @param _x value in the x axis. 
   * @param _y value in the y axis.
   */
  getF(_x : number, _y : number)
  : integer
  {
    if(_x < 0.0) {
      _x = 0.0;      
    }
    else if(_x > 1.0){
      _x = 1.0;
    }

    if(_y < 0.0) {
      _y = 0.0;      
    }
    else if(_y > 1.0){
      _y = 1.0;
    }

    return this.get
    (
      Math.floor(this._m_width * _x), 
      Math.floor(this._m_height * _y)
    );
  }

  /**
   * Get the height value of the given cell in the data grid of this map. This
   * method use a coordinate where x is in the range of (0 width] and y is in the
   * range of (0 height]. 
   * 
   * @param _xCoord The x coordinate of the cell.
   * @param _yCoord The y coordinate of the cell.
   * 
   * @returns the height value of the cell.
   */
  get(_xCoord : integer, _yCoord : integer)
  : integer
  {
    if(_xCoord >= this._m_width) {
      _xCoord %= this._m_width;
    }

    if(_yCoord >= this._m_height) {
      _yCoord %= this._m_height;
    }

    return this._m_data[(_yCoord * this._m_width) + _xCoord];
  }

  /**
   * Get the width of this TerrainData.
   */
  getWidth()
  : integer
  {
    return this._m_width;
  }

  /**
   * Get the height of this TerrainData.
   */
  getHeight()
  : integer
  {
    return this._m_height;
  }

  /**
   * Set the array of integers to null.
   */
  destroy()
  : void
  {
    this._m_data = null;
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Array of values that represent the terrain height from 0 to 255.
   */
  private _m_data : Uint8Array;

  /**
   * The width of this terrain.
   */
  private _m_width : integer;

  /**
   * The height of this terrain.
   */
  private _m_height : integer;
}