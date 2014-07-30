'use strict';

var sentenceController = function ($scope, $http, checkLogin, songqueue){

  var key = 'bpmybfzwbfy84mgf8gewhg4w';
  if (!checkLogin.getToken()){
      checkLogin.beatsOauth();
    }
  var token = checkLogin.getToken();
  var userID = checkLogin.getUserID();

  $scope.places; 
  $scope.activities;
  $scope.people;
  $scope.genres;

  $http({method: 'GET', url: 'https://partner.api.beatsmusic.com/v1/api/users/' + userID + '/recs/the_sentence_options?time_zone=-0800&access_token=' + token})
    .success(function(response){
      $scope.places = response.data.places;
      $scope.activities = response.data.activities;
      $scope.people = response.data.people;
      $scope.genres = response.data.genres;
      console.log($scope.places);
      console.log($scope.activities);
      console.log($scope.people);
      console.log($scope.genres);
    })
    .error(function(response, status){
      console.log('error in http req getting sentence options with status', status, '|', response);
    });

  $scope.playSentence = function(){
    if ($scope.place && $scope.activity && $scope.person && $scope.genre){
      songqueue.sentenceOn();
      $http({method: 'post', url: 'https://partner.api.beatsmusic.com/v1/api/users/' + userID + '/recs/the_sentence?'
        + 'place=' + $scope.place.id
        + '&activity=' + $scope.activity.id
        + '&people=' + $scope.person.id
        + '&genre=' + $scope.genre.id
        + '&time_zone=-0800&access_token=' + token})
      .success(function(response){
        songqueue.clear();
        for (var i = 0; i < response.data.length; i++){
          songqueue.add(response.data[i].id);
        }
        songqueue.next();
      })
      .error(function(response, status){
        console.log('errored in posting the sentence with status ', status, '|', response);
      });
    } else {
      alert('Please complete the sentence you\'re feeling');
    }
  };
};

angular.module('beatsMeApp')
  .controller('SentenceCtrl', ['$scope', '$http','checkLogin', 'songqueue', sentenceController]);
