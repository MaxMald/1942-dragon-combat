export class Preloader extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  preload()
  : void
  {
  
  }

  create()
  : void
  {
    this.scene.start('test');
    return;
  }
}