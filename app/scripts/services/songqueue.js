'use strict';

var songqueue = function(checkLogin){
  var playlist = [];
  var key = 'bpmybfzwbfy84mgf8gewhg4w';
  if (!checkLogin.getToken()){
      checkLogin.beatsOauth();
    }
  var token = checkLogin.getToken();

  var bam = new BeatsAudioManager('myBeatsPlayer');
  bam.on("ready", handleReady);
  bam.on("error", handleError);
  function handleReady(value) {
      bam.clientId = [key];
      bam.authentication = {
          access_token:[token]
      };
      bam.load('tr92961795');
  }
  function handleError(value) {
      console.log("Error: " + value);
      switch(value){
          case "auth":
          // Beats Music API auth error (401)
          break;
          case "connectionfailure":
          // audio stream connection failure
          break;
          case "apisecurity":
          // Beats Music API crossdomain error
          break;
          case "streamsecurity":
          // audio stream crossdomain error
          break;
          case "streamio":
          // audio stream io error
          break;
          case "apiio":
          // Beats Music API io error getting track data
          break;
          case "flashversion":
          // flash version too low or not installed
          break;
      }
  }

  return {
    add: function(beatsID){
      playlist.push(beatsID);
    },
    load: function(){
      console.log(playlist);
      if (playlist.length > 0){
        bam.identifier = playlist.shift();
        bam.load();
      }
    },
    pause: function(){
      bam.pause();
    },
    play: function(){
      bam.play();
    },
    clear: function(){
      playlist = [];
    }
  };
};

angular.module('beatsMeApp')
  .factory('songqueue', ['checkLogin', songqueue]);
