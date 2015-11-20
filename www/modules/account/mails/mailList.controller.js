/**
 * Created by vicky on 2015/10/19.
 */

(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('MailListCtrl', MailListCtrl);

  function MailListCtrl($scope, $state, Conversation, Common) {
    var vm = this;
    $scope.Common = Common;
    $scope.conversations = [];
    $scope.$on('$ionicView.enter', init);
    $scope.goConversationById  = goConversationById;

    function init(){
      Conversation.getConversations()
          .then(function (res) {
            $scope.conversations = res;
            console.log($scope.conversations)
          })
    }


    function goConversationById (con){
      $state.go('tab.mailDetail/:id' ,{id: con.id, nickName: con.nickName});
    }
    console.log(Common.getTimeLapse(new Date()));


  }





})();
