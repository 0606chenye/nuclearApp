/**
 * Created by vicky on 2015/10/14.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.services')
      .factory('Common', Common);

  function Common($http, BACK_END) {
    //console.log(BACK_END.baseUrl);
    var baseUrl = BACK_END.baseUrl;
    function formatPublishDate(date) {
      var diff = moment().startOf('day').diff(date.clone().startOf('day'), 'd');
      var pattern = diff > 1 ? "MM月DD日HH:mm" : ((diff === 0 ? "今天" : "昨天")) + "HH:mm";
      return date.format(pattern);
    }

    return {
      getProvince: function () {
        return $http.get(baseUrl + 'provinces')
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      getCities: function (provinceId) {
        return $http.get(baseUrl + 'cities/' + provinceId)
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      getBusinessdomains: function () {
        return $http.get(baseUrl + 'businessdomains')
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      getTimeLapse: function (date) {
        return formatPublishDate(moment(date))
      }
    }
  }
})();
