export class GameScene extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  create()
  : void
  {
    this.add.image
    (
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.5,
      'duke'
    );
    return;
  }
}