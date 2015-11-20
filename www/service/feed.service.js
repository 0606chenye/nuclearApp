/**
 * Created by vicky on 2015/8/7.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.services')
      .factory('Feed', Feed);

  function Feed($http, BACK_END) {
    console.log(BACK_END.baseUrl);
    var baseUrl = BACK_END.baseUrl;
    return {
      getFeedsByDate: function (date) {
        return $http.get(baseUrl + 'feeds/date/' + date)
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      postFeed: function (feed) {
        return $http.post(baseUrl + 'feeds', feed)
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
            .catch(function (res) {
              console.log(res)
            })
      },
      getFeeds: function (queryString) {
        console.log('get Feeds....');
        return $http.get(baseUrl + 'feeds', {params:queryString})
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      getFeedById : function (id) {
       return $http.get(baseUrl+ 'feeds/' + id)
           .then(function (res) {
             console.log(res.data);
             return res.data.data;
           })
      },
      removeFeed: function (id) {
        return $http.delete(baseUrl + 'feeds/' + id)
            .then(function (res) {
              console.log(res.data);
              return res.data.ret;
            })
      },
      getMyFeeds: function (from, size) {
        return $http.get(baseUrl + 'me/feeds', {
          params:{
            from: from,
            size: size}
        })
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      getComments: function (id) {
        return $http.get(baseUrl + 'feeds/' + id + '/comments')
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      postComment: function (comment) {
        return $http.post(baseUrl + 'comments', comment)
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
            .catch(function (res) {
              console.log(res)
            })
      },
      removeComment: function (id) {
        return $http.delete(baseUrl + 'comments' + id)
            .then(function (res) {
              console.log(res.data);
              return res.data;
            })
      },
      likeFeed: function (id) {
        return $http.post(baseUrl + 'likes',
            {
              type: 1,
              likedId: id
            }
        )
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
            .catch(function (res) {
              console.log(res)
            })
      },
      disLikeFeed: function (id) {
        return $http.delete(baseUrl + 'likes/type/1/likedId/' + id)
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
            .catch(function (res) {
              console.log(res)
            })
      }


    }
  }
})();
