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
define("commons/mxUUID", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Object with a unique UUID. This UUID is generated with the Phaser Utilities.
     */
    var MxUUID = /** @class */ (function () {
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        function MxUUID() {
            this._m_id = "";
            return;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Creates a new MxUUID instance, with a unique UUID.
         */
        MxUUID.Create = function () {
            var id = new MxUUID();
            id._m_id = Phaser.Utils.String.UUID();
            return id;
        };
        /**
         * Creates a new MxUUID instante, with the same UUID of a given MxUUID.
         * @param _mxUUID
         */
        MxUUID.Clone = function (_mxUUID) {
            var id = new MxUUID();
            id._m_id = _mxUUID._m_id;
            return id;
        };
        /**
         * Get the UUID string.
         */
        MxUUID.prototype.getUUIDString = function () {
            return this._m_id;
        };
        /**
         * Compare the value of this MxUUID with other MxUUID.
         *
         * @param _id MxUUID that you want to check.
         *
         * @returns true if the MxUUID has the same value.
         */
        MxUUID.prototype.compare = function (_id) {
            return this._m_id == _id._m_id;
        };
        return MxUUID;
    }());
    exports.MxUUID = MxUUID;
});
define("gameObjects/mxUObject", ["require", "exports", "commons/mxUUID"], function (require, exports, mxUUID_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * An MxUObject is a object that has a MxUUID to be identified. Other classes can
     * be extended from this one to have the UUID methods, that help to identify
     * objects.
     */
    var MxUObject = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function MxUObject() {
            this._m_uuid = mxUUID_1.MxUUID.Create();
            return;
        }
        /**
         * Gets this object's unique identifier object.
         */
        MxUObject.prototype.getUUID = function () {
            return this._m_uuid;
        };
        /**
         * Gets this object's unique indentifier in the string format.
         */
        MxUObject.prototype.getUUIDString = function () {
            return this._m_uuid.getUUIDString();
        };
        /**
        * Safely destroys the object.
        */
        MxUObject.prototype.destroy = function () {
            this._m_uuid = null;
            return;
        };
        return MxUObject;
    }());
    exports.MxUObject = MxUObject;
});
/**
 * Custon assert functions.
 *
 * @packageDocumentation
 */
