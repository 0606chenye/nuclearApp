/**
 * Created by vicky on 2015/10/18.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.services')
      .factory('Conversation', Conversation);

  function Conversation($http, BACK_END) {
    console.log(BACK_END.baseUrl);
    var baseUrl = BACK_END.baseUrl;
    return {
      getConversations: function () {
        return $http.get(baseUrl + 'conversations')
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      getConversationByFriend: function (friendId, date) {
        return $http.get(baseUrl + 'conversations/friends/' + friendId + '/messages', {params:{d: date}})
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      getNewConversationByFriend: function (friendId, date) {
        return $http.get(baseUrl + 'conversations/friends/' + friendId + '/messages/after', {params:{d: date}})
            .then(function (res) {
              console.log(res.data);
              return res.data.data;
            })
      },
      sendMessage: function (receiveId, messages) {
        return $http.post(baseUrl + 'messages',
            {
              receiverId: receiveId,
              message: messages
            })
            .then(function (res) {
              console.log(res.data);
              return res.data;
            })
      },
      getUnreadCount: function () {
        return $http.get(baseUrl + 'conversations/unread')
            .then(function (res) {
              //console.log(res.data);
              return res.data.data;
            })
      }
    }
  }
})();
