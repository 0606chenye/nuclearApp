/**
 * Created by vicky on 2015/10/19.
 */
(function () {
    'use strict';

    angular
        .module('nuclearApp.controllers')
        .controller('MailDetailCtrl', MailDetailCtrl);

    function MailDetailCtrl($scope, $rootScope, $stateParams, $interval, $timeout, $ionicScrollDelegate, Conversation, Common, User) {
        var vm = this;
        var id = $stateParams.id;
        $scope.nickName = $stateParams.nickName;
        $scope.Common = Common;
        $scope.currentUser = {};
        $scope.conversation = [];
        $scope.$on('$ionicView.enter', init);
        $scope.isSentByMe = isSentByMe;
        $scope.eldestMessageDate = new Date().getTime();
        $scope.latestMessageDate = new Date().getTime();
        $scope.loadMoreMessages = loadMoreMessages;
        $scope.getElderMessages = getElderMessages;
        $scope.messageInupt = '';
        $scope.sendMessage = sendMessage;

        var stop = $interval(function () {
            loadMoreMessages();
        }, 4000);
      $scope.$on('$ionicView.leave',
          function(event) {
            $interval.cancel(stop);
          });
        function init(){
            User.getMe()
                .then(function (res) {
                    $scope.currentUser = res;
                    console.log($rootScope.currentUser);
                })
                .then(function () {
                    Conversation.getConversationByFriend(id, $scope.latestMessageDate)
                        .then(function (res) {
                            //res = _(res).reverse().value();
                            $scope.conversation = res;
                            console.log($scope.conversation);
                            $scope.eldestMessageDate =  moment(_.first($scope.conversation).date).valueOf();
                            $scope.latestMessageDate =  moment(_.last($scope.conversation).date).valueOf()+10;
                            console.log($scope.latestMessageDate);
                            $ionicScrollDelegate.$getByHandle('conversationContent').scrollBottom();

                        })
                });
        }

        function isSentByMe(message) {
            return $scope.currentUser.id === message.sender
        }

        function getElderMessages() {
            Conversation.getConversationByFriend(id, $scope.eldestMessageDate)
                .then(function (res) {
                    console.log(res);
                    $scope.conversation = res.concat($scope.conversation);
                });
            $scope.$broadcast('scroll.refreshComplete');

        }

        function loadMoreMessages() {
            Conversation.getNewConversationByFriend(id, $scope.latestMessageDate)
                .then(function (res) {
                    console.log(res);
                    if(_.isEmpty(res)){
                        return
                    }
                    //res = _(res).reverse().value();
                    $scope.latestMessageDate =  moment(_.last(res).date).valueOf()+10;
                    console.log($scope.latestMessageDate);
                    $scope.conversation = $scope.conversation.concat(res);
                    $ionicScrollDelegate.$getByHandle('conversationContent').scrollBottom();
                })

        }

        function sendMessage() {
            console.log($scope.messageInupt);
            Conversation.sendMessage(id, $scope.messageInput)
                .then(function (res) {
                    console.log(res);
                    if(res.ret === 0 ){
                        $scope.messageInput = '';
                        $scope.conversation.push(res.message);
                        $scope.latestMessageDate =  moment(res.message.date).valueOf()+10;
                        $ionicScrollDelegate.$getByHandle('conversationContent').scrollBottom();
                    }
                })
        }

        //console.log(Common.getTimeLapse(new Date()));


    }





})();
