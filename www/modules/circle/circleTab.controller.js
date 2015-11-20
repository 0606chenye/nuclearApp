/**
 * Created by vicky on 2015/8/8.
 */
(function () {
    'use strict';

    angular
        .module('nuclearApp.controllers')
        .controller('CircleTabCtrl', CircleTabCtrl);

    function CircleTabCtrl($scope, $state,$ionicModal, $timeout, $ionicLoading, $ionicBackdrop, Feed) {
        var vm = this;
//2015-08-26T12:59:11.000Z
//        var a = new Date('2015-08-28T12:31:47.000Z');
      $scope.isIos = ionic.Platform.isIOS();

        //console.log(a.getTime());
        $scope.$on('$ionicView.enter', function () {
            console.log('cirTab view entered...  ');
            $ionicLoading.hide();
            $scope.doRefresh();
        });

        $scope.$on("DeleteFeed", function (events, feedId) {
            console.log('删除了这个feed:' + feedId);
            $scope.ctrl.feeds =  _.filter($scope.ctrl.feeds, function (feed) {
                return feed.id != feedId
            });

        });

        $scope.ctrl = {
            feeds: []
        };

        $scope.goPostFeed = function () {
            $state.go('tab.postFeed');
        };

        $scope.moreDataCanBeLoaded = true;
        $scope.from = 0;
        $scope.size = 10;

        $scope.getFeeds = function () {
            return Feed.getFeeds(
                {
                    from: $scope.from,
                    size: $scope.size
                }
                )
                .then(function(res) {
                    console.log(res);
                    if(!_.isEmpty(res)){

                        //
                        //var date = new Date(_.first(res).publishDate);
                        //
                        //$scope.lastFeedDate = date.getTime();
                        //$scope.lastFeedDate =
                        //    console.log($scope.lastFeedDate);
                    }
                    console.log($scope.from);

                    _.forEach(res, function (feed) {
                        if(!_.isEmpty(feed.imageUrl)) {
                            feed.images = [];
                            feed.imageUrl.split(',').forEach(function (url) {
                                feed.images.push(url);
                            });
                        }
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

        $scope.doRefresh = function() {
            if(!_.first($scope.ctrl.feeds)){
                return
            }
            Feed.getFeedsByDate(_.first($scope.ctrl.feeds).millisecond).
            then(function(res){
                console.log(res);

                if(!_.isEmpty(res)){
                    //$scope.lastFeedDate = $scope.getLastFeedDate();
                    //console.log($scope.lastFeedDate);
                    _.forEach(res, function (feed) {

                        if(!_.isEmpty(feed.imageUrl)){
                            feed.images = [];
                            feed.imageUrl.split(',').forEach(function (url) {
                                feed.images.push(url);
                            });
                        }
                    });
                    $scope.ctrl.feeds = res.concat($scope.ctrl.feeds);

                    //console.log($scope.ctrl.feeds);
                }

                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.getLastFeedDate = function () {
            var date = new Date(_.first($scope.ctrl.feeds).publishDate);
            return date.getTime();
        };
        //$scope.images = ['img/pic1.jpg','img/pic2.jpg','img/pic3.jpg','img/circle-GE_1.jpeg','img/circle-GE_2.jpeg','img/circle-GE_3.jpeg'];
        function formatPublishDate(publishDate) {
            var diff = moment().startOf('day').diff(publishDate.clone().startOf('day'), 'd');
            var pattern = diff > 1 ? "MM月DD日HH:mm" : ((diff === 0 ? "今天" : "昨天")) + "HH:mm";
            return publishDate.format(pattern);
        }
        $scope.getTimeLapse = function (feed) {
            //return moment(enq.publish_date).format('YYYY年M月DD日');
            //return moment(enq.publish_date).fromNow()
            return formatPublishDate(moment(feed.publishDate))
        };

        $scope.showImages = function(index, images) {
            $scope.images = images;
            $scope.activeSlide = index;
            $scope.showModal('templates/image-popover.html');
        };
        $scope.showModal = function(templateUrl) {
            //$ionicBackdrop.retain();
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
            //$ionicBackdrop.release();
        };

        $scope.goComment = function (feed) {
            $state.go('tab.feed' ,{feed: feed});
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

        var posting = false;
        $scope.postComment = function (feed) {
            console.log(posting);
            if(posting){
                return;
            }
            $timeout(function () {
                posting = false;
                var commentId = null;
                console.log( $scope.replyWhom);

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
            },1000)
            posting = true;

        };

        $scope.replyWhichComment = function (comment) {
            //$scope.replyComment = comment;
            console.log(comment);

            $scope.replyComment = comment;

        };


        $scope.toggleLike = function (feed) {

            if(!feed.hasLiked) {
                Feed.likeFeed(feed.id)
                    .then(function (res) {
                        console.log(res);
                        //var likedFeed = _.find($scope.feeds, {id: feed.id});
                        feed.hasLiked = res.liked;
                        feed.likerCount = res.count;
                        console.log(feed);

                    })
            }
            else {
                Feed.disLikeFeed(feed.id)
                    .then(function (res) {
                        console.log(res);
                        //var likedFeed = _.find($scope.feeds, {id: feed.id});
                        feed.hasLiked = res.liked;
                        feed.likerCount = res.count;
                        console.log(feed);

                    })
            }

        };

        $scope.selectReplyWhom = function (nickName) {
            $scope.replyWhom = nickName;
        };





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