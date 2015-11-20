/**
 * Created by vicky on 2015/8/8.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('PostFeedCtrl', PostFeedCtrl);

  function PostFeedCtrl($scope, $state, $cordovaCamera, $http, $rootScope, $cordovaFileTransfer, Feed) {
    var vm = this;
    $scope.feed = {content:'', images:[]};
    $scope.images = [];
    $scope.updateImages = function (url) {
      $scope.feed.images.push(url);
    };

    $scope.$watchCollection('feed.images', function (newImages) {
      console.log(newImages);
    });


    var imageUrl = '';
    $scope.postFeed = function () {
      _.forEach($scope.feed.images, function(url) {
        imageUrl = imageUrl + url + ','
      });
      imageUrl = imageUrl.slice(0, - 1); //删除最后的一个逗号

      console.log('imageUrl to be posted:');
      console.log(imageUrl);

      Feed.postFeed({imageUrl:imageUrl,content:$scope.feed.content,companyId:2})
          .then(function(res) {
            console.log(res);
            $state.go('tab.circle')
          })
          .catch(function(response) {
            console.log(response);
          });
    };


    //$scope.getNgCamera = function () {
    //  var cameraOptions = {
    //    quality: 50,
    //    destinationType: Camera.DestinationType.FILE_URI,
    //    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    //    allowEdit: false,
    //    encodingType: Camera.EncodingType.JPEG,
    //    targetWidth: 300,
    //    targetHeight: 300,
    //    popoverOptions: CameraPopoverOptions,
    //    saveToPhotoAlbum: false
    //  };
    //
    //  var transferOptions = {
    //    httpMethod: 'POST',
    //    params: {
    //      token: $rootScope.upload.token,
    //      key: 'feedImage3'
    //    }
    //  };
    //
    //  $cordovaCamera.getPicture(cameraOptions)
    //      .then(function(imageURI) {
    //        console.log(imageURI);
    //        //var image = document.getElementById('myImage');
    //        //image.src = imageURI;
    //
    //        $scope.testImage = imageURI;
    //
    //        console.log($scope.testImage);
    //
    //
    //
    //        return imageURI
    //
    //      }, function(err) {
    //        // error
    //      })
    //      .then(function (imageURI) {
    //        $cordovaFileTransfer.upload('http://upload.qiniu.com', imageURI, transferOptions
    //        )
    //            .then(function(res) {
    //              console.log(JSON.stringify(res,null,2));
    //              // Success!
    //            }, function(err) {
    //              console.log(JSON.stringify(err,null,2));
    //
    //              // Error
    //            }, function (progress) {
    //              // constant progress updates
    //            });
    //      });
    //
    //
    //
    //}

  }
})();