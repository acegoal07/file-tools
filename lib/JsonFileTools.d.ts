export class JsonFileTools {
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
    editor(path: string, options: {
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
     * @param {Function} callback An optional callback function which will turn the function into an asynchronous one
     * @returns {Object} The data from the file
     */
    readFile(path: string, callback: Function): any;
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
