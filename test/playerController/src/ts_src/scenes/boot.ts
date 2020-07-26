export class Boot extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  create()
  : void
  { 
    // next scene
    this.scene.start('preloader');
    return;
  }
}