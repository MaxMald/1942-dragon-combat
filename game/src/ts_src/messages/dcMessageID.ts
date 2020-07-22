 /**
  * 
  */

import { MESSAGE_ID } from "commons/mxEnums";

type EnumLiteralsOf<T extends object> = T[keyof T];

export type DC_MESSAGE_ID = EnumLiteralsOf<typeof DC_MESSAGE_ID>;

export const DC_MESSAGE_ID = Object.freeze
({
  /**
   * Move the agent.
   * 
   * params : MsgActorMove.
   */
  kAgentMove : 500 as 500, 

  /**
   * The pointer that had been moved.
   * 
   * params : Phaser.Input.Pointer
   */
  kPointerMoved : 501 as 501
});