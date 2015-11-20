/**
 * Created by vicky on 2015/8/7.
 */

(function () {
  'use strict';

  angular
      .module('nuclearApp.services')
      .factory('Brand', Brand);

  function Brand($http, BACK_END) {
    console.log(BACK_END.baseUrl);
    var baseUrl = BACK_END.baseUrl;
    return {
      search: function (queryString) {
        return $http.get(baseUrl + 'brands/search', {params:queryString})
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      }
    }
  }
})();
