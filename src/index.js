///////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////
const { FileTools } = require("./lib/FileTools"),
   { DirectoryTools } = require("./lib/DirectoryTools"),
   { JsonFileTools } = require("./lib/JsonFileTools");
///////////////////////////////////////////////////////////////////////////
// File Tools /////////////////////////////////////////////////////////
/**
 * Returns a class filled with tools that can be used on any file type
 *
 * @returns {FileTools} An instance of the class
 */
exports.FileTools = function () {
   return new FileTools();
}
///////////////////////////////////////////////////////////////////////////
// General Tools /////////////////////////////////////////////////////////
/**
 * Returns a class filled with tools that can be used to perform functions with directories
 *
 * @returns {DirectoryTools} An instance of the class
 */
exports.DirectoryTools = function () {
   return new DirectoryTools();
}
///////////////////////////////////////////////////////////////////////////
// Json Tools ////////////////////////////////////////////////////////////
/**
 * Returns a class filling with tools specific for json files
 *
 * @returns {JsonFileTools} An instance of the class
 */
exports.JsonFileTools = function () {
   return new JsonFileTools();
}