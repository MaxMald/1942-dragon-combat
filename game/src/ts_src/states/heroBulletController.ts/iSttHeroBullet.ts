/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Provides a base interface fo the hero bullet controller.
 *
 * @file iSttHeroBullet.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-20-2020
 */

import { CmpHeroBulletController } from "../../components/cmpHeroBulletController";
import { ICmpState } from "../ICmpState";

/**
 * Provides a base interface fo the hero bullet controller.
 */
export interface ISttHeroBullet 
extends ICmpState<CmpHeroBulletController>
{
  
}