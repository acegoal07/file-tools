> These tools can be used to on all file types

## Available Tools
* <a href="#createFile">`createFile`</a> - Creates a file at the location you provided
* <a href="#deleteFile">`deleteFile`</a> - Deletes the file you specify
* <a href="#moveFile">`moveFile`</a> - Moves the file from the old location to the new location
* <a href="#copyFile">`copyFile`</a> - Duplicates the file you specify
* <a href="#renameFile">`renameFile`</a> - Renames the specified file to the new provided name
* <a href="#fileExists">`fileExists`</a> - Returns a boolean whether or not the file exists
* <a href="#readFile">`readFile`</a> - Returns the data from the file you specify
* <a href="#writeFile">`writeFile`</a> - Writes data to the file you specify
* <a href="#writeCopy">`writeCopy`</a> - Writes the data from one file to another

***
## createFile
> **Description** - Creates a file at the location you provided

**Parameters:**
* `path {String}` - The path to where you want to create the file
* `data {Anything}` - The data you want to put in the file

**Example:**
```js
const { FileTools } = require("@acegoal07/file-tools");

FileTools().createFile("file.txt", "Hello World!");
```

***
## deleteFile
> **Description** - Deletes the file you specify

**Parameters:**
* `path {String}` - The path to file you want to delete

**Example:**
```js
const { FileTools } = require("@acegoal07/file-tools");

FileTools().deleteFile("file.txt");
```

***
## moveFile
> **Description** - Moves the file from the old location to the new location 

**Parameters:**
* `path {String}` - The path to the file you want to move
* `newDir {String}` - The path to the folder you want to move the file to

**Example:**
```js
const { FileTools } = require("@acegoal07/file-tools");

FileTools().moveFile("file.txt", "files/file.txt");
```

***
## copyFile
> **Description** - Duplicates the file you specify

**Parameters:**
* `path {String}` - The path to the file you want to copy
* `copyPath {String}` - The path to the location you want the new file saved

**Example:**
```js
const { FileTools } = require("@acegoal07/file-tools");

// Just create copy duplicate of the file in the same directory
FileTools().copyFile("file.txt");
// Creates a copy with a new name or location
FileTools().copyFile("file.txt", "files/newFile.txt");
```

***
## renameFile
> **Description** - Renames the specified file to the new provided name

**Parameters:**
* `path {String}` - The path to the file you want to rename
* `newName {String} - The name you want to change the file to

**Example:**
```js
const { FileTools } = require("@acegoal07/file-tools");

FileTools().renameFile("file.txt", "newName.txt")
```

***
## fileExists
> **Description** - Returns a boolean whether or not the file exists

**Parameters:**
* `path {String} - The path to the file you want to check

**Returns:**
* `Boolean` - Returns a true or false for whether the file you checked exists or not

**Example:**
```js
const { FileTools } = require("@acegoal07/file-tools");

console.log(FileTools().fileExists("file.json"));
```

**Example:**
```js
const { FileTools } = require("@acegoal07/file-tools");

console.log(FileTools().fileExists("folder"));
```

***
## isDirEmpty
> **Description** - Checks whether or not the specified folder contains files

**Parameters:**
* `dir {String}` - The path to the directory

**Example:**
```js
const { FileTools } = require("@acegoal07/file-tools");

FileTools().deleteDir("folder");
```

***
## readFile
> **Description** - Returns the data from the file you specify

**Parameters:**
* `path {String}` - The path to the txt file you want to read

**Returns:**
* `Anything` - The data from the file

**Example:**
```js
const { FileTools } = require("@acegoal07/file-tools");

console.log(FileTools().readFile("file.txt"));
```

***
## writeFile
> **Description** - Writes data to the file you specify

**Parameters:**
* `path {String}` - The path to the file you want to write the data to
* `data {Anything}` - The data you want to write to the file

**Example:**
```js
const { FileTools } = require("@acegoal07/file-tools");

FileTools().writeFile("file.txt", "Hello World!");
```

***
## writeCopy
> **Description** -  Writes the data from one file to another

**Parameters:**
* `path {String}` - The path to the file you want to get the data from
* `copyPath {String}` - The path to the file you want to write the data to

**Example:**
```js
const { FileTools } = require("@acegoal07/file-tools");

FileTools().writeCopy("layout.txt", "newFile.txt");
```