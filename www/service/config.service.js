/**
 * Created by vicky on 2015/10/15.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.services')
      .factory('Config', Config);

  function Config($http, BACK_END) {
    var baseUrl = BACK_END.baseUrl;
    var authGroupTypes = [
      {
        id:0, name:'全部'
      },
      {
        id:1, name:'中核'
      },
      {
        id:2, name:'中广核'
      },
      {
        id:3, name:'国电投'
      },
      {
        id:4, name:'中核建'
      },
      {
        id:5, name:'华能'
      },
      {
        id:6, name:'大唐'
      }
    ];
    var orderTypes = [
      {
        id:0, name:'默认顺序'
      },
      {
        id:1, name:'最新加入'
      },
      {
        id:2, name:'点赞最多'
      },
      {
        id:3, name:'关注最多'
      }
    ];
    var brandTypes = [
      {
        id:0, name:'所有'
      },
      {
        id:1, name:'直销'
      },
      {
        id:2, name:'代理'
      }
    ];
    return {
      getAuthGroupTypes: function () {
        return authGroupTypes
      },
      getOrderTypes: function () {
        return orderTypes
      },
      getBrandTypes: function () {
        return brandTypes
      }
    }
  }
})();
