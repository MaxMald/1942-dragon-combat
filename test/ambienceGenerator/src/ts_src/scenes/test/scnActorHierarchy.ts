import { MxActor } from "behaviour/mxActor";
import { CmpSprite } from "behaviour/components/cmpSprite";

export class ScnActorHierarchy extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  create()
  : void
  {
    // Get the screen center
    this._m_screenCenterX = this.game.canvas.width * 0.5;
    this._m_screenCenterY = this.game.canvas.height * 0.5;
    
    ///////////////////////////////////
    // Parent

    this._m_parent = MxActor.Create('parent');
    
    let spriteComponent : CmpSprite = new CmpSprite();
    spriteComponent.prepare
    (
      this.add.sprite
      (
        this._m_screenCenterX, 
        this._m_screenCenterY, 
        'summer_props',
        'tree_1.png'
      )
    );

    this._m_parent.addComponent(spriteComponent);
    this._m_parent.init();

    ///////////////////////////////////
    // Child
      
    this._m_child = this._m_parent.create('child');

    let spriteComponent_child : CmpSprite = new CmpSprite();
    spriteComponent_child.prepare
    (
      this.add.sprite
      (
        this._m_screenCenterX, 
        this._m_screenCenterY, 
        'summer_props',
        'decor_1.png'
      )
    );

    this._m_child.addComponent(spriteComponent_child);
    this._m_child.init();

    return;
  }

  update(_time : number)
  : void
  {
    // Parent orbit
    this._m_orbit
    (
      this._m_screenCenterX,
      this._m_screenCenterY,
      300.0,
      _time / 1000.0,
      this._m_parent
    );

    // Child orbit
    this._m_orbit
    (
      0,
      0,
      150.0,
      _time / 750.0,
      this._m_child
    );

    /**
     * Updates parent actor. Child is automatically updated by its partent.
     */
    this._m_parent.update();
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_orbit
  (
    _centerX : number, 
    _centerY : number,
    _radius : number, 
    _time : number,
    _actor : MxActor
  )
  : void
  {
    _actor.m_transform.m_position.x = (Math.sin(_time) * _radius) + _centerX;
    _actor.m_transform.m_position.y = (Math.cos(_time) * _radius) + _centerY; 
    return;
  }

  private _m_parent : MxActor;

  private _m_child : MxActor;

  private _m_screenCenterX : number;

  private _m_screenCenterY : number;
}