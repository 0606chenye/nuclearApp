/**
 * Created by vicky on 2015/8/21.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('FeedbackCtrl', FeedbackCtrl);

  function FeedbackCtrl($scope, $state, User) {
    var vm = this;

    $scope.textarea = {};
    $scope.textarea.content = '';

    $scope.postFeedback = function () {
      console.log($scope.textarea.content);
      User.postFeedback($scope.textarea.content)
          .then(function (res) {
            console.log(res);
            $scope.textarea.content = '';
            $scope.refreshFeedbacks();
          })
    };
    //User.postFeedback('这是我的第2条feedback');
    //User.postFeedback('这是我的第3条feedback');
    //User.postFeedback('这是我的第4条feedback');
    //User.postFeedback('这是我的第5条feedback');
    //User.postFeedback('这是我的第6条feedback');

    $scope.refreshFeedbacks = function () {
      User.getFeedback()
          .then(function (res) {
            $scope.feedbacks = res;
          })
    };

    $scope.refreshFeedbacks();


  }
})();
