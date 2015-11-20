/**
 * Created by vicky on 2015/8/7.
 */

(function () {
  'use strict';

  angular
      .module('nuclearApp.services')
      .factory('Search', Search);

  function Search($http,$rootScope, BACK_END) {
    console.log(BACK_END.baseUrl);
    var baseUrl = BACK_END.baseUrl;
    var searchQuery;

    return {
      searchProduct: function (
           from, size) {
        var params = {
          type: 2,
          q: searchQuery,
          //hasServiceHistory: hasServiceHistory,
          //authGroup: authGroup,
          //brandType: brandType,
          from: from,
          size: size
        };
        //if (params.authGroup === null){
        //  delete params.authGroup;
        //}
        //if (params.brandType === null){
        //  delete params.brandType;
        //}
        console.log(params);
        return $http.get(baseUrl + 'search',
            {params: params})
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      searchCompany: function (
         from, size) {
        var params = {
          type: 1,
          q: searchQuery,
          from: from,
          size: size
        };
        console.log(params);
        return $http.get(baseUrl + 'search',
            {params: params})
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      setSearchQuery: function (query) {
        searchQuery = query;
        console.log(searchQuery);

      },
      resetSearch: function () {
        searchQuery = '';
      },
      getProducthResult: function () {
        return productResult
      },
      getCompanyResult: function () {
        return companyResult
      }
    }
  }
})();
