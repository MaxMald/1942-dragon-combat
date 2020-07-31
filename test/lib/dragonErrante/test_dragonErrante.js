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
            var index = 0;
            var components = this._m_components;
            var length = components.length;
            while (index < length) {
                components[index].update(this);
                ++index;
            }
            return;
        };
        BaseActor.prototype.sendMessage = function (_id, _obj) {
            var index = 0;
            var components = this._m_components;
            var length = components.length;
            while (index < length) {
                components[index].receive(_id, _obj);
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
            throw new Error("Component of index : "
                + _id.toString()
                + " not founded");
        };
        BaseActor.prototype.removeComponent = function (_id) {
            var index = 0;
            var length = this._m_components.length;
            while (index < length) {
                if (this._m_components[index].m_id == _id) {
                    this._m_components.splice(index, 1);
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
        return BaseActor;
    }());
    exports.BaseActor = BaseActor;
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
define("game/src/ts_src/messages/dcMessageID", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DC_MESSAGE_ID = void 0;
    exports.DC_MESSAGE_ID = Object.freeze({
        kAgentMove: 500,
        kPointerMoved: 501,
        kToPosition: 502,
        kPointerReleased: 503,
        kPointerPressed: 504,
        kMixedMovement: 505
    });
});
define("game/src/ts_src/components/dcComponentID", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DC_COMPONENT_ID = void 0;
    exports.DC_COMPONENT_ID = Object.freeze({
        kMovement: 0,
        kHeroInput: 1,
        kAnimation: 2,
        kHeroBulletController: 3,
        kMovementBullet: 4,
        kCollisionController: 5
    });
});
define("game/src/ts_src/components/cmpHeroInput", ["require", "exports", "game/src/ts_src/messages/dcMessageID", "game/src/ts_src/components/dcComponentID"], function (require, exports, dcMessageID_1, dcComponentID_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpHeroInput = void 0;
    var CmpHeroInput = (function () {
        function CmpHeroInput() {
        }
        CmpHeroInput.Create = function () {
            var input = new CmpHeroInput();
            input.m_id = dcComponentID_1.DC_COMPONENT_ID.kHeroInput;
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
                    _actor.sendMessage(dcMessageID_1.DC_MESSAGE_ID.kPointerPressed, pointer);
                }
                else {
                    this._m_movement_fn.call(this, _actor);
                }
            }
            else {
                if (this._m_pointerDown) {
                    this._m_pointerDown = !this._m_pointerDown;
                    _actor.sendMessage(dcMessageID_1.DC_MESSAGE_ID.kPointerReleased, pointer);
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
            _actor.sendMessage(dcMessageID_1.DC_MESSAGE_ID.kAgentMove, this._m_v3);
            return;
        };
        CmpHeroInput.prototype._relativeMovement = function (_actor) {
            var pointer = this._m_pointer;
            this._m_v3.x = this._m_downPosition.x + (pointer.position.x - pointer.downX);
            this._m_v3.y = this._m_downPosition.y + (pointer.position.y - pointer.downY);
            _actor.sendMessage(dcMessageID_1.DC_MESSAGE_ID.kToPosition, this._m_v3);
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
            _actor.sendMessage(dcMessageID_1.DC_MESSAGE_ID.kMixedMovement, this._m_v3);
            return;
        };
        return CmpHeroInput;
    }());
    exports.CmpHeroInput = CmpHeroInput;
});
define("game/src/ts_src/components/cmpMovement", ["require", "exports", "game/src/ts_src/messages/dcMessageID", "game/src/ts_src/components/dcComponentID"], function (require, exports, dcMessageID_2, dcComponentID_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpMovement = void 0;
    var CmpMovement = (function () {
        function CmpMovement() {
        }
        CmpMovement.Create = function () {
            var movement = new CmpMovement();
            movement.m_id = dcComponentID_2.DC_COMPONENT_ID.kMovement;
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
                case dcMessageID_2.DC_MESSAGE_ID.kPointerMoved:
                    {
                        var pointer = _obj;
                        this.setPosition(pointer.position.x, pointer.position.y);
                    }
                    return;
                case dcMessageID_2.DC_MESSAGE_ID.kAgentMove:
                    {
                        var movement = _obj;
                        var sprite = this._m_sprite;
                        this.setPosition(sprite.x + movement.x, sprite.y + movement.y);
                    }
                    return;
                case dcMessageID_2.DC_MESSAGE_ID.kAgentMove:
                    {
                        var movement = _obj;
                        var sprite = this._m_sprite;
                        this.setPosition(sprite.x + movement.x, sprite.y + movement.y);
                    }
                    return;
                case dcMessageID_2.DC_MESSAGE_ID.kToPosition:
                    {
                        var positon = _obj;
                        this.setPosition(positon.x, positon.y);
                    }
                    return;
                case dcMessageID_2.DC_MESSAGE_ID.kMixedMovement:
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
define("game/src/ts_src/components/cmpAnimation", ["require", "exports", "game/src/ts_src/states/nullState", "game/src/ts_src/components/dcComponentID"], function (require, exports, nullState_1, dcComponentID_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpAnimation = void 0;
    var CmpAnimation = (function () {
        function CmpAnimation() {
        }
        CmpAnimation.Create = function () {
            var anim = new CmpAnimation();
            anim.m_id = dcComponentID_3.DC_COMPONENT_ID.kAnimation;
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
define("game/src/ts_src/states/stateHeroFFLight", ["require", "exports", "game/src/ts_src/messages/dcMessageID"], function (require, exports, dcMessageID_3) {
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
                case dcMessageID_3.DC_MESSAGE_ID.kPointerPressed:
                    this._m_isMoving = true;
                    return;
                case dcMessageID_3.DC_MESSAGE_ID.kPointerReleased:
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
define("game/src/ts_src/components/dcAnimationID", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DC_ANIMATION_ID = void 0;
    exports.DC_ANIMATION_ID = Object.freeze({
        kForward: 0,
        kBack: 1,
        kRight: 2,
        kLeft: 3,
        kIdle: 4
    });
});
define("game/src/ts_src/states/stateHeroGlide", ["require", "exports", "game/src/ts_src/messages/dcMessageID"], function (require, exports, dcMessageID_4) {
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
                case dcMessageID_4.DC_MESSAGE_ID.kPointerPressed:
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
define("game/src/ts_src/bulletManager/iBulletManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/bulletManager/nullBulletManager", ["require", "exports", "optimization/mxObjectPool"], function (require, exports, mxObjectPool_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullBulletManager = void 0;
    var NullBulletManager = (function () {
        function NullBulletManager() {
            this._m_pool = mxObjectPool_1.MxObjectPool.Create();
            this._m_pool.init(new Array());
            return;
        }
        NullBulletManager.prototype.update = function (_dt) { };
        NullBulletManager.prototype.spawn = function (_x, _y) {
            console.log("NullBulletManager : spawn.");
            return;
        };
        ;
        NullBulletManager.prototype.getPool = function () {
            console.log("NullBulletManager : get pool.");
            return this._m_pool;
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
define("game/src/ts_src/commons/1942types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/enemiesManager/iEnemiesManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/enemiesManager/nullEnemiesManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullEnemiesManager = void 0;
    var NullEnemiesManager = (function () {
        function NullEnemiesManager() {
        }
        NullEnemiesManager.prototype.getActor = function () {
            console.log("NullEnemiesManager : getActor. ");
            return null;
        };
        NullEnemiesManager.prototype.update = function (_dt) {
            console.log("NullEnemiesManager : update. ");
            return;
        };
        NullEnemiesManager.prototype.spawn = function (_x, _y, _type) {
            console.log("NullEnemiesManager : spawn. ");
            return;
        };
        NullEnemiesManager.prototype.destroy = function () {
            return;
        };
        return NullEnemiesManager;
    }());
    exports.NullEnemiesManager = NullEnemiesManager;
});
define("game/src/ts_src/gameManager/gameManager", ["require", "exports", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/enemiesManager/nullEnemiesManager"], function (require, exports, nullBulletManager_1, nullEnemiesManager_1) {
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
        GameManager.prototype.update = function (_dt) {
            this.m_dt = _dt;
            this._m_bulletManager.update(_dt);
            return;
        };
        GameManager.prototype.setBulletManager = function (_bulletManager) {
            if (this._m_bulletManager != null) {
                this._m_bulletManager.destroy();
            }
            this._m_bulletManager = _bulletManager;
            return;
        };
        GameManager.prototype.getBulletManager = function () {
            return this._m_bulletManager;
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
        GameManager.prototype.destroy = function () {
            this._m_bulletManager.destroy();
            this._m_playerController.destroy();
            this._m_enemiesManager.destroy();
            return;
        };
        GameManager.prototype._onPrepare = function () {
            this.m_dt = 0.0;
            this._m_bulletManager = new nullBulletManager_1.NullBulletManager();
            this._m_enemiesManager = new nullEnemiesManager_1.NullEnemiesManager();
            return;
        };
        GameManager.prototype._onShutdown = function () {
            if (this._m_bulletManager != null) {
                this._m_bulletManager.destroy();
            }
            return;
        };
        return GameManager;
    }());
    exports.GameManager = GameManager;
});
define("game/src/ts_src/components/cmpHeroBulletController", ["require", "exports", "game/src/ts_src/gameManager/gameManager", "game/src/ts_src/components/dcComponentID"], function (require, exports, gameManager_1, dcComponentID_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpHeroBulletController = void 0;
    var CmpHeroBulletController = (function () {
        function CmpHeroBulletController() {
        }
        CmpHeroBulletController.Create = function (_bulletManager) {
            var bulletController = new CmpHeroBulletController();
            bulletController.m_id = dcComponentID_4.DC_COMPONENT_ID.kHeroBulletController;
            bulletController._m_bulletManager = _bulletManager;
            return bulletController;
        };
        CmpHeroBulletController.prototype.init = function (_actor) {
            this._m_gameManager = gameManager_1.GameManager.GetInstance();
            this._m_loadingTime = 0.0;
            return;
        };
        CmpHeroBulletController.prototype.update = function (_actor) {
            var loading = this._m_loadingTime;
            loading += this._m_gameManager.m_dt;
            if (loading >= this._m_frecuency) {
                var sprite = _actor.getWrappedInstance();
                this._m_bulletManager.spawn(sprite.x, sprite.y - 110.0);
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
define("game/src/ts_src/playerController/playerController", ["require", "exports", "game/src/ts_src/actors/baseActor", "game/src/ts_src/components/cmpHeroInput", "game/src/ts_src/components/dcComponentID", "game/src/ts_src/components/cmpMovement", "game/src/ts_src/components/cmpAnimation", "game/src/ts_src/states/stateHeroFFLight", "game/src/ts_src/states/stateHeroGlide", "game/src/ts_src/components/cmpHeroBulletController", "game/src/ts_src/gameManager/gameManager"], function (require, exports, baseActor_1, cmpHeroInput_1, dcComponentID_5, cmpMovement_1, cmpAnimation_1, stateHeroFFLight_1, stateHeroGlide_1, cmpHeroBulletController_1, gameManager_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlayerController = void 0;
    var PlayerController = (function () {
        function PlayerController() {
        }
        PlayerController.prototype.init = function (_scene, _activePointer, _config) {
            var heroSprite = _scene.physics.add.sprite(_scene.game.canvas.width * 0.5, _scene.game.canvas.height * 0.5, 'DragonFlight', 0);
            var bulletManager = gameManager_2.GameManager.GetInstance().getBulletManager();
            var hero = baseActor_1.BaseActor.Create(heroSprite, "hero");
            hero.addComponent(cmpHeroInput_1.CmpHeroInput.Create());
            hero.addComponent(cmpMovement_1.CmpMovement.Create());
            hero.addComponent(cmpAnimation_1.CmpAnimation.Create());
            hero.addComponent(cmpHeroBulletController_1.CmpHeroBulletController.Create(bulletManager));
            this.setPlayer(hero);
            if (_activePointer !== undefined) {
                this.setPointer(_activePointer);
            }
            else {
                if (_scene.game.device.input.touch) {
                    if (_scene.input.pointer1 === undefined) {
                        _scene.input.addPointer();
                    }
                    this.setPointer(_scene.input.pointer1);
                }
                else {
                    this.setPointer(_scene.input.activePointer);
                }
            }
            if (_config !== undefined) {
                this.setInputMode(_config.control_type);
                this.setHeroSpeed(_config.player_speed);
                this.setMovementPadding(_config.movement_rect_p1_x, _config.movement_rect_p1_y, _config.movement_rect_p2_x, _config.movement_rect_p2_y);
                this.setHeroFireRate(_config.player_fireRate);
            }
            else {
                this.setHeroFireRate(2);
            }
            hero.init();
            var anim = hero.getComponent(dcComponentID_5.DC_COMPONENT_ID.kAnimation);
            anim.addState(new stateHeroFFLight_1.StateHeroFFlight());
            anim.addState(new stateHeroGlide_1.StateHeroGlide());
            anim.setActive('Hero_Forward_Flight');
            return;
        };
        PlayerController.prototype.setPointer = function (_pointer) {
            var input = this._m_player.getComponent(dcComponentID_5.DC_COMPONENT_ID.kHeroInput);
            input.setPointer(_pointer);
            return;
        };
        PlayerController.prototype.getPointer = function () {
            var input = this._m_player.getComponent(dcComponentID_5.DC_COMPONENT_ID.kHeroInput);
            return input.getPointer();
        };
        PlayerController.prototype.setInputMode = function (_mode) {
            var input = this._m_player.getComponent(dcComponentID_5.DC_COMPONENT_ID.kHeroInput);
            input.setMode(_mode);
            return;
        };
        PlayerController.prototype.getInputMode = function () {
            var input = this._m_player.getComponent(dcComponentID_5.DC_COMPONENT_ID.kHeroInput);
            return input.getMode();
        };
        PlayerController.prototype.setHeroSpeed = function (_speed) {
            var input = this._m_player.getComponent(dcComponentID_5.DC_COMPONENT_ID.kHeroInput);
            input.setSpeed(_speed);
            return;
        };
        PlayerController.prototype.setHeroFireRate = function (_fireRate) {
            var bulletController = this._m_player.getComponent(dcComponentID_5.DC_COMPONENT_ID.kHeroBulletController);
            bulletController.setFireRate(_fireRate);
            return;
        };
        PlayerController.prototype.getHeroFireRate = function () {
            var bulletController = this._m_player.getComponent(dcComponentID_5.DC_COMPONENT_ID.kHeroBulletController);
            return bulletController.getFireRate();
        };
        PlayerController.prototype.setMovementPadding = function (_p1_x, _p1_y, _p2_x, _p2_y) {
            var movement = this._m_player.getComponent(dcComponentID_5.DC_COMPONENT_ID.kMovement);
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
            return;
        };
        PlayerController.prototype.destroy = function () {
            this._m_player.destroy();
            return;
        };
        PlayerController.prototype.getDirection = function () {
            var movement = this._m_player.getComponent(dcComponentID_5.DC_COMPONENT_ID.kMovement);
            return movement.getDirection();
        };
        return PlayerController;
    }());
    exports.PlayerController = PlayerController;
});
define("game/src/ts_src/components/iCmpCollisionController", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/components/cmpBulletCollisionController", ["require", "exports", "game/src/ts_src/components/dcComponentID"], function (require, exports, dcComponentID_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpBulletCollisionController = void 0;
    var CmpBulletCollisionController = (function () {
        function CmpBulletCollisionController() {
        }
        CmpBulletCollisionController.Create = function () {
            var controller = new CmpBulletCollisionController();
            controller.m_id = dcComponentID_6.DC_COMPONENT_ID.kCollisionController;
            return controller;
        };
        CmpBulletCollisionController.prototype.onCollision = function (_other, _this) {
            return;
        };
        CmpBulletCollisionController.prototype.init = function (_actor) {
            return;
        };
        CmpBulletCollisionController.prototype.update = function (_actor) {
            return;
        };
        CmpBulletCollisionController.prototype.receive = function (_id, _obj) {
            return;
        };
        CmpBulletCollisionController.prototype.destroy = function () {
            return;
        };
        return CmpBulletCollisionController;
    }());
    exports.CmpBulletCollisionController = CmpBulletCollisionController;
});
define("game/src/ts_src/components/cmpMovementBullet", ["require", "exports", "game/src/ts_src/messages/dcMessageID", "game/src/ts_src/components/dcComponentID"], function (require, exports, dcMessageID_5, dcComponentID_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpMovementBullet = void 0;
    var CmpMovementBullet = (function () {
        function CmpMovementBullet() {
        }
        CmpMovementBullet.Create = function () {
            var movement = new CmpMovementBullet();
            movement.m_id = dcComponentID_7.DC_COMPONENT_ID.kMovementBullet;
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
                case dcMessageID_5.DC_MESSAGE_ID.kAgentMove:
                    {
                        var movement = _obj;
                        this.move(movement.x, movement.y);
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
define("game/src/ts_src/bulletManager/bulletManager", ["require", "exports", "optimization/mxObjectPool", "game/src/ts_src/actors/baseActor", "game/src/ts_src/components/cmpBulletCollisionController", "game/src/ts_src/components/cmpMovementBullet", "game/src/ts_src/components/dcComponentID", "game/src/ts_src/messages/dcMessageID"], function (require, exports, mxObjectPool_2, baseActor_2, cmpBulletCollisionController_1, cmpMovementBullet_1, dcComponentID_8, dcMessageID_6) {
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
            bulletMng._m_v3 = new Phaser.Math.Vector3();
            bulletMng._m_playZone_p1 = new Phaser.Geom.Point();
            bulletMng._m_playZone_p2 = new Phaser.Geom.Point();
            bulletMng._m_dt = 0.0;
            bulletMng._m_bulletSpeed = 50.0;
            return bulletMng;
        };
        BulletManager.prototype.init = function (_scene, _config) {
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
            var size = _config.size;
            var bullet;
            var a_bullets = new Array();
            var sprite;
            while (size > 0) {
                sprite = bodiesGroup.create(0.0, 0.0, 'fireball');
                sprite.active = false;
                sprite.visible = false;
                bullet = baseActor_2.BaseActor.Create(sprite, "Bullet_" + size.toString());
                sprite.setData('actor', bullet);
                bullet.addComponent(cmpMovementBullet_1.CmpMovementBullet.Create());
                bullet.addComponent(cmpBulletCollisionController_1.CmpBulletCollisionController.Create());
                bullet.init();
                a_bullets.push(bullet);
                --size;
            }
            this._m_pool.init(a_bullets);
            this._m_playZone_p1.setTo(-_config.playZone_padding, -_config.playZone_padding);
            this._m_playZone_p2.setTo(_scene.game.canvas.width + _config.playZone_padding, _scene.game.canvas.height + _config.playZone_padding);
            this._m_bulletSpeed = _config.speed;
            return;
        };
        BulletManager.prototype.update = function (_dt) {
            this._m_dt = _dt;
            this._m_v3.y = -_dt * this._m_bulletSpeed;
            this._m_pool.forEachActive(this._updateBullet, this);
            return;
        };
        BulletManager.prototype.getBulletSpeed = function () {
            return this._m_bulletSpeed;
        };
        BulletManager.prototype.spawn = function (_x, _y) {
            var bullet = this._m_pool.get();
            if (bullet !== null) {
                var sprite = bullet.getWrappedInstance();
                sprite.x = _x;
                sprite.y = _y;
            }
            return;
        };
        BulletManager.prototype.getPool = function () {
            return this._m_pool;
        };
        BulletManager.prototype.clear = function () {
            var pool = this._m_pool;
            pool.forEach(function (_bullet) {
                _bullet.destroy();
                return;
            });
            this._m_pool.clear();
            return;
        };
        BulletManager.prototype.getBodiesGroup = function () {
            return this._m_bodiesGroup;
        };
        BulletManager.prototype.collisionVsGroup = function (_scene, _bodies) {
            _scene.physics.add.collider(_bodies, this._m_bodiesGroup, this._onCollision, undefined, this);
        };
        BulletManager.prototype.destroy = function () {
            this._m_pool.destroy();
            this._m_bodiesGroup.destroy();
            return;
        };
        BulletManager.prototype._onCollision = function (_other, _bullet) {
            var bulletActor = _bullet.getData("actor");
            var bulletController = bulletActor.getComponent(dcComponentID_8.DC_COMPONENT_ID.kCollisionController);
            var otherActor = _other.getData('actor');
            bulletController.onCollision(otherActor, bulletActor);
            var otherController = otherActor.getComponent(dcComponentID_8.DC_COMPONENT_ID.kCollisionController);
            otherController.onCollision(bulletActor, otherActor);
            this._m_pool.desactive(bulletActor);
            return;
        };
        BulletManager.prototype._updateBullet = function (_bullet) {
            _bullet.sendMessage(dcMessageID_6.DC_MESSAGE_ID.kAgentMove, this._m_v3);
            var sprite = _bullet.getWrappedInstance();
            if (!this._isPlayzone(sprite.x, sprite.y)) {
                this._m_pool.desactive(_bullet);
            }
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
        BulletManager.prototype._isPlayzone = function (_x, _y) {
            var p1 = this._m_playZone_p1;
            var p2 = this._m_playZone_p2;
            return (_y > p1.y && _y < p2.y);
        };
        return BulletManager;
    }());
    exports.BulletManager = BulletManager;
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
define("game/src/ts_src/enemiesManager/enemiesManager", ["require", "exports", "optimization/mxObjectPool", "game/src/ts_src/actors/baseActor", "game/src/ts_src/components/dcComponentID"], function (require, exports, mxObjectPool_3, baseActor_3, dcComponentID_9) {
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
            return manager;
        };
        EnemiesManager.prototype.init = function (_scene, _config) {
            var bodiesGroup = this._m_bodiesGroup;
            if (bodiesGroup != null) {
                bodiesGroup.destroy();
            }
            bodiesGroup = _scene.physics.add.group();
            this._m_bodiesGroup = bodiesGroup;
            var actorPool = this._m_actorPool;
            actorPool.clear();
            var size = _config.pool_size;
            var actor;
            var sprite;
            var a_actors = new Array();
            while (size > 0) {
                sprite = bodiesGroup.create(0.0, 0.0, _config.texture_key);
                sprite.visible = false;
                sprite.active = false;
                actor = baseActor_3.BaseActor.Create(sprite, "Enemy_" + size.toString());
                a_actors.push(actor);
                sprite.setData('actor', actor);
                --size;
            }
            actorPool.init(a_actors);
            return;
        };
        EnemiesManager.prototype.update = function (_dt) {
            return;
        };
        EnemiesManager.prototype.spawn = function (_x, _y, _type) {
            return;
        };
        EnemiesManager.prototype.getActor = function () {
            return this._m_actorPool.get();
        };
        EnemiesManager.prototype.getBodiesGroup = function () {
            return this._m_bodiesGroup;
        };
        EnemiesManager.prototype.collisionVsGroup = function (_scene, _bodies) {
            _scene.physics.add.collider(_bodies, this._m_bodiesGroup, this._onCollision, undefined, this);
            return;
        };
        EnemiesManager.prototype.destroy = function () {
            this._m_bodiesGroup.destroy();
            this._m_actorPool.destroy();
            return;
        };
        EnemiesManager.prototype._onCollision = function (_other, _sprite) {
            var baseActor = _sprite.getData("actor");
            var controller = baseActor.getComponent(dcComponentID_9.DC_COMPONENT_ID.kCollisionController);
            controller.onCollision(baseActor, _other.getData('actor'));
            console.log("Collision!");
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
define("game/src/ts_src/components/cmpTargetController", ["require", "exports", "game/src/ts_src/components/dcComponentID"], function (require, exports, dcComponentID_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpTargetController = void 0;
    var CmpTargetController = (function () {
        function CmpTargetController() {
        }
        CmpTargetController.Create = function () {
            var controller = new CmpTargetController();
            controller.m_id = dcComponentID_10.DC_COMPONENT_ID.kCollisionController;
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
define("test/dragonErrante/src/ts_src/scenes/test", ["require", "exports", "game/src/ts_src/playerController/playerController", "game/src/ts_src/states/nullState", "game/src/ts_src/bulletManager/bulletManager", "game/src/ts_src/gameManager/gameManager", "game/src/ts_src/enemiesManager/enemiesManager", "game/src/ts_src/components/dcComponentID", "game/src/ts_src/enemiesManager/enemiesManagerConfig", "game/src/ts_src/components/cmpTargetController"], function (require, exports, playerController_1, nullState_2, bulletManager_1, gameManager_3, enemiesManager_1, dcComponentID_11, enemiesManagerConfig_1, cmpTargetController_1) {
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
            this.load.animation("dragon_anim", "animations/DragonFlight.json");
            this.load.text('playerControllerConfig', 'configFiles/playerControllerConfig.json');
            this.load.text('bulletManagerConfig', 'configFiles/bulletManagerConfig.json');
            this.load.image('target', 'images/target.png');
            this.load.image('fireball', 'images/fireball.png');
            return;
        };
        Test.prototype.create = function () {
            nullState_2.NullState.Prepare();
            this._m_canvas_size
                = new Phaser.Geom.Point(this.game.canvas.width, this.game.canvas.height);
            this._m_graph_box = this.add.graphics({ lineStyle: { width: 2, color: 0xaa0000 }, fillStyle: { color: 0x000000 } });
            this._m_graph_green = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { color: 0x00ff00 } });
            this._m_graph_red = this.add.graphics({ lineStyle: { width: 4, color: 0xff0000 }, fillStyle: { color: 0xff0000 } });
            this._m_rect_box = new Phaser.Geom.Rectangle(0, 1500, this._m_canvas_size.x, this._m_canvas_size.y - 1500);
            this._m_pool_data = this.add.text(50, 1520, '', { fontFamily: 'Arial', fontSize: 20, color: '#00ff00' });
            this._m_heroBulletCntrl_data = this.add.text(300, 1520, '', { fontFamily: 'Arial', fontSize: 20, color: '#00ff00' });
            gameManager_3.GameManager.Prepare();
            var gameManager = gameManager_3.GameManager.GetInstance();
            var bulletManager = bulletManager_1.BulletManager.Create();
            var bmConfig = JSON.parse(this.cache.text.get('bulletManagerConfig'));
            bulletManager.init(this, bmConfig);
            this._m_bulletManager = bulletManager;
            gameManager.setBulletManager(bulletManager);
            var enemiesManager = enemiesManager_1.EnemiesManager.Create();
            var enemiesManagerConfig = new enemiesManagerConfig_1.EnemiesManagerConfig();
            enemiesManagerConfig.pool_size = 3;
            enemiesManagerConfig.texture_key = "target";
            enemiesManager.init(this, enemiesManagerConfig);
            gameManager.setEnemiesManager(enemiesManager);
            bulletManager.collisionVsGroup(this, enemiesManager.getBodiesGroup());
            var target_size = 3;
            var off = this._m_canvas_size.x * 0.25;
            var actor;
            var sprite;
            while (target_size > 0) {
                actor = enemiesManager.getActor();
                if (actor != null) {
                    actor.addComponent(cmpTargetController_1.CmpTargetController.Create());
                    actor.init();
                    sprite = actor.getWrappedInstance();
                    sprite.x = off * target_size;
                    sprite.y = 200.0;
                }
                --target_size;
            }
            var pcConfig = JSON.parse(this.cache.text.get('playerControllerConfig'));
            var padding = 100;
            pcConfig.movement_rect_p1_x = padding;
            pcConfig.movement_rect_p1_y = padding;
            pcConfig.movement_rect_p2_x = this._m_canvas_size.x - padding;
            pcConfig.movement_rect_p2_y = this._m_canvas_size.y - padding;
            var heroController = new playerController_1.PlayerController();
            heroController.init(this, undefined, pcConfig);
            this._m_heroController = heroController;
            gameManager.setPlayerController(heroController);
            return;
        };
        Test.prototype.update = function (_time, _delta) {
            var dt = _delta * 0.001;
            gameManager_3.GameManager.GetInstance().update(dt);
            this._m_heroController.update(dt);
            this.debugGraphics();
            var pointer = this._m_heroController.getPointer();
            pointer.prevPosition.x = pointer.position.x;
            pointer.prevPosition.y = pointer.position.y;
            return;
        };
        Test.prototype.debugGraphics = function () {
            this._m_graph_green.clear();
            this._m_graph_red.clear();
            this._m_graph_box.clear();
            this._m_graph_box.fillRectShape(this._m_rect_box);
            var bulletManager = this._m_bulletManager;
            var pool = this._m_bulletManager.getPool();
            this._m_pool_data.text
                = "-- Hero Bullet Mng --\n"
                    + "\n Bullet speed : " + bulletManager.getBulletSpeed() + " px./s.\n"
                    + "\n** Pool **\n"
                    + "\nSize : " + pool.getSize().toString()
                    + "\nActive : " + pool.getActiveSize().toString()
                    + "\nDesactive : " + pool.getDesactiveSize().toString();
            var hero = this._m_heroController.getPlayer();
            var heroBulletCntrl = hero.getComponent(dcComponentID_11.DC_COMPONENT_ID.kHeroBulletController);
            this._m_heroBulletCntrl_data.text
                = "-- Hero Bullet Controller --\n"
                    + "\n Fire rate : " + (1.0 / heroBulletCntrl.getFireRate()).toString() + " bullets/s.";
            return;
        };
        Test.prototype.debugDirection = function (_x, _y, _radius, _direction) {
            this._m_graph_green.strokeCircle(_x, _y, _radius);
            this._m_graph_red.strokeLineShape(new Phaser.Geom.Line(_x, _y, _x + _direction.x * _radius, _y + _direction.y * _radius));
            return;
        };
        Test.prototype._createButton = function (_x, _y, _label, _fn, _context) {
            MxTools.UI.MxButtonTinted.Create(this, _x, _y, 'button', 0, _fn, _context, 0xffffff, 0xb3b3b3, 0x000000, 0xffffff);
            var text = this.add.text(_x - 20, _y - 20, _label, { fontFamily: 'Arial', fontSize: 30, color: '#000000' });
            text.setAlign('center');
            return;
        };
        return Test;
    }(Phaser.Scene));
    exports.Test = Test;
});
define("test/dragonErrante/src/ts_src/game_init", ["require", "exports", "phaser3-nineslice", "test/dragonErrante/src/ts_src/scenes/test"], function (require, exports, phaser3_nineslice_1, test_1) {
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
//# sourceMappingURL=test_dragonErrante.js.map