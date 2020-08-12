import { Plugin } from "phaser3-nineslice";
import { Preload } from "./scenes/preload";
import { Test } from "./scenes/test";
import { Boot } from "./scenes/boot";

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
      
      width : 1080,
      height : 1920,

      physics: {
        default: 'arcade',
        arcade: {            
            debug: true
        }
      },

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
    this.m_game.scene.add('preload', Preload);
    this.m_game.scene.add('test', Test);

    ///////////////////////////////////
    // Start BOOT    

    this.m_game.scene.start('boot');

    ////////////////////////////////////
    // 
    return;
  }  
}
export = GameInit;