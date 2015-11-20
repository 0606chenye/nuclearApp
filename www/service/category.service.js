/**
 * Created by vicky on 2015/8/7.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.services')
      .factory('Category', Category);

  function Category($http, BACK_END) {
    console.log(BACK_END.baseUrl);
    var baseUrl = BACK_END.baseUrl;
    return {
      getAll: function () {
        return $http.get(baseUrl + 'productcategories')
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      }
    }
  }
})();
