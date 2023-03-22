This wiki contains all the information about @acegoal07/file-tools you'll need

# Installation
```sh
npm i @acegoal07/file-tools
```

# Example
```js
const { FileTools, DirectoryTools, JsonFileTools } = require("@acegoal07/file-tools");

FileTools().createFile("hello.json", {});

DirectoryTools().createDir("JsonFiles");

const JsonData = JsonFileTools().readFile("hello.json");
```

# Available tools
> !! This package is still a working progress and more features will be added as time goes on !!

> As of the moment there are only 3 sections of tools Directory, File and Json more will come as the package is updated, if there are any tools you would like added please recommend them and i shall work on adding the tools to the package

## <a href="https://github.com/acegoal07/file-tools/wiki/FileTools">FileTools</a>
> These tools are used to edit files and can be used for all file types

## <a href="https://github.com/acegoal07/file-tools/wiki/DirectoryTools">DirectoryTools</a>
> These are tools used for to edit and manipulate directories

## <a href="https://github.com/acegoal07/file-tools/wiki/JsonFileTools">JsonFileTools</a>
> These tools are specific to Json files