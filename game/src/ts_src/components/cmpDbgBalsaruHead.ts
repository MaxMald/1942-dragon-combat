/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file cmpDbgBalsaruHead.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-16-2020
 */

import { BaseActor } from "../actors/baseActor";
import { DC_CONFIG } from "../commons/1942enums";
import { Ty_Image, Ty_physicsSprite, Ty_Sprite } from "../commons/1942types";
import { CnfBalsaruHead } from "../configObjects/cnfBalsaruHead";
import { IBaseComponent } from "./iBaseComponent";

export class CmpDbgBalsaruHead
implements IBaseComponent<Ty_physicsSprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : CmpDbgBalsaruHead
  {
    let cmp = new CmpDbgBalsaruHead();

    cmp.m_id = DC_CONFIG.kDebugBalsaruHead;

    return cmp;
  }

  init(_actor: BaseActor<Ty_physicsSprite>)
  : void 
  {
    return;
  }

  setup
  (
    _scene : Phaser.Scene, 
    _cnfHead : CnfBalsaruHead,
    _head : Ty_physicsSprite,
    _body : Ty_Image
  )
  : void
  {
    this._m_cnfHead = _cnfHead;

    this._m_head = _head;

    this._m_body = _body;

    // Create vision radius 

    this._m_graphics = _scene.add.graphics
    (
      {
        lineStyle : { width : 1, color : 0x00FF00 }
      }
    );

    // Vision radius label

    this._m_visionRadiusLabel = _scene.add.text
    (
      0.0,
      0.0,
      '',
      { 
        fontFamily: 'Arial', 
        fontSize: 15, 
        color: '#00ff00' 
      }
    )
    this._m_visionRadiusLabel.setOrigin(0.5, 0.5);

    this._m_visionRadius = new Phaser.Geom.Circle
    (
      0, 0, 0
    );

    return;
  }

  update(_actor: BaseActor<Ty_physicsSprite>)
  : void 
  {
    // Clear graphics

    this._m_graphics.clear();

    // Vision Radius

    let visionRadius = this._m_visionRadius;

    let headConfig = this._m_cnfHead;

    visionRadius.radius = headConfig.visionRadius;

    let head = this._m_head;

    visionRadius.setPosition(head.x, head.y);

    this._m_graphics.strokeCircleShape(visionRadius);

    // Vision Radius Label

    let label = this._m_visionRadiusLabel;

    label.text = "vision radius : " + headConfig.visionRadius.toString() + " px.";

    label.setPosition
    (
      head.x,
      head.y + visionRadius.radius + 25
    );

    // Neck Length

    visionRadius.radius = headConfig.neck_length;

    visionRadius.setPosition(this._m_body.x, this._m_body.y);

    this._m_graphics.strokeCircleShape(visionRadius);
    return;
  }

  receive(_id: number, _obj: any)
  : void 
  {
    return;
  }

  destroy()
  : void 
  {
    this._m_cnfHead = null;

    this._m_graphics.destroy();

    this._m_visionRadius = null;
    return;
  }

  m_id: number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_cnfHead : CnfBalsaruHead;

  private _m_head : Ty_physicsSprite;

  private _m_body : Ty_Image;

  // Drawing properties

  private _m_graphics : Phaser.GameObjects.Graphics;

  private _m_visionRadius : Phaser.Geom.Circle;

  private _m_visionRadiusLabel : Phaser.GameObjects.Text;
}