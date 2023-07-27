///////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////
const fs = require("fs"),
   rJson = require("r-json"),
   { FileTools } = require("./FileTools"),
   { DirectoryTools } = require("./DirectoryTools");
///////////////////////////////////////////////////////////////////////////
// Class /////////////////////////////////////////////////////////////////
/**
 * The json tools class
 */
exports.JsonFileTools = class {
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
   editor(path, options) {
      try {
         require("@acegoal07/json-editor");
      } catch {
         throw new Error("To use the editor you need to have '@acegoal07/json-editor' installed");
      }
      const { editFile } = require("@acegoal07/json-editor");
      return editFile(path, options);
   }
   /**
    * Returns the data from the specified file in json format allowing it to be referenced
    *
    * @param {String} path The path to the file you want to read
    * @param {Function} callback An optional callback function which will turn the function into an asynchronous one
    * @returns {Object} The data from the file
    */
   readFile(path, callback) {
      if (!path) {throw new Error("ERROR with readFile: path is null");}
      if (!new FileTools().fileExists(path)) {throw new Error(`ERROR with readFile: The provided file does not exists`);}
      if (!callback) {
         try {
            return rJson(path);
         } catch (error) {
            return {};
         }
      }
      rJson(path, function (err, data) {
            data = err ? {} : data;
            callback(null, data);
      });
   }
   /**
    * Returns the data from all the json files in a folder either as a map or array
    *
    * @param {String} dir The path to the directory you want to read data from
    * @param {"Map" | "Array"} format The format you want to the returned
    * @returns {Map | Array} The data returned
    */
   readAllFiles(dir, format = "Map") {
      if (!dir) {throw new Error("ERROR with readAllFiles: dir is null");}
      if (!fs.statSync(dir).isDirectory()) {throw new Error("ERROR with readAllFiles: The path you have provided is not to a directory");}
      if (!new DirectoryTools().dirExists(dir)) {throw new Error(`ERROR with readAllFiles: The provided folder does not exists`);}
      if (format === "Array") {
         const array = new Array();
         for (const file of fs.readdirSync(dir)) {
            if (file.toLowerCase().endsWith(".json")) {
               array.push(
                  {
                     file: file.toLowerCase().replace(".json", ""),
                     data: rJson(`${dir}/${file}`)
                  }
               );
            }
            void(0);
         }
         return array;
      } else {
         const map = new Map();
         for (const file of fs.readdirSync(dir)) {
            if (file.toLowerCase().endsWith(".json")) {
               map.set(file.toLowerCase().replace(".json", ""), rJson(`${dir}/${file}`));
            }
            void(0);
         }
         return map;
      }
   }
   /**
    * Returns an array of the files in the directory that are json files
    *
    * @param {String} dir The path to the directory
    * @returns {Array} An array of names
    */
   getFiles(dir) {
      if (!dir) {throw new Error("ERROR with getFiles: dir is null");}
      if (!fs.statSync(dir).isDirectory()) {throw new Error("ERROR with getFile: The path you have provided is not to a directory");}
      if (!new DirectoryTools().dirExists(dir)) {throw new Error("ERROR with getFile: There is no dir at the path you have provided");}
      const array = [];
      for (const file of fs.readdirSync(dir)) {
         if (file.toLowerCase().endsWith(".json")) {
            array.push(file);
         }
      }
      return array;
   }
}