'use strict';

var loginController = function ($rootScope, $scope, checkLogin) {
  if (checkLogin.getToken()){
    window.location = '/#/explore';
  }
  $rootScope.bodyClass = 'login';
  $scope.OAuth = checkLogin.beatsOauth;
};

angular.module('beatsMeApp')
  .controller('loginController', ['$rootScope', '$scope', 'checkLogin', loginController]);
