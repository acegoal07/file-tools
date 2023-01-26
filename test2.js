const fileTools = require("./src");

fileTools.UniversalFileTools().createDir("test").createFile("test/test.txt", "hello").copyFile("test/test.txt");