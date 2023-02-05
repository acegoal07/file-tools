///////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////
const fs = require("fs"),
   fse = require("fs-extra");
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
      try {
         if (fs.existsSync(dir)) {
            if (!fs.statSync(dir).isDirectory()) {
               throw new Error("ERROR with dirExist: The path you have provided is not to a directory");
            }
            return true;
         }
         return false;         
      } catch(error) {
         return false;
      }
   }
   /**
    * Creates a folder where you specify
    *
    * @param {String} dir The path to where you want the folder created
    * @returns {this} An instance of DirectoryTools
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
    * @returns {this} An instance of DirectoryTools
    */
   deleteDir(dir, force = false) {
      if (!dir) {
         throw new Error("ERROR with deleteDir: dir is null");
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
      if (!this.dirExists(dir)) {
         throw new Error("ERROR with getFileType: The directory you are trying to reach does not exist");
      }
      if (this.isDirEmpty(dir)) {
         throw new Error("ERROR with getFileType: The directory you are trying to retrieve files from is empty");
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
   /**
    * Renames the directory you specify
    * 
    * @param {String} dir The path to the directory
    * @param {String} newName The new name you want to give the directory
    * @returns {this} An instance of DirectoryTools
    */
   renameDir(dir, newName) {
      if (!dir) {
         throw new Error("ERROR with renameDir: dir is null");
      }
      if (!newName) {
         throw new Error("ERROR with renameDir: newName is null");
      }
      if (!this.dirExists(dir)) {
         throw new Error("ERROR with renameDir: The directory you are trying to reach does not exist");
      }
      fs.renameSync(dir, dir.replace(dir.split(/[\\/]/).pop(), newName));
      return this;
   }
   /**
    * 
    * @param {String} dir The path to the directory
    * @param {String} newDir The new path of the directory
    * @param {Boolean} overwrite Whether or not to replace files with the same name
    * @returns {this} An instance of DirectoryTools
    */
   moveDir(dir, newDir, overwrite = false) {
      if (!dir) {
         throw new Error("ERROR with moveDir: dir is null");
      }
      if (!newDir) {
         throw new Error("ERROR with moveDir: newDir is null");
      }
      if (!this.dirExists(dir)) {
         throw new Error("ERROR with moveDir: The directory you are trying to reach does not exist");
      }
      fse.moveSync(dir, newDir, {overwrite: overwrite});
      return this;
   }
   /**
    * 
    * @param {String} dir The path to the directory
    * @param {String} copyDir The to the copy directory
    * @param {{
    *    copyDir: String,
    *    overwrite: boolean
    * }} settings Additional settings that can be used in the process
    * @returns {this} An instance of DirectoryTools
    */
   copyDir(dir, settings = {copyDir: null, overwrite: false}) {
      if (!dir) {
         throw new Error("ERROR with copyDir: dir is null");
      }
      if (!this.dirExists(dir)) {
         throw new Error("ERROR with copyDir: The directory you are trying to reach does not exist");
      }
      if (!settings.copyDir) {
         const folderName = dir.split("/").pop();
         if (!this.dirExists(dir.replace(`${folderName}`, `${folderName}-copy`)) && !settings.overwrite) {
            let count = 1;
            while (true) {
               if (!this.dirExists(dir.replace(`${folderName}`, `${folderName}-copy${count}`))) {
                  fse.copySync(dir, dir.replace(`${folderName}`, `${folderName}-copy${count}`, {overwrite: settings.overwrite}));
                  break;
               } else {
                  count += 1;
               }
            }
         } else {
            fse.copySync(dir, dir.replace(`${folderName}`, `${folderName}-copy`, {overwrite: settings.overwrite}));
         }
      } else {
         fse.copySync(dir, settings.copyDir, {overwrite: settings.overwrite});
      }
      return this;
   }
   /**
    * Ensures that there are no files in a directory and deletes any files if there are some
    * 
    * @param {String} dir The path to the directory you want to empty
    * @returns {this} An instance of DirectoryTools
    */
   emptyDir(dir) {
      if (!dir) {
         throw new Error("ERROR with emptyDir: dir is null");
      }
      if (!this.dirExists(dir)) {
         throw new Error("ERROR with emptyDir: The directory you are trying to reach does not exist");
      }
      fse.emptyDirSync(dir);
      return this;
   }
}