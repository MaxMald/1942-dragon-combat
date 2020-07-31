/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary This object is used to configure a class that implements the
 * IEnemiesManager interface.
 *
 * @file enemiesManagerConfig.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-30-2020
 */

 /**
  * This object is used to configure a class that implements the IEnemiesManager
  * interface.
  */
export class EnemiesManagerConfig
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Number of BaseActor in the pool.
   */
  pool_size : number;

  /**
   * The sprite's texture key of each BaseActor.
   */
  texture_key : string;
}