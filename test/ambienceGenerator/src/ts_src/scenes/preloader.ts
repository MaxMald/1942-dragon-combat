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
    // Shaders
    

    return;
  }

  create()
  : void
  {
    this.scene.start('test');
    return;
  }
}