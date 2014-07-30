'use strict';

angular
  .module('beatsMeApp', [
    'ngCookies',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginController'
      })
      .when('/explore', {
        templateUrl: 'views/explore.html',
        controller: 'ExploreCtrl'
      })
      .when('/sentence', {
        templateUrl: 'views/sentence.html',
        controller: 'SentenceCtrl'
      })
      .otherwise({
        redirectTo: '/explore'
      });
  });
