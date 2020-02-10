

var express = require('express');
var app = express();
var server = app.listen(5000);
var socket = require('socket.io');
var io = socket(server);
var clients = [];

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    iam_apikey: 'm0uudoJFeK8ozbtxPgvo7AY0N5udjnv4vwC-I7dJM-gm',
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
});

app.use(express.static('public'));
console.log("listening...");

//experimental code-----
io.sockets.on('connection', function (socket){

      clients.push(socket.id);

      socket.on('apiReq', function(text, id){

          getWatsonData(text, function(json){

              for (var i = 0; i < clients.length ; i+=2){
                  if (clients[i] == id){
                      socket.broadcast.to(clients[i+1]).emit('apiRes', json);
                  }
              }

          });
      });

    socket.on('disconnect', function(){

        console.log('user disconnected');

        for (var i = 0; i < clients.length; i++){
            if (clients[i] == socket.id){
                clients.splice(i, 2);
            }
         }
         if (clients.length >= 20){
             clients = [];
         }

         console.log("clients after disconnect", clients, clients.length);

    });

});

// Use our Tone Analyzer variable to analyze the tone.

function getWatsonData(text, callback) {

  // Turn text into valid json.
    var input = { "text": text };

  // The format that the tone analyzer needs.
    var params =
          {
          'tone_input': input,
          'content_type': 'application/json'
          };

    toneAnalyzer.tone(params, function(error, response){
          // checking 4 error.
          if (error)
                  {
                  console.log('Error:', error);
                  }
          // No error, we get tone/result.
          else
                  {
                  // tone of the text, according to watson. converts a JavaScript object or value to a JSON string
                  var tone = JSON.stringify(response, null, 2)

                  // Output Watson's tone analysis to the console.
                  console.log("In \'" + text + "\' I sense feelings of:\n");
                  console.log(tone);
                  callback(tone)
                  }
          });

}
