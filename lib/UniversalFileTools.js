// Dependencies
const fs = require("fs");

// Class
/**
 * The universal tools class
 */
export class UniversalFileTools {

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