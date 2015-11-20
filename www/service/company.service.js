/**
 * Created by vicky on 2015/8/7.
 */

(function () {
  'use strict';

  angular
      .module('nuclearApp.services')
      .factory('Company', Company);

  function Company($http, BACK_END) {
    console.log(BACK_END.baseUrl);
    var baseUrl = BACK_END.baseUrl;
    return {
      search: function (queryString) {
        return $http.get(baseUrl + 'companies/search', {params:queryString})
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      countByName: function (queryString) {
        return $http.get(baseUrl + 'companies/count', {params:queryString})
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      getCompanies: function (queryString) {
        return $http.get(baseUrl + 'search', {params:queryString})
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      getCompany: function (id) {
        return $http.get(baseUrl + 'companies/' + id)
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      getProductByCompany: function (id) {
        return $http.get(baseUrl + 'companies/' + id + 'products')
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      favoriteCampanyById: function (id) {
        var body = {
          type: 0,
          favoriteId: id
        };
        return $http.post(baseUrl + 'favorites', body)
            .then(function (res) {
              console.log(res.data);
              return res.data;
            })
            .catch(function (res) {
              console.log(res);
            })
      },
      //companies/:companyId/likes
      likeCompanyById: function (companyId) {
        return $http.post(baseUrl + 'companies/' + companyId + '/likes')
            .then(function (res) {
              console.log(res.data);
              return res.data;
            })
      },
      cancelLikeCompanyById: function (companyId) {
        return $http.delete(baseUrl + 'companies/' + companyId + '/likes')
            .then(function (res) {
              console.log(res.data);
              return res.data;
            })
      },
      addCompanyFavorite: function (favoriteId) {
        return $http.post(baseUrl + 'favorites',
            {
              type: 0,
              favoriteId: favoriteId
            })
            .then(function (res) {
              console.log(res.data);
              return res.data.ret;
            })
      },
      getCompanyFavorites: function (queryString) {
        return $http.get(baseUrl + 'favorites/type/0',
            {params:queryString})
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      }


    }

  }
})();
