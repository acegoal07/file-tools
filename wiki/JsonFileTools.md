> These tools are specific to json files and allow for you to interact with json files in different ways

## Available Tools
* <a href="#editor">`editor`</a> - Returns an instance of @acegoal07/json-editor's json file editor
* <a href="#readFile">`readFile`</a> - Returns an object of the file you specified allowing it to be referenced
* <a href="#readAllFiles">`readAllFiles`</a> - Returns either a map or array of data from json files within a directory
* <a href="#getFiles">`getFiles`</a> - Searches a directory and a array list of files that are json files

***
## editor
> **Description** - Returns an instance of @acegoal07/json-editor's json file editor

**Parameters:**
* `path {String}` - This is the directory path to the file you want to open an editor for
* `options {Object}` - This is an object of options that can be used by the editor for certain actions to find more check this <a href="https://github.com/acegoal07/json-editor/wiki/Editor-Documentation">wiki</a>

**Returns:** 
* `JsonEditor` - An instance of the @acegoal07/json-editor's json file editor offering a selection of tools that can be used to edit the data within the file

**Example:**
```js
const { JsonFileTools } = require("@acegoal07/file-tools");

let file = JsonFileTools().editor("file.json", {autosave: true});
```

***
## readFile
> **Description** - Returns an object of the file you specified allowing it to be referenced

**Parameters:**
* `path {String}` - This is the directory path to the file you want to read the data from 

**Returns:**
* `Object` - Returns an object of the data from the file 

**Example:**
```js
const { JsonFileTools } = require("@acegoal07/file-tools");

const data = JsonFileTools().readFile("file.json");
```

***
## readAllFiles
> **Description** -  Returns either a map or array of data from json files within a directory

**Parameters:**
* `dir {String}` - The path to the directory you want to read all the files from 

**Returns:**
* `Map or Array` - Either a map or array of data from all the json files in the directory

**Example:**
```js
const { JsonFileTools } = require("@acegoal07/file-tools");

// Map return
const map = JsonFileTools().readAllFiles("jsonFile");
// Array return
const array = JsonFileTools().readAllFiles("jsonFile", "Array");
```

***
## getFiles
> **Description** - Searches a directory and a array list of files that are json files

**Parameters:**
* `dir {String}` - The path to the directory you want to search for json files

**Returns:**
* `Array` - Returns an array filled with the names of files that are json files in a directory

**Example:**
```js
const { JsonFileTools } = require("@acegoal07/file-tools");

const data = JsonFileTools().getFiles("files");
```