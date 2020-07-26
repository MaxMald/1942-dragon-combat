type EnumLiteralsOf<T extends object> = T[keyof T];

export type DC_MESSAGE_ID = EnumLiteralsOf<typeof DC_MESSAGE_ID>;

export const DC_MESSAGE_ID = Object.freeze
({
  /**
   * Move agent.
   * 
   * msg : Phaser.Math.Vector.
   */
  kAgentMove : 500 as 500, 

  /**
   * The pointer that had been moved.
   * 
   * msg : Phaser.Input.Pointer
   */
  kPointerMoved : 501 as 501,

  /**
   * Set agent to position.
   * 
   * msg : Phaser.Math.Vector3.
   */
  kToPosition : 502 as 502,

  /**
   * The pointer had been released.
   * 
   * msg : Phaser.Input.Pointer
   */
  kPointerReleased : 503 as 503,

  /**
   * The pointer had been pressed.
   * 
   * msg : Phaser.Input.Pointer
   */
  kPointerPressed : 504 as 504
});