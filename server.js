"use strict";

var express = require ('express'),
    http    = require ('http'),
    https   = require ('https');

var app = express();
var httpport = process.env.port || 9000;

var server = app.listen(httpport, function() {
    console.log('Listening on port %d', '|', server.address().port, '|' + typeof(server.address().port));
    console.log('process.env.port', process.env.port);
});

// Serve up content from public directory
app.use('/', express.static(__dirname + '/app'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));


// get request handlers
app.use('/beatsID/:id', function(req, res) {

  var options = {
    hostname: 'partner.api.beatsmusic.com',
    path: '/v1/api/me?access_token=' + req.params.id + '&client_id=BPMYBFZWBFY84MGF8GEWHG4W',
    method: 'GET'
  };

  https.get(options, function(response){
    console.log(response.statusCode);
    response.setEncoding('utf8');
    response.on('data', function(beatsRes){
      if (response.statusCode === 200){
        res.send(beatsRes);
      } else {
        res.status(response.statusCode).send('error making https to beatsmusic for /me');
      }
    });

  });

});
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/app/index.html');
});
