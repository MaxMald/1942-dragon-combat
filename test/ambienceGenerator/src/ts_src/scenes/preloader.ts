export class Preloader extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  preload()
  : void
  {
    this.load.path = "../assets/"

    ///////////////////////////////////
    // Images    
    this.load.image('duke', 'images/inge_logo_02.png');
    
    ///////////////////////////////////
    // Atlas    
    this.load.atlas
    (
      'summer_props',
      'atlas/rpg_summer_tileset_props.png',
      'atlas/rpg_summer_tileset_props.js'
    );

    this.load.atlas
    (
      'scott',
      'atlas/scott.png',
      'atlas/scott.js'
    );

    ///////////////////////////////////
    // Animations
    this.load.animation
    (
      'scottAnimation',
      'animations/scott.json'
    );

    return;
  }

  create()
  : void
  {
    this.scene.start('actorFrameAnimation');
    return;
  }
}