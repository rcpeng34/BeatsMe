'use strict';

var loginController = function ($rootScope, $scope, checkLogin) {
  $rootScope.bodyClass = 'login';
  $scope.OAuth = checkLogin.beatsOauth;
  if (!checkLogin.getToken()){
    checkLogin.beatsOauth();
  }
  var token = checkLogin.getToken();
};

angular.module('beatsMeApp')
  .controller('loginController', ['$rootScope', '$scope', 'checkLogin', loginController]);
