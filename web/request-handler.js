var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');
var httpRequest = require('http-request')
// require more modules/folders here!


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
  // var headers = helpers.headers;
  // var statusCode = 200;
  // console.log("we are checking this url: ", req.url);
  // archive.isUrlInList(req.url, function(isInList) {
  //   if (isInList) {
  //     console.log("found it");
  //   } else {
  //     console.log("not in there, gotta add it");
  //     archive.addUrlToList(req.url, function() {
  //       console.log('added to list');
  //     })
  //   }
  // });

  // httpRequest.get({
  //   url: 'www.google.com',
  //   progress: function(current, total) {
  //     console.log("downloaded %d bytes from %d", current, total);
  //   }
  //  }, "archives/sites/www.google.com", function(err, res) {
  //    if (err) {
  //      console.error(err);
  //      return;
  //    }
  //    console.log(res.code, res.headers, res.file);
  //  });
  

  // , function(err, res) {
  //   console.log(res.buffer.toString());
  // })


  // console.log(req.url)
  // console.log('archive siteAssets', archive.paths.archivedSites)

  if (req.url === '/') {
    helpers.serveAssets(res, '/public/index.html', function(res, data) {
      res.end(data);
    });
  } 
  //else {
  //   // console.log(__dirname + '/archives/sites' + req.url)
  //   helpers.serveAssets(res, archive.paths.archivedSites + req.url, function(res, data) {
  //     console.log('in');
  //     res.end(data);
  //   });
  // }
  // fs.readFile(__dirname + req.url, function(err, data) {
  //   console.log('in'  );
  //   res.writeHead(statusCode, headers);
  //   res.end(data);
  // })
};
