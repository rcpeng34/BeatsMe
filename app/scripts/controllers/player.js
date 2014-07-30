'use strict';

var PlayerController = function ($scope, $http, checkLogin, songqueue) {
  // set token and key
  var key = 'bpmybfzwbfy84mgf8gewhg4w';
  if (!checkLogin.getToken()){
      checkLogin.beatsOauth();
    }
  var token = checkLogin.getToken();
  var emptySong = {artist: 'None', song: 'None', id: 'None'};
  $scope.songArray = [emptySong, emptySong, emptySong];
  $scope.volume = 0.5;


  $scope.volChange = function(){
    songqueue.volume($scope.volume);
  };
  $scope.play = function(){
    songqueue.play();
  };
  $scope.pause = function(){
    songqueue.pause();
  };
  $scope.previous = function(){
    songqueue.previous();
  };
  $scope.next = function(){
    songqueue.next();
  };
  $scope.updateSongStatus = function(songs){
    var tempSongArray = $scope.songArray;
    songs.forEach(function(value, index){
      // change nuls to emptySong
      if (value === null) {
        $scope.songArray[index] = emptySong;
      } else {
        // check if the song is already in songArray
        var updated = false;
        for (var i = 0; i < tempSongArray.length; i++){
          if (tempSongArray[i].id === value) {
            $scope.songArray[index] = tempSongArray[i];
            updated = true;
            break;
          }
        }
        if (!updated){
          // not in songArray, need to make http request
          $http({method: 'GET', url: 'http://partner.api.beatsmusic.com/v1/api/tracks/' + value + '?client_id=' + key})
            .success(function(response){
              var secLength = response.data.duration%60;
              secLength = '0' + secLength.toString();
              secLength = secLength.substr(-2);
              $scope.songArray[index] = {
                title: response.data.title,
                artist: response.data.artist_display_name,
                id: value,
                duration: Math.floor(response.data.duration/60) + ':' + secLength
              };
            })
            .error(function(response, status){
              console.log('error in updateSongStatus http req with status ', status, '|', response);
            });
        }
      }
    });
  };
  $scope.$on('playerChanged', function(event, args){
    console.log('insidelistener|', event, '|args:', args);
    $scope.updateSongStatus(args);
  });
};


angular.module('beatsMeApp')
  .controller('PlayerCtrl', ['$scope', '$http','checkLogin', 'songqueue', PlayerController]);
