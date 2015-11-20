/**
 * Created by vicky on 2015/8/7.
 */


(function () {
  'use strict';

  angular
      .module('nuclearApp.services')
      .factory('User', User);

  function User($http, BACK_END) {
    var baseUrl = BACK_END.baseUrl;
    var postMessage = function (messages) {
      return $http.post(baseUrl + 'messages', messages)
          .then(function (res) {
            console.log(res.data);
            return res.data.data;
          })
    };
    return {
      sendSMS: function(mobile){
        return $http.post(baseUrl + 'sms/' + mobile)
            .then(function (res) {
              console.log(res.data);
              return res.data.ret;
            })
      },
      resetPassword: function (user) {
        return $http.post(baseUrl + 'init/password', user)
            .then(function (res) {
              console.log(res.data);
              return res.data.ret;
            })
      },
      getInbox: function (queryString) {
        return $http.get(baseUrl + 'inbox', {params:queryString})
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      getOutbox: function (queryString) {
        return $http.get(baseUrl + 'outbox', {params:queryString})
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },

      sendMessage: function (receiveId, content) {
        return $http.post(baseUrl + 'messages',
            {
              //category: 1,
              receiverId: receiveId,
              message: content
            })
            .then(function (res) {
              console.log(res.data);
              return res.data;
            })
      },
      broadcastMessage: function (receiverRoleId, companyType, content, receiverNickName) {
        console.log(receiverNickName);
        return $http.post(baseUrl + 'messages',
            {
              category: 2,
              receiverRoleId: receiverRoleId,
              companyType: companyType,
              content: content,
              receiverNickName: receiverNickName
            })
            .then(function (res) {
              console.log(res.data);
              return res.data;
            })
      },
      getFeedback: function () {
        return $http.get(baseUrl + 'feedback')
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      postFeedback: function (content) {
        return $http.post(baseUrl + 'feedback', {
          content: content
        })
            .then(function (res) {
              console.log(res.data);
            })
      },
      verify: function (info) {
        return $http.post(baseUrl + 'verification', {
          verifyMobile: info.verifyMobile,
          code: info.code,
          businessCard: info.image
        })
            .then(function (res) {
              console.log(res);
              return res.data;
            })
      },

      getMe: function () {
        return $http.get(baseUrl + 'me')
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      updateMe: function (updates) {
        return $http.put(baseUrl + 'me', updates)
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },

      ///api/users/:uid
      getUser: function (id) {
        return $http.get(baseUrl + 'users/' + id)
            .then(function (res) {
              console.log(res.data);
              return res.data.data;

            })
      },
      deleteFavoriteProduct: function (id) {
        return $http.delete(baseUrl + 'favorites/1/' + id)
            .then(function (res) {
             return res.data.ret;
            })
      },
      deleteFavoriteCompany: function (id) {
        return $http.delete(baseUrl + 'favorites/0/' + id)
            .then(function (res) {
              return res.data.ret;
            })
      }
    }
  }
})();
