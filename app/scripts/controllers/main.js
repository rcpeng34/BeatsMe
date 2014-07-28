'use strict';

var loginController = function ($scope, checkLogin) {
  $scope.OAuth = checkLogin.beatsOauth;
  if (!checkLogin.getToken()){
    checkLogin.beatsOauth();
  }
  var token = checkLogin.getToken();
};

angular.module('beatsMeApp')
  .controller('loginController', ['$scope', 'checkLogin', loginController]);
