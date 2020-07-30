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

  /**
   * CmpAnimation.
   */
  kAnimation : 2 as 2,

  /**
   * CmpHeroBulletController.
   */
  kHeroBulletController : 3 as 3,

  /**
   * CmpMovementBullet.
   */
  kMovementBullet : 4 as 4
});
