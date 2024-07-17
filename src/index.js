// Dependencies //////////////////////////////////////////////////////////
const { FileTools } = require("./lib/FileTools"),
   { DirectoryTools } = require("./lib/DirectoryTools"),
   { JsonFileTools } = require("./lib/JsonFileTools");
// File Tools ////////////////////////////////////////////////////////////
/**
 * Returns a class filled with tools that can be used on any file type
 * @returns {FileTools} An instance of the class
 */
exports.FileTools = () => {
   return new FileTools();
}
// Directory Tools ///////////////////////////////////////////////////////
/**
 * Returns a class filled with tools that can be used to perform functions with directories
 * @returns {DirectoryTools} An instance of the class
 */
exports.DirectoryTools = () => {
   return new DirectoryTools();
}
// Json Tools ////////////////////////////////////////////////////////////
/**
 * Returns a class filling with tools specific for json files
 * @returns {JsonFileTools} An instance of the class
 */
exports.JsonFileTools = () => {
   return new JsonFileTools();
}