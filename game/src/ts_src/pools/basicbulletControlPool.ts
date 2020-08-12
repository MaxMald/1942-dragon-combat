/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file basicbulletControlPool.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-12-2020
 */

import { MxObjectPool } from "optimization/mxObjectPool";
import { CmpBasicBulletController } from "../components/cmpBasicBulletController";

export class BasicBulletControlPool
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor()
  { }

  init(_size : number)
  : void
  {
    this.destroy();

    let pool = MxObjectPool.Create<CmpBasicBulletController>();
    let aComponents = Array<CmpBasicBulletController>();

    while(_size > 0)
    {      
      aComponents.push(CmpBasicBulletController.Create());
      --_size;
    }

    pool.init(aComponents);
    this._m_pool = pool;

    return;
  }

  get()
  : CmpBasicBulletController
  {
    return this._m_pool.get();
  }

  desactive(_cmp : CmpBasicBulletController)
  : void
  {
    this._m_pool.desactive(_cmp);
    return;
  }
 
  destroy()
  : void
  {
    if(this._m_pool != null)
    {
      this._m_pool.forEach
      (
        function(_cmp : CmpBasicBulletController)
        : void
        {
          _cmp.destroy();
        }
      );

      this._m_pool.destroy();
      this._m_pool = null;
    }

    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_pool : MxObjectPool<CmpBasicBulletController>;
}