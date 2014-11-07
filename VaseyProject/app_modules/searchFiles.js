/**
 * Deep search files by simple name-pattern in a directory.
 * exports: function(path,strPattern) -- return an array of file names.
 * path: searching root directory, the absolute path-name, e.g. 'c:\dir1\dirs2\my-directory'. 
 * strPattern: An array of name wildcard for 'last characters in file name'.
 * 			E.g. ['.js','mon.css','title.html']: 
 * 			All .js files are matching, common.css and titile.html are matching too.
 * return: The returned array contain filenames with path but the searching root is stripped.
 * 			E.g. ['/scripts/start.js', '/styles/common.css', '/title.html']
 */

var fs = require('fs'); 

var rootDir;
fileList = [];							//for simple list return

function search(path,strPattern){ 
	
	var dirList = fs.readdirSync(path);
	
	dirList.forEach(function(item){
		
	    if(fs.statSync(path + '/' + item).isDirectory()){
	        search(path +'/'+ item, strPattern);	//recursion
	    }else{
	    	strPattern.forEach(function(name){
	    		//include the strPattern as last characters
	    		if(item.indexOf(name)!=-1 && item.indexOf(name)==item.length-name.length){
	    			//Strip the searching root.
	    			//fileList.push(path.replace(rootDir,'') +'/'+ item);
	    			fileList.push(path +'/'+ item);		//not stripping path!
	    			
	    		};
	    	});
	    }
	});
}


module.exports = function(paths,strPattern){
	paths.forEach(function(path){
		rootDir = path;
		search(path,strPattern);
	});
	
	return fileList;	//return the simple array directly.
}
