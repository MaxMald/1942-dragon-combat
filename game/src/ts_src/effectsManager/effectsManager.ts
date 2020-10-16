/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file effectsManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since October-15-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { Ty_Sprite } from "../commons/1942types";
import { ICustomEffect } from "./dcICustomEffect";
import { PoofEffect } from "./dcPoofEffect";

export class EffectsManager
{

  static Create()
  : EffectsManager
  {
    let fx : EffectsManager = new EffectsManager();

    ///////////////////////////////////
    // Create Effects

    fx._m_hEffects = new Map<string, ICustomEffect>();

    fx._m_hEffects.set("poof", new PoofEffect());

    fx._m_spritePool = MxObjectPool.Create<Ty_Sprite>();

    return fx;
  }

  init(_scene : Phaser.Scene)
  : void
  {
    ///////////////////////////////////
    // Create Particle Manager

    this._m_emitterManager = _scene.add.particles("fx_particles");

    this._m_emitterManager.setDepth(2.0);

    ///////////////////////////////////
    // Create Particle Emitters

    this._m_emitterA = this._m_emitterManager.createEmitter({});
    this._m_emitterB = this._m_emitterManager.createEmitter({});
    this._m_emitterC = this._m_emitterManager.createEmitter({});

    ///////////////////////////////////
    // Create Sprites

    let index : number = 0;

    let size : number = 10;

    let aSprite : Ty_Sprite[] = new Array<Ty_Sprite>();    

    while(index < size)
    {
      let sprite : Ty_Sprite = _scene.add.sprite(0, 0, "fx_particles");

      sprite.setActive(false);
      sprite.setVisible(false);

      sprite.on
      (
        "animationcomplete", 
        function()
        {
          this.onAnimationComplete(sprite);
          return;
        },
        this
      );

      aSprite.push(sprite);

      ++index;
    }

    this._m_spritePool.init(aSprite);
    return;
  }

  /**
   * Spawn a explosion in the given position.
   * 
   * @param _x 
   * @param _y 
   * @param _radius 
   */
  spawnExplosion(_x : number, _y : number, _radius)
  : void
  {

    let sprite : Ty_Sprite;

    sprite = this._m_spritePool.get();

    if(sprite != null)
    {
      sprite.setVisible(true);
      sprite.setActive(true);

      sprite.setPosition(_x, _y);
      sprite.play('explosion_a');
    };
    return;
  }

  /**
   * Spawn a poof in the given position.
   * 
   * @param _x 
   * @param _y 
   * @param _radius 
   */
  spawnPoof(_x : number, _y : number, _radius : number)
  : void
  {
    this._spawnEffect("poof", _x, _y);
    return;
  }

  destroy()
  : void
  {
    this._m_emitterManager.destroy();

    this._m_emitterManager = null;

    this._m_emitterA = null;
    this._m_emitterB = null;
    this._m_emitterC = null;

    this._m_hEffects.clear();
    this._m_hEffects = null;

    return;
  }

  onAnimationComplete(_sprite : Ty_Sprite)
  : void
  {
    _sprite.setActive(false);
    _sprite.setVisible(false);

    this._m_spritePool.desactive(_sprite);

    console.log("disable");
    return;
  }
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private constructor()
  { }  

  private _spawnEffect(_name : string, _x : number, _y : number, _data ?: any)
  : void
  {
    let effect : ICustomEffect = this._m_hEffects.get(_name);

    if(effect)
    {
      effect.spawn
      (
        _x, 
        _y,
        this._m_emitterA,
        this._m_emitterB,
        this._m_emitterC,
        _data
      );
    }
    return;
  }

  private _m_emitterManager : Phaser.GameObjects.Particles.ParticleEmitterManager;

  private _m_emitterA : Phaser.GameObjects.Particles.ParticleEmitter;

  private _m_emitterB : Phaser.GameObjects.Particles.ParticleEmitter;

  private _m_emitterC : Phaser.GameObjects.Particles.ParticleEmitter;

  private _m_hEffects : Map<string, ICustomEffect>;

  private _m_sprite : Phaser.GameObjects.Sprite;

  private _m_spritePool : MxObjectPool<Ty_Sprite>;
}