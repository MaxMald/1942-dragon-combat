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
define("game/src/ts_src/commands/iCommand", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
        kEnemyController: 11
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
        kKill: 507
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
define("game/src/ts_src/messages/actorMessage", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageManager = exports.ActorMessage = void 0;
    var ActorMessage = (function () {
        function ActorMessage() {
        }
        return ActorMessage;
    }());
    exports.ActorMessage = ActorMessage;
    var MessageManager = (function () {
        function MessageManager() {
        }
        MessageManager.Prepare = function () {
            if (MessageManager._INSTANCE == null) {
                MessageManager._INSTANCE = new MessageManager();
                MessageManager._INSTANCE.onPrepare();
            }
            return;
        };
        MessageManager.Shutdown = function () {
            if (MessageManager._INSTANCE != null) {
                MessageManager._INSTANCE.onShutdown();
                MessageManager._INSTANCE = null;
            }
            return;
        };
        MessageManager.GetMessage = function () {
            var singleton = MessageManager._INSTANCE;
            var pool = singleton.m_pool;
            var poolSize = pool.length;
            var index = singleton.m_index;
            var step = 0;
            var msg;
            while (step < poolSize) {
                msg = pool[index % poolSize];
                if (msg.m_id == _1942enums_1.DC_MESSAGE_ID.kUndefined) {
                    singleton.m_index = ++index;
                    return msg;
                }
                ++index;
                ++step;
            }
            msg = new ActorMessage();
            MessageManager.desactiveMessage(msg);
            pool.push(msg);
            singleton.m_index = index;
            console.log("Created new message");
            return msg;
        };
        MessageManager.desactiveMessage = function (_message) {
            _message.m_obj = null;
            _message.m_id = _1942enums_1.DC_MESSAGE_ID.kUndefined;
            return;
        };
        MessageManager.prototype.onPrepare = function () {
            this.m_pool = new Array();
            var index = 0;
            var msg;
            var pool = this.m_pool;
            while (index < 50) {
                ++index;
                msg = new ActorMessage();
                MessageManager.desactiveMessage(msg);
                pool.push(msg);
            }
            this.m_index = 0;
            return;
        };
        MessageManager.prototype.onShutdown = function () {
            var pool = this.m_pool;
            while (pool.length) {
                pool.pop();
            }
            return;
        };
        return MessageManager;
    }());
    exports.MessageManager = MessageManager;
});
define("game/src/ts_src/actors/baseActor", ["require", "exports", "game/src/ts_src/messages/actorMessage"], function (require, exports, actorMessage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaseActor = void 0;
    var BaseActor = (function () {
        function BaseActor() {
        }
        BaseActor.Create = function (_instance, _name) {
            var actor = new BaseActor();
            actor._m_components = new Array();
            actor._m_aPostCommands = new Array();
            actor._m_aMessage = new Array();
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
            this._dispatchMessage();
            this._execPostCommands();
            return;
        };
        BaseActor.prototype.sendMessage = function (_id, _obj) {
            var message = actorMessage_1.MessageManager.GetMessage();
            message.m_id = _id;
            message.m_obj = _obj;
            this._m_aMessage.push(message);
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
        BaseActor.prototype.addPostCommand = function (command) {
            this._m_aPostCommands.push(command);
            return;
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
        BaseActor.prototype._dispatchMessage = function () {
            if (this._m_aMessage.length) {
                var message = void 0;
                var messageList = this._m_aMessage;
                var componentList = this._m_components;
                var componentSize = 0;
                var componentIndex = 0;
                while (messageList.length) {
                    message = messageList.pop();
                    componentIndex = 0;
                    componentSize = componentList.length;
                    while (componentIndex < componentSize) {
                        componentList[componentIndex].receive(message.m_id, message.m_obj);
                        ++componentIndex;
                    }
                    ;
                    actorMessage_1.MessageManager.desactiveMessage(message);
                }
            }
            return;
        };
        BaseActor.prototype._execPostCommands = function () {
            var aCommands = this._m_aPostCommands;
            var command;
            while (aCommands.length) {
                command = aCommands.pop();
                command.exec();
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
define("game/src/ts_src/components/cmpHeroInput", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpHeroInput = void 0;
    var CmpHeroInput = (function () {
        function CmpHeroInput() {
        }
        CmpHeroInput.Create = function () {
            var input = new CmpHeroInput();
            input.m_id = _1942enums_2.DC_COMPONENT_ID.kHeroInput;
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
                    _actor.sendMessage(_1942enums_2.DC_MESSAGE_ID.kPointerPressed, pointer);
                }
                else {
                    this._m_movement_fn.call(this, _actor);
                }
            }
            else {
                if (this._m_pointerDown) {
                    this._m_pointerDown = !this._m_pointerDown;
                    _actor.sendMessage(_1942enums_2.DC_MESSAGE_ID.kPointerReleased, pointer);
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
            _actor.sendMessage(_1942enums_2.DC_MESSAGE_ID.kAgentMove, this._m_v3);
            return;
        };
        CmpHeroInput.prototype._relativeMovement = function (_actor) {
            var pointer = this._m_pointer;
            this._m_v3.x = this._m_downPosition.x + (pointer.position.x - pointer.downX);
            this._m_v3.y = this._m_downPosition.y + (pointer.position.y - pointer.downY);
            _actor.sendMessage(_1942enums_2.DC_MESSAGE_ID.kToPosition, this._m_v3);
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
            _actor.sendMessage(_1942enums_2.DC_MESSAGE_ID.kMixedMovement, this._m_v3);
            return;
        };
        return CmpHeroInput;
    }());
    exports.CmpHeroInput = CmpHeroInput;
});
define("game/src/ts_src/components/cmpMovement", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpMovement = void 0;
    var CmpMovement = (function () {
        function CmpMovement() {
        }
        CmpMovement.Create = function () {
            var movement = new CmpMovement();
            movement.m_id = _1942enums_3.DC_COMPONENT_ID.kMovement;
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
                case _1942enums_3.DC_MESSAGE_ID.kPointerMoved:
                    {
                        var pointer = _obj;
                        this.setPosition(pointer.position.x, pointer.position.y);
                    }
                    return;
                case _1942enums_3.DC_MESSAGE_ID.kAgentMove:
                    {
                        var movement = _obj;
                        var sprite = this._m_sprite;
                        this.setPosition(sprite.x + movement.x, sprite.y + movement.y);
                    }
                    return;
                case _1942enums_3.DC_MESSAGE_ID.kAgentMove:
                    {
                        var movement = _obj;
                        var sprite = this._m_sprite;
                        this.setPosition(sprite.x + movement.x, sprite.y + movement.y);
                    }
                    return;
                case _1942enums_3.DC_MESSAGE_ID.kToPosition:
                    {
                        var positon = _obj;
                        this.setPosition(positon.x, positon.y);
                    }
                    return;
                case _1942enums_3.DC_MESSAGE_ID.kMixedMovement:
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
define("game/src/ts_src/components/cmpAnimation", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/states/nullState"], function (require, exports, _1942enums_4, nullState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpAnimation = void 0;
    var CmpAnimation = (function () {
        function CmpAnimation() {
        }
        CmpAnimation.Create = function () {
            var anim = new CmpAnimation();
            anim.m_id = _1942enums_4.DC_COMPONENT_ID.kAnimation;
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
define("game/src/ts_src/states/stateHeroFFLight", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_5) {
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
                case _1942enums_5.DC_MESSAGE_ID.kPointerPressed:
                    this._m_isMoving = true;
                    return;
                case _1942enums_5.DC_MESSAGE_ID.kPointerReleased:
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
define("game/src/ts_src/states/stateHeroGlide", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_6) {
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
                case _1942enums_6.DC_MESSAGE_ID.kPointerPressed:
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
define("game/src/ts_src/bulletManager/bulletSpawner/nullBulletSpawner", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_7) {
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
            return _1942enums_7.DC_BULLET_TYPE.kUndefined;
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
define("game/src/ts_src/components/iCmpCollisionController", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("game/src/ts_src/components/cmpNullCollisionController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_8) {
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
                    = _1942enums_8.DC_COMPONENT_ID.kCollisionController;
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
            console.log("NullEnemiesManager : update. ");
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
define("game/src/ts_src/enemiesManager/enemySpawner/nullEnemySpawner", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/enemiesManager/nullEnemiesManager"], function (require, exports, _1942enums_9, nullEnemiesManager_1) {
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
        NullEnemySpawner.prototype.getID = function () {
            return _1942enums_9.DC_ENEMY_TYPE.kUndefined;
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
define("game/src/ts_src/components/cmpNullEnemyController", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/enemiesManager/enemySpawner/nullEnemySpawner", "game/src/ts_src/enemiesManager/nullEnemiesManager"], function (require, exports, _1942enums_10, nullEnemySpawner_2, nullEnemiesManager_2) {
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
                    = _1942enums_10.DC_COMPONENT_ID.kEnemyController;
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
        CmpNullEnemyController.prototype.receive = function (_id, _obj) { };
        CmpNullEnemyController.prototype.destroy = function () { };
        return CmpNullEnemyController;
    }());
    exports.CmpNullEnemyController = CmpNullEnemyController;
});
define("game/src/ts_src/gameManager/gameManager", ["require", "exports", "game/src/ts_src/bulletManager/bulletSpawner/nullBulletSpawner", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/components/cmpNullCollisionController", "game/src/ts_src/components/cmpNullEnemyController", "game/src/ts_src/enemiesManager/enemySpawner/nullEnemySpawner", "game/src/ts_src/enemiesManager/nullEnemiesManager", "game/src/ts_src/messages/actorMessage"], function (require, exports, nullBulletSpawner_2, nullBulletManager_2, cmpNullCollisionController_1, cmpNullEnemyController_1, nullEnemySpawner_3, nullEnemiesManager_3, actorMessage_2) {
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
            this._m_playerController.update(_dt);
            this._m_enemiesManager.update(_dt);
            return;
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
            this._m_enemiesManager.destroy();
            return;
        };
        GameManager.prototype._updateBulletManager = function (_bulletManager) {
            _bulletManager.update(this.m_dt);
            return;
        };
        GameManager.prototype._onPrepare = function () {
            this.m_dt = 0.0;
            actorMessage_2.MessageManager.Prepare();
            nullBulletSpawner_2.NullBulletSpawner.Prepare();
            cmpNullEnemyController_1.CmpNullEnemyController.Prepare();
            cmpNullCollisionController_1.CmpNullCollisionController.Prepare();
            nullBulletManager_2.NullBulletManager.Prepare();
            nullEnemySpawner_3.NullEnemySpawner.Prepare();
            nullEnemiesManager_3.NullEnemiesManager.Prepare();
            this._m_enemiesManager = nullEnemiesManager_3.NullEnemiesManager.GetInstance();
            ;
            return;
        };
        GameManager.prototype._onShutdown = function () {
            this.destroy();
            nullEnemiesManager_3.NullEnemiesManager.Shutdown();
            nullEnemySpawner_3.NullEnemySpawner.Shutdown();
            nullBulletManager_2.NullBulletManager.Shutdown();
            cmpNullCollisionController_1.CmpNullCollisionController.Shutdown();
            cmpNullEnemyController_1.CmpNullEnemyController.Shutdown();
            nullBulletSpawner_2.NullBulletSpawner.Shutdown();
            actorMessage_2.MessageManager.Shutdown();
            return;
        };
        return GameManager;
    }());
    exports.GameManager = GameManager;
});
define("game/src/ts_src/components/cmpHeroBulletController", ["require", "exports", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/gameManager/gameManager"], function (require, exports, nullBulletManager_3, _1942enums_11, gameManager_1) {
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
            this._m_gameManager = gameManager_1.GameManager.GetInstance();
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
define("game/src/ts_src/playerController/playerController", ["require", "exports", "game/src/ts_src/actors/baseActor", "game/src/ts_src/components/cmpHeroInput", "game/src/ts_src/components/cmpMovement", "game/src/ts_src/components/cmpAnimation", "game/src/ts_src/states/stateHeroFFLight", "game/src/ts_src/states/stateHeroGlide", "game/src/ts_src/components/cmpHeroBulletController", "game/src/ts_src/commons/1942enums", "game/src/ts_src/bulletManager/nullBulletManager"], function (require, exports, baseActor_1, cmpHeroInput_1, cmpMovement_1, cmpAnimation_1, stateHeroFFLight_1, stateHeroGlide_1, cmpHeroBulletController_1, _1942enums_12, nullBulletManager_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlayerController = void 0;
    var PlayerController = (function () {
        function PlayerController() {
            this._m_bulletManager = nullBulletManager_4.NullBulletManager.GetInstance();
            return;
        }
        PlayerController.prototype.init = function (_scene, _activePointer, _config) {
            var heroSprite = _scene.physics.add.sprite(_scene.game.canvas.width * 0.5, _scene.game.canvas.height * 0.5, 'DragonFlight', 0);
            var hero = baseActor_1.BaseActor.Create(heroSprite, "Hero");
            hero.addComponent(cmpHeroInput_1.CmpHeroInput.Create());
            hero.addComponent(cmpMovement_1.CmpMovement.Create());
            hero.addComponent(cmpAnimation_1.CmpAnimation.Create());
            hero.addComponent(cmpHeroBulletController_1.CmpHeroBulletController.Create());
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
            var anim = hero.getComponent(_1942enums_12.DC_COMPONENT_ID.kAnimation);
            anim.addState(new stateHeroFFLight_1.StateHeroFFlight());
            anim.addState(new stateHeroGlide_1.StateHeroGlide());
            anim.setActive('Hero_Forward_Flight');
            return;
        };
        PlayerController.prototype.setBulletManager = function (_bulletManager) {
            this._m_bulletManager = _bulletManager;
            var bulletCntrl = this._m_player.getComponent(_1942enums_12.DC_COMPONENT_ID.kHeroBulletController);
            bulletCntrl.setBulletManager(_bulletManager);
            return;
        };
        PlayerController.prototype.setPointer = function (_pointer) {
            var input = this._m_player.getComponent(_1942enums_12.DC_COMPONENT_ID.kHeroInput);
            input.setPointer(_pointer);
            return;
        };
        PlayerController.prototype.getPointer = function () {
            var input = this._m_player.getComponent(_1942enums_12.DC_COMPONENT_ID.kHeroInput);
            return input.getPointer();
        };
        PlayerController.prototype.setInputMode = function (_mode) {
            var input = this._m_player.getComponent(_1942enums_12.DC_COMPONENT_ID.kHeroInput);
            input.setMode(_mode);
            return;
        };
        PlayerController.prototype.getInputMode = function () {
            var input = this._m_player.getComponent(_1942enums_12.DC_COMPONENT_ID.kHeroInput);
            return input.getMode();
        };
        PlayerController.prototype.setHeroSpeed = function (_speed) {
            var input = this._m_player.getComponent(_1942enums_12.DC_COMPONENT_ID.kHeroInput);
            input.setSpeed(_speed);
            return;
        };
        PlayerController.prototype.setHeroFireRate = function (_fireRate) {
            var bulletController = this._m_player.getComponent(_1942enums_12.DC_COMPONENT_ID.kHeroBulletController);
            bulletController.setFireRate(_fireRate);
            return;
        };
        PlayerController.prototype.getHeroFireRate = function () {
            var bulletController = this._m_player.getComponent(_1942enums_12.DC_COMPONENT_ID.kHeroBulletController);
            return bulletController.getFireRate();
        };
        PlayerController.prototype.setMovementPadding = function (_p1_x, _p1_y, _p2_x, _p2_y) {
            var movement = this._m_player.getComponent(_1942enums_12.DC_COMPONENT_ID.kMovement);
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
        PlayerController.prototype.getDirection = function () {
            var movement = this._m_player.getComponent(_1942enums_12.DC_COMPONENT_ID.kMovement);
            return movement.getDirection();
        };
        return PlayerController;
    }());
    exports.PlayerController = PlayerController;
});
define("game/src/ts_src/components/cmpBulletData", ["require", "exports", "game/src/ts_src/bulletManager/bulletSpawner/nullBulletSpawner", "game/src/ts_src/commons/1942enums"], function (require, exports, nullBulletSpawner_3, _1942enums_13) {
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
            component.m_id = _1942enums_13.DC_COMPONENT_ID.kBulletData;
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
define("game/src/ts_src/components/cmpBulletCollisionController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_14) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpBulletCollisionController = void 0;
    var CmpBulletCollisionController = (function () {
        function CmpBulletCollisionController() {
        }
        CmpBulletCollisionController.Create = function () {
            var controller = new CmpBulletCollisionController();
            controller.m_id = _1942enums_14.DC_COMPONENT_ID.kCollisionController;
            return controller;
        };
        CmpBulletCollisionController.prototype.onCollision = function (_other, _this) {
            var data = _this.getComponent(_1942enums_14.DC_COMPONENT_ID.kBulletData);
            _other.sendMessage(_1942enums_14.DC_MESSAGE_ID.kHit, data.getAttackPoints());
            _this.sendMessage(_1942enums_14.DC_MESSAGE_ID.kKill, _this);
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
define("game/src/ts_src/components/cmpMovementBullet", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpMovementBullet = void 0;
    var CmpMovementBullet = (function () {
        function CmpMovementBullet() {
        }
        CmpMovementBullet.Create = function () {
            var movement = new CmpMovementBullet();
            movement.m_id = _1942enums_15.DC_COMPONENT_ID.kMovementBullet;
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
                case _1942enums_15.DC_MESSAGE_ID.kAgentMove:
                    {
                        var movement = _obj;
                        this.move(movement.x, movement.y);
                    }
                    return;
                case _1942enums_15.DC_MESSAGE_ID.kToPosition:
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
define("game/src/ts_src/components/cmpPlayZone", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_16) {
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
            playZone.m_id = _1942enums_16.DC_COMPONENT_ID.kPlayZone;
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
            _actor.sendMessage(_1942enums_16.DC_MESSAGE_ID.kKill, _actor);
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
define("game/src/ts_src/bulletManager/bulletManager", ["require", "exports", "optimization/mxObjectPool", "game/src/ts_src/actors/baseActor", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpBulletCollisionController", "game/src/ts_src/components/cmpBulletData", "game/src/ts_src/components/cmpMovementBullet", "game/src/ts_src/components/cmpPlayZone", "game/src/ts_src/bulletManager/bulletSpawner/nullBulletSpawner"], function (require, exports, mxObjectPool_2, baseActor_2, _1942enums_17, cmpBulletCollisionController_1, cmpBulletData_1, cmpMovementBullet_1, cmpPlayZone_1, nullBulletSpawner_4) {
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
        BulletManager.prototype.init = function (_scene, _config) {
            this._m_playZone.setBoundings(-100, -100, 1180, 2020);
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
            var playZoneComponent = this._m_playZone;
            var collisionController = this._m_collisionController;
            while (size > 0) {
                sprite = bodiesGroup.create(0.0, 0.0, 'fireball');
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
        };
        BulletManager.prototype.destroy = function () {
            this._m_pool.destroy();
            this._m_bodiesGroup.destroy();
            return;
        };
        BulletManager.prototype._onCollision = function (_other, _bullet) {
            var bulletActor = _bullet.getData("actor");
            var bulletController = bulletActor.getComponent(_1942enums_17.DC_COMPONENT_ID.kCollisionController);
            var otherActor = _other.getData('actor');
            bulletController.onCollision(otherActor, bulletActor);
            var otherController = otherActor.getComponent(_1942enums_17.DC_COMPONENT_ID.kCollisionController);
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
define("game/src/ts_src/components/cmpEnemyHealth", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_18) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpEnemyHealth = void 0;
    var CmpEnemyHealth = (function () {
        function CmpEnemyHealth() {
        }
        CmpEnemyHealth.Create = function () {
            var enemyHealth = new CmpEnemyHealth();
            enemyHealth.m_id = _1942enums_18.DC_COMPONENT_ID.kEnemyHealth;
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
                case _1942enums_18.DC_MESSAGE_ID.kHit:
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
                actor.sendMessage(_1942enums_18.DC_MESSAGE_ID.kKill, actor);
            }
            this._m_iHP = hp;
            return;
        };
        CmpEnemyHealth.prototype.destroy = function () { };
        return CmpEnemyHealth;
    }());
    exports.CmpEnemyHealth = CmpEnemyHealth;
});
define("game/src/ts_src/components/cmpMovementEnemy", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_19) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpMovementEnemy = void 0;
    var CmpMovementEnemy = (function () {
        function CmpMovementEnemy() {
        }
        CmpMovementEnemy.Create = function () {
            var movement = new CmpMovementEnemy();
            movement.m_id = _1942enums_19.DC_COMPONENT_ID.kMovementEnemy;
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
                case _1942enums_19.DC_MESSAGE_ID.kAgentMove:
                    {
                        var movement = _obj;
                        this.move(movement.x, movement.y);
                    }
                    return;
                case _1942enums_19.DC_MESSAGE_ID.kToPosition:
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
define("game/src/ts_src/enemiesManager/enemiesManager", ["require", "exports", "optimization/mxObjectPool", "game/src/ts_src/actors/baseActor", "game/src/ts_src/bulletManager/nullBulletManager", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpEnemyHealth", "game/src/ts_src/components/cmpMovementEnemy", "game/src/ts_src/components/cmpNullCollisionController", "game/src/ts_src/components/cmpNullEnemyController", "game/src/ts_src/enemiesManager/enemySpawner/nullEnemySpawner"], function (require, exports, mxObjectPool_3, baseActor_3, nullBulletManager_5, _1942enums_20, cmpEnemyHealth_1, cmpMovementEnemy_1, cmpNullCollisionController_2, cmpNullEnemyController_2, nullEnemySpawner_4) {
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
            manager._m_bulletManager = nullBulletManager_5.NullBulletManager.GetInstance();
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
                actor.addComponent(cmpNullCollisionController_2.CmpNullCollisionController.GetInstance());
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
            var selfController = selfActor.getComponent(_1942enums_20.DC_COMPONENT_ID.kCollisionController);
            var otherController = otherActor.getComponent(_1942enums_20.DC_COMPONENT_ID.kCollisionController);
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
define("game/src/ts_src/components/cmpTargetController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_21) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpTargetController = void 0;
    var CmpTargetController = (function () {
        function CmpTargetController() {
        }
        CmpTargetController.Create = function () {
            var controller = new CmpTargetController();
            controller.m_id = _1942enums_21.DC_COMPONENT_ID.kCollisionController;
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
define("game/src/ts_src/components/cmpBasicBulletController", ["require", "exports", "game/src/ts_src/commons/1942enums"], function (require, exports, _1942enums_22) {
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
            controller.m_id = _1942enums_22.DC_COMPONENT_ID.kBasicBulletController;
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
            _actor.sendMessage(_1942enums_22.DC_MESSAGE_ID.kAgentMove, this._m_force);
            return;
        };
        CmpBasicBulletController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_22.DC_MESSAGE_ID.kKill:
                    this._onKill(_obj);
                    return;
            }
        };
        CmpBasicBulletController.prototype.destroy = function () { };
        CmpBasicBulletController.prototype._onKill = function (_actor) {
            var data = _actor.getComponent(_1942enums_22.DC_COMPONENT_ID.kBulletData);
            data.getSpawner().disassemble(_actor);
            return;
        };
        return CmpBasicBulletController;
    }());
    exports.CmpBasicBulletController = CmpBasicBulletController;
});
define("game/src/ts_src/bulletManager/bulletSpawner/heroBasicBulletSpawner", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpBasicBulletController", "game/src/ts_src/bulletManager/bulletSpawner/nullBulletSpawner"], function (require, exports, _1942enums_23, cmpBasicBulletController_1, nullBulletSpawner_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HeroBasicBulletSpawner = void 0;
    var HeroBasicBulletSpawner = (function () {
        function HeroBasicBulletSpawner() {
        }
        HeroBasicBulletSpawner.Create = function () {
            var spawner = new HeroBasicBulletSpawner;
            var basicMovement = cmpBasicBulletController_1.CmpBasicBulletController.Create();
            basicMovement.setDirection(0.0, -1.0);
            basicMovement.setSpeed(1200.0);
            spawner._m_controller = basicMovement;
            return spawner;
        };
        HeroBasicBulletSpawner.prototype.update = function (_dt) {
            this._m_controller.resetForce(_dt);
            return;
        };
        HeroBasicBulletSpawner.prototype.spawn = function (_actor, _x, _y) {
            this.assemble(_actor);
            _actor.sendMessage(_1942enums_23.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(_x, _y, 0.0));
            return;
        };
        HeroBasicBulletSpawner.prototype.assemble = function (_actor) {
            var bulletData = _actor.getComponent(_1942enums_23.DC_COMPONENT_ID.kBulletData);
            bulletData.setSpawner(this);
            bulletData.setAttackPoints(1);
            _actor.addComponent(this._m_controller);
            return;
        };
        HeroBasicBulletSpawner.prototype.disassemble = function (_actor) {
            var bulletData = _actor.getComponent(_1942enums_23.DC_COMPONENT_ID.kBulletData);
            bulletData.setSpawner(nullBulletSpawner_5.NullBulletSpawner.GetInstance());
            _actor.removeComponent(_1942enums_23.DC_COMPONENT_ID.kBasicBulletController);
            this._m_bulletManager.disableActor(_actor);
            return;
        };
        HeroBasicBulletSpawner.prototype.setBulletManager = function (_manager) {
            this._m_bulletManager = _manager;
            return;
        };
        HeroBasicBulletSpawner.prototype.getID = function () {
            return _1942enums_23.DC_BULLET_TYPE.kHeroBasic;
        };
        HeroBasicBulletSpawner.prototype.destroy = function () { };
        return HeroBasicBulletSpawner;
    }());
    exports.HeroBasicBulletSpawner = HeroBasicBulletSpawner;
});
define("test/bulletManager/src/ts_src/scenes/test", ["require", "exports", "game/src/ts_src/playerController/playerController", "game/src/ts_src/states/nullState", "game/src/ts_src/bulletManager/bulletManager", "game/src/ts_src/gameManager/gameManager", "game/src/ts_src/enemiesManager/enemiesManager", "game/src/ts_src/enemiesManager/enemiesManagerConfig", "game/src/ts_src/components/cmpTargetController", "game/src/ts_src/commons/1942enums", "game/src/ts_src/bulletManager/bulletSpawner/heroBasicBulletSpawner"], function (require, exports, playerController_1, nullState_2, bulletManager_1, gameManager_2, enemiesManager_1, enemiesManagerConfig_1, cmpTargetController_1, _1942enums_24, heroBasicBulletSpawner_1) {
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
            gameManager_2.GameManager.Prepare();
            var gameManager = gameManager_2.GameManager.GetInstance();
            var heroSpawner = heroBasicBulletSpawner_1.HeroBasicBulletSpawner.Create();
            var bulletManager = bulletManager_1.BulletManager.Create();
            var bmConfig = JSON.parse(this.cache.text.get('bulletManagerConfig'));
            bulletManager.init(this, bmConfig);
            bulletManager.addSpawner(heroSpawner);
            this._m_bulletManager = bulletManager;
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
                    var hp = actor.getComponent(_1942enums_24.DC_COMPONENT_ID.kEnemyHealth);
                    hp.setHP(100000);
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
            heroController.setBulletManager(bulletManager);
            this._m_heroController = heroController;
            gameManager.setPlayerController(heroController);
            return;
        };
        Test.prototype.update = function (_time, _delta) {
            var dt = _delta * 0.001;
            gameManager_2.GameManager.GetInstance().update(dt);
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
                    + "\n** Pool **\n"
                    + "\nSize : " + pool.getSize().toString()
                    + "\nActive : " + pool.getActiveSize().toString()
                    + "\nDesactive : " + pool.getDesactiveSize().toString();
            var hero = this._m_heroController.getPlayer();
            var heroBulletCntrl = hero.getComponent(_1942enums_24.DC_COMPONENT_ID.kHeroBulletController);
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
define("test/bulletManager/src/ts_src/game_init", ["require", "exports", "phaser3-nineslice", "test/bulletManager/src/ts_src/scenes/test"], function (require, exports, phaser3_nineslice_1, test_1) {
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
define("game/src/ts_src/commands/cmdKillEnemy", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmdKillEnemy = void 0;
    var CmdKillEnemy = (function () {
        function CmdKillEnemy() {
        }
        CmdKillEnemy.prototype.exec = function () {
            this.m_spawner.disasemble(this.m_actor);
            this.m_enemiesManager.disableActor(this.m_actor);
            return;
        };
        return CmdKillEnemy;
    }());
    exports.CmdKillEnemy = CmdKillEnemy;
});
define("game/src/ts_src/components/cmpErranteController", ["require", "exports", "game/src/ts_src/commands/cmdKillEnemy", "game/src/ts_src/commons/1942enums", "game/src/ts_src/enemiesManager/enemySpawner/nullEnemySpawner", "game/src/ts_src/enemiesManager/nullEnemiesManager"], function (require, exports, cmdKillEnemy_1, _1942enums_25, nullEnemySpawner_5, nullEnemiesManager_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpErranteController = void 0;
    var CmpErranteController = (function () {
        function CmpErranteController() {
        }
        CmpErranteController.Create = function () {
            var controller = new CmpErranteController();
            controller.m_id = _1942enums_25.DC_COMPONENT_ID.kEnemyController;
            controller._m_direction = new Phaser.Math.Vector3(0.0, 1.0);
            controller._m_force = new Phaser.Math.Vector3();
            controller._m_speed = 400.0;
            controller._m_enemiesManager = nullEnemiesManager_4.NullEnemiesManager.GetInstance();
            controller._m_spawner = nullEnemySpawner_5.NullEnemySpawner.GetInstance();
            controller.setDeltaTime(0.0);
            return controller;
        };
        CmpErranteController.prototype.init = function (_actor) {
            return;
        };
        CmpErranteController.prototype.update = function (_actor) {
            _actor.sendMessage(_1942enums_25.DC_MESSAGE_ID.kAgentMove, this._m_force);
            return;
        };
        CmpErranteController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case _1942enums_25.DC_MESSAGE_ID.kKill:
                    this._onKill(_obj);
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
        CmpErranteController.prototype.setDeltaTime = function (_dt) {
            this._m_dt = _dt;
            var force = this._m_force;
            var direction = this._m_direction;
            var mult = this._m_speed * _dt;
            force.x = direction.x * mult;
            force.y = direction.y * mult;
            return;
        };
        CmpErranteController.prototype.destroy = function () {
            this._m_spawner = null;
            return;
        };
        CmpErranteController.prototype._onKill = function (_actor) {
            var command = new cmdKillEnemy_1.CmdKillEnemy();
            command.m_actor = _actor;
            command.m_spawner = this._m_spawner;
            command.m_enemiesManager = this._m_enemiesManager;
            _actor.addPostCommand(command);
            return;
        };
        return CmpErranteController;
    }());
    exports.CmpErranteController = CmpErranteController;
});
define("game/src/ts_src/enemiesManager/enemySpawner/erranteSpawner", ["require", "exports", "game/src/ts_src/commons/1942enums", "game/src/ts_src/components/cmpErranteController", "game/src/ts_src/components/cmpNullEnemyController", "game/src/ts_src/components/cmpPlayZone", "game/src/ts_src/enemiesManager/nullEnemiesManager"], function (require, exports, _1942enums_26, cmpErranteController_1, cmpNullEnemyController_3, cmpPlayZone_2, nullEnemiesManager_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ErranteSpawner = void 0;
    var ErranteSpawner = (function () {
        function ErranteSpawner() {
        }
        ErranteSpawner.Create = function () {
            var spawner = new ErranteSpawner();
            spawner._m_enemiesManager = nullEnemiesManager_5.NullEnemiesManager.GetInstance();
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
            _actor.sendMessage(_1942enums_26.DC_MESSAGE_ID.kToPosition, new Phaser.Math.Vector3(_x, _y));
            return;
        };
        ErranteSpawner.prototype.getID = function () {
            return _1942enums_26.DC_ENEMY_TYPE.kErrante;
        };
        ErranteSpawner.prototype.assemble = function (_actor) {
            var healthComponent = _actor.getComponent(_1942enums_26.DC_COMPONENT_ID.kEnemyHealth);
            healthComponent.setHP(5);
            _actor.addComponent(this._m_controller);
            _actor.addComponent(this._m_playZone);
            return;
        };
        ErranteSpawner.prototype.disasemble = function (_actor) {
            _actor.addComponent(cmpNullEnemyController_3.CmpNullEnemyController.GetInstance());
            _actor.removeComponent(_1942enums_26.DC_COMPONENT_ID.kPlayZone);
            return;
        };
        ErranteSpawner.prototype.setEnemiesManager = function (_enemiesManager) {
            this._m_enemiesManager = _enemiesManager;
            this._m_controller.setEnemiesManager(_enemiesManager);
            return;
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
//# sourceMappingURL=test_bulletManager.js.map