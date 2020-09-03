var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("test/pilot/src/ts_src/scenes/preload", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Preload = void 0;
    var Preload = (function (_super) {
        __extends(Preload, _super);
        function Preload() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preload.prototype.preload = function () {
            this.load.path = "../assets/";
            this.load.atlas("DragonFlight", "atlas/DragonFlight.png", "atlas/DragonFlight.js");
            this.load.glsl({
                key: 'terrain_painter_01',
                shaderType: 'fragment',
                url: 'shaders/terrain_painter_02.frag'
            });
            this.load.animation("dragon_anim", "animations/DragonFlight.json");
            this.load.image('dialogBox', 'images/dialogBox_01.png');
            this.load.image('colorTerrainTexture', 'images/terrain_01.png');
            this.load.image('perlinTexture', 'images/perlin_256_01.png');
            this.load.image('waterNormalMap', 'images/water_normal.png');
            this.load.image('fireball', 'images/fireball.png');
            this.load.image('enemy', 'images/enemy.png');
            this.load.image('spiderBoss', 'images/boss.png');
            this.load.pack('configuration_pilot_pack', 'packs/configuration_pack.json', 'pilot');
            this.load.pack('art_pack_items', 'packs/art_pack_items.json', 'pilot');
            this.load.pack('art_pack_kalebio', 'packs/art_pack_kalebio.json', 'pilot');
            this.load.pack('art_pack_minions', 'packs/art_pack_minions.json', 'pilot');
            this.load.pack('art_pack_bullets', 'packs/art_pack_bullets.json', 'pilot');
            this.load.pack('art_pack_gui', 'packs/art_pack_gui.json', 'pilot');
            var tiledMapPack = JSON.parse(this.game.cache.text.get('TiledMap_Pack'));
            var tiledMap = tiledMapPack.pilot.files[0];
            this.load.tilemapTiledJSON(tiledMap.key, tiledMap.url);
            this.load.tilemapTiledJSON('prefab_score_popup', 'prefabs/gui/prefab_ui_scoreBox_A.json');
            this.load.tilemapTiledJSON('prefab_lose_popup', 'prefabs/gui/prefab_ui_loseBox_A.json');
            return;
        };
        Preload.prototype.create = function () {
            this.scene.start('test');
            return;
        };
        return Preload;
    }(Phaser.Scene));
    exports.Preload = Preload;
});
define("game/src/ts_src/commons/1942enums", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DC_CONFIG = exports.DC_SECONDARY_ACTION = exports.DC_ACTOR_COMMAND = exports.DC_ITEM_TYPE = exports.DC_BULLET_TYPE = exports.DC_HERO_STATE = exports.DC_ANIMATION_ID = exports.DC_MESSAGE_ID = exports.DC_COMPONENT_ID = exports.DC_BOSS_ID = exports.DC_ENEMY_TYPE = void 0;
    exports.DC_ENEMY_TYPE = Object.freeze({
        kUndefined: -1,
        kErrante: 0,
        kSonico: 1,
        kRanger: 2,
        kArponShip: 3
    });
    exports.DC_BOSS_ID = Object.freeze({
        kBalsaru: 0
    });
    exports.DC_COMPONENT_ID = Object.freeze({
        kMovement: 0,
        kHeroInput: 1,
        kAnimation: 2,
        kHeroBulletController: 3,
        kMovementBullet: 4,
        kCollisionController: 5,
        kMovementEnemy: 6,
        kEnemyHealth: 7,
        kBasicBulletController: 8,
        kBulletData: 9,
        kPlayZone: 10,
        kEnemyController: 11,
        kHeroData: 12,
        kTextController: 13,
        kUIHealthController: 14,
        kUIScoreController: 15,
        kActorGroup: 16,
        kImageController: 17,
        kPhysicSpriteController: 18,
        kSpiderBossController: 19,
        kSimpleBulletControl: 20,
        kUIBossHealthControl: 21,
        kHeroController: 22,
        kItemController: 23,
        kPowerShieldComponent: 24,
        kSpriteController: 25,
        kArponWeaponController: 26,
        kArponBulletController: 27,
        kUIPowerShieldController: 28,
        kUIScoreMultiplier: 29,
        kCmpActorChildrenController: 30,
        kCmpImageInteractive: 31
    });
    exports.DC_MESSAGE_ID = Object.freeze({
        kUndefined: 499,
        kAgentMove: 500,
        kPointerMoved: 501,
        kToPosition: 502,
        kPointerReleased: 503,
        kPointerPressed: 504,
        kMixedMovement: 505,
        kHit: 506,
        kKill: 507,
        kSetText: 508,
        kAddScorePoints: 509,
        KSpawnEnemy: 510,
        kDesactive: 511,
        kShow: 512,
        kClose: 513,
        kMisionCompleted: 514,
        kMisionFailure: 515,
        kGameReset: 516,
        kBossEnter: 517,
        kDirection: 518,
        kSpeed: 519,
        kEnterBarrelRoll: 520,
        kExitBarrelRoll: 521,
        kCollisionItem: 522,
        kSetHealthPoints: 523,
        kSetBulletManager: 524,
        kActive: 525,
        kPowerShieldActivated: 526,
        kPowerShieldDesactivated: 527,
        kCollisionWithHero: 528,
        kRangerExplosionHit: 529,
        kSetAngle: 530,
        kSetTexture: 531,
        kPowerShieldExplodes: 532,
        kDesactivePowerUps: 533,
        kSetPrefab: 534,
        kPointerDown: 535,
        kPointerUp: 536,
        kPointerOver: 537,
        kPointerMove: 538,
        kPointerOut: 539,
    });
    exports.DC_ANIMATION_ID = Object.freeze({
        kForward: 0,
        kBack: 1,
        kRight: 2,
        kLeft: 3,
        kIdle: 4
    });
    exports.DC_HERO_STATE = Object.freeze({
        kUndefined: 0,
        kNormal: 1,
        kBarrelRoll: 2
    });
    exports.DC_BULLET_TYPE = Object.freeze({
        kUndefined: 0,
        kHeroBasic: 1,
        kEnemyBasic: 2,
        kSimple: 3,
        kTripleSHot: 4,
        kArpon: 5
    });
    exports.DC_ITEM_TYPE = Object.freeze({
        kUndefined: -1,
        kCadmio: 0,
        kCanus: 1,
    });
    exports.DC_ACTOR_COMMAND = Object.freeze({
        kRemoveComponent: 0
    });
    exports.DC_SECONDARY_ACTION = Object.freeze({
        kUndefined: -1,
        KTripleShot: 0,
        kShield: 1
    });
    exports.DC_CONFIG = Object.freeze({
        kCanus: 0,
        kCadmio: 1,
        kItemManager: 2,
        kHeroBulletStateNormal: 3,
        kHeroBasicBullet: 4,
        kHeroTripleShotBullet: 5,
        kHeroBulletStateTriple: 6,
        kHeroPowerShield: 7,
        kRanger: 8,
        kRangerSpawner: 9,
        kSonic: 10,
        kSonicSpawner: 10,
        kArponShip: 11,
        kArponShipSpawner: 12,
        kArponBullet: 13,
        kArponBulletSpawner: 14,
        kErrante: 15,
        kErranteSpawner: 16,
        kEnemyBasicBullet: 17,
        kScoreManager: 18
    });
});
define("game/src/ts_src/components/iBaseComponent", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/actors/iActor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/actors/baseActor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaseActor = void 0;
    var BaseActor = (function () {
        function BaseActor() {
        }
        BaseActor.Create = function (_instance, _name) {
            var actor = new BaseActor();
            actor._m_components = new Array();
            actor._m_instance = _instance;
            actor.m_name = _name;
            return actor;
        };
        BaseActor.prototype.init = function () {
            var index = 0;
            var components = this._m_components;
            var length = components.length;
            while (index < length) {
                components[index].init(this);
                ++index;
            }
            return;
        };
        BaseActor.prototype.update = function () {
            var components = this._m_components;
            components.forEach(this._updateComponent, this);
            return;
        };
        BaseActor.prototype.sendMessage = function (_id, _obj) {
            var index = 0;
            var aComponent = this._m_components;
            var size = aComponent.length;
            while (index < size) {
                if (aComponent[index] != null) {
                    aComponent[index].receive(_id, _obj);
                }
                ++index;
            }
            return;
        };
        BaseActor.prototype.getWrappedInstance = function () {
            return this._m_instance;
        };
        BaseActor.prototype.addComponent = function (_component) {
            if (this.hasComponent(_component.m_id)) {
                this.removeComponent(_component.m_id);
            }
            this._m_components.push(_component);
            return;
        };
        BaseActor.prototype.getComponent = function (_id) {
            var index = 0;
            var length = this._m_components.length;
            while (index < length) {
                if (this._m_components[index].m_id == _id) {
                    return this._m_components[index];
                }
                ++index;
            }
            throw new Error("Component of index : " + _id.toString() + " not founded");
        };
        BaseActor.prototype.removeComponent = function (_id) {
            var index = 0;
            var length = this._m_components.length;
            while (index < length) {
                if (this._m_components[index].m_id == _id) {
                    this._m_components.splice(index, 1);
                    return;
                }
                ++index;
            }
            return;
        };
        BaseActor.prototype.hasComponent = function (_id) {
            var index = 0;
            var length = this._m_components.length;
            while (index < length) {
                if (this._m_components[index].m_id == _id) {
                    return true;
                }
                ++index;
            }
            return false;
        };
        BaseActor.prototype.getName = function () {
            return this.m_name;
        };
        BaseActor.prototype.destroy = function () {
            var component;
            while (this._m_components.length) {
                component = this._m_components.pop();
                component.destroy();
            }
            return;
        };
        BaseActor.prototype._updateComponent = function (_component) {
            _component.update(this);
            return;
        };
        return BaseActor;
    }());
    exports.BaseActor = BaseActor;
});
define("game/src/ts_src/commons/1942types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/bulletManager/bulletSpawner/iBulletSpawner", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/bulletManager/iBulletManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/playerController/IPlayerController", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/bossManager/IBossManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/bulletManager/bulletSpawner/nullBulletSpawner", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullBulletSpawner = void 0;
    var NullBulletSpawner = (function () {
        function NullBulletSpawner() {
        }
        NullBulletSpawner.Prepare = function () {
            if (NullBulletSpawner._INSTANCE == null) {
                NullBulletSpawner._INSTANCE = new NullBulletSpawner();
            }
            return;
        };
        NullBulletSpawner.Shutdown = function () {
            NullBulletSpawner._INSTANCE = null;
            return;
        };
        NullBulletSpawner.GetInstance = function () {
            return NullBulletSpawner._INSTANCE;
        };
        NullBulletSpawner.prototype.init = function () { };
        NullBulletSpawner.prototype.update = function (_dt) {
            console.log("NullBulletSpawner: update.");
            return;
        };
        NullBulletSpawner.prototype.spawn = function (_actor, _x, _y, _data) {
            console.log("NullBulletSpawner: spawn.");
            return;
        };
        NullBulletSpawner.prototype.assemble = function (_actor) {
            console.log("NullBulletSpawner: assemble.");
            return;
        };
        NullBulletSpawner.prototype.disassemble = function (_actor) {
            console.log("NullBulletSpawner: disassemble.");
            return;
        };
        NullBulletSpawner.prototype.setBulletManager = function (_manager) {
            console.log("NullBulletSpawner: setBulletManager.");
            return;
        };
        NullBulletSpawner.prototype.getID = function () {
            console.log("NullBulletSpawner: getID.");
            return _1942enums_1.DC_BULLET_TYPE.kUndefined;
        };
        NullBulletSpawner.prototype.destroy = function () { };
        return NullBulletSpawner;
    }());
    exports.NullBulletSpawner = NullBulletSpawner;
});
define("game/src/ts_src/bulletManager/nullBulletManager", ["require", "exports", "optimization/mxObjectPool", "game/src/ts_src/bulletManager/bulletSpawner/nullBulletSpawner"], function (require, exports, mxObjectPool_1, nullBulletSpawner_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullBulletManager = void 0;
    var NullBulletManager = (function () {
        function NullBulletManager() {
            this._m_pool = mxObjectPool_1.MxObjectPool.Create();
            this._m_pool.init(new Array());
            return;
        }
        NullBulletManager.Prepare = function () {
            if (NullBulletManager._SINGLETON == null) {
                NullBulletManager._SINGLETON = new NullBulletManager();
            }
            return;
        };
        NullBulletManager.Shutdown = function () {
            if (NullBulletManager._SINGLETON != null) {
                NullBulletManager._SINGLETON.destroy();
            }
            NullBulletManager._SINGLETON = null;
            return;
        };
        NullBulletManager.GetInstance = function () {
            return NullBulletManager._SINGLETON;
        };
        NullBulletManager.prototype.addSpawner = function (_spawner) {
            console.log("NullBulletManager : addSpawner.");
            return;
        };
        NullBulletManager.prototype.getSpawner = function (_type) {
            console.log("NullBulletManager : getSpawner.");
            return nullBulletSpawner_1.NullBulletSpawner.GetInstance();
        };
        NullBulletManager.prototype.getActor = function () {
            console.log("NullBulletManager : getActor");
            return null;
        };
        NullBulletManager.prototype.update = function (_dt) { };
        NullBulletManager.prototype.spawn = function (_x, _y, _type, _data) {
            console.log("NullBulletManager : spawn.");
            return;
        };
        ;
        NullBulletManager.prototype.getPool = function () {
            console.log("NullBulletManager : get pool.");
            return this._m_pool;
        };
        NullBulletManager.prototype.disableActor = function (_actor) {
            console.log("NullBulletManager : disableActor");
            return;
        };
        NullBulletManager.prototype.collisionVsGroup = function (_scene, _bodies) {
            console.log("NullBulletManager : collisionVsGroup");
            return;
        };
        NullBulletManager.prototype.collisionVsSprite = function (_scene, _body) {
            console.log("NullBulletManager : collisionVsSprite");
            return;
        };
        NullBulletManager.prototype.clear = function () {
            console.log("NullBulletManager : clear.");
            return;
        };
        NullBulletManager.prototype.destroy = function () {
            this._m_pool.destroy();
            return;
        };
        return NullBulletManager;
    }());
    exports.NullBulletManager = NullBulletManager;
});
define("game/src/ts_src/bossManager/NullBossManager", ["require", "exports", "game/src/ts_src/bulletManager/nullBulletManager"], function (require, exports, nullBulletManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullBossManager = void 0;
    var NullBossManager = (function () {
        function NullBossManager() {
        }
        NullBossManager.prototype.init = function (_scene, _gameManager) { };
        NullBossManager.prototype.update = function (_dt) { };
        NullBossManager.prototype.getBossHealth = function () {
            return 0.0;
        };
        NullBossManager.prototype.setPosition = function (_x, _y) { };
        NullBossManager.prototype.setHero = function (_playerController, _actor) { };
        NullBossManager.prototype.getHero = function () {
            return null;
        };
        NullBossManager.prototype.setBulletManager = function (_bulletManager) { };
        NullBossManager.prototype.getBulletManager = function () {
            return nullBulletManager_1.NullBulletManager.GetInstance();
        };
        NullBossManager.prototype.suscribe = function (_event, _username, _fn, _context) { };
        NullBossManager.prototype.unsuscribe = function (_event, _username) { };
        NullBossManager.prototype.receive = function (_id, _msg) { };
        NullBossManager.prototype.active = function () { };
        NullBossManager.prototype.desactive = function () { };
        NullBossManager.prototype.destroy = function () { };
        return NullBossManager;
    }());
    exports.NullBossManager = NullBossManager;
});
define("game/src/ts_src/commons/1942config", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfBulletManager = exports.CnfHero = void 0;
    var CnfHero = (function () {
        function CnfHero() {
            this.x = 500;
            this.y = 500;
            this.texture = "DragonFlight";
            this.frame = "D001_Flight.png";
            this.movement_mode = "MIXED";
            this.maximum_speed = 500;
            this.health = 10;
            this.score = 0;
            this.fireRate = 8;
            this.barrel_roll_duration = 1.0;
            this.hero_playzone_padding = 100;
            this.bulletManager_key = "cnf_bulletManager_hero";
            return;
        }
        return CnfHero;
    }());
    exports.CnfHero = CnfHero;
    var CnfBulletManager = (function () {
        function CnfBulletManager() {
        }
        return CnfBulletManager;
    }());
    exports.CnfBulletManager = CnfBulletManager;
});
define("game/src/ts_src/components/iCmpCollisionController", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/components/cmpNullCollisionController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpNullCollisionController = void 0;
    var CmpNullCollisionController = (function () {
        function CmpNullCollisionController() {
        }
        CmpNullCollisionController.Prepare = function () {
            if (CmpNullCollisionController._INSTANCE == null) {
                CmpNullCollisionController._INSTANCE = new CmpNullCollisionController();
                CmpNullCollisionController._INSTANCE.m_id
                    = _1942enums_2.DC_COMPONENT_ID.kCollisionController;
            }
            return;
        };
        CmpNullCollisionController.Shutdown = function () {
            CmpNullCollisionController._INSTANCE = null;
            return;
        };
        CmpNullCollisionController.GetInstance = function () {
            return CmpNullCollisionController._INSTANCE;
        };
        CmpNullCollisionController.prototype.onCollision = function (_other, _this) { };
        CmpNullCollisionController.prototype.init = function (_actor) { };
        CmpNullCollisionController.prototype.update = function (_actor) { };
        CmpNullCollisionController.prototype.receive = function (_id, _obj) { };
        CmpNullCollisionController.prototype.destroy = function () { };
        return CmpNullCollisionController;
    }());
    exports.CmpNullCollisionController = CmpNullCollisionController;
});
define("game/src/ts_src/enemiesManager/iEnemiesManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/enemiesManager/enemySpawner/iEnemySpawner", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/enemiesManager/nullEnemiesManager", ["require", "exports", "game/src/ts_src/enemiesManager/enemySpawner/nullEnemySpawner", "game/src/ts_src/bulletManager/nullBulletManager"], function (require, exports, nullEnemySpawner_1, nullBulletManager_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullEnemiesManager = void 0;
    var NullEnemiesManager = (function () {
        function NullEnemiesManager() {
        }
        NullEnemiesManager.Prepare = function () {
            if (NullEnemiesManager._INSTANCE == null) {
                NullEnemiesManager._INSTANCE = new NullEnemiesManager();
            }
            return;
        };
        NullEnemiesManager.Shutdown = function () {
            NullEnemiesManager._INSTANCE = null;
            return;
        };
        NullEnemiesManager.GetInstance = function () {
            return NullEnemiesManager._INSTANCE;
        };
        NullEnemiesManager.prototype.addSpawner = function (_spawner) {
            console.log("NullEnemiesManager : addSpawner. ");
            return;
        };
        NullEnemiesManager.prototype.getSpawner = function (_id) {
            console.log("NullEnemiesManager : getSpawner. ");
            return nullEnemySpawner_1.NullEnemySpawner.GetInstance();
        };
        NullEnemiesManager.prototype.getActor = function () {
            console.log("NullEnemiesManager : getActor. ");
            return null;
        };
        NullEnemiesManager.prototype.disableActor = function (_actor) { };
        NullEnemiesManager.prototype.update = function (_dt) {
            return;
        };
        NullEnemiesManager.prototype.spawn = function (_x, _y, _type, _data) {
            console.log("NullEnemiesManager : spawn. ");
            return;
        };
        NullEnemiesManager.prototype.setBulletManager = function (_bulletManager) { };
        NullEnemiesManager.prototype.getBulletManager = function () {
            return nullBulletManager_2.NullBulletManager.GetInstance();
        };
        NullEnemiesManager.prototype.addEnemies = function (_number) {
            return 0;
        };
        NullEnemiesManager.prototype.getEnemiesCount = function () {
            return 0;
        };
        NullEnemiesManager.prototype.destroy = function () {
            return;
        };
        return NullEnemiesManager;
    }());
    exports.NullEnemiesManager = NullEnemiesManager;
});
define("game/src/ts_src/enemiesManager/enemySpawner/nullEnemySpawner", ["require", "exports", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/enemiesManager/nullEnemiesManager"], function (require, exports, nullBulletManager_3, _1942enums_3, nullEnemiesManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullEnemySpawner = void 0;
    var NullEnemySpawner = (function () {
        function NullEnemySpawner() {
        }
        NullEnemySpawner.Prepare = function () {
            if (NullEnemySpawner._INSTANCE == null) {
                NullEnemySpawner._INSTANCE = new NullEnemySpawner();
            }
            return;
        };
        NullEnemySpawner.Shutdown = function () {
            NullEnemySpawner._INSTANCE = null;
            return;
        };
        NullEnemySpawner.GetInstance = function () {
            return NullEnemySpawner._INSTANCE;
        };
        NullEnemySpawner.prototype.update = function (_dt) {
            return;
        };
        NullEnemySpawner.prototype.spawn = function (_actor, _x, _y, _data) {
            return;
        };
        NullEnemySpawner.prototype.setEnemiesManager = function (_enemiesManager) { };
        NullEnemySpawner.prototype.getEnemiesManager = function () {
            return nullEnemiesManager_1.NullEnemiesManager.GetInstance();
        };
        NullEnemySpawner.prototype.setBulletManager = function (_bulletManager) { };
        NullEnemySpawner.prototype.getBulletManager = function () {
            return nullBulletManager_3.NullBulletManager.GetInstance();
        };
        NullEnemySpawner.prototype.getID = function () {
            return _1942enums_3.DC_ENEMY_TYPE.kUndefined;
        };
        NullEnemySpawner.prototype.assemble = function (_actor, _data) { };
        NullEnemySpawner.prototype.disasemble = function (_actor) { };
        NullEnemySpawner.prototype.destroy = function () {
            return;
        };
        return NullEnemySpawner;
    }());
    exports.NullEnemySpawner = NullEnemySpawner;
});
define("game/src/ts_src/components/iCmpEnemyController", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/components/cmpNullEnemyController", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/enemiesManager/enemySpawner/nullEnemySpawner", "game/src/ts_src/enemiesManager/nullEnemiesManager"], function (require, exports, _1942enums_4, nullEnemySpawner_2, nullEnemiesManager_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpNullEnemyController = void 0;
    var CmpNullEnemyController = (function () {
        function CmpNullEnemyController() {
        }
        CmpNullEnemyController.Prepare = function () {
            if (CmpNullEnemyController._INSTANCE == null) {
                CmpNullEnemyController._INSTANCE = new CmpNullEnemyController();
                CmpNullEnemyController._INSTANCE.m_id
                    = _1942enums_4.DC_COMPONENT_ID.kEnemyController;
            }
            return;
        };
        CmpNullEnemyController.Shutdown = function () {
            CmpNullEnemyController._INSTANCE = null;
            return;
        };
        CmpNullEnemyController.GetInstance = function () {
            return CmpNullEnemyController._INSTANCE;
        };
        CmpNullEnemyController.prototype.init = function (_actor) { };
        CmpNullEnemyController.prototype.update = function (_actor) { };
        CmpNullEnemyController.prototype.getCollisionDamage = function () {
            return 0;
        };
        CmpNullEnemyController.prototype.setSpawner = function (_spawner) { };
        CmpNullEnemyController.prototype.getSpawner = function () {
            return nullEnemySpawner_2.NullEnemySpawner.GetInstance();
        };
        CmpNullEnemyController.prototype.setEnemiesManager = function (_enemyManager) { };
        CmpNullEnemyController.prototype.getEnemiesManager = function () {
            return nullEnemiesManager_2.NullEnemiesManager.GetInstance();
        };
        CmpNullEnemyController.prototype.getScorePoints = function () {
            return 0;
        };
        CmpNullEnemyController.prototype.setScorePoints = function (_points) { };
        CmpNullEnemyController.prototype.receive = function (_id, _obj) { };
        CmpNullEnemyController.prototype.destroy = function () { };
        return CmpNullEnemyController;
    }());
    exports.CmpNullEnemyController = CmpNullEnemyController;
});
define("game/src/ts_src/configObjects/IConfigObject", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/configObjects/cnfPowerShield", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfPowerShield = void 0;
    var CnfPowerShield = (function () {
        function CnfPowerShield() {
            this.max_radius = 300.0;
            this.min_radius = 15.0;
            this.collision_damage = 10000;
            this.explosion_radius = 600.0;
            this.explosion_time = 1.0;
            this.texture_key = "hero_shield";
            this.shield_max_time = 3.0;
            return;
        }
        CnfPowerShield.prototype.setFromObject = function (_object) {
            if (_object.properties != undefined) {
                var aProperties = _object.properties;
                var index = 0;
                var property = void 0;
                while (index < aProperties.length) {
                    property = aProperties[index];
                    switch (property.name) {
                        case 'collision_damager':
                            this.collision_damage = property.value;
                            break;
                        case 'explosion_radius':
                            this.explosion_radius = property.value;
                            break;
                        case 'explosion_time':
                            this.explosion_time = property.value;
                            break;
                        case 'max_radius':
                            this.max_radius = property.value;
                            break;
                        case 'min_radius':
                            this.min_radius = property.value;
                            break;
                        case 'shield_max_time':
                            this.shield_max_time = property.value;
                            break;
                        case 'texture_key':
                            this.texture_key = property.value;
                            break;
                        default:
                            break;
                    }
                    ++index;
                }
            }
            return;
        };
        CnfPowerShield.prototype.getID = function () {
            return _1942enums_5.DC_CONFIG.kHeroPowerShield;
        };
        CnfPowerShield.prototype.getConfigName = function () {
            return "HeroPowerShieldConfig";
        };
        return CnfPowerShield;
    }());
    exports.CnfPowerShield = CnfPowerShield;
});
define("game/src/ts_src/itemManager/IItemManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/itemManager/NullItemManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullItemManager = void 0;
    var NullItemManager = (function () {
        function NullItemManager() {
        }
        NullItemManager.prototype.init = function (_scene, _gameManager) {
            return;
        };
        NullItemManager.prototype.update = function (_dt) {
            return;
        };
        NullItemManager.prototype.spawn = function (_x, _y, _type, _data) {
            return;
        };
        NullItemManager.prototype.disableActor = function (_actor) {
            return;
        };
        NullItemManager.prototype.collisionVsSprite = function (_scene, _body) {
            return;
        };
        NullItemManager.prototype.clear = function () {
            return;
        };
        NullItemManager.prototype.destroy = function () {
            return;
        };
        return NullItemManager;
    }());
    exports.NullItemManager = NullItemManager;
});
define("game/src/ts_src/levelConfiguration/ILevelConfiguration", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/configObjects/cnfArponBullet", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfArponBullet = void 0;
    var CnfArponBullet = (function () {
        function CnfArponBullet() {
            this.collider_radius = 25.0;
            this.collider_offset = 25.0;
            this.collision_damage = 1.0;
            this.speed = 2000.0;
            this.texture_key = "arpon_bullet";
            return;
        }
        CnfArponBullet.prototype.setFromObject = function (_object) {
            if (_object.properties != undefined) {
                var aProperties = _object.properties;
                var index = 0;
                var property = void 0;
                while (index < aProperties.length) {
                    property = aProperties[index];
                    switch (property.name) {
                        case "speed":
                            this.speed = property.value;
                            break;
                        case "collider_offset":
                            this.collider_offset = property.value;
                            break;
                        case "collider_radius":
                            this.collider_radius = property.value;
                            break;
                        case "collision_damage":
                            this.collision_damage = property.value;
                            break;
                        case "texture_key":
                            this.texture_key = property.value;
                            break;
                        default:
                            break;
                    }
                    ++index;
                }
            }
            return;
        };
        CnfArponBullet.prototype.getID = function () {
            return _1942enums_6.DC_CONFIG.kArponBullet;
        };
        CnfArponBullet.prototype.getConfigName = function () {
            return 'ArponBulletConfig';
        };
        return CnfArponBullet;
    }());
    exports.CnfArponBullet = CnfArponBullet;
});
define("game/src/ts_src/configObjects/cnfArponBulletSpawner", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfArponBulletSpawner = void 0;
    var CnfArponBulletSpawner = (function () {
        function CnfArponBulletSpawner() {
            this.pool_size = 4;
            return;
        }
        CnfArponBulletSpawner.prototype.setFromObject = function (_object) {
            if (_object.properties != undefined) {
                var aProperties = _object.properties;
                var index = 0;
                var property = void 0;
                while (index < aProperties.length) {
                    property = aProperties[index];
                    switch (property.name) {
                        case "pool_size":
                            this.pool_size = property.value;
                            break;
                        default:
                            break;
                    }
                    ++index;
                }
            }
            return;
        };
        CnfArponBulletSpawner.prototype.getID = function () {
            return _1942enums_7.DC_CONFIG.kArponBulletSpawner;
        };
        CnfArponBulletSpawner.prototype.getConfigName = function () {
            return 'ArponBulletSpawnerConfig';
        };
        return CnfArponBulletSpawner;
    }());
    exports.CnfArponBulletSpawner = CnfArponBulletSpawner;
});
define("game/src/ts_src/configObjects/cnfArponShipSpawner", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfArponShipSpawner = void 0;
    var CnfArponShipSpawner = (function () {
        function CnfArponShipSpawner() {
            this.pool_size = 4;
            this.playZone_padding = 100;
            return;
        }
        CnfArponShipSpawner.prototype.setFromObject = function (_object) {
            if (_object.properties != undefined) {
                var aProperties = _object.properties;
                var index = 0;
                var property = void 0;
                while (index < aProperties.length) {
                    property = aProperties[index];
                    switch (property.name) {
                        case "pool_size":
                            this.pool_size = property.value;
                            break;
                        case "playZone_padding":
                            this.playZone_padding = property.value;
                            break;
                        default:
                            break;
                    }
                    ++index;
                }
            }
            return;
        };
        CnfArponShipSpawner.prototype.getID = function () {
            return _1942enums_8.DC_CONFIG.kArponShipSpawner;
        };
        CnfArponShipSpawner.prototype.getConfigName = function () {
            return 'ArponShipSpawnerConfig';
        };
        return CnfArponShipSpawner;
    }());
    exports.CnfArponShipSpawner = CnfArponShipSpawner;
});
define("game/src/ts_src/configObjects/cnfBulletStateNormal", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfBulletStateNormal = void 0;
    var CnfBulletStateNormal = (function () {
        function CnfBulletStateNormal() {
            this.frecuency = 8;
            this.secondsPerBullet = 1.0 / 8.0;
            return;
        }
        CnfBulletStateNormal.prototype.setFromObject = function (_object) {
            if (_object.properties != undefined) {
                var aProperties = _object.properties;
                var index = 0;
                var property = void 0;
                while (index < aProperties.length) {
                    property = aProperties[index];
                    switch (property.name) {
                        case "frecuency":
                            this.frecuency = property.value;
                            break;
                        default:
                            break;
                    }
                    ++index;
                }
            }
            return;
        };
        CnfBulletStateNormal.prototype.getID = function () {
            return _1942enums_9.DC_CONFIG.kHeroBulletStateNormal;
        };
        CnfBulletStateNormal.prototype.getConfigName = function () {
            return 'Hero_bulletStateNormal';
        };
        return CnfBulletStateNormal;
    }());
    exports.CnfBulletStateNormal = CnfBulletStateNormal;
});
define("game/src/ts_src/configObjects/cnfBulletStateTriple", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfBulletStateTriple = void 0;
    var CnfBulletStateTriple = (function () {
        function CnfBulletStateTriple() {
            this.frecuency = 8;
            this.secondsPerBullet = 1.0 / 8.0;
            this.opening = 30;
            return;
        }
        CnfBulletStateTriple.prototype.setFromObject = function (_object) {
            if (_object.properties != undefined) {
                var aProperties = _object.properties;
                var index = 0;
                var property = void 0;
                while (index < aProperties.length) {
                    property = aProperties[index];
                    switch (property.name) {
                        case "frecuency":
                            this.frecuency = property.value;
                            break;
                        case "opening":
                            this.opening = property.value;
                            break;
                        default:
                            break;
                    }
                    ++index;
                }
            }
            return;
        };
        CnfBulletStateTriple.prototype.getID = function () {
            return _1942enums_10.DC_CONFIG.kHeroBulletStateTriple;
        };
        CnfBulletStateTriple.prototype.getConfigName = function () {
            return 'Hero_bulletStateTripleShot';
        };
        return CnfBulletStateTriple;
    }());
    exports.CnfBulletStateTriple = CnfBulletStateTriple;
});
define("game/src/ts_src/configObjects/cnfCadmio", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfCadmio = void 0;
    var CnfCadmio = (function () {
        function CnfCadmio() {
            this.speed = 100.0;
            this.texture_key = "dragon_fruit";
            this.direction_x = 0.0;
            this.direction_y = 1.0;
            this.effect_id = _1942enums_11.DC_SECONDARY_ACTION.kUndefined;
            return;
        }
        CnfCadmio.prototype.setFromObject = function (_object) {
            if (_object.properties != undefined) {
                var aProperties = _object.properties;
                var index = 0;
                var property = void 0;
                while (index < aProperties.length) {
                    property = aProperties[index];
                    switch (property.name) {
                        case "speed":
                            this.speed = property.value;
                            break;
                        case "texture":
                            this.texture_key = property.value;
                            break;
                        case "direction_x":
                            this.direction_x = property.value;
                            break;
                        case "direction_y":
                            this.direction_y = property.value;
                            break;
                        case "action":
                            {
                                var value = property.value;
                                if (value === 'SHIELD') {
                                    this.effect_id = _1942enums_11.DC_SECONDARY_ACTION.kShield;
                                }
                                else if (value === 'TRIPLE_SHOT') {
                                    this.effect_id = _1942enums_11.DC_SECONDARY_ACTION.KTripleShot;
                                }
                            }
                            break;
                        default:
                            break;
                    }
                    ++index;
                }
            }
            return;
        };
        CnfCadmio.prototype.getID = function () {
            return _1942enums_11.DC_CONFIG.kCadmio;
        };
        CnfCadmio.prototype.getConfigName = function () {
            return "CadmioConfig";
        };
        return CnfCadmio;
    }());
    exports.CnfCadmio = CnfCadmio;
});
define("game/src/ts_src/configObjects/cnfCanus", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfCanus = void 0;
    var CnfCanus = (function () {
        function CnfCanus() {
            this.speed = 100.0;
            this.texture_key = "dragon_fruit";
            this.direction_x = 0.0;
            this.direction_y = 1.0;
            return;
        }
        CnfCanus.prototype.setFromObject = function (_object) {
            if (_object.properties != undefined) {
                var aProperties = _object.properties;
                var index = 0;
                var property = void 0;
                while (index < aProperties.length) {
                    property = aProperties[index];
                    switch (property.name) {
                        case "speed":
                            this.speed = property.value;
                            break;
                        case "texture":
                            this.texture_key = property.value;
                            break;
                        case "direction_x":
                            this.direction_x = property.value;
                            break;
                        case "direction_y":
                            this.direction_y = property.value;
                            break;
                        case "action":
                            {
                                var value = property.value;
                                if (value === 'SHIELD') {
                                    this.effect_id = _1942enums_12.DC_SECONDARY_ACTION.kShield;
                                }
                                else if (value === 'TRIPLE_SHOT') {
                                    this.effect_id = _1942enums_12.DC_SECONDARY_ACTION.KTripleShot;
                                }
                            }
                            break;
                        default:
                            break;
                    }
                    ++index;
                }
            }
            return;
        };
        CnfCanus.prototype.getID = function () {
            return _1942enums_12.DC_CONFIG.kCanus;
        };
        CnfCanus.prototype.getConfigName = function () {
            return "CanusConfig";
        };
        return CnfCanus;
    }());
    exports.CnfCanus = CnfCanus;
});
define("game/src/ts_src/configObjects/cnfEnemyBasicBullet", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfEnemyBasicBullet = void 0;
    var CnfEnemyBasicBullet = (function () {
        function CnfEnemyBasicBullet() {
            this.speed = 1200.0;
            this.collision_damage = 1;
            this.health = 1;
            this.texture_key = "fireball";
            return;
        }
        CnfEnemyBasicBullet.prototype.setFromObject = function (_object) {
            if (_object.properties != undefined) {
                var aProperties = _object.properties;
                var index = 0;
                var property = void 0;
                while (index < aProperties.length) {
                    property = aProperties[index];
                    switch (property.name) {
                        case "collision_damage":
                            this.collision_damage = property.value;
                            break;
                        case "health":
                            this.health = property.value;
                            break;
                        case "speed":
                            this.speed = property.value;
                            break;
                        case "texture_key":
                            this.texture_key = property.value;
                            break;
                        default:
                            break;
                    }
                    ++index;
                }
            }
            return;
        };
        CnfEnemyBasicBullet.prototype.getID = function () {
            return _1942enums_13.DC_CONFIG.kEnemyBasicBullet;
        };
        CnfEnemyBasicBullet.prototype.getConfigName = function () {
            return 'EnemyBasicBulletConfig';
        };
        return CnfEnemyBasicBullet;
    }());
    exports.CnfEnemyBasicBullet = CnfEnemyBasicBullet;
});
define("game/src/ts_src/configObjects/cnfErranteSpawner", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_14) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfErranteSpawner = void 0;
    var CnfErranteSpawner = (function () {
        function CnfErranteSpawner() {
            this.pool_size = 12;
            this.playZone_padding = 100;
            return;
        }
        CnfErranteSpawner.prototype.setFromObject = function (_object) {
            if (_object.properties != undefined) {
                var aProperties = _object.properties;
                var index = 0;
                var property = void 0;
                while (index < aProperties.length) {
                    property = aProperties[index];
                    switch (property.name) {
                        case "pool_size":
                            this.pool_size = property.value;
                            break;
                        case "playZone_padding":
                            this.playZone_padding = property.value;
                            break;
                        default:
                            break;
                    }
                    ++index;
                }
            }
            return;
        };
        CnfErranteSpawner.prototype.getID = function () {
            return _1942enums_14.DC_CONFIG.kErranteSpawner;
        };
        CnfErranteSpawner.prototype.getConfigName = function () {
            return 'ErranteSpawnerConfig';
        };
        return CnfErranteSpawner;
    }());
    exports.CnfErranteSpawner = CnfErranteSpawner;
});
define("game/src/ts_src/configObjects/cnfHeroBasicBullet", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfHeroBasicBullet = void 0;
    var CnfHeroBasicBullet = (function () {
        function CnfHeroBasicBullet() {
            this.collision_damage = 1.0;
            this.speed = 1200.0;
            this.texture_key = "fireball";
            return;
        }
        CnfHeroBasicBullet.prototype.setFromObject = function (_object) {
            if (_object.properties != undefined) {
                var aProperties = _object.properties;
                var index = 0;
                var property = void 0;
                while (index < aProperties.length) {
                    property = aProperties[index];
                    switch (property.name) {
                        case "speed":
                            this.speed = property.value;
                            break;
                        case "texture_key":
                            this.texture_key = property.value;
                            break;
                        case "collision_damage":
                            this.collision_damage = property.value;
                            break;
                        default:
                            break;
                    }
                    ++index;
                }
            }
            return;
        };
        CnfHeroBasicBullet.prototype.getID = function () {
            return _1942enums_15.DC_CONFIG.kHeroBasicBullet;
        };
        CnfHeroBasicBullet.prototype.getConfigName = function () {
            return "HeroBasicBulletConfig";
        };
        return CnfHeroBasicBullet;
    }());
    exports.CnfHeroBasicBullet = CnfHeroBasicBullet;
});
define("game/src/ts_src/configObjects/cnfHeroTripleShotBullet", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_16) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfHeroTripleShotBullet = void 0;
    var CnfHeroTripleShotBullet = (function () {
        function CnfHeroTripleShotBullet() {
            this.collision_damage = 1.0;
            this.speed = 1200.0;
            this.texture_key = "fireball";
            return;
        }
        CnfHeroTripleShotBullet.prototype.setFromObject = function (_object) {
            if (_object.properties != undefined) {
                var aProperties = _object.properties;
                var index = 0;
                var property = void 0;
                while (index < aProperties.length) {
                    property = aProperties[index];
                    switch (property.name) {
                        case "speed":
                            this.speed = property.value;
                            break;
                        case "texture_key":
                            this.texture_key = property.value;
                            break;
                        case "collision_damage":
                            this.collision_damage = property.value;
                            break;
                        default:
                            break;
                    }
                    ++index;
                }
            }
            return;
        };
        CnfHeroTripleShotBullet.prototype.getID = function () {
            return _1942enums_16.DC_CONFIG.kHeroTripleShotBullet;
        };
        CnfHeroTripleShotBullet.prototype.getConfigName = function () {
            return "HeroTripleShotBulletConfig";
        };
        return CnfHeroTripleShotBullet;
    }());
    exports.CnfHeroTripleShotBullet = CnfHeroTripleShotBullet;
});
define("game/src/ts_src/configObjects/cnfItemManager", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_17) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfItemManager = void 0;
    var CnfItemManager = (function () {
        function CnfItemManager() {
            this.pool_size = 3;
            this.playZone_extrude = 100.0;
            return;
        }
        CnfItemManager.prototype.setFromObject = function (_object) {
            return;
        };
        CnfItemManager.prototype.getID = function () {
            return _1942enums_17.DC_CONFIG.kItemManager;
        };
        CnfItemManager.prototype.getConfigName = function () {
            return "ItemManagerConfig";
        };
        return CnfItemManager;
    }());
    exports.CnfItemManager = CnfItemManager;
});
define("game/src/ts_src/configObjects/cnfRangerSpawnerConfig", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_18) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfRangerSpawner = void 0;
    var CnfRangerSpawner = (function () {
        function CnfRangerSpawner() {
            this.pool_size = 5;
            return;
        }
        CnfRangerSpawner.prototype.setFromObject = function (_object) {
            if (_object.properties != undefined) {
                var aProperties = _object.properties;
                var index = 0;
                var property = void 0;
                while (index < aProperties.length) {
                    property = aProperties[index];
                    switch (property.name) {
                        case "pool_size":
                            this.pool_size = property.value;
                            break;
                        default:
                            break;
                    }
                    ++index;
                }
            }
            return;
        };
        CnfRangerSpawner.prototype.getID = function () {
            return _1942enums_18.DC_CONFIG.kRangerSpawner;
        };
        CnfRangerSpawner.prototype.getConfigName = function () {
            return 'RangerSpawnerConfig';
        };
        return CnfRangerSpawner;
    }());
    exports.CnfRangerSpawner = CnfRangerSpawner;
});
define("game/src/ts_src/configObjects/cnfScoreManager", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_19) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfScoreManager = void 0;
    var CnfScoreManager = (function () {
        function CnfScoreManager() {
            this.kill_for_add = 1;
            this.init_score = 0;
            this.range_A_min = 95;
            this.range_A_mult = 4;
            this.range_B_min = 75;
            this.range_B_mult = 3;
            this.range_C_min = 50;
            this.range_C_mult = 2;
            this.stars_AAA_min = 1000;
            this.stars_AA_min = 500;
            this.stars_A_min = 100;
            return;
        }
        CnfScoreManager.prototype.setFromObject = function (_object) {
            if (_object.properties != undefined) {
                var aProperties = _object.properties;
                var index = 0;
                var property = void 0;
                while (index < aProperties.length) {
                    property = aProperties[index];
                    switch (property.name) {
                        case 'kills_for_add':
                            this.kill_for_add = property.value;
                            break;
                        case 'range_A_min':
                            this.range_A_min = property.value;
                            break;
                        case 'range_A_mult':
                            this.range_A_mult = property.value;
                            break;
                        case 'range_B_min':
                            this.range_B_min = property.value;
                            break;
                        case 'range_B_mult':
                            this.range_B_mult = property.value;
                            break;
                        case 'range_C_min':
                            this.range_C_min = property.value;
                            break;
                        case 'range_C_mult':
                            this.range_C_mult = property.value;
                            break;
                        default:
                            break;
                    }
                    ++index;
                }
            }
            return;
        };
        CnfScoreManager.prototype.getID = function () {
            return _1942enums_19.DC_CONFIG.kScoreManager;
        };
        CnfScoreManager.prototype.getConfigName = function () {
            return 'ScoreManagerConfig';
        };
        return CnfScoreManager;
    }());
    exports.CnfScoreManager = CnfScoreManager;
});
define("game/src/ts_src/configObjects/cnfSonicSpawner", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_20) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfSonicSpawner = void 0;
    var CnfSonicSpawner = (function () {
        function CnfSonicSpawner() {
            this.pool_size = 2;
            this.playZone_padding = 100;
            return;
        }
        CnfSonicSpawner.prototype.setFromObject = function (_object) {
            if (_object.properties != undefined) {
                var aProperties = _object.properties;
                var index = 0;
                var property = void 0;
                while (index < aProperties.length) {
                    property = aProperties[index];
                    switch (property.name) {
                        case "pool_size":
                            this.pool_size = property.value;
                            break;
                        case "playZone_padding":
                            this.playZone_padding = property.value;
                            break;
                        default:
                            break;
                    }
                    ++index;
                }
            }
            return;
        };
        CnfSonicSpawner.prototype.getID = function () {
            return _1942enums_20.DC_CONFIG.kSonicSpawner;
        };
        CnfSonicSpawner.prototype.getConfigName = function () {
            return 'SonicSpawnerConfig';
        };
        return CnfSonicSpawner;
    }());
    exports.CnfSonicSpawner = CnfSonicSpawner;
});
define("game/src/ts_src/levelConfiguration/LevelConfiguration", ["require", "exports", "game/src/ts_src/configObjects/cnfArponBullet", "game/src/ts_src/configObjects/cnfArponBulletSpawner", "game/src/ts_src/configObjects/cnfArponShipSpawner", "game/src/ts_src/configObjects/cnfBulletStateNormal", "game/src/ts_src/configObjects/cnfBulletStateTriple", "game/src/ts_src/configObjects/cnfCadmio", "game/src/ts_src/configObjects/cnfCanus", "game/src/ts_src/configObjects/cnfEnemyBasicBullet", "game/src/ts_src/configObjects/cnfErranteSpawner", "game/src/ts_src/configObjects/cnfHeroBasicBullet", "game/src/ts_src/configObjects/cnfHeroTripleShotBullet", "game/src/ts_src/configObjects/cnfItemManager", "game/src/ts_src/configObjects/cnfPowerShield", "game/src/ts_src/configObjects/cnfRangerSpawnerConfig", "game/src/ts_src/configObjects/cnfScoreManager", "game/src/ts_src/configObjects/cnfSonicSpawner"], function (require, exports, cnfArponBullet_1, cnfArponBulletSpawner_1, cnfArponShipSpawner_1, cnfBulletStateNormal_1, cnfBulletStateTriple_1, cnfCadmio_1, cnfCanus_1, cnfEnemyBasicBullet_1, cnfErranteSpawner_1, cnfHeroBasicBullet_1, cnfHeroTripleShotBullet_1, cnfItemManager_1, cnfPowerShield_1, cnfRangerSpawnerConfig_1, cnfScoreManager_1, cnfSonicSpawner_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LevelConfiguration = void 0;
    var LevelConfiguration = (function () {
        function LevelConfiguration() {
            this._m_hConfig = new Map();
            return;
        }
        LevelConfiguration.prototype.init = function (_scene, _gameManager) {
            this.addConfig(new cnfCanus_1.CnfCanus());
            this.addConfig(new cnfCadmio_1.CnfCadmio());
            this.addConfig(new cnfItemManager_1.CnfItemManager());
            this.addConfig(new cnfBulletStateNormal_1.CnfBulletStateNormal());
            this.addConfig(new cnfBulletStateTriple_1.CnfBulletStateTriple());
            this.addConfig(new cnfHeroBasicBullet_1.CnfHeroBasicBullet());
            this.addConfig(new cnfHeroTripleShotBullet_1.CnfHeroTripleShotBullet());
            this.addConfig(new cnfPowerShield_1.CnfPowerShield());
            this.addConfig(new cnfRangerSpawnerConfig_1.CnfRangerSpawner());
            this.addConfig(new cnfSonicSpawner_1.CnfSonicSpawner());
            this.addConfig(new cnfArponShipSpawner_1.CnfArponShipSpawner());
            this.addConfig(new cnfArponBullet_1.CnfArponBullet());
            this.addConfig(new cnfArponBulletSpawner_1.CnfArponBulletSpawner());
            this.addConfig(new cnfErranteSpawner_1.CnfErranteSpawner());
            this.addConfig(new cnfEnemyBasicBullet_1.CnfEnemyBasicBullet());
            this.addConfig(new cnfScoreManager_1.CnfScoreManager());
            return;
        };
        LevelConfiguration.prototype.setFromMap = function (_map, _layerName) {
            var objectLayer = _map.getObjectLayer(_layerName);
            if (objectLayer == null) {
                console.warn("LevelConfiguartion : Layer don't found : " + _layerName);
                return;
            }
            var hConfig = this._getConfigMapByName();
            var configObject;
            var aElements = objectLayer.objects;
            var elementSize = aElements.length;
            var element;
            var index = 0;
            while (index < elementSize) {
                element = aElements[index];
                if (element.type !== undefined && element.type !== '') {
                    if (hConfig.has(element.type)) {
                        configObject = hConfig.get(element.type);
                        configObject.setFromObject(element);
                    }
                    else {
                        console.log("LevelConfiguration doesn't has a configuration object of"
                            + " type : " + element.type);
                    }
                }
                ++index;
            }
            hConfig.clear();
            hConfig = null;
            return;
        };
        LevelConfiguration.prototype.addConfig = function (_config) {
            this._m_hConfig.set(_config.getID(), _config);
            return;
        };
        LevelConfiguration.prototype.getConfig = function (_id) {
            var hConfig = this._m_hConfig;
            if (hConfig.has(_id)) {
                return hConfig.get(_id);
            }
            return null;
        };
        LevelConfiguration.prototype.clear = function () {
            this._m_hConfig.clear();
            return;
        };
        LevelConfiguration.prototype.destroy = function () {
            this.clear();
            this._m_hConfig = null;
            return;
        };
        LevelConfiguration.prototype._getConfigMapByName = function () {
            var hConfigName = new Map();
            this._m_hConfig.forEach(function (_config) {
                hConfigName.set(_config.getConfigName(), _config);
            });
            return hConfigName;
        };
        return LevelConfiguration;
    }());
    exports.LevelConfiguration = LevelConfiguration;
});
define("game/src/ts_src/levelGenerator/ambienceGenerator/customTextureShader", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CustomTextureShader = void 0;
    var CustomTextureShader = (function (_super) {
        __extends(CustomTextureShader, _super);
        function CustomTextureShader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CustomTextureShader.prototype.prepare = function (_a_pixels, _type, _width, _height, _texture_id) {
            var gl = this.gl;
            this._m_a_pixels = _a_pixels;
            this._m_width = _width;
            this._m_height = _height;
            this._m_textureID = _texture_id;
            this._m_texture = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0 + _texture_id);
            gl.bindTexture(gl.TEXTURE_2D, this._m_texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, _type, _width, _height, 0, _type, gl.UNSIGNED_BYTE, this._m_a_pixels);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            var renderer = this.renderer;
            renderer.setProgram(this.program);
            this._m_uniformLocation
                = this.gl.getUniformLocation(this.program, 'iChannel' + _texture_id);
            gl.uniform1i(this._m_uniformLocation, _texture_id);
            return;
        };
        CustomTextureShader.prototype.syncUniforms = function () {
            var gl = this.gl;
            var uniforms = this.uniforms;
            var uniform;
            var length;
            var glFunc;
            var location;
            var value;
            var textureCount = 0;
            for (var key in uniforms) {
                uniform = uniforms[key];
                glFunc = uniform.glFunc;
                length = uniform.glValueLength;
                location = uniform.uniformLocation;
                value = uniform.value;
                if (value === null) {
                    continue;
                }
                if (length === 1) {
                    if (uniform.glMatrix) {
                        glFunc.call(gl, location, uniform.transpose, value);
                    }
                    else {
                        glFunc.call(gl, location, value);
                    }
                }
                else if (length === 2) {
                    glFunc.call(gl, location, value.x, value.y);
                }
                else if (length === 3) {
                    glFunc.call(gl, location, value.x, value.y, value.z);
                }
                else if (length === 4) {
                    glFunc.call(gl, location, value.x, value.y, value.z, value.w);
                }
                else if (uniform.type === 'sampler2D') {
                    gl.activeTexture(gl['TEXTURE' + textureCount]);
                    gl.bindTexture(gl.TEXTURE_2D, value);
                    gl.uniform1i(location, textureCount);
                    textureCount++;
                }
            }
            gl.activeTexture(gl.TEXTURE0 + this._m_textureID);
            gl.bindTexture(gl.TEXTURE_2D, this._m_texture);
            gl.uniform1i(this._m_uniformLocation, this._m_textureID);
            return;
        };
        CustomTextureShader.prototype.getCustomTextureWidth = function () {
            return this._m_width;
        };
        CustomTextureShader.prototype.getCustomTextureHeight = function () {
            return this._m_height;
        };
        CustomTextureShader.prototype.preDestroy = function () {
            this.gl.deleteTexture(this._m_texture);
            this._m_a_pixels = null;
            _super.prototype.preDestroy.call(this);
            return;
        };
        return CustomTextureShader;
    }(Phaser.GameObjects.Shader));
    exports.CustomTextureShader = CustomTextureShader;
});
define("game/src/ts_src/perlinNoise/constants", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.p4D = exports.p3D = exports.p2D = exports.lookupPairs4D = exports.lookupPairs3D = exports.lookupPairs2D = exports.gradients4D = exports.gradients3D = exports.gradients2D = exports.base4D = exports.base3D = exports.base2D = exports.STRETCH_4D = exports.STRETCH_3D = exports.STRETCH_2D = exports.SQUISH_4D = exports.SQUISH_3D = exports.SQUISH_2D = exports.NORM_4D = exports.NORM_3D = exports.NORM_2D = void 0;
    exports.NORM_2D = 1.0 / 47.0;
    exports.NORM_3D = 1.0 / 103.0;
    exports.NORM_4D = 1.0 / 30.0;
    exports.SQUISH_2D = (Math.sqrt(2 + 1) - 1) / 2;
    exports.SQUISH_3D = (Math.sqrt(3 + 1) - 1) / 3;
    exports.SQUISH_4D = (Math.sqrt(4 + 1) - 1) / 4;
    exports.STRETCH_2D = (1 / Math.sqrt(2 + 1) - 1) / 2;
    exports.STRETCH_3D = (1 / Math.sqrt(3 + 1) - 1) / 3;
    exports.STRETCH_4D = (1 / Math.sqrt(4 + 1) - 1) / 4;
    exports.base2D = [
        [1, 1, 0, 1, 0, 1, 0, 0, 0],
        [1, 1, 0, 1, 0, 1, 2, 1, 1]
    ];
    exports.base3D = [
        [0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
        [2, 1, 1, 0, 2, 1, 0, 1, 2, 0, 1, 1, 3, 1, 1, 1],
        [1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 2, 1, 1, 0, 2, 1, 0, 1, 2, 0, 1, 1]
    ];
    exports.base4D = [
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
        [3, 1, 1, 1, 0, 3, 1, 1, 0, 1, 3, 1, 0, 1, 1, 3, 0, 1, 1, 1, 4, 1, 1, 1, 1],
        [
            1,
            1,
            0,
            0,
            0,
            1,
            0,
            1,
            0,
            0,
            1,
            0,
            0,
            1,
            0,
            1,
            0,
            0,
            0,
            1,
            2,
            1,
            1,
            0,
            0,
            2,
            1,
            0,
            1,
            0,
            2,
            1,
            0,
            0,
            1,
            2,
            0,
            1,
            1,
            0,
            2,
            0,
            1,
            0,
            1,
            2,
            0,
            0,
            1,
            1
        ],
        [
            3,
            1,
            1,
            1,
            0,
            3,
            1,
            1,
            0,
            1,
            3,
            1,
            0,
            1,
            1,
            3,
            0,
            1,
            1,
            1,
            2,
            1,
            1,
            0,
            0,
            2,
            1,
            0,
            1,
            0,
            2,
            1,
            0,
            0,
            1,
            2,
            0,
            1,
            1,
            0,
            2,
            0,
            1,
            0,
            1,
            2,
            0,
            0,
            1,
            1
        ]
    ];
    exports.gradients2D = [
        5,
        2,
        2,
        5,
        -5,
        2,
        -2,
        5,
        5,
        -2,
        2,
        -5,
        -5,
        -2,
        -2,
        -5
    ];
    exports.gradients3D = [
        -11,
        4,
        4,
        -4,
        11,
        4,
        -4,
        4,
        11,
        11,
        4,
        4,
        4,
        11,
        4,
        4,
        4,
        11,
        -11,
        -4,
        4,
        -4,
        -11,
        4,
        -4,
        -4,
        11,
        11,
        -4,
        4,
        4,
        -11,
        4,
        4,
        -4,
        11,
        -11,
        4,
        -4,
        -4,
        11,
        -4,
        -4,
        4,
        -11,
        11,
        4,
        -4,
        4,
        11,
        -4,
        4,
        4,
        -11,
        -11,
        -4,
        -4,
        -4,
        -11,
        -4,
        -4,
        -4,
        -11,
        11,
        -4,
        -4,
        4,
        -11,
        -4,
        4,
        -4,
        -11
    ];
    exports.gradients4D = [
        3,
        1,
        1,
        1,
        1,
        3,
        1,
        1,
        1,
        1,
        3,
        1,
        1,
        1,
        1,
        3,
        -3,
        1,
        1,
        1,
        -1,
        3,
        1,
        1,
        -1,
        1,
        3,
        1,
        -1,
        1,
        1,
        3,
        3,
        -1,
        1,
        1,
        1,
        -3,
        1,
        1,
        1,
        -1,
        3,
        1,
        1,
        -1,
        1,
        3,
        -3,
        -1,
        1,
        1,
        -1,
        -3,
        1,
        1,
        -1,
        -1,
        3,
        1,
        -1,
        -1,
        1,
        3,
        3,
        1,
        -1,
        1,
        1,
        3,
        -1,
        1,
        1,
        1,
        -3,
        1,
        1,
        1,
        -1,
        3,
        -3,
        1,
        -1,
        1,
        -1,
        3,
        -1,
        1,
        -1,
        1,
        -3,
        1,
        -1,
        1,
        -1,
        3,
        3,
        -1,
        -1,
        1,
        1,
        -3,
        -1,
        1,
        1,
        -1,
        -3,
        1,
        1,
        -1,
        -1,
        3,
        -3,
        -1,
        -1,
        1,
        -1,
        -3,
        -1,
        1,
        -1,
        -1,
        -3,
        1,
        -1,
        -1,
        -1,
        3,
        3,
        1,
        1,
        -1,
        1,
        3,
        1,
        -1,
        1,
        1,
        3,
        -1,
        1,
        1,
        1,
        -3,
        -3,
        1,
        1,
        -1,
        -1,
        3,
        1,
        -1,
        -1,
        1,
        3,
        -1,
        -1,
        1,
        1,
        -3,
        3,
        -1,
        1,
        -1,
        1,
        -3,
        1,
        -1,
        1,
        -1,
        3,
        -1,
        1,
        -1,
        1,
        -3,
        -3,
        -1,
        1,
        -1,
        -1,
        -3,
        1,
        -1,
        -1,
        -1,
        3,
        -1,
        -1,
        -1,
        1,
        -3,
        3,
        1,
        -1,
        -1,
        1,
        3,
        -1,
        -1,
        1,
        1,
        -3,
        -1,
        1,
        1,
        -1,
        -3,
        -3,
        1,
        -1,
        -1,
        -1,
        3,
        -1,
        -1,
        -1,
        1,
        -3,
        -1,
        -1,
        1,
        -1,
        -3,
        3,
        -1,
        -1,
        -1,
        1,
        -3,
        -1,
        -1,
        1,
        -1,
        -3,
        -1,
        1,
        -1,
        -1,
        -3,
        -3,
        -1,
        -1,
        -1,
        -1,
        -3,
        -1,
        -1,
        -1,
        -1,
        -3,
        -1,
        -1,
        -1,
        -1,
        -3
    ];
    exports.lookupPairs2D = [
        0,
        1,
        1,
        0,
        4,
        1,
        17,
        0,
        20,
        2,
        21,
        2,
        22,
        5,
        23,
        5,
        26,
        4,
        39,
        3,
        42,
        4,
        43,
        3
    ];
    exports.lookupPairs3D = [
        0,
        2,
        1,
        1,
        2,
        2,
        5,
        1,
        6,
        0,
        7,
        0,
        32,
        2,
        34,
        2,
        129,
        1,
        133,
        1,
        160,
        5,
        161,
        5,
        518,
        0,
        519,
        0,
        546,
        4,
        550,
        4,
        645,
        3,
        647,
        3,
        672,
        5,
        673,
        5,
        674,
        4,
        677,
        3,
        678,
        4,
        679,
        3,
        680,
        13,
        681,
        13,
        682,
        12,
        685,
        14,
        686,
        12,
        687,
        14,
        712,
        20,
        714,
        18,
        809,
        21,
        813,
        23,
        840,
        20,
        841,
        21,
        1198,
        19,
        1199,
        22,
        1226,
        18,
        1230,
        19,
        1325,
        23,
        1327,
        22,
        1352,
        15,
        1353,
        17,
        1354,
        15,
        1357,
        17,
        1358,
        16,
        1359,
        16,
        1360,
        11,
        1361,
        10,
        1362,
        11,
        1365,
        10,
        1366,
        9,
        1367,
        9,
        1392,
        11,
        1394,
        11,
        1489,
        10,
        1493,
        10,
        1520,
        8,
        1521,
        8,
        1878,
        9,
        1879,
        9,
        1906,
        7,
        1910,
        7,
        2005,
        6,
        2007,
        6,
        2032,
        8,
        2033,
        8,
        2034,
        7,
        2037,
        6,
        2038,
        7,
        2039,
        6
    ];
    exports.lookupPairs4D = [
        0,
        3,
        1,
        2,
        2,
        3,
        5,
        2,
        6,
        1,
        7,
        1,
        8,
        3,
        9,
        2,
        10,
        3,
        13,
        2,
        16,
        3,
        18,
        3,
        22,
        1,
        23,
        1,
        24,
        3,
        26,
        3,
        33,
        2,
        37,
        2,
        38,
        1,
        39,
        1,
        41,
        2,
        45,
        2,
        54,
        1,
        55,
        1,
        56,
        0,
        57,
        0,
        58,
        0,
        59,
        0,
        60,
        0,
        61,
        0,
        62,
        0,
        63,
        0,
        256,
        3,
        258,
        3,
        264,
        3,
        266,
        3,
        272,
        3,
        274,
        3,
        280,
        3,
        282,
        3,
        2049,
        2,
        2053,
        2,
        2057,
        2,
        2061,
        2,
        2081,
        2,
        2085,
        2,
        2089,
        2,
        2093,
        2,
        2304,
        9,
        2305,
        9,
        2312,
        9,
        2313,
        9,
        16390,
        1,
        16391,
        1,
        16406,
        1,
        16407,
        1,
        16422,
        1,
        16423,
        1,
        16438,
        1,
        16439,
        1,
        16642,
        8,
        16646,
        8,
        16658,
        8,
        16662,
        8,
        18437,
        6,
        18439,
        6,
        18469,
        6,
        18471,
        6,
        18688,
        9,
        18689,
        9,
        18690,
        8,
        18693,
        6,
        18694,
        8,
        18695,
        6,
        18696,
        9,
        18697,
        9,
        18706,
        8,
        18710,
        8,
        18725,
        6,
        18727,
        6,
        131128,
        0,
        131129,
        0,
        131130,
        0,
        131131,
        0,
        131132,
        0,
        131133,
        0,
        131134,
        0,
        131135,
        0,
        131352,
        7,
        131354,
        7,
        131384,
        7,
        131386,
        7,
        133161,
        5,
        133165,
        5,
        133177,
        5,
        133181,
        5,
        133376,
        9,
        133377,
        9,
        133384,
        9,
        133385,
        9,
        133400,
        7,
        133402,
        7,
        133417,
        5,
        133421,
        5,
        133432,
        7,
        133433,
        5,
        133434,
        7,
        133437,
        5,
        147510,
        4,
        147511,
        4,
        147518,
        4,
        147519,
        4,
        147714,
        8,
        147718,
        8,
        147730,
        8,
        147734,
        8,
        147736,
        7,
        147738,
        7,
        147766,
        4,
        147767,
        4,
        147768,
        7,
        147770,
        7,
        147774,
        4,
        147775,
        4,
        149509,
        6,
        149511,
        6,
        149541,
        6,
        149543,
        6,
        149545,
        5,
        149549,
        5,
        149558,
        4,
        149559,
        4,
        149561,
        5,
        149565,
        5,
        149566,
        4,
        149567,
        4,
        149760,
        9,
        149761,
        9,
        149762,
        8,
        149765,
        6,
        149766,
        8,
        149767,
        6,
        149768,
        9,
        149769,
        9,
        149778,
        8,
        149782,
        8,
        149784,
        7,
        149786,
        7,
        149797,
        6,
        149799,
        6,
        149801,
        5,
        149805,
        5,
        149814,
        4,
        149815,
        4,
        149816,
        7,
        149817,
        5,
        149818,
        7,
        149821,
        5,
        149822,
        4,
        149823,
        4,
        149824,
        37,
        149825,
        37,
        149826,
        36,
        149829,
        34,
        149830,
        36,
        149831,
        34,
        149832,
        37,
        149833,
        37,
        149842,
        36,
        149846,
        36,
        149848,
        35,
        149850,
        35,
        149861,
        34,
        149863,
        34,
        149865,
        33,
        149869,
        33,
        149878,
        32,
        149879,
        32,
        149880,
        35,
        149881,
        33,
        149882,
        35,
        149885,
        33,
        149886,
        32,
        149887,
        32,
        150080,
        49,
        150082,
        48,
        150088,
        49,
        150098,
        48,
        150104,
        47,
        150106,
        47,
        151873,
        46,
        151877,
        45,
        151881,
        46,
        151909,
        45,
        151913,
        44,
        151917,
        44,
        152128,
        49,
        152129,
        46,
        152136,
        49,
        152137,
        46,
        166214,
        43,
        166215,
        42,
        166230,
        43,
        166247,
        42,
        166262,
        41,
        166263,
        41,
        166466,
        48,
        166470,
        43,
        166482,
        48,
        166486,
        43,
        168261,
        45,
        168263,
        42,
        168293,
        45,
        168295,
        42,
        168512,
        31,
        168513,
        28,
        168514,
        31,
        168517,
        28,
        168518,
        25,
        168519,
        25,
        280952,
        40,
        280953,
        39,
        280954,
        40,
        280957,
        39,
        280958,
        38,
        280959,
        38,
        281176,
        47,
        281178,
        47,
        281208,
        40,
        281210,
        40,
        282985,
        44,
        282989,
        44,
        283001,
        39,
        283005,
        39,
        283208,
        30,
        283209,
        27,
        283224,
        30,
        283241,
        27,
        283256,
        22,
        283257,
        22,
        297334,
        41,
        297335,
        41,
        297342,
        38,
        297343,
        38,
        297554,
        29,
        297558,
        24,
        297562,
        29,
        297590,
        24,
        297594,
        21,
        297598,
        21,
        299365,
        26,
        299367,
        23,
        299373,
        26,
        299383,
        23,
        299389,
        20,
        299391,
        20,
        299584,
        31,
        299585,
        28,
        299586,
        31,
        299589,
        28,
        299590,
        25,
        299591,
        25,
        299592,
        30,
        299593,
        27,
        299602,
        29,
        299606,
        24,
        299608,
        30,
        299610,
        29,
        299621,
        26,
        299623,
        23,
        299625,
        27,
        299629,
        26,
        299638,
        24,
        299639,
        23,
        299640,
        22,
        299641,
        22,
        299642,
        21,
        299645,
        20,
        299646,
        21,
        299647,
        20,
        299648,
        61,
        299649,
        60,
        299650,
        61,
        299653,
        60,
        299654,
        59,
        299655,
        59,
        299656,
        58,
        299657,
        57,
        299666,
        55,
        299670,
        54,
        299672,
        58,
        299674,
        55,
        299685,
        52,
        299687,
        51,
        299689,
        57,
        299693,
        52,
        299702,
        54,
        299703,
        51,
        299704,
        56,
        299705,
        56,
        299706,
        53,
        299709,
        50,
        299710,
        53,
        299711,
        50,
        299904,
        61,
        299906,
        61,
        299912,
        58,
        299922,
        55,
        299928,
        58,
        299930,
        55,
        301697,
        60,
        301701,
        60,
        301705,
        57,
        301733,
        52,
        301737,
        57,
        301741,
        52,
        301952,
        79,
        301953,
        79,
        301960,
        76,
        301961,
        76,
        316038,
        59,
        316039,
        59,
        316054,
        54,
        316071,
        51,
        316086,
        54,
        316087,
        51,
        316290,
        78,
        316294,
        78,
        316306,
        73,
        316310,
        73,
        318085,
        77,
        318087,
        77,
        318117,
        70,
        318119,
        70,
        318336,
        79,
        318337,
        79,
        318338,
        78,
        318341,
        77,
        318342,
        78,
        318343,
        77,
        430776,
        56,
        430777,
        56,
        430778,
        53,
        430781,
        50,
        430782,
        53,
        430783,
        50,
        431000,
        75,
        431002,
        72,
        431032,
        75,
        431034,
        72,
        432809,
        74,
        432813,
        69,
        432825,
        74,
        432829,
        69,
        433032,
        76,
        433033,
        76,
        433048,
        75,
        433065,
        74,
        433080,
        75,
        433081,
        74,
        447158,
        71,
        447159,
        68,
        447166,
        71,
        447167,
        68,
        447378,
        73,
        447382,
        73,
        447386,
        72,
        447414,
        71,
        447418,
        72,
        447422,
        71,
        449189,
        70,
        449191,
        70,
        449197,
        69,
        449207,
        68,
        449213,
        69,
        449215,
        68,
        449408,
        67,
        449409,
        67,
        449410,
        66,
        449413,
        64,
        449414,
        66,
        449415,
        64,
        449416,
        67,
        449417,
        67,
        449426,
        66,
        449430,
        66,
        449432,
        65,
        449434,
        65,
        449445,
        64,
        449447,
        64,
        449449,
        63,
        449453,
        63,
        449462,
        62,
        449463,
        62,
        449464,
        65,
        449465,
        63,
        449466,
        65,
        449469,
        63,
        449470,
        62,
        449471,
        62,
        449472,
        19,
        449473,
        19,
        449474,
        18,
        449477,
        16,
        449478,
        18,
        449479,
        16,
        449480,
        19,
        449481,
        19,
        449490,
        18,
        449494,
        18,
        449496,
        17,
        449498,
        17,
        449509,
        16,
        449511,
        16,
        449513,
        15,
        449517,
        15,
        449526,
        14,
        449527,
        14,
        449528,
        17,
        449529,
        15,
        449530,
        17,
        449533,
        15,
        449534,
        14,
        449535,
        14,
        449728,
        19,
        449729,
        19,
        449730,
        18,
        449734,
        18,
        449736,
        19,
        449737,
        19,
        449746,
        18,
        449750,
        18,
        449752,
        17,
        449754,
        17,
        449784,
        17,
        449786,
        17,
        451520,
        19,
        451521,
        19,
        451525,
        16,
        451527,
        16,
        451528,
        19,
        451529,
        19,
        451557,
        16,
        451559,
        16,
        451561,
        15,
        451565,
        15,
        451577,
        15,
        451581,
        15,
        451776,
        19,
        451777,
        19,
        451784,
        19,
        451785,
        19,
        465858,
        18,
        465861,
        16,
        465862,
        18,
        465863,
        16,
        465874,
        18,
        465878,
        18,
        465893,
        16,
        465895,
        16,
        465910,
        14,
        465911,
        14,
        465918,
        14,
        465919,
        14,
        466114,
        18,
        466118,
        18,
        466130,
        18,
        466134,
        18,
        467909,
        16,
        467911,
        16,
        467941,
        16,
        467943,
        16,
        468160,
        13,
        468161,
        13,
        468162,
        13,
        468163,
        13,
        468164,
        13,
        468165,
        13,
        468166,
        13,
        468167,
        13,
        580568,
        17,
        580570,
        17,
        580585,
        15,
        580589,
        15,
        580598,
        14,
        580599,
        14,
        580600,
        17,
        580601,
        15,
        580602,
        17,
        580605,
        15,
        580606,
        14,
        580607,
        14,
        580824,
        17,
        580826,
        17,
        580856,
        17,
        580858,
        17,
        582633,
        15,
        582637,
        15,
        582649,
        15,
        582653,
        15,
        582856,
        12,
        582857,
        12,
        582872,
        12,
        582873,
        12,
        582888,
        12,
        582889,
        12,
        582904,
        12,
        582905,
        12,
        596982,
        14,
        596983,
        14,
        596990,
        14,
        596991,
        14,
        597202,
        11,
        597206,
        11,
        597210,
        11,
        597214,
        11,
        597234,
        11,
        597238,
        11,
        597242,
        11,
        597246,
        11,
        599013,
        10,
        599015,
        10,
        599021,
        10,
        599023,
        10,
        599029,
        10,
        599031,
        10,
        599037,
        10,
        599039,
        10,
        599232,
        13,
        599233,
        13,
        599234,
        13,
        599235,
        13,
        599236,
        13,
        599237,
        13,
        599238,
        13,
        599239,
        13,
        599240,
        12,
        599241,
        12,
        599250,
        11,
        599254,
        11,
        599256,
        12,
        599257,
        12,
        599258,
        11,
        599262,
        11,
        599269,
        10,
        599271,
        10,
        599272,
        12,
        599273,
        12,
        599277,
        10,
        599279,
        10,
        599282,
        11,
        599285,
        10,
        599286,
        11,
        599287,
        10,
        599288,
        12,
        599289,
        12,
        599290,
        11,
        599293,
        10,
        599294,
        11,
        599295,
        10
    ];
    exports.p2D = [
        0,
        0,
        1,
        -1,
        0,
        0,
        -1,
        1,
        0,
        2,
        1,
        1,
        1,
        2,
        2,
        0,
        1,
        2,
        0,
        2,
        1,
        0,
        0,
        0
    ];
    exports.p3D = [
        0,
        0,
        1,
        -1,
        0,
        0,
        1,
        0,
        -1,
        0,
        0,
        -1,
        1,
        0,
        0,
        0,
        1,
        -1,
        0,
        0,
        -1,
        0,
        1,
        0,
        0,
        -1,
        1,
        0,
        2,
        1,
        1,
        0,
        1,
        1,
        1,
        -1,
        0,
        2,
        1,
        0,
        1,
        1,
        1,
        -1,
        1,
        0,
        2,
        0,
        1,
        1,
        1,
        -1,
        1,
        1,
        1,
        3,
        2,
        1,
        0,
        3,
        1,
        2,
        0,
        1,
        3,
        2,
        0,
        1,
        3,
        1,
        0,
        2,
        1,
        3,
        0,
        2,
        1,
        3,
        0,
        1,
        2,
        1,
        1,
        1,
        0,
        0,
        2,
        2,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        2,
        0,
        2,
        0,
        1,
        1,
        0,
        0,
        1,
        2,
        0,
        0,
        2,
        2,
        0,
        0,
        0,
        0,
        1,
        1,
        -1,
        1,
        2,
        0,
        0,
        0,
        0,
        1,
        -1,
        1,
        1,
        2,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        -1,
        2,
        3,
        1,
        1,
        1,
        2,
        0,
        0,
        2,
        2,
        3,
        1,
        1,
        1,
        2,
        2,
        0,
        0,
        2,
        3,
        1,
        1,
        1,
        2,
        0,
        2,
        0,
        2,
        1,
        1,
        -1,
        1,
        2,
        0,
        0,
        2,
        2,
        1,
        1,
        -1,
        1,
        2,
        2,
        0,
        0,
        2,
        1,
        -1,
        1,
        1,
        2,
        0,
        0,
        2,
        2,
        1,
        -1,
        1,
        1,
        2,
        0,
        2,
        0,
        2,
        1,
        1,
        1,
        -1,
        2,
        2,
        0,
        0,
        2,
        1,
        1,
        1,
        -1,
        2,
        0,
        2,
        0
    ];
    exports.p4D = [
        0,
        0,
        1,
        -1,
        0,
        0,
        0,
        1,
        0,
        -1,
        0,
        0,
        1,
        0,
        0,
        -1,
        0,
        0,
        -1,
        1,
        0,
        0,
        0,
        0,
        1,
        -1,
        0,
        0,
        0,
        1,
        0,
        -1,
        0,
        0,
        -1,
        0,
        1,
        0,
        0,
        0,
        -1,
        1,
        0,
        0,
        0,
        0,
        1,
        -1,
        0,
        0,
        -1,
        0,
        0,
        1,
        0,
        0,
        -1,
        0,
        1,
        0,
        0,
        0,
        -1,
        1,
        0,
        2,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        -1,
        0,
        1,
        1,
        1,
        0,
        -1,
        0,
        2,
        1,
        0,
        1,
        0,
        1,
        1,
        -1,
        1,
        0,
        1,
        1,
        0,
        1,
        -1,
        0,
        2,
        0,
        1,
        1,
        0,
        1,
        -1,
        1,
        1,
        0,
        1,
        0,
        1,
        1,
        -1,
        0,
        2,
        1,
        0,
        0,
        1,
        1,
        1,
        -1,
        0,
        1,
        1,
        1,
        0,
        -1,
        1,
        0,
        2,
        0,
        1,
        0,
        1,
        1,
        -1,
        1,
        0,
        1,
        1,
        0,
        1,
        -1,
        1,
        0,
        2,
        0,
        0,
        1,
        1,
        1,
        -1,
        0,
        1,
        1,
        1,
        0,
        -1,
        1,
        1,
        1,
        4,
        2,
        1,
        1,
        0,
        4,
        1,
        2,
        1,
        0,
        4,
        1,
        1,
        2,
        0,
        1,
        4,
        2,
        1,
        0,
        1,
        4,
        1,
        2,
        0,
        1,
        4,
        1,
        1,
        0,
        2,
        1,
        4,
        2,
        0,
        1,
        1,
        4,
        1,
        0,
        2,
        1,
        4,
        1,
        0,
        1,
        2,
        1,
        4,
        0,
        2,
        1,
        1,
        4,
        0,
        1,
        2,
        1,
        4,
        0,
        1,
        1,
        2,
        1,
        2,
        1,
        1,
        0,
        0,
        3,
        2,
        1,
        0,
        0,
        3,
        1,
        2,
        0,
        0,
        1,
        2,
        1,
        0,
        1,
        0,
        3,
        2,
        0,
        1,
        0,
        3,
        1,
        0,
        2,
        0,
        1,
        2,
        0,
        1,
        1,
        0,
        3,
        0,
        2,
        1,
        0,
        3,
        0,
        1,
        2,
        0,
        1,
        2,
        1,
        0,
        0,
        1,
        3,
        2,
        0,
        0,
        1,
        3,
        1,
        0,
        0,
        2,
        1,
        2,
        0,
        1,
        0,
        1,
        3,
        0,
        2,
        0,
        1,
        3,
        0,
        1,
        0,
        2,
        1,
        2,
        0,
        0,
        1,
        1,
        3,
        0,
        0,
        2,
        1,
        3,
        0,
        0,
        1,
        2,
        2,
        3,
        1,
        1,
        1,
        0,
        2,
        1,
        1,
        1,
        -1,
        2,
        2,
        0,
        0,
        0,
        2,
        3,
        1,
        1,
        0,
        1,
        2,
        1,
        1,
        -1,
        1,
        2,
        2,
        0,
        0,
        0,
        2,
        3,
        1,
        0,
        1,
        1,
        2,
        1,
        -1,
        1,
        1,
        2,
        2,
        0,
        0,
        0,
        2,
        3,
        1,
        1,
        1,
        0,
        2,
        1,
        1,
        1,
        -1,
        2,
        0,
        2,
        0,
        0,
        2,
        3,
        1,
        1,
        0,
        1,
        2,
        1,
        1,
        -1,
        1,
        2,
        0,
        2,
        0,
        0,
        2,
        3,
        0,
        1,
        1,
        1,
        2,
        -1,
        1,
        1,
        1,
        2,
        0,
        2,
        0,
        0,
        2,
        3,
        1,
        1,
        1,
        0,
        2,
        1,
        1,
        1,
        -1,
        2,
        0,
        0,
        2,
        0,
        2,
        3,
        1,
        0,
        1,
        1,
        2,
        1,
        -1,
        1,
        1,
        2,
        0,
        0,
        2,
        0,
        2,
        3,
        0,
        1,
        1,
        1,
        2,
        -1,
        1,
        1,
        1,
        2,
        0,
        0,
        2,
        0,
        2,
        3,
        1,
        1,
        0,
        1,
        2,
        1,
        1,
        -1,
        1,
        2,
        0,
        0,
        0,
        2,
        2,
        3,
        1,
        0,
        1,
        1,
        2,
        1,
        -1,
        1,
        1,
        2,
        0,
        0,
        0,
        2,
        2,
        3,
        0,
        1,
        1,
        1,
        2,
        -1,
        1,
        1,
        1,
        2,
        0,
        0,
        0,
        2,
        2,
        1,
        1,
        1,
        -1,
        0,
        1,
        1,
        1,
        0,
        -1,
        0,
        0,
        0,
        0,
        0,
        2,
        1,
        1,
        -1,
        1,
        0,
        1,
        1,
        0,
        1,
        -1,
        0,
        0,
        0,
        0,
        0,
        2,
        1,
        -1,
        1,
        1,
        0,
        1,
        0,
        1,
        1,
        -1,
        0,
        0,
        0,
        0,
        0,
        2,
        1,
        1,
        -1,
        0,
        1,
        1,
        1,
        0,
        -1,
        1,
        0,
        0,
        0,
        0,
        0,
        2,
        1,
        -1,
        1,
        0,
        1,
        1,
        0,
        1,
        -1,
        1,
        0,
        0,
        0,
        0,
        0,
        2,
        1,
        -1,
        0,
        1,
        1,
        1,
        0,
        -1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        2,
        1,
        1,
        1,
        -1,
        0,
        1,
        1,
        1,
        0,
        -1,
        2,
        2,
        0,
        0,
        0,
        2,
        1,
        1,
        -1,
        1,
        0,
        1,
        1,
        0,
        1,
        -1,
        2,
        2,
        0,
        0,
        0,
        2,
        1,
        1,
        -1,
        0,
        1,
        1,
        1,
        0,
        -1,
        1,
        2,
        2,
        0,
        0,
        0,
        2,
        1,
        1,
        1,
        -1,
        0,
        1,
        1,
        1,
        0,
        -1,
        2,
        0,
        2,
        0,
        0,
        2,
        1,
        -1,
        1,
        1,
        0,
        1,
        0,
        1,
        1,
        -1,
        2,
        0,
        2,
        0,
        0,
        2,
        1,
        -1,
        1,
        0,
        1,
        1,
        0,
        1,
        -1,
        1,
        2,
        0,
        2,
        0,
        0,
        2,
        1,
        1,
        -1,
        1,
        0,
        1,
        1,
        0,
        1,
        -1,
        2,
        0,
        0,
        2,
        0,
        2,
        1,
        -1,
        1,
        1,
        0,
        1,
        0,
        1,
        1,
        -1,
        2,
        0,
        0,
        2,
        0,
        2,
        1,
        -1,
        0,
        1,
        1,
        1,
        0,
        -1,
        1,
        1,
        2,
        0,
        0,
        2,
        0,
        2,
        1,
        1,
        -1,
        0,
        1,
        1,
        1,
        0,
        -1,
        1,
        2,
        0,
        0,
        0,
        2,
        2,
        1,
        -1,
        1,
        0,
        1,
        1,
        0,
        1,
        -1,
        1,
        2,
        0,
        0,
        0,
        2,
        2,
        1,
        -1,
        0,
        1,
        1,
        1,
        0,
        -1,
        1,
        1,
        2,
        0,
        0,
        0,
        2,
        3,
        1,
        1,
        0,
        0,
        0,
        2,
        2,
        0,
        0,
        0,
        2,
        1,
        1,
        1,
        -1,
        3,
        1,
        0,
        1,
        0,
        0,
        2,
        0,
        2,
        0,
        0,
        2,
        1,
        1,
        1,
        -1,
        3,
        1,
        0,
        0,
        1,
        0,
        2,
        0,
        0,
        2,
        0,
        2,
        1,
        1,
        1,
        -1,
        3,
        1,
        1,
        0,
        0,
        0,
        2,
        2,
        0,
        0,
        0,
        2,
        1,
        1,
        -1,
        1,
        3,
        1,
        0,
        1,
        0,
        0,
        2,
        0,
        2,
        0,
        0,
        2,
        1,
        1,
        -1,
        1,
        3,
        1,
        0,
        0,
        0,
        1,
        2,
        0,
        0,
        0,
        2,
        2,
        1,
        1,
        -1,
        1,
        3,
        1,
        1,
        0,
        0,
        0,
        2,
        2,
        0,
        0,
        0,
        2,
        1,
        -1,
        1,
        1,
        3,
        1,
        0,
        0,
        1,
        0,
        2,
        0,
        0,
        2,
        0,
        2,
        1,
        -1,
        1,
        1,
        3,
        1,
        0,
        0,
        0,
        1,
        2,
        0,
        0,
        0,
        2,
        2,
        1,
        -1,
        1,
        1,
        3,
        1,
        0,
        1,
        0,
        0,
        2,
        0,
        2,
        0,
        0,
        2,
        -1,
        1,
        1,
        1,
        3,
        1,
        0,
        0,
        1,
        0,
        2,
        0,
        0,
        2,
        0,
        2,
        -1,
        1,
        1,
        1,
        3,
        1,
        0,
        0,
        0,
        1,
        2,
        0,
        0,
        0,
        2,
        2,
        -1,
        1,
        1,
        1,
        3,
        3,
        2,
        1,
        0,
        0,
        3,
        1,
        2,
        0,
        0,
        4,
        1,
        1,
        1,
        1,
        3,
        3,
        2,
        0,
        1,
        0,
        3,
        1,
        0,
        2,
        0,
        4,
        1,
        1,
        1,
        1,
        3,
        3,
        0,
        2,
        1,
        0,
        3,
        0,
        1,
        2,
        0,
        4,
        1,
        1,
        1,
        1,
        3,
        3,
        2,
        0,
        0,
        1,
        3,
        1,
        0,
        0,
        2,
        4,
        1,
        1,
        1,
        1,
        3,
        3,
        0,
        2,
        0,
        1,
        3,
        0,
        1,
        0,
        2,
        4,
        1,
        1,
        1,
        1,
        3,
        3,
        0,
        0,
        2,
        1,
        3,
        0,
        0,
        1,
        2,
        4,
        1,
        1,
        1,
        1,
        3,
        3,
        2,
        1,
        0,
        0,
        3,
        1,
        2,
        0,
        0,
        2,
        1,
        1,
        1,
        -1,
        3,
        3,
        2,
        0,
        1,
        0,
        3,
        1,
        0,
        2,
        0,
        2,
        1,
        1,
        1,
        -1,
        3,
        3,
        0,
        2,
        1,
        0,
        3,
        0,
        1,
        2,
        0,
        2,
        1,
        1,
        1,
        -1,
        3,
        3,
        2,
        1,
        0,
        0,
        3,
        1,
        2,
        0,
        0,
        2,
        1,
        1,
        -1,
        1,
        3,
        3,
        2,
        0,
        0,
        1,
        3,
        1,
        0,
        0,
        2,
        2,
        1,
        1,
        -1,
        1,
        3,
        3,
        0,
        2,
        0,
        1,
        3,
        0,
        1,
        0,
        2,
        2,
        1,
        1,
        -1,
        1,
        3,
        3,
        2,
        0,
        1,
        0,
        3,
        1,
        0,
        2,
        0,
        2,
        1,
        -1,
        1,
        1,
        3,
        3,
        2,
        0,
        0,
        1,
        3,
        1,
        0,
        0,
        2,
        2,
        1,
        -1,
        1,
        1,
        3,
        3,
        0,
        0,
        2,
        1,
        3,
        0,
        0,
        1,
        2,
        2,
        1,
        -1,
        1,
        1,
        3,
        3,
        0,
        2,
        1,
        0,
        3,
        0,
        1,
        2,
        0,
        2,
        -1,
        1,
        1,
        1,
        3,
        3,
        0,
        2,
        0,
        1,
        3,
        0,
        1,
        0,
        2,
        2,
        -1,
        1,
        1,
        1,
        3,
        3,
        0,
        0,
        2,
        1,
        3,
        0,
        0,
        1,
        2,
        2,
        -1,
        1,
        1,
        1
    ];
});
define("game/src/ts_src/perlinNoise/perlinNoise", ["require", "exports", "game/src/ts_src/perlinNoise/constants"], function (require, exports, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeNoise4D = exports.makeNoise3D = exports.makeNoise2D = void 0;
    function contribution2D(multiplier, xsb, ysb) {
        return {
            dx: -xsb - multiplier * constants_1.SQUISH_2D,
            dy: -ysb - multiplier * constants_1.SQUISH_2D,
            xsb: xsb,
            ysb: ysb
        };
    }
    function contribution3D(multiplier, xsb, ysb, zsb) {
        return {
            dx: -xsb - multiplier * constants_1.SQUISH_3D,
            dy: -ysb - multiplier * constants_1.SQUISH_3D,
            dz: -zsb - multiplier * constants_1.SQUISH_3D,
            xsb: xsb,
            ysb: ysb,
            zsb: zsb
        };
    }
    function contribution4D(multiplier, xsb, ysb, zsb, wsb) {
        return {
            dx: -xsb - multiplier * constants_1.SQUISH_4D,
            dy: -ysb - multiplier * constants_1.SQUISH_4D,
            dz: -zsb - multiplier * constants_1.SQUISH_4D,
            dw: -wsb - multiplier * constants_1.SQUISH_4D,
            xsb: xsb,
            ysb: ysb,
            zsb: zsb,
            wsb: wsb
        };
    }
    function makeNoise2D(clientSeed) {
        var contributions = [];
        for (var i = 0; i < constants_1.p2D.length; i += 4) {
            var baseSet = constants_1.base2D[constants_1.p2D[i]];
            var previous = null;
            var current = null;
            for (var k = 0; k < baseSet.length; k += 3) {
                current = contribution2D(baseSet[k], baseSet[k + 1], baseSet[k + 2]);
                if (previous === null)
                    contributions[i / 4] = current;
                else
                    previous.next = current;
                previous = current;
            }
            current.next = contribution2D(constants_1.p2D[i + 1], constants_1.p2D[i + 2], constants_1.p2D[i + 3]);
        }
        var lookup = [];
        for (var i = 0; i < constants_1.lookupPairs2D.length; i += 2) {
            lookup[constants_1.lookupPairs2D[i]] = contributions[constants_1.lookupPairs2D[i + 1]];
        }
        var perm = new Uint8Array(256);
        var perm2D = new Uint8Array(256);
        var source = new Uint8Array(256);
        for (var i = 0; i < 256; i++)
            source[i] = i;
        var seed = new Uint32Array(1);
        seed[0] = clientSeed;
        seed = shuffleSeed(shuffleSeed(shuffleSeed(seed)));
        for (var i = 255; i >= 0; i--) {
            seed = shuffleSeed(seed);
            var r = new Uint32Array(1);
            r[0] = (seed[0] + 31) % (i + 1);
            if (r[0] < 0)
                r[0] += i + 1;
            perm[i] = source[r[0]];
            perm2D[i] = perm[i] & 0x0e;
            source[r[0]] = source[i];
        }
        return function (x, y) {
            var stretchOffset = (x + y) * constants_1.STRETCH_2D;
            var xs = x + stretchOffset;
            var ys = y + stretchOffset;
            var xsb = Math.floor(xs);
            var ysb = Math.floor(ys);
            var squishOffset = (xsb + ysb) * constants_1.SQUISH_2D;
            var dx0 = x - (xsb + squishOffset);
            var dy0 = y - (ysb + squishOffset);
            var xins = xs - xsb;
            var yins = ys - ysb;
            var inSum = xins + yins;
            var hash = (xins - yins + 1) |
                (inSum << 1) |
                ((inSum + yins) << 2) |
                ((inSum + xins) << 4);
            var value = 0;
            for (var c = lookup[hash]; c !== undefined; c = c.next) {
                var dx = dx0 + c.dx;
                var dy = dy0 + c.dy;
                var attn = 2 - dx * dx - dy * dy;
                if (attn > 0) {
                    var px = xsb + c.xsb;
                    var py = ysb + c.ysb;
                    var indexPartA = perm[px & 0xff];
                    var index = perm2D[(indexPartA + py) & 0xff];
                    var valuePart = constants_1.gradients2D[index] * dx + constants_1.gradients2D[index + 1] * dy;
                    value += attn * attn * attn * attn * valuePart;
                }
            }
            return value * constants_1.NORM_2D;
        };
    }
    exports.makeNoise2D = makeNoise2D;
    function makeNoise3D(clientSeed) {
        var contributions = [];
        for (var i = 0; i < constants_1.p3D.length; i += 9) {
            var baseSet = constants_1.base3D[constants_1.p3D[i]];
            var previous = null;
            var current = null;
            for (var k = 0; k < baseSet.length; k += 4) {
                current = contribution3D(baseSet[k], baseSet[k + 1], baseSet[k + 2], baseSet[k + 3]);
                if (previous === null)
                    contributions[i / 9] = current;
                else
                    previous.next = current;
                previous = current;
            }
            current.next = contribution3D(constants_1.p3D[i + 1], constants_1.p3D[i + 2], constants_1.p3D[i + 3], constants_1.p3D[i + 4]);
            current.next.next = contribution3D(constants_1.p3D[i + 5], constants_1.p3D[i + 6], constants_1.p3D[i + 7], constants_1.p3D[i + 8]);
        }
        var lookup = [];
        for (var i = 0; i < constants_1.lookupPairs3D.length; i += 2) {
            lookup[constants_1.lookupPairs3D[i]] = contributions[constants_1.lookupPairs3D[i + 1]];
        }
        var perm = new Uint8Array(256);
        var perm3D = new Uint8Array(256);
        var source = new Uint8Array(256);
        for (var i = 0; i < 256; i++)
            source[i] = i;
        var seed = new Uint32Array(1);
        seed[0] = clientSeed;
        seed = shuffleSeed(shuffleSeed(shuffleSeed(seed)));
        for (var i = 255; i >= 0; i--) {
            seed = shuffleSeed(seed);
            var r = new Uint32Array(1);
            r[0] = (seed[0] + 31) % (i + 1);
            if (r[0] < 0)
                r[0] += i + 1;
            perm[i] = source[r[0]];
            perm3D[i] = (perm[i] % 24) * 3;
            source[r[0]] = source[i];
        }
        return function (x, y, z) {
            var stretchOffset = (x + y + z) * constants_1.STRETCH_3D;
            var xs = x + stretchOffset;
            var ys = y + stretchOffset;
            var zs = z + stretchOffset;
            var xsb = Math.floor(xs);
            var ysb = Math.floor(ys);
            var zsb = Math.floor(zs);
            var squishOffset = (xsb + ysb + zsb) * constants_1.SQUISH_3D;
            var dx0 = x - (xsb + squishOffset);
            var dy0 = y - (ysb + squishOffset);
            var dz0 = z - (zsb + squishOffset);
            var xins = xs - xsb;
            var yins = ys - ysb;
            var zins = zs - zsb;
            var inSum = xins + yins + zins;
            var hash = (yins - zins + 1) |
                ((xins - yins + 1) << 1) |
                ((xins - zins + 1) << 2) |
                (inSum << 3) |
                ((inSum + zins) << 5) |
                ((inSum + yins) << 7) |
                ((inSum + xins) << 9);
            var value = 0;
            for (var c = lookup[hash]; c !== undefined; c = c.next) {
                var dx = dx0 + c.dx;
                var dy = dy0 + c.dy;
                var dz = dz0 + c.dz;
                var attn = 2 - dx * dx - dy * dy - dz * dz;
                if (attn > 0) {
                    var px = xsb + c.xsb;
                    var py = ysb + c.ysb;
                    var pz = zsb + c.zsb;
                    var indexPartA = perm[px & 0xff];
                    var indexPartB = perm[(indexPartA + py) & 0xff];
                    var index = perm3D[(indexPartB + pz) & 0xff];
                    var valuePart = constants_1.gradients3D[index] * dx +
                        constants_1.gradients3D[index + 1] * dy +
                        constants_1.gradients3D[index + 2] * dz;
                    value += attn * attn * attn * attn * valuePart;
                }
            }
            return value * constants_1.NORM_3D;
        };
    }
    exports.makeNoise3D = makeNoise3D;
    function makeNoise4D(clientSeed) {
        var contributions = [];
        for (var i = 0; i < constants_1.p4D.length; i += 16) {
            var baseSet = constants_1.base4D[constants_1.p4D[i]];
            var previous = null;
            var current = null;
            for (var k = 0; k < baseSet.length; k += 5) {
                current = contribution4D(baseSet[k], baseSet[k + 1], baseSet[k + 2], baseSet[k + 3], baseSet[k + 4]);
                if (previous === null)
                    contributions[i / 16] = current;
                else
                    previous.next = current;
                previous = current;
            }
            current.next = contribution4D(constants_1.p4D[i + 1], constants_1.p4D[i + 2], constants_1.p4D[i + 3], constants_1.p4D[i + 4], constants_1.p4D[i + 5]);
            current.next.next = contribution4D(constants_1.p4D[i + 6], constants_1.p4D[i + 7], constants_1.p4D[i + 8], constants_1.p4D[i + 9], constants_1.p4D[i + 10]);
            current.next.next.next = contribution4D(constants_1.p4D[i + 11], constants_1.p4D[i + 12], constants_1.p4D[i + 13], constants_1.p4D[i + 14], constants_1.p4D[i + 15]);
        }
        var lookup = [];
        for (var i = 0; i < constants_1.lookupPairs4D.length; i += 2) {
            lookup[constants_1.lookupPairs4D[i]] = contributions[constants_1.lookupPairs4D[i + 1]];
        }
        var perm = new Uint8Array(256);
        var perm4D = new Uint8Array(256);
        var source = new Uint8Array(256);
        for (var i = 0; i < 256; i++)
            source[i] = i;
        var seed = new Uint32Array(1);
        seed[0] = clientSeed;
        seed = shuffleSeed(shuffleSeed(shuffleSeed(seed)));
        for (var i = 255; i >= 0; i--) {
            seed = shuffleSeed(seed);
            var r = new Uint32Array(1);
            r[0] = (seed[0] + 31) % (i + 1);
            if (r[0] < 0)
                r[0] += i + 1;
            perm[i] = source[r[0]];
            perm4D[i] = perm[i] & 0xfc;
            source[r[0]] = source[i];
        }
        return function (x, y, z, w) {
            var stretchOffset = (x + y + z + w) * constants_1.STRETCH_4D;
            var xs = x + stretchOffset;
            var ys = y + stretchOffset;
            var zs = z + stretchOffset;
            var ws = w + stretchOffset;
            var xsb = Math.floor(xs);
            var ysb = Math.floor(ys);
            var zsb = Math.floor(zs);
            var wsb = Math.floor(ws);
            var squishOffset = (xsb + ysb + zsb + wsb) * constants_1.SQUISH_4D;
            var dx0 = x - (xsb + squishOffset);
            var dy0 = y - (ysb + squishOffset);
            var dz0 = z - (zsb + squishOffset);
            var dw0 = w - (wsb + squishOffset);
            var xins = xs - xsb;
            var yins = ys - ysb;
            var zins = zs - zsb;
            var wins = ws - wsb;
            var inSum = xins + yins + zins + wins;
            var hash = (zins - wins + 1) |
                ((yins - zins + 1) << 1) |
                ((yins - wins + 1) << 2) |
                ((xins - yins + 1) << 3) |
                ((xins - zins + 1) << 4) |
                ((xins - wins + 1) << 5) |
                (inSum << 6) |
                ((inSum + wins) << 8) |
                ((inSum + zins) << 11) |
                ((inSum + yins) << 14) |
                ((inSum + xins) << 17);
            var value = 0;
            for (var c = lookup[hash]; c !== undefined; c = c.next) {
                var dx = dx0 + c.dx;
                var dy = dy0 + c.dy;
                var dz = dz0 + c.dz;
                var dw = dw0 + c.dw;
                var attn = 2 - dx * dx - dy * dy - dz * dz - dw * dw;
                if (attn > 0) {
                    var px = xsb + c.xsb;
                    var py = ysb + c.ysb;
                    var pz = zsb + c.zsb;
                    var pw = wsb + c.wsb;
                    var indexPartA = perm[px & 0xff];
                    var indexPartB = perm[(indexPartA + py) & 0xff];
                    var indexPartC = perm[(indexPartB + pz) & 0xff];
                    var index = perm4D[(indexPartC + pw) & 0xff];
                    var valuePart = constants_1.gradients4D[index] * dx +
                        constants_1.gradients4D[index + 1] * dy +
                        constants_1.gradients4D[index + 2] * dz +
                        constants_1.gradients4D[index + 3] * dw;
                    value += attn * attn * attn * attn * valuePart;
                }
            }
            return value * constants_1.NORM_4D;
        };
    }
    exports.makeNoise4D = makeNoise4D;
    function shuffleSeed(seed) {
        var newSeed = new Uint32Array(1);
        newSeed[0] = seed[0] * 1664525 + 1013904223;
        return newSeed;
    }
});
define("game/src/ts_src/levelGenerator/ambienceGenerator/heightMap", ["require", "exports", "game/src/ts_src/perlinNoise/perlinNoise"], function (require, exports, perlinNoise_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HeightMap = void 0;
    var HeightMap = (function () {
        function HeightMap() {
        }
        HeightMap.prototype.init = function (_width, _height, _amplitude, _ratio) {
            if (_amplitude === undefined) {
                _amplitude = 1.0;
            }
            if (_ratio === undefined) {
                _ratio = 1.0;
            }
            if (_width <= 0) {
                _width = 1;
            }
            if (_height <= 0) {
                _height = 1;
            }
            this._m_width = _width;
            this._m_height = _height;
            this._m_data = new Uint8Array(_width * _height);
            var yFactor = _amplitude;
            var xFactor = yFactor * _ratio;
            var col = 0;
            var row = 0;
            var noiseFn = perlinNoise_1.makeNoise2D(Date.now());
            while (row < _height) {
                while (col < _width) {
                    this._m_data[(row * _width) + col]
                        = (noiseFn(col * xFactor, row * yFactor) + 1.0) * 128;
                    ++col;
                }
                col = 0;
                ++row;
            }
            return;
        };
        HeightMap.prototype.getF = function (_x, _y) {
            if (_x < 0.0) {
                _x = 0.0;
            }
            else if (_x > 1.0) {
                _x = 1.0;
            }
            if (_y < 0.0) {
                _y = 0.0;
            }
            else if (_y > 1.0) {
                _y = 1.0;
            }
            return this.get(Math.floor(this._m_width * _x), Math.floor(this._m_height * _y));
        };
        HeightMap.prototype.get = function (_xCoord, _yCoord) {
            if (_xCoord >= this._m_width) {
                _xCoord %= this._m_width;
            }
            if (_yCoord >= this._m_height) {
                _yCoord %= this._m_height;
            }
            return this._m_data[(_yCoord * this._m_width) + _xCoord];
        };
        HeightMap.prototype.getWidth = function () {
            return this._m_width;
        };
        HeightMap.prototype.getHeight = function () {
            return this._m_height;
        };
        HeightMap.prototype.destroy = function () {
            this._m_data = null;
            return;
        };
        return HeightMap;
    }());
    exports.HeightMap = HeightMap;
});
define("game/src/ts_src/levelGenerator/ambienceGenerator/surfacePainter", ["require", "exports", "commons/mxEnums", "shaders/mxShader", "game/src/ts_src/levelGenerator/ambienceGenerator/customTextureShader"], function (require, exports, mxEnums_1, mxShader_1, customTextureShader_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SurfacePainter = void 0;
    var SurfacePainter = (function () {
        function SurfacePainter() {
        }
        SurfacePainter.prototype.init = function () {
            return mxEnums_1.OPRESULT.kOk;
        };
        SurfacePainter.prototype.setTerrainColorTexture = function (_terrainColorTexture) {
            this._m_terrainColorTexture = _terrainColorTexture;
            return;
        };
        SurfacePainter.prototype.setHeightMap = function (_heightMap) {
            this._m_heightMap = _heightMap;
            return;
        };
        SurfacePainter.prototype.setTerrainMap = function (_terrainMaps) {
            this._m_terrainMaps = _terrainMaps;
            return;
        };
        SurfacePainter.prototype.createAmbiencecShader = function (_scene, _shaderKey, _texDataWidth, _texDataHeight) {
            if (this._m_terrainColorTexture == null
                || this._m_heightMap == null
                || this._m_terrainMaps == null) {
                return mxEnums_1.OPRESULT.kFail;
            }
            if (this._m_surfaceShader != null) {
                this._m_surfaceShader.destroy();
                this._m_surfaceShader = null;
            }
            var a_textureKeys = new Array();
            a_textureKeys.push(this._m_terrainColorTexture.key);
            a_textureKeys.push(this._m_terrainMaps.key);
            var pixelLength = 4;
            var a_pixels = new Uint8Array(pixelLength * _texDataWidth * _texDataHeight);
            var col = 0;
            var row = 0;
            var baseIndex = 0;
            var heightValue = 0;
            var layer = 0;
            var rowSize = _texDataWidth * pixelLength;
            while (layer < 4) {
                while (row < _texDataHeight) {
                    while (col < _texDataWidth) {
                        baseIndex = (rowSize * row) + (col * pixelLength);
                        if (layer < 3) {
                            heightValue = this._m_heightMap.get(col, row + (_texDataHeight * layer));
                            a_pixels[baseIndex + layer] = heightValue;
                        }
                        else {
                            a_pixels[baseIndex + layer] = 255;
                        }
                        ++col;
                    }
                    col = 0;
                    ++row;
                }
                row = 0;
                ++layer;
            }
            var shader = new customTextureShader_1.CustomTextureShader(_scene, _shaderKey, 0.0, 0.0, _scene.game.canvas.width, _scene.game.canvas.height, a_textureKeys);
            _scene.children.add(shader);
            var context = _scene.game.context;
            shader.prepare(a_pixels, context.RGBA, _texDataWidth, _texDataHeight, 2);
            shader.setOrigin(0.0, 0.0);
            shader.setDepth(-1000.0);
            shader.uniforms.d = { type: "1f", value: 0.0 };
            this._m_surfaceShader = new mxShader_1.MxShader();
            this._m_surfaceShader.init(shader);
            this._m_surfaceShader.initUniform('d');
            return mxEnums_1.OPRESULT.kOk;
        };
        SurfacePainter.prototype.update = function (_distance) {
            this._m_surfaceShader.setUniform('d.value', _distance);
            return;
        };
        SurfacePainter.prototype.destroy = function () {
            if (this._m_surfaceShader != null) {
                this._m_surfaceShader.destroy();
                this._m_surfaceShader = null;
            }
            this._m_terrainColorTexture = null;
            return;
        };
        return SurfacePainter;
    }());
    exports.SurfacePainter = SurfacePainter;
});
define("game/src/ts_src/levelGenerator/ambienceGenerator/ambienceGeneratorConfig", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AmbienceGeneratorConfig = void 0;
    var AmbienceGeneratorConfig = (function () {
        function AmbienceGeneratorConfig() {
        }
        return AmbienceGeneratorConfig;
    }());
    exports.AmbienceGeneratorConfig = AmbienceGeneratorConfig;
});
define("game/src/ts_src/levelGenerator/ambienceGenerator/iAmbientGenerator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/levelGenerator/ambienceGenerator/ambienceGenerator", ["require", "exports", "game/src/ts_src/levelGenerator/ambienceGenerator/surfacePainter", "commons/mxEnums", "game/src/ts_src/levelGenerator/ambienceGenerator/heightMap"], function (require, exports, surfacePainter_1, mxEnums_2, heightMap_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AmbienceGenerator = void 0;
    var AmbienceGenerator = (function () {
        function AmbienceGenerator() {
            this._m_speed = 1.0;
        }
        AmbienceGenerator.prototype.init = function (_scene, _config) {
            this._m_surfacePainter = new surfacePainter_1.SurfacePainter();
            this._m_surfacePainter.init();
            if (_config === undefined) {
                return;
            }
            if (_config.colorTextureKey !== undefined) {
                if (_scene.textures.exists(_config.colorTextureKey)) {
                    this._m_surfacePainter.setTerrainColorTexture(_scene.textures.get(_config.colorTextureKey));
                }
                else {
                    console.error('Texture: ' + _config.colorTextureKey + ' not found.');
                }
            }
            if (_config.mapsTextureKey !== undefined) {
                if (_scene.textures.exists(_config.mapsTextureKey)) {
                    this._m_surfacePainter.setTerrainMap(_scene.textures.get(_config.mapsTextureKey));
                }
                else {
                    console.error('Texture: ' + _config.mapsTextureKey + ' not found. ');
                }
            }
            if (_config.noise_height === undefined || _config.noise_width == undefined) {
                _config.noise_width = 256;
                _config.noise_height = 256;
            }
            this.generateTerrainHeightMap(_config.noise_width, _config.noise_height, _config.noise_amplitude, _scene.game.canvas.width / _scene.game.canvas.height);
            if (_config.terrainShaderKey !== undefined) {
                if (_scene.cache.shader.exists(_config.terrainShaderKey)) {
                    this.createBackgroundAmbience(_scene, _config.terrainShaderKey, _config.dataTexture_width, _config.dataTexture_height);
                }
                else {
                    console.error('Shader: ' + _config.terrainShaderKey + ' not found.');
                }
            }
            this.setSpeed(_config.speed);
            this._m_distance = 0.0;
            return;
        };
        AmbienceGenerator.prototype.update = function (_dt) {
            var distance = this._m_distance + (this._m_speed * _dt);
            if (distance > 2.0) {
                distance = 2.0;
            }
            this._m_surfacePainter.update(distance);
            this._m_distance = distance;
            return;
        };
        AmbienceGenerator.prototype.generateTerrainHeightMap = function (_width, _height, _amplitude, _ratio) {
            if (this._m_heightMap != null) {
                this._m_heightMap.destroy();
            }
            this._m_heightMap = new heightMap_1.HeightMap();
            this._m_heightMap.init(_width, _height, _amplitude, _ratio);
            this._m_surfacePainter.setHeightMap(this._m_heightMap);
            return mxEnums_2.OPRESULT.kOk;
        };
        AmbienceGenerator.prototype.createBackgroundAmbience = function (_scene, _shaderKey, _texDataWidth, _texDataHeight) {
            if (this._m_heightMap == null) {
                return mxEnums_2.OPRESULT.kFail;
            }
            return this._m_surfacePainter.createAmbiencecShader(_scene, _shaderKey, _texDataWidth, _texDataHeight);
        };
        AmbienceGenerator.prototype.getSurfacePainter = function () {
            return this._m_surfacePainter;
        };
        AmbienceGenerator.prototype.getHeightMap = function () {
            return this._m_heightMap;
        };
        AmbienceGenerator.prototype.setSpeed = function (_speed) {
            this._m_speed = _speed;
        };
        AmbienceGenerator.prototype.destroy = function () {
            this._m_surfacePainter.destroy();
            this._m_surfacePainter = null;
            return;
        };
        return AmbienceGenerator;
    }());
    exports.AmbienceGenerator = AmbienceGenerator;
});
define("game/src/ts_src/levelGenerator/ambienceGenerator/nullAmbientGenerator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullAmbientGenerator = void 0;
    var NullAmbientGenerator = (function () {
        function NullAmbientGenerator() {
        }
        NullAmbientGenerator.prototype.update = function (_dt) { };
        NullAmbientGenerator.prototype.setSpeed = function (_speed) { };
        NullAmbientGenerator.prototype.destroy = function () { };
        return NullAmbientGenerator;
    }());
    exports.NullAmbientGenerator = NullAmbientGenerator;
});
define("game/src/ts_src/levelGenerator/iLevelGenerator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/commands/levelCommands/iLevelCommands", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/commands/levelCommands/cmdEnterBoss", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, _1942enums_21, gameManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmdEnterBoss = void 0;
    var CmdEnterBoss = (function () {
        function CmdEnterBoss() {
            this._m_position = new Phaser.Geom.Point();
            return;
        }
        CmdEnterBoss.prototype.exec = function (_levelGenerator) {
            gameManager_1.GameManager.ReceiveMessage(_1942enums_21.DC_MESSAGE_ID.kBossEnter, null);
            return;
        };
        CmdEnterBoss.prototype.getPosition = function () {
            return this._m_position;
        };
        CmdEnterBoss.prototype.setPosition = function (_x, _y) {
            this._m_position.setTo(_x, _y);
            return;
        };
        CmdEnterBoss.prototype.destroy = function () {
            return;
        };
        return CmdEnterBoss;
    }());
    exports.CmdEnterBoss = CmdEnterBoss;
});
define("game/src/ts_src/configObjects/cnfArponShip", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_22) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfArponShip = void 0;
    var CnfArponShip = (function () {
        function CnfArponShip() {
            this.collision_damage = 5.0;
            this.health = 2;
            this.mass = 1.0;
            this.score = 5;
            this.speed = 300.0;
            this.steer_force = 200.0;
            this.frequency = 1;
            this.texture_key = 'arpon_ship';
            this.weapon_texture_key = "arpon_weapon";
            this.secondsPerBullet = 1.0 / this.frequency;
            return;
        }
        CnfArponShip.prototype.setFromObject = function (_object) {
            if (_object.properties != undefined) {
                var aProperties = _object.properties;
                var index = 0;
                var property = void 0;
                while (index < aProperties.length) {
                    property = aProperties[index];
                    switch (property.name) {
                        case "collision_damage":
                            this.collision_damage = property.value;
                            break;
                        case "fire_rate":
                            this.frequency = property.value;
                            if (this.frequency > 0.0) {
                                this.secondsPerBullet = 1.0 / this.frequency;
                            }
                            else {
                                this.secondsPerBullet = 1000.0;
                            }
                            break;
                        case "health":
                            this.health = property.value;
                            break;
                        case "score":
                            this.score = property.value;
                            break;
                        case "speed":
                            this.speed = property.value;
                            break;
                        case "steer_force":
                            this.steer_force = property.value;
                            break;
                        case "texture_key":
                            this.texture_key = property.value;
                            break;
                        case "weapon_texture_key":
                            this.weapon_texture_key = property.value;
                            break;
                        case "mass":
                            this.mass = property.value;
                            break;
                        default:
                            break;
                    }
                    ++index;
                }
            }
            return;
        };
        CnfArponShip.prototype.getID = function () {
            return _1942enums_22.DC_CONFIG.kArponShip;
        };
        CnfArponShip.prototype.getConfigName = function () {
            return 'ArponShip';
        };
        return CnfArponShip;
    }());
    exports.CnfArponShip = CnfArponShip;
});
define("game/src/ts_src/commands/levelCommands/cmdSpawnArponShip", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, _1942enums_23, gameManager_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmdSpawnArponShip = void 0;
    var CmdSpawnArponShip = (function () {
        function CmdSpawnArponShip(_x, _y, _config) {
            this._m_position = new Phaser.Geom.Point(_x, _y);
            this._m_config = _config;
            return;
        }
        CmdSpawnArponShip.prototype.exec = function (_levelGenerator) {
            var gameManager = gameManager_2.GameManager.GetInstance();
            var enemiesManager = gameManager.getEnemiesManager();
            enemiesManager.spawn(this._m_position.x, -50.0, _1942enums_23.DC_ENEMY_TYPE.kArponShip, this._m_config);
            return;
        };
        CmdSpawnArponShip.prototype.getPosition = function () {
            return this._m_position;
        };
        CmdSpawnArponShip.prototype.setPosition = function (_x, _y) {
            this._m_position.setTo(_x, _y);
            return;
        };
        CmdSpawnArponShip.prototype.destroy = function () {
            this._m_config = null;
            this._m_position = null;
            return;
        };
        return CmdSpawnArponShip;
    }());
    exports.CmdSpawnArponShip = CmdSpawnArponShip;
});
define("game/src/ts_src/commands/levelCommands/cmdSpawnCadmio", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, _1942enums_24, gameManager_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmdSpawnCadmio = void 0;
    var CmdSpawnCadmio = (function () {
        function CmdSpawnCadmio(_x, _y) {
            this._m_position = new Phaser.Geom.Point(_x, _y);
        }
        CmdSpawnCadmio.prototype.exec = function (_levelGenerator) {
            var gameManager = gameManager_3.GameManager.GetInstance();
            var itemManager = gameManager.getItemManager();
            itemManager.spawn(this._m_position.x, -50.0, _1942enums_24.DC_ITEM_TYPE.kCadmio);
            return;
        };
        CmdSpawnCadmio.prototype.getPosition = function () {
            return this._m_position;
        };
        CmdSpawnCadmio.prototype.setPosition = function (_x, _y) {
            this._m_position.setTo(_x, _y);
            return;
        };
        CmdSpawnCadmio.prototype.destroy = function () {
            this._m_position = null;
            return;
        };
        return CmdSpawnCadmio;
    }());
    exports.CmdSpawnCadmio = CmdSpawnCadmio;
});
define("game/src/ts_src/commands/levelCommands/cmdSpawnCanus", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, _1942enums_25, gameManager_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmdSpawnCanus = void 0;
    var CmdSpawnCanus = (function () {
        function CmdSpawnCanus(_x, _y) {
            this._m_position = new Phaser.Geom.Point(_x, _y);
        }
        CmdSpawnCanus.prototype.exec = function (_levelGenerator) {
            var gameManager = gameManager_4.GameManager.GetInstance();
            var itemManager = gameManager.getItemManager();
            itemManager.spawn(this._m_position.x, -50.0, _1942enums_25.DC_ITEM_TYPE.kCanus);
            return;
        };
        CmdSpawnCanus.prototype.getPosition = function () {
            return this._m_position;
        };
        CmdSpawnCanus.prototype.setPosition = function (_x, _y) {
            this._m_position.setTo(_x, _y);
            return;
        };
        CmdSpawnCanus.prototype.destroy = function () {
            this._m_position = null;
            return;
        };
        return CmdSpawnCanus;
    }());
    exports.CmdSpawnCanus = CmdSpawnCanus;
});
define("game/src/ts_src/configObjects/cnfErrante", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_26) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfErrante = void 0;
    var CnfErrante = (function () {
        function CnfErrante() {
            this.collision_damage = 1.0;
            this.hasWeapon = true;
            this.init_time = 0.0;
            this.health = 2;
            this.score = 1;
            this.speed = 500.0;
            this.frequency = 1;
            this.texture_key = 'enemy';
            this.secondsPerBullet = 1.0 / this.frequency;
            return;
        }
        CnfErrante.prototype.setFromObject = function (_object) {
            if (_object.properties != undefined) {
                var aProperties = _object.properties;
                var index = 0;
                var property = void 0;
                while (index < aProperties.length) {
                    property = aProperties[index];
                    switch (property.name) {
                        case "collision_damage":
                            this.collision_damage = property.value;
                            break;
                        case "fire_rate":
                            this.frequency = property.value;
                            if (this.frequency > 0.0) {
                                this.secondsPerBullet = 1.0 / this.frequency;
                            }
                            else {
                                this.secondsPerBullet = 1000.0;
                            }
                            break;
                        case "init_time":
                            this.init_time = property.value;
                            break;
                        case "has_weapon":
                            this.hasWeapon = property.value;
                            break;
                        case "health":
                            this.health = property.value;
                            break;
                        case "score":
                            this.score = property.value;
                            break;
                        case "speed":
                            this.speed = property.value;
                            break;
                        case "texture_key":
                            this.texture_key = property.value;
                            break;
                        default:
                            break;
                    }
                    ++index;
                }
            }
            return;
        };
        CnfErrante.prototype.getID = function () {
            return _1942enums_26.DC_CONFIG.kErrante;
        };
        CnfErrante.prototype.getConfigName = function () {
            return 'Errante';
        };
        return CnfErrante;
    }());
    exports.CnfErrante = CnfErrante;
});
define("game/src/ts_src/commands/levelCommands/cmdSpawnErrante", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, _1942enums_27, gameManager_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmdSpawnErrante = void 0;
    var CmdSpawnErrante = (function () {
        function CmdSpawnErrante(_x, _y, _config) {
            this._m_position = new Phaser.Geom.Point(_x, _y);
            this._m_config = _config;
            return;
        }
        CmdSpawnErrante.prototype.exec = function (_levelGenerator) {
            var gameManager = gameManager_5.GameManager.GetInstance();
            var enemiesManager = gameManager.getEnemiesManager();
            enemiesManager.spawn(this._m_position.x, -50.0, _1942enums_27.DC_ENEMY_TYPE.kErrante, this._m_config);
            return;
        };
        CmdSpawnErrante.prototype.getPosition = function () {
            return this._m_position;
        };
        CmdSpawnErrante.prototype.setPosition = function (_x, _y) {
            this._m_position.x = _x;
            this._m_position.y = _y;
            return;
        };
        CmdSpawnErrante.prototype.destroy = function () { };
        return CmdSpawnErrante;
    }());
    exports.CmdSpawnErrante = CmdSpawnErrante;
});
define("game/src/ts_src/configObjects/cnfRangerConfig", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_28) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfRangerConfig = void 0;
    var CnfRangerConfig = (function () {
        function CnfRangerConfig() {
            this.collision_damage = 5.0;
            this.explosion_radius = 200.0;
            this.health = 2;
            this.mass = 1.0;
            this.life_time = 7.0;
            this.score = 5;
            this.speed = 300.0;
            this.steer_force = 200.0;
            this.texture_key = 'enemy_ranger';
            return;
        }
        CnfRangerConfig.prototype.setFromObject = function (_object) {
            if (_object.properties != undefined) {
                var aProperties = _object.properties;
                var index = 0;
                var property = void 0;
                while (index < aProperties.length) {
                    property = aProperties[index];
                    switch (property.name) {
                        case "collision_damage":
                            this.collision_damage = property.value;
                            break;
                        case "explosion_radius":
                            this.explosion_radius = property.value;
                            break;
                        case "health":
                            this.health = property.value;
                            break;
                        case "life_time":
                            this.life_time = property.value;
                            break;
                        case "score":
                            this.score = property.value;
                            break;
                        case "speed":
                            this.speed = property.value;
                            break;
                        case "steer_force":
                            this.steer_force = property.value;
                            break;
                        case "texture_key":
                            this.texture_key = property.value;
                            break;
                        case "mass":
                            this.mass = property.value;
                            break;
                        default:
                            break;
                    }
                    ++index;
                }
            }
            return;
        };
        CnfRangerConfig.prototype.getID = function () {
            return _1942enums_28.DC_CONFIG.kRanger;
        };
        CnfRangerConfig.prototype.getConfigName = function () {
            return 'Ranger';
        };
        return CnfRangerConfig;
    }());
    exports.CnfRangerConfig = CnfRangerConfig;
});
define("game/src/ts_src/commands/levelCommands/cmdSpawnRanger", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, _1942enums_29, gameManager_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmdSpawnRanger = void 0;
    var CmdSpawnRanger = (function () {
        function CmdSpawnRanger(_x, _y, _config) {
            this._m_position = new Phaser.Geom.Point(_x, _y);
            this._m_config = _config;
            return;
        }
        CmdSpawnRanger.prototype.exec = function (_levelGenerator) {
            var gameManager = gameManager_6.GameManager.GetInstance();
            var enemiesManager = gameManager.getEnemiesManager();
            var gameScene = gameManager.getGameScene();
            enemiesManager.spawn(this._m_position.x, gameScene.game.canvas.height, _1942enums_29.DC_ENEMY_TYPE.kRanger, this._m_config);
            return;
        };
        CmdSpawnRanger.prototype.getPosition = function () {
            return this._m_position;
        };
        CmdSpawnRanger.prototype.setPosition = function (_x, _y) {
            this._m_position.setTo(_x, _y);
            return;
        };
        CmdSpawnRanger.prototype.destroy = function () {
            this._m_config = null;
            this._m_position = null;
            return;
        };
        return CmdSpawnRanger;
    }());
    exports.CmdSpawnRanger = CmdSpawnRanger;
});
define("game/src/ts_src/configObjects/cnfSonic", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_30) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfSonic = void 0;
    var CnfSonic = (function () {
        function CnfSonic() {
            this.collision_damage = 5.0;
            this.health = 2;
            this.coord_x = 0.0;
            this.coord_y = 0.0;
            this.mass = 1.0;
            this.score = 5;
            this.speed = 300.0;
            this.steer_force = 200.0;
            this.texture_key = 'enemy_ranger';
            return;
        }
        CnfSonic.prototype.setFromObject = function (_object) {
            if (_object.properties != undefined) {
                var aProperties = _object.properties;
                var index = 0;
                var property = void 0;
                while (index < aProperties.length) {
                    property = aProperties[index];
                    switch (property.name) {
                        case "collision_damage":
                            this.collision_damage = property.value;
                            break;
                        case "health":
                            this.health = property.value;
                            break;
                        case "score":
                            this.score = property.value;
                            break;
                        case "speed":
                            this.speed = property.value;
                            break;
                        case "steer_force":
                            this.steer_force = property.value;
                            break;
                        case "texture_key":
                            this.texture_key = property.value;
                            break;
                        case "mass":
                            this.mass = property.value;
                            break;
                        case "coord_x":
                            this.coord_x = property.value;
                            break;
                        case "coord_y":
                            this.coord_y = property.value;
                            break;
                        default:
                            break;
                    }
                    ++index;
                }
            }
            return;
        };
        CnfSonic.prototype.getID = function () {
            return _1942enums_30.DC_CONFIG.kSonic;
        };
        CnfSonic.prototype.getConfigName = function () {
            return 'Sonic';
        };
        return CnfSonic;
    }());
    exports.CnfSonic = CnfSonic;
});
define("game/src/ts_src/commands/levelCommands/cmdSpawnSonic", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, _1942enums_31, gameManager_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmdSpawnSonic = void 0;
    var CmdSpawnSonic = (function () {
        function CmdSpawnSonic(_x, _y, _config) {
            this._m_position = new Phaser.Geom.Point(_x, _y);
            this._m_config = _config;
            return;
        }
        CmdSpawnSonic.prototype.exec = function (_levelGenerator) {
            var gameManager = gameManager_7.GameManager.GetInstance();
            var enemiesManager = gameManager.getEnemiesManager();
            var gameScene = gameManager.getGameScene();
            var canvas = gameScene.game.canvas;
            this._m_position.x = canvas.width * this._m_config.coord_x;
            this._m_position.y = canvas.height * this._m_config.coord_y;
            enemiesManager.spawn(this._m_position.x, this._m_position.y, _1942enums_31.DC_ENEMY_TYPE.kSonico, this._m_config);
            return;
        };
        CmdSpawnSonic.prototype.getPosition = function () {
            return this._m_position;
        };
        CmdSpawnSonic.prototype.setPosition = function (_x, _y) {
            this._m_position.setTo(_x, _y);
            return;
        };
        CmdSpawnSonic.prototype.destroy = function () {
            this._m_config = null;
            this._m_position = null;
            return;
        };
        return CmdSpawnSonic;
    }());
    exports.CmdSpawnSonic = CmdSpawnSonic;
});
define("game/src/ts_src/levelGenerator/levelGeneratorConfig", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LevelGeneratorConfig = void 0;
    var LevelGeneratorConfig = (function () {
        function LevelGeneratorConfig() {
        }
        return LevelGeneratorConfig;
    }());
    exports.LevelGeneratorConfig = LevelGeneratorConfig;
});
define("game/src/ts_src/levelGenerator/levelGenerator", ["require", "exports", "game/src/ts_src/commands/levelCommands/cmdEnterBoss", "game/src/ts_src/commands/levelCommands/cmdSpawnArponShip", "game/src/ts_src/commands/levelCommands/cmdSpawnCadmio", "game/src/ts_src/commands/levelCommands/cmdSpawnCanus", "game/src/ts_src/commands/levelCommands/cmdSpawnErrante", "game/src/ts_src/commands/levelCommands/cmdSpawnRanger", "game/src/ts_src/commands/levelCommands/cmdSpawnSonic", "game/src/ts_src/configObjects/cnfArponShip", "game/src/ts_src/configObjects/cnfCadmio", "game/src/ts_src/configObjects/cnfErrante", "game/src/ts_src/configObjects/cnfItemManager", "game/src/ts_src/configObjects/cnfRangerConfig", "game/src/ts_src/configObjects/cnfSonic", "game/src/ts_src/gameManager/gameManager"], function (require, exports, cmdEnterBoss_1, cmdSpawnArponShip_1, cmdSpawnCadmio_1, cmdSpawnCanus_1, cmdSpawnErrante_1, cmdSpawnRanger_1, cmdSpawnSonic_1, cnfArponShip_1, cnfCadmio_2, cnfErrante_1, cnfItemManager_2, cnfRangerConfig_1, cnfSonic_1, gameManager_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LevelGenerator = void 0;
    var LevelGenerator = (function () {
        function LevelGenerator() {
        }
        LevelGenerator.Create = function () {
            var levelGenerator = new LevelGenerator();
            levelGenerator._m_aLevelCommands = new Array();
            levelGenerator._m_cameraHeight = 1080;
            levelGenerator._m_cadmioConfig = new cnfCadmio_2.CnfCadmio();
            levelGenerator._m_itemManagerConfig = new cnfItemManager_2.CnfItemManager();
            return levelGenerator;
        };
        LevelGenerator.prototype.init = function (_scene, _config) {
            if (!_scene.cache.tilemap.has(_config.map_key)) {
                console.log("map didn't found: " + _config.map_key);
                return;
            }
            var map = _scene.add.tilemap(_config.map_key);
            var gameManager = gameManager_8.GameManager.GetInstance();
            var levelConfiguartion = gameManager.getLevelConfiguration();
            levelConfiguartion.setFromMap(map, 'ConfigurationObjects');
            this.loadMap(map);
            var properties = map.properties;
            var propertiesSize = properties.length;
            var propertyIndex = 0;
            var property;
            var propertyName;
            var propertyValue;
            while (propertyIndex < propertiesSize) {
                property = properties[propertyIndex];
                propertyName = property.name;
                propertyValue = property.value;
                if (propertyName == "camera_speed") {
                    gameManager.setCameraSpeed(propertyValue);
                }
                ++propertyIndex;
            }
            return;
        };
        LevelGenerator.prototype.loadMap = function (_map) {
            var map_height = _map.heightInPixels;
            var objectLayer;
            var aLayerNames = _map.getObjectLayerNames();
            var layerName;
            while (aLayerNames.length) {
                layerName = aLayerNames.pop();
                objectLayer = _map.getObjectLayer(layerName);
                if (objectLayer == null) {
                    continue;
                }
                var index = 0;
                var objectSize = objectLayer.objects.length;
                var object = void 0;
                var objectType = void 0;
                while (index < objectSize) {
                    object = objectLayer.objects[index];
                    objectType = object.type;
                    if (objectType != null && objectType != "") {
                        if (object.x === undefined && object.y === undefined) {
                            ++index;
                            continue;
                        }
                        object.y = map_height - object.y;
                        this.addSpawnCommandFromObject(object);
                    }
                    ++index;
                }
            }
            this.orderCommands();
            return;
        };
        LevelGenerator.prototype.update = function (_dt, _distance) {
            var aCommands = this._m_aLevelCommands;
            var command;
            var position;
            while (aCommands.length) {
                command = aCommands[aCommands.length - 1];
                position = command.getPosition();
                if (position.y <= _distance) {
                    command.exec(this);
                    command.destroy();
                    aCommands.pop();
                }
                else {
                    break;
                }
            }
            return;
        };
        LevelGenerator.prototype.orderCommands = function () {
            this._m_aLevelCommands.sort(function (a, b) {
                return b.getPosition().y - a.getPosition().y;
            });
            return;
        };
        LevelGenerator.prototype.addSpawnCommandFromObject = function (_object) {
            if (_object.x == null || _object.y == null) {
                return;
            }
            var type = _object.type;
            switch (type) {
                case "Errante":
                    this._createErranteCommand(_object);
                    return;
                case "Ranger":
                    this._createRangerCommand(_object);
                    return;
                case "Sonic":
                    this._createSonicCommand(_object);
                    return;
                case "ArponShip":
                    this._createArponShipCommand(_object);
                    break;
                case "Cadmio":
                    this._createCadmioSpawnCommand(_object);
                    return;
                case "Canus":
                    this._createCanusSpawnCommand(_object);
                    return;
                case "Boss":
                    this._bossEnter(_object);
                    return;
                default:
                    return;
            }
        };
        LevelGenerator.prototype.setCameraHeigth = function (_height) {
            this._m_cameraHeight = _height;
        };
        LevelGenerator.prototype.destroy = function () {
            var aCommands = this._m_aLevelCommands;
            var command;
            while (aCommands.length) {
                command = aCommands.pop();
                command.destroy();
            }
            aCommands = null;
            return;
        };
        LevelGenerator.prototype._createErranteCommand = function (_object) {
            var config = new cnfErrante_1.CnfErrante();
            config.setFromObject(_object);
            var command = new cmdSpawnErrante_1.CmdSpawnErrante(_object.x, _object.y, config);
            this._m_aLevelCommands.push(command);
            return;
        };
        LevelGenerator.prototype._createRangerCommand = function (_object) {
            var config = new cnfRangerConfig_1.CnfRangerConfig();
            config.setFromObject(_object);
            var command = new cmdSpawnRanger_1.CmdSpawnRanger(_object.x, _object.y, config);
            this._m_aLevelCommands.push(command);
            return;
        };
        LevelGenerator.prototype._createSonicCommand = function (_object) {
            var config = new cnfSonic_1.CnfSonic();
            config.setFromObject(_object);
            var command = new cmdSpawnSonic_1.CmdSpawnSonic(_object.x, _object.y, config);
            this._m_aLevelCommands.push(command);
            return;
        };
        LevelGenerator.prototype._createArponShipCommand = function (_object) {
            var config = new cnfArponShip_1.CnfArponShip();
            config.setFromObject(_object);
            var command = new cmdSpawnArponShip_1.CmdSpawnArponShip(_object.x, _object.y, config);
            this._m_aLevelCommands.push(command);
            return;
        };
        LevelGenerator.prototype._createCadmioSpawnCommand = function (_object) {
            this._adjustPositionByAnchor(_object, 0.5, 0.5);
            var command = new cmdSpawnCadmio_1.CmdSpawnCadmio(_object.x, _object.y);
            this._m_aLevelCommands.push(command);
            return;
        };
        LevelGenerator.prototype._createCanusSpawnCommand = function (_object) {
            this._adjustPositionByAnchor(_object, 0.5, 0.5);
            var command = new cmdSpawnCanus_1.CmdSpawnCanus(_object.x, _object.y);
            this._m_aLevelCommands.push(command);
            return;
        };
        LevelGenerator.prototype._bossEnter = function (_object) {
            var command = new cmdEnterBoss_1.CmdEnterBoss();
            command.setPosition(_object.x, _object.y);
            this._m_aLevelCommands.push(command);
        };
        LevelGenerator.prototype._adjustPositionByAnchor = function (_object, _anchorX, _anchorY) {
            if (_object.width !== undefined && _object.height !== undefined) {
                _object.x -= _object.width * _anchorX;
                _object.y -= _object.width * _anchorY;
            }
            return;
        };
        return LevelGenerator;
    }());
    exports.LevelGenerator = LevelGenerator;
});
define("game/src/ts_src/levelGenerator/nullLevelGenerator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullLevelGenerator = void 0;
    var NullLevelGenerator = (function () {
        function NullLevelGenerator() {
        }
        NullLevelGenerator.prototype.loadMap = function (_map) { };
        NullLevelGenerator.prototype.update = function (_dt, _distance) { };
        NullLevelGenerator.prototype.setCameraHeigth = function (_height) { };
        NullLevelGenerator.prototype.destroy = function () { };
        return NullLevelGenerator;
    }());
    exports.NullLevelGenerator = NullLevelGenerator;
});
define("game/src/ts_src/messages/msgEnemySpawn", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MsgEnemySpawn = void 0;
    var MsgEnemySpawn = (function () {
        function MsgEnemySpawn(_enemy_type, _x, _y) {
            this.enemy_type = _enemy_type;
            this.x = _x;
            this.y = _y;
            return;
        }
        return MsgEnemySpawn;
    }());
    exports.MsgEnemySpawn = MsgEnemySpawn;
});
define("game/src/ts_src/playerController/nullPlayerController", ["require", "exports", "game/src/ts_src/bulletManager/nullBulletManager"], function (require, exports, nullBulletManager_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullPlayerController = void 0;
    var NullPlayerController = (function () {
        function NullPlayerController() {
        }
        NullPlayerController.prototype.setBulletManager = function (_bulletManager) { };
        NullPlayerController.prototype.getBulletManager = function () {
            return nullBulletManager_4.NullBulletManager.GetInstance();
        };
        NullPlayerController.prototype.setPointer = function (_pointer) { };
        NullPlayerController.prototype.getPointer = function () {
            return null;
        };
        NullPlayerController.prototype.setInputMode = function (_mode) { };
        NullPlayerController.prototype.getPowerShield = function () {
            return null;
        };
        NullPlayerController.prototype.getInputMode = function () {
            return "MIXED";
        };
        NullPlayerController.prototype.setHeroSpeed = function (_speed) { };
        NullPlayerController.prototype.getHeroSpeed = function () {
            return 0;
        };
        NullPlayerController.prototype.setMovementPadding = function (_p1_x, _p1_y, _p2_x, _p2_y) { };
        NullPlayerController.prototype.setPlayer = function (_player) { };
        NullPlayerController.prototype.getPlayer = function () {
            return null;
        };
        NullPlayerController.prototype.getDirection = function () {
            return new Phaser.Math.Vector2(1.0, 0.0);
        };
        NullPlayerController.prototype.setPosition = function (_x, _y) { };
        NullPlayerController.prototype.getPosition = function () {
            return new Phaser.Math.Vector2(0.0, 0.0);
        };
        NullPlayerController.prototype.update = function (_dt) { };
        NullPlayerController.prototype.addKills = function (_kills) {
            return 0;
        };
        NullPlayerController.prototype.getKillCount = function () {
            return 0;
        };
        NullPlayerController.prototype.destroy = function () { };
        return NullPlayerController;
    }());
    exports.NullPlayerController = NullPlayerController;
});
define("game/src/ts_src/components/cmpHeroInput", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_32) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpHeroInput = void 0;
    var CmpHeroInput = (function () {
        function CmpHeroInput() {
        }
        CmpHeroInput.Create = function () {
            var input = new CmpHeroInput();
            input.m_id = _1942enums_32.DC_COMPONENT_ID.kHeroInput;
            input._m_v3 = new Phaser.Math.Vector3();
            input._m_downPosition = new Phaser.Geom.Point();
            input._m_player_speed = 200.0;
            input._m_movement_fn = input._mixedMovement;
            input._m_mode = "MIXED";
            input._m_pointerDown = false;
            return input;
        };
        CmpHeroInput.prototype.init = function (_actor) {
            return;
        };
        CmpHeroInput.prototype.setPointer = function (_pointer) {
            this._m_pointer = _pointer;
            _pointer.isDown;
            return;
        };
        CmpHeroInput.prototype.getPointer = function () {
            return this._m_pointer;
        };
        CmpHeroInput.prototype.setMode = function (_mode) {
            switch (_mode) {
                case "RELATIVE":
                    this._m_mode = "RELATIVE";
                    this._m_movement_fn = this._relativeMovement;
                    break;
                case "ABSOLUTE":
                    this._m_mode = "ABSOLUTE";
                    this._m_movement_fn = this._absoluteMovement;
                    break;
                case "MIXED":
                    this._m_mode = "MIXED";
                    this._m_movement_fn = this._mixedMovement;
                    break;
                default:
                    this._m_mode = "MIXED";
                    this._m_movement_fn = this._mixedMovement;
                    break;
            }
        };
        CmpHeroInput.prototype.getMode = function () {
            return this._m_mode;
        };
        CmpHeroInput.prototype.setSpeed = function (_speed) {
            this._m_player_speed = _speed;
        };
        CmpHeroInput.prototype.getSpeed = function () {
            return this._m_player_speed;
        };
        CmpHeroInput.prototype.update = function (_actor) {
            var pointer = this._m_pointer;
            if (pointer.isDown) {
                if (!this._m_pointerDown) {
                    this._m_pointerDown = !this._m_pointerDown;
                    var sprite = _actor.getWrappedInstance();
                    this._m_downPosition.x = sprite.x;
                    this._m_downPosition.y = sprite.y;
                    pointer.prevPosition.x = pointer.position.x;
                    pointer.prevPosition.y = pointer.position.y;
                    this._m_movement_fn.call(this, _actor);
                    _actor.sendMessage(_1942enums_32.DC_MESSAGE_ID.kPointerPressed, pointer);
                }
                else {
                    this._m_movement_fn.call(this, _actor);
                }
            }
            else {
                if (this._m_pointerDown) {
                    this._m_pointerDown = !this._m_pointerDown;
                    _actor.sendMessage(_1942enums_32.DC_MESSAGE_ID.kPointerReleased, pointer);
                }
            }
            return;
        };
        CmpHeroInput.prototype.receive = function (_id, _obj) { };
        CmpHeroInput.prototype.destroy = function () {
            this._m_pointer = null;
            this._m_movement_fn = null;
            this._m_v3 = null;
            return;
        };
        CmpHeroInput.prototype._absoluteMovement = function (_actor) {
            var pointer = this._m_pointer;
            var heroSprite = _actor.getWrappedInstance();
            var heroPosition = new Phaser.Math.Vector2(heroSprite.x, heroSprite.y);
            this._m_v3.x = pointer.position.x - heroPosition.x;
            this._m_v3.y = pointer.position.y - heroPosition.y;
            if (this._m_v3.length() > this._m_player_speed) {
                this._m_v3.normalize();
                this._m_v3.x *= this._m_player_speed;
                this._m_v3.y *= this._m_player_speed;
            }
            _actor.sendMessage(_1942enums_32.DC_MESSAGE_ID.kAgentMove, this._m_v3);
            return;
        };
        CmpHeroInput.prototype._relativeMovement = function (_actor) {
            var pointer = this._m_pointer;
            this._m_v3.x = this._m_downPosition.x + (pointer.position.x - pointer.downX);
            this._m_v3.y = this._m_downPosition.y + (pointer.position.y - pointer.downY);
            _actor.sendMessage(_1942enums_32.DC_MESSAGE_ID.kToPosition, this._m_v3);
            return;
        };
        CmpHeroInput.prototype._mixedMovement = function (_actor) {
            var pointer = this._m_pointer;
            var heroSprite = _actor.getWrappedInstance();
            var heroPosition = new Phaser.Math.Vector2(heroSprite.x, heroSprite.y);
            this._m_v3.x = pointer.position.x - heroPosition.x;
            if (this._m_v3.x > this._m_player_speed) {
                this._m_v3.x = this._m_player_speed;
            }
            this._m_v3.y = this._m_downPosition.y + (pointer.position.y - pointer.downY);
            _actor.sendMessage(_1942enums_32.DC_MESSAGE_ID.kMixedMovement, this._m_v3);
            return;
        };
        return CmpHeroInput;
    }());
    exports.CmpHeroInput = CmpHeroInput;
});
define("game/src/ts_src/components/cmpMovement", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_33) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpMovement = void 0;
    var CmpMovement = (function () {
        function CmpMovement() {
        }
        CmpMovement.Create = function () {
            var movement = new CmpMovement();
            movement.m_id = _1942enums_33.DC_COMPONENT_ID.kMovement;
            movement._limit_p1 = new Phaser.Geom.Point(0.0, 0.0);
            movement._limit_p2 = new Phaser.Geom.Point(500.0, 500.0);
            movement._m_prevPosition = new Phaser.Geom.Point(0.0, 0.0);
            movement._m_direction = new Phaser.Math.Vector2(1.0, 0.0);
            movement._m_isDirty = true;
            return movement;
        };
        CmpMovement.prototype.init = function (_actor) {
            this._m_sprite = _actor.getWrappedInstance();
            return;
        };
        CmpMovement.prototype.setBounding = function (_p1_x, _p1_y, _p2_x, _p2_y) {
            this._limit_p1.x = _p1_x;
            this._limit_p1.y = _p1_y;
            this._limit_p2.x = _p2_x;
            this._limit_p2.y = _p2_y;
            return;
        };
        CmpMovement.prototype.update = function (_actor) { };
        CmpMovement.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_33.DC_MESSAGE_ID.kPointerMoved:
                    {
                        var pointer = _obj;
                        this.setPosition(pointer.position.x, pointer.position.y);
                    }
                    return;
                case _1942enums_33.DC_MESSAGE_ID.kAgentMove:
                    {
                        var movement = _obj;
                        var sprite = this._m_sprite;
                        this.setPosition(sprite.x + movement.x, sprite.y + movement.y);
                    }
                    return;
                case _1942enums_33.DC_MESSAGE_ID.kAgentMove:
                    {
                        var movement = _obj;
                        var sprite = this._m_sprite;
                        this.setPosition(sprite.x + movement.x, sprite.y + movement.y);
                    }
                    return;
                case _1942enums_33.DC_MESSAGE_ID.kToPosition:
                    {
                        var positon = _obj;
                        this.setPosition(positon.x, positon.y);
                    }
                    return;
                case _1942enums_33.DC_MESSAGE_ID.kMixedMovement:
                    {
                        var positon = _obj;
                        this.setPosition(this._m_sprite.x + positon.x, positon.y);
                    }
                    return;
                default:
                    return;
            }
        };
        CmpMovement.prototype.setPosition = function (_x, _y) {
            var sprite = this._m_sprite;
            var position = new Phaser.Math.Vector2(_x, _y);
            this._safePosition(position);
            this._m_prevPosition.setTo(sprite.x, sprite.y);
            this._m_sprite.setPosition(position.x, position.y);
            this._m_isDirty = true;
            return;
        };
        CmpMovement.prototype.getDirection = function () {
            if (this._m_isDirty) {
                var sprite = this._m_sprite;
                var prevPos = this._m_prevPosition;
                this._m_direction.setTo(sprite.x - prevPos.x, sprite.y - prevPos.y);
                this._m_direction.normalize();
                this._m_isDirty = false;
            }
            return this._m_direction;
        };
        CmpMovement.prototype.destroy = function () {
            this._m_sprite = null;
            return;
        };
        CmpMovement.prototype._safePosition = function (_position) {
            var p1 = this._limit_p1;
            var p2 = this._limit_p2;
            if (_position.x < p1.x) {
                _position.x = p1.x;
            }
            else if (_position.x > p2.x) {
                _position.x = p2.x;
            }
            if (_position.y < p1.y) {
                _position.y = p1.y;
            }
            else if (_position.y > p2.y) {
                _position.y = p2.y;
            }
            return;
        };
        return CmpMovement;
    }());
    exports.CmpMovement = CmpMovement;
});
define("game/src/ts_src/states/IBaseState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/states/IAnimationState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/states/nullState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullState = void 0;
    var NullState = (function () {
        function NullState() {
        }
        NullState.Prepare = function () {
            NullState._INSTANCE = new NullState();
            NullState._INSTANCE.m_id = "";
            return;
        };
        NullState.ShutDown = function () {
            NullState._INSTANCE = null;
            return;
        };
        NullState.GetInstance = function () {
            return NullState._INSTANCE;
        };
        NullState.prototype.onEnter = function () { };
        NullState.prototype.onExit = function () { };
        NullState.prototype.receive = function (_id, _obj) { };
        NullState.prototype.update = function () { };
        NullState.prototype.destroy = function () { };
        return NullState;
    }());
    exports.NullState = NullState;
});
define("game/src/ts_src/components/cmpAnimation", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/states/nullState"], function (require, exports, _1942enums_34, nullState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpAnimation = void 0;
    var CmpAnimation = (function () {
        function CmpAnimation() {
        }
        CmpAnimation.Create = function () {
            var anim = new CmpAnimation();
            anim.m_id = _1942enums_34.DC_COMPONENT_ID.kAnimation;
            anim._m_states = new Map();
            anim._m_activeState = nullState_1.NullState.GetInstance();
            return anim;
        };
        CmpAnimation.prototype.init = function (_actor) {
            this._m_actor = _actor;
            this._m_sprite = _actor.getWrappedInstance();
            return;
        };
        CmpAnimation.prototype.update = function (_actor) {
            this._m_activeState.update();
            return;
        };
        CmpAnimation.prototype.receive = function (_id, _obj) {
            this._m_activeState.receive(_id, _obj);
            return;
        };
        CmpAnimation.prototype.addState = function (_state) {
            _state.m_component = this;
            this._m_states.set(_state.m_id, _state);
            return;
        };
        CmpAnimation.prototype.removeState = function (_id) {
            if (this._m_states.has(_id)) {
                this._m_states.delete(_id);
            }
            return;
        };
        CmpAnimation.prototype.setActive = function (_id) {
            var state;
            if (_id === undefined) {
                state = nullState_1.NullState.GetInstance();
            }
            else {
                state = this.getState(_id);
            }
            this._m_activeState.onExit();
            this._m_activeState = state;
            this._m_activeState.onEnter();
            return;
        };
        CmpAnimation.prototype.getState = function (_id) {
            if (this._m_states.has(_id)) {
                return this._m_states.get(_id);
            }
            else {
                return nullState_1.NullState.GetInstance();
            }
        };
        CmpAnimation.prototype.getSprite = function () {
            return this._m_sprite;
        };
        CmpAnimation.prototype.getActor = function () {
            return this._m_actor;
        };
        CmpAnimation.prototype.destroy = function () {
            this._m_states.forEach(function (_state) {
                _state.destroy();
            });
            this._m_states.clear();
            this._m_states = null;
            this._m_activeState = nullState_1.NullState.GetInstance();
            this._m_sprite = null;
            this._m_actor = null;
            return;
        };
        return CmpAnimation;
    }());
    exports.CmpAnimation = CmpAnimation;
});
define("game/src/ts_src/states/ICmpState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/states/heroController/sttHeroBarrelRoll", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, _1942enums_35, gameManager_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SttHeroBarrelRoll = void 0;
    var SttHeroBarrelRoll = (function () {
        function SttHeroBarrelRoll() {
            this.m_id = "barrelRoll";
            this._m_gameManager = gameManager_9.GameManager.GetInstance();
            this._m_stateDuration = 1.0;
            this._reset();
            return;
        }
        SttHeroBarrelRoll.prototype.onEnter = function () {
            if (this._m_controller != null) {
                var actor = this._m_controller.getActor();
                var sprite = actor.getWrappedInstance();
                sprite.body.enable = false;
                actor.sendMessage(_1942enums_35.DC_MESSAGE_ID.kEnterBarrelRoll, undefined);
            }
            this._reset();
            return;
        };
        SttHeroBarrelRoll.prototype.onExit = function () {
            if (this._m_controller != null) {
                var actor = this._m_controller.getActor();
                var sprite = actor.getWrappedInstance();
                sprite.body.enable = true;
                actor.sendMessage(_1942enums_35.DC_MESSAGE_ID.kExitBarrelRoll, undefined);
            }
            return;
        };
        SttHeroBarrelRoll.prototype.receive = function (_id, _obj) {
            return;
        };
        SttHeroBarrelRoll.prototype.update = function () {
            this._m_time += this._m_gameManager.m_dt;
            if (this._m_time >= this._m_stateDuration) {
                this._m_controller.setActive("normal");
            }
            return;
        };
        SttHeroBarrelRoll.prototype.setStateDuration = function (_duration) {
            this._m_stateDuration = _duration;
            return;
        };
        SttHeroBarrelRoll.prototype.setComponent = function (_component) {
            this._m_controller = _component;
            return;
        };
        SttHeroBarrelRoll.prototype.getComponent = function () {
            return this._m_controller;
        };
        SttHeroBarrelRoll.prototype.destroy = function () {
            this._m_controller = null;
            this._m_gameManager = null;
            return;
        };
        SttHeroBarrelRoll.prototype._reset = function () {
            this._m_time = 0.0;
            return;
        };
        return SttHeroBarrelRoll;
    }());
    exports.SttHeroBarrelRoll = SttHeroBarrelRoll;
});
define("game/src/ts_src/components/cmpPhysicSpriteController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_36) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpPhysicSpriteController = void 0;
    var CmpPhysicSpriteController = (function () {
        function CmpPhysicSpriteController() {
        }
        CmpPhysicSpriteController.Create = function () {
            var controller = new CmpPhysicSpriteController();
            controller.m_id = _1942enums_36.DC_COMPONENT_ID.kPhysicSpriteController;
            return controller;
        };
        CmpPhysicSpriteController.prototype.init = function (_actor) {
            this._m_sprite = _actor.getWrappedInstance();
            return;
        };
        CmpPhysicSpriteController.prototype.update = function (_actor) { };
        CmpPhysicSpriteController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_36.DC_MESSAGE_ID.kToPosition:
                    {
                        var position = _obj;
                        this._m_sprite.setPosition(position.x, position.y);
                    }
                    return;
                case _1942enums_36.DC_MESSAGE_ID.kAgentMove:
                    {
                        var movement = _obj;
                        this._m_sprite.x += movement.x;
                        this._m_sprite.y += movement.y;
                    }
                    return;
            }
        };
        CmpPhysicSpriteController.prototype.destroy = function () {
            if (this._m_sprite != null) {
                this._m_sprite.destroy();
                this._m_sprite = null;
            }
            return;
        };
        return CmpPhysicSpriteController;
    }());
    exports.CmpPhysicSpriteController = CmpPhysicSpriteController;
});
define("game/src/ts_src/components/cmpPlayZone", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_37) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpPlayZone = void 0;
    var CmpPlayZone = (function () {
        function CmpPlayZone() {
        }
        CmpPlayZone.Create = function () {
            var playZone = new CmpPlayZone();
            playZone._m_p1 = new Phaser.Geom.Point();
            playZone._m_p2 = new Phaser.Geom.Point();
            playZone.m_id = _1942enums_37.DC_COMPONENT_ID.kPlayZone;
            return playZone;
        };
        CmpPlayZone.prototype.init = function (_actor) { };
        CmpPlayZone.prototype.setBoundings = function (_x1, _y1, _x2, _y2) {
            this._m_p1.setTo(_x1, _y1);
            this._m_p2.setTo(_x2, _y2);
            return;
        };
        CmpPlayZone.prototype.update = function (_actor) {
            var sprite = _actor.getWrappedInstance();
            var p1 = this._m_p1;
            var p2 = this._m_p2;
            if ((p1.x < sprite.x && sprite.x < p2.x)
                && (p1.y < sprite.y && sprite.y < p2.y)) {
                return;
            }
            _actor.sendMessage(_1942enums_37.DC_MESSAGE_ID.kDesactive, _actor);
            return;
        };
        CmpPlayZone.prototype.receive = function (_id, _obj) { };
        CmpPlayZone.prototype.destroy = function () { };
        return CmpPlayZone;
    }());
    exports.CmpPlayZone = CmpPlayZone;
});
define("game/src/ts_src/itemManager/itemSpawner/IItemSpawner", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/itemManager/itemSpawner/nullItemSpawner", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_38) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullItemSpawner = void 0;
    var NullItemSpawner = (function () {
        function NullItemSpawner() {
        }
        NullItemSpawner.prototype.init = function (_scene, _gameManager, _itemManager) {
            return;
        };
        NullItemSpawner.prototype.update = function (_dt) {
            return;
        };
        NullItemSpawner.prototype.spawn = function (_actor, _x, _y, _data) {
            return;
        };
        NullItemSpawner.prototype.assemble = function (_actor) {
            return;
        };
        NullItemSpawner.prototype.disassemble = function (_actor) {
            return;
        };
        NullItemSpawner.prototype.setItemManager = function (_manager) {
            return;
        };
        NullItemSpawner.prototype.getID = function () {
            return _1942enums_38.DC_ITEM_TYPE.kUndefined;
        };
        NullItemSpawner.prototype.destroy = function () {
            return;
        };
        return NullItemSpawner;
    }());
    exports.NullItemSpawner = NullItemSpawner;
});
define("game/src/ts_src/components/iCmpItemController", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/components/cmpCadmioController", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/itemManager/itemSpawner/nullItemSpawner", "game/src/ts_src/itemManager/NullItemManager"], function (require, exports, _1942enums_39, nullItemSpawner_1, NullItemManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpCadmioController = void 0;
    var CmpCadmioController = (function () {
        function CmpCadmioController() {
        }
        CmpCadmioController.Create = function () {
            var controller = new CmpCadmioController();
            controller.m_id = _1942enums_39.DC_COMPONENT_ID.kItemController;
            controller._m_direction = new Phaser.Math.Vector2();
            controller._m_force = new Phaser.Math.Vector3();
            controller._m_itemManager = new NullItemManager_1.NullItemManager();
            controller._m_itemSpawner = new nullItemSpawner_1.NullItemSpawner();
            controller._m_effectType = _1942enums_39.DC_SECONDARY_ACTION.kUndefined;
            return controller;
        };
        CmpCadmioController.prototype.config = function (_config) {
            this.setSpeed(_config.speed);
            this.setDirection(_config.direction_x, _config.direction_y);
            this.setEffectType(_config.effect_id);
            return;
        };
        CmpCadmioController.prototype.getType = function () {
            return _1942enums_39.DC_ITEM_TYPE.kCadmio;
        };
        CmpCadmioController.prototype.init = function (_actor) { };
        CmpCadmioController.prototype.preUpdate = function (_dt) {
            var mult = _dt * this._m_speed;
            this._m_force.x = this._m_direction.x * mult;
            this._m_force.y = this._m_direction.y * mult;
            return;
        };
        CmpCadmioController.prototype.update = function (_actor) {
            _actor.sendMessage(_1942enums_39.DC_MESSAGE_ID.kAgentMove, this._m_force);
            return;
        };
        CmpCadmioController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_39.DC_MESSAGE_ID.kKill:
                    this._onConsume(_obj);
                    return;
                case _1942enums_39.DC_MESSAGE_ID.kDesactive:
                    this._onConsume(_obj);
                    return;
            }
        };
        CmpCadmioController.prototype.setDirection = function (_x, _y) {
            this._m_direction.setTo(_x, _y);
            return;
        };
        CmpCadmioController.prototype.getDirection = function () {
            return this._m_direction;
        };
        CmpCadmioController.prototype.setSpeed = function (_speed) {
            this._m_speed = _speed;
            return;
        };
        CmpCadmioController.prototype.getSpeed = function () {
            return this._m_speed;
        };
        CmpCadmioController.prototype.setItemSpawner = function (_spawner) {
            this._m_itemSpawner = _spawner;
            return;
        };
        CmpCadmioController.prototype.setItemManager = function (_manager) {
            this._m_itemManager = _manager;
            return;
        };
        CmpCadmioController.prototype.setEffectType = function (_type) {
            this._m_effectType = _type;
            return;
        };
        CmpCadmioController.prototype.getEffectType = function () {
            return this._m_effectType;
        };
        CmpCadmioController.prototype.destroy = function () {
            this._m_direction = null;
            this._m_force = null;
            return;
        };
        CmpCadmioController.prototype._onConsume = function (_actor) {
            this._m_itemSpawner.disassemble(_actor);
            this._m_itemManager.disableActor(_actor);
            return;
        };
        return CmpCadmioController;
    }());
    exports.CmpCadmioController = CmpCadmioController;
});
define("game/src/ts_src/components/cmpItemCollisionController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_40) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpItemCollisionController = void 0;
    var CmpItemCollisionController = (function () {
        function CmpItemCollisionController() {
        }
        CmpItemCollisionController.Create = function () {
            var controller = new CmpItemCollisionController();
            controller.m_id = _1942enums_40.DC_COMPONENT_ID.kCollisionController;
            return controller;
        };
        CmpItemCollisionController.prototype.onCollision = function (_other, _this) {
            var itemController = _this.getComponent(_1942enums_40.DC_COMPONENT_ID.kItemController);
            if (itemController != null) {
                _other.sendMessage(_1942enums_40.DC_MESSAGE_ID.kCollisionItem, itemController);
            }
            _this.sendMessage(_1942enums_40.DC_MESSAGE_ID.kDesactive, _this);
            return;
        };
        CmpItemCollisionController.prototype.init = function (_actor) { };
        CmpItemCollisionController.prototype.update = function (_actor) { };
        CmpItemCollisionController.prototype.receive = function (_id, _obj) { };
        CmpItemCollisionController.prototype.destroy = function () { };
        return CmpItemCollisionController;
    }());
    exports.CmpItemCollisionController = CmpItemCollisionController;
});
define("game/src/ts_src/itemManager/itemSpawner/cadmioSpawner", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpCadmioController", "game/src/ts_src/components/cmpItemCollisionController", "game/src/ts_src/components/cmpNullCollisionController", "game/src/ts_src/configObjects/cnfCadmio"], function (require, exports, _1942enums_41, cmpCadmioController_1, cmpItemCollisionController_1, cmpNullCollisionController_1, cnfCadmio_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CadmioSpawner = void 0;
    var CadmioSpawner = (function () {
        function CadmioSpawner() {
        }
        CadmioSpawner.prototype.init = function (_scene, _gameManager, _itemManager) {
            var cadmioController = this._m_cadmioController;
            if (this._m_cadmioController == null) {
                cadmioController = cmpCadmioController_1.CmpCadmioController.Create();
                this._m_cadmioController = cadmioController;
            }
            var levelConfig = _gameManager.getLevelConfiguration();
            var cadmioConfig = levelConfig.getConfig(_1942enums_41.DC_CONFIG.kCadmio);
            if (cadmioConfig == null) {
                cadmioConfig = new cnfCadmio_3.CnfCadmio();
            }
            cadmioController.config(cadmioConfig);
            cadmioController.setItemSpawner(this);
            if (this._m_itemCollisionController == null) {
                this._m_itemCollisionController = cmpItemCollisionController_1.CmpItemCollisionController.Create();
            }
            this._m_cadmioController = cadmioController;
            this._m_config = cadmioConfig;
            this.setItemManager(_itemManager);
            return;
        };
        CadmioSpawner.prototype.update = function (_dt) {
            this._m_cadmioController.preUpdate(_dt);
            return;
        };
        CadmioSpawner.prototype.spawn = function (_actor, _x, _y, _data) {
            this.assemble(_actor);
            _actor.sendMessage(_1942enums_41.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(_x, _y));
            return;
        };
        CadmioSpawner.prototype.assemble = function (_actor) {
            _actor.addComponent(this._m_cadmioController);
            _actor.addComponent(this._m_itemCollisionController);
            var sprite = _actor.getWrappedInstance();
            sprite.setTexture(this._m_config.texture_key);
            return;
        };
        CadmioSpawner.prototype.disassemble = function (_actor) {
            _actor.removeComponent(_1942enums_41.DC_COMPONENT_ID.kItemController);
            _actor.addComponent(cmpNullCollisionController_1.CmpNullCollisionController.GetInstance());
            return;
        };
        CadmioSpawner.prototype.setItemManager = function (_manager) {
            this._m_cadmioController.setItemManager(_manager);
            this._m_itemManager = _manager;
            return;
        };
        CadmioSpawner.prototype.getID = function () {
            return _1942enums_41.DC_ITEM_TYPE.kCadmio;
        };
        CadmioSpawner.prototype.destroy = function () {
            if (this._m_cadmioController != null) {
                this._m_cadmioController.destroy();
                this._m_cadmioController = null;
            }
            if (this._m_itemCollisionController != null) {
                this._m_itemCollisionController.destroy();
                this._m_itemCollisionController = null;
            }
            this._m_itemManager = null;
            return;
        };
        return CadmioSpawner;
    }());
    exports.CadmioSpawner = CadmioSpawner;
});
define("game/src/ts_src/components/cmpcanusController", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/itemManager/itemSpawner/nullItemSpawner", "game/src/ts_src/itemManager/NullItemManager"], function (require, exports, _1942enums_42, nullItemSpawner_2, NullItemManager_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpCanusController = void 0;
    var CmpCanusController = (function () {
        function CmpCanusController() {
        }
        CmpCanusController.Create = function () {
            var controller = new CmpCanusController();
            controller.m_id = _1942enums_42.DC_COMPONENT_ID.kItemController;
            controller._m_direction = new Phaser.Math.Vector2();
            controller._m_force = new Phaser.Math.Vector3();
            controller._m_itemManager = new NullItemManager_2.NullItemManager();
            controller._m_itemSpawner = new nullItemSpawner_2.NullItemSpawner();
            controller._m_effectType = _1942enums_42.DC_SECONDARY_ACTION.kUndefined;
            return controller;
        };
        CmpCanusController.prototype.config = function (_config) {
            this.setSpeed(_config.speed);
            this.setDirection(_config.direction_x, _config.direction_y);
            this.setEffectType(_config.effect_id);
            return;
        };
        CmpCanusController.prototype.getType = function () {
            return _1942enums_42.DC_ITEM_TYPE.kCanus;
        };
        CmpCanusController.prototype.init = function (_actor) { };
        CmpCanusController.prototype.preUpdate = function (_dt) {
            var mult = _dt * this._m_speed;
            this._m_force.x = this._m_direction.x * mult;
            this._m_force.y = this._m_direction.y * mult;
            return;
        };
        CmpCanusController.prototype.update = function (_actor) {
            _actor.sendMessage(_1942enums_42.DC_MESSAGE_ID.kAgentMove, this._m_force);
            return;
        };
        CmpCanusController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_42.DC_MESSAGE_ID.kKill:
                    this._onConsume(_obj);
                    return;
                case _1942enums_42.DC_MESSAGE_ID.kDesactive:
                    this._onConsume(_obj);
                    return;
            }
        };
        CmpCanusController.prototype.setDirection = function (_x, _y) {
            this._m_direction.setTo(_x, _y);
            return;
        };
        CmpCanusController.prototype.getDirection = function () {
            return this._m_direction;
        };
        CmpCanusController.prototype.setSpeed = function (_speed) {
            this._m_speed = _speed;
            return;
        };
        CmpCanusController.prototype.getSpeed = function () {
            return this._m_speed;
        };
        CmpCanusController.prototype.setItemSpawner = function (_spawner) {
            this._m_itemSpawner = _spawner;
            return;
        };
        CmpCanusController.prototype.setItemManager = function (_manager) {
            this._m_itemManager = _manager;
            return;
        };
        CmpCanusController.prototype.setEffectType = function (_type) {
            this._m_effectType = _type;
            return;
        };
        CmpCanusController.prototype.getEffectType = function () {
            return this._m_effectType;
        };
        CmpCanusController.prototype.destroy = function () {
            this._m_direction = null;
            this._m_force = null;
            return;
        };
        CmpCanusController.prototype._onConsume = function (_actor) {
            this._m_itemSpawner.disassemble(_actor);
            this._m_itemManager.disableActor(_actor);
            return;
        };
        return CmpCanusController;
    }());
    exports.CmpCanusController = CmpCanusController;
});
define("game/src/ts_src/itemManager/itemSpawner/canusSpawner", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpcanusController", "game/src/ts_src/components/cmpItemCollisionController", "game/src/ts_src/components/cmpNullCollisionController", "game/src/ts_src/configObjects/cnfCanus"], function (require, exports, _1942enums_43, cmpcanusController_1, cmpItemCollisionController_2, cmpNullCollisionController_2, cnfCanus_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CanusSpawner = void 0;
    var CanusSpawner = (function () {
        function CanusSpawner() {
        }
        CanusSpawner.prototype.init = function (_scene, _gameManager, _itemManager) {
            var canusController = this._m_canusController;
            if (this._m_canusController == null) {
                canusController = cmpcanusController_1.CmpCanusController.Create();
                this._m_canusController = canusController;
            }
            var levelConfig = _gameManager.getLevelConfiguration();
            var canusConfig = levelConfig.getConfig(_1942enums_43.DC_CONFIG.kCanus);
            if (canusConfig == null) {
                canusConfig = new cnfCanus_2.CnfCanus();
            }
            canusController.config(canusConfig);
            canusController.setItemSpawner(this);
            if (this._m_itemCollisionController == null) {
                this._m_itemCollisionController = cmpItemCollisionController_2.CmpItemCollisionController.Create();
            }
            this._m_canusController = canusController;
            this._m_config = canusConfig;
            this.setItemManager(_itemManager);
            return;
        };
        CanusSpawner.prototype.update = function (_dt) {
            this._m_canusController.preUpdate(_dt);
            return;
        };
        CanusSpawner.prototype.spawn = function (_actor, _x, _y, _data) {
            this.assemble(_actor);
            _actor.sendMessage(_1942enums_43.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(_x, _y));
            return;
        };
        CanusSpawner.prototype.assemble = function (_actor) {
            _actor.addComponent(this._m_canusController);
            _actor.addComponent(this._m_itemCollisionController);
            var sprite = _actor.getWrappedInstance();
            sprite.setTexture(this._m_config.texture_key);
            return;
        };
        CanusSpawner.prototype.disassemble = function (_actor) {
            _actor.removeComponent(_1942enums_43.DC_COMPONENT_ID.kItemController);
            _actor.addComponent(cmpNullCollisionController_2.CmpNullCollisionController.GetInstance());
            return;
        };
        CanusSpawner.prototype.setItemManager = function (_manager) {
            this._m_canusController.setItemManager(_manager);
            this._m_itemManager = _manager;
            return;
        };
        CanusSpawner.prototype.getID = function () {
            return _1942enums_43.DC_ITEM_TYPE.kCanus;
        };
        CanusSpawner.prototype.destroy = function () {
            if (this._m_canusController != null) {
                this._m_canusController.destroy();
                this._m_canusController = null;
            }
            if (this._m_itemCollisionController != null) {
                this._m_itemCollisionController.destroy();
                this._m_itemCollisionController = null;
            }
            this._m_itemManager = null;
            return;
        };
        return CanusSpawner;
    }());
    exports.CanusSpawner = CanusSpawner;
});
define("game/src/ts_src/itemManager/ItemManager", ["require", "exports", "optimization/mxObjectPool", "game/src/ts_src/actors/baseActor", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpNullCollisionController", "game/src/ts_src/components/cmpPhysicSpriteController", "game/src/ts_src/components/cmpPlayZone", "game/src/ts_src/configObjects/cnfCadmio", "game/src/ts_src/configObjects/cnfItemManager", "game/src/ts_src/itemManager/itemSpawner/cadmioSpawner", "game/src/ts_src/itemManager/itemSpawner/canusSpawner"], function (require, exports, mxObjectPool_2, baseActor_1, _1942enums_44, cmpNullCollisionController_3, cmpPhysicSpriteController_1, cmpPlayZone_1, cnfCadmio_4, cnfItemManager_3, cadmioSpawner_1, canusSpawner_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ItemManager = void 0;
    var ItemManager = (function () {
        function ItemManager() {
        }
        ItemManager.prototype.init = function (_scene, _gameManager) {
            this.destroy();
            var levelConfig = _gameManager.getLevelConfiguration();
            var cadmioConfig = levelConfig.getConfig(_1942enums_44.DC_CONFIG.kCadmio);
            if (cadmioConfig == null) {
                cadmioConfig = new cnfCadmio_4.CnfCadmio();
            }
            var itemManagerConfig = levelConfig.getConfig(_1942enums_44.DC_CONFIG.kItemManager);
            if (itemManagerConfig == null) {
                itemManagerConfig = new cnfItemManager_3.CnfItemManager();
            }
            this._m_playZone = cmpPlayZone_1.CmpPlayZone.Create();
            this._m_playZone.setBoundings(-itemManagerConfig.playZone_extrude, -itemManagerConfig.playZone_extrude, _scene.game.canvas.width + itemManagerConfig.playZone_extrude, _scene.game.canvas.height + itemManagerConfig.playZone_extrude);
            var pool = mxObjectPool_2.MxObjectPool.Create();
            this._m_pool = pool;
            var bodiesGroup = _scene.physics.add.group();
            this._m_bodiesGroup = bodiesGroup;
            pool.suscribe('elementActive', 'ItemManager', this._onActive, this);
            pool.suscribe('elementDesactive', 'ItemManager', this._onDesactive, this);
            var aitems = new Array();
            var item;
            var sprite;
            var index = 0;
            while (index < itemManagerConfig.pool_size) {
                sprite = bodiesGroup.create(0.0, 0.0, cadmioConfig.texture_key);
                sprite.active = false;
                sprite.visible = false;
                sprite.body.enable = false;
                item = baseActor_1.BaseActor.Create(sprite, "Item_" + index.toString());
                sprite.setData('actor', item);
                item.addComponent(cmpNullCollisionController_3.CmpNullCollisionController.GetInstance());
                item.addComponent(cmpPhysicSpriteController_1.CmpPhysicSpriteController.Create());
                item.addComponent(this._m_playZone);
                item.init();
                aitems.push(item);
                ++index;
            }
            this._m_pool.init(aitems);
            this._hSpawner = new Map();
            var cadmioSpawner = new cadmioSpawner_1.CadmioSpawner();
            cadmioSpawner.init(_scene, _gameManager, this);
            this.addSpawner(cadmioSpawner);
            var canusSpawner = new canusSpawner_1.CanusSpawner();
            canusSpawner.init(_scene, _gameManager, this);
            this.addSpawner(canusSpawner);
            return;
        };
        ItemManager.prototype.update = function (_dt) {
            this._m_dt = _dt;
            this._hSpawner.forEach(this._updateSpawner, this);
            this._m_pool.forEachActive(this._updateItem, this);
            return;
        };
        ItemManager.prototype.spawn = function (_x, _y, _type, _data) {
            if (this._hSpawner.has(_type)) {
                var spawner = this._hSpawner.get(_type);
                var actor = this._m_pool.get();
                if (actor != null) {
                    spawner.spawn(actor, _x, _y, _data);
                }
            }
            return;
        };
        ItemManager.prototype.addSpawner = function (_spawner) {
            _spawner.setItemManager(this);
            this._hSpawner.set(_spawner.getID(), _spawner);
            return;
        };
        ItemManager.prototype.disableActor = function (_actor) {
            this._m_pool.desactive(_actor);
            return;
        };
        ItemManager.prototype.collisionVsSprite = function (_scene, _body) {
            _scene.physics.add.collider(_body, this._m_bodiesGroup, this._onCollision, undefined, this);
            return;
        };
        ItemManager.prototype.clear = function () {
            if (this._m_pool != null) {
                this._m_pool.forEach(function (_actor) {
                    _actor.destroy();
                    return;
                });
                this._m_pool.clear();
            }
            if (this._hSpawner != null) {
                this._hSpawner.forEach(function (_spawner) {
                    _spawner.destroy();
                    return;
                });
                this._hSpawner.clear();
            }
            if (this._m_bodiesGroup) {
                this._m_bodiesGroup.destroy();
                this._m_bodiesGroup = null;
            }
            return;
        };
        ItemManager.prototype.destroy = function () {
            this.clear();
            this._m_pool = null;
            this._hSpawner = null;
            this._m_playZone = null;
            return;
        };
        ItemManager.prototype._onCollision = function (_other, _item) {
            var itemActor = _item.getData("actor");
            var bulletController = itemActor.getComponent(_1942enums_44.DC_COMPONENT_ID.kCollisionController);
            var otherActor = _other.getData('actor');
            bulletController.onCollision(otherActor, itemActor);
            var otherController = otherActor.getComponent(_1942enums_44.DC_COMPONENT_ID.kCollisionController);
            otherController.onCollision(itemActor, otherActor);
            return;
        };
        ItemManager.prototype._updateSpawner = function (_spawner) {
            _spawner.update(this._m_dt);
            return;
        };
        ItemManager.prototype._updateItem = function (_item) {
            _item.update();
            return;
        };
        ItemManager.prototype._onActive = function (_pool, _args) {
            var item = _args.element;
            var sprite = item.getWrappedInstance();
            sprite.visible = true;
            sprite.active = true;
            sprite.body.enable = true;
            return;
        };
        ItemManager.prototype._onDesactive = function (_pool, _args) {
            var item = _args.element;
            var sprite = item.getWrappedInstance();
            sprite.visible = false;
            sprite.active = false;
            sprite.body.enable = false;
            return;
        };
        return ItemManager;
    }());
    exports.ItemManager = ItemManager;
});
define("game/src/ts_src/states/heroController/sttHeroNormal", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_45) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SttHeroNormal = void 0;
    var SttHeroNormal = (function () {
        function SttHeroNormal() {
            this.m_id = "normal";
            return;
        }
        SttHeroNormal.prototype.onEnter = function () {
            return;
        };
        SttHeroNormal.prototype.onExit = function () {
            return;
        };
        SttHeroNormal.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_45.DC_MESSAGE_ID.kPointerReleased:
                    if (this._m_controller.getSecondaryAction() == _1942enums_45.DC_SECONDARY_ACTION.kShield) {
                        this._m_controller.getPowerShieldActor().sendMessage(_1942enums_45.DC_MESSAGE_ID.kActive, undefined);
                    }
                    else {
                        this._m_controller.setActive("barrelRoll");
                    }
                    return;
                case _1942enums_45.DC_MESSAGE_ID.kPowerShieldActivated:
                    this._m_controller.setActive('powerShield');
                    return;
                case _1942enums_45.DC_MESSAGE_ID.kRangerExplosionHit:
                    this._m_controller.getActor().sendMessage(_1942enums_45.DC_MESSAGE_ID.kHit, _obj);
                    return;
                default:
                    return;
            }
        };
        SttHeroNormal.prototype.update = function () {
            return;
        };
        SttHeroNormal.prototype.setComponent = function (_component) {
            this._m_controller = _component;
            return;
        };
        SttHeroNormal.prototype.getComponent = function () {
            return this._m_controller;
        };
        SttHeroNormal.prototype.destroy = function () {
            this._m_controller = null;
            return;
        };
        return SttHeroNormal;
    }());
    exports.SttHeroNormal = SttHeroNormal;
});
define("game/src/ts_src/states/heroController/sttHeroPowerShield", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_46) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SttHeroPowerShield = void 0;
    var SttHeroPowerShield = (function () {
        function SttHeroPowerShield() {
            this.m_id = "powerShield";
            this._reset();
            return;
        }
        SttHeroPowerShield.prototype.onEnter = function () {
            if (this._m_controller != null) {
                var actor = this._m_controller.getActor();
                var sprite = actor.getWrappedInstance();
                sprite.body.enable = false;
            }
            this._reset();
            return;
        };
        SttHeroPowerShield.prototype.onExit = function () {
            if (this._m_controller != null) {
                var actor = this._m_controller.getActor();
                var sprite = actor.getWrappedInstance();
                sprite.body.enable = true;
            }
            return;
        };
        SttHeroPowerShield.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_46.DC_MESSAGE_ID.kPowerShieldDesactivated:
                    this._m_controller.setActive('normal');
                    return;
            }
            return;
        };
        SttHeroPowerShield.prototype.update = function () {
            return;
        };
        SttHeroPowerShield.prototype.setComponent = function (_component) {
            this._m_controller = _component;
            return;
        };
        SttHeroPowerShield.prototype.getComponent = function () {
            return this._m_controller;
        };
        SttHeroPowerShield.prototype.destroy = function () {
            this._m_controller = null;
            return;
        };
        SttHeroPowerShield.prototype._reset = function () {
            return;
        };
        return SttHeroPowerShield;
    }());
    exports.SttHeroPowerShield = SttHeroPowerShield;
});
define("game/src/ts_src/components/cmpHeroController", ["require", "exports", "game/src/ts_src/commons/1942config", "game/src/ts_src/commons/1942enums", "game/src/ts_src/states/heroController/sttHeroBarrelRoll", "game/src/ts_src/states/heroController/sttHeroNormal", "game/src/ts_src/states/heroController/sttHeroPowerShield"], function (require, exports, _1942config_1, _1942enums_47, sttHeroBarrelRoll_1, sttHeroNormal_1, sttHeroPowerShield_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpHeroController = void 0;
    var CmpHeroController = (function () {
        function CmpHeroController() {
        }
        CmpHeroController.Create = function () {
            var controller = new CmpHeroController();
            controller.m_id = _1942enums_47.DC_COMPONENT_ID.kHeroController;
            controller._m_hStates = new Map();
            controller._m_pressingPointer = false;
            controller._m_secondary_action = _1942enums_47.DC_SECONDARY_ACTION.kUndefined;
            controller.addState(new sttHeroBarrelRoll_1.SttHeroBarrelRoll());
            controller.addState(new sttHeroPowerShield_1.SttHeroPowerShield());
            controller._m_activeState = new sttHeroNormal_1.SttHeroNormal();
            controller.addState(controller._m_activeState);
            controller._m_config = new _1942config_1.CnfHero();
            return controller;
        };
        CmpHeroController.prototype.init = function (_actor) {
            this._m_actor = _actor;
            this._m_activeState.onEnter();
            return;
        };
        CmpHeroController.prototype.update = function (_actor) {
            this._m_activeState.update();
            return;
        };
        CmpHeroController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_47.DC_MESSAGE_ID.kPointerPressed:
                    this._m_pressingPointer = true;
                    if (this._m_secondary_action == _1942enums_47.DC_SECONDARY_ACTION.kShield) {
                        this._m_powerShieldActor.sendMessage(_1942enums_47.DC_MESSAGE_ID.kDesactive, this._m_powerShieldActor);
                        return;
                    }
                    break;
                case _1942enums_47.DC_MESSAGE_ID.kPointerReleased:
                    this._m_pressingPointer = false;
                    break;
                case _1942enums_47.DC_MESSAGE_ID.kCollisionItem:
                    this._onCollisionWithItem(_obj);
                    break;
                case _1942enums_47.DC_MESSAGE_ID.kPowerShieldExplodes:
                    this._m_secondary_action = _1942enums_47.DC_SECONDARY_ACTION.kUndefined;
                    break;
                case _1942enums_47.DC_MESSAGE_ID.kDesactivePowerUps:
                    this._m_secondary_action = _1942enums_47.DC_SECONDARY_ACTION.kUndefined;
                    break;
                default:
                    break;
            }
            this._m_activeState.receive(_id, _obj);
            return;
        };
        CmpHeroController.prototype.setActive = function (_id) {
            if (this._m_hStates.has(_id)) {
                var activeState = this._m_activeState;
                activeState.onExit();
                activeState = this._m_hStates.get(_id);
                activeState.onEnter();
                this._m_activeState = activeState;
            }
            return;
        };
        CmpHeroController.prototype.addState = function (_state) {
            this._m_hStates.set(_state.m_id, _state);
            _state.setComponent(this);
            return;
        };
        CmpHeroController.prototype.getState = function (_id) {
            if (this._m_hStates.has(_id)) {
                return this._m_hStates.get(_id);
            }
            else {
                console.error("State : " + _id + " not found.");
                return null;
            }
        };
        CmpHeroController.prototype.getActor = function () {
            return this._m_actor;
        };
        CmpHeroController.prototype.getSecondaryAction = function () {
            return this._m_secondary_action;
        };
        CmpHeroController.prototype.isPointerPressed = function () {
            return this._m_pressingPointer;
        };
        CmpHeroController.prototype.setConfiguration = function (_config) {
            this._m_config = _config;
            return;
        };
        CmpHeroController.prototype.setPowerShieldActor = function (_powerShield) {
            this._m_powerShieldActor = _powerShield;
            return;
        };
        CmpHeroController.prototype.getPowerShieldActor = function () {
            return this._m_powerShieldActor;
        };
        CmpHeroController.prototype.destroy = function () {
            this._m_actor = null;
            return;
        };
        CmpHeroController.prototype._onCollisionWithItem = function (_itemController) {
            this._m_actor.sendMessage(_1942enums_47.DC_MESSAGE_ID.kSetHealthPoints, this._m_config.health);
            this._m_secondary_action
                = _itemController.getEffectType();
            return;
        };
        return CmpHeroController;
    }());
    exports.CmpHeroController = CmpHeroController;
});
define("game/src/ts_src/states/heroAnimations/stateHeroFFLight", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_48) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StateHeroFFlight = void 0;
    var StateHeroFFlight = (function () {
        function StateHeroFFlight() {
            this.m_id = "Hero_Forward_Flight";
            return;
        }
        StateHeroFFlight.prototype.onEnter = function () {
            var sprite = this.m_component.getSprite();
            sprite.play('D001_Flight');
            sprite.anims.currentAnim.once('repeat', this._onRepeat, this);
            return;
        };
        StateHeroFFlight.prototype.onExit = function () {
            this._removeListener();
            return;
        };
        StateHeroFFlight.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_48.DC_MESSAGE_ID.kEnterBarrelRoll:
                    this.m_component.setActive("Hero_Barrel_Roll");
                    return;
                case _1942enums_48.DC_MESSAGE_ID.kPowerShieldActivated:
                    this.m_component.setActive("Hero_PowerShield");
                    return;
                default:
                    return;
            }
        };
        StateHeroFFlight.prototype.update = function () { };
        StateHeroFFlight.prototype.destroy = function () {
            this._removeListener();
            return;
        };
        StateHeroFFlight.prototype._removeListener = function () {
            var sprite = this.m_component.getSprite();
            sprite.anims.currentAnim.removeAllListeners('repeat');
            return;
        };
        StateHeroFFlight.prototype._onRepeat = function () {
            var actor = this.m_component.getActor();
            var heroController = actor.getComponent(_1942enums_48.DC_COMPONENT_ID.kHeroController);
            if (heroController.isPointerPressed()) {
                var sprite = this.m_component.getSprite();
                sprite.anims.currentAnim.once('repeat', this._onRepeat, this);
            }
            else {
                this.m_component.setActive('Hero_Glide');
            }
            return;
        };
        return StateHeroFFlight;
    }());
    exports.StateHeroFFlight = StateHeroFFlight;
});
define("game/src/ts_src/states/heroAnimations/stateHeroGlide", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_49) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StateHeroGlide = void 0;
    var StateHeroGlide = (function () {
        function StateHeroGlide() {
            this.m_id = "Hero_Glide";
            return;
        }
        StateHeroGlide.prototype.onEnter = function () {
            var sprite = this.m_component.getSprite();
            sprite.play('D001_Glide');
            return;
        };
        StateHeroGlide.prototype.onExit = function () { };
        StateHeroGlide.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_49.DC_MESSAGE_ID.kPointerPressed:
                    this.m_component.setActive("Hero_Forward_Flight");
                    return;
                case _1942enums_49.DC_MESSAGE_ID.kEnterBarrelRoll:
                    this.m_component.setActive("Hero_Barrel_Roll");
                    return;
                case _1942enums_49.DC_MESSAGE_ID.kPowerShieldActivated:
                    this.m_component.setActive("Hero_PowerShield");
                    return;
                default:
                    return;
            }
        };
        StateHeroGlide.prototype.update = function () { };
        StateHeroGlide.prototype.destroy = function () { };
        return StateHeroGlide;
    }());
    exports.StateHeroGlide = StateHeroGlide;
});
define("game/src/ts_src/states/heroBulletController.ts/iSttHeroBullet", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/states/heroBulletController.ts/sttHeroBulletNormal", ["require", "exports", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, nullBulletManager_5, _1942enums_50, gameManager_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SttHeroBulletNormal = void 0;
    var SttHeroBulletNormal = (function () {
        function SttHeroBulletNormal() {
            this.m_id = "Normal";
            this._m_loadingMult = 0.0;
            this._m_loadingTime = 0.0;
            this._m_bulletManager = nullBulletManager_5.NullBulletManager.GetInstance();
            this._m_gameManager = gameManager_10.GameManager.GetInstance();
            this._m_disable = false;
            return;
        }
        SttHeroBulletNormal.prototype.init = function (_actor, _component, _bulletManager, _config) {
            this._m_actor = _actor;
            this._m_bulletManager = _bulletManager;
            this.setComponent(_component);
            if (_config.frecuency > 0) {
                _config.secondsPerBullet = 1.0 / _config.frecuency;
            }
            else {
                _config.secondsPerBullet = 1.0;
            }
            this._m_config = _config;
            return;
        };
        SttHeroBulletNormal.prototype.setComponent = function (_component) {
            this._m_bulletController = _component;
            return;
        };
        SttHeroBulletNormal.prototype.getComponent = function () {
            return this._m_bulletController;
        };
        SttHeroBulletNormal.prototype.onEnter = function () {
            this._m_loadingTime = 0.0;
            this._m_disable = false;
            var heroController = this._m_actor.getComponent(_1942enums_50.DC_COMPONENT_ID.kHeroController);
            this._m_loadingMult = (heroController.isPointerPressed() ? 1.0 : 0.0);
            return;
        };
        SttHeroBulletNormal.prototype.onExit = function () {
            return;
        };
        SttHeroBulletNormal.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_50.DC_MESSAGE_ID.kPointerPressed:
                    this._m_loadingMult = 1.0;
                    return;
                case _1942enums_50.DC_MESSAGE_ID.kPointerReleased:
                    this._m_loadingMult = 0.0;
                    return;
                case _1942enums_50.DC_MESSAGE_ID.kEnterBarrelRoll:
                    this._m_disable = true;
                    return;
                case _1942enums_50.DC_MESSAGE_ID.kExitBarrelRoll:
                    this._m_disable = false;
                    return;
                case _1942enums_50.DC_MESSAGE_ID.kSetBulletManager:
                    this._m_bulletManager = _obj;
                    return;
                case _1942enums_50.DC_MESSAGE_ID.kCollisionItem:
                    this._onItemCollision(_obj);
                    return;
            }
            return;
        };
        SttHeroBulletNormal.prototype.update = function () {
            if (this._m_disable) {
                return;
            }
            var loading = this._m_loadingTime;
            loading += (this._m_gameManager.m_dt * this._m_loadingMult);
            if (loading >= this._m_config.secondsPerBullet) {
                var sprite = this._m_actor.getWrappedInstance();
                this._m_bulletManager.spawn(sprite.x, sprite.y - 110.0, _1942enums_50.DC_BULLET_TYPE.kHeroBasic);
                loading = 0.0;
            }
            this._m_loadingTime = loading;
            return;
        };
        SttHeroBulletNormal.prototype.destroy = function () {
            this._m_bulletManager = null;
            this._m_gameManager = null;
        };
        SttHeroBulletNormal.prototype._onItemCollision = function (_itemController) {
            if (_itemController.getEffectType() == _1942enums_50.DC_SECONDARY_ACTION.KTripleShot) {
                this._m_bulletController.setActiveState('Triple');
            }
            return;
        };
        return SttHeroBulletNormal;
    }());
    exports.SttHeroBulletNormal = SttHeroBulletNormal;
});
define("game/src/ts_src/configObjects/cnfBulletProperties", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CnfBulletProperties = void 0;
    var CnfBulletProperties = (function () {
        function CnfBulletProperties() {
            this.speed = 1200.0;
            this.direction = new Phaser.Math.Vector2(0.0, 1.0);
            this.texture = 'fireball';
            return;
        }
        return CnfBulletProperties;
    }());
    exports.CnfBulletProperties = CnfBulletProperties;
});
define("game/src/ts_src/states/heroBulletController.ts/sttHeroBulletTriple", ["require", "exports", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/configObjects/cnfBulletProperties", "game/src/ts_src/gameManager/gameManager"], function (require, exports, nullBulletManager_6, _1942enums_51, cnfBulletProperties_1, gameManager_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SttHeroBulletTriple = void 0;
    var SttHeroBulletTriple = (function () {
        function SttHeroBulletTriple() {
            this.m_id = "Triple";
            this._m_v1 = new Phaser.Math.Vector2();
            this._m_bulletProperties = new cnfBulletProperties_1.CnfBulletProperties();
            this._m_loadingMult = 0.0;
            this._m_loadingTime = 0.0;
            this._m_bulletManager = nullBulletManager_6.NullBulletManager.GetInstance();
            this._m_gameManager = gameManager_11.GameManager.GetInstance();
            this._m_disable = false;
            return;
        }
        SttHeroBulletTriple.prototype.init = function (_actor, _component, _bulletManager, _config) {
            this._m_actor = _actor;
            this._m_bulletManager = _bulletManager;
            this.setComponent(_component);
            if (_config.frecuency > 0) {
                _config.secondsPerBullet = 1.0 / _config.frecuency;
            }
            else {
                _config.secondsPerBullet = 1.0;
            }
            this._m_config = _config;
            return;
        };
        SttHeroBulletTriple.prototype.setComponent = function (_component) {
            this._m_bulletController = _component;
            return;
        };
        SttHeroBulletTriple.prototype.getComponent = function () {
            return this._m_bulletController;
        };
        SttHeroBulletTriple.prototype.onEnter = function () {
            this._m_loadingTime = 0.0;
            this._m_disable = false;
            var heroController = this._m_actor.getComponent(_1942enums_51.DC_COMPONENT_ID.kHeroController);
            this._m_loadingMult = (heroController.isPointerPressed() ? 1.0 : 0.0);
            return;
        };
        SttHeroBulletTriple.prototype.onExit = function () {
            return;
        };
        SttHeroBulletTriple.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_51.DC_MESSAGE_ID.kPointerPressed:
                    this._m_loadingMult = 1.0;
                    return;
                case _1942enums_51.DC_MESSAGE_ID.kPointerReleased:
                    this._m_loadingMult = 0.0;
                    return;
                case _1942enums_51.DC_MESSAGE_ID.kEnterBarrelRoll:
                    this._m_disable = true;
                    return;
                case _1942enums_51.DC_MESSAGE_ID.kExitBarrelRoll:
                    this._m_disable = false;
                    return;
                case _1942enums_51.DC_MESSAGE_ID.kSetBulletManager:
                    this._m_bulletManager = _obj;
                    return;
                case _1942enums_51.DC_MESSAGE_ID.kCollisionItem:
                    this._onItemCollision(_obj);
                    return;
                case _1942enums_51.DC_MESSAGE_ID.kHit:
                    this._m_actor.sendMessage(_1942enums_51.DC_MESSAGE_ID.kDesactivePowerUps, undefined);
                    return;
                case _1942enums_51.DC_MESSAGE_ID.kDesactivePowerUps:
                    this._m_bulletController.setActiveState('Normal');
                    return;
            }
            return;
        };
        SttHeroBulletTriple.prototype.update = function () {
            if (this._m_disable) {
                return;
            }
            var loading = this._m_loadingTime;
            loading += (this._m_gameManager.m_dt * this._m_loadingMult);
            if (loading >= this._m_config.secondsPerBullet) {
                var sprite = this._m_actor.getWrappedInstance();
                var angle = Phaser.Math.DegToRad(this._m_config.opening);
                var direction = this._m_v1;
                var properties = this._m_bulletProperties;
                properties.direction = direction;
                direction.x = 0.0;
                direction.y = -1.0;
                direction.x = Math.sin(-angle);
                direction.y = -Math.cos(-angle);
                this._m_bulletManager.spawn(sprite.x, sprite.y - 110.0, _1942enums_51.DC_BULLET_TYPE.kTripleSHot, this._m_bulletProperties);
                direction.x = (direction.x * Math.cos(angle)) - (direction.y * Math.sin(angle));
                direction.y = (direction.x * Math.sin(angle)) + (direction.y * Math.cos(angle));
                this._m_bulletManager.spawn(sprite.x, sprite.y - 110.0, _1942enums_51.DC_BULLET_TYPE.kTripleSHot, this._m_bulletProperties);
                direction.x = (direction.x * Math.cos(angle)) - (direction.y * Math.sin(angle));
                direction.y = (direction.x * Math.sin(angle)) + (direction.y * Math.cos(angle));
                this._m_bulletManager.spawn(sprite.x, sprite.y - 110.0, _1942enums_51.DC_BULLET_TYPE.kTripleSHot, this._m_bulletProperties);
                loading = 0.0;
            }
            this._m_loadingTime = loading;
            return;
        };
        SttHeroBulletTriple.prototype.destroy = function () {
            this._m_bulletManager = null;
            this._m_gameManager = null;
        };
        SttHeroBulletTriple.prototype._onItemCollision = function (_itemController) {
            if (_itemController.getEffectType() != _1942enums_51.DC_SECONDARY_ACTION.KTripleShot) {
                this._m_bulletController.setActiveState('Normal');
            }
            return;
        };
        return SttHeroBulletTriple;
    }());
    exports.SttHeroBulletTriple = SttHeroBulletTriple;
});
define("game/src/ts_src/components/cmpFSM", ["require", "exports", "game/src/ts_src/states/nullState"], function (require, exports, nullState_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.cmpFSM = void 0;
    var cmpFSM = (function () {
        function cmpFSM() {
        }
        cmpFSM.prototype.init = function (_actor) { };
        cmpFSM.prototype.update = function (_actor) {
            this._m_active_state.update();
            return;
        };
        cmpFSM.prototype.receive = function (_id, _obj) {
            this._m_active_state.receive(_id, _obj);
            return;
        };
        cmpFSM.prototype.setActiveState = function (_state_name) {
            var activeState = this._m_active_state;
            var hStates = this._m_hStates;
            if (hStates.has(_state_name)) {
                activeState.onExit();
                activeState = hStates.get(_state_name);
                activeState.onEnter();
                this._m_active_state = activeState;
            }
            return;
        };
        cmpFSM.prototype.addState = function (_state) {
            this._m_hStates.set(_state.m_id, _state);
            return;
        };
        cmpFSM.prototype.getState = function (_state_name) {
            if (this._m_hStates.has(_state_name)) {
                return this._m_hStates.get(_state_name);
            }
            return nullState_2.NullState.GetInstance();
        };
        cmpFSM.prototype.destroy = function () { };
        return cmpFSM;
    }());
    exports.cmpFSM = cmpFSM;
});
define("game/src/ts_src/components/cmpHeroBulletController", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/configObjects/cnfBulletStateNormal", "game/src/ts_src/configObjects/cnfBulletStateTriple", "game/src/ts_src/gameManager/gameManager", "game/src/ts_src/states/heroBulletController.ts/sttHeroBulletNormal", "game/src/ts_src/states/heroBulletController.ts/sttHeroBulletTriple", "game/src/ts_src/states/nullState", "game/src/ts_src/components/cmpFSM"], function (require, exports, _1942enums_52, cnfBulletStateNormal_2, cnfBulletStateTriple_2, gameManager_12, sttHeroBulletNormal_1, sttHeroBulletTriple_1, nullState_3, cmpFSM_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpHeroBulletController = void 0;
    var CmpHeroBulletController = (function (_super) {
        __extends(CmpHeroBulletController, _super);
        function CmpHeroBulletController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CmpHeroBulletController.Create = function () {
            var bulletController = new CmpHeroBulletController();
            bulletController.m_id = _1942enums_52.DC_COMPONENT_ID.kHeroBulletController;
            bulletController._m_active_state = nullState_3.NullState.GetInstance();
            bulletController._m_hStates = new Map();
            return bulletController;
        };
        CmpHeroBulletController.prototype.init = function (_actor) {
            var gameManager = gameManager_12.GameManager.GetInstance();
            var levelConfig = gameManager.getLevelConfiguration();
            var stateNormal_config = levelConfig.getConfig(_1942enums_52.DC_CONFIG.kHeroBulletStateNormal);
            if (stateNormal_config == null) {
                stateNormal_config = new cnfBulletStateNormal_2.CnfBulletStateNormal();
            }
            var heroBulletManager = gameManager.getPlayerController().getBulletManager();
            var stateNormal = new sttHeroBulletNormal_1.SttHeroBulletNormal();
            stateNormal.init(_actor, this, heroBulletManager, stateNormal_config);
            this.addState(stateNormal);
            var stateTripleConfig = levelConfig.getConfig(_1942enums_52.DC_CONFIG.kHeroBulletStateTriple);
            if (stateTripleConfig == null) {
                stateTripleConfig = new cnfBulletStateTriple_2.CnfBulletStateTriple();
            }
            var stateTriple = new sttHeroBulletTriple_1.SttHeroBulletTriple();
            stateTriple.init(_actor, this, heroBulletManager, stateTripleConfig);
            this.addState(stateTriple);
            this.setActiveState('Normal');
            return;
        };
        CmpHeroBulletController.prototype.setBulletManager = function (_bulletManager) {
            this._m_hStates.forEach(function (state) {
                state.receive(_1942enums_52.DC_MESSAGE_ID.kSetBulletManager, _bulletManager);
                return;
            });
            return;
        };
        return CmpHeroBulletController;
    }(cmpFSM_1.cmpFSM));
    exports.CmpHeroBulletController = CmpHeroBulletController;
});
define("game/src/ts_src/scoreManager/iScoreManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/components/cmpHeroData", ["require", "exports", "game/src/ts_src/commons/1942enums", "listeners/mxListenerManager", "listeners/mxListener", "game/src/ts_src/gameManager/gameManager"], function (require, exports, _1942enums_53, mxListenerManager_1, mxListener_1, gameManager_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpHeroData = void 0;
    var CmpHeroData = (function () {
        function CmpHeroData() {
        }
        CmpHeroData.Create = function () {
            var data = new CmpHeroData();
            data._m_health = 10;
            data.m_id = _1942enums_53.DC_COMPONENT_ID.kHeroData;
            data._m_listeners = new mxListenerManager_1.MxListenerManager();
            data._m_listeners.addEvent('onHealthChanged');
            return data;
        };
        CmpHeroData.prototype.init = function (_actor) {
            this._m_actor = _actor;
            return;
        };
        CmpHeroData.prototype.update = function (_actor) { };
        CmpHeroData.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_53.DC_MESSAGE_ID.kHit:
                    this._onHit(_obj);
                    return;
                case _1942enums_53.DC_MESSAGE_ID.kSetHealthPoints:
                    this.setHealth(_obj);
                    return;
            }
        };
        CmpHeroData.prototype.setHealth = function (_health) {
            this._m_health = _health;
            this._m_listeners.call('onHealthChanged', this, undefined);
            return;
        };
        CmpHeroData.prototype.getHealth = function () {
            return this._m_health;
        };
        CmpHeroData.prototype.suscribe = function (_event, _username, _function, _context) {
            this._m_listeners.suscribe(_event, _username, new mxListener_1.MxListener(_function, _context));
            return;
        };
        CmpHeroData.prototype.unsuscribe = function (_event, _username) {
            this._m_listeners.unsuscribe(_event, _username);
            return;
        };
        CmpHeroData.prototype.destroy = function () {
            this._m_listeners.destroy();
            return;
        };
        CmpHeroData.prototype._onHit = function (_hitPoints) {
            var health = this._m_health -= _hitPoints;
            if (health <= 0) {
                this._m_actor.sendMessage(_1942enums_53.DC_MESSAGE_ID.kKill, this._m_actor);
                health = 0;
                gameManager_13.GameManager.ReceiveMessage(_1942enums_53.DC_MESSAGE_ID.kMisionFailure, gameManager_13.GameManager.GetInstance());
            }
            this.setHealth(health);
            var gameManager = gameManager_13.GameManager.GetInstance();
            var scoreManager = gameManager.getScoreManager();
            scoreManager.onHeroHit(this._m_actor);
            return;
        };
        return CmpHeroData;
    }());
    exports.CmpHeroData = CmpHeroData;
});
define("game/src/ts_src/states/heroAnimations/stateHeroBarrelRoll", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_54) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StateHeroBarrelRoll = void 0;
    var StateHeroBarrelRoll = (function () {
        function StateHeroBarrelRoll() {
            this.m_id = "Hero_Barrel_Roll";
            return;
        }
        StateHeroBarrelRoll.prototype.onEnter = function () {
            var sprite = this.m_component.getSprite();
            sprite.setAlpha(0.3);
            return;
        };
        StateHeroBarrelRoll.prototype.onExit = function () {
            var sprite = this.m_component.getSprite();
            sprite.setAlpha(1.0);
            return;
        };
        StateHeroBarrelRoll.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_54.DC_MESSAGE_ID.kExitBarrelRoll:
                    {
                        var actor = this.m_component.getActor();
                        var controller = actor.getComponent(_1942enums_54.DC_COMPONENT_ID.kHeroController);
                        if (controller.isPointerPressed()) {
                            this.m_component.setActive('Hero_Forward_Flight');
                        }
                        else {
                            this.m_component.setActive('Hero_Glide');
                        }
                    }
                    return;
            }
            return;
        };
        StateHeroBarrelRoll.prototype.update = function () { };
        StateHeroBarrelRoll.prototype.destroy = function () {
            this.m_component = null;
            return;
        };
        return StateHeroBarrelRoll;
    }());
    exports.StateHeroBarrelRoll = StateHeroBarrelRoll;
});
define("game/src/ts_src/components/cmpPowerShieldController", ["require", "exports", "listeners/mxListener", "listeners/mxListenerManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, mxListener_2, mxListenerManager_2, _1942enums_55, gameManager_14) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpPowerShieldController = void 0;
    var CmpPowerShieldController = (function () {
        function CmpPowerShieldController() {
        }
        CmpPowerShieldController.Create = function () {
            var controller = new CmpPowerShieldController();
            controller.m_id = _1942enums_55.DC_COMPONENT_ID.kPowerShieldComponent;
            controller._m_activeState = controller._updateDesactive;
            controller._m_gameManager = gameManager_14.GameManager.GetInstance();
            controller._m_listeners
                = new mxListenerManager_2.MxListenerManager();
            controller._m_listeners.addEvent('active');
            controller._m_listeners.addEvent('desactive');
            controller._m_listeners.addEvent('progress');
            return controller;
        };
        CmpPowerShieldController.prototype.setConfiguration = function (_config) {
            this._m_config = _config;
            var sprite = this._m_shieldActor.getWrappedInstance();
            this._m_minScale = _config.min_radius / (sprite.width * 0.5);
            this._m_maxScale = _config.max_radius / (sprite.width * 0.5);
            this._m_explosionScale = _config.explosion_radius / (sprite.width * 0.5);
            return;
        };
        CmpPowerShieldController.prototype.setHeroActor = function (_actor) {
            this._m_heroActor = _actor;
            return;
        };
        CmpPowerShieldController.prototype.init = function (_actor) {
            this._m_shieldActor = _actor;
            return;
        };
        CmpPowerShieldController.prototype.update = function (_actor) {
            var sprite = _actor.getWrappedInstance();
            var heroSprite = this._m_heroActor.getWrappedInstance();
            sprite.setPosition(heroSprite.x, heroSprite.y);
            this._m_activeState.call(this);
            return;
        };
        CmpPowerShieldController.prototype.on = function (_event, _username, _fn, _context) {
            this._m_listeners.suscribe(_event, _username, new mxListener_2.MxListener(_fn, _context));
            return;
        };
        CmpPowerShieldController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_55.DC_MESSAGE_ID.kDesactive:
                    if (this._m_activeState != this._updateExplosion) {
                        this.activeDesactiveState();
                    }
                    return;
                case _1942enums_55.DC_MESSAGE_ID.kActive:
                    this.activeGrowingState();
                    return;
            }
        };
        CmpPowerShieldController.prototype.activeDesactiveState = function () {
            var sprite = this._m_shieldActor.getWrappedInstance();
            sprite.setVisible(false);
            sprite.setActive(false);
            sprite.body.enable = false;
            this._m_heroActor.sendMessage(_1942enums_55.DC_MESSAGE_ID.kPowerShieldDesactivated, this._m_shieldActor);
            this._m_activeState = this._updateDesactive;
            this._m_listeners.call('desactive', this, null);
            return;
        };
        CmpPowerShieldController.prototype.activeGrowingState = function () {
            var sprite = this._m_shieldActor.getWrappedInstance();
            sprite.setAlpha(1.0);
            sprite.setScale(this._m_minScale);
            sprite.setVisible(true);
            sprite.setActive(true);
            sprite.body.enable = false;
            this._m_growing_time = 0.0;
            this._m_heroActor.sendMessage(_1942enums_55.DC_MESSAGE_ID.kPowerShieldActivated, this._m_shieldActor);
            this._m_activeState = this._updateGrowing;
            this._m_listeners.call('active', this, null);
            return;
        };
        CmpPowerShieldController.prototype.activeExplodeState = function () {
            var sprite = this._m_shieldActor.getWrappedInstance();
            sprite.setScale(this._m_maxScale);
            sprite.setVisible(true);
            sprite.setActive(true);
            sprite.body.enable = true;
            this._m_growing_time = 0.0;
            this._m_heroActor.sendMessage(_1942enums_55.DC_MESSAGE_ID.kPowerShieldExplodes, this);
            this._m_activeState = this._updateExplosion;
            return;
        };
        CmpPowerShieldController.prototype.destroy = function () {
            this._m_config = null;
            this._m_gameManager = null;
            this._m_heroActor = null;
            this._m_listeners.destroy();
            this._m_listeners = null;
            return;
        };
        CmpPowerShieldController.prototype._updateDesactive = function () {
            return;
        };
        CmpPowerShieldController.prototype._updateGrowing = function () {
            var time = this._m_growing_time + this._m_gameManager.m_dt;
            this._m_growing_time = time;
            var config = this._m_config;
            if (time > config.shield_max_time) {
                time = config.shield_max_time;
                this.activeExplodeState();
            }
            else {
                var maxScale = this._m_maxScale;
                var minScale = this._m_minScale;
                var deltaScale = maxScale - minScale;
                var sprite = this._m_shieldActor.getWrappedInstance();
                var lerp = (time / this._m_config.shield_max_time);
                sprite.setScale(minScale + (deltaScale * lerp));
            }
            this._m_listeners.call('progress', this, time / config.shield_max_time);
            return;
        };
        CmpPowerShieldController.prototype._updateExplosion = function () {
            var time = this._m_growing_time + this._m_gameManager.m_dt;
            this._m_growing_time = time;
            var config = this._m_config;
            if (time > config.explosion_time) {
                this.activeDesactiveState();
            }
            else {
                var maxScale = this._m_explosionScale;
                var minScale = this._m_maxScale;
                var deltaScale = maxScale - minScale;
                var sprite = this._m_shieldActor.getWrappedInstance();
                var lerp = (time / config.explosion_time);
                sprite.setScale(minScale + (deltaScale * lerp));
                sprite.setAlpha(1.0 - lerp);
            }
            return;
        };
        return CmpPowerShieldController;
    }());
    exports.CmpPowerShieldController = CmpPowerShieldController;
});
define("game/src/ts_src/components/cmpPowerShieldCollisionController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_56) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpPowerShieldCollisionController = void 0;
    var CmpPowerShieldCollisionController = (function () {
        function CmpPowerShieldCollisionController() {
        }
        CmpPowerShieldCollisionController.Create = function () {
            var cmp = new CmpPowerShieldCollisionController();
            cmp.m_id = _1942enums_56.DC_COMPONENT_ID.kCollisionController;
            return cmp;
        };
        CmpPowerShieldCollisionController.prototype.onCollision = function (_other, _this) {
            _other.sendMessage(_1942enums_56.DC_MESSAGE_ID.kKill, _other);
            return;
        };
        CmpPowerShieldCollisionController.prototype.init = function (_actor) { };
        CmpPowerShieldCollisionController.prototype.update = function (_actor) { };
        CmpPowerShieldCollisionController.prototype.receive = function (_id, _obj) { };
        CmpPowerShieldCollisionController.prototype.destroy = function () { };
        return CmpPowerShieldCollisionController;
    }());
    exports.CmpPowerShieldCollisionController = CmpPowerShieldCollisionController;
});
define("game/src/ts_src/states/heroAnimations/stateHeroPowerShield", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_57) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StateHeroPowerShield = void 0;
    var StateHeroPowerShield = (function () {
        function StateHeroPowerShield() {
            this.m_id = "Hero_PowerShield";
            return;
        }
        StateHeroPowerShield.prototype.onEnter = function () {
            var sprite = this.m_component.getSprite();
            sprite.setAlpha(0.3);
            return;
        };
        StateHeroPowerShield.prototype.onExit = function () {
            var sprite = this.m_component.getSprite();
            sprite.setAlpha(1.0);
            return;
        };
        StateHeroPowerShield.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_57.DC_MESSAGE_ID.kEnterBarrelRoll:
                    this.m_component.setActive("Hero_Barrel_Roll");
                    return;
                case _1942enums_57.DC_MESSAGE_ID.kPowerShieldDesactivated:
                    this.m_component.setActive('Hero_Forward_Flight');
                    return;
                default:
                    return;
            }
        };
        StateHeroPowerShield.prototype.update = function () { };
        StateHeroPowerShield.prototype.destroy = function () { };
        return StateHeroPowerShield;
    }());
    exports.StateHeroPowerShield = StateHeroPowerShield;
});
define("game/src/ts_src/components/cmpHeroCollision", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_58) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpHeroCollision = void 0;
    var CmpHeroCollision = (function () {
        function CmpHeroCollision() {
        }
        CmpHeroCollision.Create = function () {
            var cmp = new CmpHeroCollision();
            cmp.m_id = _1942enums_58.DC_COMPONENT_ID.kCollisionController;
            return cmp;
        };
        CmpHeroCollision.prototype.onCollision = function (_other, _this) {
            _other.sendMessage(_1942enums_58.DC_MESSAGE_ID.kCollisionWithHero, _this);
            return;
        };
        CmpHeroCollision.prototype.init = function (_actor) { return; };
        CmpHeroCollision.prototype.update = function (_actor) { return; };
        CmpHeroCollision.prototype.receive = function (_id, _obj) { return; };
        CmpHeroCollision.prototype.destroy = function () { return; };
        return CmpHeroCollision;
    }());
    exports.CmpHeroCollision = CmpHeroCollision;
});
define("game/src/ts_src/playerController/playerController", ["require", "exports", "game/src/ts_src/actors/baseActor", "game/src/ts_src/components/cmpHeroInput", "game/src/ts_src/components/cmpMovement", "game/src/ts_src/components/cmpAnimation", "game/src/ts_src/states/heroAnimations/stateHeroFFLight", "game/src/ts_src/states/heroAnimations/stateHeroGlide", "game/src/ts_src/components/cmpHeroBulletController", "game/src/ts_src/commons/1942enums", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/components/cmpHeroData", "game/src/ts_src/components/cmpHeroController", "game/src/ts_src/states/heroAnimations/stateHeroBarrelRoll", "game/src/ts_src/components/cmpPowerShieldController", "game/src/ts_src/components/cmpPowerShieldCollisionController", "game/src/ts_src/states/heroAnimations/stateHeroPowerShield", "game/src/ts_src/components/cmpHeroCollision"], function (require, exports, baseActor_2, cmpHeroInput_1, cmpMovement_1, cmpAnimation_1, stateHeroFFLight_1, stateHeroGlide_1, cmpHeroBulletController_1, _1942enums_59, nullBulletManager_7, cmpHeroData_1, cmpHeroController_1, stateHeroBarrelRoll_1, cmpPowerShieldController_1, cmpPowerShieldCollisionController_1, stateHeroPowerShield_1, cmpHeroCollision_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlayerController = void 0;
    var PlayerController = (function () {
        function PlayerController() {
            this._m_bulletManager = nullBulletManager_7.NullBulletManager.GetInstance();
            return;
        }
        PlayerController.prototype.init = function (_scene, _cnfHero, _cnfPowerShield) {
            this._m_kill_count = 0;
            var heroSprite = _scene.physics.add.sprite(_scene.game.canvas.width * 0.5, _scene.game.canvas.height * 0.5, _cnfHero.texture, _cnfHero.frame);
            var hero = baseActor_2.BaseActor.Create(heroSprite, "Hero");
            heroSprite.setData('actor', hero);
            hero.addComponent(cmpHeroInput_1.CmpHeroInput.Create());
            hero.addComponent(cmpMovement_1.CmpMovement.Create());
            hero.addComponent(cmpAnimation_1.CmpAnimation.Create());
            hero.addComponent(cmpHeroData_1.CmpHeroData.Create());
            hero.addComponent(cmpHeroBulletController_1.CmpHeroBulletController.Create());
            hero.addComponent(cmpHeroCollision_1.CmpHeroCollision.Create());
            hero.addComponent(cmpHeroController_1.CmpHeroController.Create());
            hero.init();
            this.setPlayer(hero);
            var powerShieldSprite = _scene.physics.add.sprite(_scene.game.canvas.width * 0.5, _scene.game.canvas.height * 0.5, _cnfPowerShield.texture_key);
            var powerShield = baseActor_2.BaseActor.Create(powerShieldSprite, 'Hero Power Shield');
            powerShieldSprite.setData('actor', powerShield);
            var cmpShieldController = cmpPowerShieldController_1.CmpPowerShieldController.Create();
            powerShield.addComponent(cmpShieldController);
            var cmpShieldCollision = cmpPowerShieldCollisionController_1.CmpPowerShieldCollisionController.Create();
            powerShield.addComponent(cmpShieldCollision);
            powerShield.init();
            cmpShieldController.setHeroActor(hero);
            cmpShieldController.setConfiguration(_cnfPowerShield);
            var anim = hero.getComponent(_1942enums_59.DC_COMPONENT_ID.kAnimation);
            anim.addState(new stateHeroFFLight_1.StateHeroFFlight());
            anim.addState(new stateHeroGlide_1.StateHeroGlide());
            anim.addState(new stateHeroBarrelRoll_1.StateHeroBarrelRoll());
            anim.addState(new stateHeroPowerShield_1.StateHeroPowerShield());
            anim.setActive('Hero_Forward_Flight');
            if (_scene.game.device.input.touch) {
                if (_scene.input.pointer1 === undefined) {
                    _scene.input.addPointer();
                }
                this.setPointer(_scene.input.pointer1);
            }
            else {
                this.setPointer(_scene.input.activePointer);
            }
            this.setHeroConfiguration(_cnfHero);
            var canvas = _scene.game.canvas;
            this.setMovementPadding(_cnfHero.hero_playzone_padding, _cnfHero.hero_playzone_padding, canvas.width - _cnfHero.hero_playzone_padding, canvas.height - _cnfHero.hero_playzone_padding);
            this.setPowerShieldActor(powerShield);
            cmpShieldController.activeDesactiveState();
            return;
        };
        PlayerController.prototype.setPowerShieldActor = function (_actor) {
            var heroController = this._m_player.getComponent(_1942enums_59.DC_COMPONENT_ID.kHeroController);
            heroController.setPowerShieldActor(_actor);
            this._m_shield = _actor;
            return;
        };
        PlayerController.prototype.getPowerShield = function () {
            return this._m_shield;
        };
        PlayerController.prototype.setBulletManager = function (_bulletManager) {
            this._m_bulletManager = _bulletManager;
            var bulletCntrl = this._m_player.getComponent(_1942enums_59.DC_COMPONENT_ID.kHeroBulletController);
            bulletCntrl.setBulletManager(_bulletManager);
            return;
        };
        PlayerController.prototype.getBulletManager = function () {
            return this._m_bulletManager;
        };
        PlayerController.prototype.setPointer = function (_pointer) {
            var input = this._m_player.getComponent(_1942enums_59.DC_COMPONENT_ID.kHeroInput);
            input.setPointer(_pointer);
            return;
        };
        PlayerController.prototype.getPointer = function () {
            var input = this._m_player.getComponent(_1942enums_59.DC_COMPONENT_ID.kHeroInput);
            return input.getPointer();
        };
        PlayerController.prototype.setInputMode = function (_mode) {
            var input = this._m_player.getComponent(_1942enums_59.DC_COMPONENT_ID.kHeroInput);
            input.setMode(_mode);
            return;
        };
        PlayerController.prototype.getInputMode = function () {
            var input = this._m_player.getComponent(_1942enums_59.DC_COMPONENT_ID.kHeroInput);
            return input.getMode();
        };
        PlayerController.prototype.setHeroConfiguration = function (_config) {
            var heroController = this._m_player.getComponent(_1942enums_59.DC_COMPONENT_ID.kHeroController);
            heroController.setConfiguration(_config);
            this.setPosition(_config.x, _config.y);
            this.setInputMode(_config.movement_mode);
            this.setHeroSpeed(_config.maximum_speed);
            this.setBarrelRollDuration(_config.barrel_roll_duration);
            this.setHeroHealth(_config.health);
            return;
        };
        PlayerController.prototype.setHeroHealth = function (_health) {
            this._m_player.sendMessage(_1942enums_59.DC_MESSAGE_ID.kSetHealthPoints, _health);
            return;
        };
        PlayerController.prototype.setHeroSpeed = function (_speed) {
            var input = this._m_player.getComponent(_1942enums_59.DC_COMPONENT_ID.kHeroInput);
            input.setSpeed(_speed);
            return;
        };
        PlayerController.prototype.getHeroSpeed = function () {
            var input = this._m_player.getComponent(_1942enums_59.DC_COMPONENT_ID.kHeroInput);
            return input.getSpeed();
        };
        PlayerController.prototype.setBarrelRollDuration = function (_duration) {
            var heroController = this._m_player.getComponent(_1942enums_59.DC_COMPONENT_ID.kHeroController);
            var barrelRollState = heroController.getState('barrelRoll');
            barrelRollState.setStateDuration(_duration);
            return;
        };
        PlayerController.prototype.setMovementPadding = function (_p1_x, _p1_y, _p2_x, _p2_y) {
            var movement = this._m_player.getComponent(_1942enums_59.DC_COMPONENT_ID.kMovement);
            movement.setBounding(_p1_x, _p1_y, _p2_x, _p2_y);
            return;
        };
        PlayerController.prototype.setPlayer = function (_player) {
            this._m_player = _player;
            return;
        };
        PlayerController.prototype.getPlayer = function () {
            return this._m_player;
        };
        PlayerController.prototype.setPosition = function (_x, _y) {
            this._m_player.sendMessage(_1942enums_59.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(_x, _y, 0.0));
            return;
        };
        PlayerController.prototype.getPosition = function () {
            var sprite = this._m_player.getWrappedInstance();
            return new Phaser.Math.Vector2(sprite.x, sprite.y);
        };
        PlayerController.prototype.getDirection = function () {
            var movement = this._m_player.getComponent(_1942enums_59.DC_COMPONENT_ID.kMovement);
            return movement.getDirection();
        };
        PlayerController.prototype.update = function (_dt) {
            this._m_player.update();
            this._m_shield.update();
            this._m_bulletManager.update(_dt);
            return;
        };
        PlayerController.prototype.addKills = function (_kills) {
            this._m_kill_count += _kills;
            return this._m_kill_count;
        };
        PlayerController.prototype.getKillCount = function () {
            return this._m_kill_count;
        };
        PlayerController.prototype.destroy = function () {
            this._m_bulletManager.destroy();
            this._m_bulletManager = null;
            var sprite = this._m_player.getWrappedInstance();
            this._m_player.destroy();
            sprite.destroy();
            return;
        };
        return PlayerController;
    }());
    exports.PlayerController = PlayerController;
});
define("game/src/ts_src/components/cmpBulletData", ["require", "exports", "game/src/ts_src/bulletManager/bulletSpawner/nullBulletSpawner", "game/src/ts_src/commons/1942enums"], function (require, exports, nullBulletSpawner_2, _1942enums_60) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpBulletData = void 0;
    var CmpBulletData = (function () {
        function CmpBulletData() {
            this._m_bulletSpawner = nullBulletSpawner_2.NullBulletSpawner.GetInstance();
            this._m_attackPoints = 0.0;
            return;
        }
        CmpBulletData.Create = function () {
            var component = new CmpBulletData;
            component.m_id = _1942enums_60.DC_COMPONENT_ID.kBulletData;
            return component;
        };
        CmpBulletData.prototype.init = function (_actor) { };
        CmpBulletData.prototype.update = function (_actor) { };
        CmpBulletData.prototype.getSpawner = function () {
            return this._m_bulletSpawner;
        };
        CmpBulletData.prototype.setSpawner = function (_spawner) {
            this._m_bulletSpawner = _spawner;
            return;
        };
        CmpBulletData.prototype.getAttackPoints = function () {
            return this._m_attackPoints;
        };
        CmpBulletData.prototype.setAttackPoints = function (_attackPoints) {
            this._m_attackPoints = _attackPoints;
            return;
        };
        CmpBulletData.prototype.receive = function (_id, _obj) { };
        CmpBulletData.prototype.destroy = function () {
            this._m_bulletSpawner = null;
            return;
        };
        return CmpBulletData;
    }());
    exports.CmpBulletData = CmpBulletData;
});
define("game/src/ts_src/components/cmpSimpleBulletControl", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, _1942enums_61, gameManager_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpSimpleBulletController = void 0;
    var CmpSimpleBulletController = (function () {
        function CmpSimpleBulletController() {
        }
        CmpSimpleBulletController.Create = function () {
            var controller = new CmpSimpleBulletController();
            controller._m_gameManager = gameManager_15.GameManager.GetInstance();
            controller._m_direction = new Phaser.Math.Vector2(1.0, 0.0);
            controller._m_force = new Phaser.Math.Vector3();
            controller._m_speed = 0.0;
            controller.m_id = _1942enums_61.DC_COMPONENT_ID.kSimpleBulletControl;
            return controller;
        };
        CmpSimpleBulletController.prototype.init = function (_actor) { };
        CmpSimpleBulletController.prototype.setDirection = function (_x, _y) {
            this._m_direction.setTo(_x, _y);
            this._m_direction.normalize();
            return;
        };
        CmpSimpleBulletController.prototype.getDirection = function () {
            return this._m_direction;
        };
        CmpSimpleBulletController.prototype.setSpeed = function (_speed) {
            this._m_speed = _speed;
            return;
        };
        CmpSimpleBulletController.prototype.update = function (_actor) {
            var mult = this._m_gameManager.m_dt * this._m_speed;
            this._m_force.x = this._m_direction.x * mult;
            this._m_force.y = this._m_direction.y * mult;
            _actor.sendMessage(_1942enums_61.DC_MESSAGE_ID.kAgentMove, this._m_force);
            var sprite = _actor.getWrappedInstance();
            sprite.setAngle(Phaser.Math.RadToDeg(this._m_direction.angle()));
            return;
        };
        CmpSimpleBulletController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_61.DC_MESSAGE_ID.kKill:
                    this._onKill(_obj);
                    return;
                case _1942enums_61.DC_MESSAGE_ID.kDesactive:
                    this._onKill(_obj);
                    return;
                case _1942enums_61.DC_MESSAGE_ID.kDirection:
                    {
                        var direction = _obj;
                        this.setDirection(direction.x, direction.y);
                    }
                    return;
                case _1942enums_61.DC_MESSAGE_ID.kSpeed:
                    this.setSpeed(_obj);
                    return;
            }
        };
        CmpSimpleBulletController.prototype.destroy = function () { };
        CmpSimpleBulletController.prototype._onKill = function (_actor) {
            var data = _actor.getComponent(_1942enums_61.DC_COMPONENT_ID.kBulletData);
            data.getSpawner().disassemble(_actor);
            return;
        };
        return CmpSimpleBulletController;
    }());
    exports.CmpSimpleBulletController = CmpSimpleBulletController;
});
define("game/src/ts_src/pools/basicbulletControlPool", ["require", "exports", "optimization/mxObjectPool", "game/src/ts_src/components/cmpSimpleBulletControl"], function (require, exports, mxObjectPool_3, cmpSimpleBulletControl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BasicBulletControlPool = void 0;
    var BasicBulletControlPool = (function () {
        function BasicBulletControlPool() {
        }
        BasicBulletControlPool.prototype.init = function (_size) {
            this.destroy();
            var pool = mxObjectPool_3.MxObjectPool.Create();
            var aComponents = Array();
            while (_size > 0) {
                aComponents.push(cmpSimpleBulletControl_1.CmpSimpleBulletController.Create());
                --_size;
            }
            pool.init(aComponents);
            this._m_pool = pool;
            return;
        };
        BasicBulletControlPool.prototype.get = function () {
            return this._m_pool.get();
        };
        BasicBulletControlPool.prototype.desactive = function (_cmp) {
            this._m_pool.desactive(_cmp);
            return;
        };
        BasicBulletControlPool.prototype.destroy = function () {
            if (this._m_pool != null) {
                this._m_pool.forEach(function (_cmp) {
                    _cmp.destroy();
                });
                this._m_pool.destroy();
                this._m_pool = null;
            }
            return;
        };
        return BasicBulletControlPool;
    }());
    exports.BasicBulletControlPool = BasicBulletControlPool;
});
define("game/src/ts_src/scoreManager/scoreManager", ["require", "exports", "listeners/mxListener", "listeners/mxListenerManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/configObjects/cnfScoreManager", "game/src/ts_src/gameManager/gameManager"], function (require, exports, mxListener_3, mxListenerManager_3, _1942enums_62, cnfScoreManager_2, gameManager_16) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScoreManager = void 0;
    var ScoreManager = (function () {
        function ScoreManager() {
        }
        ScoreManager.Create = function () {
            var scoreManager = new ScoreManager();
            scoreManager._m_score = 0;
            scoreManager._m_mult = 1;
            scoreManager._m_killCount = 0;
            scoreManager._m_healthBonus = 1;
            scoreManager._m_killBonus = 1;
            scoreManager._m_totalScore = 0;
            scoreManager._m_starsNum = 0;
            scoreManager._m_listener
                = new mxListenerManager_3.MxListenerManager();
            scoreManager._m_listener.addEvent('scoreChanged');
            scoreManager._m_listener.addEvent('multiplierChanged');
            return scoreManager;
        };
        ScoreManager.prototype.init = function (_scene, _config) {
            this._m_config = _config;
            return;
        };
        ScoreManager.prototype.reset = function (_scene, _gameManager) {
            if (this._m_config == null) {
                this._m_config = new cnfScoreManager_2.CnfScoreManager();
            }
            this._m_mult = 1;
            this._m_killCount = 0;
            this._m_healthBonus = 1;
            this._m_killBonus = 1;
            this._m_totalScore = 0;
            this._m_starsNum = 0;
            this.setScore(0.0);
            this.setMultiplier(1);
            return;
        };
        ScoreManager.prototype.update = function (_dt) {
            return;
        };
        ScoreManager.prototype.suscribe = function (_event, _username, _function, _context) {
            this._m_listener.suscribe(_event, _username, new mxListener_3.MxListener(_function, _context));
            return;
        };
        ScoreManager.prototype.unsuscribe = function (_event, _username) {
            this._m_listener.unsuscribe(_event, _username);
            return;
        };
        ScoreManager.prototype.getScore = function () {
            return this._m_score;
        };
        ScoreManager.prototype.setScore = function (_score) {
            this._m_score = _score;
            this._m_listener.call("scoreChanged", this, undefined);
            return;
        };
        ScoreManager.prototype.getMultiplier = function () {
            return this._m_mult;
        };
        ScoreManager.prototype.setMultiplier = function (_mult) {
            this._m_mult = _mult;
            this._m_listener.call("multiplierChanged", this, undefined);
            return;
        };
        ScoreManager.prototype.addScore = function (_points) {
            this._m_score += _points * this._m_mult;
            this._m_listener.call("scoreChanged", this, undefined);
            return;
        };
        ScoreManager.prototype.onMisionComplete = function () {
            var gm = gameManager_16.GameManager.GetInstance();
            var playerController = gm.getPlayerController();
            var killsCount = playerController.getKillCount();
            var enemiesManager = gm.getEnemiesManager();
            var enemyCount = enemiesManager.getEnemiesCount();
            var range = 100 * (killsCount / enemyCount);
            var config = this._m_config;
            if (range >= config.range_A_min) {
                this._m_killBonus = config.range_A_mult;
            }
            else if (range >= config.range_B_min) {
                this._m_killBonus = config.range_B_mult;
            }
            else if (range >= config.range_C_min) {
                this._m_killBonus = config.range_C_mult;
            }
            else {
                this._m_killBonus = 1;
            }
            var hero = playerController.getPlayer();
            var heroData = hero.getComponent(_1942enums_62.DC_COMPONENT_ID.kHeroData);
            range = heroData.getHealth();
            if (range >= config.range_A_min) {
                this._m_healthBonus = config.range_A_mult;
            }
            else if (range >= config.range_B_min) {
                this._m_healthBonus = config.range_B_mult;
            }
            else if (range >= config.range_C_min) {
                this._m_healthBonus = config.range_C_mult;
            }
            else {
                this._m_healthBonus = 1;
            }
            var totalScore = this._m_score
                * this._m_healthBonus
                * this._m_killBonus;
            this._m_totalScore = totalScore;
            if (totalScore >= this._m_config.stars_AAA_min) {
                this._m_starsNum = 3;
            }
            else if (totalScore >= this._m_config.stars_AA_min) {
                this._m_starsNum = 2;
            }
            else if (totalScore >= this._m_config.stars_A_min) {
                this._m_starsNum = 1;
            }
            else {
                this._m_starsNum = 0;
            }
            return;
        };
        ScoreManager.prototype.onMisionFailed = function () { };
        ScoreManager.prototype.destroy = function () {
            this._m_listener.destroy();
            return;
        };
        ScoreManager.prototype.onEnemyKilled = function (_enemy) {
            ++this._m_killCount;
            var mult = 1 + Math.floor(this._m_killCount / this._m_config.kill_for_add);
            this.setMultiplier(mult);
            return;
        };
        ScoreManager.prototype.onHeroHit = function (_actor) {
            this._m_killCount = 0;
            this.setMultiplier(1);
            return;
        };
        ScoreManager.prototype.getKillsBonus = function () {
            return this._m_killBonus;
        };
        ScoreManager.prototype.getHealthBonus = function () {
            return this._m_healthBonus;
        };
        ScoreManager.prototype.getTotalScore = function () {
            return this._m_totalScore;
        };
        ScoreManager.prototype.getStarsNum = function () {
            return this._m_starsNum;
        };
        return ScoreManager;
    }());
    exports.ScoreManager = ScoreManager;
});
define("game/src/ts_src/uiManager/IUIManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/uiManager/NullUIManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullUIManager = void 0;
    var NullUIManager = (function () {
        function NullUIManager() {
        }
        NullUIManager.prototype.init = function (_scene, _gameManager) { };
        NullUIManager.prototype.receive = function (_id, _msg) { };
        NullUIManager.prototype.reset = function (_scene, _gameManager) { };
        NullUIManager.prototype.update = function (_dt) { };
        NullUIManager.prototype.destroy = function () { };
        return NullUIManager;
    }());
    exports.NullUIManager = NullUIManager;
});
define("game/src/ts_src/gameManager/gameManager", ["require", "exports", "commons/mxEnums", "game/src/ts_src/bossManager/NullBossManager", "game/src/ts_src/bulletManager/bulletSpawner/nullBulletSpawner", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpNullCollisionController", "game/src/ts_src/components/cmpNullEnemyController", "game/src/ts_src/enemiesManager/enemySpawner/nullEnemySpawner", "game/src/ts_src/enemiesManager/nullEnemiesManager", "game/src/ts_src/itemManager/NullItemManager", "game/src/ts_src/levelConfiguration/LevelConfiguration", "game/src/ts_src/levelGenerator/ambienceGenerator/ambienceGenerator", "game/src/ts_src/levelGenerator/ambienceGenerator/nullAmbientGenerator", "game/src/ts_src/levelGenerator/levelGenerator", "game/src/ts_src/levelGenerator/nullLevelGenerator", "game/src/ts_src/playerController/nullPlayerController", "game/src/ts_src/playerController/playerController", "game/src/ts_src/pools/basicbulletControlPool", "game/src/ts_src/scoreManager/scoreManager", "game/src/ts_src/states/nullState", "game/src/ts_src/uiManager/NullUIManager"], function (require, exports, mxEnums_3, NullBossManager_1, nullBulletSpawner_3, nullBulletManager_8, _1942enums_63, cmpNullCollisionController_4, cmpNullEnemyController_1, nullEnemySpawner_3, nullEnemiesManager_3, NullItemManager_3, LevelConfiguration_1, ambienceGenerator_1, nullAmbientGenerator_1, levelGenerator_1, nullLevelGenerator_1, nullPlayerController_1, playerController_1, basicbulletControlPool_1, scoreManager_1, nullState_4, NullUIManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameManager = void 0;
    var GameManager = (function () {
        function GameManager() {
        }
        GameManager.Prepare = function () {
            if (GameManager._INSTANCE == null) {
                GameManager._INSTANCE = new GameManager();
                GameManager._INSTANCE._onPrepare();
            }
            return;
        };
        GameManager.Shutdown = function () {
            if (GameManager._INSTANCE != null) {
                GameManager._INSTANCE._onShutdown();
                GameManager._INSTANCE = null;
            }
            return;
        };
        GameManager.GetInstance = function () {
            return GameManager._INSTANCE;
        };
        GameManager.ReceiveMessage = function (_id, _msg) {
            var manager = GameManager._INSTANCE;
            switch (_id) {
                case _1942enums_63.DC_MESSAGE_ID.kAddScorePoints:
                    manager.getScoreManager().addScore(_msg);
                    return;
                case _1942enums_63.DC_MESSAGE_ID.KSpawnEnemy:
                    {
                        var msg = _msg;
                        manager._m_enemiesManager.spawn(msg.x, msg.y, msg.enemy_type);
                    }
                    return;
                case _1942enums_63.DC_MESSAGE_ID.kMisionFailure:
                    manager._onMisionFailure();
                    return;
                case _1942enums_63.DC_MESSAGE_ID.kMisionCompleted:
                    manager._onMisionCompleted();
                    return;
                case _1942enums_63.DC_MESSAGE_ID.kGameReset:
                    manager.gameReset();
                    return;
                default:
                    manager.sendMessageToManagers(_id, _msg);
                    return;
            }
            return;
        };
        GameManager.prototype.init = function () {
            this._m_restartScene = false;
            this._m_gameplayStop = false;
            this._m_distance = 0.0;
            this._m_cameraSpeed = 0.0;
            this.m_dt = 0.0;
            this._m_levelConfiguration = new LevelConfiguration_1.LevelConfiguration();
            this._m_itemManager = new NullItemManager_3.NullItemManager();
            this._m_playerController = new nullPlayerController_1.NullPlayerController();
            this._m_basicBulletControlPool = new basicbulletControlPool_1.BasicBulletControlPool();
            this.setEnemiesManager(nullEnemiesManager_3.NullEnemiesManager.GetInstance());
            this.setScoreManager(scoreManager_1.ScoreManager.Create());
            this.setAmbientGenerator(new nullAmbientGenerator_1.NullAmbientGenerator());
            this.setLevelGenerator(new nullLevelGenerator_1.NullLevelGenerator());
            this.setUIManager(new NullUIManager_1.NullUIManager());
            this.setBossManager(new NullBossManager_1.NullBossManager());
            return;
        };
        GameManager.prototype.reset = function () {
            this._m_uiManager.destroy();
            this._m_uiManager = null;
            this._m_levelGenerator.destroy();
            this._m_levelGenerator = null;
            this._m_ambientGenrator.destroy();
            this._m_ambientGenrator = null;
            this._m_scoreManager.destroy();
            this._m_scoreManager = null;
            this._m_enemiesManager.destroy();
            this._m_enemiesManager = null;
            this._m_playerController.destroy();
            this._m_playerController = null;
            this._m_bossManager.destroy();
            this._m_bossManager = null;
            this._m_basicBulletControlPool.destroy();
            this._m_basicBulletControlPool = null;
            this._m_itemManager.destroy();
            this._m_itemManager = null;
            this._m_levelConfiguration.destroy();
            this._m_levelConfiguration = null;
            this.init();
            return;
        };
        GameManager.prototype.initLevelGenerator = function (_scene, _config) {
            if (this._m_levelGenerator != null) {
                this._m_levelGenerator.destroy();
            }
            var levelGenerator = levelGenerator_1.LevelGenerator.Create();
            levelGenerator.init(_scene, _config);
            levelGenerator.setCameraHeigth(_scene.cameras.main.height);
            this._m_levelGenerator = levelGenerator;
            return mxEnums_3.OPRESULT.kOk;
        };
        GameManager.prototype.initAmbientGenerator = function (_scene, _config) {
            if (this._m_ambientGenrator != null) {
                this._m_ambientGenrator.destroy();
            }
            var ambientGenerator = new ambienceGenerator_1.AmbienceGenerator();
            ambientGenerator.init(_scene, _config);
            this._m_ambientGenrator = ambientGenerator;
            return mxEnums_3.OPRESULT.kOk;
        };
        GameManager.prototype.initHero = function (_scene, _cnfHero) {
            if (this._m_playerController != null) {
                this._m_playerController.destroy();
            }
            var playerController;
            playerController = new playerController_1.PlayerController();
            var shieldConfig = this._m_levelConfiguration.getConfig(_1942enums_63.DC_CONFIG.kHeroPowerShield);
            playerController.init(_scene, _cnfHero, shieldConfig);
            this._m_playerController = playerController;
            return mxEnums_3.OPRESULT.kOk;
        };
        GameManager.prototype.update = function (_dt) {
            this.m_dt = _dt;
            this._m_distance += _dt * this._m_cameraSpeed;
            if (!this._m_gameplayStop) {
                this._m_ambientGenrator.update(_dt);
                this._m_levelGenerator.update(_dt, this._m_distance);
                this._m_playerController.update(_dt);
                this._m_enemiesManager.update(_dt);
                this._m_bossManager.update(_dt);
                this._m_itemManager.update(_dt);
            }
            this._m_scoreManager.update(_dt);
            this._m_uiManager.update(_dt);
            if (this._m_restartScene) {
                this._restart();
            }
            return;
        };
        GameManager.prototype.sendMessageToManagers = function (_id, _msg) {
            this._m_uiManager.receive(_id, _msg);
            this._m_bossManager.receive(_id, _msg);
            return;
        };
        GameManager.prototype.getLevelConfiguration = function () {
            return this._m_levelConfiguration;
        };
        GameManager.prototype.setScoreManager = function (_scoreManager) {
            this._m_scoreManager = _scoreManager;
            return;
        };
        GameManager.prototype.getScoreManager = function () {
            return this._m_scoreManager;
        };
        GameManager.prototype.setPlayerController = function (_playerController) {
            this._m_playerController = _playerController;
            return;
        };
        GameManager.prototype.getPlayerController = function () {
            return this._m_playerController;
        };
        GameManager.prototype.setEnemiesManager = function (_enemiesManager) {
            if (this._m_enemiesManager != null) {
                this._m_enemiesManager.destroy();
            }
            this._m_enemiesManager = _enemiesManager;
            return;
        };
        GameManager.prototype.getEnemiesManager = function () {
            return this._m_enemiesManager;
        };
        GameManager.prototype.setAmbientGenerator = function (_ambientGenerator) {
            this._m_ambientGenrator = _ambientGenerator;
            return;
        };
        GameManager.prototype.getAmbientGenerator = function () {
            return this._m_ambientGenrator;
        };
        GameManager.prototype.setLevelGenerator = function (_levelGenerator) {
            this._m_levelGenerator = _levelGenerator;
            return;
        };
        GameManager.prototype.getLevelGenerator = function () {
            return this._m_levelGenerator;
        };
        GameManager.prototype.setUIManager = function (_uiManager) {
            this._m_uiManager = _uiManager;
            return;
        };
        GameManager.prototype.getUIManager = function () {
            return this._m_uiManager;
        };
        GameManager.prototype.setBossManager = function (_bossManager) {
            this._m_bossManager = _bossManager;
        };
        GameManager.prototype.getBossManager = function () {
            return this._m_bossManager;
        };
        GameManager.prototype.setItemManager = function (_itemManager) {
            this._m_itemManager = _itemManager;
            return;
        };
        GameManager.prototype.getItemManager = function () {
            return this._m_itemManager;
        };
        GameManager.prototype.getBasicBulletControlPool = function () {
            return this._m_basicBulletControlPool;
        };
        GameManager.prototype.setGameScene = function (_scene) {
            this._m_scene = _scene;
            return;
        };
        GameManager.prototype.getGameScene = function () {
            return this._m_scene;
        };
        GameManager.prototype.setCameraSpeed = function (_speed) {
            this._m_cameraSpeed = _speed;
        };
        GameManager.prototype.getCameraSpeed = function () {
            return this._m_cameraSpeed;
        };
        GameManager.prototype.setDistance = function (_distance) {
            this._m_distance = _distance;
            return;
        };
        GameManager.prototype.getDistance = function () {
            return this._m_distance;
        };
        GameManager.prototype.gameReset = function () {
            this._m_restartScene = true;
            return;
        };
        GameManager.prototype._onPrepare = function () {
            nullState_4.NullState.Prepare();
            nullBulletSpawner_3.NullBulletSpawner.Prepare();
            cmpNullEnemyController_1.CmpNullEnemyController.Prepare();
            cmpNullCollisionController_4.CmpNullCollisionController.Prepare();
            nullBulletManager_8.NullBulletManager.Prepare();
            nullEnemySpawner_3.NullEnemySpawner.Prepare();
            nullEnemiesManager_3.NullEnemiesManager.Prepare();
            this.init();
            return;
        };
        GameManager.prototype._onShutdown = function () {
            this.reset();
            nullEnemiesManager_3.NullEnemiesManager.Shutdown();
            nullEnemySpawner_3.NullEnemySpawner.Shutdown();
            nullBulletManager_8.NullBulletManager.Shutdown();
            cmpNullCollisionController_4.CmpNullCollisionController.Shutdown();
            cmpNullEnemyController_1.CmpNullEnemyController.Shutdown();
            nullBulletSpawner_3.NullBulletSpawner.Shutdown();
            nullState_4.NullState.ShutDown();
            return;
        };
        GameManager.prototype._onMisionCompleted = function () {
            this._m_scoreManager.onMisionComplete();
            this._m_uiManager.receive(_1942enums_63.DC_MESSAGE_ID.kMisionCompleted, this);
            this._m_gameplayStop = true;
            return;
        };
        GameManager.prototype._onMisionFailure = function () {
            this._m_scoreManager.onMisionFailed();
            this._m_uiManager.receive(_1942enums_63.DC_MESSAGE_ID.kMisionFailure, this);
            this._m_gameplayStop = true;
            return;
        };
        GameManager.prototype._restart = function () {
            this.reset();
            this._m_scene.scene.start('test');
            return;
        };
        return GameManager;
    }());
    exports.GameManager = GameManager;
});
define("game/src/ts_src/components/cmpBulletCollisionController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_64) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpBulletCollisionController = void 0;
    var CmpBulletCollisionController = (function () {
        function CmpBulletCollisionController() {
        }
        CmpBulletCollisionController.Create = function () {
            var controller = new CmpBulletCollisionController();
            controller.m_id = _1942enums_64.DC_COMPONENT_ID.kCollisionController;
            return controller;
        };
        CmpBulletCollisionController.prototype.onCollision = function (_other, _this) {
            var data = _this.getComponent(_1942enums_64.DC_COMPONENT_ID.kBulletData);
            _other.sendMessage(_1942enums_64.DC_MESSAGE_ID.kHit, data.getAttackPoints());
            _this.sendMessage(_1942enums_64.DC_MESSAGE_ID.kKill, _this);
            return;
        };
        CmpBulletCollisionController.prototype.init = function (_actor) { };
        CmpBulletCollisionController.prototype.update = function (_actor) { };
        CmpBulletCollisionController.prototype.receive = function (_id, _obj) { };
        CmpBulletCollisionController.prototype.destroy = function () { };
        return CmpBulletCollisionController;
    }());
    exports.CmpBulletCollisionController = CmpBulletCollisionController;
});
define("game/src/ts_src/components/cmpMovementBullet", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_65) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpMovementBullet = void 0;
    var CmpMovementBullet = (function () {
        function CmpMovementBullet() {
        }
        CmpMovementBullet.Create = function () {
            var movement = new CmpMovementBullet();
            movement.m_id = _1942enums_65.DC_COMPONENT_ID.kMovementBullet;
            movement._m_prevPosition = new Phaser.Geom.Point(0.0, 0.0);
            movement._m_direction = new Phaser.Math.Vector2(1.0, 0.0);
            movement._m_isDirty = true;
            return movement;
        };
        CmpMovementBullet.prototype.init = function (_actor) {
            this._m_sprite = _actor.getWrappedInstance();
            return;
        };
        CmpMovementBullet.prototype.update = function (_actor) { };
        CmpMovementBullet.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_65.DC_MESSAGE_ID.kAgentMove:
                    {
                        var movement = _obj;
                        this.move(movement.x, movement.y);
                    }
                    return;
                case _1942enums_65.DC_MESSAGE_ID.kToPosition:
                    {
                        var position = _obj;
                        this.setPosition(position.x, position.y);
                    }
                    return;
                default:
                    return;
            }
        };
        CmpMovementBullet.prototype.setPosition = function (_x, _y) {
            var sprite = this._m_sprite;
            this._m_prevPosition.setTo(sprite.x, sprite.y);
            sprite.setPosition(_x, _y);
            this._m_isDirty = true;
            return;
        };
        CmpMovementBullet.prototype.move = function (_x, _y) {
            var sprite = this._m_sprite;
            this._m_prevPosition.setTo(sprite.x, sprite.y);
            sprite.setPosition(sprite.x + _x, sprite.y + _y);
            this._m_isDirty = true;
        };
        CmpMovementBullet.prototype.getDirection = function () {
            if (this._m_isDirty) {
                var sprite = this._m_sprite;
                var prevPos = this._m_prevPosition;
                this._m_direction.setTo(sprite.x - prevPos.x, sprite.y - prevPos.y);
                this._m_direction.normalize();
                this._m_isDirty = false;
            }
            return this._m_direction;
        };
        CmpMovementBullet.prototype.destroy = function () {
            this._m_sprite = null;
            return;
        };
        return CmpMovementBullet;
    }());
    exports.CmpMovementBullet = CmpMovementBullet;
});
define("game/src/ts_src/bulletManager/bulletManager", ["require", "exports", "optimization/mxObjectPool", "game/src/ts_src/actors/baseActor", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpBulletCollisionController", "game/src/ts_src/components/cmpBulletData", "game/src/ts_src/components/cmpMovementBullet", "game/src/ts_src/components/cmpPlayZone", "game/src/ts_src/components/cmpSimpleBulletControl", "game/src/ts_src/bulletManager/bulletSpawner/nullBulletSpawner"], function (require, exports, mxObjectPool_4, baseActor_3, _1942enums_66, cmpBulletCollisionController_1, cmpBulletData_1, cmpMovementBullet_1, cmpPlayZone_2, cmpSimpleBulletControl_2, nullBulletSpawner_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BulletManager = void 0;
    var BulletManager = (function () {
        function BulletManager() {
        }
        BulletManager.Create = function () {
            var bulletMng = new BulletManager();
            var pool = mxObjectPool_4.MxObjectPool.Create();
            pool.suscribe('elementActive', 'BulletManager', bulletMng._onActive, bulletMng);
            pool.suscribe('elementDesactive', 'BulletManager', bulletMng._onDesactive, bulletMng);
            bulletMng._m_pool = pool;
            bulletMng._m_playZone = cmpPlayZone_2.CmpPlayZone.Create();
            bulletMng._m_collisionController = cmpBulletCollisionController_1.CmpBulletCollisionController.Create();
            bulletMng._m_dt = 0.0;
            bulletMng._m_hSpawner = new Map();
            return bulletMng;
        };
        BulletManager.prototype.init = function (_scene, _pool_size, _bullet_sprite, _playzone_p1, _playzone_p2) {
            this._m_playZone.setBoundings(_playzone_p1.x, _playzone_p1.y, _playzone_p2.x, _playzone_p2.y);
            var bodiesGroup = this._m_bodiesGroup;
            if (bodiesGroup != null) {
                bodiesGroup.destroy();
            }
            bodiesGroup = _scene.physics.add.group();
            this._m_bodiesGroup = bodiesGroup;
            var pool = this._m_pool;
            if (pool.getSize()) {
                pool.clear();
            }
            var size = _pool_size;
            var bullet;
            var a_bullets = new Array();
            var sprite;
            var playZoneComponent = this._m_playZone;
            var collisionController = this._m_collisionController;
            while (size > 0) {
                sprite = bodiesGroup.create(0.0, 0.0, _bullet_sprite);
                sprite.active = false;
                sprite.visible = false;
                sprite.body.enable = false;
                bullet = baseActor_3.BaseActor.Create(sprite, "Bullet_" + size.toString());
                sprite.setData('actor', bullet);
                bullet.addComponent(cmpMovementBullet_1.CmpMovementBullet.Create());
                bullet.addComponent(cmpSimpleBulletControl_2.CmpSimpleBulletController.Create());
                bullet.addComponent(cmpBulletData_1.CmpBulletData.Create());
                bullet.addComponent(collisionController);
                bullet.addComponent(playZoneComponent);
                bullet.init();
                a_bullets.push(bullet);
                --size;
            }
            this._m_pool.init(a_bullets);
            return;
        };
        BulletManager.prototype.update = function (_dt) {
            this._m_dt = _dt;
            this._m_hSpawner.forEach(this._updateSpawner, this);
            this._m_pool.forEachActive(this._updateBullet, this);
            return;
        };
        BulletManager.prototype.addSpawner = function (_spawner) {
            var hSpawner = this._m_hSpawner;
            var type = _spawner.getID();
            if (hSpawner.has(type)) {
                var toRemove = hSpawner.get(type);
                toRemove.destroy();
            }
            hSpawner.set(type, _spawner);
            _spawner.setBulletManager(this);
            return;
        };
        BulletManager.prototype.getSpawner = function (_type) {
            var hSpawner = this._m_hSpawner;
            if (hSpawner.has(_type)) {
                return hSpawner.get(_type);
            }
            return nullBulletSpawner_4.NullBulletSpawner.GetInstance();
        };
        BulletManager.prototype.spawn = function (_x, _y, _type, _data) {
            var hSpawner = this._m_hSpawner;
            if (hSpawner.has(_type)) {
                var spawner = hSpawner.get(_type);
                var actor = this._m_pool.get();
                if (actor != null) {
                    spawner.spawn(actor, _x, _y, _data);
                }
            }
            return;
        };
        BulletManager.prototype.getActor = function () {
            return this._m_pool.get();
        };
        BulletManager.prototype.disableActor = function (_actor) {
            this._m_pool.desactive(_actor);
            return;
        };
        BulletManager.prototype.getPool = function () {
            return this._m_pool;
        };
        BulletManager.prototype.clear = function () {
            var hSpawner = this._m_hSpawner;
            hSpawner.forEach(function (_spawner) {
                _spawner.destroy();
            });
            hSpawner.clear();
            var pool = this._m_pool;
            pool.forEach(function (_bullet) {
                _bullet.destroy();
                return;
            });
            pool.clear();
            return;
        };
        BulletManager.prototype.getBodiesGroup = function () {
            return this._m_bodiesGroup;
        };
        BulletManager.prototype.collisionVsGroup = function (_scene, _bodies) {
            _scene.physics.add.collider(_bodies, this._m_bodiesGroup, this._onCollision, undefined, this);
            return;
        };
        BulletManager.prototype.collisionVsSprite = function (_scene, _body) {
            _scene.physics.add.collider(_body, this._m_bodiesGroup, this._onCollision, undefined, this);
            return;
        };
        BulletManager.prototype.destroy = function () {
            this._m_hSpawner.forEach(function (_spawner) {
                _spawner.destroy();
            });
            this._m_hSpawner.clear();
            this._m_hSpawner = null;
            this._m_bodiesGroup.destroy();
            this._m_pool.forEach(function (_actor) {
                var sprite = _actor.getWrappedInstance();
                _actor.destroy();
                sprite.destroy();
                return;
            });
            this._m_pool.destroy();
            this._m_playZone.destroy();
            this._m_playZone = null;
            this._m_collisionController.destroy();
            this._m_playZone = null;
            return;
        };
        BulletManager.prototype._onCollision = function (_other, _bullet) {
            var bulletActor = _bullet.getData("actor");
            var bulletController = bulletActor.getComponent(_1942enums_66.DC_COMPONENT_ID.kCollisionController);
            var otherActor = _other.getData('actor');
            bulletController.onCollision(otherActor, bulletActor);
            var otherController = otherActor.getComponent(_1942enums_66.DC_COMPONENT_ID.kCollisionController);
            otherController.onCollision(bulletActor, otherActor);
            return;
        };
        BulletManager.prototype._updateSpawner = function (_spawner) {
            _spawner.update(this._m_dt);
            return;
        };
        BulletManager.prototype._updateBullet = function (_bullet) {
            _bullet.update();
            return;
        };
        BulletManager.prototype._onActive = function (_pool, _args) {
            var bullet = _args.element;
            var sprite = bullet.getWrappedInstance();
            sprite.visible = true;
            sprite.active = true;
            sprite.body.enable = true;
            return;
        };
        BulletManager.prototype._onDesactive = function (_pool, _args) {
            var bullet = _args.element;
            var sprite = bullet.getWrappedInstance();
            sprite.visible = false;
            sprite.active = false;
            sprite.body.enable = false;
            return;
        };
        return BulletManager;
    }());
    exports.BulletManager = BulletManager;
});
define("game/src/ts_src/components/cmpBasicBulletController", ["require", "exports", "game/src/ts_src/configObjects/cnfEnemyBasicBullet", "game/src/ts_src/commons/1942enums"], function (require, exports, cnfEnemyBasicBullet_2, _1942enums_67) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpBasicBulletController = void 0;
    var CmpBasicBulletController = (function () {
        function CmpBasicBulletController() {
        }
        CmpBasicBulletController.Create = function () {
            var controller = new CmpBasicBulletController();
            controller._m_direction = new Phaser.Math.Vector2(1.0, 0.0);
            controller._m_force = new Phaser.Math.Vector3();
            controller._m_config = new cnfEnemyBasicBullet_2.CnfEnemyBasicBullet();
            controller.m_id = _1942enums_67.DC_COMPONENT_ID.kBasicBulletController;
            return controller;
        };
        CmpBasicBulletController.prototype.init = function (_actor) { };
        CmpBasicBulletController.prototype.setConfiguartion = function (_config) {
            this._m_config = _config;
            return;
        };
        CmpBasicBulletController.prototype.setDirection = function (_x, _y) {
            this._m_direction.setTo(_x, _y);
            this._m_direction.normalize();
            return;
        };
        CmpBasicBulletController.prototype.getDirection = function () {
            return this._m_direction;
        };
        CmpBasicBulletController.prototype.setSpeed = function (_speed) {
            this._m_config.speed = _speed;
            return;
        };
        CmpBasicBulletController.prototype.update = function (_actor) {
            return;
        };
        CmpBasicBulletController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_67.DC_MESSAGE_ID.kKill:
                    this._onKill(_obj);
                    return;
                case _1942enums_67.DC_MESSAGE_ID.kDesactive:
                    this._onKill(_obj);
                    return;
                case _1942enums_67.DC_MESSAGE_ID.kDirection:
                    {
                        var direction = _obj;
                        this.setDirection(direction.x, direction.y);
                    }
                    return;
                case _1942enums_67.DC_MESSAGE_ID.kSpeed:
                    this.setSpeed(_obj);
                    return;
            }
        };
        CmpBasicBulletController.prototype.destroy = function () {
            this._m_config = null;
            return;
        };
        CmpBasicBulletController.prototype._onKill = function (_actor) {
            return;
        };
        return CmpBasicBulletController;
    }());
    exports.CmpBasicBulletController = CmpBasicBulletController;
});
define("game/src/ts_src/bulletManager/bulletSpawner/heroBasicBulletSpawner", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/configObjects/cnfHeroBasicBullet", "game/src/ts_src/gameManager/gameManager", "game/src/ts_src/bulletManager/bulletSpawner/nullBulletSpawner"], function (require, exports, _1942enums_68, cnfHeroBasicBullet_2, gameManager_17, nullBulletSpawner_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HeroBasicBulletSpawner = void 0;
    var HeroBasicBulletSpawner = (function () {
        function HeroBasicBulletSpawner() {
        }
        HeroBasicBulletSpawner.prototype.init = function () {
            var gameManager = gameManager_17.GameManager.GetInstance();
            var levelConfiguration = gameManager.getLevelConfiguration();
            var config = levelConfiguration.getConfig(_1942enums_68.DC_CONFIG.kHeroBasicBullet);
            if (config == null) {
                config = new cnfHeroBasicBullet_2.CnfHeroBasicBullet();
            }
            this.setBulletConfiguration(config);
            return;
        };
        HeroBasicBulletSpawner.Create = function () {
            var spawner = new HeroBasicBulletSpawner;
            spawner.setBulletConfiguration(new cnfHeroBasicBullet_2.CnfHeroBasicBullet());
            return spawner;
        };
        HeroBasicBulletSpawner.prototype.setBulletConfiguration = function (_config) {
            this._m_bulletConfig = _config;
            return;
        };
        HeroBasicBulletSpawner.prototype.update = function (_dt) {
            return;
        };
        HeroBasicBulletSpawner.prototype.spawn = function (_actor, _x, _y, _data) {
            this.assemble(_actor);
            _actor.sendMessage(_1942enums_68.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(_x, _y, 0.0));
            _actor.sendMessage(_1942enums_68.DC_MESSAGE_ID.kDirection, new Phaser.Math.Vector2(0.0, -1.0));
            _actor.sendMessage(_1942enums_68.DC_MESSAGE_ID.kSpeed, this._m_bulletConfig.speed);
            return;
        };
        HeroBasicBulletSpawner.prototype.assemble = function (_actor) {
            var bulletData = _actor.getComponent(_1942enums_68.DC_COMPONENT_ID.kBulletData);
            bulletData.setSpawner(this);
            bulletData.setAttackPoints(this._m_bulletConfig.collision_damage);
            var sprite = _actor.getWrappedInstance();
            var circle_radius = sprite.height * 0.5;
            sprite.body.setCircle(circle_radius, (sprite.width * 0.5) - circle_radius, (sprite.height * 0.5) - circle_radius);
            return;
        };
        HeroBasicBulletSpawner.prototype.disassemble = function (_actor) {
            var bulletData = _actor.getComponent(_1942enums_68.DC_COMPONENT_ID.kBulletData);
            bulletData.setSpawner(nullBulletSpawner_5.NullBulletSpawner.GetInstance());
            this._m_bulletManager.disableActor(_actor);
            return;
        };
        HeroBasicBulletSpawner.prototype.setBulletManager = function (_manager) {
            this._m_bulletManager = _manager;
            return;
        };
        HeroBasicBulletSpawner.prototype.getID = function () {
            return _1942enums_68.DC_BULLET_TYPE.kHeroBasic;
        };
        HeroBasicBulletSpawner.prototype.destroy = function () {
            this._m_bulletConfig = null;
            this._m_bulletManager = null;
            return;
        };
        return HeroBasicBulletSpawner;
    }());
    exports.HeroBasicBulletSpawner = HeroBasicBulletSpawner;
});
define("game/src/ts_src/bulletManager/bulletSpawner/enemyBasicBulletSpawner", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpBasicBulletController", "game/src/ts_src/configObjects/cnfEnemyBasicBullet", "game/src/ts_src/bulletManager/bulletSpawner/nullBulletSpawner"], function (require, exports, _1942enums_69, cmpBasicBulletController_1, cnfEnemyBasicBullet_3, nullBulletSpawner_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EnemyBasicBulletSpawner = void 0;
    var EnemyBasicBulletSpawner = (function () {
        function EnemyBasicBulletSpawner() {
        }
        EnemyBasicBulletSpawner.Create = function () {
            var spawner = new EnemyBasicBulletSpawner;
            var basicMovement = cmpBasicBulletController_1.CmpBasicBulletController.Create();
            basicMovement.setDirection(0.0, 1.0);
            spawner._m_controller = basicMovement;
            spawner._m_direction = new Phaser.Math.Vector2(0.0, 1.0);
            spawner.setBulletConfig(new cnfEnemyBasicBullet_3.CnfEnemyBasicBullet());
            return spawner;
        };
        EnemyBasicBulletSpawner.prototype.init = function () { };
        EnemyBasicBulletSpawner.prototype.update = function (_dt) {
            return;
        };
        EnemyBasicBulletSpawner.prototype.setBulletConfig = function (_config) {
            this._m_controller.setConfiguartion(_config);
            this._m_bulletConfig = _config;
            return;
        };
        EnemyBasicBulletSpawner.prototype.spawn = function (_actor, _x, _y, _data) {
            _actor.sendMessage(_1942enums_69.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(_x, _y, 0.0));
            this.assemble(_actor, _data);
            return;
        };
        EnemyBasicBulletSpawner.prototype.assemble = function (_actor, _data) {
            var sprite = _actor.getWrappedInstance();
            sprite.setTint(0xff0000);
            sprite.setTexture(this._m_bulletConfig.texture_key);
            var circle_radius = sprite.height * 0.5;
            sprite.body.setCircle(circle_radius, (sprite.width * 0.5) - circle_radius, (sprite.height * 0.5) - circle_radius);
            var bulletData = _actor.getComponent(_1942enums_69.DC_COMPONENT_ID.kBulletData);
            bulletData.setSpawner(this);
            bulletData.setAttackPoints(this._m_bulletConfig.collision_damage);
            _actor.addComponent(this._m_controller);
            var direction = _data;
            _actor.sendMessage(_1942enums_69.DC_MESSAGE_ID.kDirection, direction);
            _actor.sendMessage(_1942enums_69.DC_MESSAGE_ID.kSpeed, this._m_bulletConfig.speed);
            return;
        };
        EnemyBasicBulletSpawner.prototype.disassemble = function (_actor) {
            var bulletData = _actor.getComponent(_1942enums_69.DC_COMPONENT_ID.kBulletData);
            bulletData.setSpawner(nullBulletSpawner_6.NullBulletSpawner.GetInstance());
            _actor.removeComponent(_1942enums_69.DC_COMPONENT_ID.kBasicBulletController);
            this._m_bulletManager.disableActor(_actor);
            return;
        };
        EnemyBasicBulletSpawner.prototype.setBulletManager = function (_manager) {
            this._m_bulletManager = _manager;
            return;
        };
        EnemyBasicBulletSpawner.prototype.getID = function () {
            return _1942enums_69.DC_BULLET_TYPE.kEnemyBasic;
        };
        EnemyBasicBulletSpawner.prototype.destroy = function () {
            this._m_controller.destroy();
            this._m_controller = null;
            this._m_bulletManager = null;
            this._m_bulletConfig = null;
            return;
        };
        return EnemyBasicBulletSpawner;
    }());
    exports.EnemyBasicBulletSpawner = EnemyBasicBulletSpawner;
});
define("game/src/ts_src/components/cmpEnemyHealth", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, _1942enums_70, gameManager_18) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpEnemyHealth = void 0;
    var CmpEnemyHealth = (function () {
        function CmpEnemyHealth() {
        }
        CmpEnemyHealth.Create = function () {
            var enemyHealth = new CmpEnemyHealth();
            enemyHealth.m_id = _1942enums_70.DC_COMPONENT_ID.kEnemyHealth;
            enemyHealth._m_iHP = 0;
            return enemyHealth;
        };
        CmpEnemyHealth.prototype.init = function (_actor) {
            this._m_actor = _actor;
            return;
        };
        CmpEnemyHealth.prototype.update = function (_actor) { };
        CmpEnemyHealth.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_70.DC_MESSAGE_ID.kHit:
                    this.hit(_obj);
                    return;
                case _1942enums_70.DC_MESSAGE_ID.kSetHealthPoints:
                    this.setHP(_obj);
                    return;
            }
            return;
        };
        CmpEnemyHealth.prototype.getHP = function () {
            return this._m_iHP;
        };
        CmpEnemyHealth.prototype.setHP = function (_hp) {
            this._m_iHP = _hp;
            return;
        };
        CmpEnemyHealth.prototype.hit = function (_points) {
            var hp = this._m_iHP - _points;
            if (hp <= 0) {
                hp = 0;
                var actor = this._m_actor;
                var gameManager = gameManager_18.GameManager.GetInstance();
                var scoreManager = gameManager.getScoreManager();
                actor.sendMessage(_1942enums_70.DC_MESSAGE_ID.kKill, actor);
                scoreManager.onEnemyKilled(_1942enums_70.DC_ENEMY_TYPE.kUndefined);
                var playerController = gameManager.getPlayerController();
                playerController.addKills(1);
            }
            this._m_iHP = hp;
            return;
        };
        CmpEnemyHealth.prototype.destroy = function () { };
        return CmpEnemyHealth;
    }());
    exports.CmpEnemyHealth = CmpEnemyHealth;
});
define("game/src/ts_src/components/cmpMovementEnemy", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_71) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpMovementEnemy = void 0;
    var CmpMovementEnemy = (function () {
        function CmpMovementEnemy() {
        }
        CmpMovementEnemy.Create = function () {
            var movement = new CmpMovementEnemy();
            movement.m_id = _1942enums_71.DC_COMPONENT_ID.kMovementEnemy;
            movement._m_prevPosition = new Phaser.Geom.Point(0.0, 0.0);
            movement._m_direction = new Phaser.Math.Vector2(1.0, 0.0);
            movement._m_isDirty = true;
            return movement;
        };
        CmpMovementEnemy.prototype.init = function (_actor) {
            this._m_sprite = _actor.getWrappedInstance();
            return;
        };
        CmpMovementEnemy.prototype.update = function (_actor) { };
        CmpMovementEnemy.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_71.DC_MESSAGE_ID.kAgentMove:
                    {
                        var movement = _obj;
                        this.move(movement.x, movement.y);
                    }
                    return;
                case _1942enums_71.DC_MESSAGE_ID.kToPosition:
                    {
                        var position = _obj;
                        this.setPosition(position.x, position.y);
                    }
                    return;
                default:
                    return;
            }
        };
        CmpMovementEnemy.prototype.setPosition = function (_x, _y) {
            var sprite = this._m_sprite;
            this._m_prevPosition.setTo(sprite.x, sprite.y);
            sprite.setPosition(_x, _y);
            this._m_isDirty = true;
            return;
        };
        CmpMovementEnemy.prototype.move = function (_x, _y) {
            var sprite = this._m_sprite;
            this._m_prevPosition.setTo(sprite.x, sprite.y);
            sprite.setPosition(sprite.x + _x, sprite.y + _y);
            this._m_isDirty = true;
        };
        CmpMovementEnemy.prototype.getDirection = function () {
            if (this._m_isDirty) {
                var sprite = this._m_sprite;
                var prevPos = this._m_prevPosition;
                this._m_direction.setTo(sprite.x - prevPos.x, sprite.y - prevPos.y);
                this._m_direction.normalize();
                this._m_isDirty = false;
            }
            return this._m_direction;
        };
        CmpMovementEnemy.prototype.setSprite = function (_sprite) {
            this._m_sprite = _sprite;
            this._m_prevPosition.x = _sprite.x;
            this._m_prevPosition.y = _sprite.y;
            this._m_isDirty = true;
            return;
        };
        CmpMovementEnemy.prototype.destroy = function () {
            this._m_sprite = null;
            return;
        };
        return CmpMovementEnemy;
    }());
    exports.CmpMovementEnemy = CmpMovementEnemy;
});
define("game/src/ts_src/enemiesManager/enemiesManagerConfig", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EnemiesManagerConfig = void 0;
    var EnemiesManagerConfig = (function () {
        function EnemiesManagerConfig() {
        }
        return EnemiesManagerConfig;
    }());
    exports.EnemiesManagerConfig = EnemiesManagerConfig;
});
define("game/src/ts_src/enemiesManager/enemiesManager", ["require", "exports", "optimization/mxObjectPool", "game/src/ts_src/actors/baseActor", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpEnemyHealth", "game/src/ts_src/components/cmpMovementEnemy", "game/src/ts_src/components/cmpNullCollisionController", "game/src/ts_src/components/cmpNullEnemyController", "game/src/ts_src/enemiesManager/enemySpawner/nullEnemySpawner"], function (require, exports, mxObjectPool_5, baseActor_4, nullBulletManager_9, _1942enums_72, cmpEnemyHealth_1, cmpMovementEnemy_1, cmpNullCollisionController_5, cmpNullEnemyController_2, nullEnemySpawner_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EnemiesManager = void 0;
    var EnemiesManager = (function () {
        function EnemiesManager() {
        }
        EnemiesManager.Create = function () {
            var manager = new EnemiesManager();
            var pool = mxObjectPool_5.MxObjectPool.Create();
            manager._m_actorPool = pool;
            pool.suscribe('elementActive', 'EnemiesManager', manager._onActive, manager);
            pool.suscribe('elementDesactive', 'EnemiesManager', manager._onDesactive, manager);
            manager._m_hSpawner = new Map();
            manager._m_bulletManager = nullBulletManager_9.NullBulletManager.GetInstance();
            return manager;
        };
        EnemiesManager.prototype.init = function (_scene, _config) {
            this.clear();
            this._m_enemiesCount = 0;
            var bodiesGroup = this._m_bodiesGroup;
            bodiesGroup = _scene.physics.add.group();
            this._m_bodiesGroup = bodiesGroup;
            var size = _config.pool_size;
            var actor;
            var sprite;
            var a_actors = new Array();
            while (size > 0) {
                sprite = bodiesGroup.create(0.0, 0.0, _config.texture_key);
                sprite.visible = false;
                sprite.active = false;
                sprite.body.enable = false;
                sprite.body.immovable = true;
                actor = baseActor_4.BaseActor.Create(sprite, "Enemy_" + size.toString());
                actor.addComponent(cmpMovementEnemy_1.CmpMovementEnemy.Create());
                actor.addComponent(cmpNullCollisionController_5.CmpNullCollisionController.GetInstance());
                actor.addComponent(cmpEnemyHealth_1.CmpEnemyHealth.Create());
                actor.addComponent(cmpNullEnemyController_2.CmpNullEnemyController.GetInstance());
                actor.init();
                sprite.setData('actor', actor);
                a_actors.push(actor);
                --size;
            }
            this._m_actorPool.init(a_actors);
            return;
        };
        EnemiesManager.prototype.setBulletManager = function (_bulletManager) {
            this._m_bulletManager = _bulletManager;
            this._m_hSpawner.forEach(function (_spawner) {
                _spawner.setBulletManager(_bulletManager);
                return;
            });
            return;
        };
        EnemiesManager.prototype.getBulletManager = function () {
            return this._m_bulletManager;
        };
        EnemiesManager.prototype.addSpawner = function (_spawner) {
            var hSpawner = this._m_hSpawner;
            var id = _spawner.getID();
            if (hSpawner.has(id)) {
                hSpawner.get(id).destroy();
            }
            hSpawner.set(id, _spawner);
            _spawner.setEnemiesManager(this);
            _spawner.setBulletManager(this._m_bulletManager);
            return;
        };
        EnemiesManager.prototype.getSpawner = function (_id) {
            var hSpawner = this._m_hSpawner;
            if (hSpawner.has(_id)) {
                return hSpawner.get(_id);
            }
            console.warn("Enemy Spawner not found!");
            return nullEnemySpawner_4.NullEnemySpawner.GetInstance();
        };
        EnemiesManager.prototype.update = function (_dt) {
            this._m_dt = _dt;
            this._m_hSpawner.forEach(this._updateSpawner, this);
            this._m_actorPool.forEachActive(this._updateActor, this);
            this._m_bulletManager.update(_dt);
            return;
        };
        EnemiesManager.prototype.spawn = function (_x, _y, _type, _data) {
            var hSpawner = this._m_hSpawner;
            if (hSpawner.has(_type)) {
                var actor = this.getActor();
                if (actor != null) {
                    hSpawner.get(_type).spawn(actor, _x, _y, _data);
                }
            }
            else {
                console.warn("Enemy spawner didn't found.");
            }
            return;
        };
        EnemiesManager.prototype.getActor = function () {
            return this._m_actorPool.get();
        };
        EnemiesManager.prototype.disableActor = function (_actor) {
            this._m_actorPool.desactive(_actor);
            return;
        };
        EnemiesManager.prototype.getBodiesGroup = function () {
            return this._m_bodiesGroup;
        };
        EnemiesManager.prototype.collisionVsGroup = function (_scene, _bodies) {
            _scene.physics.add.collider(_bodies, this._m_bodiesGroup, this._onCollision, undefined, this);
            return;
        };
        EnemiesManager.prototype.collisionVsBody = function (_scene, _body) {
            _scene.physics.add.collider(_body, this._m_bodiesGroup, this._onCollision, undefined, this);
            return;
        };
        EnemiesManager.prototype.clear = function () {
            var bodiesGroup = this._m_bodiesGroup;
            if (bodiesGroup != null) {
                bodiesGroup.destroy();
            }
            this._m_bodiesGroup = null;
            this._m_actorPool.clear();
            var hSpawner = this._m_hSpawner;
            hSpawner.forEach(function (_spawner) {
                _spawner.destroy();
            });
            hSpawner.clear();
            return;
        };
        EnemiesManager.prototype.addEnemies = function (_number) {
            this._m_enemiesCount += _number;
            return this._m_enemiesCount;
        };
        EnemiesManager.prototype.getEnemiesCount = function () {
            return this._m_enemiesCount;
        };
        EnemiesManager.prototype.destroy = function () {
            this._m_hSpawner.forEach(function (_spanwer) {
                _spanwer.destroy();
                return;
            });
            this._m_hSpawner.clear();
            this._m_hSpawner = null;
            this._m_bulletManager.destroy();
            this._m_bulletManager = null;
            this._m_bodiesGroup.destroy();
            this._m_bodiesGroup = null;
            this._m_actorPool.forEach(function (_actor) {
                var sprite = _actor.getWrappedInstance();
                _actor.destroy();
                sprite.destroy();
                return;
            });
            this._m_actorPool.destroy();
            this._m_actorPool = null;
            return;
        };
        EnemiesManager.prototype._updateActor = function (_actor) {
            _actor.update();
            return;
        };
        EnemiesManager.prototype._updateSpawner = function (_spawner) {
            _spawner.update(this._m_dt);
            return;
        };
        EnemiesManager.prototype._onCollision = function (_other, _self) {
            var otherActor = _other.getData("actor");
            var selfActor = _self.getData("actor");
            var selfController = selfActor.getComponent(_1942enums_72.DC_COMPONENT_ID.kCollisionController);
            var otherController = otherActor.getComponent(_1942enums_72.DC_COMPONENT_ID.kCollisionController);
            selfController.onCollision(otherActor, selfActor);
            otherController.onCollision(selfActor, otherActor);
            return;
        };
        EnemiesManager.prototype._onActive = function (_pool, _args) {
            var actor = _args.element;
            var sprite = actor.getWrappedInstance();
            sprite.visible = true;
            sprite.active = true;
            sprite.body.enable = true;
            return;
        };
        EnemiesManager.prototype._onDesactive = function (_pool, _args) {
            var actor = _args.element;
            var sprite = actor.getWrappedInstance();
            sprite.visible = false;
            sprite.active = false;
            sprite.body.enable = false;
            return;
        };
        return EnemiesManager;
    }());
    exports.EnemiesManager = EnemiesManager;
});
define("game/src/ts_src/components/cmpErranteController", ["require", "exports", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/configObjects/cnfErrante", "game/src/ts_src/enemiesManager/enemySpawner/nullEnemySpawner", "game/src/ts_src/enemiesManager/nullEnemiesManager", "game/src/ts_src/gameManager/gameManager"], function (require, exports, nullBulletManager_10, _1942enums_73, cnfErrante_2, nullEnemySpawner_5, nullEnemiesManager_4, gameManager_19) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpErranteController = void 0;
    var CmpErranteController = (function () {
        function CmpErranteController() {
        }
        CmpErranteController.Create = function () {
            var controller = new CmpErranteController();
            controller.m_id = _1942enums_73.DC_COMPONENT_ID.kEnemyController;
            controller._m_direction = new Phaser.Math.Vector3(0.0, 1.0);
            controller._m_force = new Phaser.Math.Vector3();
            controller._m_bullet_direction = new Phaser.Math.Vector2(0.0, 1.0);
            controller._m_config = new cnfErrante_2.CnfErrante();
            controller._m_time = 0.0;
            controller._m_bulletManager = nullBulletManager_10.NullBulletManager.GetInstance();
            controller._m_enemiesManager = nullEnemiesManager_4.NullEnemiesManager.GetInstance();
            controller._m_spawner = nullEnemySpawner_5.NullEnemySpawner.GetInstance();
            controller._m_gameManager = gameManager_19.GameManager.GetInstance();
            return controller;
        };
        CmpErranteController.prototype.init = function (_actor) {
            this._actor = _actor;
            this._m_time = this._m_config.init_time;
            return;
        };
        CmpErranteController.prototype.update = function (_actor) {
            var config = this._m_config;
            var deltaTime = this._m_gameManager.m_dt;
            var force = this._m_force;
            var direction = this._m_direction;
            var mult = config.speed * deltaTime;
            force.x = direction.x * mult;
            force.y = direction.y * mult;
            _actor.sendMessage(_1942enums_73.DC_MESSAGE_ID.kAgentMove, force);
            if (config.hasWeapon) {
                var time = this._m_time + deltaTime;
                if (time >= config.secondsPerBullet) {
                    time = 0.0;
                    var sprite = _actor.getWrappedInstance();
                    this._m_bulletManager.spawn(sprite.x, sprite.y + 100, _1942enums_73.DC_BULLET_TYPE.kEnemyBasic, this._m_bullet_direction);
                }
                this._m_time = time;
            }
            return;
        };
        CmpErranteController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_73.DC_MESSAGE_ID.kKill:
                    this._onKill(_obj);
                    return;
                case _1942enums_73.DC_MESSAGE_ID.kDesactive:
                    this._onDesactived(_obj);
                    return;
            }
            return;
        };
        CmpErranteController.prototype.getCollisionDamage = function () {
            return this._m_config.collision_damage;
        };
        CmpErranteController.prototype.setConfiguration = function (_config) {
            this._m_config = _config;
            this._m_time = _config.init_time;
            return;
        };
        CmpErranteController.prototype.setSpawner = function (_spawner) {
            this._m_spawner = _spawner;
            return;
        };
        CmpErranteController.prototype.getSpawner = function () {
            return this._m_spawner;
        };
        CmpErranteController.prototype.setEnemiesManager = function (_enemyManager) {
            this._m_enemiesManager = _enemyManager;
            return;
        };
        CmpErranteController.prototype.getEnemiesManager = function () {
            return this._m_enemiesManager;
        };
        CmpErranteController.prototype.setBulletManager = function (_bulletManager) {
            this._m_bulletManager = _bulletManager;
        };
        CmpErranteController.prototype.getBulletManager = function () {
            return this._m_bulletManager;
        };
        CmpErranteController.prototype.getScorePoints = function () {
            return this._m_config.score;
        };
        CmpErranteController.prototype.setScorePoints = function (_points) {
            this._m_config.score = _points;
            return;
        };
        CmpErranteController.prototype.destroy = function () {
            this._m_spawner = null;
            this._m_enemiesManager = null;
            this._m_config = null;
            return;
        };
        CmpErranteController.prototype._onKill = function (_actor) {
            this._m_spawner.disasemble(_actor);
            this._m_enemiesManager.disableActor(_actor);
            gameManager_19.GameManager.ReceiveMessage(_1942enums_73.DC_MESSAGE_ID.kAddScorePoints, this._m_config.score);
            return;
        };
        CmpErranteController.prototype._onDesactived = function (_actor) {
            this._m_spawner.disasemble(_actor);
            this._m_enemiesManager.disableActor(_actor);
            return;
        };
        return CmpErranteController;
    }());
    exports.CmpErranteController = CmpErranteController;
});
define("game/src/ts_src/enemiesManager/enemySpawner/erranteSpawner", ["require", "exports", "optimization/mxObjectPool", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpErranteController", "game/src/ts_src/components/cmpNullEnemyController", "game/src/ts_src/components/cmpPlayZone", "game/src/ts_src/configObjects/cnfErranteSpawner", "game/src/ts_src/gameManager/gameManager", "game/src/ts_src/enemiesManager/nullEnemiesManager"], function (require, exports, mxObjectPool_6, nullBulletManager_11, _1942enums_74, cmpErranteController_1, cmpNullEnemyController_3, cmpPlayZone_3, cnfErranteSpawner_2, gameManager_20, nullEnemiesManager_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ErranteSpawner = void 0;
    var ErranteSpawner = (function () {
        function ErranteSpawner() {
        }
        ErranteSpawner.Create = function () {
            var spawner = new ErranteSpawner();
            spawner._m_enemiesManager = nullEnemiesManager_5.NullEnemiesManager.GetInstance();
            spawner._m_bulletManager = nullBulletManager_11.NullBulletManager.GetInstance();
            spawner._m_poolControllers = mxObjectPool_6.MxObjectPool.Create();
            spawner._m_playZone = cmpPlayZone_3.CmpPlayZone.Create();
            return spawner;
        };
        ErranteSpawner.prototype.init = function (_config) {
            if (_config === undefined) {
                _config = new cnfErranteSpawner_2.CnfErranteSpawner();
            }
            var gameManager = gameManager_20.GameManager.GetInstance();
            var scene = gameManager.getGameScene();
            var canvas = scene.game.canvas;
            this._m_playZone.setBoundings(-_config.playZone_padding, -_config.playZone_padding, canvas.width + _config.playZone_padding, canvas.height + _config.playZone_padding);
            var aControllers = new Array();
            var index = 0;
            while (index < _config.pool_size) {
                var controller = cmpErranteController_1.CmpErranteController.Create();
                controller.setSpawner(this);
                aControllers.push(controller);
                ++index;
            }
            this._m_poolControllers.init(aControllers);
            return;
        };
        ErranteSpawner.prototype.update = function (_dt) {
            return;
        };
        ErranteSpawner.prototype.spawn = function (_actor, _x, _y, _data) {
            _actor.sendMessage(_1942enums_74.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(_x, _y));
            this.assemble(_actor, _data);
            return;
        };
        ErranteSpawner.prototype.getID = function () {
            return _1942enums_74.DC_ENEMY_TYPE.kErrante;
        };
        ErranteSpawner.prototype.assemble = function (_actor, _data) {
            var config = _data;
            var controller = this._m_poolControllers.get();
            if (controller != null) {
                var healthComponent = _actor.getComponent(_1942enums_74.DC_COMPONENT_ID.kEnemyHealth);
                healthComponent.setHP(config.health);
                controller.setConfiguration(config);
                _actor.addComponent(controller);
                controller.init(_actor);
                _actor.addComponent(this._m_playZone);
                var sprite = _actor.getWrappedInstance();
                sprite.setTexture(config.texture_key);
                sprite.setAngle(90.0);
                var circle_radius = sprite.height * 0.5;
                sprite.body.setCircle(circle_radius, (sprite.width * 0.5) - circle_radius, (sprite.height * 0.5) - circle_radius);
                this._m_enemiesManager.addEnemies(1);
            }
            else {
                this._m_enemiesManager.disableActor(_actor);
            }
            return;
        };
        ErranteSpawner.prototype.disasemble = function (_actor) {
            var controller = _actor.getComponent(_1942enums_74.DC_COMPONENT_ID.kEnemyController);
            this._m_poolControllers.desactive(controller);
            _actor.addComponent(cmpNullEnemyController_3.CmpNullEnemyController.GetInstance());
            _actor.removeComponent(_1942enums_74.DC_COMPONENT_ID.kPlayZone);
            return;
        };
        ErranteSpawner.prototype.setEnemiesManager = function (_enemiesManager) {
            this._m_enemiesManager = _enemiesManager;
            this._m_poolControllers.forEach(function (_cmp) {
                _cmp.setEnemiesManager(_enemiesManager);
                return;
            });
            return;
        };
        ErranteSpawner.prototype.setBulletManager = function (_bulletManager) {
            this._m_bulletManager = _bulletManager;
            this._m_poolControllers.forEach(function (_cmp) {
                _cmp.setBulletManager(_bulletManager);
                return;
            });
            return;
        };
        ErranteSpawner.prototype.getBulletManager = function () {
            return this._m_bulletManager;
        };
        ErranteSpawner.prototype.getEnemiesManager = function () {
            return this._m_enemiesManager;
        };
        ErranteSpawner.prototype.destroy = function () {
            this._m_playZone.destroy();
            this._m_playZone = null;
            this._m_enemiesManager = null;
            this._m_poolControllers.forEach(function (_cmp) {
                _cmp.destroy();
                return;
            });
            this._m_poolControllers.clear();
            this._m_poolControllers = null;
            return;
        };
        return ErranteSpawner;
    }());
    exports.ErranteSpawner = ErranteSpawner;
});
define("game/src/ts_src/actors/prefabActor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PrefabActor = void 0;
    var PrefabActor = (function () {
        function PrefabActor() {
        }
        PrefabActor.Create = function (_name) {
            var actor = new PrefabActor();
            actor.m_name = _name;
            actor._m_hChildren = new Map();
            return actor;
        };
        PrefabActor.prototype.init = function () {
            this._m_hChildren.forEach(function (_child) {
                _child.init();
                return;
            }, this);
            return;
        };
        PrefabActor.prototype.update = function () {
            this._m_hChildren.forEach(this._updateChild, this);
            return;
        };
        PrefabActor.prototype.sendMessage = function (_id, _obj) {
            this._m_message_id = _id;
            this._m_message = _obj;
            this._m_hChildren.forEach(this._sendMessageChild, this);
            this._m_message = null;
            return;
        };
        PrefabActor.prototype.getChild = function (_name) {
            if (this._m_hChildren.has(_name)) {
                return this._m_hChildren.get(_name);
            }
            return null;
        };
        PrefabActor.prototype.addChild = function (_actor) {
            this._m_hChildren.set(_actor.getName(), _actor);
            return;
        };
        PrefabActor.prototype.removeChild = function (_name) {
            if (this._m_hChildren.has(_name)) {
                this._m_hChildren.delete(_name);
            }
            return;
        };
        PrefabActor.prototype.clear = function () {
            this._m_hChildren.clear();
            return;
        };
        PrefabActor.prototype.getName = function () {
            return this.m_name;
        };
        PrefabActor.prototype.destroy = function () {
            this._m_hChildren.forEach(function (_child) {
                _child.destroy();
                return;
            });
            return;
        };
        PrefabActor.prototype._updateChild = function (_actor) {
            _actor.update();
            return;
        };
        PrefabActor.prototype._sendMessageChild = function (_actor) {
            _actor.sendMessage(this._m_message_id, this._m_message);
            return;
        };
        return PrefabActor;
    }());
    exports.PrefabActor = PrefabActor;
});
define("game/src/ts_src/components/cmpUIBossHealthControl", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_75) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpUIBossHealthControl = void 0;
    var CmpUIBossHealthControl = (function () {
        function CmpUIBossHealthControl() {
        }
        CmpUIBossHealthControl.Create = function () {
            var healthController = new CmpUIBossHealthControl();
            healthController.m_id = _1942enums_75.DC_COMPONENT_ID.kUIBossHealthControl;
            return healthController;
        };
        CmpUIBossHealthControl.prototype.init = function (_actor) {
            this._actor = _actor;
            return;
        };
        CmpUIBossHealthControl.prototype.update = function (_actor) { };
        CmpUIBossHealthControl.prototype.receive = function (_id, _obj) { };
        CmpUIBossHealthControl.prototype.onHealthChanged = function (_bossManager, _args) {
            var sHealth = "Boss Health : " + _args.toString();
            this._actor.sendMessage(_1942enums_75.DC_MESSAGE_ID.kSetText, sHealth);
            return;
        };
        CmpUIBossHealthControl.prototype.destroy = function () {
            this._actor = null;
            return;
        };
        return CmpUIBossHealthControl;
    }());
    exports.CmpUIBossHealthControl = CmpUIBossHealthControl;
});
define("game/src/ts_src/components/cmpUIHealthController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_76) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpUIHealthController = void 0;
    var CmpUIHealthController = (function () {
        function CmpUIHealthController() {
        }
        CmpUIHealthController.Create = function () {
            var healthController = new CmpUIHealthController();
            healthController.m_id = _1942enums_76.DC_COMPONENT_ID.kUIHealthController;
            return healthController;
        };
        CmpUIHealthController.prototype.init = function (_actor) {
            this._actor = _actor;
            return;
        };
        CmpUIHealthController.prototype.update = function (_actor) { };
        CmpUIHealthController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_76.DC_MESSAGE_ID.kClose:
                    return;
                case _1942enums_76.DC_MESSAGE_ID.kShow:
                    return;
            }
        };
        CmpUIHealthController.prototype.onHealthChanged = function (_heroData, _args) {
            var sHealth = "Health : " + _heroData.getHealth().toString();
            this._actor.sendMessage(_1942enums_76.DC_MESSAGE_ID.kSetText, sHealth);
            return;
        };
        CmpUIHealthController.prototype.destroy = function () {
            this._actor = null;
            return;
        };
        return CmpUIHealthController;
    }());
    exports.CmpUIHealthController = CmpUIHealthController;
});
define("game/src/ts_src/components/cmpUIPowerShieldController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_77) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpUIPowerShieldController = void 0;
    var CmpUIPowerShieldController = (function () {
        function CmpUIPowerShieldController() {
        }
        CmpUIPowerShieldController.Create = function () {
            var healthController = new CmpUIPowerShieldController();
            healthController.m_id = _1942enums_77.DC_COMPONENT_ID.kUIPowerShieldController;
            return healthController;
        };
        CmpUIPowerShieldController.prototype.init = function (_actor) {
            this._actor = _actor;
            return;
        };
        CmpUIPowerShieldController.prototype.update = function (_actor) { };
        CmpUIPowerShieldController.prototype.receive = function (_id, _obj) { };
        CmpUIPowerShieldController.prototype.onProgress = function (_cmp, _args) {
            var mult = _args;
            this._actor.sendMessage(_1942enums_77.DC_MESSAGE_ID.kSetText, 'Power Shield : ' + Math.floor((100.0 * mult)) + ' %');
            return;
        };
        CmpUIPowerShieldController.prototype.onPowerShieldActivated = function (_cmp, _args) {
            this._actor.sendMessage(_1942enums_77.DC_MESSAGE_ID.kSetText, 'Power Shield : 0 %');
            this._actor.sendMessage(_1942enums_77.DC_MESSAGE_ID.kShow, undefined);
            return;
        };
        CmpUIPowerShieldController.prototype.onPowerShieldDesactivated = function (_cmp, _args) {
            this._actor.sendMessage(_1942enums_77.DC_MESSAGE_ID.kClose, undefined);
            return;
        };
        CmpUIPowerShieldController.prototype.destroy = function () {
            this._actor = null;
            return;
        };
        return CmpUIPowerShieldController;
    }());
    exports.CmpUIPowerShieldController = CmpUIPowerShieldController;
});
define("game/src/ts_src/components/cmpUIScoreController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_78) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpUIScoreController = void 0;
    var CmpUIScoreController = (function () {
        function CmpUIScoreController() {
        }
        CmpUIScoreController.Create = function () {
            var healthController = new CmpUIScoreController();
            healthController.m_id = _1942enums_78.DC_COMPONENT_ID.kUIScoreController;
            return healthController;
        };
        CmpUIScoreController.prototype.init = function (_actor) {
            this._actor = _actor;
            return;
        };
        CmpUIScoreController.prototype.update = function (_actor) { };
        CmpUIScoreController.prototype.receive = function (_id, _obj) { };
        CmpUIScoreController.prototype.onScoreChanged = function (_scoreManager, _args) {
            var sScore = "Score : " + _scoreManager.getScore().toString();
            this._actor.sendMessage(_1942enums_78.DC_MESSAGE_ID.kSetText, sScore);
            return;
        };
        CmpUIScoreController.prototype.destroy = function () {
            this._actor = null;
            return;
        };
        return CmpUIScoreController;
    }());
    exports.CmpUIScoreController = CmpUIScoreController;
});
define("game/src/ts_src/components/cmpUIScoreMultiplier", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_79) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpUIScoreMultiplier = void 0;
    var CmpUIScoreMultiplier = (function () {
        function CmpUIScoreMultiplier() {
        }
        CmpUIScoreMultiplier.Create = function () {
            var controller = new CmpUIScoreMultiplier();
            controller.m_id = _1942enums_79.DC_COMPONENT_ID.kUIScoreMultiplier;
            return controller;
        };
        CmpUIScoreMultiplier.prototype.init = function (_actor) {
            this._actor = _actor;
            return;
        };
        CmpUIScoreMultiplier.prototype.update = function (_actor) { };
        CmpUIScoreMultiplier.prototype.receive = function (_id, _obj) { };
        CmpUIScoreMultiplier.prototype.onMultiplierChange = function (_scoreManager, _args) {
            var sMultiplier = "x " + _scoreManager.getMultiplier().toString();
            this._actor.sendMessage(_1942enums_79.DC_MESSAGE_ID.kSetText, sMultiplier);
            return;
        };
        CmpUIScoreMultiplier.prototype.destroy = function () {
            this._actor = null;
            return;
        };
        return CmpUIScoreMultiplier;
    }());
    exports.CmpUIScoreMultiplier = CmpUIScoreMultiplier;
});
define("game/src/ts_src/components/cmpTextController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_80) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpTextController = void 0;
    var CmpTextController = (function () {
        function CmpTextController() {
        }
        CmpTextController.Create = function () {
            var controller = new CmpTextController();
            controller.m_id = _1942enums_80.DC_COMPONENT_ID.kTextController;
            return controller;
        };
        CmpTextController.prototype.init = function (_actor) {
            this._m_text = _actor.getWrappedInstance();
            return;
        };
        CmpTextController.prototype.update = function (_actor) { };
        CmpTextController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_80.DC_MESSAGE_ID.kSetText:
                    this._m_text.text = _obj;
                    return;
                case _1942enums_80.DC_MESSAGE_ID.kToPosition:
                    {
                        var position = _obj;
                        this._m_text.setPosition(position.x, position.y);
                    }
                    return;
                case _1942enums_80.DC_MESSAGE_ID.kAgentMove:
                    {
                        var movement = _obj;
                        var text = this._m_text;
                        text.x += movement.x;
                        text.y += movement.y;
                    }
                    return;
                case _1942enums_80.DC_MESSAGE_ID.kShow:
                    {
                        this._m_text.setVisible(true);
                        this._m_text.setActive(true);
                    }
                    return;
                case _1942enums_80.DC_MESSAGE_ID.kClose:
                    {
                        this._m_text.setVisible(false);
                        this._m_text.setActive(false);
                    }
                    return;
            }
        };
        CmpTextController.prototype.destroy = function () {
            this._m_text.destroy();
            this._m_text = null;
            return;
        };
        return CmpTextController;
    }());
    exports.CmpTextController = CmpTextController;
});
define("game/src/ts_src/factories/fcUIBossHealth", ["require", "exports", "game/src/ts_src/actors/baseActor", "game/src/ts_src/components/cmpTextController", "game/src/ts_src/components/cmpUIBossHealthControl"], function (require, exports, baseActor_5, cmpTextController_1, cmpUIBossHealthControl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FCUIBossHealth = void 0;
    var FCUIBossHealth = (function () {
        function FCUIBossHealth() {
        }
        FCUIBossHealth.Create = function (_scene) {
            var text = _scene.add.text(0, 0, "BossHealth : ", { fontFamily: 'Arial', fontSize: 64, color: '#000000' });
            var actor = baseActor_5.BaseActor.Create(text, "hero_ui_health");
            actor.addComponent(cmpTextController_1.CmpTextController.Create());
            actor.addComponent(cmpUIBossHealthControl_1.CmpUIBossHealthControl.Create());
            actor.init();
            return actor;
        };
        return FCUIBossHealth;
    }());
    exports.FCUIBossHealth = FCUIBossHealth;
});
define("game/src/ts_src/factories/fcUIHealth", ["require", "exports", "game/src/ts_src/actors/baseActor", "game/src/ts_src/components/cmpTextController", "game/src/ts_src/components/cmpUIHealthController"], function (require, exports, baseActor_6, cmpTextController_2, cmpUIHealthController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FcUIHealth = void 0;
    var FcUIHealth = (function () {
        function FcUIHealth() {
        }
        FcUIHealth.Create = function (_scene) {
            var text = _scene.add.text(0, 0, "Health: 10", { fontFamily: 'Arial', fontSize: 64, color: '#000000' });
            var actor = baseActor_6.BaseActor.Create(text, "hero_ui_health");
            actor.addComponent(cmpTextController_2.CmpTextController.Create());
            actor.addComponent(cmpUIHealthController_1.CmpUIHealthController.Create());
            actor.init();
            return actor;
        };
        return FcUIHealth;
    }());
    exports.FcUIHealth = FcUIHealth;
});
define("game/src/ts_src/components/cmpActorGroup", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_81) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpActorGroupImage = void 0;
    var CmpActorGroupImage = (function () {
        function CmpActorGroupImage() {
        }
        CmpActorGroupImage.Create = function () {
            var group = new CmpActorGroupImage();
            group.m_id = _1942enums_81.DC_COMPONENT_ID.kActorGroup;
            group._m_hActors = new Map();
            return group;
        };
        CmpActorGroupImage.prototype.init = function (_actor) {
            this._m_hActors.forEach(function (_actor) {
                _actor.init();
            });
            return;
        };
        CmpActorGroupImage.prototype.update = function (_actor) {
            this._m_hActors.forEach(this.updateActor, this);
            return;
        };
        CmpActorGroupImage.prototype.updateActor = function (_actor) {
            _actor.update();
            return;
        };
        CmpActorGroupImage.prototype.addActor = function (_actor) {
            this._m_hActors.set(_actor.getName(), _actor);
            return;
        };
        CmpActorGroupImage.prototype.getActor = function (_name) {
            return this._m_hActors.get(_name);
        };
        CmpActorGroupImage.prototype.receive = function (_id, _obj) {
            this._m_hActors.forEach(function (_actor) {
                _actor.sendMessage(_id, _obj);
                return;
            }, this);
            return;
        };
        CmpActorGroupImage.prototype.destroy = function () {
            this._m_hActors.forEach(function (_actor) {
                _actor.destroy();
                return;
            }, this);
            return;
        };
        return CmpActorGroupImage;
    }());
    exports.CmpActorGroupImage = CmpActorGroupImage;
});
define("game/src/ts_src/components/cmpImageController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_82) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpImageController = void 0;
    var CmpImageController = (function () {
        function CmpImageController() {
        }
        CmpImageController.Create = function () {
            var controller = new CmpImageController();
            controller.m_id = _1942enums_82.DC_COMPONENT_ID.kImageController;
            return controller;
        };
        CmpImageController.prototype.init = function (_actor) {
            this._m_image = _actor.getWrappedInstance();
            return;
        };
        CmpImageController.prototype.update = function (_actor) {
            return;
        };
        CmpImageController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_82.DC_MESSAGE_ID.kToPosition:
                    {
                        var position = _obj;
                        this._m_image.setPosition(position.x, position.y);
                    }
                    return;
                case _1942enums_82.DC_MESSAGE_ID.kAgentMove:
                    {
                        var move = _obj;
                        this._m_image.x += move.x;
                        this._m_image.y += move.y;
                    }
                    return;
                case _1942enums_82.DC_MESSAGE_ID.kSetAngle:
                    this._m_image.setAngle(_obj);
                    return;
                case _1942enums_82.DC_MESSAGE_ID.kSetTexture:
                    this._m_image.setTexture(_obj);
                    return;
                case _1942enums_82.DC_MESSAGE_ID.kShow:
                    this._active();
                    return;
                case _1942enums_82.DC_MESSAGE_ID.kClose:
                    this._desactive();
                    return;
                case _1942enums_82.DC_MESSAGE_ID.kDesactive:
                    this._desactive();
                    return;
                case _1942enums_82.DC_MESSAGE_ID.kActive:
                    this._active();
                    return;
            }
            return;
        };
        CmpImageController.prototype.destroy = function () {
            this._m_image.destroy();
            this._m_image = null;
            return;
        };
        CmpImageController.prototype._desactive = function () {
            this._m_image.setActive(false);
            this._m_image.setVisible(false);
            return;
        };
        CmpImageController.prototype._active = function () {
            this._m_image.setActive(true);
            this._m_image.setVisible(true);
            return;
        };
        return CmpImageController;
    }());
    exports.CmpImageController = CmpImageController;
});
define("game/src/ts_src/factories/fcUIMessage", ["require", "exports", "game/src/ts_src/actors/baseActor", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpActorGroup", "game/src/ts_src/components/cmpImageController", "game/src/ts_src/components/cmpTextController", "game/src/ts_src/gameManager/gameManager"], function (require, exports, baseActor_7, _1942enums_83, cmpActorGroup_1, cmpImageController_1, cmpTextController_3, gameManager_21) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FcUIMessage = void 0;
    var FcUIMessage = (function () {
        function FcUIMessage() {
        }
        FcUIMessage.Create = function (_scene) {
            var actor = baseActor_7.BaseActor.Create(_scene.add.sprite(0.0, 0.0, 'dialogBox'), "dialogBox");
            var groupComponent = cmpActorGroup_1.CmpActorGroupImage.Create();
            actor.addComponent(groupComponent);
            actor.addComponent(cmpImageController_1.CmpImageController.Create());
            var text = _scene.add.text(0, 0, "Reset", { fontFamily: 'Arial', fontSize: 64, color: '#000000' });
            text.setOrigin(0.5, 0.5);
            text.setAlign('center');
            text.setInteractive();
            var gameManager = gameManager_21.GameManager.GetInstance();
            text.on('pointerdown', gameManager.gameReset, gameManager);
            var buttonActor = baseActor_7.BaseActor.Create(text, 'reset_button');
            buttonActor.addComponent(cmpTextController_3.CmpTextController.Create());
            var lblMessage = _scene.add.text(0, 0, "Perdiste", { fontFamily: 'Arial', fontSize: 64, color: '#000000' });
            lblMessage.setOrigin(0.5, 0.5);
            lblMessage.setAlign('center');
            var messageActor = baseActor_7.BaseActor.Create(lblMessage, 'box_message');
            messageActor.addComponent(cmpTextController_3.CmpTextController.Create());
            groupComponent.addActor(messageActor);
            groupComponent.addActor(buttonActor);
            actor.init();
            messageActor.sendMessage(_1942enums_83.DC_MESSAGE_ID.kAgentMove, new Phaser.Math.Vector3(0.0, -50.0));
            buttonActor.sendMessage(_1942enums_83.DC_MESSAGE_ID.kAgentMove, new Phaser.Math.Vector3(0.0, 150.0));
            return actor;
        };
        return FcUIMessage;
    }());
    exports.FcUIMessage = FcUIMessage;
});
define("game/src/ts_src/factories/fcUIPowerShield", ["require", "exports", "game/src/ts_src/actors/baseActor", "game/src/ts_src/components/cmpTextController", "game/src/ts_src/components/cmpUIPowerShieldController"], function (require, exports, baseActor_8, cmpTextController_4, cmpUIPowerShieldController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FcUIPowerShield = void 0;
    var FcUIPowerShield = (function () {
        function FcUIPowerShield() {
        }
        FcUIPowerShield.Create = function (_scene) {
            var text = _scene.add.text(0, 0, "PowerShield : 0", { fontFamily: 'Arial', fontSize: 50, color: '#EC1D87' });
            var actor = baseActor_8.BaseActor.Create(text, "hero_power_shield");
            actor.addComponent(cmpTextController_4.CmpTextController.Create());
            actor.addComponent(cmpUIPowerShieldController_1.CmpUIPowerShieldController.Create());
            actor.init();
            return actor;
        };
        return FcUIPowerShield;
    }());
    exports.FcUIPowerShield = FcUIPowerShield;
});
define("game/src/ts_src/factories/fcUIScore", ["require", "exports", "game/src/ts_src/actors/baseActor", "game/src/ts_src/components/cmpTextController", "game/src/ts_src/components/cmpUIScoreController"], function (require, exports, baseActor_9, cmpTextController_5, cmpUIScoreController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FcUIScore = void 0;
    var FcUIScore = (function () {
        function FcUIScore() {
        }
        FcUIScore.Create = function (_scene) {
            var text = _scene.add.text(0, 0, "Health: 10", { fontFamily: 'Arial', fontSize: 64, color: '#000000' });
            var actor = baseActor_9.BaseActor.Create(text, "hero_ui_health");
            actor.addComponent(cmpTextController_5.CmpTextController.Create());
            actor.addComponent(cmpUIScoreController_1.CmpUIScoreController.Create());
            actor.init();
            return actor;
        };
        return FcUIScore;
    }());
    exports.FcUIScore = FcUIScore;
});
define("game/src/ts_src/factories/fcUIScoreMultiplier", ["require", "exports", "game/src/ts_src/actors/baseActor", "game/src/ts_src/components/cmpTextController", "game/src/ts_src/components/cmpUIScoreMultiplier"], function (require, exports, baseActor_10, cmpTextController_6, cmpUIScoreMultiplier_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FcUIScoreMultiplier = void 0;
    var FcUIScoreMultiplier = (function () {
        function FcUIScoreMultiplier() {
        }
        FcUIScoreMultiplier.Create = function (_scene) {
            var text = _scene.add.text(0, 0, "x 1", { fontFamily: 'Arial', fontSize: 32, color: '#000000' });
            var actor = baseActor_10.BaseActor.Create(text, "hero_ui_health");
            actor.addComponent(cmpTextController_6.CmpTextController.Create());
            actor.addComponent(cmpUIScoreMultiplier_1.CmpUIScoreMultiplier.Create());
            actor.init();
            return actor;
        };
        return FcUIScoreMultiplier;
    }());
    exports.FcUIScoreMultiplier = FcUIScoreMultiplier;
});
define("game/src/ts_src/prefabBuilder/objectBuilder/iObjectBuilder", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/prefabBuilder/objectBuilder/BaseBuilder", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaseBuilder = void 0;
    var BaseBuilder = (function () {
        function BaseBuilder() {
        }
        BaseBuilder.prototype.init = function () {
            throw new Error("Method not implemented.");
        };
        BaseBuilder.prototype.build = function (_scene, _object, _xOffset, _yOffset) {
            throw new Error("Method not implemented.");
        };
        BaseBuilder.prototype.destroy = function () {
            throw new Error("Method not implemented.");
        };
        return BaseBuilder;
    }());
    exports.BaseBuilder = BaseBuilder;
});
define("game/src/ts_src/prefabBuilder/objectBuilder/ImageBuilder", ["require", "exports", "game/src/ts_src/actors/baseActor", "game/src/ts_src/components/cmpImageController", "game/src/ts_src/prefabBuilder/objectBuilder/BaseBuilder"], function (require, exports, baseActor_11, cmpImageController_2, BaseBuilder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImageBuilder = void 0;
    var ImageBuilder = (function (_super) {
        __extends(ImageBuilder, _super);
        function ImageBuilder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImageBuilder.prototype.init = function () { };
        ImageBuilder.prototype.build = function (_scene, _object, _xOffset, _yOffset) {
            var name = _object.name;
            if (name === '' || name === undefined) {
                console.warn('Object does not has name');
                name = 'object';
            }
            var texture = '';
            var frame_str = undefined;
            var frame_num = 0;
            var x = 0;
            var y = 0;
            var flipX = false;
            var flipY = false;
            var visible = true;
            var width = 0;
            var height = 0;
            var rotation = 0;
            if (_object.visible !== undefined) {
                visible = _object.visible;
            }
            if (_object.width !== undefined) {
                width = _object.width;
            }
            if (_object.height !== undefined) {
                height = _object.height;
            }
            if (_object.x !== undefined) {
                x = _object.x + (width * 0.5);
            }
            if (_object.y !== undefined) {
                y = _object.y - (height * 0.5);
            }
            if (_object.rotation !== undefined) {
                rotation = _object.rotation;
            }
            if (_object.flippedHorizontal !== undefined) {
                flipX = _object.flippedHorizontal;
            }
            if (_object.flippedVertical !== undefined) {
                flipY = _object.flippedVertical;
            }
            if (_object.properties === undefined) {
                console.warn('Object does not has custom properties.');
            }
            else {
                var aProperties = _object.properties;
                var propertyIndex = 0;
                var property = void 0;
                while (propertyIndex < aProperties.length) {
                    property = aProperties[propertyIndex];
                    switch (property.name) {
                        case "texture":
                            texture = property.value;
                            break;
                        case "frame_key":
                            {
                                var str = property.value;
                                if (str !== '') {
                                    frame_str = str;
                                }
                            }
                            break;
                        case "frame_index":
                            {
                                var frameIndex = property.value;
                                if (frameIndex >= 0) {
                                    frame_num = frameIndex;
                                }
                            }
                            break;
                        default:
                            break;
                    }
                    ++propertyIndex;
                }
            }
            var image = _scene.add.image(x, y, texture, ((frame_str !== undefined) ? frame_str : frame_num));
            image.setVisible(visible);
            image.setFlipX(flipX);
            image.setFlipY(flipY);
            image.setScale(width / image.width, height / image.height);
            image.setRotation(rotation);
            var actor = baseActor_11.BaseActor.Create(image, name);
            actor.addComponent(cmpImageController_2.CmpImageController.Create());
            actor.init();
            return actor;
        };
        ImageBuilder.prototype.destroy = function () { };
        return ImageBuilder;
    }(BaseBuilder_1.BaseBuilder));
    exports.ImageBuilder = ImageBuilder;
});
define("game/src/ts_src/messages/msgInputEvent", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.msgInputEvent = void 0;
    var msgInputEvent = (function () {
        function msgInputEvent() {
        }
        return msgInputEvent;
    }());
    exports.msgInputEvent = msgInputEvent;
});
define("game/src/ts_src/components/cmpImageInteractive", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/messages/msgInputEvent"], function (require, exports, _1942enums_84, msgInputEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpImageInteractive = void 0;
    var CmpImageInteractive = (function () {
        function CmpImageInteractive() {
        }
        CmpImageInteractive.Create = function () {
            var component = new CmpImageInteractive();
            component.m_id = _1942enums_84.DC_COMPONENT_ID.kCmpImageInteractive;
            component._sharedMessage = new msgInputEvent_1.msgInputEvent();
            return component;
        };
        CmpImageInteractive.prototype.init = function (_actor) {
            var image = _actor.getWrappedInstance();
            this._actor = _actor;
            image.setInteractive();
            image.on('pointerdown', this._onPointerDown, this);
            image.on('pointerup', this._onPointerUp, this);
            image.on('pointermove', this._onPointerMove, this);
            image.on('pointerover', this._onPointerOver, this);
            image.on('pointerout', this._onPointerOut, this);
            return;
        };
        CmpImageInteractive.prototype.update = function (_actor) {
            return;
        };
        CmpImageInteractive.prototype.receive = function (_id, _obj) {
            return;
        };
        CmpImageInteractive.prototype.destroy = function () {
            this._sharedMessage = null;
            return;
        };
        CmpImageInteractive.prototype._onPointerDown = function (_pointer, _localX, _localY, _event) {
            var msg = this._sharedMessage;
            msg.pointer = _pointer;
            msg.localX = _localX;
            msg.localY = _localY;
            msg.event = _event;
            this._actor.sendMessage(_1942enums_84.DC_MESSAGE_ID.kPointerDown, msg);
            msg.pointer = null;
            msg.event = null;
            return;
        };
        CmpImageInteractive.prototype._onPointerUp = function (_pointer, _localX, _localY, _event) {
            var msg = this._sharedMessage;
            msg.pointer = _pointer;
            msg.localX = _localX;
            msg.localY = _localY;
            msg.event = _event;
            this._actor.sendMessage(_1942enums_84.DC_MESSAGE_ID.kPointerUp, msg);
            msg.pointer = null;
            msg.event = null;
            return;
        };
        CmpImageInteractive.prototype._onPointerMove = function (_pointer, _localX, _localY, _event) {
            var msg = this._sharedMessage;
            msg.pointer = _pointer;
            msg.localX = _localX;
            msg.localY = _localY;
            msg.event = _event;
            this._actor.sendMessage(_1942enums_84.DC_MESSAGE_ID.kPointerMove, msg);
            msg.pointer = null;
            msg.event = null;
            return;
        };
        CmpImageInteractive.prototype._onPointerOver = function (_pointer, _localX, _localY, _event) {
            var msg = this._sharedMessage;
            msg.pointer = _pointer;
            msg.localX = _localX;
            msg.localY = _localY;
            msg.event = _event;
            this._actor.sendMessage(_1942enums_84.DC_MESSAGE_ID.kPointerOver, msg);
            msg.pointer = null;
            msg.event = null;
            return;
        };
        CmpImageInteractive.prototype._onPointerOut = function (_pointer, _event) {
            var msg = this._sharedMessage;
            msg.pointer = _pointer;
            msg.localX = null;
            msg.localY = null;
            msg.event = _event;
            this._actor.sendMessage(_1942enums_84.DC_MESSAGE_ID.kPointerOut, msg);
            msg.pointer = null;
            msg.event = null;
            return;
        };
        return CmpImageInteractive;
    }());
    exports.CmpImageInteractive = CmpImageInteractive;
});
define("game/src/ts_src/prefabBuilder/objectBuilder/ImageButtonBuilder", ["require", "exports", "game/src/ts_src/actors/baseActor", "game/src/ts_src/components/cmpImageController", "game/src/ts_src/components/cmpImageInteractive", "game/src/ts_src/prefabBuilder/objectBuilder/BaseBuilder"], function (require, exports, baseActor_12, cmpImageController_3, cmpImageInteractive_1, BaseBuilder_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImageButtonBuilder = void 0;
    var ImageButtonBuilder = (function (_super) {
        __extends(ImageButtonBuilder, _super);
        function ImageButtonBuilder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImageButtonBuilder.prototype.init = function () { };
        ImageButtonBuilder.prototype.build = function (_scene, _object, _xOffset, _yOffset) {
            var name = _object.name;
            if (name === '' || name === undefined) {
                console.warn('Object does not has name');
                name = 'object';
            }
            var texture = '';
            var frame_str = undefined;
            var frame_num = 0;
            var x = 0;
            var y = 0;
            var flipX = false;
            var flipY = false;
            var visible = true;
            var width = 0;
            var height = 0;
            var rotation = 0;
            if (_object.visible !== undefined) {
                visible = _object.visible;
            }
            if (_object.width !== undefined) {
                width = _object.width;
            }
            if (_object.height !== undefined) {
                height = _object.height;
            }
            if (_object.x !== undefined) {
                x = _object.x + (width * 0.5);
            }
            if (_object.y !== undefined) {
                y = _object.y - (height * 0.5);
            }
            if (_object.rotation !== undefined) {
                rotation = _object.rotation;
            }
            if (_object.flippedHorizontal !== undefined) {
                flipX = _object.flippedHorizontal;
            }
            if (_object.flippedVertical !== undefined) {
                flipY = _object.flippedVertical;
            }
            if (_object.properties === undefined) {
                console.warn('Object does not has custom properties.');
            }
            else {
                var aProperties = _object.properties;
                var propertyIndex = 0;
                var property = void 0;
                while (propertyIndex < aProperties.length) {
                    property = aProperties[propertyIndex];
                    switch (property.name) {
                        case "texture":
                            texture = property.value;
                            break;
                        case "frame_key":
                            {
                                var str = property.value;
                                if (str !== '') {
                                    frame_str = str;
                                }
                            }
                            break;
                        case "frame_index":
                            {
                                var frameIndex = property.value;
                                if (frameIndex >= 0) {
                                    frame_num = frameIndex;
                                }
                            }
                            break;
                        default:
                            break;
                    }
                    ++propertyIndex;
                }
            }
            var image = _scene.add.image(x, y, texture, ((frame_str !== undefined) ? frame_str : frame_num));
            image.setVisible(visible);
            image.setFlipX(flipX);
            image.setFlipY(flipY);
            image.setScale(width / image.width, height / image.height);
            image.setRotation(rotation);
            var actor = baseActor_12.BaseActor.Create(image, name);
            actor.addComponent(cmpImageController_3.CmpImageController.Create());
            actor.addComponent(cmpImageInteractive_1.CmpImageInteractive.Create());
            actor.init();
            return actor;
        };
        ImageButtonBuilder.prototype.destroy = function () { };
        return ImageButtonBuilder;
    }(BaseBuilder_2.BaseBuilder));
    exports.ImageButtonBuilder = ImageButtonBuilder;
});
define("game/src/ts_src/prefabBuilder/objectBuilder/TextBuilder", ["require", "exports", "game/src/ts_src/actors/baseActor", "game/src/ts_src/components/cmpTextController", "game/src/ts_src/prefabBuilder/objectBuilder/BaseBuilder"], function (require, exports, baseActor_13, cmpTextController_7, BaseBuilder_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextBuilder = void 0;
    var TextBuilder = (function (_super) {
        __extends(TextBuilder, _super);
        function TextBuilder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextBuilder.prototype.init = function () { };
        TextBuilder.prototype.build = function (_scene, _object, _xOffset, _yOffset) {
            var name = _object.name;
            if (name === '' || name === undefined) {
                console.warn('Object does not has name');
                name = 'object';
            }
            var x = 0;
            var y = 0;
            var visible = true;
            var width = 0;
            var height = 0;
            var rotation = 0;
            var text = "";
            var horizontalAlignment = "center";
            var fontFamily = "Arial";
            var fontSize = 12;
            var bold = false;
            var italic = false;
            var fontColor = "0x000000";
            var wordWrap = false;
            if (_object.visible !== undefined) {
                visible = _object.visible;
            }
            if (_object.width !== undefined) {
                width = _object.width;
            }
            if (_object.height !== undefined) {
                height = _object.height;
            }
            if (_object.x !== undefined) {
                x = _object.x;
            }
            if (_object.y !== undefined) {
                y = _object.y;
            }
            if (_object.rotation !== undefined) {
                rotation = _object.rotation;
            }
            if (_object.text !== undefined) {
                text = _object.text.text;
                horizontalAlignment = _object.text.halign;
                fontFamily = _object.text.fontfamily;
                fontSize = _object.text.pixelsize;
            }
            if (_object.properties === undefined) {
                console.warn('Object does not has custom properties.');
            }
            else {
                var aProperties = _object.properties;
                var propertyIndex = 0;
                var property = void 0;
                while (propertyIndex < aProperties.length) {
                    property = aProperties[propertyIndex];
                    switch (property.name) {
                        case "bold":
                            bold = property.value;
                            break;
                        case "italic":
                            italic = property.value;
                            break;
                        case "font_color":
                            {
                                fontColor = property.value;
                                var alpha = fontColor.substring(1, 3);
                                var color = fontColor.substring(3, fontColor.length);
                                fontColor = "#" + color + alpha;
                            }
                            break;
                        default:
                            break;
                    }
                    ++propertyIndex;
                }
            }
            var textGameObject = _scene.add.text(x, y, text, {
                fontFamily: fontFamily,
                fontSize: fontSize.toString() + 'px',
                align: horizontalAlignment,
                color: fontColor
            });
            textGameObject.setWordWrapWidth(width);
            if (horizontalAlignment === 'center') {
                textGameObject.setOrigin(0.5, 0.0);
                textGameObject.setPosition(textGameObject.x + (width * 0.5), textGameObject.y);
            }
            else if (horizontalAlignment === 'right') {
                textGameObject.setOrigin(1.0, 0.0);
                textGameObject.setPosition(textGameObject.x + width, textGameObject.y);
            }
            var fontStyle = "";
            if (bold) {
                fontStyle = "bold";
            }
            if (italic) {
                if (fontStyle != "") {
                    fontStyle += " ";
                }
                fontStyle += "italic";
            }
            if (fontStyle != "") {
                textGameObject.setFontStyle(fontStyle);
            }
            textGameObject.setRotation(rotation);
            var actor = baseActor_13.BaseActor.Create(textGameObject, name);
            actor.addComponent(cmpTextController_7.CmpTextController.Create());
            actor.init();
            return actor;
        };
        TextBuilder.prototype.destroy = function () { };
        return TextBuilder;
    }(BaseBuilder_3.BaseBuilder));
    exports.TextBuilder = TextBuilder;
});
define("game/src/ts_src/prefabBuilder/prefabBuilder", ["require", "exports", "game/src/ts_src/actors/prefabActor", "game/src/ts_src/prefabBuilder/objectBuilder/ImageBuilder", "game/src/ts_src/prefabBuilder/objectBuilder/ImageButtonBuilder", "game/src/ts_src/prefabBuilder/objectBuilder/TextBuilder"], function (require, exports, prefabActor_1, ImageBuilder_1, ImageButtonBuilder_1, TextBuilder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PrefabBuilder = void 0;
    var PrefabBuilder = (function () {
        function PrefabBuilder() {
            this._m_hBuilders = new Map();
            return;
        }
        PrefabBuilder.prototype.init = function () {
            this._m_hBuilders.set('ph_Image', new ImageBuilder_1.ImageBuilder());
            this._m_hBuilders.set('ph_Text', new TextBuilder_1.TextBuilder());
            this._m_hBuilders.set('ph_ImageButton', new ImageButtonBuilder_1.ImageButtonBuilder());
            return;
        };
        PrefabBuilder.prototype.build = function (_scene, _key, _name) {
            var prefab = prefabActor_1.PrefabActor.Create(_name);
            if (!_scene.cache.tilemap.has(_key)) {
                console.error("Prefab Tiled Map of key : " + _key + " not found.");
                return prefab;
            }
            var prefabMap = _scene.add.tilemap(_key);
            var aActors = new Array();
            var xOffset = undefined;
            var yOffset = prefabMap.heightInPixels;
            var aObjectLayers = prefabMap.getObjectLayerNames();
            var objectLayer;
            var index = 0;
            var size = aObjectLayers.length;
            while (index < size) {
                objectLayer = prefabMap.getObjectLayer(aObjectLayers[index]);
                var aObjects = objectLayer.objects;
                var object = void 0;
                var objectSize = aObjects.length;
                var objectIndex = 0;
                var builder = void 0;
                var actor = void 0;
                while (objectIndex < objectSize) {
                    object = aObjects[objectIndex];
                    if (object.type === '' || object.type === undefined) {
                        ++objectIndex;
                        continue;
                    }
                    builder = this._m_hBuilders.get(object.type);
                    if (builder == null) {
                        console.warn('Builder type : ' + object.type + ' not found.');
                        ++objectIndex;
                        continue;
                    }
                    actor = builder.build(_scene, object, xOffset, yOffset);
                    prefab.addChild(actor);
                    ++objectIndex;
                }
                ++index;
            }
            return prefab;
        };
        return PrefabBuilder;
    }());
    exports.PrefabBuilder = PrefabBuilder;
});
define("game/src/ts_src/factories/fcUIScorePopup", ["require", "exports", "game/src/ts_src/gameManager/gameManager"], function (require, exports, gameManager_22) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FcUIScorePopup = void 0;
    var FcUIScorePopup = (function () {
        function FcUIScorePopup() {
        }
        FcUIScorePopup.Create = function (_scene, _builder) {
            var scorePopup = _builder.build(_scene, 'prefab_score_popup', 'score_popup');
            var restartButton = scorePopup.getChild('restart_button');
            if (restartButton != null) {
                var button = restartButton.getWrappedInstance();
                button.on('pointerdown', function () {
                    var gm = gameManager_22.GameManager.GetInstance();
                    gm.gameReset();
                    return;
                });
            }
            return scorePopup;
        };
        return FcUIScorePopup;
    }());
    exports.FcUIScorePopup = FcUIScorePopup;
});
define("game/src/ts_src/factories/fcUILosePopup", ["require", "exports", "game/src/ts_src/gameManager/gameManager"], function (require, exports, gameManager_23) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FcUILosePopup = void 0;
    var FcUILosePopup = (function () {
        function FcUILosePopup() {
        }
        FcUILosePopup.Create = function (_scene, _builder) {
            var scorePopup = _builder.build(_scene, 'prefab_lose_popup', 'lose_popup');
            var restartButton = scorePopup.getChild('restart_button');
            if (restartButton != null) {
                var button = restartButton.getWrappedInstance();
                button.on('pointerdown', function () {
                    var gm = gameManager_23.GameManager.GetInstance();
                    gm.gameReset();
                    return;
                });
            }
            return scorePopup;
        };
        return FcUILosePopup;
    }());
    exports.FcUILosePopup = FcUILosePopup;
});
define("game/src/ts_src/uiManager/UIManager", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/factories/fcUIBossHealth", "game/src/ts_src/factories/fcUIHealth", "game/src/ts_src/factories/fcUIPowerShield", "game/src/ts_src/factories/fcUIScore", "game/src/ts_src/factories/fcUIScoreMultiplier", "game/src/ts_src/factories/fcUIScorePopup", "game/src/ts_src/factories/fcUILosePopup", "game/src/ts_src/gameManager/gameManager", "game/src/ts_src/prefabBuilder/prefabBuilder"], function (require, exports, _1942enums_85, fcUIBossHealth_1, fcUIHealth_1, fcUIPowerShield_1, fcUIScore_1, fcUIScoreMultiplier_1, fcUIScorePopup_1, fcUILosePopup_1, gameManager_24, prefabBuilder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIManager = void 0;
    var UIManager = (function () {
        function UIManager() {
        }
        UIManager.prototype.init = function (_scene, _gameManager) {
            var heroHealth = fcUIHealth_1.FcUIHealth.Create(_scene);
            this._m_heroHealth = heroHealth;
            var playerController = _gameManager.getPlayerController();
            var hero = playerController.getPlayer();
            if (hero != null) {
                var heroData = hero.getComponent(_1942enums_85.DC_COMPONENT_ID.kHeroData);
                var hpData = heroHealth.getComponent(_1942enums_85.DC_COMPONENT_ID.kUIHealthController);
                heroData.suscribe('onHealthChanged', "UIHealth", hpData.onHealthChanged, hpData);
                hpData.onHealthChanged(heroData, undefined);
            }
            var heroScore = fcUIScore_1.FcUIScore.Create(_scene);
            this._m_heroScore = heroScore;
            var scoreController = heroScore.getComponent(_1942enums_85.DC_COMPONENT_ID.kUIScoreController);
            var scoreManager = _gameManager.getScoreManager();
            scoreManager.suscribe("scoreChanged", "scoreUI", scoreController.onScoreChanged, scoreController);
            var scoreMult = fcUIScoreMultiplier_1.FcUIScoreMultiplier.Create(_scene);
            this._m_scoreMultiplier = scoreMult;
            var scoreMultController = scoreMult.getComponent(_1942enums_85.DC_COMPONENT_ID.kUIScoreMultiplier);
            scoreManager.suscribe('multiplierChanged', 'ScoreMultiplerUI', scoreMultController.onMultiplierChange, scoreMultController);
            var powerShieldUI = fcUIPowerShield_1.FcUIPowerShield.Create(_scene);
            this._m_powerShield = powerShieldUI;
            var heroController = hero.getComponent(_1942enums_85.DC_COMPONENT_ID.kHeroController);
            var powerShield = heroController.getPowerShieldActor();
            var powerShieldController = powerShield.getComponent(_1942enums_85.DC_COMPONENT_ID.kPowerShieldComponent);
            var powerShieldUIController = powerShieldUI.getComponent(_1942enums_85.DC_COMPONENT_ID.kUIPowerShieldController);
            powerShieldController.on('active', 'powerShieldUI', powerShieldUIController.onPowerShieldActivated, powerShieldUIController);
            powerShieldController.on('desactive', 'powerShieldUI', powerShieldUIController.onPowerShieldDesactivated, powerShieldUIController);
            powerShieldController.on('progress', 'powerShieldUI', powerShieldUIController.onProgress, powerShieldUIController);
            this._m_bossScore = fcUIBossHealth_1.FCUIBossHealth.Create(_scene);
            var bossHealthController = this._m_bossScore.getComponent(_1942enums_85.DC_COMPONENT_ID.kUIBossHealthControl);
            var bossManager = _gameManager.getBossManager();
            bossManager.suscribe("onHealthChanged", "bossHealthUI", bossHealthController.onHealthChanged, bossHealthController);
            bossHealthController.onHealthChanged(bossManager, bossManager.getBossHealth());
            var builder = new prefabBuilder_1.PrefabBuilder();
            builder.init();
            this._m_popupScore = fcUIScorePopup_1.FcUIScorePopup.Create(_scene, builder);
            this._m_popupScore.sendMessage(_1942enums_85.DC_MESSAGE_ID.kClose, undefined);
            this._m_losePopup = fcUILosePopup_1.FcUILosePopup.Create(_scene, builder);
            this._m_losePopup.sendMessage(_1942enums_85.DC_MESSAGE_ID.kClose, undefined);
            return;
        };
        UIManager.prototype.reset = function (_scene, _gameManager) {
            if (this._m_heroHealth == null) {
                this._m_heroHealth = fcUIHealth_1.FcUIHealth.Create(_scene);
            }
            this._m_heroHealth.sendMessage(_1942enums_85.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(20, 20));
            if (this._m_heroScore == null) {
                this._m_heroScore = fcUIScore_1.FcUIScore.Create(_scene);
            }
            this._m_heroScore.sendMessage(_1942enums_85.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(600, 20));
            if (this._m_scoreMultiplier == null) {
                this._m_scoreMultiplier = fcUIScore_1.FcUIScore.Create(_scene);
            }
            this._m_scoreMultiplier.sendMessage(_1942enums_85.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(600, 75));
            if (this._m_powerShield == null) {
                this._m_powerShield = fcUIPowerShield_1.FcUIPowerShield.Create(_scene);
            }
            this._m_powerShield.sendMessage(_1942enums_85.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(20, 75));
            this._m_powerShield.sendMessage(_1942enums_85.DC_MESSAGE_ID.kClose, undefined);
            this._m_bossScore.sendMessage(_1942enums_85.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(20, 150));
            this._m_bossScore.sendMessage(_1942enums_85.DC_MESSAGE_ID.kClose, null);
            return;
        };
        UIManager.prototype.receive = function (_id, _msg) {
            switch (_id) {
                case _1942enums_85.DC_MESSAGE_ID.kMisionCompleted:
                    this._onMissionCompleted(_msg);
                    return;
                case _1942enums_85.DC_MESSAGE_ID.kMisionFailure:
                    this._onMissionFailure(_msg);
                    return;
                case _1942enums_85.DC_MESSAGE_ID.kBossEnter:
                    this._m_bossScore.sendMessage(_1942enums_85.DC_MESSAGE_ID.kShow, null);
                    return;
            }
            return;
        };
        UIManager.prototype.update = function (_dt) {
            this._m_heroHealth.update();
            this._m_heroScore.update();
            this._m_bossScore.update();
            this._m_powerShield.update();
            return;
        };
        UIManager.prototype.destroy = function () {
            this._m_heroHealth.destroy();
            this._m_heroHealth = null;
            this._m_heroScore.destroy();
            this._m_heroScore = null;
            this._m_bossScore.destroy();
            this._m_bossScore = null;
            this._m_powerShield.destroy();
            this._m_powerShield = null;
            this._m_popupScore.destroy();
            this._m_popupScore = null;
            this._m_losePopup.destroy();
            this._m_losePopup = null;
            return;
        };
        UIManager.prototype._onMissionCompleted = function (_gameManager) {
            var popupScore = this._m_popupScore;
            popupScore.sendMessage(_1942enums_85.DC_MESSAGE_ID.kShow, undefined);
            var gm = gameManager_24.GameManager.GetInstance();
            var scoreManager = gm.getScoreManager();
            var acScorePoints = popupScore.getChild('score_points');
            acScorePoints.sendMessage(_1942enums_85.DC_MESSAGE_ID.kSetText, scoreManager.getScore().toString());
            var acKillBonus = popupScore.getChild('kill_multiplier');
            acKillBonus.sendMessage(_1942enums_85.DC_MESSAGE_ID.kSetText, 'x' + scoreManager.getKillsBonus().toString());
            var acHealthBonus = popupScore.getChild('health_multiplier');
            acHealthBonus.sendMessage(_1942enums_85.DC_MESSAGE_ID.kSetText, 'x' + scoreManager.getHealthBonus().toString());
            var acTotalPoints = popupScore.getChild('total_points');
            acTotalPoints.sendMessage(_1942enums_85.DC_MESSAGE_ID.kSetText, 'x' + scoreManager.getTotalScore().toString());
            var starsNum = scoreManager.getStarsNum();
            var textureKey;
            if (starsNum == 0) {
                textureKey = 'gui_star_4';
            }
            else if (starsNum == 1) {
                textureKey = 'gui_star_3';
            }
            else if (starsNum == 2) {
                textureKey = 'gui_star_2';
            }
            else {
                textureKey = 'gui_star_1';
            }
            var acStars = popupScore.getChild('stars');
            acStars.sendMessage(_1942enums_85.DC_MESSAGE_ID.kSetTexture, textureKey);
            return;
        };
        UIManager.prototype._onMissionFailure = function (_gameManager) {
            this._m_losePopup.sendMessage(_1942enums_85.DC_MESSAGE_ID.kShow, undefined);
            return;
        };
        return UIManager;
    }());
    exports.UIManager = UIManager;
});
define("game/src/ts_src/states/stateSpiderAttack", ["require", "exports", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, nullBulletManager_12, _1942enums_86, gameManager_25) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StateSpiderAttack = void 0;
    var StateSpiderAttack = (function () {
        function StateSpiderAttack() {
            this.m_id = "Spider_Attack";
            this._m_bulletForce = new Phaser.Math.Vector2();
            this._m_fireRate = 0.3;
            this._m_gameManager = gameManager_25.GameManager.GetInstance();
            this._m_bulletManager = nullBulletManager_12.NullBulletManager.GetInstance();
            return;
        }
        StateSpiderAttack.prototype.onEnter = function () {
            this._m_angle = 0.0;
            this._m_t = 0.0;
            return;
        };
        StateSpiderAttack.prototype.onExit = function () { };
        StateSpiderAttack.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_86.DC_MESSAGE_ID.kHit:
                    this._m_spiderControl.addHealthPoints(-_obj);
                    return;
            }
        };
        StateSpiderAttack.prototype.update = function () {
            var time = this._m_t + this._m_gameManager.m_dt;
            if (time >= this._m_fireRate) {
                var angle = this._m_angle + 0.25;
                if (angle > 3.1415) {
                    angle = 0.0;
                }
                var force = this._m_bulletForce;
                force.setTo(1.0, 0.0);
                var cosA = Math.cos(angle);
                var sinA = Math.sin(angle);
                force.setTo((force.x * cosA) - (force.y * sinA), (force.x * sinA) + (force.y * cosA));
                this._m_bulletManager.spawn(this._m_spiderSprite.x, this._m_spiderSprite.y + 100, _1942enums_86.DC_BULLET_TYPE.kEnemyBasic, force);
                this._m_angle = angle;
                time = 0;
            }
            this._m_t = time;
            return;
        };
        StateSpiderAttack.prototype.setSpiderController = function (_spiderControl) {
            this._m_spiderControl = _spiderControl;
            return;
        };
        StateSpiderAttack.prototype.setSpiderSprite = function (_sprite) {
            this._m_spiderSprite = _sprite;
            return;
        };
        StateSpiderAttack.prototype.setBulletManager = function (_bulletManager) {
            this._m_bulletManager = _bulletManager;
            return;
        };
        StateSpiderAttack.prototype.destroy = function () { };
        return StateSpiderAttack;
    }());
    exports.StateSpiderAttack = StateSpiderAttack;
});
define("game/src/ts_src/states/stateSpiderEnter", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StateSpiderEnter = void 0;
    var StateSpiderEnter = (function () {
        function StateSpiderEnter(_spiderController, _spiderSprite, _gameManager) {
            this._m_spiderControl = _spiderController;
            this._m_spider = _spiderSprite;
            this._m_gameManager = _gameManager;
            this.m_id = "Spider_Enter";
            return;
        }
        StateSpiderEnter.prototype.onEnter = function () { };
        StateSpiderEnter.prototype.onExit = function () { };
        StateSpiderEnter.prototype.receive = function (_id, _obj) { };
        StateSpiderEnter.prototype.update = function () {
            var sprite = this._m_spider;
            var toPosition = new Phaser.Math.Vector2(540.0 - sprite.x, 350.0 - sprite.y);
            var mag = toPosition.length();
            if (mag > 0.1) {
                var dist = this._m_gameManager.m_dt * this._m_spiderControl.getSpeed();
                if (mag > dist) {
                    toPosition.normalize();
                    toPosition.x *= dist;
                    toPosition.y *= dist;
                }
                sprite.x += toPosition.x;
                sprite.y += toPosition.y;
            }
            else {
                this._m_spiderControl.setActive("Spider_Attack");
            }
            return;
        };
        StateSpiderEnter.prototype.destroy = function () {
            this._m_spiderControl = null;
            this._m_gameManager = null;
            this._m_spider = null;
            return;
        };
        return StateSpiderEnter;
    }());
    exports.StateSpiderEnter = StateSpiderEnter;
});
define("game/src/ts_src/states/stateSpiderIdle", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_87) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StateSpiderIdle = void 0;
    var StateSpiderIdle = (function () {
        function StateSpiderIdle(_spiderController, _spiderSprite) {
            this._m_spiderControl = _spiderController;
            this._m_sprite = _spiderSprite;
            this.m_id = "Spider_Idle";
            return;
        }
        StateSpiderIdle.prototype.onEnter = function () {
            this._m_sprite.setVisible(false);
            this._m_sprite.setActive(false);
            this._m_sprite.body.enable = false;
            return;
        };
        StateSpiderIdle.prototype.onExit = function () {
            this._m_sprite.setVisible(true);
            this._m_sprite.setActive(true);
            this._m_sprite.body.enable = true;
            return;
        };
        StateSpiderIdle.prototype.receive = function (_id, _obj) {
            if (_id == _1942enums_87.DC_MESSAGE_ID.kBossEnter) {
                this._m_spiderControl.setActive('Spider_Enter');
            }
            return;
        };
        StateSpiderIdle.prototype.update = function () { };
        StateSpiderIdle.prototype.destroy = function () {
            this._m_spiderControl = null;
            this._m_sprite = null;
            return;
        };
        return StateSpiderIdle;
    }());
    exports.StateSpiderIdle = StateSpiderIdle;
});
define("game/src/ts_src/components/cmpSpiderBossController", ["require", "exports", "listeners/mxListener", "listeners/mxListenerManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager", "game/src/ts_src/states/nullState", "game/src/ts_src/states/stateSpiderAttack", "game/src/ts_src/states/stateSpiderEnter", "game/src/ts_src/states/stateSpiderIdle"], function (require, exports, mxListener_4, mxListenerManager_4, _1942enums_88, gameManager_26, nullState_5, stateSpiderAttack_1, stateSpiderEnter_1, stateSpiderIdle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpSpiderBossController = void 0;
    var CmpSpiderBossController = (function () {
        function CmpSpiderBossController() {
            this.m_id = _1942enums_88.DC_COMPONENT_ID.kSpiderBossController;
            return;
        }
        CmpSpiderBossController.prototype.init = function (_actor) {
            this.destroy();
            this._m_events = new mxListenerManager_4.MxListenerManager();
            this._m_events.addEvent("onHealthChanged");
            this._m_health = 50.0;
            this._m_speed = 200.0;
            this._m_gameManager = gameManager_26.GameManager.GetInstance();
            this._hStates = new Map();
            var idleState = new stateSpiderIdle_1.StateSpiderIdle(this, _actor.getWrappedInstance());
            this._hStates.set(idleState.m_id, idleState);
            var enterState = new stateSpiderEnter_1.StateSpiderEnter(this, _actor.getWrappedInstance(), gameManager_26.GameManager.GetInstance());
            this._hStates.set(enterState.m_id, enterState);
            var attackState = new stateSpiderAttack_1.StateSpiderAttack();
            attackState.setSpiderSprite(_actor.getWrappedInstance());
            attackState.setSpiderController(this);
            this._hStates.set(attackState.m_id, attackState);
            this.setActive("Spider_Idle");
            return;
        };
        CmpSpiderBossController.prototype.update = function (_actor) {
            this._activeState.update();
            return;
        };
        CmpSpiderBossController.prototype.receive = function (_id, _obj) {
            this._activeState.receive(_id, _obj);
            return;
        };
        CmpSpiderBossController.prototype.setActive = function (_stateID) {
            if (this._hStates.has(_stateID)) {
                var active = this._activeState;
                active.onExit();
                active = this._hStates.get(_stateID);
                active.onEnter();
                this._activeState = active;
            }
            return;
        };
        CmpSpiderBossController.prototype.setSpeed = function (_speed) {
            this._m_speed = _speed;
            return;
        };
        CmpSpiderBossController.prototype.getSpeed = function () {
            return this._m_speed;
        };
        CmpSpiderBossController.prototype.getState = function (_id) {
            return this._hStates.get(_id);
        };
        CmpSpiderBossController.prototype.getHealth = function () {
            return this._m_health;
        };
        CmpSpiderBossController.prototype.addHealthPoints = function (_points) {
            this._m_health += _points;
            if (this._m_health <= 0) {
                this._m_health = 0;
                gameManager_26.GameManager.ReceiveMessage(_1942enums_88.DC_MESSAGE_ID.kMisionCompleted, null);
            }
            this._m_events.call('onHealthChanged', this._m_gameManager.getBossManager(), this._m_health);
            return;
        };
        CmpSpiderBossController.prototype.suscribe = function (_event, _username, _fn, _context) {
            this._m_events.suscribe(_event, _username, new mxListener_4.MxListener(_fn, _context));
            return;
        };
        CmpSpiderBossController.prototype.unsuscribe = function (_event, _username) {
            this._m_events.unsuscribe(_event, _username);
            return;
        };
        CmpSpiderBossController.prototype.destroy = function () {
            if (this._hStates != null) {
                this._hStates.forEach(function (_state) {
                    _state.destroy();
                });
                this._hStates.clear();
                this._hStates = null;
            }
            if (this._m_events != null) {
                this._m_events.destroy();
                this._m_events = null;
            }
            this._activeState = nullState_5.NullState.GetInstance();
            this._m_gameManager = null;
            return;
        };
        return CmpSpiderBossController;
    }());
    exports.CmpSpiderBossController = CmpSpiderBossController;
});
define("game/src/ts_src/bossManager/spiderBossManager", ["require", "exports", "game/src/ts_src/actors/baseActor", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpNullCollisionController", "game/src/ts_src/components/cmpPhysicSpriteController", "game/src/ts_src/components/cmpSpiderBossController", "game/src/ts_src/gameManager/gameManager"], function (require, exports, baseActor_14, nullBulletManager_13, _1942enums_89, cmpNullCollisionController_6, cmpPhysicSpriteController_2, cmpSpiderBossController_1, gameManager_27) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpiderBossManager = void 0;
    var SpiderBossManager = (function () {
        function SpiderBossManager() {
        }
        SpiderBossManager.prototype.init = function (_scene, _gameManager) {
            this.destroy();
            this._m_bulletManager = nullBulletManager_13.NullBulletManager.GetInstance();
            var phySprite = _scene.physics.add.sprite(0.0, 0.0, 'spiderBoss');
            var spiderActor = baseActor_14.BaseActor.Create(phySprite, 'SpiderBoss');
            phySprite.setData('actor', spiderActor);
            spiderActor.addComponent(cmpPhysicSpriteController_2.CmpPhysicSpriteController.Create());
            spiderActor.addComponent(new cmpSpiderBossController_1.CmpSpiderBossController());
            spiderActor.addComponent(cmpNullCollisionController_6.CmpNullCollisionController.GetInstance());
            spiderActor.init();
            this._m_spider = spiderActor;
            return;
        };
        SpiderBossManager.prototype.update = function (_dt) {
            this._m_spider.update();
            return;
        };
        SpiderBossManager.prototype.getBossHealth = function () {
            var spiderController = this._m_spider.getComponent(_1942enums_89.DC_COMPONENT_ID.kSpiderBossController);
            return spiderController.getHealth();
        };
        SpiderBossManager.prototype.setPosition = function (_x, _y) {
            this._m_spider.sendMessage(_1942enums_89.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(_x, _y, 0.0));
            return;
        };
        SpiderBossManager.prototype.setHero = function (_playerController, _actor) {
            var heroBulletManager = _playerController.getBulletManager();
            var gameManager = gameManager_27.GameManager.GetInstance();
            heroBulletManager.collisionVsSprite(gameManager.getGameScene(), this._m_spider.getWrappedInstance());
            this._m_hero = _actor;
            return;
        };
        SpiderBossManager.prototype.getHero = function () {
            return this._m_hero;
        };
        SpiderBossManager.prototype.setBulletManager = function (_bulletManager) {
            this._m_bulletManager = _bulletManager;
            var spiderControl = this._m_spider.getComponent(_1942enums_89.DC_COMPONENT_ID.kSpiderBossController);
            var attackState = spiderControl.getState('Spider_Attack');
            attackState.setBulletManager(_bulletManager);
            spiderControl;
            return;
        };
        SpiderBossManager.prototype.getBulletManager = function () {
            return this._m_bulletManager;
        };
        SpiderBossManager.prototype.active = function () {
            this._m_spider.sendMessage(_1942enums_89.DC_MESSAGE_ID.kBossEnter, null);
            return;
        };
        SpiderBossManager.prototype.desactive = function () {
            return;
        };
        SpiderBossManager.prototype.suscribe = function (_event, _username, _fn, _context) {
            var spiderController = this._m_spider.getComponent(_1942enums_89.DC_COMPONENT_ID.kSpiderBossController);
            spiderController.suscribe(_event, _username, _fn, _context);
            return;
        };
        SpiderBossManager.prototype.unsuscribe = function (_event, _username) {
            var spiderController = this._m_spider.getComponent(_1942enums_89.DC_COMPONENT_ID.kSpiderBossController);
            spiderController.unsuscribe(_event, _username);
            return;
        };
        SpiderBossManager.prototype.receive = function (_id, _msg) {
            if (_id == _1942enums_89.DC_MESSAGE_ID.kBossEnter) {
                this.active();
            }
            return;
        };
        SpiderBossManager.prototype.destroy = function () {
            if (this._m_spider != null) {
                this._m_spider.destroy();
                this._m_spider = null;
            }
            this._m_bulletManager = null;
            return;
        };
        return SpiderBossManager;
    }());
    exports.SpiderBossManager = SpiderBossManager;
});
define("game/src/ts_src/bulletManager/bulletSpawner/heroTripleShotSpawner", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/configObjects/cnfBulletProperties", "game/src/ts_src/configObjects/cnfHeroTripleShotBullet", "game/src/ts_src/gameManager/gameManager", "game/src/ts_src/bulletManager/bulletSpawner/nullBulletSpawner"], function (require, exports, _1942enums_90, cnfBulletProperties_2, cnfHeroTripleShotBullet_2, gameManager_28, nullBulletSpawner_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.heroTripleShotSpawner = void 0;
    var heroTripleShotSpawner = (function () {
        function heroTripleShotSpawner() {
        }
        heroTripleShotSpawner.prototype.init = function () {
            var gameManager = gameManager_28.GameManager.GetInstance();
            var levelConfiguration = gameManager.getLevelConfiguration();
            var config = levelConfiguration.getConfig(_1942enums_90.DC_CONFIG.kHeroTripleShotBullet);
            if (config == null) {
                config = new cnfHeroTripleShotBullet_2.CnfHeroTripleShotBullet();
            }
            this.setBulletConfiguration(config);
            return;
        };
        heroTripleShotSpawner.Create = function () {
            var spawner = new heroTripleShotSpawner;
            spawner.setBulletConfiguration(new cnfHeroTripleShotBullet_2.CnfHeroTripleShotBullet());
            return spawner;
        };
        heroTripleShotSpawner.prototype.setBulletConfiguration = function (_config) {
            this._m_bulletConfig = _config;
            return;
        };
        heroTripleShotSpawner.prototype.update = function (_dt) {
            return;
        };
        heroTripleShotSpawner.prototype.spawn = function (_actor, _x, _y, _data) {
            this.assemble(_actor);
            var bulletProperties;
            if (_data !== undefined) {
                bulletProperties = _data;
            }
            else {
                bulletProperties = new cnfBulletProperties_2.CnfBulletProperties();
            }
            _actor.sendMessage(_1942enums_90.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(_x, _y, 0.0));
            _actor.sendMessage(_1942enums_90.DC_MESSAGE_ID.kDirection, bulletProperties.direction);
            _actor.sendMessage(_1942enums_90.DC_MESSAGE_ID.kSpeed, this._m_bulletConfig.speed);
            return;
        };
        heroTripleShotSpawner.prototype.assemble = function (_actor) {
            var bulletData = _actor.getComponent(_1942enums_90.DC_COMPONENT_ID.kBulletData);
            bulletData.setSpawner(this);
            bulletData.setAttackPoints(this._m_bulletConfig.collision_damage);
            var sprite = _actor.getWrappedInstance();
            var circle_radius = sprite.height * 0.5;
            sprite.body.setCircle(circle_radius, (sprite.width * 0.5) - circle_radius, (sprite.height * 0.5) - circle_radius);
            return;
        };
        heroTripleShotSpawner.prototype.disassemble = function (_actor) {
            var bulletData = _actor.getComponent(_1942enums_90.DC_COMPONENT_ID.kBulletData);
            bulletData.setSpawner(nullBulletSpawner_7.NullBulletSpawner.GetInstance());
            this._m_bulletManager.disableActor(_actor);
            return;
        };
        heroTripleShotSpawner.prototype.setBulletManager = function (_manager) {
            this._m_bulletManager = _manager;
            return;
        };
        heroTripleShotSpawner.prototype.getID = function () {
            return _1942enums_90.DC_BULLET_TYPE.kTripleSHot;
        };
        heroTripleShotSpawner.prototype.destroy = function () {
            this._m_bulletConfig = null;
            this._m_bulletManager = null;
            return;
        };
        return heroTripleShotSpawner;
    }());
    exports.heroTripleShotSpawner = heroTripleShotSpawner;
});
define("game/src/ts_src/states/rangerController/iRangerState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/states/rangerController/sttRangerExplosion", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SttRangerExplosion = void 0;
    var SttRangerExplosion = (function () {
        function SttRangerExplosion() {
            this.m_id = "explosion";
            return;
        }
        SttRangerExplosion.prototype.init = function (_controller, _actor) {
            this._m_controller = _controller;
            this._m_actor = _actor;
            return;
        };
        SttRangerExplosion.prototype.setConfig = function (_config) {
            this._m_config = _config;
            return;
        };
        SttRangerExplosion.prototype.onEnter = function () {
            return;
        };
        SttRangerExplosion.prototype.onExit = function () {
            return;
        };
        SttRangerExplosion.prototype.receive = function (_id, _obj) {
            return;
        };
        SttRangerExplosion.prototype.update = function () {
            return;
        };
        SttRangerExplosion.prototype.destroy = function () {
            return;
        };
        return SttRangerExplosion;
    }());
    exports.SttRangerExplosion = SttRangerExplosion;
});
define("game/src/ts_src/states/rangerController/sttRangerIdle", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SttRangerIdle = void 0;
    var SttRangerIdle = (function () {
        function SttRangerIdle() {
            this.m_id = "idle";
            return;
        }
        SttRangerIdle.prototype.init = function (_controller, _actor) {
            this._m_controller = _controller;
            this._m_actor = _actor;
            return;
        };
        SttRangerIdle.prototype.setConfig = function (_config) {
            this._m_config = _config;
        };
        SttRangerIdle.prototype.onEnter = function () { };
        SttRangerIdle.prototype.onExit = function () { };
        SttRangerIdle.prototype.receive = function (_id, _obj) { };
        SttRangerIdle.prototype.update = function () { };
        SttRangerIdle.prototype.destroy = function () {
            this._m_actor = null;
            this._m_controller = null;
            this._m_config = null;
            return;
        };
        return SttRangerIdle;
    }());
    exports.SttRangerIdle = SttRangerIdle;
});
define("game/src/ts_src/states/rangerController/sttRangerPursuit", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, _1942enums_91, gameManager_29) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SttRangerPursuit = void 0;
    var SttRangerPursuit = (function () {
        function SttRangerPursuit() {
            this._m_gameManager = gameManager_29.GameManager.GetInstance();
            this.m_id = "pursuit";
            this._m_direction = new Phaser.Math.Vector3();
            this._m_currentForce = new Phaser.Math.Vector3();
            this._m_desireForce = new Phaser.Math.Vector3();
            this._m_steerForce = new Phaser.Math.Vector3();
            this._m_cam_p1 = new Phaser.Geom.Point();
            this._m_cam_p2 = new Phaser.Geom.Point();
            return;
        }
        SttRangerPursuit.prototype.init = function (_controller, _actor) {
            this._m_controller = _controller;
            this._m_actor = _actor;
            var playerControl = this._m_gameManager.getPlayerController();
            this._m_target = playerControl.getPlayer();
            this._m_direction.set(0.0, -1.0);
            var canvas = this._m_gameManager.getGameScene().game.canvas;
            this._m_cam_p2.setTo(canvas.width, canvas.height);
            return;
        };
        SttRangerPursuit.prototype.setConfig = function (_config) {
            this._m_config = _config;
            return;
        };
        SttRangerPursuit.prototype.onEnter = function () {
            this._m_time = 0.0;
            return;
        };
        SttRangerPursuit.prototype.onExit = function () {
            return;
        };
        SttRangerPursuit.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_91.DC_MESSAGE_ID.kKill:
                    gameManager_29.GameManager.ReceiveMessage(_1942enums_91.DC_MESSAGE_ID.kAddScorePoints, this._m_config.score);
                    this._explode();
                    return;
                case _1942enums_91.DC_MESSAGE_ID.kCollisionWithHero:
                    this._explode();
                    return;
                default:
                    return;
            }
        };
        SttRangerPursuit.prototype.update = function () {
            var deltaTime = this._m_gameManager.m_dt;
            var time;
            if (this._insideCanvas()) {
                time = this._m_time + deltaTime;
            }
            else {
                time = this._m_time;
            }
            this._m_time = time;
            var config = this._m_config;
            if (time >= config.life_time) {
                this._explode();
                return;
            }
            var playerSprite = this._m_target.getWrappedInstance();
            var self = this._m_actor.getWrappedInstance();
            var direction = this._m_direction;
            var speed = config.speed;
            var currentForce = this._m_currentForce;
            currentForce.set(direction.x * speed, direction.y * speed);
            var desireForce = this._m_desireForce;
            desireForce.set(playerSprite.x - self.x, playerSprite.y - self.y);
            if (desireForce.length() > speed) {
                desireForce.normalize();
                desireForce.set(desireForce.x * speed, desireForce.y * speed);
            }
            var steerForce = this._m_steerForce;
            steerForce.set(desireForce.x - currentForce.x, desireForce.y - currentForce.y);
            var forceMagnitude = config.steer_force;
            if (steerForce.length() > forceMagnitude) {
                steerForce.normalize();
                steerForce.set(steerForce.x * forceMagnitude, steerForce.y * forceMagnitude);
            }
            var mass = config.mass;
            steerForce.set(steerForce.x / mass, steerForce.y / mass);
            steerForce.set(currentForce.x + steerForce.x, currentForce.y + steerForce.y);
            if (steerForce.length() > speed) {
                steerForce.normalize();
                steerForce.set(steerForce.x * speed, steerForce.y * speed);
            }
            steerForce.set(steerForce.x * deltaTime, steerForce.y * deltaTime);
            this._m_actor.sendMessage(_1942enums_91.DC_MESSAGE_ID.kAgentMove, steerForce);
            steerForce.normalize();
            direction.set(steerForce.x, steerForce.y);
            this._m_actor.sendMessage(_1942enums_91.DC_MESSAGE_ID.kDirection, direction);
            var directionV2 = new Phaser.Math.Vector2(direction.x, direction.y);
            self.setAngle(Phaser.Math.RadToDeg(directionV2.angle()));
            return;
        };
        SttRangerPursuit.prototype.destroy = function () {
            this._m_gameManager = null;
            this._m_controller = null;
            this._m_config = null;
            this._m_actor = null;
            this._m_target = null;
            return;
        };
        SttRangerPursuit.prototype._explode = function () {
            var hero = this._m_target;
            var heroSprite = this._m_target.getWrappedInstance();
            var selfSprite = this._m_actor.getWrappedInstance();
            var vecToPlayer = new Phaser.Math.Vector2(heroSprite.x - selfSprite.x, heroSprite.y - selfSprite.y);
            var config = this._m_config;
            if (vecToPlayer.length() <= config.explosion_radius) {
                this._m_target.sendMessage(_1942enums_91.DC_MESSAGE_ID.kRangerExplosionHit, config.collision_damage);
            }
            this._m_controller.desactiveActor();
            this._m_controller.setActiveState('idle');
            return;
        };
        SttRangerPursuit.prototype._insideCanvas = function () {
            var p1 = this._m_cam_p1;
            var p2 = this._m_cam_p2;
            var sprite = this._m_actor.getWrappedInstance();
            return (p1.x < sprite.x && sprite.x < p2.x)
                && (p1.y < sprite.y && sprite.y < p2.y);
        };
        return SttRangerPursuit;
    }());
    exports.SttRangerPursuit = SttRangerPursuit;
});
define("game/src/ts_src/components/cmpRangerController", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/states/rangerController/sttRangerExplosion", "game/src/ts_src/states/rangerController/sttRangerIdle", "game/src/ts_src/states/rangerController/sttRangerPursuit"], function (require, exports, _1942enums_92, sttRangerExplosion_1, sttRangerIdle_1, sttRangerPursuit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpRangerController = void 0;
    var CmpRangerController = (function () {
        function CmpRangerController() {
        }
        CmpRangerController.Create = function () {
            var cmp = new CmpRangerController();
            cmp.m_id = _1942enums_92.DC_COMPONENT_ID.kEnemyController;
            cmp._m_hStates = new Map();
            cmp.addState(new sttRangerExplosion_1.SttRangerExplosion());
            cmp.addState(new sttRangerPursuit_1.SttRangerPursuit());
            var idleState = new sttRangerIdle_1.SttRangerIdle();
            cmp.addState(idleState);
            cmp._m_active_state = idleState;
            return cmp;
        };
        CmpRangerController.prototype.init = function (_actor) {
            this._m_actor = _actor;
            this._m_hStates.forEach(function (_state) {
                _state.init(this, _actor);
                return;
            }, this);
            return;
        };
        CmpRangerController.prototype.update = function (_actor) {
            this._m_active_state.update();
            return;
        };
        CmpRangerController.prototype.receive = function (_id, _obj) {
            this._m_active_state.receive(_id, _obj);
            return;
        };
        CmpRangerController.prototype.setActiveState = function (_state_name) {
            if (this._m_hStates.has(_state_name)) {
                var activeState = this._m_active_state;
                activeState.onExit();
                activeState = this._m_hStates.get(_state_name);
                activeState.onEnter();
                this._m_active_state = activeState;
            }
            return;
        };
        CmpRangerController.prototype.addState = function (_state) {
            this._m_hStates.set(_state.m_id, _state);
            return;
        };
        CmpRangerController.prototype.getState = function (_state_name) {
            return this._m_hStates.get(_state_name);
        };
        CmpRangerController.prototype.setConfig = function (_config) {
            this._m_config = _config;
            this._m_hStates.forEach(function (_state) {
                _state.setConfig(_config);
                return;
            }, this);
            return;
        };
        CmpRangerController.prototype.getCollisionDamage = function () {
            return this._m_config.collision_damage;
        };
        CmpRangerController.prototype.setSpawner = function (_spawner) {
            this._m_spawner = _spawner;
            return;
        };
        CmpRangerController.prototype.getSpawner = function () {
            return this._m_spawner;
        };
        CmpRangerController.prototype.getScorePoints = function () {
            return this._m_config.score;
        };
        CmpRangerController.prototype.setScorePoints = function (_points) {
            this._m_config.score = _points;
        };
        CmpRangerController.prototype.setEnemiesManager = function (_enemyManager) {
            this._m_enemiesManager = _enemyManager;
        };
        CmpRangerController.prototype.getEnemiesManager = function () {
            return this._m_enemiesManager;
        };
        CmpRangerController.prototype.getActor = function () {
            return this._m_actor;
        };
        CmpRangerController.prototype.desactiveActor = function () {
            var self = this._m_actor;
            this._m_spawner.disasemble(self);
            this._m_enemiesManager.disableActor(self);
            return;
        };
        CmpRangerController.prototype.destroy = function () {
            this._m_spawner = null;
            this._m_enemiesManager = null;
            return;
        };
        return CmpRangerController;
    }());
    exports.CmpRangerController = CmpRangerController;
});
define("game/src/ts_src/enemiesManager/enemySpawner/rangerSpawner", ["require", "exports", "optimization/mxObjectPool", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpNullEnemyController", "game/src/ts_src/components/cmpRangerController", "game/src/ts_src/configObjects/cnfRangerSpawnerConfig", "game/src/ts_src/enemiesManager/nullEnemiesManager"], function (require, exports, mxObjectPool_7, nullBulletManager_14, _1942enums_93, cmpNullEnemyController_4, cmpRangerController_1, cnfRangerSpawnerConfig_2, nullEnemiesManager_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RangerSpawner = void 0;
    var RangerSpawner = (function () {
        function RangerSpawner() {
        }
        RangerSpawner.Create = function () {
            var spawner = new RangerSpawner();
            spawner._m_enemiesManager = nullEnemiesManager_6.NullEnemiesManager.GetInstance();
            return spawner;
        };
        RangerSpawner.prototype.init = function (_config) {
            if (_config === undefined) {
                _config = new cnfRangerSpawnerConfig_2.CnfRangerSpawner();
            }
            var poolController = this._m_poolController;
            if (poolController != null) {
                poolController.destroy();
            }
            var aControllers = new Array();
            var controller;
            var index = 0;
            while (index < _config.pool_size) {
                controller = cmpRangerController_1.CmpRangerController.Create();
                controller.setSpawner(this);
                aControllers.push(controller);
                ++index;
            }
            poolController = mxObjectPool_7.MxObjectPool.Create();
            poolController.init(aControllers);
            this._m_poolController = poolController;
            return;
        };
        RangerSpawner.prototype.update = function (_dt) {
            return;
        };
        RangerSpawner.prototype.spawn = function (_actor, _x, _y, _data) {
            this.assemble(_actor, _data);
            _actor.sendMessage(_1942enums_93.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(_x, _y));
            return;
        };
        RangerSpawner.prototype.getID = function () {
            return _1942enums_93.DC_ENEMY_TYPE.kRanger;
        };
        RangerSpawner.prototype.assemble = function (_actor, _data) {
            var controller = this._m_poolController.get();
            if (controller != null) {
                var config = _data;
                _actor.addComponent(controller);
                controller.init(_actor);
                controller.setEnemiesManager(this._m_enemiesManager);
                controller.setConfig(config);
                controller.setActiveState('pursuit');
                var sprite = _actor.getWrappedInstance();
                sprite.setTexture(config.texture_key);
                var circle_radius = sprite.height * 0.5;
                sprite.body.setCircle(circle_radius, (sprite.width * 0.5) - circle_radius, (sprite.height * 0.5) - circle_radius);
                _actor.sendMessage(_1942enums_93.DC_MESSAGE_ID.kSetHealthPoints, config.health);
                this._m_enemiesManager.addEnemies(1);
            }
            else {
                this._m_enemiesManager.disableActor(_actor);
            }
            return;
        };
        RangerSpawner.prototype.disasemble = function (_actor) {
            var controller = _actor.getComponent(_1942enums_93.DC_COMPONENT_ID.kEnemyController);
            this._m_poolController.desactive(controller);
            _actor.addComponent(cmpNullEnemyController_4.CmpNullEnemyController.GetInstance());
            return;
        };
        RangerSpawner.prototype.setEnemiesManager = function (_enemiesManager) {
            this._m_enemiesManager = _enemiesManager;
            return;
        };
        RangerSpawner.prototype.getEnemiesManager = function () {
            return this._m_enemiesManager;
        };
        RangerSpawner.prototype.setBulletManager = function (_bulletManager) {
            return;
        };
        RangerSpawner.prototype.getBulletManager = function () {
            return nullBulletManager_14.NullBulletManager.GetInstance();
        };
        RangerSpawner.prototype.destroy = function () {
            this._m_enemiesManager = null;
            return;
        };
        return RangerSpawner;
    }());
    exports.RangerSpawner = RangerSpawner;
});
define("game/src/ts_src/states/sonicController.ts/iSonicState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/states/sonicController.ts/sttSonicIdle", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SttSonicIdle = void 0;
    var SttSonicIdle = (function () {
        function SttSonicIdle() {
            this.m_id = "idle";
            return;
        }
        SttSonicIdle.prototype.init = function (_controller, _actor) {
            this._m_controller = _controller;
            this._m_actor = _actor;
            return;
        };
        SttSonicIdle.prototype.setConfig = function (_config) {
            this._m_config = _config;
        };
        SttSonicIdle.prototype.onEnter = function () { };
        SttSonicIdle.prototype.onExit = function () { };
        SttSonicIdle.prototype.receive = function (_id, _obj) { };
        SttSonicIdle.prototype.update = function () { };
        SttSonicIdle.prototype.destroy = function () {
            this._m_actor = null;
            this._m_controller = null;
            this._m_config = null;
            return;
        };
        return SttSonicIdle;
    }());
    exports.SttSonicIdle = SttSonicIdle;
});
define("game/src/ts_src/states/sonicController.ts/sttSonicPursuit", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, _1942enums_94, gameManager_30) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SttSonicPursuit = void 0;
    var SttSonicPursuit = (function () {
        function SttSonicPursuit() {
            this._m_gameManager = gameManager_30.GameManager.GetInstance();
            this.m_id = "pursuit";
            this._m_direction = new Phaser.Math.Vector3();
            this._m_currentForce = new Phaser.Math.Vector3();
            this._m_desireForce = new Phaser.Math.Vector3();
            this._m_steerForce = new Phaser.Math.Vector3();
            return;
        }
        SttSonicPursuit.prototype.init = function (_controller, _actor) {
            this._m_controller = _controller;
            this._m_actor = _actor;
            var playerControl = this._m_gameManager.getPlayerController();
            this._m_target = playerControl.getPlayer();
            return;
        };
        SttSonicPursuit.prototype.setConfig = function (_config) {
            this._m_config = _config;
        };
        SttSonicPursuit.prototype.onEnter = function () {
            var heroSprite = this._m_target.getWrappedInstance();
            var selfSprite = this._m_actor.getWrappedInstance();
            this._m_direction.set(heroSprite.x - selfSprite.x, heroSprite.y - selfSprite.y);
            this._m_direction.normalize();
            return;
        };
        SttSonicPursuit.prototype.onExit = function () {
            return;
        };
        SttSonicPursuit.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_94.DC_MESSAGE_ID.kDesactive:
                    this._explode();
                    return;
                case _1942enums_94.DC_MESSAGE_ID.kKill:
                    this._onKill();
                    this._explode();
                    return;
                case _1942enums_94.DC_MESSAGE_ID.kCollisionWithHero:
                    this._onHeroCollision();
                    this._explode();
                    return;
                default:
                    return;
            }
        };
        SttSonicPursuit.prototype.update = function () {
            var deltaTime = this._m_gameManager.m_dt;
            var config = this._m_config;
            var playerSprite = this._m_target.getWrappedInstance();
            var self = this._m_actor.getWrappedInstance();
            var direction = this._m_direction;
            var speed = config.speed;
            var currentForce = this._m_currentForce;
            currentForce.set(direction.x * speed, direction.y * speed);
            var desireForce = this._m_desireForce;
            desireForce.set(playerSprite.x - self.x, playerSprite.y - self.y);
            if (desireForce.length() > speed) {
                desireForce.normalize();
                desireForce.set(desireForce.x * speed, desireForce.y * speed);
            }
            var steerForce = this._m_steerForce;
            steerForce.set(desireForce.x - currentForce.x, desireForce.y - currentForce.y);
            var forceMagnitude = config.steer_force;
            if (steerForce.length() > forceMagnitude) {
                steerForce.normalize();
                steerForce.set(steerForce.x * forceMagnitude, steerForce.y * forceMagnitude);
            }
            var mass = config.mass;
            steerForce.set(steerForce.x / mass, steerForce.y / mass);
            steerForce.set(currentForce.x + steerForce.x, currentForce.y + steerForce.y);
            if (steerForce.length() > speed) {
                steerForce.normalize();
                steerForce.set(steerForce.x * speed, steerForce.y * speed);
            }
            steerForce.set(steerForce.x * deltaTime, steerForce.y * deltaTime);
            this._m_actor.sendMessage(_1942enums_94.DC_MESSAGE_ID.kAgentMove, steerForce);
            steerForce.normalize();
            direction.set(steerForce.x, steerForce.y);
            this._m_actor.sendMessage(_1942enums_94.DC_MESSAGE_ID.kDirection, direction);
            var directionV2 = new Phaser.Math.Vector2(direction.x, direction.y);
            self.setAngle(Phaser.Math.RadToDeg(directionV2.angle()));
            return;
        };
        SttSonicPursuit.prototype.destroy = function () {
            this._m_gameManager = null;
            this._m_controller = null;
            this._m_config = null;
            this._m_actor = null;
            this._m_target = null;
            return;
        };
        SttSonicPursuit.prototype._onKill = function () {
            gameManager_30.GameManager.ReceiveMessage(_1942enums_94.DC_MESSAGE_ID.kAddScorePoints, this._m_config.score);
            return;
        };
        SttSonicPursuit.prototype._onHeroCollision = function () {
            var hero = this._m_target;
            hero.sendMessage(_1942enums_94.DC_MESSAGE_ID.kHit, this._m_config.collision_damage);
            return;
        };
        SttSonicPursuit.prototype._explode = function () {
            this._m_controller.desactiveActor();
            this._m_controller.setActiveState('idle');
            return;
        };
        return SttSonicPursuit;
    }());
    exports.SttSonicPursuit = SttSonicPursuit;
});
define("game/src/ts_src/components/cmpSonicController", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/states/sonicController.ts/sttSonicIdle", "game/src/ts_src/states/sonicController.ts/sttSonicPursuit"], function (require, exports, _1942enums_95, sttSonicIdle_1, sttSonicPursuit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpSonicController = void 0;
    var CmpSonicController = (function () {
        function CmpSonicController() {
        }
        CmpSonicController.Create = function () {
            var cmp = new CmpSonicController();
            cmp.m_id = _1942enums_95.DC_COMPONENT_ID.kEnemyController;
            cmp._m_hStates = new Map();
            cmp.addState(new sttSonicPursuit_1.SttSonicPursuit());
            var idleState = new sttSonicIdle_1.SttSonicIdle();
            cmp.addState(idleState);
            cmp._m_active_state = idleState;
            return cmp;
        };
        CmpSonicController.prototype.init = function (_actor) {
            this._m_actor = _actor;
            this._m_hStates.forEach(function (_state) {
                _state.init(this, _actor);
                return;
            }, this);
            return;
        };
        CmpSonicController.prototype.update = function (_actor) {
            this._m_active_state.update();
            return;
        };
        CmpSonicController.prototype.receive = function (_id, _obj) {
            this._m_active_state.receive(_id, _obj);
            return;
        };
        CmpSonicController.prototype.setActiveState = function (_state_name) {
            if (this._m_hStates.has(_state_name)) {
                var activeState = this._m_active_state;
                activeState.onExit();
                activeState = this._m_hStates.get(_state_name);
                activeState.onEnter();
                this._m_active_state = activeState;
            }
            return;
        };
        CmpSonicController.prototype.addState = function (_state) {
            this._m_hStates.set(_state.m_id, _state);
            return;
        };
        CmpSonicController.prototype.getState = function (_state_name) {
            return this._m_hStates.get(_state_name);
        };
        CmpSonicController.prototype.setConfig = function (_config) {
            this._m_config = _config;
            this._m_hStates.forEach(function (_state) {
                _state.setConfig(_config);
                return;
            }, this);
            return;
        };
        CmpSonicController.prototype.getCollisionDamage = function () {
            return this._m_config.collision_damage;
        };
        CmpSonicController.prototype.setSpawner = function (_spawner) {
            this._m_spawner = _spawner;
            return;
        };
        CmpSonicController.prototype.getSpawner = function () {
            return this._m_spawner;
        };
        CmpSonicController.prototype.getScorePoints = function () {
            return this._m_config.score;
        };
        CmpSonicController.prototype.setScorePoints = function (_points) {
            this._m_config.score = _points;
        };
        CmpSonicController.prototype.setEnemiesManager = function (_enemyManager) {
            this._m_enemiesManager = _enemyManager;
        };
        CmpSonicController.prototype.getEnemiesManager = function () {
            return this._m_enemiesManager;
        };
        CmpSonicController.prototype.getActor = function () {
            return this._m_actor;
        };
        CmpSonicController.prototype.desactiveActor = function () {
            var self = this._m_actor;
            this._m_spawner.disasemble(self);
            this._m_enemiesManager.disableActor(self);
            return;
        };
        CmpSonicController.prototype.destroy = function () {
            this._m_spawner = null;
            this._m_enemiesManager = null;
            return;
        };
        return CmpSonicController;
    }());
    exports.CmpSonicController = CmpSonicController;
});
define("game/src/ts_src/enemiesManager/enemySpawner/sonicSpawner", ["require", "exports", "optimization/mxObjectPool", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpNullEnemyController", "game/src/ts_src/components/cmpPlayZone", "game/src/ts_src/components/cmpSonicController", "game/src/ts_src/configObjects/cnfSonicSpawner", "game/src/ts_src/gameManager/gameManager", "game/src/ts_src/enemiesManager/nullEnemiesManager"], function (require, exports, mxObjectPool_8, nullBulletManager_15, _1942enums_96, cmpNullEnemyController_5, cmpPlayZone_4, cmpSonicController_1, cnfSonicSpawner_2, gameManager_31, nullEnemiesManager_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SonicSpawner = void 0;
    var SonicSpawner = (function () {
        function SonicSpawner() {
        }
        SonicSpawner.Create = function () {
            var spawner = new SonicSpawner();
            spawner._m_enemiesManager = nullEnemiesManager_7.NullEnemiesManager.GetInstance();
            return spawner;
        };
        SonicSpawner.prototype.init = function (_config) {
            if (_config === undefined) {
                _config = new cnfSonicSpawner_2.CnfSonicSpawner();
            }
            var scene = gameManager_31.GameManager.GetInstance().getGameScene();
            var canvas = scene.game.canvas;
            this._m_playZone = cmpPlayZone_4.CmpPlayZone.Create();
            this._m_playZone.setBoundings(-_config.playZone_padding, -_config.playZone_padding, canvas.width + _config.playZone_padding, canvas.height + _config.playZone_padding);
            var poolController = this._m_poolController;
            if (poolController != null) {
                poolController.destroy();
            }
            var aControllers = new Array();
            var controller;
            var index = 0;
            while (index < _config.pool_size) {
                controller = cmpSonicController_1.CmpSonicController.Create();
                controller.setSpawner(this);
                aControllers.push(controller);
                ++index;
            }
            poolController = mxObjectPool_8.MxObjectPool.Create();
            poolController.init(aControllers);
            this._m_poolController = poolController;
            return;
        };
        SonicSpawner.prototype.update = function (_dt) {
            return;
        };
        SonicSpawner.prototype.spawn = function (_actor, _x, _y, _data) {
            _actor.sendMessage(_1942enums_96.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(_x, _y));
            this.assemble(_actor, _data);
            return;
        };
        SonicSpawner.prototype.getID = function () {
            return _1942enums_96.DC_ENEMY_TYPE.kSonico;
        };
        SonicSpawner.prototype.assemble = function (_actor, _data) {
            var controller = this._m_poolController.get();
            if (controller != null) {
                var config = _data;
                _actor.addComponent(controller);
                controller.init(_actor);
                controller.setEnemiesManager(this._m_enemiesManager);
                controller.setConfig(config);
                controller.setActiveState('pursuit');
                var sprite = _actor.getWrappedInstance();
                sprite.setTexture(config.texture_key);
                sprite.setTint(0xD4D06A);
                var circle_radius = sprite.height * 0.5;
                sprite.body.setCircle(circle_radius, (sprite.width * 0.5) - circle_radius, (sprite.height * 0.5) - circle_radius);
                _actor.sendMessage(_1942enums_96.DC_MESSAGE_ID.kSetHealthPoints, config.health);
                _actor.addComponent(this._m_playZone);
                this._m_enemiesManager.addEnemies(1);
            }
            else {
                this._m_enemiesManager.disableActor(_actor);
            }
            return;
        };
        SonicSpawner.prototype.disasemble = function (_actor) {
            var controller = _actor.getComponent(_1942enums_96.DC_COMPONENT_ID.kEnemyController);
            this._m_poolController.desactive(controller);
            _actor.addComponent(cmpNullEnemyController_5.CmpNullEnemyController.GetInstance());
            _actor.removeComponent(_1942enums_96.DC_COMPONENT_ID.kPlayZone);
            var sprite = _actor.getWrappedInstance();
            sprite.setTint(0xffffff);
            return;
        };
        SonicSpawner.prototype.setEnemiesManager = function (_enemiesManager) {
            this._m_enemiesManager = _enemiesManager;
            return;
        };
        SonicSpawner.prototype.getEnemiesManager = function () {
            return this._m_enemiesManager;
        };
        SonicSpawner.prototype.setBulletManager = function (_bulletManager) {
            return;
        };
        SonicSpawner.prototype.getBulletManager = function () {
            return nullBulletManager_15.NullBulletManager.GetInstance();
        };
        SonicSpawner.prototype.destroy = function () {
            this._m_enemiesManager = null;
            return;
        };
        return SonicSpawner;
    }());
    exports.SonicSpawner = SonicSpawner;
});
define("game/src/ts_src/components/cmpArponWeaponController", ["require", "exports", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, nullBulletManager_16, _1942enums_97, gameManager_32) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpArponWeaponController = void 0;
    var CmpArponWeaponController = (function () {
        function CmpArponWeaponController() {
        }
        CmpArponWeaponController.Create = function () {
            var controller = new CmpArponWeaponController();
            controller.m_id = _1942enums_97.DC_COMPONENT_ID.kArponWeaponController;
            controller._m_gameManager = gameManager_32.GameManager.GetInstance();
            controller._m_direction = new Phaser.Math.Vector2();
            controller._m_currentForce = new Phaser.Math.Vector2();
            controller._m_desireForce = new Phaser.Math.Vector2();
            controller._m_steerForce = new Phaser.Math.Vector2();
            controller._m_enimBulletManager = nullBulletManager_16.NullBulletManager.GetInstance();
            return controller;
        };
        CmpArponWeaponController.prototype.init = function (_actor) {
            this._m_actor = _actor;
            return;
        };
        CmpArponWeaponController.prototype.setConfig = function (_config) {
            this._m_config = _config;
            this._m_actor.sendMessage(_1942enums_97.DC_MESSAGE_ID.kSetTexture, _config.weapon_texture_key);
            return;
        };
        CmpArponWeaponController.prototype.update = function (_actor) {
            var config = this._m_config;
            var playerSprite = this._m_target.getWrappedInstance();
            var self = this._m_actor.getWrappedInstance();
            var direction = this._m_direction;
            var speed = config.speed;
            var currentForce = this._m_currentForce;
            currentForce.set(direction.x * speed, direction.y * speed);
            var desireForce = this._m_desireForce;
            desireForce.set(playerSprite.x - self.x, playerSprite.y - self.y);
            if (desireForce.length() > speed) {
                desireForce.normalize();
                desireForce.set(desireForce.x * speed, desireForce.y * speed);
            }
            var steerForce = this._m_steerForce;
            steerForce.set(desireForce.x - currentForce.x, desireForce.y - currentForce.y);
            var forceMagnitude = config.steer_force;
            if (steerForce.length() > forceMagnitude) {
                steerForce.normalize();
                steerForce.set(steerForce.x * forceMagnitude, steerForce.y * forceMagnitude);
            }
            var mass = config.mass;
            steerForce.set(steerForce.x / mass, steerForce.y / mass);
            steerForce.set(currentForce.x + steerForce.x, currentForce.y + steerForce.y);
            steerForce.normalize();
            direction.set(steerForce.x, steerForce.y);
            this._m_actor.sendMessage(_1942enums_97.DC_MESSAGE_ID.kSetAngle, Phaser.Math.RadToDeg(direction.angle()));
            var time = this._m_time + this._m_gameManager.m_dt;
            if (time >= config.secondsPerBullet) {
                this._m_enimBulletManager.spawn(self.x + direction.x * 50, self.y + direction.y * 50, _1942enums_97.DC_BULLET_TYPE.kArpon, direction);
                time = 0.0;
            }
            this._m_time = time;
            return;
        };
        CmpArponWeaponController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_97.DC_MESSAGE_ID.kActive:
                    this.activeActor();
                    break;
            }
            return;
        };
        CmpArponWeaponController.prototype.destroy = function () {
            this._m_config = null;
            this._m_actor = null;
            this._m_target = null;
            this._m_enimBulletManager = null;
            return;
        };
        CmpArponWeaponController.prototype.activeActor = function () {
            var playerManager = this._m_gameManager.getPlayerController();
            this._m_target = playerManager.getPlayer();
            var enimManager = this._m_gameManager.getEnemiesManager();
            this._m_enimBulletManager = enimManager.getBulletManager();
            this._m_direction.set(0.0, 1.0);
            this._m_time = 0.0;
            return;
        };
        return CmpArponWeaponController;
    }());
    exports.CmpArponWeaponController = CmpArponWeaponController;
});
define("game/src/ts_src/components/cmpArponShipController", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, _1942enums_98, gameManager_33) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpArponShipController = void 0;
    var CmpArponShipController = (function () {
        function CmpArponShipController() {
        }
        CmpArponShipController.Create = function () {
            var cmp = new CmpArponShipController();
            cmp.m_id = _1942enums_98.DC_COMPONENT_ID.kEnemyController;
            cmp._m_gameManager = gameManager_33.GameManager.GetInstance();
            cmp._m_force = new Phaser.Math.Vector3();
            return cmp;
        };
        CmpArponShipController.prototype.init = function (_actor) {
            this._m_actor = _actor;
            return;
        };
        CmpArponShipController.prototype.setWeapon = function (_actor) {
            this._weaponActor = _actor;
            return;
        };
        CmpArponShipController.prototype.update = function (_actor) {
            var force = this._m_force;
            force.set(0.0, this._m_config.speed * this._m_gameManager.m_dt);
            _actor.sendMessage(_1942enums_98.DC_MESSAGE_ID.kAgentMove, force);
            var weaponActor = this._weaponActor;
            weaponActor.sendMessage(_1942enums_98.DC_MESSAGE_ID.kAgentMove, force);
            weaponActor.update();
            return;
        };
        CmpArponShipController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_98.DC_MESSAGE_ID.kActive:
                    this.activeActor();
                    break;
                case _1942enums_98.DC_MESSAGE_ID.kDesactive:
                    this.desactiveActor();
                    break;
                case _1942enums_98.DC_MESSAGE_ID.kKill:
                    this._onHit();
                    this._explode();
                    this.desactiveActor();
                    break;
                case _1942enums_98.DC_MESSAGE_ID.kCollisionWithHero:
                    this._onCollisionWithHero(_obj);
                    this._explode();
                    this.desactiveActor();
                    break;
            }
            return;
        };
        CmpArponShipController.prototype.setConfig = function (_config) {
            this._m_config = _config;
            var weaponController = this._weaponActor.getComponent(_1942enums_98.DC_COMPONENT_ID.kArponWeaponController);
            weaponController.setConfig(_config);
            return;
        };
        CmpArponShipController.prototype.getCollisionDamage = function () {
            return this._m_config.collision_damage;
        };
        CmpArponShipController.prototype.setSpawner = function (_spawner) {
            this._m_spawner = _spawner;
            return;
        };
        CmpArponShipController.prototype.getSpawner = function () {
            return this._m_spawner;
        };
        CmpArponShipController.prototype.getScorePoints = function () {
            return this._m_config.score;
        };
        CmpArponShipController.prototype.setScorePoints = function (_points) {
            this._m_config.score = _points;
        };
        CmpArponShipController.prototype.setEnemiesManager = function (_enemyManager) {
            this._m_enemiesManager = _enemyManager;
        };
        CmpArponShipController.prototype.getEnemiesManager = function () {
            return this._m_enemiesManager;
        };
        CmpArponShipController.prototype.getActor = function () {
            return this._m_actor;
        };
        CmpArponShipController.prototype.activeActor = function () {
            var sprite = this._m_actor.getWrappedInstance();
            var weapon = this._weaponActor;
            weapon.sendMessage(_1942enums_98.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(sprite.x, sprite.y));
            weapon.sendMessage(_1942enums_98.DC_MESSAGE_ID.kActive, weapon);
            return;
        };
        CmpArponShipController.prototype.desactiveActor = function () {
            var self = this._m_actor;
            this._weaponActor.sendMessage(_1942enums_98.DC_MESSAGE_ID.kDesactive, this._weaponActor);
            this._m_spawner.disasemble(self);
            this._m_enemiesManager.disableActor(self);
            return;
        };
        CmpArponShipController.prototype.destroy = function () {
            this._m_spawner = null;
            this._m_enemiesManager = null;
            return;
        };
        CmpArponShipController.prototype._onHit = function () {
            gameManager_33.GameManager.ReceiveMessage(_1942enums_98.DC_MESSAGE_ID.kAddScorePoints, this._m_config.score);
            return;
        };
        CmpArponShipController.prototype._onCollisionWithHero = function (_hero) {
            _hero.sendMessage(_1942enums_98.DC_MESSAGE_ID.kHit, this._m_config.collision_damage);
            return;
        };
        CmpArponShipController.prototype._explode = function () {
            return;
        };
        return CmpArponShipController;
    }());
    exports.CmpArponShipController = CmpArponShipController;
});
define("game/src/ts_src/components/cmpSpriteController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_99) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpSpriteController = void 0;
    var CmpSpriteController = (function () {
        function CmpSpriteController() {
        }
        CmpSpriteController.Create = function () {
            var controller = new CmpSpriteController();
            controller.m_id = _1942enums_99.DC_COMPONENT_ID.kSpriteController;
            return controller;
        };
        CmpSpriteController.prototype.init = function (_actor) {
            this._m_sprite = _actor.getWrappedInstance();
            return;
        };
        CmpSpriteController.prototype.update = function (_actor) {
            return;
        };
        CmpSpriteController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_99.DC_MESSAGE_ID.kToPosition:
                    {
                        var position = _obj;
                        this._m_sprite.setPosition(position.x, position.y);
                    }
                    return;
                case _1942enums_99.DC_MESSAGE_ID.kAgentMove:
                    {
                        var move = _obj;
                        this._m_sprite.x += move.x;
                        this._m_sprite.y += move.y;
                    }
                    return;
                case _1942enums_99.DC_MESSAGE_ID.kSetAngle:
                    this._m_sprite.setAngle(_obj);
                    return;
                case _1942enums_99.DC_MESSAGE_ID.kSetTexture:
                    this._m_sprite.setTexture(_obj);
                    return;
                case _1942enums_99.DC_MESSAGE_ID.kShow:
                    this._active();
                    return;
                case _1942enums_99.DC_MESSAGE_ID.kClose:
                    this._desactive();
                    return;
                case _1942enums_99.DC_MESSAGE_ID.kDesactive:
                    this._desactive();
                    return;
                case _1942enums_99.DC_MESSAGE_ID.kActive:
                    this._active();
                    return;
            }
            return;
        };
        CmpSpriteController.prototype.destroy = function () {
            this._m_sprite.destroy();
            this._m_sprite = null;
            return;
        };
        CmpSpriteController.prototype._desactive = function () {
            this._m_sprite.setActive(false);
            this._m_sprite.setVisible(false);
            return;
        };
        CmpSpriteController.prototype._active = function () {
            this._m_sprite.setActive(true);
            this._m_sprite.setVisible(true);
            return;
        };
        return CmpSpriteController;
    }());
    exports.CmpSpriteController = CmpSpriteController;
});
define("game/src/ts_src/enemiesManager/enemySpawner/arponShipSpawner", ["require", "exports", "optimization/mxObjectPool", "game/src/ts_src/actors/baseActor", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpArponShipController", "game/src/ts_src/components/cmpArponWeaponController", "game/src/ts_src/components/cmpNullEnemyController", "game/src/ts_src/components/cmpPlayZone", "game/src/ts_src/components/cmpSpriteController", "game/src/ts_src/configObjects/cnfArponShipSpawner", "game/src/ts_src/gameManager/gameManager", "game/src/ts_src/enemiesManager/nullEnemiesManager"], function (require, exports, mxObjectPool_9, baseActor_15, nullBulletManager_17, _1942enums_100, cmpArponShipController_1, cmpArponWeaponController_1, cmpNullEnemyController_6, cmpPlayZone_5, cmpSpriteController_1, cnfArponShipSpawner_2, gameManager_34, nullEnemiesManager_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ArponShipSpawner = void 0;
    var ArponShipSpawner = (function () {
        function ArponShipSpawner() {
        }
        ArponShipSpawner.Create = function () {
            var spawner = new ArponShipSpawner();
            spawner._m_enemiesManager = nullEnemiesManager_8.NullEnemiesManager.GetInstance();
            return spawner;
        };
        ArponShipSpawner.prototype.init = function (_config) {
            if (_config === undefined) {
                _config = new cnfArponShipSpawner_2.CnfArponShipSpawner();
            }
            var scene = gameManager_34.GameManager.GetInstance().getGameScene();
            var canvas = scene.game.canvas;
            this._m_playZone = cmpPlayZone_5.CmpPlayZone.Create();
            this._m_playZone.setBoundings(-_config.playZone_padding, -_config.playZone_padding, canvas.width + _config.playZone_padding, canvas.height + _config.playZone_padding);
            var poolController = this._m_poolController;
            if (poolController != null) {
                poolController.destroy();
            }
            var aControllers = new Array();
            var controller;
            var index = 0;
            while (index < _config.pool_size) {
                controller = cmpArponShipController_1.CmpArponShipController.Create();
                controller.setSpawner(this);
                aControllers.push(controller);
                var weaponActor = baseActor_15.BaseActor.Create(scene.add.sprite(0.0, 0.0, 'enemy'), 'ArponWeapon_' + index.toString());
                weaponActor.addComponent(cmpSpriteController_1.CmpSpriteController.Create());
                weaponActor.addComponent(cmpArponWeaponController_1.CmpArponWeaponController.Create());
                weaponActor.init();
                weaponActor.sendMessage(_1942enums_100.DC_MESSAGE_ID.kDesactive, weaponActor);
                controller.setWeapon(weaponActor);
                ++index;
            }
            poolController = mxObjectPool_9.MxObjectPool.Create();
            poolController.init(aControllers);
            this._m_poolController = poolController;
            return;
        };
        ArponShipSpawner.prototype.update = function (_dt) {
            return;
        };
        ArponShipSpawner.prototype.spawn = function (_actor, _x, _y, _data) {
            _actor.sendMessage(_1942enums_100.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(_x, _y));
            this.assemble(_actor, _data);
            return;
        };
        ArponShipSpawner.prototype.getID = function () {
            return _1942enums_100.DC_ENEMY_TYPE.kArponShip;
        };
        ArponShipSpawner.prototype.assemble = function (_actor, _data) {
            var controller = this._m_poolController.get();
            if (controller != null) {
                var config = _data;
                _actor.addComponent(controller);
                controller.init(_actor);
                controller.setEnemiesManager(this._m_enemiesManager);
                controller.setConfig(config);
                var sprite = _actor.getWrappedInstance();
                sprite.setTexture(config.texture_key);
                sprite.body.setSize(sprite.height, sprite.width, true);
                sprite.setAngle(-90.0);
                _actor.sendMessage(_1942enums_100.DC_MESSAGE_ID.kSetHealthPoints, config.health);
                _actor.addComponent(this._m_playZone);
                _actor.sendMessage(_1942enums_100.DC_MESSAGE_ID.kActive, _actor);
                this._m_enemiesManager.addEnemies(1);
            }
            else {
                this._m_enemiesManager.disableActor(_actor);
            }
            return;
        };
        ArponShipSpawner.prototype.disasemble = function (_actor) {
            var controller = _actor.getComponent(_1942enums_100.DC_COMPONENT_ID.kEnemyController);
            this._m_poolController.desactive(controller);
            _actor.addComponent(cmpNullEnemyController_6.CmpNullEnemyController.GetInstance());
            _actor.removeComponent(_1942enums_100.DC_COMPONENT_ID.kPlayZone);
            return;
        };
        ArponShipSpawner.prototype.setEnemiesManager = function (_enemiesManager) {
            this._m_enemiesManager = _enemiesManager;
            return;
        };
        ArponShipSpawner.prototype.getEnemiesManager = function () {
            return this._m_enemiesManager;
        };
        ArponShipSpawner.prototype.setBulletManager = function (_bulletManager) {
            return;
        };
        ArponShipSpawner.prototype.getBulletManager = function () {
            return nullBulletManager_17.NullBulletManager.GetInstance();
        };
        ArponShipSpawner.prototype.destroy = function () {
            this._m_enemiesManager = null;
            return;
        };
        return ArponShipSpawner;
    }());
    exports.ArponShipSpawner = ArponShipSpawner;
});
define("game/src/ts_src/components/cmpArponBulletController", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, _1942enums_101, gameManager_35) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpArponBulletController = void 0;
    var CmpArponBulletController = (function () {
        function CmpArponBulletController() {
        }
        CmpArponBulletController.Create = function () {
            var cmp = new CmpArponBulletController();
            cmp.m_id = _1942enums_101.DC_COMPONENT_ID.kArponBulletController;
            cmp._m_direction = new Phaser.Math.Vector3(0.0, 1.0);
            cmp._m_force = new Phaser.Math.Vector3(0.0, 0.0);
            cmp._m_gameManager = gameManager_35.GameManager.GetInstance();
            return cmp;
        };
        CmpArponBulletController.prototype.init = function (_actor) {
            this._m_actor = _actor;
            this._m_cmpSimpleController = _actor.getComponent(_1942enums_101.DC_COMPONENT_ID.kSimpleBulletControl);
            return;
        };
        CmpArponBulletController.prototype.setConfig = function (_config) {
            this._m_config = _config;
            return;
        };
        CmpArponBulletController.prototype.setSpawner = function (_spawner) {
            this._m_spawner = _spawner;
            return;
        };
        CmpArponBulletController.prototype.setManager = function (_manager) {
            this._m_manager = _manager;
            return;
        };
        CmpArponBulletController.prototype.activate = function (_direction_x, _direction_y) {
            this._m_direction.set(_direction_x, _direction_y);
            return;
        };
        CmpArponBulletController.prototype.update = function (_actor) {
            var sprite = _actor.getWrappedInstance();
            var direction = this._m_cmpSimpleController.getDirection();
            var config = this._m_config;
            var circle_radius = sprite.height * 0.5;
            sprite.body.setCircle(circle_radius, ((sprite.width * 0.5) - circle_radius) + (direction.x * config.collider_offset), ((sprite.height * 0.5) - circle_radius) + (direction.y * config.collider_offset));
            return;
        };
        CmpArponBulletController.prototype.receive = function (_id, _obj) {
        };
        CmpArponBulletController.prototype.destroy = function () {
            this._m_config = null;
            this._m_actor = null;
            this._m_gameManager = null;
            return;
        };
        return CmpArponBulletController;
    }());
    exports.CmpArponBulletController = CmpArponBulletController;
});
define("game/src/ts_src/bulletManager/bulletSpawner/arponBulletSpawner", ["require", "exports", "optimization/mxObjectPool", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpArponBulletController", "game/src/ts_src/gameManager/gameManager", "game/src/ts_src/bulletManager/bulletSpawner/nullBulletSpawner"], function (require, exports, mxObjectPool_10, _1942enums_102, cmpArponBulletController_1, gameManager_36, nullBulletSpawner_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ArponBulletSpawner = void 0;
    var ArponBulletSpawner = (function () {
        function ArponBulletSpawner() {
        }
        ArponBulletSpawner.Create = function () {
            var spawner = new ArponBulletSpawner;
            spawner._m_poolController = mxObjectPool_10.MxObjectPool.Create();
            return spawner;
        };
        ArponBulletSpawner.prototype.init = function () {
            var gameManger = gameManager_36.GameManager.GetInstance();
            var levelConfig = gameManger.getLevelConfiguration();
            var spawnerConfig = levelConfig.getConfig(_1942enums_102.DC_CONFIG.kArponBulletSpawner);
            this._m_spawnerConfig = spawnerConfig;
            var bulletConfig = levelConfig.getConfig(_1942enums_102.DC_CONFIG.kArponBullet);
            this._m_bulletConfig = bulletConfig;
            var aController = Array();
            var index = 0;
            while (index < spawnerConfig.pool_size) {
                var bulletController = cmpArponBulletController_1.CmpArponBulletController.Create();
                bulletController.setConfig(bulletConfig);
                bulletController.setSpawner(this);
                aController.push(bulletController);
                ++index;
            }
            this._m_poolController.init(aController);
            return;
        };
        ArponBulletSpawner.prototype.update = function (_dt) {
            return;
        };
        ArponBulletSpawner.prototype.spawn = function (_actor, _x, _y, _data) {
            _actor.sendMessage(_1942enums_102.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(_x, _y, 0.0));
            this.assemble(_actor, _data);
            return;
        };
        ArponBulletSpawner.prototype.assemble = function (_actor, _data) {
            var controller = this._m_poolController.get();
            if (controller != null) {
                var sprite = _actor.getWrappedInstance();
                var circle_radius = sprite.height * 0.5;
                sprite.body.setCircle(circle_radius, (sprite.width * 0.5) - circle_radius, (sprite.height * 0.5) - circle_radius);
                sprite.setTint(0x0000ff);
                var config = this._m_bulletConfig;
                sprite.setTexture(config.texture_key);
                var bulletData = _actor.getComponent(_1942enums_102.DC_COMPONENT_ID.kBulletData);
                bulletData.setSpawner(this);
                bulletData.setAttackPoints(config.collision_damage);
                _actor.addComponent(controller);
                controller.init(_actor);
                _actor.sendMessage(_1942enums_102.DC_MESSAGE_ID.kDirection, _data);
                _actor.sendMessage(_1942enums_102.DC_MESSAGE_ID.kSpeed, this._m_bulletConfig.speed);
            }
            else {
                this._m_bulletManager.disableActor(_actor);
            }
            return;
        };
        ArponBulletSpawner.prototype.disassemble = function (_actor) {
            var bulletData = _actor.getComponent(_1942enums_102.DC_COMPONENT_ID.kBulletData);
            bulletData.setSpawner(nullBulletSpawner_8.NullBulletSpawner.GetInstance());
            var controller = _actor.getComponent(_1942enums_102.DC_COMPONENT_ID.kArponBulletController);
            this._m_poolController.desactive(controller);
            _actor.removeComponent(_1942enums_102.DC_COMPONENT_ID.kArponBulletController);
            var sprite = _actor.getWrappedInstance();
            sprite.setTint(0xffffff);
            this._m_bulletManager.disableActor(_actor);
            return;
        };
        ArponBulletSpawner.prototype.setBulletManager = function (_manager) {
            this._m_bulletManager = _manager;
            this._m_poolController.forEach(function (_controller) {
                _controller.setManager(_manager);
                return;
            });
            return;
        };
        ArponBulletSpawner.prototype.getID = function () {
            return _1942enums_102.DC_BULLET_TYPE.kArpon;
        };
        ArponBulletSpawner.prototype.destroy = function () {
            this._m_bulletManager = null;
            this._m_spawnerConfig = null;
            this._m_bulletConfig = null;
            this._m_poolController.forEach(function (_element) {
                _element.destroy();
                return;
            });
            this._m_poolController.destroy();
            this._m_poolController = null;
            return;
        };
        return ArponBulletSpawner;
    }());
    exports.ArponBulletSpawner = ArponBulletSpawner;
});
define("test/pilot/src/ts_src/scenes/test", ["require", "exports", "game/src/ts_src/gameManager/gameManager", "game/src/ts_src/bulletManager/bulletManager", "game/src/ts_src/bulletManager/bulletSpawner/heroBasicBulletSpawner", "game/src/ts_src/levelGenerator/levelGeneratorConfig", "game/src/ts_src/bulletManager/bulletSpawner/enemyBasicBulletSpawner", "game/src/ts_src/enemiesManager/enemiesManager", "game/src/ts_src/enemiesManager/enemySpawner/erranteSpawner", "game/src/ts_src/uiManager/UIManager", "game/src/ts_src/scoreManager/scoreManager", "game/src/ts_src/bossManager/spiderBossManager", "game/src/ts_src/itemManager/ItemManager", "game/src/ts_src/bulletManager/bulletSpawner/heroTripleShotSpawner", "game/src/ts_src/enemiesManager/enemySpawner/rangerSpawner", "game/src/ts_src/commons/1942enums", "game/src/ts_src/enemiesManager/enemySpawner/sonicSpawner", "game/src/ts_src/enemiesManager/enemySpawner/arponShipSpawner", "game/src/ts_src/bulletManager/bulletSpawner/arponBulletSpawner"], function (require, exports, gameManager_37, bulletManager_1, heroBasicBulletSpawner_1, levelGeneratorConfig_1, enemyBasicBulletSpawner_1, enemiesManager_1, erranteSpawner_1, UIManager_1, scoreManager_2, spiderBossManager_1, ItemManager_1, heroTripleShotSpawner_1, rangerSpawner_1, _1942enums_103, sonicSpawner_1, arponShipSpawner_1, arponBulletSpawner_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Test = void 0;
    var Test = (function (_super) {
        __extends(Test, _super);
        function Test() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Test.prototype.create = function () {
            var gameManager = gameManager_37.GameManager.GetInstance();
            gameManager.setGameScene(this);
            var gameCache = this.game.cache;
            var levelConfiguration = gameManager.getLevelConfiguration();
            levelConfiguration.init(this, gameManager);
            var scoreManager = scoreManager_2.ScoreManager.Create();
            var scoreManagerConfig = levelConfiguration.getConfig(_1942enums_103.DC_CONFIG.kScoreManager);
            scoreManager.init(this, scoreManagerConfig);
            gameManager.setScoreManager(scoreManager);
            var ambientGenConfig = JSON.parse(this.game.cache.text.get('cnf_ambient'));
            gameManager.initAmbientGenerator(this, ambientGenConfig);
            var levelGenConfig = new levelGeneratorConfig_1.LevelGeneratorConfig();
            levelGenConfig.map_key = "map_pilot";
            gameManager.initLevelGenerator(this, levelGenConfig);
            var canvas = this.game.canvas;
            var bossManager = new spiderBossManager_1.SpiderBossManager();
            bossManager.init(this, gameManager);
            bossManager.setPosition(canvas.width * 0.5, -100.0);
            gameManager.setBossManager(bossManager);
            var cnfEnemiesBulletMng = JSON.parse(gameCache.text.get('cnf_bulletManager_enemies'));
            var enim_bulletManager = bulletManager_1.BulletManager.Create();
            var enim_padding = cnfEnemiesBulletMng.playzone_padding;
            enim_bulletManager.init(this, cnfEnemiesBulletMng.pool_size, cnfEnemiesBulletMng.texture_key, new Phaser.Geom.Point(-enim_padding, -enim_padding), new Phaser.Geom.Point(canvas.width + enim_padding, canvas.height + enim_padding));
            bossManager.setBulletManager(enim_bulletManager);
            var enemyBulletSpawner = enemyBasicBulletSpawner_1.EnemyBasicBulletSpawner.Create();
            var enemyBasicBulletConfig = levelConfiguration.getConfig(_1942enums_103.DC_CONFIG.kEnemyBasicBullet);
            enemyBulletSpawner.setBulletConfig(enemyBasicBulletConfig);
            enim_bulletManager.addSpawner(enemyBulletSpawner);
            var arponSpawner = arponBulletSpawner_1.ArponBulletSpawner.Create();
            arponSpawner.init();
            enim_bulletManager.addSpawner(arponSpawner);
            var enemiesManager = enemiesManager_1.EnemiesManager.Create();
            var enemiesManagerConfig = JSON.parse(this.game.cache.text.get('cnf_spawner_errante'));
            enemiesManager.init(this, enemiesManagerConfig);
            enemiesManager.setBulletManager(enim_bulletManager);
            gameManager.setEnemiesManager(enemiesManager);
            var erranteSpawner = erranteSpawner_1.ErranteSpawner.Create();
            var erranteSpawnerConfig = levelConfiguration.getConfig(_1942enums_103.DC_CONFIG.kErranteSpawner);
            erranteSpawner.init(erranteSpawnerConfig);
            enemiesManager.addSpawner(erranteSpawner);
            var rangerSpawner = rangerSpawner_1.RangerSpawner.Create();
            var rangerSpawnerConfig = levelConfiguration.getConfig(_1942enums_103.DC_CONFIG.kRangerSpawner);
            rangerSpawner.init(rangerSpawnerConfig);
            enemiesManager.addSpawner(rangerSpawner);
            var sonicSpawner = sonicSpawner_1.SonicSpawner.Create();
            var sonicSpawnerConfig = levelConfiguration.getConfig(_1942enums_103.DC_CONFIG.kSonicSpawner);
            sonicSpawner.init(sonicSpawnerConfig);
            enemiesManager.addSpawner(sonicSpawner);
            var arponShipSpawner = arponShipSpawner_1.ArponShipSpawner.Create();
            var arponShipSpanwerConfig = levelConfiguration.getConfig(_1942enums_103.DC_CONFIG.kArponShipSpawner);
            arponShipSpawner.init(arponShipSpanwerConfig);
            enemiesManager.addSpawner(arponShipSpawner);
            var cnfBulletMng = JSON.parse(this.game.cache.text.get('cnf_bulletManager_hero'));
            var bulletMng = bulletManager_1.BulletManager.Create();
            var padding = cnfBulletMng.playzone_padding;
            bulletMng.init(this, cnfBulletMng.pool_size, cnfBulletMng.texture_key, new Phaser.Geom.Point(-padding, -padding), new Phaser.Geom.Point(canvas.width + padding, canvas.height + padding));
            var heroBulletSpawner = heroBasicBulletSpawner_1.HeroBasicBulletSpawner.Create();
            heroBulletSpawner.init();
            bulletMng.addSpawner(heroBulletSpawner);
            var tripleShotSpawner = heroTripleShotSpawner_1.heroTripleShotSpawner.Create();
            tripleShotSpawner.init();
            bulletMng.addSpawner(tripleShotSpawner);
            var heroConfig = JSON.parse(this.game.cache.text.get('cnf_hero'));
            heroConfig.x = this.game.canvas.width * 0.5;
            heroConfig.y = this.game.canvas.height * 0.5;
            gameManager.initHero(this, heroConfig);
            var playercontroller = gameManager.getPlayerController();
            playercontroller.setBulletManager(bulletMng);
            var itemManager = new ItemManager_1.ItemManager();
            itemManager.init(this, gameManager);
            gameManager.setItemManager(itemManager);
            var heroController = gameManager.getPlayerController();
            var hero = heroController.getPlayer();
            enim_bulletManager.collisionVsSprite(this, hero.getWrappedInstance());
            enemiesManager.collisionVsBody(this, hero.getWrappedInstance());
            bulletMng.collisionVsGroup(this, enemiesManager.getBodiesGroup());
            this._m_gameManager = gameManager;
            enemiesManager.collisionVsBody(this, playercontroller.getPowerShield().getWrappedInstance());
            enim_bulletManager.collisionVsSprite(this, playercontroller.getPowerShield().getWrappedInstance());
            itemManager.collisionVsSprite(this, hero.getWrappedInstance());
            bossManager.setHero(heroController, hero);
            var basicBulletControlPool = gameManager.getBasicBulletControlPool();
            basicBulletControlPool.init(20);
            var uiManager = new UIManager_1.UIManager();
            uiManager.init(this, gameManager);
            uiManager.reset(this, gameManager);
            this._m_gameManager.setUIManager(uiManager);
            scoreManager.reset(this, gameManager);
            return;
        };
        Test.prototype.update = function (_time, _delta) {
            var dt = _delta * 0.001;
            this._m_gameManager.update(dt);
            return;
        };
        return Test;
    }(Phaser.Scene));
    exports.Test = Test;
});
define("test/pilot/src/ts_src/scenes/boot", ["require", "exports", "game/src/ts_src/gameManager/gameManager"], function (require, exports, gameManager_38) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Boot = void 0;
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.preload = function () {
            this.load.path = "../assets/";
            this.load.text('TiledMap_Pack', 'packs/tiledMap_pack.json');
        };
        Boot.prototype.create = function () {
            gameManager_38.GameManager.Prepare();
            var gameManager = gameManager_38.GameManager.GetInstance();
            this.scene.start('preload');
            return;
        };
        return Boot;
    }(Phaser.Scene));
    exports.Boot = Boot;
});
define("test/pilot/src/ts_src/game_init", ["require", "exports", "phaser3-nineslice", "test/pilot/src/ts_src/scenes/preload", "test/pilot/src/ts_src/scenes/test", "test/pilot/src/ts_src/scenes/boot"], function (require, exports, phaser3_nineslice_1, preload_1, test_1, boot_1) {
    "use strict";
    var GameInit = (function () {
        function GameInit() {
        }
        GameInit.prototype.start = function () {
            var config = {
                type: Phaser.WEBGL,
                scale: {
                    parent: 'phaser-game',
                    autoCenter: Phaser.Scale.CENTER_BOTH,
                    mode: Phaser.Scale.FIT
                },
                width: 1080,
                height: 1920,
                physics: {
                    default: 'arcade',
                    arcade: {
                        debug: true
                    }
                },
                input: {
                    gamepad: true
                },
                plugins: {
                    global: [phaser3_nineslice_1.Plugin.DefaultCfg],
                },
                backgroundColor: 0x6ab4d4
            };
            this.m_game = new Phaser.Game(config);
            this.m_game.scene.add('boot', boot_1.Boot);
            this.m_game.scene.add('preload', preload_1.Preload);
            this.m_game.scene.add('test', test_1.Test);
            this.m_game.scene.start('boot');
            return;
        };
        return GameInit;
    }());
    return GameInit;
});
define("game/src/ts_src/playerController/playerControllerConfig", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlayerControllerConfig = void 0;
    var PlayerControllerConfig = (function () {
        function PlayerControllerConfig() {
        }
        return PlayerControllerConfig;
    }());
    exports.PlayerControllerConfig = PlayerControllerConfig;
});
define("game/src/ts_src/components/cmpTargetController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_104) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpTargetController = void 0;
    var CmpTargetController = (function () {
        function CmpTargetController() {
        }
        CmpTargetController.Create = function () {
            var controller = new CmpTargetController();
            controller.m_id = _1942enums_104.DC_COMPONENT_ID.kCollisionController;
            return controller;
        };
        CmpTargetController.prototype.init = function (_actor) {
            this.m_color = new Phaser.Display.Color();
        };
        CmpTargetController.prototype.update = function (_actor) { };
        CmpTargetController.prototype.receive = function (_id, _obj) { };
        CmpTargetController.prototype.destroy = function () { };
        CmpTargetController.prototype.onCollision = function (_other, _this) {
            var sprite = _this.getWrappedInstance();
            sprite.setTint(this.m_color.random().color);
            return;
        };
        return CmpTargetController;
    }());
    exports.CmpTargetController = CmpTargetController;
});
define("game/src/ts_src/bulletManager/bulletManagerConfig", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BulletManagerConfig = void 0;
    var BulletManagerConfig = (function () {
        function BulletManagerConfig() {
        }
        return BulletManagerConfig;
    }());
    exports.BulletManagerConfig = BulletManagerConfig;
});
define("game/src/ts_src/gameManager/levelConfig", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LevelConfig = void 0;
    var LevelConfig = (function () {
        function LevelConfig() {
        }
        return LevelConfig;
    }());
    exports.LevelConfig = LevelConfig;
});
//# sourceMappingURL=test_pilot.js.map