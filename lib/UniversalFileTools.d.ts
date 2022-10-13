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
    createFile(path: string, content?: string): any;
    /**
     * Deletes the file you specify
     *
     * @param {String} path The path to the file you want to delete
     */
    deleteFile(path: string): any;
    /**
     * Moves the file from the old location to the new location
     *
     * @param {String} path The path to the file you want to move
     * @param {String} newDir The path to the folder you want to move the file to
     */
    moveFile(path: string, newDir: string): any;
    /**
     * Duplicates the file you specify
     *
     * @param {String} path The path to the file you want to copy
     * @param {String} copyPath The path to the location you want the new file saved
     */
    copyFile(path: string, copyPath: string): any;
    /**
     * Renames the specified file to the new provided name
     *
     * @param {String} path The path to the file you want to rename
     * @param {String} newName The name you want to change the file to
     */
    renameFile(path: string, newName: string): any;
    /**
     * Returns a boolean whether or not the file exists
     *
     * @param {String} path The path to the file you want to check
     * @returns {Boolean} A boolean
     */
    fileExists(path: string): boolean;
    /**
     * Returns a boolean whether or not the directory exists
     *
     * @param {String} dir The path to the directory you want to check
     * @returns {Boolean} A boolean
     */
    dirExists(dir: string): boolean;
    /**
     * Creates a folder where you specify
     *
     * @param {String} dir The path to where you want the folder created
     */
    createDir(dir: string): any;
    /**
     * Returns the data from the file you specify
     *
     * @param {String} path The path to the txt file you want to read
     * @returns {Anything} The data from the file
     */
    readFile(path: string): Anything;
    /**
     * Writes data to the file you specify
     *
     * @param {String} path The path to the file you want to write the data to
     * @param {Anything} data The data you want to write to the file
     */
    writeFile(path: string, data: Anything): any;
    /**
     * Writes the data from one file to another
     *
     * @param {String} path The path to the file you want to get the data from
     * @param {String} copyPath The path to the file you want to write the data to
     */
    writeCopy(path: string, copyPath: string): any;
    /**
     * Returns an array of file names with the specified file type
     *
     * @param {String} dir The path to the directory you want to search
     * @param {String} fileType The file type you want to get the names of
     * @returns {Array} An array filled with all the names of the files
     */
    getFileType(dir: string, fileType: string): any[];
}
