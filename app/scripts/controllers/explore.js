'use strict';

var exploreController = function($rootScope, $scope, $http, checkLogin, songqueue){
  $rootScope.bodyClass = 'explore';
  $scope.key = '6rsmzpmvwfhacmw6hdc33c7z';
  if (!checkLogin.getToken()){
      window.location = '/#/login';
    }
  var token = checkLogin.getToken();

  // load featured and editor picks
  var featuredDone = false;
  var ePicksDone = false;
  $scope.highlights = [];

  $http({method: 'GET', url: 'https://partner.api.beatsmusic.com/v1/api/discoveries/featured?limit=20&offset=0&client_id=' + $scope.key})
    .success(function(data){
      $scope.highlights = $scope.highlights.concat(data.data);
      featuredDone = true;
      bothDone();
    })
    .error(function(data){
      console.log('error|', data);
    });
  $http({method: 'GET', url: 'https://partner.api.beatsmusic.com/v1/api/discoveries/editor_picks?limit=20&offset=0&client_id=' + $scope.key})
    .success(function(data){
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

  $scope.play = function(beatsID, refObj){
    // clear queue
    songqueue.sentenceOff();
    songqueue.clear();
    // refObj for playlist has author:obj|tracks:array|user:obj
    // refObj for album has artist:array|label:obj|tracks:array
    for (var i = 0; i < refObj.tracks.length; i++){
      songqueue.add(refObj.tracks[i].id);
    }
    songqueue.next();
  };
};

angular.module('beatsMeApp')
  .controller('ExploreCtrl', ['$rootScope','$scope', '$http','checkLogin', 'songqueue', exploreController]);
