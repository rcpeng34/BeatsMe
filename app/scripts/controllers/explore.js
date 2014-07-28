'use strict';

var exploreController = function($scope, $resource, checkLogin){
  if (!checkLogin.getToken()){
      checkLogin.beatsOauth();
    }
  var token = checkLogin.getToken();
  console.log(token);
  // this is let it go: tr72326023
  
};

angular.module('beatsMeApp')
  .controller('ExploreCtrl', ['$scope', '$resource', 'checkLogin', exploreController]);
