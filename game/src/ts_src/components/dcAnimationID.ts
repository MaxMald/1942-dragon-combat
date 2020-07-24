type EnumLiteralsOf<T extends object> = T[keyof T];

export type DC_ANIMATION_ID = EnumLiteralsOf<typeof DC_ANIMATION_ID>;

export const DC_ANIMATION_ID = Object.freeze
({
  /**
   * Forward Animation.
   */
  kForward : 0 as 0, 

  /**
   * Back Animation.
   */
  kBack : 1 as 1,

  /**
   * Right Animation.
   */
  kRight : 2 as 2,

  /**
   * Left Animation.
   */
  kLeft : 3 as 3,

  /**
   * Idle Animation.
   */
  kIdle : 4 as 4
});
