import { Animations } from "phaser";

export class ScnActorAnimation extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  create()
  {
    let anims : Array<string> = new Array<string>();
    anims.push("scott_run");
    anims.push("scott_attack");
    anims.push("scott_kick_1");
    anims.push("scott_kick_2");
    anims.push("scott_mega_attack");
    anims.push("scott_attack_2");
    anims.push("scott_attack_3");

    let sprite : Phaser.GameObjects.Sprite;

    let animLength : number = anims.length;
    
    let offset : number = this.game.canvas.width / (animLength + 1);
    let y : number = this.game.canvas.height * 0.5;

    let index : number = 0;

    while(index < animLength){      
      sprite = this.add.sprite(offset + (offset * index), y, 'scott').play(anims[index]);
      sprite.originY = 1;
      ++index;
    }    
    return;
  }
}