// Dependencies //////////////////////////////////////////////////////////
const fs = require("fs"),
   fse = require("fs-extra");
// Class /////////////////////////////////////////////////////////////////
/**
 * The class for all file tools
 */
exports.FileTools = class {
   /**
    * Creates a file at the location you provided
    * @param {String} path The path to the file you want to create
    * @param {String} data The data you want to put in the file
    * @returns {this} An instance of FileTools
    */
   createFile(path, data = null) {
      if (!path) { throw new Error("ERROR with createFile: path is null"); }
      if (this.fileExists(path)) { throw new Error(`ERROR with createFile: File "${path}" already exists`); }
      fs.writeFileSync(path, !data ? "" : data);
      return this;
   }
   /**
    * Deletes the file you specify
    * @param {String} path The path to the file you want to delete
    * @returns {this} An instance of FileTools
    */
   deleteFile(path) {
      if (!path) { throw new Error("ERROR with deleteFile: path is null"); }
      if (!this.fileExists(path)) { throw new Error(`ERROR with deleteFile: File "${path}" does not exists`); }
      fs.unlinkSync(path);
      return this;
   }
   /**
    * Moves the file from the old location to the new location
    * @param {String} path The path to the file you want to move
    * @param {String} newDir The path to the folder you want to move the file to
    * @param {Boolean} overwrite Whether or not to replace files with the same name
    * @returns {this} An instance of FileTools
    */
   moveFile(path, newDir, overwrite = false) {
      if (!path) { throw new Error("ERROR with moveFile: oldPath is null"); }
      if (!this.fileExists(path)) { throw new Error(`ERROR with moveFile: File "${path}" does not exists`); }
      if (!newDir) { throw new Error("ERROR with moveFile: newPath is null"); }
      fse.moveSync(path, newDir, { overwrite });
      return this;
   }
   /**
    * Duplicates the file you specify
    * @param {String} path The path to the file you want to copy
    * @param {{
    *    copyPath: String,
    *    overwrite: Boolean
    * }} settings Additional settings that can be used in the process
    * @returns {this} An instance of FileTools
    */
   copyFile(path, settings = { copyPath: null, overwrite: false }) {
      if (!path) { throw new Error("ERROR with copyFile: path is null"); }
      if (!this.fileExists(path)) { throw new Error(`ERROR with copyFile: File "${path}" does not exists`); }
      if (!settings.copyPath) {
         const fileName = path.split("/").pop().split(".")[0];
         if (this.fileExists(path.replace(`${fileName}`, `${fileName} - copy`)) && !settings.overwrite) {
            for (let count = 1; count < Infinity; count++) {
               if (!this.fileExists(path.replace(`${fileName}`, `${fileName} - copy (${count})`))) {
                  fs.copyFileSync(path, path.replace(`${fileName}`, `${fileName} - copy (${count})`));
                  break;
               }
            }
         } else {
            fse.copySync(path, path.replace(`${fileName}`, `${fileName} - copy`), { overwrite: settings.overwrite });
         }
      } else {
         fse.copySync(path, settings.copyPath, { overwrite: settings.overwrite });
      }
      return this;
   }
   /**
    * Renames the specified file to the new provided name
    * @param {String | RegExp} path The path to the file you want to rename
    * @param {String} newName The name you want to change the file to
    * @returns {this} An instance of FileTools
    */
   renameFile(path, newName) {
      if (!path) { throw new Error("ERROR with renameFile: path is null"); }
      if (!this.fileExists(path)) { throw new Error(`ERROR with renameFile: File "${path}" does not exists`); }
      if (!newName) { throw new Error("ERROR with renameFile: newName is null") }
      fs.renameSync(path, path.replace(path.split(/[\\/]/).pop(), newName));
      return this;
   }
   /**
    * Returns a boolean whether or not the file exists
    * @param {String} path The path to the file you want to check
    * @returns {Boolean} A boolean
    */
   fileExists(path) {
      if (!path) { throw new Error("ERROR with fileExist: path is null"); }
      try {
         if (fs.existsSync(path)) {
            if (!fs.statSync(path).isFile()) {
               throw new Error("ERROR with fileExist: The path you have provided is not to a file");
            }
            return true;
         }
         return false;
      } catch (error) {
         return false;
      }
   }
   /**
    * Returns the data from the file you specify
    * @param {String} path The path to the txt file you want to read
    * @returns The data from the file
    */
   readFile(path) {
      if (!path) { throw new Error("ERROR with readFile: path is null"); }
      return fs.readFileSync(path, 'utf8');
   }
   /**
    * Writes data to the file you specify
    * @param {String} path The path to the file you want to write the data to
    * @param data The data you want to write to the file
    * @returns {this} An instance of FileTools
    */
   writeFile(path, data) {
      if (!path) { throw new Error("ERROR with writeFile: path is null"); }
      if (!data) { throw new Error("ERROR with writeFile: data is null"); }
      fs.writeFileSync(path, typeof data == "object" ? JSON.stringify(data, null, 2) : data);
      return this;
   }
   /**
    * Writes the data from one file to another
    * @param {String} path The path to the file you want to get the data from
    * @param {String} copyPath The path to the file you want to write the data to
    * @returns {this} An instance of FileTools
    */
   writeCopy(path, copyPath) {
      if (!path) { throw new Error("ERROR with writeFile: path is null"); }
      if (!copyPath) { throw new Error("ERROR with writeFile: copyPath is null"); }
      this.writeFile(copyPath, fs.readFileSync(path, 'utf8'));
      return this;
   }
   /**
    * Removes all the data from a file
    * @param {String} path
    * @returns {this} An instance of FileTools
    */
   blankFile(path) {
      if (!path) { throw new Error("ERROR with blankFile: path is null"); }
      this.writeFile(path, "");
      return this;
   }
}