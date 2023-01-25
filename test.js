///////////////////////////////////////////////////////////////////////////
// References ////////////////////////////////////////////////////////////
const fileTools = require("./dist");
const top_bottom_size = 28;
const top_bottom = `|${"-".repeat(top_bottom_size + 2)}|--------|`;
///////////////////////////////////////////////////////////////////////////
// Log output ////////////////////////////////////////////////////////////
function logFormatter (testName, value = false) {
    console.log(`| ${testName}${" ".repeat((top_bottom_size - testName.length))} | ${value? "\x1b[92mPASSED\x1b[0m" : "\x1b[91mFAILED\x1b[0m"} |`);
}
///////////////////////////////////////////////////////////////////////////
// Universal File Tools tests ////////////////////////////////////////////
console.log(top_bottom);
console.log("| UniversalFileTools                    |");
console.log(top_bottom);
console.log("|             TEST             | STATUS |");
console.log(top_bottom);
// Create directory
try {
    fileTools.UniversalFileTools().createDir("testFiles");
    if (fileTools.UniversalFileTools().dirExists("testFiles")) {
        logFormatter('Directory creation', true);
    } else {
        logFormatter('Directory creation');
    }
} catch (error) {
    logFormatter('Directory creation');
    throw new Error(error);
}
// Create file
try {
    fileTools.UniversalFileTools().createFile("testFiles/test.txt");
    if (fileTools.UniversalFileTools().fileExists("testFiles/test.txt")) {
        logFormatter('File creation test 1', true);
    } else {
        logFormatter('File creation test 1');
    }
    fileTools.UniversalFileTools().createFile("testFiles/testTxt.txt", "hello");
    if (fileTools.UniversalFileTools().fileExists("testFiles/testTxt.txt") && fileTools.UniversalFileTools().readFile("testFiles/testTxt.txt") === "hello") {
        logFormatter('File creation test 2', true);
    } else {
        logFormatter('File creation test 2');
    }
} catch (error) {
    logFormatter('File creation');
    throw new Error(error);
}
// Copy file
try {
    fileTools.UniversalFileTools().copyFile("testFiles/test.txt");
    if (fileTools.UniversalFileTools().fileExists("testFiles/test-copy.txt")) {
        logFormatter('File copy', true);
    } else {
        logFormatter('File copy');
    }
} catch (error) {
    logFormatter('File copy');
    throw new Error(error);
}
// Delete file
try {
    fileTools.UniversalFileTools().deleteFile("testFiles/test-copy.txt");
    if (!fileTools.UniversalFileTools().fileExists("testFiles/test-copy.txt")) {
        logFormatter('File deletion', true);
    } else {
        logFormatter('File deletion');
    }
} catch (error) {
    logFormatter('File deletion');
    throw new Error(error);
}
// Is directory empty
try {
    if (!fileTools.UniversalFileTools().isDirEmpty("testFiles")) {
        logFormatter('Is directory empty', true);
    } else {
        logFormatter('Is directory empty');
    }
} catch (error) {
    logFormatter('Is directory empty');
    throw new Error(error);
}
// Rename file
try {
    fileTools.UniversalFileTools().renameFile("testFiles/test.txt", "test2.txt");
    if (fileTools.UniversalFileTools().fileExists("testFiles/test2.txt")) {
        logFormatter('Rename file', true);
    } else {
        logFormatter('Rename file');
    }
} catch (error) {
    logFormatter('Rename file');
    throw new Error(error);
}
// Move file
try {
    fileTools.UniversalFileTools().moveFile("testFiles/test2.txt", "test2.txt");
    if (fileTools.UniversalFileTools().fileExists("test2.txt")) {
        logFormatter('Move file', true);
    } else {
        logFormatter('Move file');
    }
    fileTools.UniversalFileTools().moveFile("test2.txt", "testFiles/test.txt");
} catch (error) {
    logFormatter('Move file');
    throw new Error(error);
}
// Write file
try {
    fileTools.UniversalFileTools().writeFile("testFiles/testTxt.txt", "passed");
    if (fileTools.UniversalFileTools().readFile("testFiles/testTxt.txt") === "passed") {
        logFormatter('Write file', true);
    } else {
        logFormatter('Write file');
    }
} catch (error) {
    logFormatter('Write file');
    throw new Error(error);
}
// Write copy file
try {
    fileTools.UniversalFileTools().writeCopy("testFiles/testTxt.txt", "testFiles/test.txt");
    if (fileTools.UniversalFileTools().readFile("testFiles/test.txt") === "passed") {
        logFormatter('Write copy', true);
    } else {
        logFormatter('Write copy');
    }
} catch (error) {
    logFormatter('Write copy');
    throw new Error(error);
}
// Get file type
try {
    if (fileTools.UniversalFileTools().getFileType("testFiles", "txt").length == 2) {
        logFormatter('Get file type', true);
    } else {
        logFormatter('Get file type');
    }
} catch (error) {
    console.log("hello")
    logFormatter('Get file type');
    throw new Error(error);
}
// Delete directory
try {
    fileTools.UniversalFileTools().deleteDir("testFiles", true);
    if (!fileTools.UniversalFileTools().dirExists("testFiles")) {
        logFormatter('Directory deletion', true);
    } else {
        logFormatter('Directory deletion');
    }
} catch (error) {
    logFormatter('Directory deletion');
    throw new Error(error);
}
console.log(top_bottom);
///////////////////////////////////////////////////////////////////////////
// Json File Tools tests /////////////////////////////////////////////////
console.log();
console.log(top_bottom);
console.log("| JsonFileTools                         |");
console.log(top_bottom);
console.log("|             TEST             | STATUS |");
console.log(top_bottom);
// Read file
try {
    fileTools.UniversalFileTools().createDir("testFiles");
    fileTools.UniversalFileTools().createFile("testFiles/test.json", 
        {
            "Hello": "World!"
        }
    )
    if (fileTools.JsonFileTools().readFile("testFiles/test.json").Hello == "World!") {
        logFormatter('Read file', true);
    } else {
        logFormatter('Read file');
    }
} catch (error) {
    logFormatter('Read file');
    throw new Error(error);
}
// Read all files
try {
    fileTools.UniversalFileTools().copyFile("testFiles/test.json");
    fileTools.UniversalFileTools().copyFile("testFiles/test.json");
    let count = 0;
    for (const data of fileTools.JsonFileTools().readAllFiles("testFiles", "Array")) {
        if (!data.Hello == "World!") {
            logFormatter('Read all files');
        } else {
            count += 1;
        }
        if (count == fileTools.JsonFileTools().readAllFiles("testFiles", "Array").length) {
        logFormatter('Read all files', true);
        }
    }
} catch (error) {
    logFormatter('Read all files');
    throw new Error(error);
}
// Get files
try {
    if (fileTools.JsonFileTools().getFiles("testFiles").length == 3) {
        logFormatter('Get files', true);
    } else {
        logFormatter('Get files');
    }
} catch (error) {
    logFormatter('Get files');
    throw new Error(error);
}
fileTools.UniversalFileTools().deleteDir("testFiles", true);
console.log(top_bottom);