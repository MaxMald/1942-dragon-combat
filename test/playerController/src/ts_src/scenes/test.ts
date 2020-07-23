import { CmpSprite } from "behaviour/components/cmpSprite";
import { MxActor } from "behaviour/mxActor";
import { CmpCharTransform } from "../../../../../game/src/ts_src/components/cmpCharTransform";
import { PlayerController } from "../../../../../game/src/ts_src/playerController/playerController";

export class Test extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  preload()
  : void
  {
    this.load.path = "../assets/";   

    this.load.atlas
    (
      "summer_props",
      "atlas/rpg_summer_tileset_props.png",
      "atlas/rpg_summer_tileset_props.js"
    );

    this.load.atlas
    (
      "dragon",
      "atlas/DragonFlight.png",
      "atlas/DragonFlight.js"
    );
    return;
  }
  
  create()
  : void
  {
    
    ///////////////////////////////////
    // Hero

    let hero : MxActor = MxActor.Create("player");

    hero.clearComponentManager();
    
    hero.m_transform = new CmpCharTransform();
    hero.m_transform.setParent(null); 

    hero.m_transform.m_position.x = 100.0;
    hero.m_transform.m_position.y = 100.0;

    hero.addComponent(hero.m_transform);

    let sprCmp : CmpSprite = new CmpSprite();
    sprCmp.prepare
    (
      this.add.sprite(0.0, 0.0, 'dragon', 0)
    );
    hero.addComponent(sprCmp);

    ///////////////////////////////////
    // Hero Controller

    let heroController : PlayerController = new PlayerController();
    
    heroController.init(this.input.activePointer, hero);

    this._m_hero = hero;
    this._m_heroController = heroController;

    return;
  }


  update(_time : number, _delta : number)
  : void
  {
    this._m_hero.update();
    this._m_heroController.update(_delta * 0.001);
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_hero : MxActor;

  private _m_heroController : PlayerController;
}