'use strict';

var PlayerController = function ($scope, checkLogin, songqueue) {
  // set token and key
  var key = 'bpmybfzwbfy84mgf8gewhg4w';
  if (!checkLogin.getToken()){
      checkLogin.beatsOauth();
    }
  var token = checkLogin.getToken();

  $scope.play = function(){
    songqueue.play();
  };
  $scope.pause = function(){
    songqueue.pause();
  };
};


angular.module('beatsMeApp')
  .controller('PlayerCtrl', ['$scope', 'checkLogin', 'songqueue', PlayerController]);
