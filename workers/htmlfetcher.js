// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var CronJob = require('cron').CronJob;

var fs = require('fs');
fs.writeFile('/Users/student/Desktop/2015-10-web-historian/cronMessage.txt', 'I ran', function() {});

var _ = require('underscore');
var archive = require('/Users/student/Desktop/2015-10-web-historian/helpers/archive-helpers');
///Users/student/Desktop/2015-10-web-historian/helpers/
// archive-helpers'


exports.cron = function() {
	new CronJob('0 * * * * *', function(){
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

}, null, true, "America/Los_Angeles");
}