define("commons/mxAssert", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxAssert = /** @class */ (function () {
        function MxAssert() {
        }
        /**
         * Check if the giveb parameter is a string. Throws an error if not.
         *
         * @param _input
         */
        MxAssert.String = function (_input) {
            if (typeof _input === 'string')
                return;
            else
                throw new Error('Input must be a string.');
        };
        /**
         * Checks if the given parameter is a function. Throws an error if not.
         *
         * @param _input
         */
        MxAssert.Function = function (_input) {
            if (typeof _input === 'function')
                return;
            else
                throw new Error('Input must be a function.');
        };
        /**
         * Checks if the given parameter is a number. Throws an error if not.
         *
         * @param _input
         */
        MxAssert.Number = function (_input) {
            if (typeof _input === 'number')
                return;
            else
                throw new Error('Input must be a number.');
        };
        /**
         * Checks if the given parameter is an object. Throws an error if not.
         *
         * @param _input
         */
        MxAssert.Object = function (_input) {
            if (typeof _input === 'object')
                return;
            else
                throw new Error('Input must be an object.');
        };
        /**
         * Checks if the given parameter is a boolean. Throws an error if not.
         *
         * @param _input
         */
        MxAssert.Boolean = function (_input) {
            if (typeof _input === 'boolean')
                return;
            else
                throw new Error('Input must be a boolean.');
        };
        /**
         * Checkes if the given number is larger than 0. Throws an error if not.
         *
         * @param _number value that must has to be larther than the minimum value.
         * @param _minimum minimum value that the number can be. Number must be larger than minimum.
         */
        MxAssert.LargerThan = function (_number, _minimum) {
            if (_number <= 0) {
                throw new Error('Number cant has a negative or zero value');
            }
            return;
        };
        return MxAssert;
    }());
    exports.MxAssert = MxAssert;
});
define("fs/mxCSVRow", ["require", "exports", "gameObjects/mxUObject", "fs/mxCSVFile", "commons/mxAssert"], function (require, exports, mxUObject_1, mxCSVFile_1, mxAssert_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxCSVRow = /** @class */ (function (_super) {
        __extends(MxCSVRow, _super);
        function MxCSVRow(_csv_file) {
            var _this = _super.call(this) || this;
            _this._m_a_cells = new Array();
            _this._m_a_csv_file = _csv_file;
            return _this;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Gets the null object of this instance.
         */
        MxCSVRow.GetNull = function () {
            return MxCSVRow._NULL_OBJ;
        };
        /**
         * Check if the given instance is the null object.
         * @param _row
         */
        MxCSVRow.IsNull = function (_row) {
            var null_id = MxCSVRow.GetNull().getUUID();
            var param_id = _row.getUUID();
            return param_id.compare(null_id);
        };
        /**
         * Creates the null object.
         */
        MxCSVRow.Prepare = function () {
            MxCSVRow._NULL_OBJ = new MxCSVRow(mxCSVFile_1.MxCSVFile.GetNull());
            return;
        };
        /**
         * Destroys the null object.
         */
        MxCSVRow.Shutdown = function () {
            mxCSVFile_1.MxCSVFile._NULL_OBJ.destroy();
            mxCSVFile_1.MxCSVFile._NULL_OBJ = null;
            return;
        };
        /**
         * Gets the value of one of this Row's cell.
         * Returns an empty string if it doesn't has the required cell.
         *
         * @param _index {string | number} Index can be the header's name or the cell's index.
         */
        MxCSVRow.prototype.getCell = function (_index) {
            if (_index === undefined || _index == null) {
                console.warn("MxCSVRow: null or undefined parameter.");
                return "";
            }
            if (typeof _index === 'number') {
                if (this._validate_idx(_index)) {
                    return this._m_a_cells[_index];
                }
            }
            else if (typeof _index === 'string') {
                var array_index = this._m_a_csv_file.getHeaderIdx(_index);
                if (this._validate_idx(array_index)) {
                    return this._m_a_cells[array_index];
                }
            }
            return "";
        };
        /**
         * Adds a new cell to this row.
         * @param _data {string} New cell's data.
         */
        MxCSVRow.prototype.addCell = function (_data) {
            this._m_a_cells.push(_data);
            return;
        };
        /**
         * Adds multiple cells from raw data.
         *
         * @param _data {string} cells raw data.
         * @param _delimiter {char} Delimiter character for cells. i.e. ',' for CSV or '\t' for TSV.
         */
        MxCSVRow.prototype.addCellsFromRaw = function (_data, _delimiter) {
            if (_delimiter === void 0) { _delimiter = ','; }
            mxAssert_1.MxAssert.String(_data);
            mxAssert_1.MxAssert.String(_delimiter);
            var a_cells_data = _data.split(_delimiter);
            for (var index = 0; index < a_cells_data.length; ++index) {
                this._m_a_cells.push(a_cells_data[index]);
            }
            return;
        };
        /**
         * Gets the row size.
         */
        MxCSVRow.prototype.getRowSize = function () {
            return this._m_a_cells.length;
        };
        /**
        * Safely destroys the object.
        */
        MxCSVRow.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._m_a_cells = null;
            this._m_a_csv_file = null;
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        MxCSVRow.prototype._validate_idx = function (_index) {
            return (0 <= _index && _index < this._m_a_cells.length);
        };
        return MxCSVRow;
    }(mxUObject_1.MxUObject));
    exports.MxCSVRow = MxCSVRow;
});
define("fs/mxCSVFile", ["require", "exports", "gameObjects/mxUObject", "fs/mxCSVRow", "commons/mxAssert"], function (require, exports, mxUObject_2, mxCSVRow_1, mxAssert_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class handle a CSVFile.
     */
    var MxCSVFile = /** @class */ (function (_super) {
        __extends(MxCSVFile, _super);
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        function MxCSVFile() {
            var _this = _super.call(this) || this;
            _this._m_a_headers = new Array();
            _this._m_a_rows = new Array();
            return _this;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Gets the null object of this instance.
         */
        MxCSVFile.GetNull = function () {
            return MxCSVFile._NULL_OBJ;
        };
        /**
         * Checks if the given object is the null object.
         * @param _csv_file
         */
        MxCSVFile.IsNull = function (_csv_file) {
            var null_id = this.GetNull().getUUID();
            var obj_id = _csv_file.getUUID();
            return obj_id.compare(null_id);
        };
        /**
         * Creates the null object.
         */
        MxCSVFile.Prepare = function () {
            MxCSVFile._NULL_OBJ = new MxCSVFile();
            return;
        };
        /**
         * Destroys the null object.
         */
        MxCSVFile.ShutDown = function () {
            MxCSVFile._NULL_OBJ.destroy();
            MxCSVFile._NULL_OBJ = null;
            return;
        };
        /**
         * Creates an useful MxCSVFile object to handle a raw csv data.
         *
         * @param _csv_data {string} Raw CSV data.
         * @param _has_header_row {boolean} Does data has a header row? It takes the first row as headers.
         * @param _cell_delimiter {char} Delimiter character for cells. i.e. ',' for CSV or '\t' for TSV.
         * @param _row_delimiter {char} Delimiter character for rows, usually it is the line break ('\n') character.
         */
        MxCSVFile.Create = function (_csv_data, _has_header_row, _cell_delimiter, _row_delimiter) {
            if (_has_header_row === void 0) { _has_header_row = true; }
            if (_cell_delimiter === void 0) { _cell_delimiter = ','; }
            if (_row_delimiter === void 0) { _row_delimiter = '\n'; }
            var csv_file = new MxCSVFile();
            mxAssert_2.MxAssert.String(_csv_data);
            mxAssert_2.MxAssert.String(_cell_delimiter);
            mxAssert_2.MxAssert.String(_row_delimiter);
            if (_csv_data == "") {
                return csv_file;
            }
            // Remove any Carriage Character
            _csv_data = _csv_data.replace('\r', '');
            var row;
            var a_row_raw_data = _csv_data.split(_row_delimiter);
            var rows_start_position = 0;
            // Get the headers from the csv file.
            if (_has_header_row) {
                if (a_row_raw_data.length > 0) {
                    var a_cell_data = a_row_raw_data[0].split(_cell_delimiter);
                    for (var index = 0; index < a_cell_data.length; ++index) {
                        csv_file._m_a_headers.push(a_cell_data[index]);
                    }
                    rows_start_position++;
                }
            }
            // Get rows data.
            for (var index = rows_start_position; index < a_row_raw_data.length; ++index) {
                row = new mxCSVRow_1.MxCSVRow(csv_file);
                csv_file._m_a_rows.push(row);
                row.addCellsFromRaw(a_row_raw_data[index], _cell_delimiter);
            }
            return csv_file;
        };
        /**
         * Gets a row from the MxCSVFile. If the row_index is out of range, it will returns
         * a Null Object.
         *
         * @param _row_index
         */
        MxCSVFile.prototype.getRow = function (_row_index) {
            if (0 <= _row_index && _row_index < this._m_a_rows.length) {
                return this._m_a_rows[_row_index];
            }
            console.warn("Can't get the row from the MxCSVFile: Index out of range.");
            return mxCSVRow_1.MxCSVRow.GetNull();
        };
        /**
         * Gets the first Row with given value in a specific header column. Return a
         * Null Object if doesn't found a row with the given specifications.
         *
         * @param _key_header {string} key header's name
         * @param _value {string} value.
         */
        MxCSVFile.prototype.getRowByKey = function (_key_header, _value) {
            mxAssert_2.MxAssert.String(_key_header);
            mxAssert_2.MxAssert.String(_value);
            var header_idx = this.getHeaderIdx(_key_header);
            if (header_idx < 0) {
                console.warn("Can't get the row from the MxCSVFile: Header doesn't exists: " + _key_header);
                return mxCSVRow_1.MxCSVRow.GetNull();
            }
            for (var index = 0; index < this._m_a_rows.length; ++index) {
                if (this._m_a_rows[index].getCell(header_idx) == _value) {
                    return this._m_a_rows[index];
                }
            }
            return mxCSVRow_1.MxCSVRow.GetNull();
        };
        /**
         * Returns the header column position (0 based). Returns -1 if the header
         * doesn't exists.
         *
         * @param _header
         */
        MxCSVFile.prototype.getHeaderIdx = function (_header_name) {
            var value;
            for (var index = 0; index < this._m_a_headers.length; ++index) {
                value = this._m_a_headers[index];
                if (value === _header_name) {
                    return index;
                }
            }
            console.warn("Can't get the Header Index:"
                + _header_name
                + " Header doesn't exists in the MxCSVFile.");
            return -1;
        };
        /**
         * Check if the header exists in the MxCSVFile. Returns true if it does.
         *
         * @param _header_name
         */
        MxCSVFile.prototype.hasHeader = function (_header_name) {
            for (var index = 0; index < this._m_a_headers.length; ++index) {
                if (this._m_a_headers[index] == _header_name) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Gets the number of headers.
         */
        MxCSVFile.prototype.getNumberHeaders = function () {
            return this._m_a_headers.length;
        };
        /**
         * Gets the number of rows.
         */
        MxCSVFile.prototype.getNumberRows = function () {
            return this._m_a_rows.length;
        };
        /**
        * Safely destroys the object.
        */
        MxCSVFile.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            return;
        };
        return MxCSVFile;
    }(mxUObject_2.MxUObject));
    exports.MxCSVFile = MxCSVFile;
});
/**
 * Common Enumerators.
 * @packageDocumentation
 */
define("commons/mxEnums", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     *
     */
    exports.OPRESULT = Object.freeze({
        /** There isn't a desciption for this result. */
        kUndefined: -1,
        /** Failure. */
        kFail: 0,
        /** Success. */
        kOk: 1,
        /** The operation cannot find a necesary file. */
        kFile_not_found: 2,
        /** The operation cannot find a necesary instance. */
        kObject_not_found: 3,
        /** The given parameter has an incompatible format. */
        kIncompatible_format: 4,
        /** There was a conflict with a null object. */
        kNull_Object: 5,
        /** The given parameter has an invalid type. */
        kInvalid_type: 6,
        /** There was a redundance conflict with some instance. */
        kObject_already_exists: 7,
        /**
         * The operation is not implemented yet.
         */
        kUnimplemented_operation: 8,
        /** Number of posible results. */
        kCount: 9
    });
    exports.COMPONENT_ID = Object.freeze({
        /** SpriteComponent  */
        kSprite: 0,
        /** NineSliceComponent */
        kNineSlice: 1,
        /** TextComponent */
        kText: 2,
        /** BitmapTextComponent */
        kBitmapText: 3,
        /** GraphicsComponent */
        kGraphics: 4,
        /** ShaderComponent */
        kShader: 5,
        /** AudioClipManager */
        kAudioClipsManager: 6,
        /** CmpTransform component. */
        kTransform: 7,
        /** Number of default components that this version has. */
        kCount: 8
    });
    exports.MESSAGE_ID = Object.freeze({
        /** The agent has been activated. data : null */
        kOnAgentActive: 0,
        /** The agent has been desactivated. data : null*/
        kOnAgentDesactive: 1,
        /** */
        kPlaySound: 2,
        /** Number of default Messages. */
        kCount: 3
    });
    exports.OBJECT_POOL_TYPE = Object.freeze({
        /** Identifier of the static Object Pool. */
        kStatic: 0,
        /** Identifier of the dynamic Object Pool. */
        kDynamic: 1,
    });
});
define("listeners/mxListener", ["require", "exports", "commons/mxAssert"], function (require, exports, mxAssert_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class contains a Function and may have an object as the Function's context.
     * The "S" type can be defined as the type of the sender object (who calls this Listener),
     * and the "A" type can be defined as the type of the object who has the arguments.
     */
    var MxListener = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * The MxListener needs a Function, and may have a context.
         *
         * @param _listener
         * @param _context
         */
        function MxListener(_listener, _context) {
            mxAssert_3.MxAssert.Function(_listener);
            mxAssert_3.MxAssert.Object(_context);
            this.m_listener = _listener;
            if (_context) {
                this.m_context = _context;
            }
            return;
        }
        /**
         * Calls the Function of this MxListener.
         *
         * @param _sender Sender object. The object who calls this listener.
         * @param _args Agument object.
         */
        MxListener.prototype.call = function (_sender, _args) {
            if (this.m_context) {
                this.m_listener.call(this.m_context, _sender, _args);
            }
            else {
                this.m_listener(_sender, _args);
            }
            return;
        };
        /**
         * Safely destroys this MxListener.
         */
        MxListener.prototype.destroy = function () {
            this.m_listener = null;
            this.m_context = null;
            return;
        };
        return MxListener;
    }());
    exports.MxListener = MxListener;
});
define("listeners/mxListenerGroup", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class has a Map of MxListeners, identified by a string key, also called
     * the username. The username helps the MxListenerGroup to indentify and destroy
     * a MxListener with the unsuscribe(string) method.
     */
    var MxListenerGroup = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function MxListenerGroup() {
            this._m_listenersMap = new Map();
            return;
        }
        /*
         * Calls the call method of each MxListener of this MxListenerGroup.
         * */
        MxListenerGroup.prototype.call = function (_sender, _args) {
            this._m_listenersMap.forEach(function (_value) {
                _value.call(_sender, _args);
                return;
            }, this);
            return;
        };
        /**
         * Adds a new listener to this MxListenerGroup. If a MxListener already exists
         * with the given username, it will be overrided.
         *
         * @param _username an identifier of the given MxListener.
         * @param _listener the MxListener to be added.
         */
        MxListenerGroup.prototype.suscribe = function (_username, _listener) {
            this._m_listenersMap.set(_username, _listener);
            return;
        };
        /**
         * Destroys the MxListener with the given username, and removes it from this
         * MxListenerGroup.
         *
         * @param _username the identifier of the MxListener.
         */
        MxListenerGroup.prototype.unsuscribe = function (_username) {
            if (this._m_listenersMap.has(_username)) {
                // Get the MxListener and call its destroy method.
                var listener = this._m_listenersMap.get(_username);
                listener.destroy();
                // remove the MxListener from this MxListenerGroup.
                this._m_listenersMap.delete(_username);
            }
            return;
        };
        /**
         * Removes all the MxListeners attached to this MxListenerGroup. This methods
         * calls the destroy method of each MxListener before remove them.
         */
        MxListenerGroup.prototype.clear = function () {
            this._m_listenersMap.forEach(function (_value) {
                _value.destroy();
                return;
            }, this);
            this._m_listenersMap.clear();
            return;
        };
        /**
         * Calls the destroy method of each MxListener in this MxListenerGroup.
         */
        MxListenerGroup.prototype.destroy = function () {
            this.clear();
            this._m_listenersMap = null;
            return;
        };
        return MxListenerGroup;
    }());
    exports.MxListenerGroup = MxListenerGroup;
});
define("listeners/mxListenerManager", ["require", "exports", "listeners/mxListenerGroup"], function (require, exports, mxListenerGroup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class manage a group of MxListenerGroup, or "events". By this object
     * an MxListener can suscribe or unsuscribe to an event.
     */
    var MxListenerManager = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function MxListenerManager() {
            this._m_eventsMap = new Map();
            return;
        }
        /**
         * Adds a new event (MxListenerGroup) to this MxListnerManager. If an event
         * with the same key exists, it will be destroyed and replaced.
         *
         * @param _event the event key.
         */
        MxListenerManager.prototype.addEvent = function (_event) {
            if (this._m_eventsMap.has(_event)) {
                // destroys the previous event 
                var event_1 = this._m_eventsMap.get(_event);
                event_1.destroy();
            }
            this._m_eventsMap.set(_event, new mxListenerGroup_1.MxListenerGroup());
            return;
        };
        /**
         * Call the MxListener attached to an event.
         *
         * @param _event The key of the event to be called.
         * @param _sender The sender object of this event.
         * @param _args The arguments obejct of this event.
         */
        MxListenerManager.prototype.call = function (_event, _sender, _args) {
            if (this._m_eventsMap.has(_event)) {
                var event_2 = this._m_eventsMap.get(_event);
                event_2.call(_sender, _args);
            }
            return;
        };
        /**
         * Suscribe a new MxListener to the given event. This method also needs the
         * username to identify the MxListener. If a MxListener already exists in the
         * event, that MxListener will be replaced.
         *
         * @param _event The string key of the event to add the given MxListener.
         * @param _username the string key to the identify the given MxListener.
         * @param _listener the MxListener that will be added to the event.
         */
        MxListenerManager.prototype.suscribe = function (_event, _username, _listener) {
            if (this._m_eventsMap.has(_event)) {
                var event_3 = this._m_eventsMap.get(_event);
                event_3.suscribe(_username, _listener);
            }
            return;
        };
        /**
         * Destroys the MxListener with the given username and removes it from the
         * event.
         *
         * @param _event the string key of the event.
         * @param _username the string key of the MxListener that will be removed.
         */
        MxListenerManager.prototype.unsuscribe = function (_event, _username) {
            if (this._m_eventsMap.has(_event)) {
                var event_4 = this._m_eventsMap.get(_event);
                event_4.unsuscribe(_username);
            }
            return;
        };
        /**
         * Removes all the MxListeners from an event. This method call the clear method
         * of the MxListenerGroup indentified by the event name.
         *
         * @param _event The string identifier of the MxListenerGroup.
         */
        MxListenerManager.prototype.clearEvent = function (_event) {
            if (this._m_eventsMap.has(_event)) {
                var event_5 = this._m_eventsMap.get(_event);
                event_5.clear();
            }
            return;
        };
        /**
         * Calls the destroy method of each MxListenerGroup and removes them from this
         * MxListenerManager. This MxListenerManager will be empty.
         */
        MxListenerManager.prototype.clear = function () {
            this._m_eventsMap.forEach(function (_group) {
                _group.destroy();
                return;
            }, this);
            this._m_eventsMap.clear();
            return;
        };
        /**
        * Calls the destroy method of each MxListenerGroup and removes them from this
        * MxListenerManager.
        */
        MxListenerManager.prototype.destroy = function () {
            this.clear();
            this._m_eventsMap = null;
            return;
        };
        return MxListenerManager;
    }());
    exports.MxListenerManager = MxListenerManager;
});
define("optimization/mxPoolArgs", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class contains the arguments delivered when an event of a MxObjecPool
     * is triggered.
     */
    var mxPoolArgs = /** @class */ (function () {
        function mxPoolArgs() {
        }
        return mxPoolArgs;
    }());
    exports.mxPoolArgs = mxPoolArgs;
});
define("optimization/mxObjectPool", ["require", "exports", "commons/mxEnums", "commons/mxAssert", "listeners/mxListenerManager", "optimization/mxPoolArgs", "listeners/mxListener"], function (require, exports, mxEnums_1, mxAssert_4, mxListenerManager_1, mxPoolArgs_1, mxListener_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Creational design pattern that uses a set of initalized objects kept ready
     * to use rather than allocating and destroying them on demand.
     */
    var MxObjectPool = /** @class */ (function () {
        /**
         * Private constructor. Object Pool must be created with Factories.
         */
        function MxObjectPool() {
            return;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * A dynamic MxObjectPool creates elements on the fly. This means that this pool
         * will create a new element if it doesnt't has any avaliable. This pool grows
         * according to the use that is given. The maximum number of elements define
         * the limit that this MxObjectPool can grow.
         *
         * @param _max Maximum number of elements that this MxObjectPool can store.
         * @param _create_fn Fuction used to create a new element, this should return an element.
         */
        MxObjectPool.CreateDynamic = function (_max, _create_fn, _context) {
            mxAssert_4.MxAssert.Function(_create_fn);
            mxAssert_4.MxAssert.Number(_max);
            var pool = new MxObjectPool();
            pool._m_a_active = new Array();
            pool._m_a_desactive = new Array();
            pool._m_type = mxEnums_1.OBJECT_POOL_TYPE.kDynamic;
            pool._m_max_size = _max;
            pool._m_size = 0;
            pool._m_create_fn = _create_fn;
            if (_context) {
                pool._m_fn_create_context = _context;
            }
            // Initialize the MxListenerManager. The "elementActive" and "elementDesactive"
            // events.
            pool._m_listenerManager
                = new mxListenerManager_1.MxListenerManager();
            pool._m_listenerManager.addEvent("elementActive");
            pool._m_listenerManager.addEvent("elementDesactive");
            return pool;
        };
        /**
         * Creates an MxObjectPool that already has the elements needed.
         * The user need to give an array of elements. Use the the init fn to set
         * the element's MxObjectPool, if it is needed.
         *
         * @param _a_elements Array of elements that belong to thes MxObjectPool.
         * @param _init_fn This function to initalize the element.
         * @param _context The init fucntion context.
         */
        MxObjectPool.CreateStatic = function (_a_elements, _init_fn, _context) {
            var pool = new MxObjectPool();
            pool._m_a_active = new Array();
            pool._m_a_desactive = new Array();
            pool._m_type = mxEnums_1.OBJECT_POOL_TYPE.kStatic;
            pool._m_max_size = _a_elements.length;
            pool._m_size = _a_elements.length;
            for (var index = 0; index < pool._m_size; ++index) {
                pool.desactive(_a_elements[index]);
                if (_init_fn) {
                    if (_context) {
                        _init_fn.call(_context, _a_elements[index], pool);
                    }
                    else {
                        _init_fn(_a_elements[index], pool);
                    }
                }
            }
            pool._m_create_fn = undefined;
            pool._m_fn_create_context = undefined;
            // Initialize the MxListenerManager. The "elementActive" and "elementDesactive"
            // events.
            pool._m_listenerManager
                = new mxListenerManager_1.MxListenerManager();
            pool._m_listenerManager.addEvent("elementActive");
            pool._m_listenerManager.addEvent("elementDesactive");
            return pool;
        };
        /**
         *
         * @param _fn
         * @param _context
         */
        MxObjectPool.prototype.forEach = function (_fn, _context) {
            this.forEachActive(_fn, _context);
            this.forEachDesactive(_fn, _context);
            return;
        };
        /**
         *
         * @param _fn
         * @param _context
         */
        MxObjectPool.prototype.forEachActive = function (_fn, _context) {
            if (_context) {
                this._m_a_active.forEach(_fn, _context);
            }
            else {
                this._m_a_active.forEach(_fn);
            }
            return;
        };
        /**
         *
         * @param _fn
         * @param _context
         */
        MxObjectPool.prototype.forEachDesactive = function (_fn, _context) {
            if (_context) {
                this._m_a_desactive.forEach(_fn, _context);
            }
            else {
                this._m_a_desactive.forEach(_fn);
            }
            return;
        };
        /**
         * Events:
         *
         * I) elementActive : trigger when an element had just been actived.
         *
         * II) elementDesactive : trigger when an element had just been desactived.
         *
         * @param _event
         * @param _username
         * @param _fn
         * @param _context
         */
        MxObjectPool.prototype.suscribe = function (_event, _username, _fn, _context) {
            this._m_listenerManager.suscribe(_event, _username, new mxListener_1.MxListener(_fn, _context));
            return;
        };
        /**
         *
         * @param _event
         * @param _username
         */
        MxObjectPool.prototype.unsuscribe = function (_event, _username) {
            this._m_listenerManager.unsuscribe(_event, _username);
            return;
        };
        /**
         * Get an available element from this MxObjectPool. Be careful, if this MxObjectPool
         * doesn't has any availble element and is full, this method will returns a null type object.
         *
         * @retuns An available element of this MxObjectPool. If the MxObjectPool doesn't
         * has any available element and is full, it will returns a null type object.
         */
        MxObjectPool.prototype.get = function () {
            var element = null;
            if (this.hasDesactive()) {
                element = this._m_a_desactive[0];
                this._active(element);
                return element;
            }
            if (this.isFull()) {
                return element;
            }
            switch (this._m_type) {
                case mxEnums_1.OBJECT_POOL_TYPE.kDynamic:
                    element = this._create_element();
                    this._active(element);
                    return element;
                default:
                    return element;
            }
        };
        /**
         * Desactive the given element. This method call the mxDesactive() method of
         * the given element, and set the m_mx_active property to false. The
         * "elementDesactive" event will be triggered.
         *
         * @param _element The element to desactive.
         *
         * @returns OPRESULT.kObject_not_found when the element doesn't was found in
         * this MxObjectPool, otherwise returns an OPRESULT.kOk.
         */
        MxObjectPool.prototype.desactive = function (_element) {
            var active_size = this._m_a_active.length;
            var index;
            for (index = 0; index < active_size; ++index) {
                if (this._m_a_active[index] == _element) {
                    this._m_a_active.splice(index, 1);
                    break;
                }
            }
            if (index >= active_size) {
                // TODO: error, this element doesn't exists in this MxObjectPool.
                return mxEnums_1.OPRESULT.kObject_not_found;
            }
            // Add the element to the desactive list.
            this._m_a_desactive.push(_element);
            // Set the element's propertie and call the "callback" method.
            _element.m_mx_active = false;
            _element.mxDesactive();
            // preapare the arguments.
            var argument = new mxPoolArgs_1.mxPoolArgs();
            argument.element = _element;
            // Call the event.
            this._m_listenerManager.call('elementDesactive', this, argument);
            return mxEnums_1.OPRESULT.kOk;
        };
        /**
         * Creates elements until reaching the maximum number of elements allowed.
         */
        MxObjectPool.prototype.fill = function () {
            var element;
            while (!this.isFull()) {
                element = this._create_element();
                this.desactive(element);
            }
            return;
        };
        /**
         * Check if this MxObjectPool has any element available.
         *
         * @returns True if there are at least one element available.
         */
        MxObjectPool.prototype.hasDesactive = function () {
            return this._m_a_desactive.length > 0;
        };
        /**
         * Check if this MxObjectPool has reached the maximum number of elements
         * allowed.
         *
         * @returns True if the MxObjectPool has reached the maximum number or elements.
         */
        MxObjectPool.prototype.isFull = function () {
            return this._m_size >= this._m_max_size;
        };
        /**
         * Get the number of elements of this MxObjectPool.
         *
         * @returns The number of elements in this MxObjectPool.
         */
        MxObjectPool.prototype.getSize = function () {
            return this._m_size;
        };
        /**
         * Ge the maximum number of elements allowed to this MxObjectPool.
         *
         * @retunrs The Maximum number o elements allowed to this MxObjectPool.
         */
        MxObjectPool.prototype.getMaxSize = function () {
            return this._m_max_size;
        };
        /**
         * Get the type of pool of this MxObjectPool.
         *
         * @returns The type of MxObjectPool.
         */
        MxObjectPool.prototype.getType = function () {
            return this._m_type;
        };
        /**
        * Safely destroys the object. Calls the destroy method of each element in this
        * MxObjectPool (active and desactive). Finally this will destroy the
        * MxListenerManager.
        */
        MxObjectPool.prototype.destroy = function () {
            var obj;
            while (this._m_a_active.length) {
                obj = this._m_a_active.pop();
                obj.destroy();
            }
            this._m_a_active = null;
            while (this._m_a_desactive.length) {
                obj = this._m_a_desactive.pop();
                obj.destroy();
            }
            this._m_a_desactive = null;
            this._m_create_fn = null;
            this._m_fn_create_context = null;
            this._m_listenerManager.destroy();
            this._m_listenerManager = null;
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        MxObjectPool.prototype._active = function (_element) {
            var desactive_size = this._m_a_desactive.length;
            for (var index = 0; index < desactive_size; ++index) {
                if (this._m_a_desactive[index] == _element) {
                    this._m_a_desactive.splice(index, 1);
                    break;
                }
            }
            // adds the element to the active element.
            this._m_a_active.push(_element);
            // define the element propertie and call the callback method.
            _element.m_mx_active = true;
            _element.mxActive();
            // preapare the arguments.
            var argument = new mxPoolArgs_1.mxPoolArgs();
            argument.element = _element;
            // Call the event.
            this._m_listenerManager.call('elementActive', this, argument);
            return;
        };
        /**
         * Creates a new element for this MxObjectPool, this also increment the
         * size of this MxObjectPool.
         */
        MxObjectPool.prototype._create_element = function () {
            var element = this._m_create_fn.call(this._m_fn_create_context, this);
            this._m_size++;
            return element;
        };
        return MxObjectPool;
    }());
    exports.MxObjectPool = MxObjectPool;
});
define("behaviour/mxComponent", ["require", "exports", "gameObjects/mxUObject"], function (require, exports, mxUObject_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The MxComponent contains data or state of a MxActor.
     */
    var MxComponent = /** @class */ (function (_super) {
        __extends(MxComponent, _super);
        /**
         * Build a new MxComponent with an identifier.
         *
         * @param _id The idendtifier of this MxComponent.
         */
        function MxComponent(_id) {
            var _this = _super.call(this) || this;
            _this._m_id = _id;
            return _this;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Creates the Null Object of the MxComponent class.
         */
        MxComponent.Prepare = function () {
            if (MxComponent._NULL_OBJECT == null
                || MxComponent._NULL_OBJECT == undefined) {
                this._NULL_OBJECT = new MxComponent(-1);
            }
            return;
        };
        /**
         * Destroys the Null Object of the MxComponent class.
         */
        MxComponent.Shutdown = function () {
            if (typeof MxComponent._NULL_OBJECT == 'object') {
                this._NULL_OBJECT.destroy();
                this._NULL_OBJECT = null;
            }
            return;
        };
        /**
         * Chech if the given MxCompoennt is the MxCompoent's Null Object.
         */
        MxComponent.IsNull = function (_object) {
            var uuid = _object.getUUID();
            return uuid.compare(MxComponent._NULL_OBJECT.getUUID());
        };
        /**
         * Get the MxComponent Null Object.
         */
        MxComponent.GetNull = function () {
            return this._NULL_OBJECT;
        };
        /**
         * Can be overrided. This method is called when the MxActor have just been
         * initialized. Base method do nothing.
         *
         * @param _actor The MxActor to wich this MxComponent belongs.
         */
        MxComponent.prototype.init = function (_actor) {
            return;
        };
        /**
         * Can be overrided. This method is called during the actor update. Base
         * method do nothing.
         *
         * @param _actor The MxActor to wich this MxComponent belogns.
         */
        MxComponent.prototype.update = function (_actor) {
            return;
        };
        /**
         * Can be overrided. This method is called by the MxComponentManager when a
         * message is recived. Base method do nothing.
         *
         * @param _id Message identifier.
         * @param _data Message data.
         */
        MxComponent.prototype.receive = function (_id, _data) {
            return;
        };
        /**
         * Gets this MxComponent's identifier.
         */
        MxComponent.prototype.getID = function () {
            return this._m_id;
        };
        /**
         * Can be overided. This method is called by the MxComponentManager when the component
         * is attach to a MxActor. Base method do nothing.
         *
         * This method is useful if the MxActor had been initialized before, so the
         * MxComponent can intialized when is attached to the MxActor.
         *
         * @param _actor The MxActor to which this MxComponent belongs.
         */
        MxComponent.prototype.onAttach = function (_actor) {
            return;
        };
        /**
         * Can be overrided. This method is called by the MxComponentManager when the component
         * is dettach from the MxActor. Base method do nothing.
         *
         * @param _actor
         */
        MxComponent.prototype.onDettach = function (_actor) {
            return;
        };
        /**
         * Can be overrided. This method is called by the MxComponentManager when the MxActor is
         * destroyed. Base method calls its super.destroy() method.
         */
        MxComponent.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            return;
        };
        return MxComponent;
    }(mxUObject_3.MxUObject));
    exports.MxComponent = MxComponent;
});
define("behaviour/components/cmpTransform", ["require", "exports", "behaviour/mxComponent", "commons/mxEnums"], function (require, exports, mxComponent_1, mxEnums_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This component defines the position of a MxActor.
     */
    var CmpTransform = /** @class */ (function (_super) {
        __extends(CmpTransform, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function CmpTransform() {
            var _this = _super.call(this, mxEnums_2.COMPONENT_ID.kTransform) || this;
            _this.m_position = new Phaser.Math.Vector3;
            _this._m_globalPosition = new Phaser.Math.Vector3;
            _this._m_parent = null;
            return _this;
        }
        /**
         * Calculates the new global position.
         *
         * @param _actor
         */
        CmpTransform.prototype.update = function (_actor) {
            if (this._m_parent != null) {
                var parentGlobalPosition = this._m_parent.getGlobalPoisition();
                this._m_globalPosition.x = parentGlobalPosition.x + this.m_position.x;
                this._m_globalPosition.y = parentGlobalPosition.y + this.m_position.y;
                this._m_globalPosition.z = parentGlobalPosition.z + this.m_position.z;
            }
            else {
                this._m_globalPosition.x = this.m_position.x;
                this._m_globalPosition.y = this.m_position.y;
                this._m_globalPosition.z = this.m_position.z;
            }
            return;
        };
        /**
         * Move the local position "n" units at x axis, y axis, and (optional) z axis.
         *
         * @param _x
         * @param _y
         * @param _z
         */
        CmpTransform.prototype.move = function (_x, _y, _z) {
            this.m_position.x += _x;
            this.m_position.y += _y;
            if (typeof _z == "number") {
                this.m_position.z += _z;
            }
            return;
        };
        /**
         * Gets the MxActor's global position. This position is calculated with the sum
         * of the local position an the global position of its parent.
         */
        CmpTransform.prototype.getGlobalPoisition = function () {
            return this._m_globalPosition;
        };
        /**
         * Sets the parent of this transform. This method is exclusive for the MxActor
         * factories. If preferable that the developer don't use this method to avoid
         * errors.
         * @param _transform Parent transform component.
         */
        CmpTransform.prototype.setParent = function (_transform) {
            this._m_parent = _transform;
            return;
        };
        return CmpTransform;
    }(mxComponent_1.MxComponent));
    exports.CmpTransform = CmpTransform;
});
define("behaviour/mxComponentManager", ["require", "exports", "commons/mxEnums", "behaviour/mxComponent"], function (require, exports, mxEnums_3, mxComponent_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class is intended to manage the MxComponents attached to one MxActor.
     * It has basic operations with the MxComponent, and can be delegated the
     * initializtion, update and destructions of the attached MxComponents.
     */
    var MxComponentManager = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Creates an empty MxComponentManager. The actor reference is set to null.
         */
        function MxComponentManager() {
            this._m_component_map = new Map();
            this._m_actor = null;
            return;
        }
        /**
         * Sets the actor reference wich this MxComponentManager belons. This method
         * is called by the MxActor factories. Developers shouldn't use this one.
         *
         * @param _actor MxActor who this MxComponentManager belongs.
         */
        MxComponentManager.prototype.setActor = function (_actor) {
            this._m_actor = _actor;
            return;
        };
        /**
         * Calls the init() method of each component attached to this MxComponentManager.
         * This method is called by the init() method of the actor.
         */
        MxComponentManager.prototype.init = function () {
            this._m_component_map.forEach(function (_component) {
                _component.init(this._m_actor);
                return;
            }, this);
            return;
        };
        /**
         * Calls the update() method of each component attached to this MxComponentManager.
         * This method is called by the update() method of the actor.
         */
        MxComponentManager.prototype.update = function () {
            this._m_component_map.forEach(function (_component) {
                _component.update(this._m_actor);
                return;
            }, this);
            return;
        };
        /**
         * Sends a message to each component attached to this MxComponentManager.
         *
         * @param _id
         * @param _data
         */
        MxComponentManager.prototype.sendMessage = function (_id, _data) {
            this._m_component_map.forEach(function (_component) {
                _component.receive(_id, _data);
                return;
            }, this);
            return;
        };
        /**
         * Adds a MxComponent to this MxComponentManager.
         *
         * @param _component
         */
        MxComponentManager.prototype.addComponent = function (_component) {
            if (this._m_component_map.has(_component.getID())) {
                return mxEnums_3.OPRESULT.kObject_already_exists;
            }
            this._m_component_map.set(_component.getID(), _component);
            _component.onAttach(this._m_actor);
            return mxEnums_3.OPRESULT.kOk;
        };
        /**
         * Remove a MxComponent from this MxComponentManager by its identifier.
         *
         * @param _id
         */
        MxComponentManager.prototype.removeComponent = function (_id) {
            if (this.hasComponent(_id)) {
                var component = this._m_component_map.get(_id);
                component.onDettach(this._m_actor);
                this._m_component_map.delete(_id);
            }
            return;
        };
        /**
         * Check if this MxComponentManager has a MxComponent by its identifier.
         *
         * @param _id
         */
        MxComponentManager.prototype.hasComponent = function (_id) {
            return this._m_component_map.has(_id);
        };
        /**
         * Gets a MxComponent from this manager. This method allows to automaticlly cast
         * the MxComponent base class to a specific subclass. Be sure that the ID and the
         * subclass type are compatible.
         *
         * @param _id MxComponent's identifier.
         */
        MxComponentManager.prototype.getComponent = function (_id) {
            if (this._m_component_map.has(_id)) {
                return this._m_component_map.get(_id);
            }
            else {
                return mxComponent_2.MxComponent.GetNull();
            }
        };
        /**
         * Removes all the components attached to this MxManagerComponent.
         */
        MxComponentManager.prototype.clear = function () {
            this._m_component_map.clear();
            return;
        };
        /**
         * Calls the destroy method of each MxComponent attached to this MxComponentMannager.
         * It clears the component list.
         */
        MxComponentManager.prototype.destroy = function () {
            this._m_component_map.forEach(function (_component) {
                _component.destroy();
            });
            this._m_component_map.clear();
            this._m_component_map = null;
            this._m_actor = null;
            return;
        };
        return MxComponentManager;
    }());
    exports.MxComponentManager = MxComponentManager;
});
define("behaviour/mxActor", ["require", "exports", "gameObjects/mxUObject", "commons/mxEnums", "behaviour/components/cmpTransform", "behaviour/mxComponentManager"], function (require, exports, mxUObject_4, mxEnums_4, cmpTransform_1, mxComponentManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Architectural pattern wich follows the composition over inheritance principle
     * that allows greate flexibility in defining entities.
     *
     * Every MxActor consists of one or more MxComponent wich contains data or state.
     * The mix of MxComponents defines the behaviour of the MxActor. Therefore, the
     * behaviour of a MxActor can be changed during runtime by systems that add,
     * remove or mutate MxCompoents.
     */
    var MxActor = /** @class */ (function (_super) {
        __extends(MxActor, _super);
        /****************************************************/
        /* Protected                                        */
        /****************************************************/
        function MxActor() {
            var _this = _super.call(this) || this;
            _this._m_component_mg = new mxComponentManager_1.MxComponentManager();
            _this._m_children_map = new Map();
            _this._m_component_mg.setActor(_this);
            return _this;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Creates the Null Object of the MxActor class.
         */
        MxActor.Prepare = function () {
            if (MxActor._NULL_OBJECT === undefined
                || MxActor._NULL_OBJECT == null) {
                ///////////////////////////////////
                // Null Object
                MxActor._NULL_OBJECT = new MxActor();
                MxActor._NULL_OBJECT._m_id = "";
                MxActor._NULL_OBJECT._m_tag = -1;
                MxActor._NULL_OBJECT._m_parent = MxActor._NULL_OBJECT;
            }
            return;
        };
        /**
         * Destroys the Null Object of the MxActor class.
         */
        MxActor.Shutdown = function () {
            if (typeof MxActor._NULL_OBJECT == 'object') {
                this._NULL_OBJECT.destroy();
                this._NULL_OBJECT = null;
            }
            return;
        };
        /**
        * Check if the given actor is the Null Object.
        */
        MxActor.IsNull = function (_obj) {
            var _obj_uuid = _obj.getUUID();
            return this._NULL_OBJECT.getUUID().compare(_obj_uuid);
        };
        /**
         * Get Object Null.
         */
        MxActor.GetNull = function () {
            return this._NULL_OBJECT;
        };
        /**
         * MxActor default factory. It creates a new actor with default properties and
         * a transform component.It can be assigned as a child of another actor.
         *
         * @param _id MxActor identifier. Usually a name to indify it.
         * @param _m_parent MxActor's parent.
         */
        MxActor.Create = function (_id, _parent) {
            var actor = new MxActor();
            // Creates the transform component.
            actor.m_transform = new cmpTransform_1.CmpTransform();
            actor.m_transform.setParent(null);
            actor.addComponent(actor.m_transform);
            // Init properties.
            actor._m_id = _id;
            actor._m_tag = -1;
            actor._m_parent = MxActor.GetNull();
            // Set the actor's parent.
            if (typeof _parent == 'object') {
                if (_parent.addChild(actor) == mxEnums_4.OPRESULT.kOk) {
                    actor._m_parent = _parent;
                    actor.m_transform.setParent(_parent.m_transform);
                }
                else {
                    actor._m_parent = MxActor.GetNull();
                    console.error("Couldn't set actor's hierarchy.");
                }
            }
            else {
                actor._m_parent = MxActor.GetNull();
            }
            return actor;
        };
        /**
         * Creates a child of this MxActor. This method will returns
         * a Null Object if the parent already has a MxActor with the same
         * identifier.
         *
         * @param _id Actor identifier.
         */
        MxActor.prototype.create = function (_id) {
            if (this.hasChild(_id)) {
                return MxActor.GetNull();
            }
            var actor = MxActor.Create(_id, this);
            return actor;
        };
        /**
         * Intialize this actor's components and children.
         */
        MxActor.prototype.init = function () {
            this._m_component_mg.init();
            this._m_children_map.forEach(function (_actor) {
                _actor.init();
            });
            return;
        };
        /**
         * Update MxActor's components.
         */
        MxActor.prototype.update = function () {
            this._m_component_mg.update();
            this._m_children_map.forEach(this._update_child);
            return;
        };
        /**
         * Get the actor's MxComponentManager instance.
         */
        MxActor.prototype.getComponentManager = function () {
            return this._m_component_mg;
        };
        /**
         * Adds a ne component to this Actor. Returns a OPRESULT.
         * @param _component
         */
        MxActor.prototype.addComponent = function (_component) {
            return this._m_component_mg.addComponent(_component);
        };
        /**
         * Get this MxActor's MxComponent.
         * @param _id
         */
        MxActor.prototype.getComponent = function (_id) {
            return this._m_component_mg.getComponent(_id);
        };
        /**
         * Clears de MxComponentManager.
         */
        MxActor.prototype.clearComponentManager = function () {
            this._m_component_mg.clear();
            return;
        };
        /**
         * Sends a message to this MxActor's component.
         *
         * @param _id Message identifier.
         * @param _data Message data.
         * @param _recursive Send the message to the the MxActor's children.
         */
        MxActor.prototype.sendMessage = function (_id, _data, _recursive) {
            if (_recursive === void 0) { _recursive = false; }
            this._m_component_mg.sendMessage(_id, _data);
            if (_recursive) {
                this.sendMessageToChildren(_id, _data);
            }
            return;
        };
        /**
         * Sends a message to this MxActor children.
         *
         * @param _id Message identifier.
         * @param _data Message data.
         */
        MxActor.prototype.sendMessageToChildren = function (_id, _data) {
            this._m_children_map.forEach(function (_child) {
                _child.sendMessage(_id, _data, true);
            });
            return;
        };
        /**
         * Adds a new child to this Actor. This method detach the child from his
         * previous parent (if it has one).
         *
         * @param _child
         */
        MxActor.prototype.addChild = function (_child) {
            if (this.hasChild(_child._m_id)) {
                return mxEnums_4.OPRESULT.kObject_already_exists;
            }
            _child.detachFromParent();
            this._m_children_map.set(_child._m_id, _child);
            _child._m_parent = this;
            _child.m_transform.setParent(this.m_transform);
            return mxEnums_4.OPRESULT.kOk;
        };
        /**
         * Removes a child from this object. The parent reference of the child will be
         * set to Null Object. The parent reference of the child's transform will be
         * set to null.
         *
         * @param _child Child reference or child identifier.
         */
        MxActor.prototype.removeChild = function (_child) {
            if (typeof _child == 'object') {
                if (this._m_children_map.has(_child._m_id)) {
                    var child = this._m_children_map.get(_child._m_id);
                    if (!child._m_uuid.compare(_child._m_uuid)) {
                        return mxEnums_4.OPRESULT.kObject_not_found;
                    }
                    child._m_parent = MxActor.GetNull();
                    child.m_transform.setParent(null);
                    this._m_children_map.delete(_child._m_id);
                }
                else {
                    return mxEnums_4.OPRESULT.kObject_not_found;
                }
            }
            else if (typeof _child == 'string') {
                if (this._m_children_map.has(_child)) {
                    var child = this._m_children_map.get(_child);
                    child._m_parent = MxActor.GetNull();
                    child.m_transform.setParent(null);
                    this._m_children_map.delete(_child);
                }
                else {
                    return mxEnums_4.OPRESULT.kObject_not_found;
                }
            }
            else {
                return mxEnums_4.OPRESULT.kInvalid_type;
            }
            return mxEnums_4.OPRESULT.kOk;
        };
        /**
         * Gets a child by its identifier. If this actor doesn't has any child with
         * the id, the method will returns a Null Object.  This method isn't
         * recursive, so it will not check the children of children.
         *
         * @param _id Child's identifier.
         */
        MxActor.prototype.getChild = function (_id) {
            if (this._m_children_map.has(_id)) {
                return this._m_children_map.get(_id);
            }
            else {
                return MxActor.GetNull();
            }
        };
        /**
         * Check if the actor has a child with the given identifier. This method isn't
         * recursive, so it will not check the children of children.
         *
         * @param _id Child's identifier.
         */
        MxActor.prototype.hasChild = function (_id) {
            return this._m_children_map.has(_id);
        };
        /**
         * This method will detach the actor from his parent.
         */
        MxActor.prototype.detachFromParent = function () {
            if (!MxActor.IsNull(this._m_parent)) {
                return this._m_parent.removeChild(this);
            }
            return mxEnums_4.OPRESULT.kOk;
        };
        /**
         * Gets the actor's parent.
         */
        MxActor.prototype.getParent = function () {
            return this._m_parent;
        };
        /**
         * Gets this actor's identifier.
         */
        MxActor.prototype.getID = function () {
            return this._m_id;
        };
        /**
         * Gets the actor's tag.
         */
        MxActor.prototype.getTag = function () {
            return this._m_tag;
        };
        /**
         * Sends a mesasge 'kOnAgentActive' to all the components.
         */
        MxActor.prototype.mxActive = function () {
            this.sendMessage(mxEnums_4.MESSAGE_ID.kOnAgentActive, null, true);
            return;
        };
        /**
         * Send a message 'kOnAgentDesactive' to all the components.
         */
        MxActor.prototype.mxDesactive = function () {
            this.sendMessage(mxEnums_4.MESSAGE_ID.kOnAgentDesactive, null, true);
            return;
        };
        /**
         * Destroys this MxActor and his children.
         */
        MxActor.prototype.destroy = function () {
            this._m_children_map.forEach(function (_actor) {
                _actor.destroy();
                return;
            });
            this._m_children_map.clear();
            this._m_children_map = null;
            this._m_component_mg.destroy();
            this.m_transform = null;
            _super.prototype.destroy.call(this);
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        MxActor.prototype._update_child = function (_actor) {
            _actor.update();
            return;
        };
        return MxActor;
    }(mxUObject_4.MxUObject));
    exports.MxActor = MxActor;
});
define("mxUtilities", ["require", "exports", "fs/mxCSVFile", "fs/mxCSVRow", "behaviour/mxActor", "behaviour/mxComponent"], function (require, exports, mxCSVFile_2, mxCSVRow_2, mxActor_1, mxComponent_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxUtilities = /** @class */ (function () {
        function MxUtilities() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Prepare all the utilities modules and null objects.
         */
        MxUtilities.Prepare = function () {
            mxActor_1.MxActor.Prepare();
            mxComponent_3.MxComponent.Prepare();
            mxCSVFile_2.MxCSVFile.Prepare();
            mxCSVRow_2.MxCSVRow.Prepare();
            return;
        };
        /**
         * Destroy all the utilities modules and null objects.
         */
        MxUtilities.Shutdown = function () {
            mxCSVRow_2.MxCSVRow.Shutdown();
            mxCSVFile_2.MxCSVFile.ShutDown();
            mxComponent_3.MxComponent.Shutdown();
            mxActor_1.MxActor.Shutdown();
            return;
        };
        return MxUtilities;
    }());
    exports.MxUtilities = MxUtilities;
});
define("behaviour/mxState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Logic unit used by the MxFSM to define an execution block. The class need to
     * define its controller type.
     *
     * The controller can be used to store a common
     * object that every MxState from the same MxFSM share, for example an
     * MxActor.
     */
    var MxState = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Creates a new MxState without MxFSM and controller.
         */
        function MxState() {
            this._m_fsm = null;
            this._m_controller = null;
            return;
        }
        /**
         * Can be overrided. This method is called by the mxFSM just after this MxState change
         * its status from desactive to active. Base method do nothing.
         */
        MxState.prototype.onEnter = function () {
            return;
        };
        /**
         * Can be overrided. This method is called by the mxFSM just after this MxState change
         * its status from active to desactive. Base method do nothing.
         */
        MxState.prototype.onExit = function () {
            return;
        };
        /**
         * Can be overrided. This method is called by the MxFSM if this MxState is
         * currently active. Base method do nothing.
         *
         * @returns number without a specific use.
         */
        MxState.prototype.update = function () {
            return 0;
        };
        /**
         * Can be overrided. This method is called by the mxFSM if this MxState is
         * currently active. Base method do nothing.
         *
         * @returns number without a specific use.
         */
        MxState.prototype.draw = function () {
            return 0;
        };
        /**
         * Set the MxFSM where this MxState belongs. The parameter can be a null type
         * object. This method should be used only by the MxFSM.
         *
         * @param _fsm The MxFSM where this MxState belongs.
         */
        MxState.prototype.attachToFSM = function (_fsm) {
            this._m_fsm = _fsm;
            return;
        };
        /**
         * Set the controller object o this MxState. This parameter can be a null type
         * object. This method should be use only by the MxFSM.
         *
         * @param _controller The controller instance.
         */
        MxState.prototype.setController = function (_controller) {
            this._m_controller = _controller;
            return;
        };
        /**
         * Can be overrided. This method are called by the MxFSM when the MxState is
         * deleted or the MxFSM is destroyed. Base method do nothing.
         */
        MxState.prototype.destroy = function () {
            return;
        };
        return MxState;
    }());
    exports.MxState = MxState;
});
define("behaviour/mxFSM", ["require", "exports", "commons/mxEnums"], function (require, exports, mxEnums_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Model that can be used to simulate secuential logic, or in other words, to
     * represent and control execution flow. This class need to define the type of
     * its controller.
     *
     * The controller can be used to store a common
     * object that every MxState from the same MxFSM share, for example an
     * MxActor.
     */
    var MxFSM = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Creates a new MxFSM with null values. Use the init() method after the MxFSM
         * is builded, so it can be used.
         */
        function MxFSM() {
            this._m_active_state = null;
            this._m_states_map = null;
            return;
        }
        /**
         * Intialize this MxFSM with a controller. This method creates a new
         * Map for the MxState. This method should be called once and before any
         * other method.
         *
         * @param _controller The controller object of this MxFSM.
         */
        MxFSM.prototype.init = function (_controller) {
            this._m_states_map = new Map();
            this._m_controller = _controller;
            return;
        };
        /**
         * Calls the update() method of the active MxState. Take care that if there
         * isn't an active MxState this method will returns -1.
         *
         * @returns Result of the update() method of the active MxState. This value allways
         * will be -1 if ther isn't any active MxState.
         */
        MxFSM.prototype.update = function () {
            if (this._m_active_state != null) {
                return this._m_active_state.update();
            }
            return -1;
        };
        /**
         * Calls the draw() method of the active MxState. Take care that if there
         * isn't an active MxState this method will returns -1.
         *
         * @returns Result of the draw() method of the active MxState. This value allways
         * will be -1 if ther isn't any active MxState.
         */
        MxFSM.prototype.draw = function () {
            if (this._m_active_state != null) {
                return this._m_active_state.draw();
            }
            return -1;
        };
        /**
         * Removes all the MxState of this MxFSM. This method will not destroy the
         * MxState. This method will not call the onExit() method of the active
         * MxState.
         */
        MxFSM.prototype.clear = function () {
            this._m_states_map.forEach(function (_state) {
                // detach from this MXFSM
                _state.attachToFSM(null);
                _state.setController(null);
            });
            this._m_states_map.clear();
            this._m_active_state = null;
            return;
        };
        /**
         * Set the active MxState by its identifier. This method calls the onExit()
         * callback of the previous MxState (if it exists), later calls the onEnter()
         * callback of the new active MxState.
         *
         * This method returns OPRESULT.KObject_doesnt_found if none of the MxState have
         * the given identifier.
         *
         * @param _idx The identifier of the MxState.
         *
         * @returns OPRESULT.kOk if the operation was successfull.
         */
        MxFSM.prototype.setActive = function (_idx) {
            if (this._m_states_map.has(_idx)) {
                if (this._m_active_state != null) {
                    this._m_active_state.onExit();
                }
                this._m_active_state = this._m_states_map.get(_idx);
                this._m_active_state.onEnter();
            }
            else {
                return mxEnums_5.OPRESULT.kObject_not_found;
            }
            return mxEnums_5.OPRESULT.kOk;
        };
        /**
         * Adds a new state to this MxFSM. The new MxState needs a number to be identified.
         *
         * This method returns an OPRESULT.kObject_already_exists if there is a MxState
         * with the same identifier as the given, and the MxState will not be added
         * to the MxFSM.
         *
         * @param _idx The identifier of the given MxState.
         * @param _state The MxState that will be added to this MxFSM.
         *
         * @returns OPRESULT.kOk if the operation was succesfull.
         */
        MxFSM.prototype.addState = function (_idx, _state) {
            if (!this._m_states_map.has(_idx)) {
                this._m_states_map.set(_idx, _state);
                // attach the MxState to this MxFSM
                _state.attachToFSM(this);
                _state.setController(this._m_controller);
            }
            else {
                return mxEnums_5.OPRESULT.kObject_already_exists;
            }
            return mxEnums_5.OPRESULT.kOk;
        };
        /**
         * Removes a MxState by its identifier. If the MxState to be removed is the
         * active MxState, the onExit() method of the MxState will be called before
         * removing it.
         *
         * If you want to destroy the MxState, use the deleteState(number)
         * method instead.
         *
         * Returns OPRESULT:kObject_not_found if none of the MxState have the given
         * identifier.
         *
         * @param _idx The identifier of the MxState to be removed.
         *
         * @param OPRESULT.kOk if the operation was succesfull.
         */
        MxFSM.prototype.removeState = function (_idx) {
            if (this._m_states_map.has(_idx)) {
                // destroy the MxState before be removed.
                var state = this._m_states_map.get(_idx);
                // Check if the MxState to be removed is the active MxState. If it is,
                // call the onExit() method, before removing it.
                if (state == this._m_active_state) {
                    this._m_active_state.onExit();
                    this._m_active_state = null;
                }
                // detach from this FSM.
                state.attachToFSM(null);
                state.setController(null);
                // remvoes the MxState from this MxFSM.
                this._m_states_map.delete(_idx);
            }
            else {
                return mxEnums_5.OPRESULT.kObject_not_found;
            }
            return mxEnums_5.OPRESULT.kOk;
        };
        /**
         * Destroys a MxState by its identifier. This method will call the destroy() method
         * of  the MxState. If the MxState to be deleted is the active MxState, the
         * onExit() method of the MxState will be called before removing it.
         *
         * If you only want to remove the MxState from this MxFSM, witout
         * destroying it, use removeState(number) method instead.
         *
         * Returns OPRESULT:kObject_not_found if none of the MxState have the given
         * identifier.
         *
         * @param _idx The identifier of the MxState to be deleted.
         *
         * @returns OPRESULT.kOk if the operation was succesfull.
         */
        MxFSM.prototype.deleteState = function (_idx) {
            if (this._m_states_map.has(_idx)) {
                // destroy the MxState before be removed.
                var state = this._m_states_map.get(_idx);
                // Check if the MxState to be removed is the active MxState. If it is,
                // call the onExit() method, before destroying it.
                if (state == this._m_active_state) {
                    this._m_active_state.onExit();
                    this._m_active_state = null;
                }
                // destroy the MxState.
                state.destroy();
                // remove the MxState from this MxFSM.
                this._m_states_map.delete(_idx);
            }
            else {
                return mxEnums_5.OPRESULT.kObject_not_found;
            }
            return mxEnums_5.OPRESULT.kOk;
        };
        /**
         * Call the destroy() method of each MxState in this MxFSM. Finally clears
         * the list of MxState. This method will not call the onExit() method of the
         * active MxState.
         */
        MxFSM.prototype.deleteAll = function () {
            this._m_states_map.forEach(function (_state) {
                _state.destroy();
                return;
            });
            this._m_states_map.clear();
            this._m_active_state = null;
        };
        return MxFSM;
    }());
    exports.MxFSM = MxFSM;
});
define("behaviour/components/cmpAudioClipsManager", ["require", "exports", "commons/mxEnums", "behaviour/mxComponent"], function (require, exports, mxEnums_6, mxComponent_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmpAudioClipsManager = /** @class */ (function (_super) {
        __extends(CmpAudioClipsManager, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function CmpAudioClipsManager() {
            var _this = _super.call(this, mxEnums_6.COMPONENT_ID.kAudioClipsManager) || this;
            _this._m_clipsMap = new Map();
            return _this;
        }
        CmpAudioClipsManager.prototype.prepare = function (_baseSoundManager) {
            this._m_baseSoundManager = _baseSoundManager;
            return;
        };
        CmpAudioClipsManager.prototype.add = function (_sound, _config) {
            this._m_baseSoundManager.add(_sound, _config);
            return;
        };
        CmpAudioClipsManager.prototype.play = function (_sound, _extra) {
            this._m_baseSoundManager.play(_sound, _extra);
            return;
        };
        return CmpAudioClipsManager;
    }(mxComponent_4.MxComponent));
    exports.CmpAudioClipsManager = CmpAudioClipsManager;
});
define("behaviour/components/phaserComponentWrapper/mxCommonComponentsWrapper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxCommonComponentsWrapper = /** @class */ (function () {
        function MxCommonComponentsWrapper() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Updates the position of the Phaser Gameobject.
         * @param _actor
         */
        MxCommonComponentsWrapper.prototype.updatePosition = function (_actor) {
            var globalPosition = _actor.m_transform.getGlobalPoisition();
            this._m_goComponents_base.setPosition(globalPosition.x, globalPosition.y, globalPosition.z);
            return;
        };
        /**
         * Sets the scale of the Phaser GameObject.
         * @param _x
         * @param _y
         */
        MxCommonComponentsWrapper.prototype.setScale = function (_x, _y) {
            this._m_goComponents_base.setScale(_x, _y);
            return;
        };
        /**
         * Get the Phaser GameObject Scale.
         */
        MxCommonComponentsWrapper.prototype.getScale = function () {
            return new Phaser.Math.Vector2(this._m_goComponents_base.x, this._m_goComponents_base.y);
        };
        /**
         * Sets the angle of the Phaser GameObject in degrees.
         *
         * @param _degrees
         */
        MxCommonComponentsWrapper.prototype.setAngle = function (_degrees) {
            this._m_goComponents_base.setAngle(_degrees);
            return;
        };
        /**
         * The angle of this Game Object as expressed in degrees.
         * Phaser uses a right-hand clockwise rotation system, where 0 is right, 90 is down, 180/-180 is left and -90 is up.
         * If you prefer to work in radians, see the rotation property instead.
         */
        MxCommonComponentsWrapper.prototype.getAngle = function () {
            return this._m_goComponents_base.angle;
        };
        /**
         * Sets the angle of the Phaser GameObject in radians.
         *
         * @param _radians
         */
        MxCommonComponentsWrapper.prototype.setRotation = function (_radians) {
            this._m_goComponents_base.setRotation(_radians);
            return;
        };
        /**
         * The angle of this Game Object in radians.
         * Phaser uses a right-hand clockwise rotation system, where 0 is right, 90 is down, 180/-180 is left and -90 is up.
         * If you prefer to work in degrees, see the angle property instead.
         */
        MxCommonComponentsWrapper.prototype.getRotation = function () {
            return this._m_goComponents_base.rotation;
        };
        /**
         * Gets the phaser's position. In theory this position has the same value
         * as the cmpTransform component.
         */
        MxCommonComponentsWrapper.prototype.getPosition = function () {
            return new Phaser.Math.Vector3(this._m_goComponents_base.x, this._m_goComponents_base.y, this._m_goComponents_base.z);
        };
        /**
         * Sets the position of this Game Object to be a random position within the confines of the given area.
         * If no area is specified a random position between 0 x 0 and the game width x height is used instead.
         * The position does not factor in the size of this Game Object, meaning that only the origin is guaranteed to be within the area.
         *
         * @param _x — The x position of the top-left of the random area. Default 0.
         * @param _y — The y position of the top-left of the random area. Default 0.
         * @param _width — The width of the random area.
         * @param _height — The height of the random area.
         */
        MxCommonComponentsWrapper.prototype.setRandomPosition = function (_x, _y, _width, _height) {
            this._m_goComponents_base.setRandomPosition(_x, _y, _width, _height);
            return;
        };
        /**
         * Sets the visibility of the Phaser GameObject.
         */
        MxCommonComponentsWrapper.prototype.setVisible = function (_visible) {
            this._m_goComponents_base.setVisible(_visible);
            return;
        };
        /**
         * The visible state fo the Phaser GameObject.
         */
        MxCommonComponentsWrapper.prototype.isVisible = function () {
            return this._m_goComponents_base.visible;
        };
        return MxCommonComponentsWrapper;
    }());
    exports.MxCommonComponentsWrapper = MxCommonComponentsWrapper;
});
define("commons/mxMixin", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxMixin = /** @class */ (function () {
        function MxMixin() {
        }
        MxMixin.applyMixins = function (derivedCtor, baseCtors) {
            baseCtors.forEach(function (baseCtor) {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                    Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
                });
            });
        };
        return MxMixin;
    }());
    exports.MxMixin = MxMixin;
});
define("behaviour/components/phaserComponentWrapper/mxAlphaComponentWrapper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxAlphaComponentWrapper = /** @class */ (function () {
        function MxAlphaComponentWrapper() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Set the Alpha level of this Game Object. The alpha controls the opacity of the Game Object as it renders. Alpha values are provided as a float between 0, fully * transparent, and 1, fully opaque.
         * If your game is running under WebGL you can optionally specify four different alpha values, each of which correspond to the four corners of the Game Object.
         * Under Canvas only the topLeft value given is used.
         *
         * @param _topLeft — The alpha value used for the top-left of the Game Object. If this is the only value given it's applied across the whole Game Object.
         * @param _topRight — The alpha value used for the top-right of the Game Object. WebGL only.
         * @param _bottomLeft — The alpha value used for the bottom-left of the Game Object. WebGL only.
         * @param _bottomRight — The alpha value used for the bottom-right of the Game Object. WebGL only.
         */
        MxAlphaComponentWrapper.prototype.setAlpha = function (_topLeft, _topRight, _bottomLeft, _bottomRight) {
            this._m_goComponent_alpha.setAlpha(_topLeft, _topRight, _bottomLeft, _bottomRight);
            return;
        };
        /**
         * The alpha value of the Game Object.
         * This is a global value, impacting the entire Game Object, not just a region of it.
         */
        MxAlphaComponentWrapper.prototype.getAlpha = function () {
            return this._m_goComponent_alpha.alpha;
        };
        /**
         * Clears all alpha values associated with this Game Object.
         * Immediately sets the alpha levels back to 1 (fully opaque).
         */
        MxAlphaComponentWrapper.prototype.clearAlpha = function () {
            this._m_goComponent_alpha.clearAlpha();
            return;
        };
        return MxAlphaComponentWrapper;
    }());
    exports.MxAlphaComponentWrapper = MxAlphaComponentWrapper;
});
define("behaviour/components/phaserComponentWrapper/mxOriginComponentWrapper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxOriginComponentWrapper = /** @class */ (function () {
        function MxOriginComponentWrapper() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Sets the origin of the Phaser GameObject.
         * @param _x
         * @param _y
         */
        MxOriginComponentWrapper.prototype.setOrigin = function (_x, _y) {
            this._m_goComponent_origin.setOrigin(_x, _y);
            return;
        };
        /**
         * Sets the origin of this Game Object based on the Pivot values in its Frame.
         */
        MxOriginComponentWrapper.prototype.setOriginFromFrame = function () {
            this._m_goComponent_origin.setOriginFromFrame();
            return;
        };
        return MxOriginComponentWrapper;
    }());
    exports.MxOriginComponentWrapper = MxOriginComponentWrapper;
});
define("behaviour/components/phaserComponentWrapper/mxTintComponentWrapper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxTintComponentWrapper = /** @class */ (function () {
        function MxTintComponentWrapper() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Does this Game Object have a tint applied to it or not?
         */
        MxTintComponentWrapper.prototype.isTinted = function () {
            return this._m_goComponent_tint.isTinted;
        };
        /**
         * Clears all tint values associated with this Game Object.
         * Immediately sets the color values back to 0xffffff and the tint type to 'additive', which results in no visible change to the texture.
         */
        MxTintComponentWrapper.prototype.clearTint = function () {
            this._m_goComponent_tint.clearTint();
            return;
        };
        /**
         * Sets an additive tint on this Game Object.
         * The tint works by taking the pixel color values from the Game Objects texture, and then multiplying it by the color value of the tint. You can provide either
         * one color value, in which case the whole Game Object will be tinted in that color. Or you can provide a color per corner. The colors are blended together
         * across the extent of the Game Object.
         *
         * To modify the tint color once set, either call this method again with new values or use the tint property to set all colors at once. Or, use the properties
         * tintTopLeft, tintTopRight,tintBottomLeftandtintBottomRight` to set the corner color values independently.
         *
         * To remove a tint call clearTint.
         *
         * To swap this from being an additive tint to a fill based tint set the property tintFill to true.
         *
         * @param topLeft — The tint being applied to the top-left of the Game Object. If no other values are given this value is applied evenly, tinting the whole
         * GameObject. Default 0xffffff.
         *
         * @param topRight — The tint being applied to the top-right of the Game Object.
         * @param bottomLeft — The tint being applied to the bottom-left of the Game Object.
         * @param bottomRight — The tint being applied to the bottom-right of the Game Object.
         */
        MxTintComponentWrapper.prototype.setTint = function (_topLeft, _topRight, _bottomLeft, _bottomRight) {
            this._m_goComponent_tint.setTint(_topLeft, _topRight, _bottomLeft, _bottomRight);
            return;
        };
        /**
         * Sets a fill-based tint on this Game Object.
         *
         * Unlike an additive tint, a fill-tint literally replaces the pixel colors from the texture with those in the tint. You can use this for effects such as making a
         * player flash 'white' if hit by something. You can provide either one color value, in which case the whole Game Object will be rendered in that color. Or you
         * can provide a color per corner. The colors are blended together across the extent of the Game Object.
         *
         * To modify the tint color once set, either call this method again with new values or use the tint property to set all colors at once. Or, use the properties
         * tintTopLeft, tintTopRight,tintBottomLeftandtintBottomRight` to set the corner color values independently.
         *
         * To remove a tint call clearTint.
         * To swap this from being a fill-tint to an additive tint set the property tintFill to false.
         *
         * @param topLeft — The tint being applied to the top-left of the Game Object. If not other values are given this value is applied evenly, tinting the whole Game
         * Object. Default 0xffffff.
         * @param topRight — The tint being applied to the top-right of the Game Object.
         * @param bottomLeft — The tint being applied to the bottom-left of the Game Object.
         * @param bottomRight — The tint being applied to the bottom-right of the Game Object.
         */
        MxTintComponentWrapper.prototype.setTintFill = function (_topLeft, _topRight, _bottomLeft, _bottomRight) {
            this._m_goComponent_tint.setTintFill(_topLeft, _topRight, _bottomLeft, _bottomRight);
            return;
        };
        /**
         * The tint value being applied to the whole of the Game Object.
         * This property is a setter-only. Use the properties tintTopLeft etc to
         * read the current tint value.
         */
        MxTintComponentWrapper.prototype.getTint = function () {
            return this._m_goComponent_tint.tint;
        };
        return MxTintComponentWrapper;
    }());
    exports.MxTintComponentWrapper = MxTintComponentWrapper;
});
define("behaviour/components/cmpBitmapText", ["require", "exports", "commons/mxEnums", "behaviour/mxComponent", "behaviour/components/phaserComponentWrapper/mxCommonComponentsWrapper", "commons/mxMixin", "behaviour/components/phaserComponentWrapper/mxAlphaComponentWrapper", "behaviour/components/phaserComponentWrapper/mxOriginComponentWrapper", "behaviour/components/phaserComponentWrapper/mxTintComponentWrapper"], function (require, exports, mxEnums_7, mxComponent_5, mxCommonComponentsWrapper_1, mxMixin_1, mxAlphaComponentWrapper_1, mxOriginComponentWrapper_1, mxTintComponentWrapper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmpBitmapText = /** @class */ (function (_super) {
        __extends(CmpBitmapText, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function CmpBitmapText() {
            var _this = _super.call(this, mxEnums_7.COMPONENT_ID.kBitmapText) || this;
            return _this;
        }
        CmpBitmapText.prototype.prepare = function (_bitmapText) {
            this._m_bitmap_text = _bitmapText;
            this._m_goComponents_base = this._m_bitmap_text;
            this._m_goComponent_alpha = this._m_bitmap_text;
            this._m_goComponent_origin = this._m_bitmap_text;
            this._m_goComponent_tint = this._m_bitmap_text;
            return;
        };
        /**
         * Updates the position of the Phaser GameObject.
         *
         * @param _actor
         */
        CmpBitmapText.prototype.update = function (_actor) {
            this.updatePosition(_actor);
            return;
        };
        CmpBitmapText.prototype.receive = function (_id, _data) {
            if (_id == mxEnums_7.MESSAGE_ID.kOnAgentActive) {
                this.setVisible(true);
                this.setActive(true);
                return;
            }
            else if (_id == mxEnums_7.MESSAGE_ID.kOnAgentDesactive) {
                this.setVisible(false);
                this.setActive(false);
                return;
            }
        };
        /**
         *
         * @param _size
         */
        CmpBitmapText.prototype.setFontSize = function (_size) {
            this._m_bitmap_text.setFontSize(_size);
            return;
        };
        CmpBitmapText.prototype.setLeftAlign = function () {
            this._m_bitmap_text.setLeftAlign();
            return;
        };
        CmpBitmapText.prototype.setRightAlign = function () {
            this._m_bitmap_text.setRightAlign();
            return;
        };
        CmpBitmapText.prototype.setCenterAlign = function () {
            this._m_bitmap_text.setCenterAlign();
            return;
        };
        /**
         *
         * @param _text
         */
        CmpBitmapText.prototype.setText = function (_text) {
            this._m_bitmap_text.text = _text;
            return;
        };
        CmpBitmapText.prototype.setBitmapTextObject = function (_text) {
            this._m_bitmap_text = _text;
            return;
        };
        CmpBitmapText.prototype.getBitmapTextObject = function () {
            var go = this._m_bitmap_text;
            return this._m_bitmap_text;
        };
        /**
        * Sets the maximum display width of this BitmapText in pixels.
        *
        * If BitmapText.text is longer than maxWidth then the lines will be automatically wrapped based on the previous whitespace character found in the line.
        *
        * If no whitespace was found then no wrapping will take place and consequently the maxWidth value will not be honored.
        *
        * Disable maxWidth by setting the value to 0.
        */
        CmpBitmapText.prototype.setMaxWidth = function (_width) {
            this._m_bitmap_text.setMaxWidth(_width);
            return;
        };
        CmpBitmapText.prototype.setActive = function (_active) {
            this._m_bitmap_text.setActive(_active);
            return;
        };
        CmpBitmapText.prototype.destroy = function () {
            this._m_bitmap_text.destroy();
            this._m_goComponents_base = null;
            this._m_goComponent_alpha = null;
            this._m_goComponent_origin = null;
            this._m_goComponent_tint = null;
            _super.prototype.destroy.call(this);
            return;
        };
        return CmpBitmapText;
    }(mxComponent_5.MxComponent));
    exports.CmpBitmapText = CmpBitmapText;
    ;
    mxMixin_1.MxMixin.applyMixins(CmpBitmapText, [
        mxCommonComponentsWrapper_1.MxCommonComponentsWrapper,
        mxAlphaComponentWrapper_1.MxAlphaComponentWrapper,
        mxOriginComponentWrapper_1.MxOriginComponentWrapper,
        mxTintComponentWrapper_1.MxTintComponentWrapper
    ]);
});
define("behaviour/components/phaserComponentWrapper/mxAlphaSingleComponentWrapper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxAlphaSingleComponentWrapper = /** @class */ (function () {
        function MxAlphaSingleComponentWrapper() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Set the Alpha level of this Game Object. The alpha controls the opacity of
         * the Game Object as it renders. Alpha values are provided as a float between 0,
         * fully transparent, and 1, fully opaque.
         *
         * @param value — The alpha value applied across the whole Game Object. Default 1.
         */
        MxAlphaSingleComponentWrapper.prototype.setAlpha = function (_value) {
            this._m_goComponent_alphaSingle.setAlpha(_value);
            return;
        };
        /**
         * The alpha value of the Game Object.
         * This is a global value, impacting the entire Game Object, not just a region of it.
         */
        MxAlphaSingleComponentWrapper.prototype.getAlpha = function () {
            return this._m_goComponent_alphaSingle.alpha;
        };
        /**
         * Clears all alpha values associated with this Game Object.
         * Immediately sets the alpha levels back to 1 (fully opaque).
         */
        MxAlphaSingleComponentWrapper.prototype.clearAlpha = function () {
            this._m_goComponent_alphaSingle.clearAlpha();
            return;
        };
        return MxAlphaSingleComponentWrapper;
    }());
    exports.MxAlphaSingleComponentWrapper = MxAlphaSingleComponentWrapper;
});
define("behaviour/components/cmpGraphics", ["require", "exports", "commons/mxEnums", "behaviour/mxComponent", "commons/mxMixin", "behaviour/components/phaserComponentWrapper/mxCommonComponentsWrapper", "behaviour/components/phaserComponentWrapper/mxAlphaSingleComponentWrapper"], function (require, exports, mxEnums_8, mxComponent_6, mxMixin_2, mxCommonComponentsWrapper_2, mxAlphaSingleComponentWrapper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmpGraphics = /** @class */ (function (_super) {
        __extends(CmpGraphics, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function CmpGraphics() {
            var _this = _super.call(this, mxEnums_8.COMPONENT_ID.kGraphics) || this;
            return _this;
        }
        CmpGraphics.prototype.prepare = function (_scene) {
            this._m_graphic = _scene.add.graphics();
            this._m_goComponents_base = this._m_graphic;
            this._m_goComponent_alphaSingle = this._m_graphic;
            return;
        };
        CmpGraphics.prototype.receive = function (_id, _data) {
            if (_id == mxEnums_8.MESSAGE_ID.kOnAgentActive) {
                this.setVisible(true);
                this.setActive(true);
                return;
            }
            else if (_id == mxEnums_8.MESSAGE_ID.kOnAgentDesactive) {
                this.setVisible(false);
                this.setActive(false);
                return;
            }
        };
        CmpGraphics.prototype.getGraphic = function () {
            return this._m_graphic;
        };
        CmpGraphics.prototype.setTexture = function (_texture_key) {
            this._m_graphic.setTexture(_texture_key);
            return;
        };
        /**
         *
         */
        CmpGraphics.prototype.setInteractive = function () {
            this._m_graphic.setInteractive();
            return;
        };
        /**
         *
         * @param _event
         * @param _fn
         * @param _context
         */
        CmpGraphics.prototype.on = function (_event, _fn, _context) {
            this._m_graphic.on(_event, _fn, _context);
            return;
        };
        CmpGraphics.prototype.setActive = function (_active) {
            this._m_graphic.setActive(_active);
            return;
        };
        CmpGraphics.prototype.destroy = function () {
            this._m_graphic.destroy();
            this._m_goComponent_alphaSingle = null;
            this._m_goComponents_base = null;
            _super.prototype.destroy.call(this);
            return;
        };
        return CmpGraphics;
    }(mxComponent_6.MxComponent));
    exports.CmpGraphics = CmpGraphics;
    ;
    mxMixin_2.MxMixin.applyMixins(CmpGraphics, [mxCommonComponentsWrapper_2.MxCommonComponentsWrapper, mxAlphaSingleComponentWrapper_1.MxAlphaSingleComponentWrapper]);
});
define("behaviour/components/cmpNineSlice", ["require", "exports", "commons/mxEnums", "behaviour/mxComponent", "behaviour/components/phaserComponentWrapper/mxCommonComponentsWrapper", "behaviour/components/phaserComponentWrapper/mxAlphaComponentWrapper", "behaviour/components/phaserComponentWrapper/mxOriginComponentWrapper", "behaviour/components/phaserComponentWrapper/mxTintComponentWrapper", "commons/mxMixin"], function (require, exports, mxEnums_9, mxComponent_7, mxCommonComponentsWrapper_3, mxAlphaComponentWrapper_2, mxOriginComponentWrapper_2, mxTintComponentWrapper_2, mxMixin_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmpNineSlice = /** @class */ (function (_super) {
        __extends(CmpNineSlice, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function CmpNineSlice() {
            var _this = _super.call(this, mxEnums_9.COMPONENT_ID.kNineSlice) || this;
            return _this;
        }
        CmpNineSlice.prototype.prepare = function (_scene, _texture, _frame, _offsets) {
            var texture = _scene.game.textures.get(_texture);
            var frame = texture.get(_frame);
            // sets the minimum size from the original texture
            this._m_min_width = frame.width;
            this._m_min_height = frame.height;
            // Create nineslice texture
            this._m_texture = _scene.add.nineslice(0, 0, this._m_min_width, this._m_min_height, { key: _texture, frame: _frame }, _offsets);
            this._m_texture.setOrigin(0.5, 0.5);
            this._m_goComponents_base = this._m_texture;
            this._m_goComponent_alpha = this._m_texture;
            this._m_goComponent_origin = this._m_texture;
            this._m_goComponent_tint = this._m_texture;
            return;
        };
        CmpNineSlice.prototype.update = function (_actor) {
            this.updatePosition(_actor);
            return;
        };
        CmpNineSlice.prototype.receive = function (_id, _data) {
            if (_id == mxEnums_9.MESSAGE_ID.kOnAgentActive) {
                this.setVisible(true);
                this.setActive(true);
                return;
            }
            else if (_id == mxEnums_9.MESSAGE_ID.kOnAgentDesactive) {
                this.setVisible(false);
                this.setActive(false);
                return;
            }
        };
        CmpNineSlice.prototype.setInteractive = function () {
            this._m_texture.setInteractive();
            return;
        };
        CmpNineSlice.prototype.on = function (_event, _fn, _context) {
            this._m_texture.on(_event, _fn, _context);
            return;
        };
        CmpNineSlice.prototype.resize = function (_width, _height) {
            this._m_texture.resize(_width, _height);
            return;
        };
        CmpNineSlice.prototype.getMinSize = function () {
            return new Phaser.Geom.Point(this._m_min_width, this._m_min_height);
        };
        CmpNineSlice.prototype.setTexture = function (_texture_key) {
            return;
        };
        CmpNineSlice.prototype.setFrame = function (_frame) {
            return;
        };
        CmpNineSlice.prototype.getTexture = function () {
            return this._m_texture;
        };
        CmpNineSlice.prototype.setActive = function (_active) {
            this._m_texture.setActive(_active);
            return;
        };
        CmpNineSlice.prototype.destroy = function () {
            this._m_texture.destroy();
            this._m_goComponents_base = null;
            this._m_goComponent_alpha = null;
            this._m_goComponent_origin = null;
            this._m_goComponent_tint = null;
            _super.prototype.destroy.call(this);
            return;
        };
        return CmpNineSlice;
    }(mxComponent_7.MxComponent));
    exports.CmpNineSlice = CmpNineSlice;
    ;
    mxMixin_3.MxMixin.applyMixins(CmpNineSlice, [
        mxCommonComponentsWrapper_3.MxCommonComponentsWrapper,
        mxAlphaComponentWrapper_2.MxAlphaComponentWrapper,
        mxOriginComponentWrapper_2.MxOriginComponentWrapper,
        mxTintComponentWrapper_2.MxTintComponentWrapper
    ]);
});
define("behaviour/components/phaserComponentWrapper/mxComputedSizeComponentWrapper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxComputedSizeComponentWrapper = /** @class */ (function () {
        function MxComputedSizeComponentWrapper() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Sets the internal size of this Game Object, as used for frame or physics body creation.
         *
         * This will not change the size that the Game Object is rendered in-game. For that you need to either set the scale of the Game Object (setScale) or call the
         * setDisplaySize method, which is the same thing as changing the scale but allows you to do so by giving pixel values.
         *
         * If you have enabled this Game Object for input, changing the size will not change the size of the hit area. To do this you should adjust the input.hitArea.
         * object directly.
         *
         * @param _width — The width of this Game Object.
         */
        MxComputedSizeComponentWrapper.prototype.setSize = function (_width, _height) {
            this._m_goComponent_computedSize.setSize(_width, _height);
            return;
        };
        /**
         * Sets the display size of this Game Object.
         * Calling this will adjust the scale.
         *
         * @param _width — The width of this Game Object.
         * @param _height — The height of this Game Object.
         */
        MxComputedSizeComponentWrapper.prototype.setDisplaySize = function (_widht, _height) {
            this._m_goComponent_computedSize.setDisplaySize(_widht, _height);
            return;
        };
        /**
         * The native (un-scaled) height of this Game Object.
         * Changing this value will not change the size that the Game Object is rendered in-game. For that you need to either set the scale of the Game Object (setScale)
         * or use the displayHeight property.
         */
        MxComputedSizeComponentWrapper.prototype.getHeight = function () {
            return this._m_goComponent_computedSize.height;
        };
        /**
         * The native (un-scaled) width of this Game Object.
         * Changing this value will not change the size that the Game Object is rendered in-game. For that you need to either set the scale of the Game Object (setScale)
         * or use the displayHeight property.
         */
        MxComputedSizeComponentWrapper.prototype.getWidth = function () {
            return this._m_goComponent_computedSize.width;
        };
        /**
         * The displayed height of this Game Object.
         * This value takes into account the scale factor.
         * Setting this value will adjust the Game Object's scale property.
         */
        MxComputedSizeComponentWrapper.prototype.getDisplayHeight = function () {
            return this._m_goComponent_computedSize.displayHeight;
        };
        /**
         * The displayed width of this Game Object.
         * This value takes into account the scale factor.
         * Setting this value will adjust the Game Object's scale property.
         */
        MxComputedSizeComponentWrapper.prototype.getDisplayWidth = function () {
            return this._m_goComponent_computedSize.displayWidth;
        };
        /**
         * The native (un-scaled) size of this Game Object.
         */
        MxComputedSizeComponentWrapper.prototype.getSize = function () {
            return new Phaser.Math.Vector2(this._m_goComponent_computedSize.width, this._m_goComponent_computedSize.height);
        };
        /**
         * The displayed size of this Game Object.
         * This value takes into account the scale factor.
         * */
        MxComputedSizeComponentWrapper.prototype.getDisplaySize = function () {
            return new Phaser.Math.Vector2(this._m_goComponent_computedSize.displayWidth, this._m_goComponent_computedSize.displayHeight);
        };
        return MxComputedSizeComponentWrapper;
    }());
    exports.MxComputedSizeComponentWrapper = MxComputedSizeComponentWrapper;
});
define("behaviour/components/cmpShader", ["require", "exports", "commons/mxEnums", "behaviour/mxComponent", "behaviour/components/phaserComponentWrapper/mxCommonComponentsWrapper", "behaviour/components/phaserComponentWrapper/mxOriginComponentWrapper", "commons/mxMixin", "behaviour/components/phaserComponentWrapper/mxComputedSizeComponentWrapper", "commons/mxAssert"], function (require, exports, mxEnums_10, mxComponent_8, mxCommonComponentsWrapper_4, mxOriginComponentWrapper_3, mxMixin_4, mxComputedSizeComponentWrapper_1, mxAssert_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmpShader = /** @class */ (function (_super) {
        __extends(CmpShader, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function CmpShader() {
            var _this = _super.call(this, mxEnums_10.COMPONENT_ID.kShader) || this;
            return _this;
        }
        CmpShader.prototype.prepare = function (_shader) {
            this._m_shader = _shader;
            this._m_goComponent_computedSize = this._m_shader;
            this._m_goComponents_base = this._m_shader;
            this._m_goComponent_origin = this._m_shader;
            return;
        };
        CmpShader.prototype.update = function (_actor) {
            this.updatePosition(_actor);
            return;
        };
        CmpShader.prototype.receive = function (_id, _data) {
            if (_id == mxEnums_10.MESSAGE_ID.kOnAgentActive) {
                this.setVisible(true);
                this.setActive(true);
                return;
            }
            else if (_id == mxEnums_10.MESSAGE_ID.kOnAgentDesactive) {
                this.setVisible(false);
                this.setActive(false);
                return;
            }
        };
        CmpShader.prototype.setUniform = function (_uniform, _value) {
            this._m_shader.setUniform(_uniform, _value);
            return;
        };
        CmpShader.prototype.setMask = function (_mask) {
            this._m_shader.setMask(_mask);
            return;
        };
        CmpShader.prototype.createMask = function () {
            return this._m_shader.createBitmapMask();
        };
        CmpShader.prototype.getShader = function () {
            return this._m_shader;
        };
        /**
         *
         */
        CmpShader.prototype.setInteractive = function () {
            this._m_shader.setInteractive();
            return;
        };
        /**
         *
         * @param _event
         * @param _fn
         * @param _context
         */
        CmpShader.prototype.on = function (_event, _fn, _context) {
            this._m_shader.on(_event, _fn, _context);
            return;
        };
        CmpShader.prototype.setActive = function (_active) {
            this._m_shader.setActive(_active);
            return;
        };
        CmpShader.prototype.initUniform = function (_key) {
            mxAssert_5.MxAssert.String(_key);
            mxAssert_5.MxAssert.Object(this._m_shader);
            var gl = this._m_shader.gl;
            var renderer = this._m_shader.renderer;
            var map = renderer.glFuncMap;
            var program = this._m_shader.program;
            var uniform = this._m_shader.getUniform(_key);
            if (uniform == null) {
                return;
            }
            var type = uniform.type;
            var data = map[type];
            uniform.uniformLocation = gl.getUniformLocation(program, _key);
            if (type !== 'sampler2D') {
                uniform.glMatrix = data.matrix;
                uniform.glValueLength = data.length;
                uniform.glFunc = data.func;
            }
            return;
        };
        CmpShader.prototype.destroy = function () {
            this._m_shader.destroy();
            this._m_goComponent_computedSize = null;
            this._m_goComponents_base = null;
            this._m_goComponent_origin = null;
            _super.prototype.destroy.call(this);
            return;
        };
        return CmpShader;
    }(mxComponent_8.MxComponent));
    exports.CmpShader = CmpShader;
    ;
    mxMixin_4.MxMixin.applyMixins(CmpShader, [
        mxCommonComponentsWrapper_4.MxCommonComponentsWrapper,
        mxOriginComponentWrapper_3.MxOriginComponentWrapper,
        mxComputedSizeComponentWrapper_1.MxComputedSizeComponentWrapper
    ]);
});
define("behaviour/components/phaserComponentWrapper/mxSizeComponenWrappert", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxSizeComponentWrapper = /** @class */ (function () {
        function MxSizeComponentWrapper() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Sets the internal size of this Game Object, as used for frame or physics body creation.
         *
         * This will not change the size that the Game Object is rendered in-game. For that you need to either set the scale of the Game Object (setScale) or call the
         * setDisplaySize method, which is the same thing as changing the scale but allows you to do so by giving pixel values.
         *
         * If you have enabled this Game Object for input, changing the size will not change the size of the hit area. To do this you should adjust the input.hitArea.
         * object directly.
         *
         * @param _width — The width of this Game Object.
         */
        MxSizeComponentWrapper.prototype.setSize = function (_width, _height) {
            this._m_goComponent_size.setSize(_width, _height);
            return;
        };
        /**
         * Sets the display size of this Game Object.
         * Calling this will adjust the scale.
         *
         * @param _width — The width of this Game Object.
         * @param _height — The height of this Game Object.
         */
        MxSizeComponentWrapper.prototype.setDisplaySize = function (_widht, _height) {
            this._m_goComponent_size.setDisplaySize(_widht, _height);
            return;
        };
        /**
         * The native (un-scaled) height of this Game Object.
         * Changing this value will not change the size that the Game Object is rendered in-game. For that you need to either set the scale of the Game Object (setScale)
         * or use the displayHeight property.
         */
        MxSizeComponentWrapper.prototype.getHeight = function () {
            return this._m_goComponent_size.height;
        };
        /**
         * The native (un-scaled) width of this Game Object.
         * Changing this value will not change the size that the Game Object is rendered in-game. For that you need to either set the scale of the Game Object (setScale)
         * or use the displayHeight property.
         */
        MxSizeComponentWrapper.prototype.getWidth = function () {
            return this._m_goComponent_size.width;
        };
        /**
         * The displayed height of this Game Object.
         * This value takes into account the scale factor.
         * Setting this value will adjust the Game Object's scale property.
         */
        MxSizeComponentWrapper.prototype.getDisplayHeight = function () {
            return this._m_goComponent_size.displayHeight;
        };
        /**
         * The displayed width of this Game Object.
         * This value takes into account the scale factor.
         * Setting this value will adjust the Game Object's scale property.
         */
        MxSizeComponentWrapper.prototype.getDisplayWidth = function () {
            return this._m_goComponent_size.displayWidth;
        };
        /**
         * The native (un-scaled) size of this Game Object.
         */
        MxSizeComponentWrapper.prototype.getSize = function () {
            return new Phaser.Math.Vector2(this._m_goComponent_size.width, this._m_goComponent_size.height);
        };
        /**
         * The displayed size of this Game Object.
         * This value takes into account the scale factor.
         * */
        MxSizeComponentWrapper.prototype.getDisplaySize = function () {
            return new Phaser.Math.Vector2(this._m_goComponent_size.displayWidth, this._m_goComponent_size.displayHeight);
        };
        return MxSizeComponentWrapper;
    }());
    exports.MxSizeComponentWrapper = MxSizeComponentWrapper;
});
define("behaviour/components/cmpSprite", ["require", "exports", "commons/mxEnums", "behaviour/mxComponent", "behaviour/components/phaserComponentWrapper/mxCommonComponentsWrapper", "behaviour/components/phaserComponentWrapper/mxAlphaComponentWrapper", "behaviour/components/phaserComponentWrapper/mxOriginComponentWrapper", "behaviour/components/phaserComponentWrapper/mxTintComponentWrapper", "behaviour/components/phaserComponentWrapper/mxSizeComponenWrappert", "commons/mxMixin"], function (require, exports, mxEnums_11, mxComponent_9, mxCommonComponentsWrapper_5, mxAlphaComponentWrapper_3, mxOriginComponentWrapper_4, mxTintComponentWrapper_3, mxSizeComponenWrappert_1, mxMixin_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmpSprite = /** @class */ (function (_super) {
        __extends(CmpSprite, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function CmpSprite() {
            var _this = _super.call(this, mxEnums_11.COMPONENT_ID.kSprite) || this;
            return _this;
        }
        CmpSprite.prototype.prepare = function (_sprite) {
            this._m_sprite = _sprite;
            this._m_goComponents_base = this._m_sprite;
            this._m_goComponent_alpha = this._m_sprite;
            this._m_goComponent_origin = this._m_sprite;
            this._m_goComponent_size = this._m_sprite;
            this._m_goComponent_tint = this._m_sprite;
            return;
        };
        CmpSprite.prototype.update = function (_actor) {
            this.updatePosition(_actor);
            return;
        };
        CmpSprite.prototype.receive = function (_id, _data) {
            if (_id == mxEnums_11.MESSAGE_ID.kOnAgentActive) {
                this.setVisible(true);
                this.setActive(true);
                return;
            }
            else if (_id == mxEnums_11.MESSAGE_ID.kOnAgentDesactive) {
                this.setVisible(false);
                this.setActive(false);
                return;
            }
        };
        CmpSprite.prototype.setTexture = function (_texture_key) {
            this._m_sprite.setTexture(_texture_key);
            return;
        };
        CmpSprite.prototype.setFrame = function (_frame) {
            this._m_sprite.setFrame(_frame);
            return;
        };
        CmpSprite.prototype.setMask = function (_mask) {
            this._m_sprite.setMask(_mask);
            return;
        };
        CmpSprite.prototype.createMask = function () {
            return this._m_sprite.createBitmapMask();
        };
        CmpSprite.prototype.getSprite = function () {
            return this._m_sprite;
        };
        /**
         *
         */
        CmpSprite.prototype.setInteractive = function () {
            this._m_sprite.setInteractive();
            return;
        };
        /**
         *
         * @param _event
         * @param _fn
         * @param _context
         */
        CmpSprite.prototype.on = function (_event, _fn, _context) {
            this._m_sprite.on(_event, _fn, _context);
            return;
        };
        CmpSprite.prototype.setActive = function (_active) {
            this._m_sprite.setActive(_active);
            return;
        };
        CmpSprite.prototype.destroy = function () {
            this._m_sprite.destroy();
            this._m_goComponents_base = null;
            this._m_goComponent_alpha = null;
            this._m_goComponent_origin = null;
            this._m_goComponent_size = null;
            this._m_goComponent_tint = null;
            _super.prototype.destroy.call(this);
            return;
        };
        return CmpSprite;
    }(mxComponent_9.MxComponent));
    exports.CmpSprite = CmpSprite;
    ;
    mxMixin_5.MxMixin.applyMixins(CmpSprite, [
        mxCommonComponentsWrapper_5.MxCommonComponentsWrapper,
        mxAlphaComponentWrapper_3.MxAlphaComponentWrapper,
        mxOriginComponentWrapper_4.MxOriginComponentWrapper,
        mxTintComponentWrapper_3.MxTintComponentWrapper,
        mxSizeComponenWrappert_1.MxSizeComponentWrapper
    ]);
});
define("behaviour/components/cmpText", ["require", "exports", "commons/mxEnums", "behaviour/mxComponent", "commons/mxMixin", "behaviour/components/phaserComponentWrapper/mxCommonComponentsWrapper", "behaviour/components/phaserComponentWrapper/mxAlphaComponentWrapper", "behaviour/components/phaserComponentWrapper/mxComputedSizeComponentWrapper", "behaviour/components/phaserComponentWrapper/mxTintComponentWrapper", "behaviour/components/phaserComponentWrapper/mxOriginComponentWrapper"], function (require, exports, mxEnums_12, mxComponent_10, mxMixin_6, mxCommonComponentsWrapper_6, mxAlphaComponentWrapper_4, mxComputedSizeComponentWrapper_2, mxTintComponentWrapper_4, mxOriginComponentWrapper_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmpText = /** @class */ (function (_super) {
        __extends(CmpText, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function CmpText() {
            var _this = _super.call(this, mxEnums_12.COMPONENT_ID.kText) || this;
            return _this;
        }
        CmpText.prototype.prepare = function (_scene, _text, _style) {
            this._m_text = _scene.add.text(0, 0, _text, _style);
            this._m_goComponents_base = this._m_text;
            this._m_goComponent_alpha = this._m_text;
            this._m_goComponent_computedSize = this._m_text;
            this._m_goComponent_origin = this._m_text;
            this._m_goComponent_tint = this._m_text;
            return;
        };
        CmpText.prototype.update = function (_actor) {
            this.updatePosition(_actor);
            return;
        };
        CmpText.prototype.receive = function (_id, _data) {
            if (_id == mxEnums_12.MESSAGE_ID.kOnAgentActive) {
                this.setVisible(true);
                this.setActive(true);
                return;
            }
            else if (_id == mxEnums_12.MESSAGE_ID.kOnAgentDesactive) {
                this.setVisible(false);
                this.setActive(false);
                return;
            }
        };
        /**
         *
         * @param _size
         */
        CmpText.prototype.setFontSize = function (_size) {
            this._m_text.setFontSize(_size);
            return;
        };
        /**
         *
         * @param _color
         */
        CmpText.prototype.setFontColor = function (_color) {
            this._m_text.setColor(_color);
            return;
        };
        /**
         *
         * @param _color
         */
        CmpText.prototype.setTint = function (_color) {
            this._m_text.setTint(_color);
            return;
        };
        /**
         * Set the alignment of the text in this Text object.
        * The argument can be one of: left, right, center or justify.
        * Alignment only works if the Text object has more than one line of text.
        *
        * @param align — The text alignment for multi-line text. Default 'left'.
         */
        CmpText.prototype.setAlign = function (_align) {
            if (_align === void 0) { _align = "left"; }
            this._m_text.setAlign(_align);
            return;
        };
        /**
         *
         * @param _text
         */
        CmpText.prototype.setText = function (_text) {
            this._m_text.text = _text;
            return;
        };
        CmpText.prototype.setTextObject = function (_text) {
            this._m_text = _text;
            return;
        };
        CmpText.prototype.getTextObject = function () {
            return this._m_text;
        };
        /**
        * Set the width (in pixels) to use for wrapping lines. Pass in null to remove wrapping by width.
        *
        * @param _width — The maximum width of a line in pixels. Set to null to remove wrapping.
        *
        * @param _useAdvancedWrap — Whether or not to use the advanced wrapping algorithm.
        * If true, spaces are collapsed and whitespace is trimmed from lines. If false,
        * spaces and whitespace are left as is. Default false.
        */
        CmpText.prototype.setWordWrapWidth = function (_width, _useAdvanceWrap) {
            if (_useAdvanceWrap === void 0) { _useAdvanceWrap = false; }
            this._m_text.setWordWrapWidth(_width, _useAdvanceWrap);
            return;
        };
        CmpText.prototype.setActive = function (_active) {
            this._m_text.setActive(_active);
            return;
        };
        CmpText.prototype.destroy = function () {
            this._m_text.destroy();
            this._m_goComponents_base = null;
            this._m_goComponent_alpha = null;
            this._m_goComponent_computedSize = null;
            this._m_goComponent_origin = null;
            this._m_goComponent_tint = null;
            _super.prototype.destroy.call(this);
            return;
        };
        return CmpText;
    }(mxComponent_10.MxComponent));
    exports.CmpText = CmpText;
    ;
    mxMixin_6.MxMixin.applyMixins(CmpText, [
        mxCommonComponentsWrapper_6.MxCommonComponentsWrapper,
        mxAlphaComponentWrapper_4.MxAlphaComponentWrapper,
        mxOriginComponentWrapper_5.MxOriginComponentWrapper,
        mxTintComponentWrapper_4.MxTintComponentWrapper,
        mxComputedSizeComponentWrapper_2.MxComputedSizeComponentWrapper
    ]);
});
define("commons/mxDateTime", ["require", "exports", "commons/mxAssert"], function (require, exports, mxAssert_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxDateTime = /** @class */ (function () {
        function MxDateTime() {
        }
        /**
         * Generate a string with the time format HH : MM : SS, based on the given
         * seconds.
         * @param _seconds number on seconds.
         */
        MxDateTime.GetHHMMSS = function (_seconds) {
            mxAssert_6.MxAssert.Number(_seconds);
            _seconds = Math.floor(_seconds);
            var hours = Math.floor(_seconds / 3600);
            var minutes = Math.floor((_seconds - (hours * 3600)) / 60);
            var seconds = _seconds - (hours * 3600) - (minutes * 60);
            var time = "";
            // Hours
            if (hours < 10) {
                time += "0" + hours;
            }
            else {
                time += hours;
            }
            time += ' : ';
            // Minutes
            if (minutes < 10) {
                time += "0" + minutes;
            }
            else {
                time += minutes;
            }
            time += ' : ';
            // Seconds
            if (seconds < 10) {
                time += "0" + seconds;
            }
            else {
                time += seconds;
            }
            return time;
        };
        /**
         * Generate a string with the time format MM : SS, based on the given
         * seconds.
         * @param _seconds number on seconds.
         */
        MxDateTime.GetMMSS = function (_seconds) {
            mxAssert_6.MxAssert.Number(_seconds);
            _seconds = Math.floor(_seconds);
            var hours = Math.floor(_seconds / 3600);
            var minutes = Math.floor((_seconds - (hours * 3600)) / 60);
            var seconds = _seconds - (hours * 3600) - (minutes * 60);
            var time = "";
            // Minutes
            if (minutes < 10) {
                time += "0" + minutes;
            }
            else {
                time += minutes;
            }
            time += ' : ';
            // Seconds
            if (seconds < 10) {
                time += "0" + seconds;
            }
            else {
                time += seconds;
            }
            return time;
        };
        return MxDateTime;
    }());
    exports.MxDateTime = MxDateTime;
});
define("commons/mxInterpolation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
      * Constructs new data from a range of discrete set of known
      * data points.
    */
    var MxInterpolation = /** @class */ (function () {
        function MxInterpolation() {
        }
        /****************************************************/
        /* Interpolations                                   */
        /****************************************************/
        /**
         * Constructs new data from a range of discrete set of known
         * data points.
         *
         * @param x1 Point 1: x value.
         * @param y1 Point 1: y value.
         * @param x2 Point 2: x value.
         * @param y2 Point 2: y value.
         * @param x  Interpolated Point: x value.
         *
         * @returns Interpolated Point: y value.
         */
        MxInterpolation.Linear = function (x1, y1, x2, y2, x) {
            return ((x - x1) * (y2 - y1) / (x2 - x1)) + y1;
        };
        /**
         * Performs the bilinear interpolation using the linear inteporlation in one
         * axis, and then again in the other.
         *
         * @param x1 Point 1 : x value.
         * @param y1 Point 1 : y value.
         * @param x2 Point 2 : x value.
         * @param y2 Point 2 : y value.
         * @param v1 Point 1 : point value.
         * @param v2 Point 2 : point value.
         * @param v3 Point 3 : point value.
         * @param v4 Point 4 : point value.
         * @param tx Interpolated Point : x value.
         * @param ty Interpolated Point : y value.
         *
         * @returns Interpolated Point: point value.
         */
        MxInterpolation.Bilinear = function (x1, y1, x2, y2, v1, v2, v3, v4, tx, ty) {
            //P1:{x1,y1,v1} - P2:{x2,y1,v2} - P3:{x1,y2,v3} - P4:{x2,y2,v4}
            //Target:{tx,ty}
            var area_v1 = Math.abs((tx - x1) * (ty - y1)) * v4;
            var area_v2 = Math.abs((tx - x2) * (ty - y1)) * v3;
            var area_v3 = Math.abs((tx - x1) * (ty - y2)) * v2;
            var area_v4 = Math.abs((tx - x2) * (ty - y2)) * v1;
            var area_total = (x2 - x1) * (y2 - y1);
            return (area_v1 + area_v2 + area_v3 + area_v4) / area_total;
        };
        return MxInterpolation;
    }());
    exports.MxInterpolation = MxInterpolation;
});
define("commons/mxMath", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxMath = /** @class */ (function () {
        function MxMath() {
        }
        /**
         * If the given value is less than the minimum value, it will return the minimum value,
         * otherwise it will return the given value.
         *
         * @param _value value to check.
         * @param _min minimum value.
         */
        MxMath.TruncateMinimum = function (_value, _min) {
            if (_value < _min) {
                return _min;
            }
            return _value;
        };
        /**
         * If the given value is less than the maximum value, it will return the maximum value,
         * otherwise it will return the given value.
         *
         * @param _value value to check.
         * @param _max maximum value.
         */
        MxMath.TruncatetMaximum = function (_value, _max) {
            if (_value > _max) {
                return _max;
            }
            return _value;
        };
        /**
         * If the value is outside the range, the function will return the maximum or
         * minimum value depending on the value, otherwise it will return the given
         * value.
         *
         * @param _value value to check.
         * @param _min minimum value.
         * @param _max maximum value.
         */
        MxMath.TruncateByRange = function (_value, _min, _max) {
            if (_value < _min) {
                _value = _min;
            }
            else if (_value > _max) {
                _value = _max;
            }
            return _value;
        };
        return MxMath;
    }());
    exports.MxMath = MxMath;
});
define("commons/mxPerlinNoise", ["require", "exports", "commons/mxInterpolation"], function (require, exports, mxInterpolation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxPerlinNoise = /** @class */ (function () {
        function MxPerlinNoise() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         *
         * @param _length
         * @param _n_octaves
         */
        MxPerlinNoise.Noise1D = function (_length, _frecuency_power, _amplitude_power, _n_octaves, _normalized) {
            if (_frecuency_power === void 0) { _frecuency_power = 2; }
            if (_amplitude_power === void 0) { _amplitude_power = 2; }
            if (_n_octaves === void 0) { _n_octaves = 6; }
            if (_normalized === void 0) { _normalized = false; }
            /**
             * Wave values.
             */
            var wave = new Float32Array(_length);
            var frecuency = 0;
            var amplitude = 0;
            for (var oct_idx = 1; oct_idx <= _n_octaves; ++oct_idx) {
                /**
                 * Octave Frecuency
                 */
                frecuency = Math.pow(_frecuency_power, oct_idx);
                /**
                 * Octave Amplitude
                 */
                amplitude = _length / Math.pow(_amplitude_power, oct_idx);
                if (frecuency > _length) {
                    break;
                }
                /**
                 * Apply Octave
                 */
                MxPerlinNoise.Octave(frecuency, amplitude, wave, _length);
            }
            if (_normalized) {
                /**
                * Normalize values
                */
                for (var index = 0; index < _length; ++index) {
                    wave[index] /= _length;
                }
            }
            return wave;
        };
        MxPerlinNoise.Noise2D = function (_length, _frecuency_power, _amplitude_power, _n_octaves, _normalized) {
            if (_frecuency_power === void 0) { _frecuency_power = 2; }
            if (_amplitude_power === void 0) { _amplitude_power = 2; }
            if (_n_octaves === void 0) { _n_octaves = 6; }
            if (_normalized === void 0) { _normalized = false; }
            var grid = new Array(_length);
            for (var index = 0; index < _length; ++index) {
                grid[index] = new Float32Array(_length);
            }
            var frecuency = 0;
            var amplitude = 0;
            var high_value = 0;
            for (var oct_idx = 1; oct_idx <= _n_octaves; ++oct_idx) {
                //frecuency = Math.pow(_frecuency_power, oct_idx);
                frecuency = _frecuency_power * oct_idx;
                //amplitude = _length / Math.pow(_amplitude_power, oct_idx);
                amplitude = _amplitude_power / oct_idx;
                high_value += amplitude;
                if (frecuency > _length) {
                    break;
                }
                MxPerlinNoise.Octave2D(frecuency, amplitude, grid, _length);
            }
            if (_normalized) {
                for (var row = 0; row < _length; ++row) {
                    for (var col = 0; col < _length; ++col) {
                        grid[row][col] /= high_value;
                    }
                }
            }
            return grid;
        };
        /**
         *
         * @param _frecuency
         * @param _amplitude
         * @param _length
         */
        MxPerlinNoise.Octave = function (_frecuency, _amplitude, _wave, _length) {
            var step = Math.floor(_length / _frecuency);
            /**
             *
             */
            var y1 = undefined;
            var y2 = undefined;
            var x1 = undefined;
            var x2 = undefined;
            for (var index = 0; index <= _length; index += step) {
                /**
                 * Generate a value randomly between [0 - amplitud].
                 */
                y2 = _amplitude - (Math.random() * _amplitude);
                /**
                 * adds this value to the wave
                 */
                _wave[index] += y2;
                /**
                 * Interpolate the inbetweens values form this node to the last node.
                 * Te substraction of the current index with the backstep determinate
                 * the first begining of the segment.
                 */
                if (y1 != undefined) {
                    x1 = index - (step - 1);
                    x2 = index;
                    for (var node = index - (step - 1); node < index; ++node) {
                        /**
                         * Get the linear interpolation at "node" position.
                         */
                        _wave[node] += mxInterpolation_1.MxInterpolation.Linear(x1, y1, x2, y2, node);
                    }
                }
                /**
                 * X1 es igual a x2
                 */
                y1 = y2;
            }
            return;
        };
        MxPerlinNoise.Octave2D = function (_frecuency, _amplitude, _wave, _length) {
            var grid = new Array(_frecuency);
            for (var index = 0; index <= _frecuency; ++index) {
                grid[index] = new Float32Array(_frecuency + 1);
            }
            var x1;
            var y1;
            var x2;
            var y2;
            var local_x1;
            var local_y1;
            var local_x2;
            var local_y2;
            var temp;
            // Interator over the grid.
            for (var row = 0; row <= _frecuency; ++row) {
                for (var col = 0; col <= _frecuency; ++col) {
                    grid[row][col] = _amplitude - (Math.random() * _amplitude);
                    // Check if node is not in first row or first column.
                    if (row > 0 && col > 0) {
                        x2 = col;
                        y2 = row;
                        x1 = x2 - 1;
                        y1 = y2 - 1;
                        local_x1 = (Math.floor((x1 / _frecuency) * _length));
                        local_x2 = (Math.floor((x2 / _frecuency) * _length));
                        local_y1 = (Math.floor((y1 / _frecuency) * _length));
                        local_y2 = (Math.floor((y2 / _frecuency) * _length));
                        for (var y = local_y1; y < local_y2; ++y) {
                            for (var x = local_x1; x < local_x2; ++x) {
                                temp =
                                    mxInterpolation_1.MxInterpolation.Bilinear(local_x1, local_y1, local_x2, local_y2, grid[y1][x1], grid[y1][x2], grid[y2][x1], grid[y2][x2], x, y);
                                _wave[y][x] += temp;
                            }
                        }
                    }
                }
            }
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        MxPerlinNoise.MAX_LENGHT = 256;
        return MxPerlinNoise;
    }());
    exports.MxPerlinNoise = MxPerlinNoise;
});
/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Implementation of the Halton Sequence, a low discrepancy and
 * deterministic algortihm that appear to be random.
 *
 * @file mxHalton.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-17-2020
 */
define("pseudoRandom/mxHalton", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implementation of the Halton Sequence, a low discrepancy and deterministic
     * algortihm that appear to be random.
     */
    var MxHalton = /** @class */ (function () {
        function MxHalton() {
        }
        /**
         * Generates a point set that appear to be random. They will be generated with
         * the Halton Sequence, wich is a low discrepancy algorithm.
         *
         * @param _size Number of points.
         * @param _baseX Base of the X axis.
         * @param _baseY Base of tye Y axis.
         *
         * @returns An array of generated points with the Halton Sequence.
         */
        MxHalton.GetPointSet = function (_size, _baseX, _baseY) {
            if (_baseX === undefined) {
                _baseX = 2;
            }
            if (_baseY === undefined) {
                _baseY = 3;
            }
            var pointSet = new Array();
            --_size;
            while (_size >= 0) {
                pointSet.push(new Phaser.Geom.Point(MxHalton.Halton(_size, _baseX), MxHalton.Halton(_size, _baseY)));
                --_size;
            }
            return pointSet;
        };
        /**
         * Halton sequence is a low discrepancy algorithm that appear to tbe random.
         *
         * @param _index index.
         * @param _base base.
         *
         * @returns result.
         */
        MxHalton.Halton = function (_index, _base) {
            var result = 0;
            var f = 1.0 / _base;
            var i = _index;
            while (i > 0) {
                result += f * (i % _base);
                i = Math.floor(i / _base);
                f = f / _base;
            }
            return result;
        };
        return MxHalton;
    }());
    exports.MxHalton = MxHalton;
});
define("ui/mxUI", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxUI = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function MxUI() {
            this._m_size = new Phaser.Geom.Point(0, 0);
            return;
        }
        MxUI.prototype.update = function (_dt) {
            return;
        };
        MxUI.prototype.setPosition = function (_x, _y) {
            return;
        };
        MxUI.prototype.move = function (_x, _y) {
            return;
        };
        /**
        * Safely destroys the object.
        */
        MxUI.prototype.destroy = function () {
            this._m_size = null;
            return;
        };
        /****************************************************/
        /* Protected                                        */
        /****************************************************/
        MxUI.prototype._getSprite_box = function (_scene) {
            var sprite;
            if (!_scene.textures.exists('_mx_ui_box')) {
                var texture = void 0;
                texture = _scene.add.graphics();
                texture.fillStyle(0xffffff);
                texture.fillRect(0, 0, 16, 16);
                texture.generateTexture('_mx_ui_box', 16, 16);
                texture.destroy();
            }
            sprite = _scene.add.sprite(0, 0, '_mx_ui_box');
            return sprite;
        };
        MxUI.prototype._getSprite_circle16 = function (_scene) {
            var sprite;
            if (!_scene.textures.exists('_mx_ui_circle_16')) {
                var texture = void 0;
                texture = _scene.add.graphics();
                texture.fillStyle(0xffffff);
                texture.fillCircle(0, 0, 16);
                texture.generateTexture('_mx_ui_circle_16');
                texture.destroy();
            }
            sprite = _scene.add.sprite(0, 0, '_mx_ui_circle_16');
            return sprite;
        };
        MxUI.prototype._get_text = function (_scene) {
            var text;
            text = _scene.add.text(0, 0, "text", { fontFamily: '"Roboto Condensed"' });
            text.setFontSize(24);
            text.setColor('white');
            return text;
        };
        return MxUI;
    }());
    exports.MxUI = MxUI;
});
define("ui/mxSlider", ["require", "exports", "ui/mxUI"], function (require, exports, mxUI_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxSlider = /** @class */ (function (_super) {
        __extends(MxSlider, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function MxSlider(_scene, _x, _y, _title) {
            if (_title === void 0) { _title = "Slider"; }
            var _this = _super.call(this) || this;
            _this._m_group = _scene.add.group();
            // Slider Background
            _this._m_bck = _this._getSprite_box(_scene);
            _this._m_bck.setScale(20, 2);
            _this._m_bck.setTint(0x000000);
            _this._m_bck.setAlpha(0.5);
            _this._m_bck.setInteractive();
            _this._m_bck.on('pointerdown', _this._onDown_slider, _this);
            _this._m_bck.setOrigin(0, 0);
            // Slider Size
            _this._m_size.x = _this._m_bck.width * _this._m_bck.scaleX;
            _this._m_size.y = _this._m_bck.height * _this._m_bck.scaleY;
            // Slider Fill
            _this._m_fill = _this._getSprite_box(_scene);
            _this._m_fill.setScale(0, 2);
            _this._m_fill.setTint(0xffa100);
            _this._m_fill.setOrigin(0, 0);
            // Slider Text
            _this._m_text = _this._get_text(_scene);
            _this._m_text.text = "100";
            _this._m_text.setOrigin(0.5, 0.5);
            _this._m_text.setPosition(_this._m_bck.x + _this._m_size.x * 0.5, _this._m_bck.y + _this._m_size.y * 0.5);
            // Slider Title
            _this._m_title = _this._get_text(_scene);
            _this._m_title.text = _title;
            _this._m_title.setOrigin(0, 1);
            _this._m_title.setPosition(_this._m_bck.x, _this._m_bck.y - 10);
            // Add group members
            _this._m_group.add(_this._m_title);
            _this._m_group.add(_this._m_text);
            _this._m_group.add(_this._m_bck);
            _this._m_group.add(_this._m_fill);
            _this.setValues(-1, 1);
            _this._resize_fill(0.5);
            _this.setPosition(_x, _y);
            _this._m_dragging = false;
            return _this;
        }
        MxSlider.prototype.setValues = function (_min, _max) {
            if (_max > _min) {
                this._m_min_value = _min;
                this._m_max_value = _max;
                this._m_delta_value = _max - _min;
            }
            return;
        };
        MxSlider.prototype.update = function (_dt) {
            if (this._m_dragging) {
                if (!this._m_pointer.isDown) {
                    this._m_dragging = !this._m_dragging;
                }
                this._onDrag(this._m_pointer);
            }
            return;
        };
        MxSlider.prototype.setPosition = function (_x, _y) {
            this.move(_x - this._m_bck.x, _y - this._m_bck.y);
            return;
        };
        MxSlider.prototype.move = function (_x, _y) {
            this._m_group.incXY(_x, _y);
            return;
        };
        MxSlider.prototype.getValue = function () {
            return this._m_value;
        };
        MxSlider.prototype.getFracValue = function () {
            return this._m_norm_value;
        };
        MxSlider.prototype.setValue = function (_value) {
            if (this._m_min_value <= _value && _value <= this._m_max_value) {
                var dt_value = (_value - this._m_min_value) / this._m_delta_value;
                this._resize_fill(dt_value);
            }
            return 0;
        };
        MxSlider.prototype.setFracValue = function (_value) {
            if (0 <= _value && _value <= 1) {
                this._resize_fill(_value);
            }
            return;
        };
        MxSlider.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._m_bck = null;
            this._m_fill = null;
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        MxSlider.prototype._resize_fill = function (_value) {
            this._m_fill.scaleX = _value * this._m_bck.scaleX;
            this._m_norm_value = _value;
            this._m_value
                = this._m_min_value + (this._m_norm_value * this._m_delta_value);
            this._m_text.text = this._m_value.toString();
            return;
        };
        MxSlider.prototype._onDown_slider = function (_pointer) {
            this._m_pointer = _pointer;
            this._m_dragging = true;
            this._onDrag(_pointer);
            return;
        };
        MxSlider.prototype._onDrag = function (_pointer) {
            var x = this._truncate(_pointer.x, this._m_bck.x, this._m_bck.x + this._m_size.x);
            x -= this._m_bck.x;
            x /= this._m_size.x;
            this._resize_fill(x);
            return;
        };
        MxSlider.prototype._truncate = function (_value, _min, _max) {
            if (_value > _max) {
                _value = _max;
            }
            else if (_value < _min) {
                _value = _min;
            }
            return _value;
        };
        return MxSlider;
    }(mxUI_1.MxUI));
    exports.MxSlider = MxSlider;
});
//# sourceMappingURL=mxUtilities.js.map