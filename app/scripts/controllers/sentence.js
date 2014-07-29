'use strict';

var sentenceController = function ($scope){
  $scope.imPhrases = ['being awesome', 'sleepy', 'poopy'];
  $scope.imSentence = $scope.imPhrases[0];
  $scope.feelingPhrases = ['meh', 'bah', 'lol'];
  
};

angular.module('beatsMeApp')
  .controller('SentenceCtrl', ['$scope', sentenceController]);
