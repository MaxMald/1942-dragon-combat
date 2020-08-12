/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file IActor.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-10-2020
 */

 export interface IActor
 {
   /****************************************************/
   /* Public                                           */
   /****************************************************/

   /**
    * Initilize the actor.
    */
   init()
   : void;

   /**
    * Update the actor.
    */
   update()
   : void;
   
   /**
    * Send a message.
    * 
    * @param _id message id. 
    * @param _obj message.
    */
  sendMessage(_id : number, _obj : any)
  : void;

  /**
   * Get the actor's name.
   */
  getName()
  : string;

  /**
   * Destroy actor.
   */
  destroy()
  : void;
 }
