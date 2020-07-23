import { CmpTransform } from "behaviour/components/cmpTransform";
import { DC_MESSAGE_ID } from "../messages/dcMessageID";

export class CmpCharTransform extends CmpTransform
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  receive(_id : number, _data : unknown)
  : void 
  {
    switch (_id)
    {
      case DC_MESSAGE_ID.kPointerMoved:

        let pointer : Phaser.Input.Pointer = _data as Phaser.Input.Pointer;

        this.setPosition(pointer.position.x, pointer.position.y);
        return;
      
      case DC_MESSAGE_ID.kAgentMove:

        let direction : Phaser.Math.Vector3 = _data as Phaser.Math.Vector3;

        this.move(direction.x, direction.y);      
        return;
      default:
        return;
    }
  }
}