/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file dcSteeringBehaviors.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-26-2020
 */

import { V2 } from "../commons/1942types";

/**
 * Calculate a seek force.
 * 
 * @param _self self position.
 * @param _selfVelocity self actual velocity.
 * @param _target target position.
 * @param _seekMaxLength maximum length of the seek force.
 * @param _output vector where will be saved the result.
 */
export function DC_SEEK
(
  _self : V2,
  _selfVelocity : V2,
  _target : V2,
  _seekMaxLength : number,
  _output : V2
)
: void
{
  
}