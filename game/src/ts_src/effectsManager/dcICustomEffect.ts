/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file dcCustomEffect.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since October-15-2020
 */

export interface ICustomEffect
{
  spawn
  (
    _x: number, 
    _y: number,
    _emitterA: Phaser.GameObjects.Particles.ParticleEmitter,
    _emitterB: Phaser.GameObjects.Particles.ParticleEmitter,
    _emitterC: Phaser.GameObjects.Particles.ParticleEmitter, 
    _data?: any
  )
  : void;
}