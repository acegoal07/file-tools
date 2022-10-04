///////////////////////////////////////////////////////////////////////////
// Dependencies  /////////////////////////////////////////////////////////
const rJson = require("r-json"),
   fs = require("fs");
///////////////////////////////////////////////////////////////////////////
// General Tools //////////////////////////////////////////////////////////
/**
 * Returns a boolean whether or not the file exists
 * 
 * @param {String} path The path to the file you want to check
 * @returns {Boolean} A boolean
 */
exports.fileExists = function(path) {
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
exports.dirExists = function(dir) {
   if (!dir) {
      throw new Error("ERROR with dirExist: path is null");
   }
   if (!fs.statSync(dir).isDirectory()) {
      throw new Error("ERROR with dirExist: The path you have provided is not to a directory");
   }
   return fs.existsSync(dir);
}
///////////////////////////////////////////////////////////////////////////
// Json Tools /////////////////////////////////////////////////////////////
class JsonTools {
   constructor(path) {
      this.path = path;
   }

   /**
    * Reads all the data from the file
    * 
    * @returns {Object} The data to the file
    */
   read() {
      return rJson(this.path);
   }   
}

/**
 * Takes in the path to the json file and provides tools for it
 * 
 * @param {String} path The path to the json file or directory
 * @returns {JsonTools} An instance of the json tools
 */
exports.jsonFile = function(path) {
   if (!path) {
      throw new Error("ERROR with jsonFile: path is null");
   }
   if (!exports.fileExists(path)) {
      throw new Error("ERROR with jsonFile: There is no file at the path you have provided");
   }
   return new JsonTools(path);
}

/**
 * Returns an array of the files in the directory that are json files
 * 
 * @param {String} dir The path to the directory
 * @returns {Array} An array of names
 */
exports.getJsonFiles = function(dir) {
   if (!dir) {
      throw new Error("ERROR with getJsonFiles: dir is null");
   }
   if (!fs.statSync(dir).isDirectory()) {
      throw new Error("ERROR with getJsonFile: The path you have provided is not to a file");
   }
   if (!exports.dirExists(dir)) {
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