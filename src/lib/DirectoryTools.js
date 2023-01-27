///////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////
const fs = require("fs");
///////////////////////////////////////////////////////////////////////////
// Class /////////////////////////////////////////////////////////////////
/**
 * The class for all directory tools
 */
exports.DirectoryTools = class {
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
      if (fs.existsSync(dir)) {
         if (!fs.statSync(dir).isDirectory()) {
            throw new Error("ERROR with dirExist: The path you have provided is not to a directory");
         }
         return true;
      }
      return false;
   }
   /**
    * Creates a folder where you specify
    *
    * @param {String} dir The path to where you want the folder created
    * @returns {this} An instance of UniversalFileTools
    */
   createDir(dir) {
      if (!dir) {
         throw new Error("ERROR with createDir: dir is null");
      }
      if (!this.dirExists(dir)) {
         fs.mkdirSync(dir, { recursive: true });
      }
      return this;
   }
   /**
    * Deletes specified directory
    *
    * @param {String} dir The path to the folder you want deleted
    * @param {Boolean} force Whether or not it should force delete the folder
    * @returns {this} An instance of UniversalFileTools
    */
   deleteDir(dir, force = false) {
      if (!dir) {
         throw new Error("ERROR with deleteDir: dir is null");
      }
      if (!fs.statSync(dir).isDirectory()) {
         throw new Error("ERROR with deleteDir: The path you have provided is not to a directory");
      }
      if (!this.dirExists(dir)) {
         throw new Error("ERROR with deleteDir: The directory your trying to delete does not exits");
      }
      if (!this.isDirEmpty(dir) && !force) {
         throw new Error("ERROR with deleteDir: The directory your trying to delete is not empty to delete this folder you need force enabled");
      }
      fs.rmSync(dir, { recursive: true, force: force });
      return this;
   }
   /**
    * Checks whether or not the folder specified contains any files
    *
    * @param {String} dir The path to the folder you want to check
    * @returns {Boolean} Whether or not the directory is empty
    */
   isDirEmpty(dir) {
      if (!fs.statSync(dir).isDirectory()) {
         throw new Error("ERROR with isDirEmpty: The path you have provided is not to a directory");
      }
      return fs.readdirSync(dir).length === 0;
   }
   /**
    * Returns an array of file names with the specified file type
    *
    * @param {String} dir The path to the directory you want to search
    * @param {String} fileType The file type you want to get the names of
    * @returns {Array} An array filled with all the names of the files
    */
   getFileType(dir, fileType) {
      if (!dir) {
         throw new Error("ERROR with getFileType: dir is null");
      }
      if (!fileType) {
         throw new Error("ERROR with getFileTypes: fileType is not specified");
      }
      let array = [];
      for (const file of fs.readdirSync(dir)) {
         if (file.toLowerCase().endsWith(fileType.toLowerCase())) {
            array.push(file);
         }
      }
      return array;
   }
}