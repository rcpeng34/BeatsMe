'use strict';

var PlayerController = function ($scope, checkLogin) {
  // set token and key
  var key = 'bpmybfzwbfy84mgf8gewhg4w';
  if (!checkLogin.getToken()){
      checkLogin.beatsOauth();
    }
  var token = checkLogin.getToken();


  var bam = new BeatsAudioManager("myBeatsPlayer");
    bam.on("ready", handleReady);
    bam.on("error", handleError);
    function handleReady(value) { 
        bam.clientId = [key];
        bam.authentication = {
            access_token:[token]
            // , 
            // user_id:['R_Peng']
        };
        bam.identifier = ['tr72326023'];
        bam.load();
    };
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
    };
  $scope.play = function(){
    console.log('playing');
  };
  $scope.pause = function(){
    console.log('paused');
  };
};


angular.module('beatsMeApp')
  .controller('PlayerCtrl', ['$scope', 'checkLogin', PlayerController]);
