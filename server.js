

var express = require('express');
var app = express();
var server = app.listen(5000);
var socket = require('socket.io');
var io = socket(server);
var clients = [];

// api config from ibm website.
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    iam_apikey: 'xxxx',
    url: 'xxxx'
});

app.use(express.static('public'));
console.log("listening...");

io.sockets.on('connection', function (socket){

      // push connections/socket.ids into clients array.
      clients.push(socket.id);

      // socket event for apiRequest (id is the client side socket id)
      socket.on('apiReq', function(text, id){

          getWatsonData(text, function(json){

              // find the server side socket id of user who made apiRequest in clients array and
              // send response to corresponding client side id.
              for (var i = 0; i < clients.length ; i+=2){
                  if (clients[i] == id){
                      socket.broadcast.to(clients[i+1]).emit('apiRes', json);
                  }
              }

          });
      });

      socket.on('disconnect', function(){

          console.log('user disconnected', socket.id);

          // remove server side and client side socket ids of individual users on disconnect.
          for (var i = 0; i < clients.length; i++){
              if (clients[i] == socket.id){
                  clients.splice(i, 2);
              }
           }
           // clear clients array if too many users are connected.
           if ( clients.length >= 20 ){
               clients = [];
           }

           console.log("clients after disconnect", clients, clients.length);

      });

});

// Use our Tone Analyzer variable to analyze the tone.
function getWatsonData(text, callback) {

  // Turn text into valid json.
    var input = {"text": text};

  // The format that the tone analyzer needs.
    var params = {
        'tone_input': input,
        'content_type': 'application/json'
    };

    toneAnalyzer.tone(params, function(error, response){
          // checking 4 error.
        if (error){
            console.log('Error:', error);
        } else {
            // tone of the text, according to watson. converts a JavaScript object or value to a JSON string
            var tone = JSON.stringify(response, null, 2);
            // Output Watson's response to server.
            console.log("In \'" + text + "\' I sense feelings of:\n");
            console.log(tone);
            callback(tone)
        }
    });

}
