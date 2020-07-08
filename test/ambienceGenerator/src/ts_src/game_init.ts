import { Plugin } from "phaser3-nineslice";
import { Boot } from "./scenes/boot";
import { Preloader } from "./scenes/preloader";
import { ScnActorHierarchy } from "./scenes/test/scnActorHierarchy";
import { ScnActorAnimation } from "./scenes/test/scnActorAnimation";

class GameInit
{
    private m_game : Phaser.Game;

    public constructor()
    { }

    public start()
    : void
    {
    var config = 
    {
      type: Phaser.WEBGL,
      scale: 
      {
        parent: 'phaser-game',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT
      },
      width : 1920,
      height : 1080,
      input:
      {
        gamepad:true
      },
      plugins: {
        global: [ Plugin.DefaultCfg ],
      },   
      backgroundColor: 0x6ab4d4        
    }

    ///////////////////////////////////
    // Init Game

    this.m_game = new Phaser.Game(config);
    
    ///////////////////////////////////
    // Create Scenes        

    this.m_game.scene.add('boot', Boot);
    this.m_game.scene.add('preloader', Preloader);

    this.m_game.scene.add('actorHierarchy', ScnActorHierarchy);
    this.m_game.scene.add('actorFrameAnimation', ScnActorAnimation);

    ///////////////////////////////////
    // Start BOOT    

    this.m_game.scene.start('boot');

    ////////////////////////////////////
    // 
    return;
  }  
}
export = GameInit;