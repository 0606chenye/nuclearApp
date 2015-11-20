/**
 * Created by vicky on 2015/8/14.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('MailsCtrl', MailsCtrl);

  function MailsCtrl($scope, $state, $ionicSlideBoxDelegate, $timeout, User) {
    var vm = this;

    var mailTabSlideBoxDelegate = $ionicSlideBoxDelegate.$getByHandle('mailTabs');
    $scope.$on('$ionicView.enter',
        function(event){
          var mailTabSlideBoxDelegate = $ionicSlideBoxDelegate.$getByHandle('mailTabs');

          console.log(mailTabSlideBoxDelegate.count());
          mailTabSlideBoxDelegate.slide(0);
        });


    User.getInbox({
      from:0,
      size:10
    })
        .then(function (res) {
          $scope.inboxMails = res;
        });

    User.getOutbox({
      from:0,
      size:10
    })
        .then(function (res) {
          $scope.outboxMails = res;
        });


    $scope.setActiveMail = function (mail, type) {
      var mails = type === 'inbox' ? $scope.inboxMails : $scope.outboxMails;
      _.forEach(mails, function (mail) {
        mail.active = false;
      });
      mail.active = true;
    };

    $scope.replyMail = function (mail) {
      User.sendMessage(mail.publisherId, mail.replyContent)
          .then(function (res) {
            console.log(res);
            mail.replyContent = '';
            mailTabSlideBoxDelegate.slide(1);
            //  $timeout(function () {
            //    ionic.trigger('release','');
            //  }, 500)
          })
    };

    $scope.setReplyMail = function (mail) {
      _.forEach($scope.inboxMails, function (mail) {
        mail.replayMail = false;
      });
      mail.replayMail = true;
    };

    $scope.resetReplyMail = function (mail) {
      mail.replyMail = false;

    };
    $scope.onSliderChange = function (index) {
      $scope.currentSlider = index;
    }

  }





})();
