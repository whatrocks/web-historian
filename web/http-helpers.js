var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, headers, callback) {
  fs.readFile(__dirname + asset, function(err, data) {
    var extension = path.extname(__dirname + asset);
    headers['Content-Type'] = 'text/' + extension.slice(1); 
    callback(res, headers, data);
  });
};


exports.sendResponse = function(url ) {

}

exports.serveWaitingPage = function(res, asset, headers, statusCode) {
  exports.serveAssets(res, asset, headers, function(res, headers, data) {
    res.writeHead(statusCode, headers);
    res.end(data);        
  });
}

exports.serveArchivedPage = function(statusCode, headers, target, res) {
  var dir = String.prototype.slice.call(__dirname, 0,  __dirname.length - 4);
  console.log('dir: ', dir)
  fs.readFile(dir + '/archives/sites/' + target.slice(1), function(err, data) {                  
    headers['Content-Type'] = 'text/html';
    res.writeHead(statusCode, headers);
    res.end(data);
  });
}
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!
