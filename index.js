///////////////////////////////////////////////////////////////////////////
// Dependencies  /////////////////////////////////////////////////////////
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
      fs.writeFile(path, content, function (error) {
         if (error) throw error;
      });      
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
      fs.unlink(path, function (error) {
         if (error) throw error;
      });
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
      fs.copyFile(path, newDir, function (error) {
         if (error) throw error;
      });
      this.deleteFile(path);
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
         fs.copyFile(path, path.replace(".json","-copy.json"), function (error) {
            if (error) throw error;
         });
      } else {
         fs.copyFile(path, copyPath, function (error) {
            if (error) throw error;
         });
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
      fs.rename(path, path.replace(path.split(/[\\/]/).pop(), newName), function (error) {
         if (error) throw error;
      });
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
         throw new Error("ERROR with dirExist: path is null");
      }
      if (!fs.statSync(dir).isDirectory()) {
         throw new Error("ERROR with dirExist: The path you have provided is not to a directory");
      }
      return fs.existsSync(dir);
   }
}
///////////////////////////////////////////////////////////////////////////
// Json Tools /////////////////////////////////////////////////////////////
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
    * Returns the data from the specified file
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
         throw new Error("ERROR with getJsonFiles: dir is null");
      }
      if (!fs.statSync(dir).isDirectory()) {
         throw new Error("ERROR with getJsonFile: The path you have provided is not to a file");
      }
      if (!exports.universalFileTools().dirExists(dir)) {
         throw new Error("ERROR with getJsonFile: There is no dir at the path you have provided");
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