/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file dcPoofAEffect.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since October-15-2020
 */

import { ICustomEffect } from "./dcICustomEffect";

export class PoofEffect
  implements ICustomEffect
{
  constructor()
  {
  }

  spawn
  (
    _x: number, 
    _y: number, 
    _emitterA: Phaser.GameObjects.Particles.ParticleEmitter, 
    _emitterB: Phaser.GameObjects.Particles.ParticleEmitter, 
    _emitterC: Phaser.GameObjects.Particles.ParticleEmitter, 
    _data?: any
  ): void 
  {
    ///////////////////////////////////
    // Star Emitter

    _emitterA.fromJSON
    ({
      frame : "fx_star.png",
      x : _x,
      y : _y,
      speed: { min: -800, max: 800 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.75, end: 0 },
      lifespan: 200,
      blendMode : "ADD"
    });

    _emitterA.setTint([ 0xffff00, 0xff0000, 0x00ff00, 0x0000ff ]);

    ///////////////////////////////////
    // Pop Emitter

    _emitterB.fromJSON
    ({
      frame : "fx_pop.png",
      x : _x,
      y : _y,
      speed: { min: -400, max: 400 },
      angle: { min: 0, max: 360 },
      scale: { start: 1.5, end: 0 },
      lifespan: 200,
      blendMode : "ADD"
    });

    ///////////////////////////////////
    // Circle Emitter

    _emitterC.fromJSON
    ({
      frame : "fx_circle.png",
      x : _x,
      y : _y,
      speed: { min: -600, max: 600 },
      angle: { min: 0, max: 360 },
      scale: { start: 1.0, end: 0 },
      lifespan: 200,
      blendMode : "ADD"
    });

    ///////////////////////////////////
    // Explode

    _emitterA.explode(5, _x, _y);
    _emitterB.explode(10, _x, _y);
    _emitterC.explode(5, _x, _y);

    return;
  }

  config : Phaser.Types.GameObjects.Particles.ParticleEmitterConfig;
}