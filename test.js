const fileTools = require("./dist");

// Create directory
try {
    fileTools.UniversalFileTools().createDir("testFiles");
    if (fileTools.UniversalFileTools().dirExists("testFiles")) {
        console.log("\x1b[92mDirectory creation test passed\x1b[0m");
    } else {
        console.log("\x1b[91mDirectory creation test Failed\x1b[0m");
    }
} catch (error) {
    console.log("\x1b[91mDirectory creation test Failed\x1b[0m");
    throw new Error(error);
}

// Create file
try {
    fileTools.UniversalFileTools().createFile("testFiles/test.txt");
    if (fileTools.UniversalFileTools().fileExists("testFiles/test.txt")) {
        console.log("\x1b[92mFile creation test passed\x1b[0m");
    } else {
        console.log("\x1b[91mFile creation test Failed\x1b[0m");
    }
} catch (error) {
    console.log("\x1b[91mFile creation test Failed\x1b[0m");
    throw new Error(error);
}

// Copy file
try {
    fileTools.UniversalFileTools().copyFile("testFiles/test.txt");
    if (fileTools.UniversalFileTools().fileExists("testFiles/test-copy.txt")) {
        console.log("\x1b[92mFile copy test passed\x1b[0m");
    } else {
        console.log("\x1b[91mFile copy test Failed\x1b[0m");
    }
} catch (error) {
    console.log("\x1b[91mFile copy test Failed\x1b[0m");
    throw new Error(error);
}

// Delete file
try {
    fileTools.UniversalFileTools().deleteFile("testFiles/test-copy.txt");
    if (!fileTools.UniversalFileTools().fileExists("testFiles/test-copy.txt")) {
        console.log("\x1b[92mFile deletion test passed\x1b[0m");
    } else {
        console.log("\x1b[91mFile deletion test Failed\x1b[0m");
    }
} catch (error) {
    console.log("\x1b[91mFile deletion test Failed\x1b[0m");
    throw new Error(error);
}

// Is directory empty
try {
    if (!fileTools.UniversalFileTools().isDirEmpty("testFiles")) {
        console.log("\x1b[92mIs directory empty test passed\x1b[0m");
    } else {
        console.log("\x1b[91mIs directory empty test Failed\x1b[0m");
    }
} catch (error) {
    console.log("\x1b[91mIs directory empty test Failed\x1b[0m");
    throw new Error(error);
}

// Delete directory
try {
    fileTools.UniversalFileTools().deleteDir("testFiles", true);
    if (!fileTools.UniversalFileTools().dirExists("testFiles")) {
        console.log("\x1b[92mDirectory deletion test passed\x1b[0m");
    } else {
        console.log("\x1b[91mDirectory deletion test Failed\x1b[0m");
    }
} catch (error) {
    console.log("\x1b[91mDirectory deletion test Failed\x1b[0m");
    throw new Error(error);
}