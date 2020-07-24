type EnumLiteralsOf<T extends object> = T[keyof T];

export type DC_COMPONENT_ID = EnumLiteralsOf<typeof DC_COMPONENT_ID>;

export const DC_COMPONENT_ID = Object.freeze
({
  /**
   * CmpMovement.
   */
  kMovement : 0 as 0, 

  /**
   * CmpHeroInput.
   */
  kHeroInput : 1 as 1,
});
