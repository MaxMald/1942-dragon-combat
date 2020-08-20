/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Configuartion object of the Item Manager.
 *
 * @file cnfItemManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-19-2020
 */

 /**
  * Configuration object of the Item Manager.
  */
export class CnfItemManager 
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Creates a configuartion object with default values.
   */
  constructor()
  {
    this.pool_size = 3;
    this.playZone_extrude = 100.0;

    return;
  }

  /**
   * Number of pool objects.
   */
  pool_size : integer;

  /**
   * 
   */
  playZone_extrude : integer;
}