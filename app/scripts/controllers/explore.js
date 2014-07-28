'use strict';

var exploreController = function($scope, $http, checkLogin){
  var key = 'bpmybfzwbfy84mgf8gewhg4w';
  if (!checkLogin.getToken()){
      checkLogin.beatsOauth();
    }
  var token = checkLogin.getToken();
  var featuredDone = false;
  var ePicksDone = false;
  $scope.highlights = [];

  $http({method: 'GET', url: 'https://partner.api.beatsmusic.com/v1/api/discoveries/featured?client_id=' + key})
    .success(function(data){
      console.log('featured loaded');
      $scope.highlights = $scope.highlights.concat(data.data);
      console.log($scope.highlights);
      featuredDone = true;
      bothDone();
    })
    .error(function(data){
      console.log('error|', data);
    });
  $http({method: 'GET', url: 'https://partner.api.beatsmusic.com/v1/api/discoveries/editor_picks?client_id=' + key})
    .success(function(data){
      console.log('editor picks loaded');
      $scope.highlights = $scope.highlights.concat(data.data);
      console.log($scope.highlights);
      ePicksDone = true;
      bothDone();
    })
    .error(function(data){
      console.log('error|', data);
    });
  // helper to add tag of playlist or album to each object
  var bothDone = function(){
    if (featuredDone && ePicksDone) {
      for (var i = 0; i < $scope.highlights.length; i++) {
        if ($scope.highlights[i].content.id.substring(0,2) === 'pl'){
          // it's a playlist
          $scope.highlights[i].musicType = 'playlist';
        } else if ($scope.highlights[i].content.id.substring(0,2) === 'al') {
          $scope.highlights[i].musicType = 'album';
        }
      }
    }
  };
};

angular.module('beatsMeApp')
  .controller('ExploreCtrl', ['$scope', '$http', 'checkLogin', exploreController]);



/* begin code that plays Passenger - Let Her go
note that the token and variables must be strings in an array as noted below

var bam = new BeatsAudioManager("myBeatsPlayer");
bam.on("ready", handleReady);
bam.on("error", handleError);
function handleReady(value) { 
    bam.clientId = ['BPMYBFZWBFY84MGF8GEWHG4W'];
    bam.authentication = {
        access_token:['fk6yt97tusxke9gn8bf7udv5'], 
        user_id:['R_Peng']
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

*/