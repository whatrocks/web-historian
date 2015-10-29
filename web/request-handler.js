var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');
var url = require('url');
var httpRequest = require('http-request')

exports.handleRequest = function (req, res) {
  var headers = helpers.headers;
  var statusCode = 200;

  console.log("Request method: " + req.method);

  if (req.method === 'POST') {
    
      var formEntry = "";
      req.on('data', function(chunk) {
        formEntry += chunk;
      });
      req.on('end', function() {
        
        formEntry = formEntry.slice(4);
        
        console.log(formEntry);

        archive.isUrlInList(formEntry, function(isInList) {
          if (isInList) {
            console.log('is in list');
            // check if its archived
            archive.isUrlArchived(formEntry, function(foundIt) {
              
              if (foundIt) {
                // serve the page
                var dir = String.prototype.slice.call(__dirname, 0,  __dirname.length - 4);

                console.log('serving file');
                console.log("file: ", dir + '/archives/sites/' + formEntry );
                fs.readFile(dir + '/archives/sites/' + formEntry, function(err, data) {                  
                  headers['Content-Type'] = 'text/html';
                  res.writeHead(statusCode, headers);
                  res.end(data);
                });

              } else {
                //serve waiting paige
                helpers.serveAssets(res, '/public/loading.html', headers, function(res, headers, data) {
                  res.writeHead(statusCode, headers);
                  res.end(data);        
                });
              }
            });

          } else {

            archive.addUrlToList(formEntry, function() {

              // console.log("Not in list, adding to list");
              helpers.serveAssets(res, '/public/loading.html', headers, function(res, headers, data) {  
                statusCode = 302;
                res.writeHead(statusCode, headers);
                res.end(data);        
              })


            });
          }
        });        
      });

  } else if (req.method === 'GET') {
    if (req.url === '/') {
      helpers.serveAssets(res, '/public/index.html', headers, function(res, headers, data) {
        res.writeHead(statusCode, headers);
        res.end(data);
      });
    } else {     
        archive.isUrlArchived(req.url.slice(1), function(isFound) {
          console.log('!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', req.url.slice(1))
          if (isFound) {
              helpers.serveArchivedPage(statusCode, headers, req.url, res);
              // headers['Content-Type'] = 'text/html';
              // res.writeHead(statusCode, headers);
              // res.end(data);
            } else {
              archive.isUrlInList(req.url.slice(1), function(isFound) {
                if (isFound) {
                    //serve please come back later
                    helpers.serveWaitingPage(res, '/public/loading.html', headers, statusCode);
                    // helpers.serveAssets(res, '/public/loading.html', headers, function(res, headers, data) {
                    //   res.writeHead(statusCode, headers);
                    //   res.end(data);        
                    // });
                  } else {
                    console.log(String.prototype.slice.call(__dirname, __dirname.length - 6))     
                    if (String.prototype.slice.call(__dirname, __dirname.length - 6) === 'public') {
                      console.log('public!!!!!!!!!!!');
                    }
                    fs.readFile(__dirname + "/public" +req.url, function(err, data) {   
                      console.log(__dirname + req.url);        
                      headers['Content-Type'] = 'text/css';

                      if ( data === null || data === undefined) {
                        statusCode = 404;
                        console.log(404);
                      }
                      res.writeHead(statusCode, headers);
                      res.end(data);
                    });
                  }
              });
            }
        });
    } 
    // OPTIONS
  } else {
    res.writeHead(statusCode, headers);
    res.end();
  }
  

};
