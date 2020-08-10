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
define("game/src/ts_src/states/IBaseState", ["require", "exports"], function (require, exports) {
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
define("game/src/ts_src/commons/1942enums", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DC_ACTOR_COMMAND = exports.DC_BULLET_TYPE = exports.DC_ANIMATION_ID = exports.DC_MESSAGE_ID = exports.DC_COMPONENT_ID = exports.DC_BOSS_ID = exports.DC_ENEMY_TYPE = void 0;
    exports.DC_ENEMY_TYPE = Object.freeze({
        kUndefined: -1,
        kErrante: 0,
        kSonico: 1,
        kRanger: 2
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
        kDesactive: 511
    });
    exports.DC_ANIMATION_ID = Object.freeze({
        kForward: 0,
        kBack: 1,
        kRight: 2,
        kLeft: 3,
        kIdle: 4
    });
    exports.DC_BULLET_TYPE = Object.freeze({
        kUndefined: 0,
        kHeroBasic: 1,
        kEnemyBasic: 2,
    });
    exports.DC_ACTOR_COMMAND = Object.freeze({
        kRemoveComponent: 0
    });
});
define("game/src/ts_src/components/iBaseComponent", ["require", "exports"], function (require, exports) {
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
        NullBulletSpawner.prototype.update = function (_dt) {
            console.log("NullBulletSpawner: update.");
            return;
        };
        NullBulletSpawner.prototype.spawn = function (_actor, _x, _y) {
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
        NullBulletManager.prototype.spawn = function (_x, _y, _type) {
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
            this.hero_playzone_padding = 100;
            this.bulletManager_key = "";
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
define("game/src/ts_src/enemiesManager/nullEnemiesManager", ["require", "exports", "game/src/ts_src/enemiesManager/enemySpawner/nullEnemySpawner", "game/src/ts_src/bulletManager/nullBulletManager"], function (require, exports, nullEnemySpawner_1, nullBulletManager_1) {
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
        NullEnemiesManager.prototype.spawn = function (_x, _y, _type) {
            console.log("NullEnemiesManager : spawn. ");
            return;
        };
        NullEnemiesManager.prototype.setBulletManager = function (_bulletManager) { };
        NullEnemiesManager.prototype.getBulletManager = function () {
            return nullBulletManager_1.NullBulletManager.GetInstance();
        };
        NullEnemiesManager.prototype.destroy = function () {
            return;
        };
        return NullEnemiesManager;
    }());
    exports.NullEnemiesManager = NullEnemiesManager;
});
define("game/src/ts_src/enemiesManager/enemySpawner/nullEnemySpawner", ["require", "exports", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/enemiesManager/nullEnemiesManager"], function (require, exports, nullBulletManager_2, _1942enums_3, nullEnemiesManager_1) {
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
        NullEnemySpawner.prototype.spawn = function (_actor, _x, _y) {
            return;
        };
        NullEnemySpawner.prototype.setEnemiesManager = function (_enemiesManager) { };
        NullEnemySpawner.prototype.getEnemiesManager = function () {
            return nullEnemiesManager_1.NullEnemiesManager.GetInstance();
        };
        NullEnemySpawner.prototype.setBulletManager = function (_bulletManager) { };
        NullEnemySpawner.prototype.getBulletManager = function () {
            return nullBulletManager_2.NullBulletManager.GetInstance();
        };
        NullEnemySpawner.prototype.getID = function () {
            return _1942enums_3.DC_ENEMY_TYPE.kUndefined;
        };
        NullEnemySpawner.prototype.assemble = function (_actor) { };
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
define("game/src/ts_src/commands/levelCommands/iLevelCommands", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/commands/levelCommands/cmdSpawnErrante", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager", "game/src/ts_src/messages/msgEnemySpawn"], function (require, exports, _1942enums_5, gameManager_1, msgEnemySpawn_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmdSpawnErrante = void 0;
    var CmdSpawnErrante = (function () {
        function CmdSpawnErrante(_x, _y) {
            this._m_position = new Phaser.Geom.Point(_x, _y);
            return;
        }
        CmdSpawnErrante.prototype.exec = function (_levelGenerator) {
            gameManager_1.GameManager.ReceiveMessage(_1942enums_5.DC_MESSAGE_ID.KSpawnEnemy, new msgEnemySpawn_1.MsgEnemySpawn(_1942enums_5.DC_ENEMY_TYPE.kErrante, this._m_position.x, this._m_position.y));
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
define("game/src/ts_src/levelGenerator/levelGenerator", ["require", "exports", "game/src/ts_src/commands/levelCommands/cmdSpawnErrante"], function (require, exports, cmdSpawnErrante_1) {
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
            return levelGenerator;
        };
        LevelGenerator.prototype.init = function (_scene, _config) {
            if (!_scene.cache.tilemap.has(_config.map_key)) {
                console.log("map didn't found: " + _config.map_key);
                return;
            }
            var map = _scene.add.tilemap(_config.map_key);
            this.loadMap(map);
            return;
        };
        LevelGenerator.prototype.loadMap = function (_map) {
            var map_height = _map.heightInPixels;
            var aLayerNames = _map.getObjectLayerNames();
            var layerName;
            var objectLayer;
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
                    position.y = -50.0;
                    command.setPosition(position.x, position.y);
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
            var command = new cmdSpawnErrante_1.CmdSpawnErrante(_object.x, _object.y);
            this._m_aLevelCommands.push(command);
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
define("game/src/ts_src/components/cmpHeroInput", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpHeroInput = void 0;
    var CmpHeroInput = (function () {
        function CmpHeroInput() {
        }
        CmpHeroInput.Create = function () {
            var input = new CmpHeroInput();
            input.m_id = _1942enums_6.DC_COMPONENT_ID.kHeroInput;
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
                    _actor.sendMessage(_1942enums_6.DC_MESSAGE_ID.kPointerPressed, pointer);
                }
                else {
                    this._m_movement_fn.call(this, _actor);
                }
            }
            else {
                if (this._m_pointerDown) {
                    this._m_pointerDown = !this._m_pointerDown;
                    _actor.sendMessage(_1942enums_6.DC_MESSAGE_ID.kPointerReleased, pointer);
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
            _actor.sendMessage(_1942enums_6.DC_MESSAGE_ID.kAgentMove, this._m_v3);
            return;
        };
        CmpHeroInput.prototype._relativeMovement = function (_actor) {
            var pointer = this._m_pointer;
            this._m_v3.x = this._m_downPosition.x + (pointer.position.x - pointer.downX);
            this._m_v3.y = this._m_downPosition.y + (pointer.position.y - pointer.downY);
            _actor.sendMessage(_1942enums_6.DC_MESSAGE_ID.kToPosition, this._m_v3);
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
            _actor.sendMessage(_1942enums_6.DC_MESSAGE_ID.kMixedMovement, this._m_v3);
            return;
        };
        return CmpHeroInput;
    }());
    exports.CmpHeroInput = CmpHeroInput;
});
define("game/src/ts_src/components/cmpMovement", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpMovement = void 0;
    var CmpMovement = (function () {
        function CmpMovement() {
        }
        CmpMovement.Create = function () {
            var movement = new CmpMovement();
            movement.m_id = _1942enums_7.DC_COMPONENT_ID.kMovement;
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
                case _1942enums_7.DC_MESSAGE_ID.kPointerMoved:
                    {
                        var pointer = _obj;
                        this.setPosition(pointer.position.x, pointer.position.y);
                    }
                    return;
                case _1942enums_7.DC_MESSAGE_ID.kAgentMove:
                    {
                        var movement = _obj;
                        var sprite = this._m_sprite;
                        this.setPosition(sprite.x + movement.x, sprite.y + movement.y);
                    }
                    return;
                case _1942enums_7.DC_MESSAGE_ID.kAgentMove:
                    {
                        var movement = _obj;
                        var sprite = this._m_sprite;
                        this.setPosition(sprite.x + movement.x, sprite.y + movement.y);
                    }
                    return;
                case _1942enums_7.DC_MESSAGE_ID.kToPosition:
                    {
                        var positon = _obj;
                        this.setPosition(positon.x, positon.y);
                    }
                    return;
                case _1942enums_7.DC_MESSAGE_ID.kMixedMovement:
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
define("game/src/ts_src/states/IAnimationState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/components/cmpAnimation", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/states/nullState"], function (require, exports, _1942enums_8, nullState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpAnimation = void 0;
    var CmpAnimation = (function () {
        function CmpAnimation() {
        }
        CmpAnimation.Create = function () {
            var anim = new CmpAnimation();
            anim.m_id = _1942enums_8.DC_COMPONENT_ID.kAnimation;
            anim._m_states = new Map();
            anim._m_activeState = nullState_1.NullState.GetInstance();
            return anim;
        };
        CmpAnimation.prototype.init = function (_actor) {
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
        CmpAnimation.prototype.destroy = function () {
            this._m_states.forEach(function (_state) {
                _state.destroy();
            });
            this._m_states.clear();
            this._m_states = null;
            this._m_activeState = nullState_1.NullState.GetInstance();
            this._m_sprite = null;
            return;
        };
        return CmpAnimation;
    }());
    exports.CmpAnimation = CmpAnimation;
});
define("game/src/ts_src/states/stateHeroFFLight", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StateHeroFFlight = void 0;
    var StateHeroFFlight = (function () {
        function StateHeroFFlight() {
            this.m_id = "Hero_Forward_Flight";
            this._m_isMoving = false;
            return;
        }
        StateHeroFFlight.prototype.onEnter = function () {
            var sprite = this.m_component.getSprite();
            sprite.play('D001_Flight');
            this._m_isMoving = true;
            sprite.anims.currentAnim.once('repeat', this._onRepeat, this);
            return;
        };
        StateHeroFFlight.prototype.onExit = function () { };
        StateHeroFFlight.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_9.DC_MESSAGE_ID.kPointerPressed:
                    this._m_isMoving = true;
                    return;
                case _1942enums_9.DC_MESSAGE_ID.kPointerReleased:
                    this._m_isMoving = false;
                    return;
                default:
                    return;
            }
        };
        StateHeroFFlight.prototype.update = function () { };
        StateHeroFFlight.prototype.destroy = function () { };
        StateHeroFFlight.prototype._onRepeat = function () {
            if (this._m_isMoving) {
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
define("game/src/ts_src/states/stateHeroGlide", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_10) {
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
                case _1942enums_10.DC_MESSAGE_ID.kPointerPressed:
                    this.m_component.setActive("Hero_Forward_Flight");
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
define("game/src/ts_src/components/cmpHeroBulletController", ["require", "exports", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, nullBulletManager_3, _1942enums_11, gameManager_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpHeroBulletController = void 0;
    var CmpHeroBulletController = (function () {
        function CmpHeroBulletController() {
        }
        CmpHeroBulletController.Create = function () {
            var bulletController = new CmpHeroBulletController();
            bulletController.m_id = _1942enums_11.DC_COMPONENT_ID.kHeroBulletController;
            bulletController._m_bulletManager = nullBulletManager_3.NullBulletManager.GetInstance();
            return bulletController;
        };
        CmpHeroBulletController.prototype.init = function (_actor) {
            this._m_gameManager = gameManager_2.GameManager.GetInstance();
            this._m_loadingTime = 0.0;
            return;
        };
        CmpHeroBulletController.prototype.setBulletManager = function (_bulletManager) {
            this._m_bulletManager = _bulletManager;
            return;
        };
        CmpHeroBulletController.prototype.update = function (_actor) {
            var loading = this._m_loadingTime;
            loading += this._m_gameManager.m_dt;
            if (loading >= this._m_frecuency) {
                var sprite = _actor.getWrappedInstance();
                this._m_bulletManager.spawn(sprite.x, sprite.y - 110.0, _1942enums_11.DC_BULLET_TYPE.kHeroBasic);
                loading = 0.0;
            }
            this._m_loadingTime = loading;
            return;
        };
        CmpHeroBulletController.prototype.receive = function (_id, _obj) {
            return;
        };
        CmpHeroBulletController.prototype.setFireRate = function (_fireRate) {
            if (_fireRate == 0.0) {
                this._m_frecuency = 10000.0;
            }
            else {
                this._m_frecuency = 1.0 / _fireRate;
            }
            return;
        };
        CmpHeroBulletController.prototype.getFireRate = function () {
            return this._m_frecuency;
        };
        CmpHeroBulletController.prototype.destroy = function () {
            this._m_bulletManager = null;
            this._m_gameManager = null;
            return;
        };
        return CmpHeroBulletController;
    }());
    exports.CmpHeroBulletController = CmpHeroBulletController;
});
define("game/src/ts_src/components/cmpHeroData", ["require", "exports", "game/src/ts_src/commons/1942enums", "listeners/mxListenerManager", "listeners/mxListener"], function (require, exports, _1942enums_12, mxListenerManager_1, mxListener_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpHeroData = void 0;
    var CmpHeroData = (function () {
        function CmpHeroData() {
        }
        CmpHeroData.Create = function () {
            var data = new CmpHeroData();
            data._m_health = 10;
            data.m_id = _1942enums_12.DC_COMPONENT_ID.kHeroData;
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
                case _1942enums_12.DC_MESSAGE_ID.kHit:
                    this._onHit(_obj);
                    return;
            }
        };
        CmpHeroData.prototype.setHealth = function (_health) {
            this._m_health = _health;
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
                this._m_actor.sendMessage(_1942enums_12.DC_MESSAGE_ID.kKill, this._m_actor);
                health = 0;
            }
            this._m_health = health;
            this._m_listeners.call('onHealthChanged', this, undefined);
            return;
        };
        return CmpHeroData;
    }());
    exports.CmpHeroData = CmpHeroData;
});
define("game/src/ts_src/playerController/playerController", ["require", "exports", "game/src/ts_src/actors/baseActor", "game/src/ts_src/components/cmpHeroInput", "game/src/ts_src/components/cmpMovement", "game/src/ts_src/components/cmpAnimation", "game/src/ts_src/states/stateHeroFFLight", "game/src/ts_src/states/stateHeroGlide", "game/src/ts_src/components/cmpHeroBulletController", "game/src/ts_src/commons/1942enums", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/components/cmpHeroData", "game/src/ts_src/components/cmpNullCollisionController"], function (require, exports, baseActor_1, cmpHeroInput_1, cmpMovement_1, cmpAnimation_1, stateHeroFFLight_1, stateHeroGlide_1, cmpHeroBulletController_1, _1942enums_13, nullBulletManager_4, cmpHeroData_1, cmpNullCollisionController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlayerController = void 0;
    var PlayerController = (function () {
        function PlayerController() {
            this._m_bulletManager = nullBulletManager_4.NullBulletManager.GetInstance();
            return;
        }
        PlayerController.prototype.init = function (_scene, _cnfHero) {
            var heroSprite = _scene.physics.add.sprite(_scene.game.canvas.width * 0.5, _scene.game.canvas.height * 0.5, _cnfHero.texture, _cnfHero.frame);
            var hero = baseActor_1.BaseActor.Create(heroSprite, "Hero");
            heroSprite.setData('actor', hero);
            hero.addComponent(cmpHeroInput_1.CmpHeroInput.Create());
            hero.addComponent(cmpMovement_1.CmpMovement.Create());
            hero.addComponent(cmpAnimation_1.CmpAnimation.Create());
            hero.addComponent(cmpHeroData_1.CmpHeroData.Create());
            hero.addComponent(cmpHeroBulletController_1.CmpHeroBulletController.Create());
            hero.addComponent(cmpNullCollisionController_1.CmpNullCollisionController.GetInstance());
            hero.init();
            this.setPlayer(hero);
            var anim = hero.getComponent(_1942enums_13.DC_COMPONENT_ID.kAnimation);
            anim.addState(new stateHeroFFLight_1.StateHeroFFlight());
            anim.addState(new stateHeroGlide_1.StateHeroGlide());
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
            this.setPosition(_cnfHero.x, _cnfHero.y);
            this.setInputMode(_cnfHero.movement_mode);
            this.setHeroSpeed(_cnfHero.maximum_speed);
            this.setHeroFireRate(_cnfHero.fireRate);
            var canvas = _scene.game.canvas;
            this.setMovementPadding(_cnfHero.hero_playzone_padding, _cnfHero.hero_playzone_padding, canvas.width - _cnfHero.hero_playzone_padding, canvas.height - _cnfHero.hero_playzone_padding);
            return;
        };
        PlayerController.prototype.setBulletManager = function (_bulletManager) {
            this._m_bulletManager = _bulletManager;
            var bulletCntrl = this._m_player.getComponent(_1942enums_13.DC_COMPONENT_ID.kHeroBulletController);
            bulletCntrl.setBulletManager(_bulletManager);
            return;
        };
        PlayerController.prototype.setPointer = function (_pointer) {
            var input = this._m_player.getComponent(_1942enums_13.DC_COMPONENT_ID.kHeroInput);
            input.setPointer(_pointer);
            return;
        };
        PlayerController.prototype.getPointer = function () {
            var input = this._m_player.getComponent(_1942enums_13.DC_COMPONENT_ID.kHeroInput);
            return input.getPointer();
        };
        PlayerController.prototype.setInputMode = function (_mode) {
            var input = this._m_player.getComponent(_1942enums_13.DC_COMPONENT_ID.kHeroInput);
            input.setMode(_mode);
            return;
        };
        PlayerController.prototype.getInputMode = function () {
            var input = this._m_player.getComponent(_1942enums_13.DC_COMPONENT_ID.kHeroInput);
            return input.getMode();
        };
        PlayerController.prototype.setHeroSpeed = function (_speed) {
            var input = this._m_player.getComponent(_1942enums_13.DC_COMPONENT_ID.kHeroInput);
            input.setSpeed(_speed);
            return;
        };
        PlayerController.prototype.setHeroFireRate = function (_fireRate) {
            var bulletController = this._m_player.getComponent(_1942enums_13.DC_COMPONENT_ID.kHeroBulletController);
            bulletController.setFireRate(_fireRate);
            return;
        };
        PlayerController.prototype.getHeroFireRate = function () {
            var bulletController = this._m_player.getComponent(_1942enums_13.DC_COMPONENT_ID.kHeroBulletController);
            return bulletController.getFireRate();
        };
        PlayerController.prototype.setMovementPadding = function (_p1_x, _p1_y, _p2_x, _p2_y) {
            var movement = this._m_player.getComponent(_1942enums_13.DC_COMPONENT_ID.kMovement);
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
        PlayerController.prototype.update = function (_dt) {
            this._m_player.update();
            this._m_bulletManager.update(_dt);
            return;
        };
        PlayerController.prototype.destroy = function () {
            this._m_player.destroy();
            return;
        };
        PlayerController.prototype.setPosition = function (_x, _y) {
            this._m_player.sendMessage(_1942enums_13.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(_x, _y, 0.0));
            return;
        };
        PlayerController.prototype.getDirection = function () {
            var movement = this._m_player.getComponent(_1942enums_13.DC_COMPONENT_ID.kMovement);
            return movement.getDirection();
        };
        return PlayerController;
    }());
    exports.PlayerController = PlayerController;
});
define("game/src/ts_src/scoreManager/scoreManagerConfig", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScoreManagerConfig = void 0;
    var ScoreManagerConfig = (function () {
        function ScoreManagerConfig() {
            this.init_score = 0;
            return;
        }
        return ScoreManagerConfig;
    }());
    exports.ScoreManagerConfig = ScoreManagerConfig;
});
define("game/src/ts_src/scoreManager/iScoreManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/scoreManager/scoreManager", ["require", "exports", "listeners/mxListener", "listeners/mxListenerManager", "game/src/ts_src/scoreManager/scoreManagerConfig"], function (require, exports, mxListener_2, mxListenerManager_2, scoreManagerConfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScoreManager = void 0;
    var ScoreManager = (function () {
        function ScoreManager() {
        }
        ScoreManager.Create = function () {
            var scoreManager = new ScoreManager();
            scoreManager._m_score = 0.0;
            scoreManager._m_listener
                = new mxListenerManager_2.MxListenerManager();
            scoreManager._m_listener.addEvent('scoreChanged');
            return scoreManager;
        };
        ScoreManager.prototype.init = function (_scene, _config) {
            this._m_config = _config;
            return;
        };
        ScoreManager.prototype.reset = function (_scene, _gameManager) {
            if (this._m_config == null) {
                this._m_config = new scoreManagerConfig_1.ScoreManagerConfig();
            }
            this.setScore(this._m_config.init_score);
            return;
        };
        ScoreManager.prototype.update = function (_dt) {
            return;
        };
        ScoreManager.prototype.suscribe = function (_event, _username, _function, _context) {
            this._m_listener.suscribe(_event, _username, new mxListener_2.MxListener(_function, _context));
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
        ScoreManager.prototype.addScore = function (_points) {
            this._m_score += _points;
            this._m_listener.call("scoreChanged", this, undefined);
            return;
        };
        ScoreManager.prototype.destroy = function () {
            this._m_listener.destroy();
            return;
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
        NullUIManager.prototype.init = function (_scene, _gameManager) {
        };
        NullUIManager.prototype.reset = function (_scene, _gameManager) { };
        NullUIManager.prototype.update = function (_dt) { };
        return NullUIManager;
    }());
    exports.NullUIManager = NullUIManager;
});
define("game/src/ts_src/gameManager/gameManager", ["require", "exports", "commons/mxEnums", "game/src/ts_src/bulletManager/bulletSpawner/nullBulletSpawner", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpNullCollisionController", "game/src/ts_src/components/cmpNullEnemyController", "game/src/ts_src/enemiesManager/enemySpawner/nullEnemySpawner", "game/src/ts_src/enemiesManager/nullEnemiesManager", "game/src/ts_src/levelGenerator/ambienceGenerator/ambienceGenerator", "game/src/ts_src/levelGenerator/ambienceGenerator/nullAmbientGenerator", "game/src/ts_src/levelGenerator/levelGenerator", "game/src/ts_src/levelGenerator/nullLevelGenerator", "game/src/ts_src/playerController/playerController", "game/src/ts_src/scoreManager/scoreManager", "game/src/ts_src/uiManager/NullUIManager"], function (require, exports, mxEnums_3, nullBulletSpawner_2, nullBulletManager_5, _1942enums_14, cmpNullCollisionController_2, cmpNullEnemyController_1, nullEnemySpawner_3, nullEnemiesManager_3, ambienceGenerator_1, nullAmbientGenerator_1, levelGenerator_1, nullLevelGenerator_1, playerController_1, scoreManager_1, NullUIManager_1) {
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
                case _1942enums_14.DC_MESSAGE_ID.kAddScorePoints:
                    {
                        manager.getScoreManager().addScore(_msg);
                    }
                    return;
                case _1942enums_14.DC_MESSAGE_ID.KSpawnEnemy:
                    {
                        var msg = _msg;
                        manager._m_enemiesManager.spawn(msg.x, msg.y, msg.enemy_type);
                    }
                    return;
            }
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
            var playerController = this._m_playerController;
            if (playerController != null) {
                playerController.destroy();
            }
            playerController = new playerController_1.PlayerController();
            playerController.init(_scene, _cnfHero);
            this._m_playerController = playerController;
            return mxEnums_3.OPRESULT.kOk;
        };
        GameManager.prototype.reset = function (_scene) {
            this._m_scoreManager.reset(_scene, this);
            this._m_uiManager.reset(_scene, this);
            return;
        };
        GameManager.prototype.update = function (_dt) {
            this.m_dt = _dt;
            this._m_distance += _dt * this._m_cameraSpeed;
            this._m_ambientGenrator.update(_dt);
            this._m_levelGenerator.update(_dt, this._m_distance);
            this._m_playerController.update(_dt);
            this._m_enemiesManager.update(_dt);
            this._m_scoreManager.update(_dt);
            this._m_uiManager.update(_dt);
            return;
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
        GameManager.prototype._onPrepare = function () {
            this._m_distance = 0.0;
            this._m_cameraSpeed = 0.0;
            this.m_dt = 0.0;
            nullBulletSpawner_2.NullBulletSpawner.Prepare();
            cmpNullEnemyController_1.CmpNullEnemyController.Prepare();
            cmpNullCollisionController_2.CmpNullCollisionController.Prepare();
            nullBulletManager_5.NullBulletManager.Prepare();
            nullEnemySpawner_3.NullEnemySpawner.Prepare();
            nullEnemiesManager_3.NullEnemiesManager.Prepare();
            this.setEnemiesManager(nullEnemiesManager_3.NullEnemiesManager.GetInstance());
            this.setScoreManager(scoreManager_1.ScoreManager.Create());
            this.setAmbientGenerator(new nullAmbientGenerator_1.NullAmbientGenerator());
            this.setLevelGenerator(new nullLevelGenerator_1.NullLevelGenerator());
            this.setUIManager(new NullUIManager_1.NullUIManager());
            return;
        };
        GameManager.prototype._onShutdown = function () {
            this._m_levelGenerator.destroy();
            this._m_ambientGenrator.destroy();
            this._m_scoreManager.destroy();
            this._m_enemiesManager.destroy();
            nullEnemiesManager_3.NullEnemiesManager.Shutdown();
            nullEnemySpawner_3.NullEnemySpawner.Shutdown();
            nullBulletManager_5.NullBulletManager.Shutdown();
            cmpNullCollisionController_2.CmpNullCollisionController.Shutdown();
            cmpNullEnemyController_1.CmpNullEnemyController.Shutdown();
            nullBulletSpawner_2.NullBulletSpawner.Shutdown();
            return;
        };
        return GameManager;
    }());
    exports.GameManager = GameManager;
});
define("game/src/ts_src/components/cmpBulletData", ["require", "exports", "game/src/ts_src/bulletManager/bulletSpawner/nullBulletSpawner", "game/src/ts_src/commons/1942enums"], function (require, exports, nullBulletSpawner_3, _1942enums_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpBulletData = void 0;
    var CmpBulletData = (function () {
        function CmpBulletData() {
            this._m_bulletSpawner = nullBulletSpawner_3.NullBulletSpawner.GetInstance();
            this._m_attackPoints = 0.0;
            return;
        }
        CmpBulletData.Create = function () {
            var component = new CmpBulletData;
            component.m_id = _1942enums_15.DC_COMPONENT_ID.kBulletData;
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
define("game/src/ts_src/components/cmpBulletCollisionController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_16) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpBulletCollisionController = void 0;
    var CmpBulletCollisionController = (function () {
        function CmpBulletCollisionController() {
        }
        CmpBulletCollisionController.Create = function () {
            var controller = new CmpBulletCollisionController();
            controller.m_id = _1942enums_16.DC_COMPONENT_ID.kCollisionController;
            return controller;
        };
        CmpBulletCollisionController.prototype.onCollision = function (_other, _this) {
            var data = _this.getComponent(_1942enums_16.DC_COMPONENT_ID.kBulletData);
            _other.sendMessage(_1942enums_16.DC_MESSAGE_ID.kHit, data.getAttackPoints());
            _this.sendMessage(_1942enums_16.DC_MESSAGE_ID.kKill, _this);
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
define("game/src/ts_src/components/cmpMovementBullet", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_17) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpMovementBullet = void 0;
    var CmpMovementBullet = (function () {
        function CmpMovementBullet() {
        }
        CmpMovementBullet.Create = function () {
            var movement = new CmpMovementBullet();
            movement.m_id = _1942enums_17.DC_COMPONENT_ID.kMovementBullet;
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
                case _1942enums_17.DC_MESSAGE_ID.kAgentMove:
                    {
                        var movement = _obj;
                        this.move(movement.x, movement.y);
                    }
                    return;
                case _1942enums_17.DC_MESSAGE_ID.kToPosition:
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
define("game/src/ts_src/components/cmpPlayZone", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_18) {
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
            playZone.m_id = _1942enums_18.DC_COMPONENT_ID.kPlayZone;
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
            _actor.sendMessage(_1942enums_18.DC_MESSAGE_ID.kDesactive, _actor);
            return;
        };
        CmpPlayZone.prototype.receive = function (_id, _obj) { };
        CmpPlayZone.prototype.destroy = function () { };
        return CmpPlayZone;
    }());
    exports.CmpPlayZone = CmpPlayZone;
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
define("game/src/ts_src/bulletManager/bulletManager", ["require", "exports", "optimization/mxObjectPool", "game/src/ts_src/actors/baseActor", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpBulletCollisionController", "game/src/ts_src/components/cmpBulletData", "game/src/ts_src/components/cmpMovementBullet", "game/src/ts_src/components/cmpPlayZone", "game/src/ts_src/bulletManager/bulletSpawner/nullBulletSpawner"], function (require, exports, mxObjectPool_2, baseActor_2, _1942enums_19, cmpBulletCollisionController_1, cmpBulletData_1, cmpMovementBullet_1, cmpPlayZone_1, nullBulletSpawner_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BulletManager = void 0;
    var BulletManager = (function () {
        function BulletManager() {
        }
        BulletManager.Create = function () {
            var bulletMng = new BulletManager();
            var pool = mxObjectPool_2.MxObjectPool.Create();
            pool.suscribe('elementActive', 'BulletManager', bulletMng._onActive, bulletMng);
            pool.suscribe('elementDesactive', 'BulletManager', bulletMng._onDesactive, bulletMng);
            bulletMng._m_pool = pool;
            bulletMng._m_playZone = cmpPlayZone_1.CmpPlayZone.Create();
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
                bullet = baseActor_2.BaseActor.Create(sprite, "Bullet_" + size.toString());
                sprite.setData('actor', bullet);
                bullet.addComponent(cmpMovementBullet_1.CmpMovementBullet.Create());
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
        BulletManager.prototype.spawn = function (_x, _y, _type) {
            var hSpawner = this._m_hSpawner;
            if (hSpawner.has(_type)) {
                var spawner = hSpawner.get(_type);
                var actor = this._m_pool.get();
                if (actor != null) {
                    spawner.spawn(actor, _x, _y);
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
            this._m_pool.destroy();
            this._m_bodiesGroup.destroy();
            return;
        };
        BulletManager.prototype._onCollision = function (_other, _bullet) {
            var bulletActor = _bullet.getData("actor");
            var bulletController = bulletActor.getComponent(_1942enums_19.DC_COMPONENT_ID.kCollisionController);
            var otherActor = _other.getData('actor');
            bulletController.onCollision(otherActor, bulletActor);
            var otherController = otherActor.getComponent(_1942enums_19.DC_COMPONENT_ID.kCollisionController);
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
define("game/src/ts_src/components/cmpBasicBulletController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_20) {
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
            controller._m_speed = 0.0;
            controller.m_id = _1942enums_20.DC_COMPONENT_ID.kBasicBulletController;
            return controller;
        };
        CmpBasicBulletController.prototype.init = function (_actor) { };
        CmpBasicBulletController.prototype.setDirection = function (_x, _y) {
            this._m_direction.setTo(_x, _y);
            this._m_direction.normalize();
            return;
        };
        CmpBasicBulletController.prototype.setSpeed = function (_speed) {
            this._m_speed = _speed;
            return;
        };
        CmpBasicBulletController.prototype.resetForce = function (_dt) {
            var mult = _dt * this._m_speed;
            this._m_force.x = this._m_direction.x * mult;
            this._m_force.y = this._m_direction.y * mult;
            return;
        };
        CmpBasicBulletController.prototype.update = function (_actor) {
            _actor.sendMessage(_1942enums_20.DC_MESSAGE_ID.kAgentMove, this._m_force);
            return;
        };
        CmpBasicBulletController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_20.DC_MESSAGE_ID.kKill:
                    this._onKill(_obj);
                    return;
                case _1942enums_20.DC_MESSAGE_ID.kDesactive:
                    this._onKill(_obj);
                    return;
            }
        };
        CmpBasicBulletController.prototype.destroy = function () { };
        CmpBasicBulletController.prototype._onKill = function (_actor) {
            var data = _actor.getComponent(_1942enums_20.DC_COMPONENT_ID.kBulletData);
            data.getSpawner().disassemble(_actor);
            return;
        };
        return CmpBasicBulletController;
    }());
    exports.CmpBasicBulletController = CmpBasicBulletController;
});
define("game/src/ts_src/bulletManager/bulletSpawner/heroBasicBulletSpawner", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpBasicBulletController", "game/src/ts_src/bulletManager/bulletSpawner/nullBulletSpawner"], function (require, exports, _1942enums_21, cmpBasicBulletController_1, nullBulletSpawner_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HeroBasicBulletSpawner = void 0;
    var HeroBasicBulletSpawner = (function () {
        function HeroBasicBulletSpawner() {
        }
        HeroBasicBulletSpawner.Create = function (_direction, _speed) {
            var spawner = new HeroBasicBulletSpawner;
            var basicMovement = cmpBasicBulletController_1.CmpBasicBulletController.Create();
            if (_direction != undefined) {
                basicMovement.setDirection(_direction.x, _direction.y);
            }
            else {
                basicMovement.setDirection(0.0, -1.0);
            }
            if (_speed != undefined) {
                basicMovement.setSpeed(_speed);
            }
            else {
                basicMovement.setSpeed(1200.0);
            }
            spawner._m_controller = basicMovement;
            return spawner;
        };
        HeroBasicBulletSpawner.prototype.update = function (_dt) {
            this._m_controller.resetForce(_dt);
            return;
        };
        HeroBasicBulletSpawner.prototype.spawn = function (_actor, _x, _y) {
            this.assemble(_actor);
            _actor.sendMessage(_1942enums_21.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(_x, _y, 0.0));
            return;
        };
        HeroBasicBulletSpawner.prototype.assemble = function (_actor) {
            var bulletData = _actor.getComponent(_1942enums_21.DC_COMPONENT_ID.kBulletData);
            bulletData.setSpawner(this);
            bulletData.setAttackPoints(1);
            _actor.addComponent(this._m_controller);
            return;
        };
        HeroBasicBulletSpawner.prototype.disassemble = function (_actor) {
            var bulletData = _actor.getComponent(_1942enums_21.DC_COMPONENT_ID.kBulletData);
            bulletData.setSpawner(nullBulletSpawner_5.NullBulletSpawner.GetInstance());
            _actor.removeComponent(_1942enums_21.DC_COMPONENT_ID.kBasicBulletController);
            this._m_bulletManager.disableActor(_actor);
            return;
        };
        HeroBasicBulletSpawner.prototype.setBulletManager = function (_manager) {
            this._m_bulletManager = _manager;
            return;
        };
        HeroBasicBulletSpawner.prototype.getID = function () {
            return _1942enums_21.DC_BULLET_TYPE.kHeroBasic;
        };
        HeroBasicBulletSpawner.prototype.destroy = function () { };
        return HeroBasicBulletSpawner;
    }());
    exports.HeroBasicBulletSpawner = HeroBasicBulletSpawner;
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
define("game/src/ts_src/bulletManager/bulletSpawner/enemyBasicBulletSpawner", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpBasicBulletController", "game/src/ts_src/bulletManager/bulletSpawner/nullBulletSpawner"], function (require, exports, _1942enums_22, cmpBasicBulletController_2, nullBulletSpawner_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EnemyBasicBulletSpawner = void 0;
    var EnemyBasicBulletSpawner = (function () {
        function EnemyBasicBulletSpawner() {
        }
        EnemyBasicBulletSpawner.Create = function () {
            var spawner = new EnemyBasicBulletSpawner;
            var basicMovement = cmpBasicBulletController_2.CmpBasicBulletController.Create();
            basicMovement.setDirection(0.0, 1.0);
            basicMovement.setSpeed(1200.0);
            spawner._m_controller = basicMovement;
            return spawner;
        };
        EnemyBasicBulletSpawner.prototype.update = function (_dt) {
            this._m_controller.resetForce(_dt);
            return;
        };
        EnemyBasicBulletSpawner.prototype.spawn = function (_actor, _x, _y) {
            this.assemble(_actor);
            _actor.sendMessage(_1942enums_22.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(_x, _y, 0.0));
            return;
        };
        EnemyBasicBulletSpawner.prototype.assemble = function (_actor) {
            var sprite = _actor.getWrappedInstance();
            sprite.setTint(0xff0000);
            var bulletData = _actor.getComponent(_1942enums_22.DC_COMPONENT_ID.kBulletData);
            bulletData.setSpawner(this);
            bulletData.setAttackPoints(1);
            _actor.addComponent(this._m_controller);
            return;
        };
        EnemyBasicBulletSpawner.prototype.disassemble = function (_actor) {
            var bulletData = _actor.getComponent(_1942enums_22.DC_COMPONENT_ID.kBulletData);
            bulletData.setSpawner(nullBulletSpawner_6.NullBulletSpawner.GetInstance());
            _actor.removeComponent(_1942enums_22.DC_COMPONENT_ID.kBasicBulletController);
            this._m_bulletManager.disableActor(_actor);
            return;
        };
        EnemyBasicBulletSpawner.prototype.setBulletManager = function (_manager) {
            this._m_bulletManager = _manager;
            return;
        };
        EnemyBasicBulletSpawner.prototype.getID = function () {
            return _1942enums_22.DC_BULLET_TYPE.kEnemyBasic;
        };
        EnemyBasicBulletSpawner.prototype.destroy = function () { };
        return EnemyBasicBulletSpawner;
    }());
    exports.EnemyBasicBulletSpawner = EnemyBasicBulletSpawner;
});
define("game/src/ts_src/components/cmpEnemyHealth", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_23) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpEnemyHealth = void 0;
    var CmpEnemyHealth = (function () {
        function CmpEnemyHealth() {
        }
        CmpEnemyHealth.Create = function () {
            var enemyHealth = new CmpEnemyHealth();
            enemyHealth.m_id = _1942enums_23.DC_COMPONENT_ID.kEnemyHealth;
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
                case _1942enums_23.DC_MESSAGE_ID.kHit:
                    this.hit(_obj);
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
                actor.sendMessage(_1942enums_23.DC_MESSAGE_ID.kKill, actor);
            }
            this._m_iHP = hp;
            return;
        };
        CmpEnemyHealth.prototype.destroy = function () { };
        return CmpEnemyHealth;
    }());
    exports.CmpEnemyHealth = CmpEnemyHealth;
});
define("game/src/ts_src/components/cmpMovementEnemy", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_24) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpMovementEnemy = void 0;
    var CmpMovementEnemy = (function () {
        function CmpMovementEnemy() {
        }
        CmpMovementEnemy.Create = function () {
            var movement = new CmpMovementEnemy();
            movement.m_id = _1942enums_24.DC_COMPONENT_ID.kMovementEnemy;
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
                case _1942enums_24.DC_MESSAGE_ID.kAgentMove:
                    {
                        var movement = _obj;
                        this.move(movement.x, movement.y);
                    }
                    return;
                case _1942enums_24.DC_MESSAGE_ID.kToPosition:
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
define("game/src/ts_src/enemiesManager/enemiesManager", ["require", "exports", "optimization/mxObjectPool", "game/src/ts_src/actors/baseActor", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpEnemyHealth", "game/src/ts_src/components/cmpMovementEnemy", "game/src/ts_src/components/cmpNullCollisionController", "game/src/ts_src/components/cmpNullEnemyController", "game/src/ts_src/enemiesManager/enemySpawner/nullEnemySpawner"], function (require, exports, mxObjectPool_3, baseActor_3, nullBulletManager_6, _1942enums_25, cmpEnemyHealth_1, cmpMovementEnemy_1, cmpNullCollisionController_3, cmpNullEnemyController_2, nullEnemySpawner_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EnemiesManager = void 0;
    var EnemiesManager = (function () {
        function EnemiesManager() {
        }
        EnemiesManager.Create = function () {
            var manager = new EnemiesManager();
            var pool = mxObjectPool_3.MxObjectPool.Create();
            manager._m_actorPool = pool;
            pool.suscribe('elementActive', 'EnemiesManager', manager._onActive, manager);
            pool.suscribe('elementDesactive', 'EnemiesManager', manager._onDesactive, manager);
            manager._m_hSpawner = new Map();
            manager._m_bulletManager = nullBulletManager_6.NullBulletManager.GetInstance();
            return manager;
        };
        EnemiesManager.prototype.init = function (_scene, _config) {
            this.clear();
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
                actor = baseActor_3.BaseActor.Create(sprite, "Enemy_" + size.toString());
                actor.addComponent(cmpMovementEnemy_1.CmpMovementEnemy.Create());
                actor.addComponent(cmpNullCollisionController_3.CmpNullCollisionController.GetInstance());
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
        EnemiesManager.prototype.spawn = function (_x, _y, _type) {
            var hSpawner = this._m_hSpawner;
            if (hSpawner.has(_type)) {
                var actor = this.getActor();
                if (actor != null) {
                    hSpawner.get(_type).spawn(actor, _x, _y);
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
        EnemiesManager.prototype.destroy = function () {
            this._m_bodiesGroup.destroy();
            this._m_actorPool.destroy();
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
            var selfController = selfActor.getComponent(_1942enums_25.DC_COMPONENT_ID.kCollisionController);
            var otherController = otherActor.getComponent(_1942enums_25.DC_COMPONENT_ID.kCollisionController);
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
define("game/src/ts_src/components/cmpErranteController", ["require", "exports", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/enemiesManager/enemySpawner/nullEnemySpawner", "game/src/ts_src/enemiesManager/nullEnemiesManager", "game/src/ts_src/gameManager/gameManager"], function (require, exports, nullBulletManager_7, _1942enums_26, nullEnemySpawner_5, nullEnemiesManager_4, gameManager_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpErranteController = void 0;
    var CmpErranteController = (function () {
        function CmpErranteController() {
        }
        CmpErranteController.Create = function () {
            var controller = new CmpErranteController();
            controller.m_id = _1942enums_26.DC_COMPONENT_ID.kEnemyController;
            controller._m_direction = new Phaser.Math.Vector3(0.0, 1.0);
            controller._m_force = new Phaser.Math.Vector3();
            controller._m_speed = 400.0;
            controller._m_fireRate = 2.0;
            controller._m_time = 0.0;
            controller._m_bulletManager = nullBulletManager_7.NullBulletManager.GetInstance();
            controller._m_enemiesManager = nullEnemiesManager_4.NullEnemiesManager.GetInstance();
            controller._m_spawner = nullEnemySpawner_5.NullEnemySpawner.GetInstance();
            controller.setDeltaTime(0.0);
            controller.setScorePoints(10);
            return controller;
        };
        CmpErranteController.prototype.init = function (_actor) {
            return;
        };
        CmpErranteController.prototype.update = function (_actor) {
            _actor.sendMessage(_1942enums_26.DC_MESSAGE_ID.kAgentMove, this._m_force);
            if (this._m_time >= this._m_fireRate) {
                var sprite = _actor.getWrappedInstance();
                this._m_bulletManager.spawn(sprite.x, sprite.y + 100, _1942enums_26.DC_BULLET_TYPE.kEnemyBasic);
            }
            return;
        };
        CmpErranteController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_26.DC_MESSAGE_ID.kKill:
                    this._onKill(_obj);
                    return;
                case _1942enums_26.DC_MESSAGE_ID.kDesactive:
                    this._onDesactived(_obj);
                    return;
            }
            return;
        };
        CmpErranteController.prototype.getCollisionDamage = function () {
            return this._m_collisionDamage;
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
        CmpErranteController.prototype.setDeltaTime = function (_dt) {
            this._m_dt = _dt;
            var force = this._m_force;
            var direction = this._m_direction;
            var mult = this._m_speed * _dt;
            force.x = direction.x * mult;
            force.y = direction.y * mult;
            if (this._m_time >= this._m_fireRate) {
                this._m_time = _dt;
            }
            else {
                this._m_time += _dt;
            }
            return;
        };
        CmpErranteController.prototype.getScorePoints = function () {
            return this._m_scorePoints;
        };
        CmpErranteController.prototype.setScorePoints = function (_points) {
            this._m_scorePoints = _points;
            return;
        };
        CmpErranteController.prototype.destroy = function () {
            this._m_spawner = null;
            return;
        };
        CmpErranteController.prototype._onKill = function (_actor) {
            this._m_spawner.disasemble(_actor);
            this._m_enemiesManager.disableActor(_actor);
            gameManager_3.GameManager.ReceiveMessage(_1942enums_26.DC_MESSAGE_ID.kAddScorePoints, this._m_scorePoints);
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
define("game/src/ts_src/enemiesManager/enemySpawner/erranteSpawner", ["require", "exports", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpErranteController", "game/src/ts_src/components/cmpNullEnemyController", "game/src/ts_src/components/cmpPlayZone", "game/src/ts_src/enemiesManager/nullEnemiesManager"], function (require, exports, nullBulletManager_8, _1942enums_27, cmpErranteController_1, cmpNullEnemyController_3, cmpPlayZone_2, nullEnemiesManager_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ErranteSpawner = void 0;
    var ErranteSpawner = (function () {
        function ErranteSpawner() {
        }
        ErranteSpawner.Create = function () {
            var spawner = new ErranteSpawner();
            spawner._m_enemiesManager = nullEnemiesManager_5.NullEnemiesManager.GetInstance();
            spawner._m_bulletManager = nullBulletManager_8.NullBulletManager.GetInstance();
            spawner._m_controller = cmpErranteController_1.CmpErranteController.Create();
            spawner._m_controller.setSpawner(spawner);
            spawner._m_playZone = cmpPlayZone_2.CmpPlayZone.Create();
            spawner._m_playZone.setBoundings(-100, -100, 1180, 2020);
            return spawner;
        };
        ErranteSpawner.prototype.update = function (_dt) {
            this._m_controller.setDeltaTime(_dt);
            return;
        };
        ErranteSpawner.prototype.spawn = function (_actor, _x, _y) {
            this.assemble(_actor);
            var sprite = _actor.getWrappedInstance();
            sprite.setTexture('enemy');
            sprite.setAngle(90.0);
            sprite.body.setCircle(sprite.height * 0.5, -10.0, 0.0);
            _actor.sendMessage(_1942enums_27.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(_x, _y));
            return;
        };
        ErranteSpawner.prototype.getID = function () {
            return _1942enums_27.DC_ENEMY_TYPE.kErrante;
        };
        ErranteSpawner.prototype.assemble = function (_actor) {
            var healthComponent = _actor.getComponent(_1942enums_27.DC_COMPONENT_ID.kEnemyHealth);
            healthComponent.setHP(5);
            _actor.addComponent(this._m_controller);
            _actor.addComponent(this._m_playZone);
            return;
        };
        ErranteSpawner.prototype.disasemble = function (_actor) {
            _actor.addComponent(cmpNullEnemyController_3.CmpNullEnemyController.GetInstance());
            _actor.removeComponent(_1942enums_27.DC_COMPONENT_ID.kPlayZone);
            return;
        };
        ErranteSpawner.prototype.setEnemiesManager = function (_enemiesManager) {
            this._m_enemiesManager = _enemiesManager;
            this._m_controller.setEnemiesManager(_enemiesManager);
            return;
        };
        ErranteSpawner.prototype.setBulletManager = function (_bulletManager) {
            this._m_bulletManager = _bulletManager;
            this._m_controller.setBulletManager(_bulletManager);
            return;
        };
        ErranteSpawner.prototype.getBulletManager = function () {
            return this._m_bulletManager;
        };
        ErranteSpawner.prototype.getEnemiesManager = function () {
            return this._m_enemiesManager;
        };
        ErranteSpawner.prototype.destroy = function () {
            this._m_controller.destroy();
            this._m_controller = null;
            this._m_playZone.destroy();
            this._m_playZone = null;
            this._m_enemiesManager = null;
            return;
        };
        return ErranteSpawner;
    }());
    exports.ErranteSpawner = ErranteSpawner;
});
define("game/src/ts_src/components/cmpUIHealthController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_28) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpUIHealthController = void 0;
    var CmpUIHealthController = (function () {
        function CmpUIHealthController() {
        }
        CmpUIHealthController.Create = function () {
            var healthController = new CmpUIHealthController();
            healthController.m_id = _1942enums_28.DC_COMPONENT_ID.kUIHealthController;
            return healthController;
        };
        CmpUIHealthController.prototype.init = function (_actor) {
            this._actor = _actor;
            return;
        };
        CmpUIHealthController.prototype.update = function (_actor) { };
        CmpUIHealthController.prototype.receive = function (_id, _obj) { };
        CmpUIHealthController.prototype.onHealthChanged = function (_heroData, _args) {
            var sHealth = "Health : " + _heroData.getHealth().toString();
            this._actor.sendMessage(_1942enums_28.DC_MESSAGE_ID.kSetText, sHealth);
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
define("game/src/ts_src/components/cmpUIScoreController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_29) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpUIScoreController = void 0;
    var CmpUIScoreController = (function () {
        function CmpUIScoreController() {
        }
        CmpUIScoreController.Create = function () {
            var healthController = new CmpUIScoreController();
            healthController.m_id = _1942enums_29.DC_COMPONENT_ID.kUIScoreController;
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
            this._actor.sendMessage(_1942enums_29.DC_MESSAGE_ID.kSetText, sScore);
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
define("game/src/ts_src/components/cmpTextController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_30) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpTextController = void 0;
    var CmpTextController = (function () {
        function CmpTextController() {
        }
        CmpTextController.Create = function () {
            var controller = new CmpTextController();
            controller.m_id = _1942enums_30.DC_COMPONENT_ID.kTextController;
            return controller;
        };
        CmpTextController.prototype.init = function (_actor) {
            this._m_text = _actor.getWrappedInstance();
            return;
        };
        CmpTextController.prototype.update = function (_actor) { };
        CmpTextController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_30.DC_MESSAGE_ID.kSetText:
                    this._m_text.text = _obj;
                    return;
                case _1942enums_30.DC_MESSAGE_ID.kToPosition:
                    {
                        var position = _obj;
                        this._m_text.setPosition(position.x, position.y);
                    }
                    return;
                case _1942enums_30.DC_MESSAGE_ID.kAgentMove:
                    {
                        var movement = _obj;
                        var text = this._m_text;
                        text.x += movement.x;
                        text.y += movement.y;
                    }
                    return;
            }
        };
        CmpTextController.prototype.destroy = function () {
            this._m_text = null;
            return;
        };
        return CmpTextController;
    }());
    exports.CmpTextController = CmpTextController;
});
define("game/src/ts_src/factories/fcUIHealth", ["require", "exports", "game/src/ts_src/actors/baseActor", "game/src/ts_src/components/cmpTextController", "game/src/ts_src/components/cmpUIHealthController"], function (require, exports, baseActor_4, cmpTextController_1, cmpUIHealthController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FcUIHealth = void 0;
    var FcUIHealth = (function () {
        function FcUIHealth() {
        }
        FcUIHealth.Create = function (_scene) {
            var text = _scene.add.text(0, 0, "Health: 10", { fontFamily: 'Arial', fontSize: 64, color: '#000000' });
            var actor = baseActor_4.BaseActor.Create(text, "hero_ui_health");
            actor.addComponent(cmpTextController_1.CmpTextController.Create());
            actor.addComponent(cmpUIHealthController_1.CmpUIHealthController.Create());
            actor.init();
            return actor;
        };
        return FcUIHealth;
    }());
    exports.FcUIHealth = FcUIHealth;
});
define("game/src/ts_src/factories/fcUIScore", ["require", "exports", "game/src/ts_src/actors/baseActor", "game/src/ts_src/components/cmpTextController", "game/src/ts_src/components/cmpUIScoreController"], function (require, exports, baseActor_5, cmpTextController_2, cmpUIScoreController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FcUIScore = void 0;
    var FcUIScore = (function () {
        function FcUIScore() {
        }
        FcUIScore.Create = function (_scene) {
            var text = _scene.add.text(0, 0, "Score : 0", { fontFamily: 'Arial', fontSize: 64, color: '#000000' });
            var actor = baseActor_5.BaseActor.Create(text, "hero_ui_score");
            actor.addComponent(cmpTextController_2.CmpTextController.Create());
            actor.addComponent(cmpUIScoreController_1.CmpUIScoreController.Create());
            actor.init();
            return actor;
        };
        return FcUIScore;
    }());
    exports.FcUIScore = FcUIScore;
});
define("game/src/ts_src/uiManager/UIManager", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/factories/fcUIHealth", "game/src/ts_src/factories/fcUIScore"], function (require, exports, _1942enums_31, fcUIHealth_1, fcUIScore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIManager = void 0;
    var UIManager = (function () {
        function UIManager() {
        }
        UIManager.prototype.init = function (_scene, _gameManager) {
            var heroHealth = fcUIHealth_1.FcUIHealth.Create(_scene);
            var playerController = _gameManager.getPlayerController();
            var hero = playerController.getPlayer();
            if (hero != null) {
                var heroData = hero.getComponent(_1942enums_31.DC_COMPONENT_ID.kHeroData);
                var hpData = heroHealth.getComponent(_1942enums_31.DC_COMPONENT_ID.kUIHealthController);
                heroData.suscribe('onHealthChanged', "UIHealth", hpData.onHealthChanged, hpData);
            }
            var heroScore = fcUIScore_1.FcUIScore.Create(_scene);
            var scoreController = heroScore.getComponent(_1942enums_31.DC_COMPONENT_ID.kUIScoreController);
            var scoreManager = _gameManager.getScoreManager();
            scoreManager.suscribe("scoreChanged", "scoreUI", scoreController.onScoreChanged, scoreController);
            this._m_heroScore = heroScore;
            this._m_heroHealth = heroHealth;
            return;
        };
        UIManager.prototype.reset = function (_scene, _gameManager) {
            if (this._m_heroHealth == null) {
                this._m_heroHealth = fcUIHealth_1.FcUIHealth.Create(_scene);
            }
            this._m_heroHealth.sendMessage(_1942enums_31.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(20, 20));
            if (this._m_heroScore == null) {
                this._m_heroScore = fcUIScore_1.FcUIScore.Create(_scene);
            }
            this._m_heroScore.sendMessage(_1942enums_31.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(600, 20));
            return;
        };
        UIManager.prototype.update = function (_dt) {
            this._m_heroHealth.update();
            this._m_heroScore.update();
            return;
        };
        return UIManager;
    }());
    exports.UIManager = UIManager;
});
define("test/pilot/src/ts_src/scenes/test", ["require", "exports", "game/src/ts_src/states/nullState", "game/src/ts_src/gameManager/gameManager", "game/src/ts_src/bulletManager/bulletManager", "game/src/ts_src/bulletManager/bulletSpawner/heroBasicBulletSpawner", "game/src/ts_src/bulletManager/bulletSpawner/enemyBasicBulletSpawner", "game/src/ts_src/enemiesManager/enemiesManager", "game/src/ts_src/enemiesManager/enemySpawner/erranteSpawner", "game/src/ts_src/uiManager/UIManager", "game/src/ts_src/scoreManager/scoreManager"], function (require, exports, nullState_2, gameManager_4, bulletManager_1, heroBasicBulletSpawner_1, enemyBasicBulletSpawner_1, enemiesManager_1, erranteSpawner_1, UIManager_1, scoreManager_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Test = void 0;
    var Test = (function (_super) {
        __extends(Test, _super);
        function Test() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Test.prototype.preload = function () {
            this.load.path = "../assets/";
            this.load.atlas("DragonFlight", "atlas/DragonFlight.png", "atlas/DragonFlight.js");
            this.load.glsl({
                key: 'terrain_painter_01',
                shaderType: 'fragment',
                url: 'shaders/terrain_painter_02.frag'
            });
            this.load.animation("dragon_anim", "animations/DragonFlight.json");
            this.load.image('colorTerrainTexture', 'images/terrain_01.png');
            this.load.image('perlinTexture', 'images/perlin_256_01.png');
            this.load.image('waterNormalMap', 'images/water_normal.png');
            this.load.image('fireball', 'images/fireball.png');
            this.load.image('enemy', 'images/enemy.png');
            this.load.tilemapTiledJSON('map_pilot', 'levels/tlevel_pilot_001.json');
            this.load.text('cnf_hero', 'configFiles/cnf_hero_001.json');
            this.load.text('cnf_bulletManager_hero', 'configFiles/cnf_bulletManager_001.json');
            this.load.text('cnf_bulletManager_enemies', 'configFiles/cnf_bulletManager_002.json');
            this.load.text('cnf_spawner_errante', 'configFiles/cnf_spawner_errante_001.json');
            this.load.text('cnf_ambient', 'configFiles/cnf_ambient_001.json');
            this.load.text('cnf_pilot', 'configFiles/cnf_level_001.json');
            this.load.text('cnf_pilot_scene', 'configFiles/cnf_scene_001.json');
            this.load.text('cnf_scoreManager', 'configFiles/cnf_scoreManager_001.json');
            return;
        };
        Test.prototype.create = function () {
            nullState_2.NullState.Prepare();
            gameManager_4.GameManager.Prepare();
            var gameManager = gameManager_4.GameManager.GetInstance();
            var sceneConfig = JSON.parse(this.game.cache.text.get('cnf_pilot_scene'));
            gameManager.setCameraSpeed(sceneConfig.camera_speed);
            var scoreManager = scoreManager_2.ScoreManager.Create();
            var scoreManagerConfig = JSON.parse(this.game.cache.text.get('cnf_scoreManager'));
            scoreManager.init(this, scoreManagerConfig);
            gameManager.setScoreManager(scoreManager);
            var ambientGenConfig = JSON.parse(this.game.cache.text.get('cnf_ambient'));
            gameManager.initAmbientGenerator(this, ambientGenConfig);
            var levelGenConfig = JSON.parse(this.game.cache.text.get('cnf_pilot'));
            gameManager.initLevelGenerator(this, levelGenConfig);
            var canvas = this.game.canvas;
            var cnfEnemiesBulletMng = JSON.parse(this.game.cache.text.get('cnf_bulletManager_enemies'));
            var enim_bulletManager = bulletManager_1.BulletManager.Create();
            var enim_padding = cnfEnemiesBulletMng.playzone_padding;
            enim_bulletManager.init(this, cnfEnemiesBulletMng.pool_size, cnfEnemiesBulletMng.texture_key, new Phaser.Geom.Point(-enim_padding, -enim_padding), new Phaser.Geom.Point(canvas.width + enim_padding, canvas.height + enim_padding));
            var enemyBulletSpawner = enemyBasicBulletSpawner_1.EnemyBasicBulletSpawner.Create();
            enim_bulletManager.addSpawner(enemyBulletSpawner);
            var enemiesManager = enemiesManager_1.EnemiesManager.Create();
            var enemiesManagerConfig = JSON.parse(this.game.cache.text.get('cnf_spawner_errante'));
            enemiesManager.init(this, enemiesManagerConfig);
            enemiesManager.setBulletManager(enim_bulletManager);
            gameManager.setEnemiesManager(enemiesManager);
            var erranteSpawner = erranteSpawner_1.ErranteSpawner.Create();
            enemiesManager.addSpawner(erranteSpawner);
            var cnfBulletMng = JSON.parse(this.game.cache.text.get('cnf_bulletManager_hero'));
            var bulletMng = bulletManager_1.BulletManager.Create();
            var padding = cnfBulletMng.playzone_padding;
            bulletMng.init(this, cnfBulletMng.pool_size, cnfBulletMng.texture_key, new Phaser.Geom.Point(-padding, -padding), new Phaser.Geom.Point(canvas.width + padding, canvas.height + padding));
            var heroBulletSpawner = heroBasicBulletSpawner_1.HeroBasicBulletSpawner.Create(new Phaser.Math.Vector2(0.0, -1.0), 1200);
            bulletMng.addSpawner(heroBulletSpawner);
            var heroConfig = JSON.parse(this.game.cache.text.get('cnf_hero'));
            heroConfig.x = this.game.canvas.width * 0.5;
            heroConfig.y = this.game.canvas.height * 0.5;
            gameManager.initHero(this, heroConfig);
            var playercontroller = gameManager.getPlayerController();
            playercontroller.setBulletManager(bulletMng);
            var heroController = gameManager.getPlayerController();
            var hero = heroController.getPlayer();
            enim_bulletManager.collisionVsSprite(this, hero.getWrappedInstance());
            bulletMng.collisionVsGroup(this, enemiesManager.getBodiesGroup());
            this._m_gameManager = gameManager;
            var uiManager = new UIManager_1.UIManager();
            uiManager.init(this, gameManager);
            this._m_gameManager.setUIManager(uiManager);
            this._m_gameManager.reset(this);
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
define("test/pilot/src/ts_src/game_init", ["require", "exports", "phaser3-nineslice", "test/pilot/src/ts_src/scenes/test"], function (require, exports, phaser3_nineslice_1, test_1) {
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
            this.m_game.scene.add('test', test_1.Test);
            this.m_game.scene.start('test');
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
define("game/src/ts_src/components/cmpTargetController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_32) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpTargetController = void 0;
    var CmpTargetController = (function () {
        function CmpTargetController() {
        }
        CmpTargetController.Create = function () {
            var controller = new CmpTargetController();
            controller.m_id = _1942enums_32.DC_COMPONENT_ID.kCollisionController;
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
//# sourceMappingURL=test_pilot.js.map