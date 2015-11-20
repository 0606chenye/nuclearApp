/**
 * Created by vicky on 2015/8/20.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.services')
      .factory('News', News);

  function News($http, BACK_END) {
    //console.log(BACK_END.baseUrl);
    var baseUrl = BACK_END.baseUrl;
    return {
      getNews: function (queryString) {
        return $http.get(baseUrl + 'news', {params:queryString})
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      }
    }
  }
})();
