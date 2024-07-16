///////////////////////////////////////////////////////////////////////////
const { DirectoryTools, FileTools } = require("../dist");
const topBottomSize = 28;
const topBottom = `|${"-".repeat(topBottomSize + 2)}|--------|`;
// Log output ////////////////////////////////////////////////////////////
function logFormatter(testName, value = false) {
   console.log(`| ${testName}${" ".repeat((topBottomSize - testName.length))} | ${value ? "\x1b[92mPASSED\x1b[0m" : "\x1b[91mFAILED\x1b[0m"} |`);
}
// Directory Tools tests ////////////////////////////////////////////////
console.log(`${topBottom}
   | DirectoryTools               |        |
   ${topBottom}
   |             TEST             | STATUS |
   ${topBottom}`);
// Create directory /////////////////////////////////////////////////////
try {
   DirectoryTools().createDir("testFiles");
   if (DirectoryTools().dirExists("testFiles")) {
      logFormatter('Directory creation', true);
   } else {
      logFormatter('Directory creation');
   }
} catch (error) {
   logFormatter('Directory creation');
   throw new Error(error);
}
// Get file type /////////////////////////////////////////////////////////
try {
   FileTools().createFile("testFiles/text.txt");
   FileTools().createFile("testFiles/text2.txt");
   if (DirectoryTools().getFileType("testFiles", "txt").length == 2) {
      logFormatter('Get file type', true);
   } else {
      logFormatter('Get file type');
   }
} catch (error) {
   console.log("hello")
   logFormatter('Get file type');
   throw new Error(error);
}
// Is directory empty ///////////////////////////////////////////////////
try {
   if (!DirectoryTools().isDirEmpty("testFiles")) {
      logFormatter('Is directory empty', true);
   } else {
      logFormatter('Is directory empty');
   }
} catch (error) {
   logFormatter('Is directory empty');
   throw new Error(error);
}
// Copy directory /////////////////////////////////////////////////////////
try {
   DirectoryTools().copyDir("testFiles");
   if (DirectoryTools().dirExists("testFiles - copy")) {
      logFormatter('Copy Directory 1', true);
   } else {
      logFormatter('Copy Directory 1');
   }
   DirectoryTools().copyDir("testFiles", { copyDir: "newTestFiles" });
   if (DirectoryTools().dirExists("newTestFiles")) {
      logFormatter('Copy Directory 2', true);
   } else {
      logFormatter('Copy Directory 2');
   }
   DirectoryTools().copyDir("testFiles", { copyDir: "newTestFiles/folder" });
   if (DirectoryTools().dirExists("newTestFiles/folder")) {
      logFormatter('Copy Directory 3', true);
   } else {
      logFormatter('Copy Directory 3');
   }
} catch (error) {
   logFormatter('Copy Directory');
   throw new Error(error);
}
// Empty Directory //////////////////////////////////////////////////////
try {
   DirectoryTools().emptyDir("testFiles");
   if (DirectoryTools().isDirEmpty("testFiles")) {
      logFormatter('Empty directory', true);
   } else {
      logFormatter('Empty directory');
   }
} catch (error) {
   logFormatter('Empty directory');
   throw new Error(error);
}
// Rename Directory /////////////////////////////////////////////////////
try {
   DirectoryTools().renameDir("newTestFiles", "renamedFolder");
   if (DirectoryTools().dirExists("renamedFolder")) {
      logFormatter('Rename directory', true);
   } else {
      logFormatter('Rename directory');
   }
} catch (error) {
   logFormatter('Rename directory');
   throw new Error(error);
}
// Move Directory ///////////////////////////////////////////////////////
try {
   DirectoryTools().moveDir("renamedFolder", "testFiles/renamedFolder");
   if (DirectoryTools().dirExists("testFiles/renamedFolder")) {
      logFormatter('Move directory', true);
   } else {
      logFormatter('Move directory');
   }
} catch (error) {
   logFormatter('Move directory');
   throw new Error(error);
}
// Delete directory /////////////////////////////////////////////////////
try {
   DirectoryTools().deleteDir("testFiles", true);
   if (!DirectoryTools().dirExists("testFiles")) {
      logFormatter('Directory deletion', true);
   } else {
      logFormatter('Directory deletion');
   }
} catch (error) {
   logFormatter('Directory deletion');
   throw new Error(error);
}
// Cleanup /////////////////////////////////////////////////////////////
DirectoryTools().deleteDir("testFiles - copy", true);
console.log(topBottom);