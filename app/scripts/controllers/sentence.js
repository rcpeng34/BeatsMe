'use strict';

var sentenceController = function ($scope, checkLogin){
  $scope.imPhrases = ['being awesome', 'sleepy', 'poopy'];
  $scope.imSentence = $scope.imPhrases[0];
  $scope.feelingPhrases = ['meh', 'bah', 'lol'];
  $scope.userID = checkLogin.getUserID();
};

angular.module('beatsMeApp')
  .controller('SentenceCtrl', ['$scope', 'checkLogin', sentenceController]);
