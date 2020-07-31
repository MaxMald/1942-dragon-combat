/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary 
 *
 * @file erranteSpawner.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-31-2020
 */

import { DC_ENEMY_TYPE, DC_MESSAGE_ID } from "../../commons/1942enums";
import { Ty_physicsActor} from "../../commons/1942types";
import { CmpErranteController } from "../../components/cmpErranteController";
import { IEnemySpawner } from "./iEnemySpawner";

export class ErranteSpawner implements IEnemySpawner
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : ErranteSpawner
  {
    let spawner : ErranteSpawner = new ErranteSpawner();

    spawner._m_collisionCntrl = CmpErranteController.Create();

    return spawner;
  }

  update(_dt: number)
  : void 
  { 
    this._m_collisionCntrl.setDeltaTime(_dt);
    return;
  }

  spawn(_actor: Ty_physicsActor, _x: number, _y: number)
  : void 
  {
    // Add behaviour components.

    _actor.addComponent(this._m_collisionCntrl);

    // Set Texture.

    let sprite = _actor.getWrappedInstance();
    sprite.setTexture('enemy');
    sprite.setAngle(90.0);
    
    sprite.body.setCircle(sprite.height * 0.5, -10.0, 0.0);   

    // Set position.

    _actor.sendMessage
    (
      DC_MESSAGE_ID.kToPosition, 
      new Phaser.Math.Vector3(_x, _y)
    );

    return;
  }

  getID()
  : DC_ENEMY_TYPE 
  {
    return DC_ENEMY_TYPE.kErrante;
  }

  destroy()
  : void 
  {
    return;
  }
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
 
  private constructor()
  { }
  
  private _m_collisionCntrl : CmpErranteController; 
}