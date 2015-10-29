// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var _ = require('underscore');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

console.log(archive.downloadUrls);
//paths in following function calls may not be correct
fs.readFile('/Users/student/Desktop/2015-10-web-historian/archives/sites.txt', 'utf8', function(err, data) {
	data = data.split('\n');
	data.pop();
	console.log(data);
	fs.readdir('/Users/student/Desktop/2015-10-web-historian/archives/sites', function(err, files) {
		console.log('data: ', data);
		console.log('files: ', files);
		var sitesToDownload = _.difference(data, files);
		archive.downloadUrls(sitesToDownload);
	});
});

