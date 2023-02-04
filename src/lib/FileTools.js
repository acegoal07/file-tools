///////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////
const fs = require("fs");
///////////////////////////////////////////////////////////////////////////
// Class /////////////////////////////////////////////////////////////////
/**
 * The class for all file tools
 */
exports.FileTools = class {
   /**
    * Creates a file at the location you provided
    *
    * @param {String} path The path to the file you want to create
    * @param {String} data The data you want to put in the file
    * @returns {this} An instance of FileTools
    */
   createFile(path, data = null) {
      if (!path) {
         throw new Error("ERROR with createFile: path is null");
      }
      if (this.fileExists(path)) {
         throw new Error("ERROR with createFile: The file you want to create already exists");
      }
      fs.writeFileSync(path, "");
      if (data) {
         this.writeFile(path, data);
      }
      return this;
   }
   /**
    * Deletes the file you specify
    *
    * @param {String} path The path to the file you want to delete
    * @returns {this} An instance of FileTools
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
    * @returns {this} An instance of FileTools
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
      this.deleteFile(path);
      return this;
   }
   /**
    * Duplicates the file you specify
    *
    * @param {String} path The path to the file you want to copy
    * @param {String} copyPath The path to the location you want the new file saved
    * @returns {this} An instance of FileTools
    */
   copyFile(path, copyPath = null) {
      if (!path) {
         throw new Error("ERROR with copyFile: path is null");
      }
      if (!this.fileExists(path)) {
         throw new Error(`ERROR with copyFile: File ${path} does not exists`);
      }
      if (!copyPath) {
         const fileType = path.split(".").pop();
         if (this.fileExists(path.replace(`.${fileType}`, `-copy.${fileType}`))) {
            let count = 1;
            while (true) {
               if (!this.fileExists(path.replace(`.${fileType}`, `-copy${count}.${fileType}`))) {
                  fs.copyFileSync(path, path.replace(`.${fileType}`, `-copy${count}.${fileType}`));
                  break;
               } else {
                  count += 1;
               }
            }
         } else {
            fs.copyFileSync(path, path.replace(`.${fileType}`, `-copy.${fileType}`));
         }
      } else {
         fs.copyFileSync(path, copyPath);
      }
      return this;
   }
   /**
    * Renames the specified file to the new provided name
    *
    * @param {String} path The path to the file you want to rename
    * @param {String} newName The name you want to change the file to
    * @returns {this} An instance of FileTools
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
      fs.renameSync(path, path.replace(path.split(/[\\/]/).pop(), newName));
      return this;
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
      try {
         if (fs.existsSync(path)) {
            if (!fs.statSync(path).isFile()) {
               throw new Error("ERROR with fileExist: The path you have provided is not to a file");
            }
            return true;
         }
         return false;
      } catch(error) {
         return false;
      }
   }
   /**
    * Returns the data from the file you specify
    *
    * @param {String} path The path to the txt file you want to read
    * @returns The data from the file
    */
   readFile(path) {
      if (!path) {
         throw new Error("ERROR with readFile: path is null");
      }
      return fs.readFileSync(path, 'utf8');
   }
   /**
    * Writes data to the file you specify
    *
    * @param {String} path The path to the file you want to write the data to
    * @param data The data you want to write to the file
    * @returns {this} An instance of FileTools
    */
   writeFile(path, data) {
      if (!path) {
         throw new Error("ERROR with writeFile: path is null");
      }
      if (!data) {
         throw new Error("ERROR with writeFile: data is null");
      }
      if (typeof data == "object") {
         fs.writeFileSync(path, JSON.stringify(data, null, 2));
      } 
      else {
         fs.writeFileSync(path, data);
      }
      return this;
   }
   /**
    * Writes the data from one file to another
    *
    * @param {String} path The path to the file you want to get the data from
    * @param {String} copyPath The path to the file you want to write the data to
    * @returns {this} An instance of FileTools
    */
   writeCopy(path, copyPath) {
      if (!path) {
         throw new Error("ERROR with writeFile: path is null");
      }
      if (!copyPath) {
         throw new Error("ERROR with writeFile: copyPath is null");
      }
      this.writeFile(copyPath, fs.readFileSync(path, 'utf8'));
      return this;
   }
   /**
    * Removes all the data from a file
    * 
    * @param {String} path 
    * @returns {this} An instance of FileTools
    */
   blankFile(path) {
      if (!path) {
         throw new Error("ERROR with blankFile: path is null");
      }
      this.writeFile(path, "");
      return this;
   }
}