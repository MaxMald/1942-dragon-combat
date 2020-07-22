import { MxUtilities } from "mxUtilities";

export class Boot extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  create()
  : void
  { 

    // Prepares the MxUtilites modules.
    MxUtilities.Prepare();

    // next scene
    this.scene.start('preloader');
    return;
  }
}