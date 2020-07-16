declare module "commons/mxUUID" {
    /**
     * Object with a unique UUID. This UUID is generated with the Phaser Utilities.
     */
    export class MxUUID {
        /****************************************************/
        /****************************************************/
        /**
         * Creates a new MxUUID instance, with a unique UUID.
         */
        static Create(): MxUUID;
        /**
         * Creates a new MxUUID instante, with the same UUID of a given MxUUID.
         * @param _mxUUID
         */
        static Clone(_mxUUID: MxUUID): MxUUID;
        /**
         * Get the UUID string.
         */
        getUUIDString(): string;
        /**
         * Compare the value of this MxUUID with other MxUUID.
         *
         * @param _id MxUUID that you want to check.
         *
         * @returns true if the MxUUID has the same value.
         */
        compare(_id: MxUUID): boolean;
        /****************************************************/
        /****************************************************/
        protected constructor();
        /**
         * UUID string, generated with the Phaser Utilities.
         */
        _m_id: string;
    }
}
declare module "gameObjects/mxUObject" {
    import { MxUUID } from "commons/mxUUID";
    /**
     * An MxUObject is a object that has a MxUUID to be identified. Other classes can
     * be extended from this one to have the UUID methods, that help to identify
     * objects.
     */
    export class MxUObject {
        /****************************************************/
        /****************************************************/
        constructor();
        /**
         * Gets this object's unique identifier object.
         */
        getUUID(): MxUUID;
        /**
         * Gets this object's unique indentifier in the string format.
         */
        getUUIDString(): string;
        /**
        * Safely destroys the object.
        */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * Object's unique identifier object.
         */
        protected _m_uuid: MxUUID;
    }
}
declare module "commons/mxAssert" {
    /**
     * Custon assert functions.
     *
     * @packageDocumentation
     */
    export class MxAssert {
        /**
         * Check if the giveb parameter is a string. Throws an error if not.
         *
         * @param _input
         */
        static String(_input: any): void;
        /**
         * Checks if the given parameter is a function. Throws an error if not.
         *
         * @param _input
         */
        static Function(_input: any): void;
        /**
         * Checks if the given parameter is a number. Throws an error if not.
         *
         * @param _input
         */
        static Number(_input: any): void;
        /**
         * Checks if the given parameter is an object. Throws an error if not.
         *
         * @param _input
         */
        static Object(_input: any): void;
        /**
         * Checks if the given parameter is a boolean. Throws an error if not.
         *
         * @param _input
         */
        static Boolean(_input: any): void;
        /**
         * Checkes if the given number is larger than 0. Throws an error if not.
         *
         * @param _number value that must has to be larther than the minimum value.
         * @param _minimum minimum value that the number can be. Number must be larger than minimum.
         */
        static LargerThan(_number: number, _minimum: number): void;
    }
}
declare module "fs/mxCSVRow" {
    import { MxUObject } from "gameObjects/mxUObject";
    import { MxCSVFile } from "fs/mxCSVFile";
    export class MxCSVRow extends MxUObject {
        /****************************************************/
        /****************************************************/
        /**
         * Gets the null object of this instance.
         */
        static GetNull(): MxCSVRow;
        /**
         * Check if the given instance is the null object.
         * @param _row
         */
        static IsNull(_row: MxCSVRow): boolean;
        /**
         * Creates the null object.
         */
        static Prepare(): void;
        /**
         * Destroys the null object.
         */
        static Shutdown(): void;
        constructor(_csv_file: MxCSVFile);
        /**
         * Gets the value of one of this Row's cell.
         * Returns an empty string if it doesn't has the required cell.
         *
         * @param _index {string | number} Index can be the header's name or the cell's index.
         */
        getCell(_index: string | number): string;
        /**
         * Adds a new cell to this row.
         * @param _data {string} New cell's data.
         */
        addCell(_data: string): void;
        /**
         * Adds multiple cells from raw data.
         *
         * @param _data {string} cells raw data.
         * @param _delimiter {char} Delimiter character for cells. i.e. ',' for CSV or '\t' for TSV.
         */
        addCellsFromRaw(_data: string, _delimiter?: string): void;
        /**
         * Gets the row size.
         */
        getRowSize(): number;
        /**
        * Safely destroys the object.
        */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        private _validate_idx;
        /**
         * Class Null Object.
         */
        private static _NULL_OBJ;
        /**
         * Array of cell data.
         */
        private _m_a_cells;
        /**
         * Reference to its MxCSVFile Object.
         */
        private _m_a_csv_file;
    }
}
declare module "fs/mxCSVFile" {
    import { MxUObject } from "gameObjects/mxUObject";
    import { MxCSVRow } from "fs/mxCSVRow";
    /**
     * This class handle a CSVFile.
     */
    export class MxCSVFile extends MxUObject {
        /****************************************************/
        /****************************************************/
        /**
         * Gets the null object of this instance.
         */
        static GetNull(): MxCSVFile;
        /**
         * Checks if the given object is the null object.
         * @param _csv_file
         */
        static IsNull(_csv_file: MxCSVFile): boolean;
        /**
         * Creates the null object.
         */
        static Prepare(): void;
        /**
         * Destroys the null object.
         */
        static ShutDown(): void;
        /**
         * Creates an useful MxCSVFile object to handle a raw csv data.
         *
         * @param _csv_data {string} Raw CSV data.
         * @param _has_header_row {boolean} Does data has a header row? It takes the first row as headers.
         * @param _cell_delimiter {char} Delimiter character for cells. i.e. ',' for CSV or '\t' for TSV.
         * @param _row_delimiter {char} Delimiter character for rows, usually it is the line break ('\n') character.
         */
        static Create(_csv_data: string, _has_header_row?: boolean, _cell_delimiter?: string, _row_delimiter?: string): MxCSVFile;
        /**
         * Gets a row from the MxCSVFile. If the row_index is out of range, it will returns
         * a Null Object.
         *
         * @param _row_index
         */
        getRow(_row_index: number): MxCSVRow;
        /**
         * Gets the first Row with given value in a specific header column. Return a
         * Null Object if doesn't found a row with the given specifications.
         *
         * @param _key_header {string} key header's name
         * @param _value {string} value.
         */
        getRowByKey(_key_header: string, _value: string): MxCSVRow;
        /**
         * Returns the header column position (0 based). Returns -1 if the header
         * doesn't exists.
         *
         * @param _header
         */
        getHeaderIdx(_header_name: string): number;
        /**
         * Check if the header exists in the MxCSVFile. Returns true if it does.
         *
         * @param _header_name
         */
        hasHeader(_header_name: string): boolean;
        /**
         * Gets the number of headers.
         */
        getNumberHeaders(): number;
        /**
         * Gets the number of rows.
         */
        getNumberRows(): number;
        /**
        * Safely destroys the object.
        */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        private constructor();
        /**
         * Instance of the null object.
         */
        static _NULL_OBJ: MxCSVFile;
        /**
         * Map of file headers.
         */
        private _m_a_headers;
        /**
         * Array of Rows
         */
        private _m_a_rows;
    }
}
declare module "commons/mxEnums" {
    /**
     * Common Enumerators.
     * @packageDocumentation
     */
    /**
     *
     */
    type EnumLiteralsOf<T extends object> = T[keyof T];
    /**
     *
     */
    export type OPRESULT = EnumLiteralsOf<typeof OPRESULT>;
    /**
     *
     */
    export const OPRESULT: Readonly<{
        /** There isn't a desciption for this result. */
        kUndefined: -1;
        /** Failure. */
        kFail: 0;
        /** Success. */
        kOk: 1;
        /** The operation cannot find a necesary file. */
        kFile_not_found: 2;
        /** The operation cannot find a necesary instance. */
        kObject_not_found: 3;
        /** The given parameter has an incompatible format. */
        kIncompatible_format: 4;
        /** There was a conflict with a null object. */
        kNull_Object: 5;
        /** The given parameter has an invalid type. */
        kInvalid_type: 6;
        /** There was a redundance conflict with some instance. */
        kObject_already_exists: 7;
        /**
         * The operation is not implemented yet.
         */
        kUnimplemented_operation: 8;
        /** Number of posible results. */
        kCount: 9;
    }>;
    export type COMPONENT_ID = EnumLiteralsOf<typeof COMPONENT_ID>;
    export const COMPONENT_ID: Readonly<{
        /** SpriteComponent  */
        kSprite: 0;
        /** NineSliceComponent */
        kNineSlice: 1;
        /** TextComponent */
        kText: 2;
        /** BitmapTextComponent */
        kBitmapText: 3;
        /** GraphicsComponent */
        kGraphics: 4;
        /** ShaderComponent */
        kShader: 5;
        /** AudioClipManager */
        kAudioClipsManager: 6;
        /** CmpTransform component. */
        kTransform: 7;
        /** Number of default components that this version has. */
        kCount: 8;
    }>;
    export type MESSAGE_ID = EnumLiteralsOf<typeof MESSAGE_ID>;
    export const MESSAGE_ID: Readonly<{
        /** The agent has been activated. data : null */
        kOnAgentActive: 0;
        /** The agent has been desactivated. data : null*/
        kOnAgentDesactive: 1;
        /** */
        kPlaySound: 2;
        /** Number of default Messages. */
        kCount: 3;
    }>;
    export type OBJECT_POOL_TYPE = EnumLiteralsOf<typeof OBJECT_POOL_TYPE>;
    export const OBJECT_POOL_TYPE: Readonly<{
        /** Identifier of the static Object Pool. */
        kStatic: 0;
        /** Identifier of the dynamic Object Pool. */
        kDynamic: 1;
    }>;
}
declare module "listeners/mxListener" {
    /**
     * This class contains a Function and may have an object as the Function's context.
     * The "S" type can be defined as the type of the sender object (who calls this Listener),
     * and the "A" type can be defined as the type of the object who has the arguments.
     */
    export class MxListener<S, A> {
        /****************************************************/
        /****************************************************/
        /**
         * The MxListener needs a Function, and may have a context.
         *
         * @param _listener
         * @param _context
         */
        constructor(_listener: (_sender: S, _args: A) => void, _context?: any);
        /**
         * Calls the Function of this MxListener.
         *
         * @param _sender Sender object. The object who calls this listener.
         * @param _args Agument object.
         */
        call(_sender: S, _args: A): void;
        /**
         * Safely destroys this MxListener.
         */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * The function of this MxListener.
         */
        private m_listener;
        /**
         * The context of the Function of this MxListener.
         */
        private m_context;
    }
}
declare module "listeners/mxListenerGroup" {
    import { MxListener } from "listeners/mxListener";
    /**
     * This class has a Map of MxListeners, identified by a string key, also called
     * the username. The username helps the MxListenerGroup to indentify and destroy
     * a MxListener with the unsuscribe(string) method.
     */
    export class MxListenerGroup<S, A> {
        /****************************************************/
        /****************************************************/
        constructor();
        call(_sender: S, _args: A): void;
        /**
         * Adds a new listener to this MxListenerGroup. If a MxListener already exists
         * with the given username, it will be overrided.
         *
         * @param _username an identifier of the given MxListener.
         * @param _listener the MxListener to be added.
         */
        suscribe(_username: string, _listener: MxListener<S, A>): void;
        /**
         * Destroys the MxListener with the given username, and removes it from this
         * MxListenerGroup.
         *
         * @param _username the identifier of the MxListener.
         */
        unsuscribe(_username: string): void;
        /**
         * Removes all the MxListeners attached to this MxListenerGroup. This methods
         * calls the destroy method of each MxListener before remove them.
         */
        clear(): void;
        /**
         * Calls the destroy method of each MxListener in this MxListenerGroup.
         */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * Map of funtions that belongs to this group. The first types "string" is
         * the key to identify its MxListener, also called as the "username".
         */
        private _m_listenersMap;
    }
}
declare module "listeners/mxListenerManager" {
    import { MxListener } from "listeners/mxListener";
    /**
     * This class manage a group of MxListenerGroup, or "events". By this object
     * an MxListener can suscribe or unsuscribe to an event.
     */
    export class MxListenerManager<S, A> {
        /****************************************************/
        /****************************************************/
        constructor();
        /**
         * Adds a new event (MxListenerGroup) to this MxListnerManager. If an event
         * with the same key exists, it will be destroyed and replaced.
         *
         * @param _event the event key.
         */
        addEvent(_event: string): void;
        /**
         * Call the MxListener attached to an event.
         *
         * @param _event The key of the event to be called.
         * @param _sender The sender object of this event.
         * @param _args The arguments obejct of this event.
         */
        call(_event: string, _sender: S, _args: A): void;
        /**
         * Suscribe a new MxListener to the given event. This method also needs the
         * username to identify the MxListener. If a MxListener already exists in the
         * event, that MxListener will be replaced.
         *
         * @param _event The string key of the event to add the given MxListener.
         * @param _username the string key to the identify the given MxListener.
         * @param _listener the MxListener that will be added to the event.
         */
        suscribe(_event: string, _username: string, _listener: MxListener<S, A>): void;
        /**
         * Destroys the MxListener with the given username and removes it from the
         * event.
         *
         * @param _event the string key of the event.
         * @param _username the string key of the MxListener that will be removed.
         */
        unsuscribe(_event: string, _username: string): void;
        /**
         * Removes all the MxListeners from an event. This method call the clear method
         * of the MxListenerGroup indentified by the event name.
         *
         * @param _event The string identifier of the MxListenerGroup.
         */
        clearEvent(_event: string): void;
        /**
         * Calls the destroy method of each MxListenerGroup and removes them from this
         * MxListenerManager. This MxListenerManager will be empty.
         */
        clear(): void;
        /**
        * Calls the destroy method of each MxListenerGroup and removes them from this
        * MxListenerManager.
        */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * A map of MxListeners, also called as "events". The key (string) is used to
         * identify the event.
        */
        private _m_eventsMap;
    }
}
declare module "optimization/mxPoolArgs" {
    /**
     * This class contains the arguments delivered when an event of a MxObjecPool
     * is triggered.
     */
    export class mxPoolArgs<T> {
        /****************************************************/
        /****************************************************/
        /**
         * Reference to the element just been modified.
         */
        element: T;
    }
}
declare module "optimization/mxObjectPool" {
    import { OBJECT_POOL_TYPE, OPRESULT } from "commons/mxEnums";
    import { mxPoolArgs } from "optimization/mxPoolArgs";
    export interface IObjectPool {
        m_mx_active: boolean;
        mxActive(): void;
        mxDesactive(): void;
        destroy(): void;
    }
    /**
     * Creational design pattern that uses a set of initalized objects kept ready
     * to use rather than allocating and destroying them on demand.
     */
    export class MxObjectPool<T extends IObjectPool> {
        /****************************************************/
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
        static CreateDynamic<U extends IObjectPool>(_max: number, _create_fn: (_obj_pool: MxObjectPool<U>) => U, _context?: any): MxObjectPool<U>;
        /**
         * Creates an MxObjectPool that already has the elements needed.
         * The user need to give an array of elements. Use the the init fn to set
         * the element's MxObjectPool, if it is needed.
         *
         * @param _a_elements Array of elements that belong to thes MxObjectPool.
         * @param _init_fn This function to initalize the element.
         * @param _context The init fucntion context.
         */
        static CreateStatic<U extends IObjectPool>(_a_elements: Array<U>, _init_fn?: (_obj: U, _obj_pool: MxObjectPool<U>) => void, _context?: any): MxObjectPool<U>;
        /**
         *
         * @param _fn
         * @param _context
         */
        forEach(_fn: (_element: T) => void, _context?: any): void;
        /**
         *
         * @param _fn
         * @param _context
         */
        forEachActive(_fn: (_element: T) => void, _context?: any): void;
        /**
         *
         * @param _fn
         * @param _context
         */
        forEachDesactive(_fn: (_element: T) => void, _context?: any): void;
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
        suscribe(_event: string, _username: string, _fn: (_sender: MxObjectPool<T>, _args: mxPoolArgs<T>) => void, _context?: any): void;
        /**
         *
         * @param _event
         * @param _username
         */
        unsuscribe(_event: string, _username: string): void;
        /**
         * Get an available element from this MxObjectPool. Be careful, if this MxObjectPool
         * doesn't has any availble element and is full, this method will returns a null type object.
         *
         * @retuns An available element of this MxObjectPool. If the MxObjectPool doesn't
         * has any available element and is full, it will returns a null type object.
         */
        get(): T;
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
        desactive(_element: T): OPRESULT;
        /**
         * Creates elements until reaching the maximum number of elements allowed.
         */
        fill(): void;
        /**
         * Check if this MxObjectPool has any element available.
         *
         * @returns True if there are at least one element available.
         */
        hasDesactive(): boolean;
        /**
         * Check if this MxObjectPool has reached the maximum number of elements
         * allowed.
         *
         * @returns True if the MxObjectPool has reached the maximum number or elements.
         */
        isFull(): boolean;
        /**
         * Get the number of elements of this MxObjectPool.
         *
         * @returns The number of elements in this MxObjectPool.
         */
        getSize(): number;
        /**
         * Ge the maximum number of elements allowed to this MxObjectPool.
         *
         * @retunrs The Maximum number o elements allowed to this MxObjectPool.
         */
        getMaxSize(): number;
        /**
         * Get the type of pool of this MxObjectPool.
         *
         * @returns The type of MxObjectPool.
         */
        getType(): OBJECT_POOL_TYPE;
        /**
        * Safely destroys the object. Calls the destroy method of each element in this
        * MxObjectPool (active and desactive). Finally this will destroy the
        * MxListenerManager.
        */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        private _active;
        /**
         * Creates a new element for this MxObjectPool, this also increment the
         * size of this MxObjectPool.
         */
        private _create_element;
        /**
         * ID that identify the type of MxObjectPool.
         */
        private _m_type;
        /**
         * Number of elements that this MxObjectPool contains.
         */
        private _m_size;
        /**
         * Maximum number of elements allowed to this MxObjectPool.
         */
        private _m_max_size;
        /**
         * List of active elements.
         */
        private _m_a_active;
        /**
         * List of desactive elements.
         */
        private _m_a_desactive;
        /**
         * Fuction used to create a new element.
         */
        private _m_create_fn;
        /**
         * Function context.
         */
        private _m_fn_create_context;
        /**
         * Handle the "elementActive" and "elementDesactive" events.
         */
        private _m_listenerManager;
        /**
         * Private constructor. Object Pool must be created with Factories.
         */
        private constructor();
    }
}
declare module "behaviour/mxComponent" {
    import { MxUObject } from "gameObjects/mxUObject";
    import { MxActor } from "behaviour/mxActor";
    /**
     * The MxComponent contains data or state of a MxActor.
     */
    export class MxComponent extends MxUObject {
        /****************************************************/
        /****************************************************/
        /**
         * Creates the Null Object of the MxComponent class.
         */
        static Prepare(): void;
        /**
         * Destroys the Null Object of the MxComponent class.
         */
        static Shutdown(): void;
        /**
         * Chech if the given MxCompoennt is the MxCompoent's Null Object.
         */
        static IsNull(_object: MxComponent): boolean;
        /**
         * Get the MxComponent Null Object.
         */
        static GetNull(): MxComponent;
        /**
         * Build a new MxComponent with an identifier.
         *
         * @param _id The idendtifier of this MxComponent.
         */
        constructor(_id: number);
        /**
         * Can be overrided. This method is called when the MxActor have just been
         * initialized. Base method do nothing.
         *
         * @param _actor The MxActor to wich this MxComponent belongs.
         */
        init(_actor: MxActor): void;
        /**
         * Can be overrided. This method is called during the actor update. Base
         * method do nothing.
         *
         * @param _actor The MxActor to wich this MxComponent belogns.
         */
        update(_actor: MxActor): void;
        /**
         * Can be overrided. This method is called by the MxComponentManager when a
         * message is recived. Base method do nothing.
         *
         * @param _id Message identifier.
         * @param _data Message data.
         */
        receive(_id: number, _data: unknown): void;
        /**
         * Gets this MxComponent's identifier.
         */
        getID(): number;
        /**
         * Can be overided. This method is called by the MxComponentManager when the component
         * is attach to a MxActor. Base method do nothing.
         *
         * This method is useful if the MxActor had been initialized before, so the
         * MxComponent can intialized when is attached to the MxActor.
         *
         * @param _actor The MxActor to which this MxComponent belongs.
         */
        onAttach(_actor: MxActor): void;
        /**
         * Can be overrided. This method is called by the MxComponentManager when the component
         * is dettach from the MxActor. Base method do nothing.
         *
         * @param _actor
         */
        onDettach(_actor: MxActor): void;
        /**
         * Can be overrided. This method is called by the MxComponentManager when the MxActor is
         * destroyed. Base method calls its super.destroy() method.
         */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * The component's identifier.
         */
        protected _m_id: number;
        /****************************************************/
        /****************************************************/
        /**
         * The Component's Null Object.
         */
        private static _NULL_OBJECT;
    }
}
declare module "behaviour/components/cmpTransform" {
    import { MxComponent } from "behaviour/mxComponent";
    import { MxActor } from "behaviour/mxActor";
    /**
     * This component defines the position of a MxActor.
     */
    export class CmpTransform extends MxComponent {
        /****************************************************/
        /****************************************************/
        constructor();
        /**
         * Calculates the new global position.
         *
         * @param _actor
         */
        update(_actor: MxActor): void;
        /**
         * Move the local position "n" units at x axis, y axis, and (optional) z axis.
         *
         * @param _x
         * @param _y
         * @param _z
         */
        move(_x: number, _y: number, _z?: number): void;
        /**
         * Gets the MxActor's global position. This position is calculated with the sum
         * of the local position an the global position of its parent.
         */
        getGlobalPoisition(): Phaser.Math.Vector3;
        /**
         * Sets the parent of this transform. This method is exclusive for the MxActor
         * factories. If preferable that the developer don't use this method to avoid
         * errors.
         * @param _transform Parent transform component.
         */
        setParent(_transform: CmpTransform): void;
        /**
         * The MxActor local position.
         */
        m_position: Phaser.Math.Vector3;
        /****************************************************/
        /****************************************************/
        /**
         * The MxActor global position. This position is calculated with the sum
         * of the local position an the global position of its parent.
         */
        private _m_globalPosition;
        /**
         * The parent's transform component. Its necesasary to calculate position
         * by hierarchy.
         */
        private _m_parent;
    }
}
declare module "behaviour/mxComponentManager" {
    import { OPRESULT } from "commons/mxEnums";
    import { MxActor } from "behaviour/mxActor";
    import { MxComponent } from "behaviour/mxComponent";
    /**
     * This class is intended to manage the MxComponents attached to one MxActor.
     * It has basic operations with the MxComponent, and can be delegated the
     * initializtion, update and destructions of the attached MxComponents.
     */
    export class MxComponentManager {
        /****************************************************/
        /****************************************************/
        /**
         * Creates an empty MxComponentManager. The actor reference is set to null.
         */
        constructor();
        /**
         * Sets the actor reference wich this MxComponentManager belons. This method
         * is called by the MxActor factories. Developers shouldn't use this one.
         *
         * @param _actor MxActor who this MxComponentManager belongs.
         */
        setActor(_actor: MxActor): void;
        /**
         * Calls the init() method of each component attached to this MxComponentManager.
         * This method is called by the init() method of the actor.
         */
        init(): void;
        /**
         * Calls the update() method of each component attached to this MxComponentManager.
         * This method is called by the update() method of the actor.
         */
        update(): void;
        /**
         * Sends a message to each component attached to this MxComponentManager.
         *
         * @param _id
         * @param _data
         */
        sendMessage(_id: number, _data: unknown): void;
        /**
         * Adds a MxComponent to this MxComponentManager.
         *
         * @param _component
         */
        addComponent(_component: MxComponent): OPRESULT;
        /**
         * Remove a MxComponent from this MxComponentManager by its identifier.
         *
         * @param _id
         */
        removeComponent(_id: number): void;
        /**
         * Check if this MxComponentManager has a MxComponent by its identifier.
         *
         * @param _id
         */
        hasComponent(_id: number): boolean;
        /**
         * Gets a MxComponent from this manager. This method allows to automaticlly cast
         * the MxComponent base class to a specific subclass. Be sure that the ID and the
         * subclass type are compatible.
         *
         * @param _id MxComponent's identifier.
         */
        getComponent<T extends MxComponent>(_id: number): T;
        /**
         * Removes all the components attached to this MxManagerComponent.
         */
        clear(): void;
        /**
         * Calls the destroy method of each MxComponent attached to this MxComponentMannager.
         * It clears the component list.
         */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * A refernce to the MxActor of this MxComponentManager.
         */
        private _m_actor;
        /**
         * Map of components attached to this manager.
         */
        private _m_component_map;
    }
}
declare module "behaviour/mxActor" {
    import { MxUObject } from "gameObjects/mxUObject";
    import { MxObjectPool } from "optimization/mxObjectPool";
    import { OPRESULT } from "commons/mxEnums";
    import { MxComponent } from "behaviour/mxComponent";
    import { CmpTransform } from "behaviour/components/cmpTransform";
    import { MxComponentManager } from "behaviour/mxComponentManager";
    /**
     * Architectural pattern wich follows the composition over inheritance principle
     * that allows greate flexibility in defining entities.
     *
     * Every MxActor consists of one or more MxComponent wich contains data or state.
     * The mix of MxComponents defines the behaviour of the MxActor. Therefore, the
     * behaviour of a MxActor can be changed during runtime by systems that add,
     * remove or mutate MxCompoents.
     */
    export class MxActor extends MxUObject {
        /****************************************************/
        /****************************************************/
        /**
         * Creates the Null Object of the MxActor class.
         */
        static Prepare(): void;
        /**
         * Destroys the Null Object of the MxActor class.
         */
        static Shutdown(): void;
        /**
        * Check if the given actor is the Null Object.
        */
        static IsNull(_obj: MxActor): boolean;
        /**
         * Get Object Null.
         */
        static GetNull(): MxActor;
        /**
         * MxActor default factory. It creates a new actor with default properties and
         * a transform component.It can be assigned as a child of another actor.
         *
         * @param _id MxActor identifier. Usually a name to indify it.
         * @param _m_parent MxActor's parent.
         */
        static Create(_id: string, _parent?: MxActor): MxActor;
        /**
         * Creates a child of this MxActor. This method will returns
         * a Null Object if the parent already has a MxActor with the same
         * identifier.
         *
         * @param _id Actor identifier.
         */
        create(_id: string): MxActor;
        /**
         * Intialize this actor's components and children.
         */
        init(): void;
        /**
         * Update MxActor's components.
         */
        update(): void;
        /**
         * Get the actor's MxComponentManager instance.
         */
        getComponentManager(): MxComponentManager;
        /**
         * Adds a ne component to this Actor. Returns a OPRESULT.
         * @param _component
         */
        addComponent(_component: MxComponent): OPRESULT;
        /**
         * Get this MxActor's MxComponent.
         * @param _id
         */
        getComponent<T extends MxComponent>(_id: number): T;
        /**
         * Clears de MxComponentManager.
         */
        clearComponentManager(): void;
        /**
         * Sends a message to this MxActor's component.
         *
         * @param _id Message identifier.
         * @param _data Message data.
         * @param _recursive Send the message to the the MxActor's children.
         */
        sendMessage(_id: number, _data: unknown, _recursive?: boolean): void;
        /**
         * Sends a message to this MxActor children.
         *
         * @param _id Message identifier.
         * @param _data Message data.
         */
        sendMessageToChildren(_id: number, _data: unknown): void;
        /**
         * Adds a new child to this Actor. This method detach the child from his
         * previous parent (if it has one).
         *
         * @param _child
         */
        addChild(_child: MxActor): OPRESULT;
        /**
         * Removes a child from this object. The parent reference of the child will be
         * set to Null Object. The parent reference of the child's transform will be
         * set to null.
         *
         * @param _child Child reference or child identifier.
         */
        removeChild(_child: MxActor | string): OPRESULT;
        /**
         * Gets a child by its identifier. If this actor doesn't has any child with
         * the id, the method will returns a Null Object.  This method isn't
         * recursive, so it will not check the children of children.
         *
         * @param _id Child's identifier.
         */
        getChild(_id: string): MxActor;
        /**
         * Check if the actor has a child with the given identifier. This method isn't
         * recursive, so it will not check the children of children.
         *
         * @param _id Child's identifier.
         */
        hasChild(_id: string): boolean;
        /**
         * This method will detach the actor from his parent.
         */
        detachFromParent(): OPRESULT;
        /**
         * Gets the actor's parent.
         */
        getParent(): MxActor;
        /**
         * Gets this actor's identifier.
         */
        getID(): string;
        /**
         * Gets the actor's tag.
         */
        getTag(): number;
        /**
         * Sends a mesasge 'kOnAgentActive' to all the components.
         */
        mxActive(): void;
        /**
         * Send a message 'kOnAgentDesactive' to all the components.
         */
        mxDesactive(): void;
        /**
         * Destroys this MxActor and his children.
         */
        destroy(): void;
        /**
         *
         */
        m_mx_active: boolean;
        /**
         * Reference to the ObjecPool of this MxActor. This can be null.
         */
        m_obj_pool: MxObjectPool<MxActor>;
        /**
         * Reference to the Actor's transform component.
         */
        m_transform: CmpTransform;
        /****************************************************/
        /****************************************************/
        protected constructor();
        /****************************************************/
        /****************************************************/
        private _update_child;
        private readonly _m_component_mg;
        /**
         * Actor's identifier. Usually a name to identify it.
         */
        private _m_id;
        /**
         * MxManager Tag.
         */
        private _m_tag;
        /**
         * Reference to the parent.
         */
        private _m_parent;
        /**
         * The actor's children.
         */
        private _m_children_map;
        /**
         * Instance of the null object.
         */
        private static _NULL_OBJECT;
    }
}
declare module "mxUtilities" {
    export class MxUtilities {
        /****************************************************/
        /****************************************************/
        /**
         * Prepare all the utilities modules and null objects.
         */
        static Prepare(): void;
        /**
         * Destroy all the utilities modules and null objects.
         */
        static Shutdown(): void;
    }
}
declare module "behaviour/mxState" {
    import { MxFSM } from "behaviour/mxFSM";
    /**
     * Logic unit used by the MxFSM to define an execution block. The class need to
     * define its controller type.
     *
     * The controller can be used to store a common
     * object that every MxState from the same MxFSM share, for example an
     * MxActor.
     */
    export class MxState<T> {
        /****************************************************/
        /****************************************************/
        /**
         * Creates a new MxState without MxFSM and controller.
         */
        constructor();
        /**
         * Can be overrided. This method is called by the mxFSM just after this MxState change
         * its status from desactive to active. Base method do nothing.
         */
        onEnter(): void;
        /**
         * Can be overrided. This method is called by the mxFSM just after this MxState change
         * its status from active to desactive. Base method do nothing.
         */
        onExit(): void;
        /**
         * Can be overrided. This method is called by the MxFSM if this MxState is
         * currently active. Base method do nothing.
         *
         * @returns number without a specific use.
         */
        update(): number;
        /**
         * Can be overrided. This method is called by the mxFSM if this MxState is
         * currently active. Base method do nothing.
         *
         * @returns number without a specific use.
         */
        draw(): number;
        /**
         * Set the MxFSM where this MxState belongs. The parameter can be a null type
         * object. This method should be used only by the MxFSM.
         *
         * @param _fsm The MxFSM where this MxState belongs.
         */
        attachToFSM(_fsm: MxFSM<T>): void;
        /**
         * Set the controller object o this MxState. This parameter can be a null type
         * object. This method should be use only by the MxFSM.
         *
         * @param _controller The controller instance.
         */
        setController(_controller: T): void;
        /**
         * Can be overrided. This method are called by the MxFSM when the MxState is
         * deleted or the MxFSM is destroyed. Base method do nothing.
         */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * The MxFSM to wich this MxState belongs.
         */
        protected _m_fsm: MxFSM<T>;
        /**
         * The controller instance. This propertie can be used to store a common
         * object that every MxState from the same MxFSM share, for example an
         * MxActor.
         */
        protected _m_controller: T;
    }
}
declare module "behaviour/mxFSM" {
    import { MxState } from "behaviour/mxState";
    import { OPRESULT } from "commons/mxEnums";
    /**
     * Model that can be used to simulate secuential logic, or in other words, to
     * represent and control execution flow. This class need to define the type of
     * its controller.
     *
     * The controller can be used to store a common
     * object that every MxState from the same MxFSM share, for example an
     * MxActor.
     */
    export class MxFSM<T> {
        /****************************************************/
        /****************************************************/
        /**
         * Creates a new MxFSM with null values. Use the init() method after the MxFSM
         * is builded, so it can be used.
         */
        constructor();
        /**
         * Intialize this MxFSM with a controller. This method creates a new
         * Map for the MxState. This method should be called once and before any
         * other method.
         *
         * @param _controller The controller object of this MxFSM.
         */
        init(_controller: T): void;
        /**
         * Calls the update() method of the active MxState. Take care that if there
         * isn't an active MxState this method will returns -1.
         *
         * @returns Result of the update() method of the active MxState. This value allways
         * will be -1 if ther isn't any active MxState.
         */
        update(): number;
        /**
         * Calls the draw() method of the active MxState. Take care that if there
         * isn't an active MxState this method will returns -1.
         *
         * @returns Result of the draw() method of the active MxState. This value allways
         * will be -1 if ther isn't any active MxState.
         */
        draw(): number;
        /**
         * Removes all the MxState of this MxFSM. This method will not destroy the
         * MxState. This method will not call the onExit() method of the active
         * MxState.
         */
        clear(): void;
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
        setActive(_idx: number): OPRESULT;
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
        addState(_idx: number, _state: MxState<T>): OPRESULT;
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
        removeState(_idx: number): OPRESULT;
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
        deleteState(_idx: number): OPRESULT;
        /**
         * Call the destroy() method of each MxState in this MxFSM. Finally clears
         * the list of MxState. This method will not call the onExit() method of the
         * active MxState.
         */
        deleteAll(): void;
        /****************************************************/
        /****************************************************/
        /**
         * List of MxState attached to this MxFSM.
         */
        protected _m_states_map: Map<number, MxState<T>>;
        /**
         * The active MxState of this MxFSM.
         */
        protected _m_active_state: MxState<T>;
        /**
         * The controller of this MxFSM.
         */
        protected _m_controller: T;
    }
}
declare module "behaviour/components/cmpAudioClipsManager" {
    import { MxComponent } from "behaviour/mxComponent";
    export class CmpAudioClipsManager extends MxComponent {
        /****************************************************/
        /****************************************************/
        constructor();
        prepare(_baseSoundManager: Phaser.Sound.BaseSoundManager): void;
        add(_sound: string, _config?: Phaser.Types.Sound.SoundConfig): void;
        play(_sound: string, _extra?: Phaser.Types.Sound.SoundConfig | Phaser.Types.Sound.SoundMarker): void;
        /****************************************************/
        /****************************************************/
        /**
         *
         */
        private _m_baseSoundManager;
        /**
         *
         */
        private _m_clipsMap;
    }
}
declare module "behaviour/components/phaserComponentWrapper/mxCommonComponentsWrapper" {
    import { MxActor } from "behaviour/mxActor";
    export class MxCommonComponentsWrapper {
        /****************************************************/
        /****************************************************/
        /**
         * Updates the position of the Phaser Gameobject.
         * @param _actor
         */
        updatePosition(_actor: MxActor): void;
        /**
         * Sets the scale of the Phaser GameObject.
         * @param _x
         * @param _y
         */
        setScale(_x: number, _y: number): void;
        /**
         * Get the Phaser GameObject Scale.
         */
        getScale(): Phaser.Math.Vector2;
        /**
         * Sets the angle of the Phaser GameObject in degrees.
         *
         * @param _degrees
         */
        setAngle(_degrees: number): void;
        /**
         * The angle of this Game Object as expressed in degrees.
         * Phaser uses a right-hand clockwise rotation system, where 0 is right, 90 is down, 180/-180 is left and -90 is up.
         * If you prefer to work in radians, see the rotation property instead.
         */
        getAngle(): number;
        /**
         * Sets the angle of the Phaser GameObject in radians.
         *
         * @param _radians
         */
        setRotation(_radians: number): void;
        /**
         * The angle of this Game Object in radians.
         * Phaser uses a right-hand clockwise rotation system, where 0 is right, 90 is down, 180/-180 is left and -90 is up.
         * If you prefer to work in degrees, see the angle property instead.
         */
        getRotation(): number;
        /**
         * Gets the phaser's position. In theory this position has the same value
         * as the cmpTransform component.
         */
        getPosition(): Phaser.Math.Vector3;
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
        setRandomPosition(_x: number, _y: number, _width: number, _height: number): void;
        /**
         * Sets the visibility of the Phaser GameObject.
         */
        setVisible(_visible: boolean): void;
        /**
         * The visible state fo the Phaser GameObject.
         */
        isVisible(): boolean;
        /****************************************************/
        /****************************************************/
        /**
         * Reference to the Transform component of the Phaser GameObject instance.
         * Remember to assign a Phaser GameObject to this property in the subclass.
         */
        protected _m_goComponents_base: Phaser.GameObjects.Components.Transform & Phaser.GameObjects.Components.Visible;
    }
}
declare module "commons/mxMixin" {
    export class MxMixin {
        static applyMixins(derivedCtor: any, baseCtors: any[]): void;
    }
}
declare module "behaviour/components/phaserComponentWrapper/mxAlphaComponentWrapper" {
    export class MxAlphaComponentWrapper {
        /****************************************************/
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
        setAlpha(_topLeft?: number, _topRight?: number, _bottomLeft?: number, _bottomRight?: number): void;
        /**
         * The alpha value of the Game Object.
         * This is a global value, impacting the entire Game Object, not just a region of it.
         */
        getAlpha(): number;
        /**
         * Clears all alpha values associated with this Game Object.
         * Immediately sets the alpha levels back to 1 (fully opaque).
         */
        clearAlpha(): void;
        /****************************************************/
        /****************************************************/
        /**
         * Reference to the Alpha Component of the Phaser Gameobject.
         */
        protected _m_goComponent_alpha: Phaser.GameObjects.Components.Alpha;
    }
}
declare module "behaviour/components/phaserComponentWrapper/mxOriginComponentWrapper" {
    export class MxOriginComponentWrapper {
        /****************************************************/
        /****************************************************/
        /**
         * Sets the origin of the Phaser GameObject.
         * @param _x
         * @param _y
         */
        setOrigin(_x: number, _y: number): void;
        /**
         * Sets the origin of this Game Object based on the Pivot values in its Frame.
         */
        setOriginFromFrame(): void;
        /****************************************************/
        /****************************************************/
        /**
         * Reference to the Origin Component of the phaser object.
         */
        protected _m_goComponent_origin: Phaser.GameObjects.Components.Origin;
    }
}
declare module "behaviour/components/phaserComponentWrapper/mxTintComponentWrapper" {
    export class MxTintComponentWrapper {
        /****************************************************/
        /****************************************************/
        /**
         * Does this Game Object have a tint applied to it or not?
         */
        isTinted(): boolean;
        /**
         * Clears all tint values associated with this Game Object.
         * Immediately sets the color values back to 0xffffff and the tint type to 'additive', which results in no visible change to the texture.
         */
        clearTint(): void;
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
        setTint(_topLeft?: number, _topRight?: number, _bottomLeft?: number, _bottomRight?: number): void;
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
        setTintFill(_topLeft?: number, _topRight?: number, _bottomLeft?: number, _bottomRight?: number): void;
        /**
         * The tint value being applied to the whole of the Game Object.
         * This property is a setter-only. Use the properties tintTopLeft etc to
         * read the current tint value.
         */
        getTint(): number;
        /****************************************************/
        /****************************************************/
        /**
         * Reference to the Tint Component of the Phaser GameObject.
         */
        protected _m_goComponent_tint: Phaser.GameObjects.Components.Tint;
    }
}
declare module "behaviour/components/cmpBitmapText" {
    import { MxActor } from "behaviour/mxActor";
    import { MxComponent } from "behaviour/mxComponent";
    import { MxCommonComponentsWrapper } from "behaviour/components/phaserComponentWrapper/mxCommonComponentsWrapper";
    import { MxAlphaComponentWrapper } from "behaviour/components/phaserComponentWrapper/mxAlphaComponentWrapper";
    import { MxOriginComponentWrapper } from "behaviour/components/phaserComponentWrapper/mxOriginComponentWrapper";
    import { MxTintComponentWrapper } from "behaviour/components/phaserComponentWrapper/mxTintComponentWrapper";
    export class CmpBitmapText extends MxComponent {
        /****************************************************/
        /****************************************************/
        constructor();
        prepare(_bitmapText: Phaser.GameObjects.BitmapText): void;
        /**
         * Updates the position of the Phaser GameObject.
         *
         * @param _actor
         */
        update(_actor: MxActor): void;
        receive(_id: number, _data: unknown): void;
        /**
         *
         * @param _size
         */
        setFontSize(_size: number): void;
        setLeftAlign(): void;
        setRightAlign(): void;
        setCenterAlign(): void;
        /**
         *
         * @param _text
         */
        setText(_text: string): void;
        setBitmapTextObject(_text: Phaser.GameObjects.BitmapText): void;
        getBitmapTextObject(): Phaser.GameObjects.BitmapText;
        /**
        * Sets the maximum display width of this BitmapText in pixels.
        *
        * If BitmapText.text is longer than maxWidth then the lines will be automatically wrapped based on the previous whitespace character found in the line.
        *
        * If no whitespace was found then no wrapping will take place and consequently the maxWidth value will not be honored.
        *
        * Disable maxWidth by setting the value to 0.
        */
        setMaxWidth(_width: number): void;
        setActive(_active: boolean): void;
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * Reference to Phaser Gameobject.
         */
        _m_bitmap_text: Phaser.GameObjects.BitmapText;
    }
    export interface CmpBitmapText extends MxCommonComponentsWrapper, MxAlphaComponentWrapper, MxOriginComponentWrapper, MxTintComponentWrapper {
    }
}
declare module "behaviour/components/phaserComponentWrapper/mxAlphaSingleComponentWrapper" {
    export class MxAlphaSingleComponentWrapper {
        /****************************************************/
        /****************************************************/
        /**
         * Set the Alpha level of this Game Object. The alpha controls the opacity of
         * the Game Object as it renders. Alpha values are provided as a float between 0,
         * fully transparent, and 1, fully opaque.
         *
         * @param value — The alpha value applied across the whole Game Object. Default 1.
         */
        setAlpha(_value: number): void;
        /**
         * The alpha value of the Game Object.
         * This is a global value, impacting the entire Game Object, not just a region of it.
         */
        getAlpha(): number;
        /**
         * Clears all alpha values associated with this Game Object.
         * Immediately sets the alpha levels back to 1 (fully opaque).
         */
        clearAlpha(): void;
        /****************************************************/
        /****************************************************/
        /**
         * Reference to the Alpha Component of the Phaser Gameobject.
         */
        protected _m_goComponent_alphaSingle: Phaser.GameObjects.Components.AlphaSingle;
    }
}
declare module "behaviour/components/cmpGraphics" {
    import { MxComponent } from "behaviour/mxComponent";
    import { MxCommonComponentsWrapper } from "behaviour/components/phaserComponentWrapper/mxCommonComponentsWrapper";
    import { MxAlphaSingleComponentWrapper } from "behaviour/components/phaserComponentWrapper/mxAlphaSingleComponentWrapper";
    export class CmpGraphics extends MxComponent {
        /****************************************************/
        /****************************************************/
        constructor();
        prepare(_scene: Phaser.Scene): void;
        receive(_id: number, _data: unknown): void;
        getGraphic(): Phaser.GameObjects.Graphics;
        setTexture(_texture_key: string): void;
        /**
         *
         */
        setInteractive(): void;
        /**
         *
         * @param _event
         * @param _fn
         * @param _context
         */
        on(_event: string, _fn: Function, _context: any): void;
        setActive(_active: boolean): void;
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * Phaser Sprite Gameobject.
         */
        private _m_graphic;
    }
    export interface CmpGraphics extends MxCommonComponentsWrapper, MxAlphaSingleComponentWrapper {
    }
}
declare module "behaviour/components/cmpNineSlice" {
    import { MxActor } from "behaviour/mxActor";
    import { MxComponent } from "behaviour/mxComponent";
    import { MxCommonComponentsWrapper } from "behaviour/components/phaserComponentWrapper/mxCommonComponentsWrapper";
    import { MxAlphaComponentWrapper } from "behaviour/components/phaserComponentWrapper/mxAlphaComponentWrapper";
    import { MxOriginComponentWrapper } from "behaviour/components/phaserComponentWrapper/mxOriginComponentWrapper";
    import { MxTintComponentWrapper } from "behaviour/components/phaserComponentWrapper/mxTintComponentWrapper";
    export class CmpNineSlice extends MxComponent {
        /****************************************************/
        /****************************************************/
        constructor();
        prepare(_scene: Phaser.Scene, _texture: string, _frame: string, _offsets: number[]): void;
        update(_actor: MxActor): void;
        receive(_id: number, _data: unknown): void;
        setInteractive(): void;
        on(_event: string, _fn: () => void, _context: any): void;
        resize(_width: number, _height: number): void;
        getMinSize(): Phaser.Geom.Point;
        setTexture(_texture_key: string): void;
        setFrame(_frame: number | string): void;
        getTexture(): Phaser.GameObjects.RenderTexture;
        setActive(_active: boolean): void;
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * Phaser Sprite Gameobject.
         */
        _m_texture: Phaser.GameObjects.RenderTexture;
        /**
         *
         */
        _m_min_width: number;
        /**
         *
         */
        _m_min_height: number;
    }
    export interface CmpNineSlice extends MxCommonComponentsWrapper, MxAlphaComponentWrapper, MxOriginComponentWrapper, MxTintComponentWrapper {
    }
}
declare module "behaviour/components/phaserComponentWrapper/mxComputedSizeComponentWrapper" {
    export class MxComputedSizeComponentWrapper {
        /****************************************************/
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
        setSize(_width: number, _height: number): void;
        /**
         * Sets the display size of this Game Object.
         * Calling this will adjust the scale.
         *
         * @param _width — The width of this Game Object.
         * @param _height — The height of this Game Object.
         */
        setDisplaySize(_widht: number, _height: number): void;
        /**
         * The native (un-scaled) height of this Game Object.
         * Changing this value will not change the size that the Game Object is rendered in-game. For that you need to either set the scale of the Game Object (setScale)
         * or use the displayHeight property.
         */
        getHeight(): number;
        /**
         * The native (un-scaled) width of this Game Object.
         * Changing this value will not change the size that the Game Object is rendered in-game. For that you need to either set the scale of the Game Object (setScale)
         * or use the displayHeight property.
         */
        getWidth(): number;
        /**
         * The displayed height of this Game Object.
         * This value takes into account the scale factor.
         * Setting this value will adjust the Game Object's scale property.
         */
        getDisplayHeight(): number;
        /**
         * The displayed width of this Game Object.
         * This value takes into account the scale factor.
         * Setting this value will adjust the Game Object's scale property.
         */
        getDisplayWidth(): number;
        /**
         * The native (un-scaled) size of this Game Object.
         */
        getSize(): Phaser.Math.Vector2;
        /**
         * The displayed size of this Game Object.
         * This value takes into account the scale factor.
         * */
        getDisplaySize(): Phaser.Math.Vector2;
        /****************************************************/
        /****************************************************/
        protected _m_goComponent_computedSize: Phaser.GameObjects.Components.ComputedSize;
    }
}
declare module "behaviour/components/cmpShader" {
    import { MxComponent } from "behaviour/mxComponent";
    import { MxCommonComponentsWrapper } from "behaviour/components/phaserComponentWrapper/mxCommonComponentsWrapper";
    import { MxOriginComponentWrapper } from "behaviour/components/phaserComponentWrapper/mxOriginComponentWrapper";
    import { MxComputedSizeComponentWrapper } from "behaviour/components/phaserComponentWrapper/mxComputedSizeComponentWrapper";
    import { MxActor } from "behaviour/mxActor";
    export class CmpShader extends MxComponent {
        /****************************************************/
        /****************************************************/
        constructor();
        prepare(_shader: Phaser.GameObjects.Shader): void;
        update(_actor: MxActor): void;
        receive(_id: number, _data: unknown): void;
        setUniform(_uniform: string, _value: any): void;
        setMask(_mask: Phaser.Display.Masks.BitmapMask): void;
        createMask(): Phaser.Display.Masks.BitmapMask;
        getShader(): Phaser.GameObjects.Shader;
        /**
         *
         */
        setInteractive(): void;
        /**
         *
         * @param _event
         * @param _fn
         * @param _context
         */
        on(_event: string, _fn: Function, _context: any): void;
        setActive(_active: boolean): void;
        initUniform(_key: string): void;
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * Phaser Sprite Gameobject.
         */
        _m_shader: Phaser.GameObjects.Shader;
    }
    export interface CmpShader extends MxCommonComponentsWrapper, MxOriginComponentWrapper, MxComputedSizeComponentWrapper {
    }
}
declare module "behaviour/components/phaserComponentWrapper/mxSizeComponenWrappert" {
    export class MxSizeComponentWrapper {
        /****************************************************/
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
        setSize(_width: number, _height: number): void;
        /**
         * Sets the display size of this Game Object.
         * Calling this will adjust the scale.
         *
         * @param _width — The width of this Game Object.
         * @param _height — The height of this Game Object.
         */
        setDisplaySize(_widht: number, _height: number): void;
        /**
         * The native (un-scaled) height of this Game Object.
         * Changing this value will not change the size that the Game Object is rendered in-game. For that you need to either set the scale of the Game Object (setScale)
         * or use the displayHeight property.
         */
        getHeight(): number;
        /**
         * The native (un-scaled) width of this Game Object.
         * Changing this value will not change the size that the Game Object is rendered in-game. For that you need to either set the scale of the Game Object (setScale)
         * or use the displayHeight property.
         */
        getWidth(): number;
        /**
         * The displayed height of this Game Object.
         * This value takes into account the scale factor.
         * Setting this value will adjust the Game Object's scale property.
         */
        getDisplayHeight(): number;
        /**
         * The displayed width of this Game Object.
         * This value takes into account the scale factor.
         * Setting this value will adjust the Game Object's scale property.
         */
        getDisplayWidth(): number;
        /**
         * The native (un-scaled) size of this Game Object.
         */
        getSize(): Phaser.Math.Vector2;
        /**
         * The displayed size of this Game Object.
         * This value takes into account the scale factor.
         * */
        getDisplaySize(): Phaser.Math.Vector2;
        /****************************************************/
        /****************************************************/
        protected _m_goComponent_size: Phaser.GameObjects.Components.Size;
    }
}
declare module "behaviour/components/cmpSprite" {
    import { MxComponent } from "behaviour/mxComponent";
    import { MxCommonComponentsWrapper } from "behaviour/components/phaserComponentWrapper/mxCommonComponentsWrapper";
    import { MxAlphaComponentWrapper } from "behaviour/components/phaserComponentWrapper/mxAlphaComponentWrapper";
    import { MxOriginComponentWrapper } from "behaviour/components/phaserComponentWrapper/mxOriginComponentWrapper";
    import { MxTintComponentWrapper } from "behaviour/components/phaserComponentWrapper/mxTintComponentWrapper";
    import { MxSizeComponentWrapper } from "behaviour/components/phaserComponentWrapper/mxSizeComponenWrappert";
    import { MxActor } from "behaviour/mxActor";
    export class CmpSprite extends MxComponent {
        /****************************************************/
        /****************************************************/
        constructor();
        prepare(_sprite: Phaser.GameObjects.Sprite): void;
        update(_actor: MxActor): void;
        receive(_id: number, _data: unknown): void;
        setTexture(_texture_key: string): void;
        setFrame(_frame: number | string): void;
        setMask(_mask: Phaser.Display.Masks.BitmapMask): void;
        createMask(): Phaser.Display.Masks.BitmapMask;
        getSprite(): Phaser.GameObjects.Sprite;
        /**
         *
         */
        setInteractive(): void;
        /**
         *
         * @param _event
         * @param _fn
         * @param _context
         */
        on(_event: string, _fn: Function, _context: any): void;
        setActive(_active: boolean): void;
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * Phaser Sprite Gameobject.
         */
        _m_sprite: Phaser.GameObjects.Sprite;
    }
    export interface CmpSprite extends MxCommonComponentsWrapper, MxAlphaComponentWrapper, MxOriginComponentWrapper, MxTintComponentWrapper, MxSizeComponentWrapper {
    }
}
declare module "behaviour/components/cmpText" {
    import { MxComponent } from "behaviour/mxComponent";
    import { MxCommonComponentsWrapper } from "behaviour/components/phaserComponentWrapper/mxCommonComponentsWrapper";
    import { MxAlphaComponentWrapper } from "behaviour/components/phaserComponentWrapper/mxAlphaComponentWrapper";
    import { MxComputedSizeComponentWrapper } from "behaviour/components/phaserComponentWrapper/mxComputedSizeComponentWrapper";
    import { MxTintComponentWrapper } from "behaviour/components/phaserComponentWrapper/mxTintComponentWrapper";
    import { MxOriginComponentWrapper } from "behaviour/components/phaserComponentWrapper/mxOriginComponentWrapper";
    import { MxActor } from "behaviour/mxActor";
    export class CmpText extends MxComponent {
        /****************************************************/
        /****************************************************/
        constructor();
        prepare(_scene: Phaser.Scene, _text: string, _style: object): void;
        update(_actor: MxActor): void;
        receive(_id: number, _data: unknown): void;
        /**
         *
         * @param _size
         */
        setFontSize(_size: number): void;
        /**
         *
         * @param _color
         */
        setFontColor(_color: string): void;
        /**
         *
         * @param _color
         */
        setTint(_color: number): void;
        /**
         * Set the alignment of the text in this Text object.
        * The argument can be one of: left, right, center or justify.
        * Alignment only works if the Text object has more than one line of text.
        *
        * @param align — The text alignment for multi-line text. Default 'left'.
         */
        setAlign(_align?: string): void;
        /**
         *
         * @param _text
         */
        setText(_text: string): void;
        setTextObject(_text: Phaser.GameObjects.Text): void;
        getTextObject(): Phaser.GameObjects.Text;
        /**
        * Set the width (in pixels) to use for wrapping lines. Pass in null to remove wrapping by width.
        *
        * @param _width — The maximum width of a line in pixels. Set to null to remove wrapping.
        *
        * @param _useAdvancedWrap — Whether or not to use the advanced wrapping algorithm.
        * If true, spaces are collapsed and whitespace is trimmed from lines. If false,
        * spaces and whitespace are left as is. Default false.
        */
        setWordWrapWidth(_width: number, _useAdvanceWrap?: boolean): void;
        setActive(_active: boolean): void;
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * Phaser Text Gameobject.
         */
        _m_text: Phaser.GameObjects.Text;
    }
    export interface CmpText extends MxCommonComponentsWrapper, MxAlphaComponentWrapper, MxOriginComponentWrapper, MxTintComponentWrapper, MxComputedSizeComponentWrapper {
    }
}
declare module "commons/mxDateTime" {
    export class MxDateTime {
        /**
         * Generate a string with the time format HH : MM : SS, based on the given
         * seconds.
         * @param _seconds number on seconds.
         */
        static GetHHMMSS(_seconds: number): string;
        /**
         * Generate a string with the time format MM : SS, based on the given
         * seconds.
         * @param _seconds number on seconds.
         */
        static GetMMSS(_seconds: number): string;
    }
}
declare module "commons/mxInterpolation" {
    /**
      * Constructs new data from a range of discrete set of known
      * data points.
    */
    export class MxInterpolation {
        /****************************************************/
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
        static Linear(x1: number, y1: number, x2: number, y2: number, x: number): number;
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
        static Bilinear(x1: number, y1: number, x2: number, y2: number, v1: number, v2: number, v3: number, v4: number, tx: number, ty: number): number;
    }
}
declare module "commons/mxMath" {
    export class MxMath {
        /**
         * If the given value is less than the minimum value, it will return the minimum value,
         * otherwise it will return the given value.
         *
         * @param _value value to check.
         * @param _min minimum value.
         */
        static TruncateMinimum(_value: number, _min: number): number;
        /**
         * If the given value is less than the maximum value, it will return the maximum value,
         * otherwise it will return the given value.
         *
         * @param _value value to check.
         * @param _max maximum value.
         */
        static TruncatetMaximum(_value: number, _max: number): number;
        /**
         * If the value is outside the range, the function will return the maximum or
         * minimum value depending on the value, otherwise it will return the given
         * value.
         *
         * @param _value value to check.
         * @param _min minimum value.
         * @param _max maximum value.
         */
        static TruncateByRange(_value: number, _min: number, _max: number): number;
    }
}
declare module "commons/mxPerlinNoise" {
    export class MxPerlinNoise {
        /****************************************************/
        /****************************************************/
        /**
         *
         * @param _length
         * @param _n_octaves
         */
        static Noise1D(_length: number, _frecuency_power?: number, _amplitude_power?: number, _n_octaves?: number, _normalized?: boolean): Float32Array;
        static Noise2D(_length: number, _frecuency_power?: number, _amplitude_power?: number, _n_octaves?: number, _normalized?: boolean): Float32Array[];
        /**
         *
         * @param _frecuency
         * @param _amplitude
         * @param _length
         */
        static Octave(_frecuency: number, _amplitude: number, _wave: Float32Array, _length: number): void;
        static Octave2D(_frecuency: number, _amplitude: number, _wave: Float32Array[], _length: number): void;
        /****************************************************/
        /****************************************************/
        private static MAX_LENGHT;
    }
}
declare module "ui/mxUI" {
    export class MxUI {
        /****************************************************/
        /****************************************************/
        protected _m_size: Phaser.Geom.Point;
        /****************************************************/
        /****************************************************/
        constructor();
        update(_dt: number): void;
        setPosition(_x: number, _y: number): void;
        move(_x: number, _y: number): void;
        /**
        * Safely destroys the object.
        */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        protected _getSprite_box(_scene: Phaser.Scene): Phaser.GameObjects.Sprite;
        protected _getSprite_circle16(_scene: Phaser.Scene): Phaser.GameObjects.Sprite;
        protected _get_text(_scene: Phaser.Scene): Phaser.GameObjects.Text;
    }
}
declare module "ui/mxSlider" {
    import { MxUI } from "ui/mxUI";
    export class MxSlider extends MxUI {
        /****************************************************/
        /****************************************************/
        private _m_bck;
        private _m_fill;
        private _m_button;
        private _m_norm_value;
        private _m_value;
        private _m_min_value;
        private _m_max_value;
        private _m_delta_value;
        private _m_dragging;
        private _m_text;
        private _m_title;
        private _m_pointer;
        private _m_group;
        /****************************************************/
        /****************************************************/
        constructor(_scene: Phaser.Scene, _x: number, _y: number, _title?: string);
        setValues(_min: number, _max: number): void;
        update(_dt: number): void;
        setPosition(_x: number, _y: number): void;
        move(_x: number, _y: number): void;
        getValue(): number;
        getFracValue(): number;
        setValue(_value: number): number;
        setFracValue(_value: number): void;
        destroy(): void;
        /****************************************************/
        /****************************************************/
        private _resize_fill;
        private _onDown_slider;
        private _onDrag;
        private _truncate;
    }
}
//# sourceMappingURL=mxUtilities.d.ts.map