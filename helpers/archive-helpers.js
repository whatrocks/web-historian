var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request')

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
	fs.readFile(exports.paths.list, 'utf8', function(err, data) {
		if (err) {
			console.log("Error getting list of urls");
		} else {
			callback(data);
		}
	})
};

exports.isUrlInList = function(target, callback) {
	
	exports.readListOfUrls(function(data) {	
		
		var foundIt = false;

		data = data.split('\n');
		// console.log(data);
		data.forEach(function(url) {
			// console.log("url: ", url);
			if (url === target) {
				foundIt = true;
			}			
		});
		
		callback(foundIt);
		
	});

};

exports.addUrlToList = function(url, callback) {
	fs.writeFile(exports.paths.list, url, 'utf8', function() {
		callback();
	});
};

exports.isUrlArchived = function(target, callback) {
	var isInDirectory = false;
	console.log('ran')
	fs.readdir(exports.paths.archivedSites, function(err, files) {
		files.forEach(function(file) {
			// console.log("file:", file);
			// console.log("target:", exports.paths.archivedSites + "/" + target);
			if (file === target ) {
				isInDirectory = true;
			}
		});
		callback(isInDirectory);
	});
};

exports.downloadUrls = function(urlArray) {
	urlArray.forEach(function(url) {	
	  httpRequest.get({
	    url: url
	    }, '../archives/sites/' + url, function(err, res) {
	      if (err) {
	        console.error(err);
	        return;
	      }
	      console.log("downloaded successfully");
	  });
	})

};
