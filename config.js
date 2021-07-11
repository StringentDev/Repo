lstn = []
var fs = require('fs');
var path = require('path');
 
// Return a list of files of the specified fileTypes in the provided dir, 
// with the file path relative to the given dir
// dir: path of the directory you want to search the files for
// fileTypes: array of file types you are search files, ex: ['.txt', '.jpg']
function getFilesFromDir(dir, fileTypes) {
  var filesToReturn = [];
  function walkDir(currentPath) {
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
      var curFile = path.join(currentPath, files[i]);      
      if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
        filesToReturn.push(curFile.replace(dir, ''));
      } else if (fs.statSync(curFile).isDirectory()) {
       walkDir(curFile);
      }
    }
  };
  walkDir(dir);
  return filesToReturn; 
}

	lst = getFilesFromDir("./views", [".html"])
	lst.forEach(function(value){
		value = value.replace(/.html/g, "")
		console.log(`loading ${value.replace(/views\//g, "")}...`)
		lstn.push(value.replace(/views\//g, ""))
	});


module.exports = {

  // Port on which to run the server
  port: 3000,

  // Pages to process for the frontend
  pages: lstn,
}
