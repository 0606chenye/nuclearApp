/**
 * Created by vicky on 2015/8/8.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('FeedCtrl', FeedCtrl);

  function FeedCtrl($scope, $state, $stateParams, $ionicModal, $timeout, $location, $ionicScrollDelegate, Feed, Common) {
    var vm = this;
    $scope.feed = $stateParams.feed;
    $scope.Common = Common;

    //$location.hash('theBottom');
    //$ionicScrollDelegate.anchorScroll();
    if(!_.isEmpty($scope.feed.imageUrl)){
      $scope.feed.images = [];
      $scope.feed.imageUrl.split(',').forEach(function (url) {
        $scope.feed.images.push(url);
      });
    }

    $scope.showComment = function () {
      Feed.getComments($scope.feed.id)
          .then(function (res) {
            console.log(res);
            $scope.feed.comments = res;
            $scope.feed.commentCount = res.length;
            $ionicScrollDelegate.$getByHandle('feedContent').scrollBottom();

          });
    };
    $scope.showComment();
    console.log($scope.feed);
    //Feed.getFeedById(id)
    //    .then(function (res) {
    //      console.log(res);
    //      $scope.feed = res;
    //    });
    //$scope.feed.images = ['img/pic1.jpg','img/pic2.jpg','img/pic3.jpg','img/circle-GE_1.jpeg','img/circle-GE_2.jpeg','img/circle-GE_3.jpeg'];

    $scope.replyWhichComment = function (comment) {
      //$scope.replyComment = comment;
      console.log(comment);
      $scope.replyComment = comment;
      $scope.setReplying();

    };
    $scope.selectReplyWhom = function (nickName) {
      $scope.replyWhom = nickName;
    };


    $scope.setReplying = function () {
      $ionicModal.fromTemplateUrl('modules/circle/feedReply/feed-reply.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    };
    $scope.cancelReplying = function () {
      $scope.replying = false;
      if($scope.replyWhom) {
        delete $scope.replyWhom;
      }
      $scope.modal.hide();
    };

    var posting = false;
    $scope.postComment = function () {
      console.log(posting);
      if(posting){
        return;
      }
      //$scope.$apply(function () {
        posting = true;
        var commentId = null;
        console.log( $scope.replyComment);

        if($scope.replyComment){
          commentId = $scope.replyComment.id;
        }
        Feed.postComment(
            {
              feedId: $scope.feed.id,
              content: $scope.feed.commentInput,
              cid: commentId
            }
        )
            .then(function (res) {
              console.log(res);
              $scope.replyComment = null;
              $scope.feed.commentInput = '';

            })
            .then(function () {
              $scope.showComment();
              $scope.cancelReplying();

            })
      //},1000);
      posting = false;

    };



    $scope.showImages = function(index, images) {
      $scope.images = images;
      $scope.activeSlide = index;
      $scope.showModal('templates/image-popover.html');
    };
    $scope.showModal = function(templateUrl) {
      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
      $scope.modal.remove();
    };



  }
})();
