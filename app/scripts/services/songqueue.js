'use strict';

var songqueue = function($rootScope, checkLogin){
  var playList = [];
  var finishList = [];

  var key = 'bpmybfzwbfy84mgf8gewhg4w';
  if (!checkLogin.getToken()){
      checkLogin.beatsOauth();
    }
  var token = checkLogin.getToken();
  var sentence = false;

  var bam = new BeatsAudioManager('myBeatsPlayer');
  bam.on("ready", handleReady);
  bam.on("error", handleError);
  function handleReady(value) {
      bam.clientId = [key];
      bam.authentication = {
          access_token:[token]
      };
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


  bam.playNext = function(){
    bam.stop();
    finishList.push(bam.identifier);
    if (playList.length > 0){
      bam.identifier = playList.shift();
      bam.load();
    }
    if (sentence && playList.length < 1) {
      $rootScope.$broadcast('getSentence', [true]);
    }
    $rootScope.$broadcast('playerChanged', [finishList[finishList.length-1], bam.identifier, playList[0]]);
  };

  bam.playPrevious = function(){
    bam.stop();
    // if this was invoked within 3 seconds of the song start, play the previous song
    if (bam.currentTime < 4 && finishList.length>0){
      // put current song back into the queue
      playList.unshift(bam.identifier);
      bam.identifier = finishList.pop();
    }
    bam.load();
    $rootScope.$broadcast('playerChanged', [finishList[finishList.length-1], bam.identifier, playList[0]]);
  };

  bam.on('ended', function(){
    bam.playNext();
  });
  
  return {
    sentenceOn: function(){
      sentence = true;
      console.log(sentence);
    },
    sentenceOff: function(){
      sentence = false;
      console.log(sentence);
    },
    add: function(beatsID){
      playList.push(beatsID);
    },
    previous: function(){
      bam.playPrevious();
    },
    next: function(){
      bam.playNext();
    },
    pause: function(){
      bam.pause();
    },
    play: function(){
      if (bam.paused){
        bam.play();
      } else {
        bam.pause();
      }
    },
    clear: function(){
      playList = [];
    },
    get: function(){
      // returns an array of track ID [just_played, current, next]
      return [finishList[finishList.length-1], bam.identifier, playList[0]];
    },
    volume: function(num){
      bam.volume = num;
    }
  };
};

angular.module('beatsMeApp')
  .factory('songqueue', ['$rootScope','checkLogin', songqueue]);
