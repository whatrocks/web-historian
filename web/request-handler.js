var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "JSON"
};
var actions = {
  'GET': 1,//handle get,
  'POST': 2//handle post
}

var endpoints = {
  // '/' : helpers.serveAssets(res, '/public/index.html', function(res, data) {
    // res.end(data);
  // })
}

exports.handleRequest = function (req, res) {
  var statusCode = 200;
  console.log(req.url)
  console.log('archive siteAssets', archive.paths.archivedSites)

  if (req.url === '/') {
    helpers.serveAssets(res, '/public/index.html', function(res, data) {
      res.end(data);
    });
  } else {
    // console.log(__dirname + '/archives/sites' + req.url)
    helpers.serveAssets(res, archive.paths.archivedSites + req.url, function(res, data) {
      console.log('in');
      res.end(data);
    });
  }
  // fs.readFile(__dirname + req.url, function(err, data) {
  //   console.log('in'  );
  //   res.writeHead(statusCode, headers);
  //   res.end(data);
  // })
};
