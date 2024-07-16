///////////////////////////////////////////////////////////////////////////
const { FileTools } = require("../dist");
const top_bottom_size = 28;
const top_bottom = `|${"-".repeat(top_bottom_size + 2)}|--------|`;
// Log output ////////////////////////////////////////////////////////////
function logFormatter(testName, value = false) {
   console.log(`| ${testName}${" ".repeat((top_bottom_size - testName.length))} | ${value ? "\x1b[92mPASSED\x1b[0m" : "\x1b[91mFAILED\x1b[0m"} |`);
}
// File Tools tests /////////////////////////////////////////////////////
console.log(top_bottom);
console.log("| FileTools                    |        |");
console.log(top_bottom);
console.log("|             TEST             | STATUS |");
console.log(top_bottom);
// Create file /////////////////////////////////////////////////////////
try {
   FileTools().createFile("test.txt");
   if (FileTools().fileExists("test.txt")) {
      logFormatter('File creation test 1', true);
   } else {
      logFormatter('File creation test 1');
   }
   FileTools().createFile("testTxt.txt", "hello");
   if (FileTools().fileExists("testTxt.txt") && FileTools().readFile("testTxt.txt") === "hello") {
      logFormatter('File creation test 2', true);
   } else {
      logFormatter('File creation test 2');
   }
} catch (error) {
   logFormatter('File creation');
   throw new Error(error);
}
// Copy file ///////////////////////////////////////////////////////////
try {
   FileTools().copyFile("test.txt");
   if (FileTools().fileExists("test - copy.txt")) {
      logFormatter('File copy', true);
   } else {
      logFormatter('File copy');
   }
} catch (error) {
   logFormatter('File copy');
   throw new Error(error);
}
// Rename file /////////////////////////////////////////////////////////
try {
   FileTools().renameFile("test.txt", "test2.txt");
   if (FileTools().fileExists("test2.txt")) {
      logFormatter('Rename file', true);
   } else {
      logFormatter('Rename file');
   }
} catch (error) {
   logFormatter('Rename file');
   throw new Error(error);
}
// Move file ///////////////////////////////////////////////////////////
try {
   FileTools().moveFile("test2.txt", "../test2.txt");
   if (FileTools().fileExists("../test2.txt")) {
      logFormatter('Move file', true);
   } else {
      logFormatter('Move file');
   }
   FileTools().moveFile("../test2.txt", "test2.txt");
} catch (error) {
   logFormatter('Move file');
   throw new Error(error);
}
// Write file //////////////////////////////////////////////////////////
try {
   FileTools().writeFile("testTxt.txt", "passed");
   if (FileTools().readFile("testTxt.txt") === "passed") {
      logFormatter('Write file', true);
   } else {
      logFormatter('Write file');
   }
} catch (error) {
   logFormatter('Write file');
   throw new Error(error);
}
// Write copy file /////////////////////////////////////////////////////
try {
   FileTools().writeCopy("testTxt.txt", "test2.txt");
   if (FileTools().readFile("test2.txt") === "passed") {
      logFormatter('Write copy', true);
   } else {
      logFormatter('Write copy');
   }
} catch (error) {
   logFormatter('Write copy');
   throw new Error(error);
}
// Delete file /////////////////////////////////////////////////////////
try {
   FileTools().deleteFile("test - copy.txt");
   if (!FileTools().fileExists("test - copy.txt")) {
      logFormatter('File deletion', true);
   } else {
      logFormatter('File deletion');
   }
} catch (error) {
   logFormatter('File deletion');
   throw new Error(error);
}
// Cleanup /////////////////////////////////////////////////////////////
FileTools().deleteFile("test2.txt");
FileTools().deleteFile("testTxt.txt");
console.log(top_bottom);