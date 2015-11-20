/**
 * Created by vicky on 2015/8/26.
 */

(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('myCircleCtrl', myCircleCtrl);

  function myCircleCtrl($scope, $state,$ionicModal, $ionicLoading, ionicToast, $rootScope, Feed) {
    var vm = this;

    $scope.$on('$ionicView.enter', function () {
      console.log('myCircle view entered...  ');
      $ionicLoading.hide();
    });

    $scope.ctrl = {
      feeds: []
    };


    $scope.moreDataCanBeLoaded = true;
    $scope.from = 0;
    $scope.size = 10;

    $scope.getFeeds = function () {
      return Feed.getMyFeeds(
          $scope.from,
          $scope.size
      )
          .then(function(res) {
            console.log(res);
            if(!_.isEmpty(res)){


              var date = new Date(_.first(res).publishDate);

              $scope.lastFeedDate = date.getTime();
              console.log($scope.lastFeedDate);
            }


            _.forEach(res, function (feed) {
              feed.images = [];
              feed.imageUrl.split(',').forEach(function (url) {
                feed.images.push(url);
              });
            });
            console.log(res);
            return res;
          });
    };
    $scope.loadMore = function() {
      console.log('loading more...');
      $scope.getFeeds()
          .then(function (res) {
            console.log(res);

            if(_.isEmpty(res)){
              $scope.moreDataCanBeLoaded = false;
            }
            else {
              $scope.ctrl.feeds = $scope.ctrl.feeds.concat(res);

              $scope.from =  $scope.ctrl.feeds.length;
              console.log($scope.from);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
          })
    };

    $scope.goUserPage = function (feed) {
      console.log('trigger outer');
      $state.go('tab.user', {id:feed.creatorId});
    };
    $scope.deleteFeed = function (removedFeed, $event) {
      $event.stopPropagation();
      Feed.removeFeed(removedFeed.id)
          .then(function (ret) {
            if(ret === 0){
              ionicToast.show('已成功删除', 'top', false, 2500);

              $scope.ctrl.feeds = _.filter($scope.ctrl.feeds, function (feed) {
                console.log(feed.id === removedFeed.id)
                return feed.id != removedFeed.id
              });
              console.log($scope.ctrl.feeds);
              $rootScope.$broadcast("DeleteFeed", removedFeed.id);
            }
          })
    };

    $scope.getLastFeedDate = function () {
      var date = new Date(_.first($scope.ctrl.feeds).publishDate);
      return date.getTime();
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


    $scope.showComment = function (feed) {
      console.log(feed.showComment);
      feed.showComment = true;
      console.log($scope.ctrl.feeds);

      Feed.getComments(feed.id)
          .then(function (res) {
            console.log(res);
            feed.comments = res;
            feed.commentCount = res.length;

          })
    };
    $scope.hideComment = function (feed) {
      console.log('hide comment...');
      feed.showComment = false;
    };

    $scope.postComment = function (feed) {
      var commentId = null;
      console.log( $scope.replyComment);
      if($scope.replyComment){
        commentId = $scope.replyComment.id;
      }
      Feed.postComment(
          {
            feedId: feed.id,
            content: feed.commentInput,
            cid: commentId
          }
      )
          .then(function (res) {
            console.log(res);
            $scope.replyComment = null;
            feed.commentInput = '';

          })
          .then(function () {
            $scope.showComment(feed);
          })
    };




    $scope.toggleLike = function (feed) {

      if(!feed.hasLiked) {
        Feed.likeFeed(feed.id)
            .then(function (res) {
              console.log(res);
              //var likedFeed = _.find($scope.feeds, {id: feed.id});
              feed.hasLiked = res.hasLiked;
              feed.likerCount = res.count;
              console.log(feed);

            })
      }
      else {
        Feed.disLikeFeed(feed.id)
            .then(function (res) {
              console.log(res);
              //var likedFeed = _.find($scope.feeds, {id: feed.id});
              feed.hasLiked = res.hasLiked;
              feed.likerCount = res.count;
              console.log(feed);

            })
      }

    };

    $scope.selectReplyWhom = function (nickName) {
      $scope.replyWhom = nickName;
    };



    //
    //$scope.goUserPage = function (feed) {
    //
    //  //$state.go($scope.whichStateToGo,{id: item.id});
    //};

    //for test data end --------------------------------------->



    //for test logic begin --------------------------------------->
    //$scope.replyWhichComment();
    //$scope.postComment(feed);
    //
    //$scope.showComment(33);
    //$scope.likeFeed(33);
    //$scope.toggleLike(feed);

  }
})();