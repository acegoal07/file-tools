> These tools can be used edit and manipulate directories

## Available Tools
* <a href="#dirExists">`dirExists`</a> - Returns a boolean whether or not the directory exists
* <a href="#createDir">`createDir`</a> - Creates a folder where you specify
* <a href="#deleteDir">`deleteDir`</a> - Deletes the specified folder
* <a href="#isDirEmpty">`isDirEmpty`</a> - Checks whether or not the specified folder contains files
* <a href="#getFileType">`getFileType`</a> - Returns an array of file names with the specified file type

***
## dirExists
> **Description** - Returns a boolean whether or not the directory exists

**Parameters:**
* `dir {String}` - The path to the directory you want to check

**Returns:**
* `Boolean` - Returns a true or false for whether the directory you checked exists or not

**Example:**
```js
const { DirectoryTools } = require("@acegoal07/file-tools");

console.log(DirectoryTools().fileExists("folder"));
```

***
## createDir
> **Description** - Creates a folder where you specify

**Parameters:**
* `dir {String}` - The path to where you want the folder created

**Example:**
```js
const { DirectoryTools } = require("@acegoal07/file-tools");

DirectoryTools().createDir("folder");
```

***
## deleteDir
> **Description** - Deletes the specified folder

**Parameters:**
* `dir {String}` - The path to the directory
* `force {Boolean}` - Used to enable force deleting on folders containing items

**Example:**
```js
const { DirectoryTools } = require("@acegoal07/file-tools");

// Without force
DirectoryTools().deleteDir("folder");

// With force
DirectoryTools().deleteDir("folder", true);
```

***
## isDirEmpty
> **Description** - Checks whether or not the specified folder contains files

**Parameters:**
* `dir {String}` - The path to the directory

**Example:**
```js
const { DirectoryTools } = require("@acegoal07/file-tools");

DirectoryTools().deleteDir("folder");
```

***
## getFileType
> **Description** - Returns an array of file names with the specified file type

**Parameters:**
* `dir {String}` - The path to the directory you want to search
* `fileType {String}` - The file type you want to get the names of

**Returns:**
* `Array` - An array filled with all the names of the files

**Example:**
```js
const { DirectoryTools } = require("@acegoal07/file-tools");

console.log(DirectoryTools().getFileTypes("txtFiles", "txt"));
```