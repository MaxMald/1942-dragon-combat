/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary This is used to configurate a bullet manager during its
 * initalization.
 *
 * @file bulletManagerConfig.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-31-2020
 */

 /**
  * This is used to configurate a bullet manager during its initalization.
  */
export class BulletManagerConfig 
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Number of bullets in the pool.
   */
  size : number;

  /**
   * Amount of padding added to the game canvas. The playzone defines the area
   * where a bullet can live, if it getout of its boundings it will be 
   * desactivated.
   */
  playZone_padding : number;

  /**
   * Speed of bullets in pixels per second.
   */
  speed : number;
}