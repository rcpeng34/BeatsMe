'use strict';

angular.module('beatsMeApp')
  .factory('checkLogin', ['$http', function ($http) {
    var retrieveToken = function () {
      var re = /access_token=.*(?=&token_type)/;
      var dirtyToken = re.exec(window.location.search);
      if (!dirtyToken) {
        return undefined;
      } else {
        return dirtyToken[0].split('=')[1];
      }
    };

    var token = retrieveToken();
    var userID = null;
    
    if (token){
     $http({method: 'GET', url: 'https://partner.api.beatsmusic.com/v1/api/me?access_token=' + retrieveToken()})
      .success(function(response){
        userID = response.result.user_context;
      })
      .error(function(response, status){
        console.log('error in getUser http request status ', status, '|', response);
      });
    }


    // Public API here
    return {
      getToken : function () {
        return token;
      },
      beatsOauth : function(){
        window.location = 'https://partner.api.beatsmusic.com/v1/oauth2/authorize?'
          + '&response_type=token'
          + '&redirect_uri=http://localhost:9000/'
          + '&client_id=6rsmzpmvwfhacmw6hdc33c7z';
      },
      getUserID : function(){
        return userID;
      }
    };
  }]);
