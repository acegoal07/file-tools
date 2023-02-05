> These tools can be used edit and manipulate directories

## Available Tools
* <a href="#dirExists">`dirExists`</a> - Returns a boolean whether or not the directory exists
* <a href="#createDir">`createDir`</a> - Creates a folder where you specify
* <a href="#deleteDir">`deleteDir`</a> - Deletes the specified folder
* <a href="#isDirEmpty">`isDirEmpty`</a> - Checks whether or not the specified folder contains files
* <a href="#getFileType">`getFileType`</a> - Returns an array of file names with the specified file type
* <a href="#renameDir">`renameDir`</a> - Renames the specified directory to the new name
* <a href="#moveDir">`moveDir`</a> - Move the directory to a new specified location
* <a href="#copyDir">`copyDir`</a> - Used to make a copy of a directory
* <a href="#emptyDir">`emptyDir`</a> - Ensures that there are no files in a directory and deletes any files if there are some

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

**Returns:**
* `DirectoryTools` - An instance of DirectoryTools

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

**Returns:**
* `DirectoryTools` - An instance of DirectoryTools

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

**Returns:**
* `Boolean` - Whether or not the directory is empty

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

***
## renameDir
> **Description** - Renames the specified directory to the new name

**Parameters:**
* `dir {String}` - The path to the directory
* `newName {String}` - The new name you want to give the directory

**Returns:**
* `DirectoryTools` - An instance of DirectoryTools

**Example:**
```js
const { DirectoryTools } = require("@acegoal07/file-tools");

DirectoryTools().renameDir("test/testDir", "newFolderName");
```

***
## moveDir
> **Description** - Move the directory to a new specified location

**Parameters:**
* `dir {String}` - The path to the directory
* `newDir {String}` - The new path of the directory
* `overwrite {Boolean}` - Whether or not to replace files with the same name

**Returns:**
* `DirectoryTools` - An instance of DirectoryTools

**Example:**
```js
const { DirectoryTools } = require("@acegoal07/file-tools");

// Without overwrite enabled
DirectoryTools().moveDir("test", "folder/test");

// With overwrite enabled
DirectoryTools().moveDir("test", "folder/test", true);
```

***
## copyDir
> **Description** - Used to make a copy of a directory

**Parameters:**
* `dir {String}` - The path to the directory
* `settings {Object}` - Additional settings that can be used in the process

**Additional Settings**
* `copyDir {String}` - The to the copy directory
* `overwrite {Boolean}` - whether or not to overwrite a folder or file with the same name

**Returns:**
* `DirectoryTools` - An instance of DirectoryTools

**Example:**
```js
const { DirectoryTools } = require("@acegoal07/file-tools");

// Just create duplicate of the folder in the same directory
DirectoryTools().copyDir("test");

// Just create duplicate of the folder in the same directory and overwrite any folder with the same name
DirectoryTools().copyDir("test", {overwrite: true});

// Creates a copy with a new name or location
DirectoryTools().copyDir("test", {copyDir: "folder/test"});

// Creates a copy with a new name or location and overwrite any folder with the same name
DirectoryTools().moveDir("test", {copyDir: "folder/test", overwrite: true});
```
## emptyDir
> **Description** - Ensures that there are no files in a directory and deletes any files if there are some

**Parameters:**
* `dir {String}` - The path to the directory you want to empty

**Returns:**
* `DirectoryTools` - An instance of DirectoryTools

**Example:**
```js
const { DirectoryTools } = require("@acegoal07/file-tools");

DirectoryTools().emptyDir("folder");
```