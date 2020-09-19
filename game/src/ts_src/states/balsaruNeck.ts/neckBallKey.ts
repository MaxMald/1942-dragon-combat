/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file neckBallKey.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-09-2020
 */

import { Ty_Image } from "../../commons/1942types";

export class NeckBallKey
{
  constructor()
  {
    // Position

    this.x = 0.0;
    this.y = 0.0;

    // Scale
    this.scale_x = 1.0;
    this.scale_y = 1.0;
    
    // Rotation
    this.angle = 0.0;
    
    return;
  }

  /**
   * Capture the neck ball status.
   * 
   * @param _neckBall neck ball.
   */
  capture(_neckBall : Ty_Image)
  : void
  {
    this.x = _neckBall.x;
    this.y = _neckBall.y;

    this.scale_x = _neckBall.scaleX;
    this.scale_y = _neckBall.scaleY;

    this.angle = _neckBall.angle;
    return;
  }

  /**
   * Set the neck ball status.
   * 
   * @param _scale_x 
   * @param _scale_y 
   * @param _angle 
   */
  set
  (
    _x : number,
    _y : number,
    _scale_x : number = 1.0, 
    _scale_y : number = 1.0, 
    _angle : number = 0.0
  )
  : void
  {
    this.x = _x;
    this.y = _y;

    this.scale_x = _scale_x;
    this.scale_y = _scale_y;
    
    this.angle = _angle;
    return;
  }

  /**
   * Apply neck key to neck ball.
   * 
   * @param _neckBall neck ball. 
   */
  apply(_neckBall : Ty_Image)
  : void
  {
    _neckBall.setPosition(this.x, this.y);
    _neckBall.setScale(this.scale_x, this.scale_y);
    _neckBall.setAngle(this.angle);
    return;
  }

  /**
   * Position at X.
   */
  x : number;

  /**
   * Poistion at Y.
   */
  y : number;

  /**
   * Scale Factor X
   */
  scale_x : number;

  /**
   * Scale factor Y
   */
  scale_y : number;

  /**
   * Neck angle in degrees.
   */
  angle : number;
}