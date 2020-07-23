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

        this.m_position.x = pointer.position.x;
        this.m_position.y = pointer.position.y;
        return;
      default:
        return;
    }
  }
}