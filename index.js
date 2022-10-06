///////////////////////////////////////////////////////////////////////////
// Dependencies  //////////////////////////////////////////////////////////
const rJson = require("r-json"),
   fs = require("fs");
///////////////////////////////////////////////////////////////////////////
// General Tools //////////////////////////////////////////////////////////
/**
 * Returns a class filled with tools that can be used on any file type
 *
 * @returns {UniversalFileTools} An instance of the class
 */
exports.universalFileTools = function() {
   return new UniversalFileTools();
}

/**
 * The universal tools class
 */
class UniversalFileTools {

   /**
    * Creates a file at the location you provided
    *
    * @param {String} path The path to the file you want to create
    * @param {Anything} data The data you want to put in the file
    */
   createFile(path, content = "") {
      if (!path) {
         throw new Error("ERROR with createFile: Path is null");
      }
      return fs.writeFileSync(path, content);
   }

   /**
    * Deletes the file you specify
    *
    * @param {String} path The path to the file you want to delete
    */
   deleteFile(path) {
      if (!path) {
         throw new Error("ERROR with deleteFile: path is null");
      }
      if (!this.fileExists(path)) {
         throw new Error(`ERROR with deleteFile: File ${path} does not exists`);
      }
      return fs.unlinkSync(path);
   }

   /**
    * Moves the file from the old location to the new location
    *
    * @param {String} path The path to the file you want to move
    * @param {String} newDir The path to the folder you want to move the file to
    */
   moveFile(path, newDir) {
      if (!path) {
         throw new Error("ERROR with moveFile: oldPath is null");
      }
      if (!this.fileExists(path)) {
         throw new Error(`ERROR with moveFile: File ${path} does not exists`);
      }
      if (!newDir) {
         throw new Error("ERROR with moveFile: newPath is null");
      }
      fs.copyFileSync(path, newDir);
      return this.deleteFile(path);
   }

   /**
    * Duplicates the file you specify
    *
    * @param {String} path The path to the file you want to copy
    * @param {String} copyPath The path to the location you want the new file saved
    */
   copyFile(path, copyPath) {
      if (!path) {
         throw new Error("ERROR with copyFile: path is null");
      }
      if (!this.fileExists(path)) {
         throw new Error(`ERROR with copyFile: File ${path} does not exists`);
      }
      if (!copyPath) {
         return fs.copyFileSync(path, path.replace(".json","-copy.json"));
      } else {
         return fs.copyFileSync(path, copyPath);
      }
   }

   /**
    * Renames the specified file to the new provided name
    *
    * @param {String} path The path to the file you want to rename
    * @param {String} newName The name you want to change the file to
    */
   renameFile(path, newName) {
      if (!path) {
         throw new Error("ERROR with renameFile: path is null");
      }
      if (!this.fileExists(path)) {
         throw new Error(`ERROR with renameFile: The provided file does not exists`);
      }
      if (!newName) {
         throw new Error("ERROR with renameFile: newName is null")
      }
      return fs.renameSync(path, path.replace(path.split(/[\\/]/).pop(), newName));
   }

   /**
    * Returns a boolean whether or not the file exists
    *
    * @param {String} path The path to the file you want to check
    * @returns {Boolean} A boolean
    */
   fileExists(path) {
      if (!path) {
         throw new Error("ERROR with fileExist: path is null");
      }
      if (!fs.statSync(path).isFile()) {
         throw new Error("ERROR with fileExist: The path you have provided is not to a file");
      }
      return fs.existsSync(path);
   }

   /**
    * Returns a boolean whether or not the directory exists
    *
    * @param {String} dir The path to the directory you want to check
    * @returns {Boolean} A boolean
    */
   dirExists(dir) {
      if (!dir) {
         throw new Error("ERROR with dirExist: dir is null");
      }
      if (!fs.statSync(dir).isDirectory()) {
         throw new Error("ERROR with dirExist: The path you have provided is not to a directory");
      }
      return fs.existsSync(dir);
   }

   /**
    * Creates a folder where you specify
    *
    * @param {String} dir The path to where you want the folder created
    */
   createDir(dir) {
      if (!dir) {
         throw new Error("ERROR with createDir: dir is null");
      }
      if (this.dirExists(dir)) {
         return;
      }
      return fs.mkdirSync(dir, { recursive: true });
   }

   /**
    * Returns the data from the file you specify
    * 
    * @param {String} path The path to the txt file you want to read
    */
   readFile(path) {
      if (!path) {
         throw new Error("ERROR with readFile: path is null");
      }
      return fs.readFileSync(path, 'utf8');
   }
}
///////////////////////////////////////////////////////////////////////////
// json Tools /////////////////////////////////////////////////////////////
/**
 * Returns a class filling with tools specific for json files
 *
 * @returns {JsonFileTools} An instance of the class
 */
exports.JsonFileTools = function() {
   return new JsonFileTools();
}

/**
 * The json tools class
 */
class JsonFileTools {
   
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
   Editor(path, options) {
      try {
         require("@acegoal07/json-editor")
      } catch {
         return console.log("To use the editor you need to have a '@acegoal07/json-editor' installed");
      }
      const JsonEditor = require("@acegoal07/json-editor");
      return JsonEditor.editFile(path, options);
   }

   /**
    * Returns the data from the specified file in json format allowing it to be referenced
    *
    * @param {String} path The path to the file you want to read
    * @returns {Object} The data from the file
    */
   readFile(path) {
      if (!path) {
         throw new Error("ERROR with readFile: path is null");
      }
      if (!exports.universalFileTools().fileExists(path)) {
         throw new Error(`ERROR with readFile: The provided file does not exists`);
      }
      return rJson(path);
   }

   /**
    * Returns the data from all the json files in a folder either as a map or array
    *
    * @param {String} dir The path to the directory you want to read data from
    * @param {"Map" | "Array"} format The format you want to the returned
    * @returns {Map | Array} The data returned
    */
   readAllFiles(dir, format = "Map") {
      if (!dir) {
         throw new Error("ERROR with readAllFiles: dir is null");
      }
      if (!exports.universalFileTools().dirExists(dir)) {
         throw new Error(`ERROR with readAllFiles: The provided folder does not exists`);
      }
      if (format === "Array") {
         let array = new Array();
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
      if (!dir) {
         throw new Error("ERROR with getFiles: dir is null");
      }
      if (!fs.statSync(dir).isDirectory()) {
         throw new Error("ERROR with getFile: The path you have provided is not to a file");
      }
      if (!exports.universalFileTools().dirExists(dir)) {
         throw new Error("ERROR with getFile: There is no dir at the path you have provided");
      }
      let array = [];
      for (const file of fs.readdirSync(dir)) {
         if (file.toLowerCase().endsWith(".json")) {
            array.push(file);
         }
      }
      return array;
   }
}