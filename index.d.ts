export function universalFileTools(): UniversalFileTools;
export function JsonFileTools(): JsonFileTools;
/**
 * The universal tools class
 */
declare class UniversalFileTools {
    /**
     * Creates a file at the location you provided
     *
     * @param {String} path The path to the file you want to create
     * @param {Anything} data The data you want to put in the file
     */
    createFile(path: string, content?: string): any;
    /**
     * Deletes the file you specify
     *
     * @param {String} path The path to the file you want to delete
     */
    deleteFile(path: string): any;
    /**
     * Moves the file from the old location to the new location
     *
     * @param {String} path The path to the file you want to move
     * @param {String} newDir The path to the folder you want to move the file to
     */
    moveFile(path: string, newDir: string): any;
    /**
     * Duplicates the file you specify
     *
     * @param {String} path The path to the file you want to copy
     * @param {String} copyPath The path to the location you want the new file saved
     */
    copyFile(path: string, copyPath: string): any;
    /**
     * Renames the specified file to the new provided name
     *
     * @param {String} path The path to the file you want to rename
     * @param {String} newName The name you want to change the file to
     */
    renameFile(path: string, newName: string): any;
    /**
     * Returns a boolean whether or not the file exists
     *
     * @param {String} path The path to the file you want to check
     * @returns {Boolean} A boolean
     */
    fileExists(path: string): boolean;
    /**
     * Returns a boolean whether or not the directory exists
     *
     * @param {String} dir The path to the directory you want to check
     * @returns {Boolean} A boolean
     */
    dirExists(dir: string): boolean;
    /**
     * Creates a folder where you specify
     *
     * @param {String} dir The path to where you want the folder created
     */
    createDir(dir: string): any;
    /**
     * Returns the data from the file you specify
     *
     * @param {String} path The path to the txt file you want to read
     */
    readFile(path: string): any;
}
/**
 * The json tools class
 */
declare class JsonFileTools {
    /**
     * Returns an instance of a json file editor
     * To use this tool you must have @acegoal07/json-editor package installed
     *
     * @param {String} path The path to the file you want to edit
     * @param {{
     *    stringify_width?: Number,
     *    stringify_fn?: Function,
     *    stringify_eol?: Boolean,
     *    ignore_dots?: Boolean,
     *    autosave?: Boolean
     * }} options An object containing the following fields:
     *  - `stringify_width` (Number): The JSON stringify indent width (default: `2`)
     *  - `stringify_fn` (Function): A function used by `JSON.stringify`
     *  - `stringify_eol` (Boolean): Whether to add the new line at the end of the file or not (default: `false`)
     *  - `ignore_dots` (Boolean): Whether to use the path including dots or have an object structure (default: `false`)
     *  - `autosave` (Boolean): Save the file when setting some data in it
     * @returns {JsonEditor} The editor instance
     */
    Editor(path: string, options: {
        stringify_width?: number;
        stringify_fn?: Function;
        stringify_eol?: boolean;
        ignore_dots?: boolean;
        autosave?: boolean;
    }): JsonEditor;
    /**
     * Returns the data from the specified file in json format allowing it to be referenced
     *
     * @param {String} path The path to the file you want to read
     * @returns {Object} The data from the file
     */
    readFile(path: string): any;
    /**
     * Returns the data from all the json files in a folder either as a map or array
     *
     * @param {String} dir The path to the directory you want to read data from
     * @param {"Map" | "Array"} format The format you want to the returned
     * @returns {Map | Array} The data returned
     */
    readAllFiles(dir: string, format?: "Map" | "Array"): Map | any[];
    /**
     * Returns an array of the files in the directory that are json files
     *
     * @param {String} dir The path to the directory
     * @returns {Array} An array of names
     */
    getFiles(dir: string): any[];
}
export {};