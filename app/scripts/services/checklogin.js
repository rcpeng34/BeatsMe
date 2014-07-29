'use strict';

angular.module('beatsMeApp')
  .factory('checkLogin', function () {
    // Public API here
    return {
      getToken: function () {
        var re = /access_token=.*(?=&token_type)/;
        var dirtyToken = re.exec(window.location.search);
        if (!dirtyToken) {
          return undefined
        } else {
          return dirtyToken[0].split('=')[1];
        }
      },
      beatsOauth : function(){
        window.location = 'https://partner.api.beatsmusic.com/v1/oauth2/authorize?'
          + '&response_type=token'
          + '&redirect_uri=http://localhost:9000/'
          + '&client_id=BPMYBFZWBFY84MGF8GEWHG4W';
      }
    };
  });
