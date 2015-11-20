/**
 * Created by vicky on 2015/8/12.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('ProductDetailTabCtrl', ProductDetailTabCtrl);

  function ProductDetailTabCtrl($scope, $state, $stateParams,$sce, $cordovaFile,$ionicHistory, $http, $cordovaFileTransfer ,
                                $ionicSlideBoxDelegate, $timeout,$cordovaInAppBrowser,ionicToast, Product) {
    var vm = this;
    $scope.currentTabId = $stateParams.tabId;
    console.log( $scope.currentTabId);
    //console.log($ionicSlideBoxDelegate);
    $scope.$on('$ionicView.enter',
        function(event){
          var ionicSlideBoxDelegate = $ionicSlideBoxDelegate.$getByHandle('productTabs');
          ionicSlideBoxDelegate.enableSlide(false);
          console.log(ionicSlideBoxDelegate.count());
          ionicSlideBoxDelegate.slide($scope.currentTabId);
        });

    $scope.info = Product.getDetailTabInfo();
    $scope.content = {};
    console.log($scope.info);
    $http({
      url: $scope.info.specificsUrl,
      skipAuthorization: true,
      method: 'GET'
    })
        .then(function (res) {
          console.log(res);
          $scope.content.specificsUrl = $sce.trustAsHtml(res.data);
        });
    //$http({
    //  url: $scope.info.servicesHistoryUrl,
    //  skipAuthorization: true,
    //  method: 'GET'
    //})
    //    .then(function (res) {
    //      console.log(res);
    //      $scope.content.servicesHistoryUrl = $sce.trustAsHtml(res.data);
    //    });
    $http({
      url: $scope.info.spareUrl,
      skipAuthorization: true,
      method: 'GET'
    })
        .then(function (res) {
          console.log(res);
          $scope.content.spareUrl = $sce.trustAsHtml(res.data);
        });

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

    //var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

    //$scope.popover = $ionicPopover.fromTemplate(template, {
    //  scope: $scope
    //});
    //

    //$ionicLoading.show({template: 'Loading...'});
    //$cordovaFile.downloadFile("http://www.education.gov.yk.ca/pdf/pdf-test.pdf", "file:///storage/sdcard0/pdf/pdf-test.pdf", true,{}).then(function(result) {
    //  // Success!
    //  $cordovaDialogs.alert('Wow!');
    //  $ionicLoading.hide();
    //}, function(err) {
    //  // An error occured. Show a message to the user
    //  $cordovaDialogs.alert('Error');
    //  $ionicLoading.hide();
    //});
    //var directory = 'downloads';
    //var filename = 'download.mp3';

    //var url = "http://www.education.gov.yk.ca/pdf/pdf-test.pdf";
    //var url = "http://7xk9v7.com1.z0.glb.clouddn.com/TheCProgrammingLanguage.pdf";
    //var targetPath = cordova.file.dataDirectory + "systemDoc.pdf";
    $scope.downloadProgress = 0;
    var trustHosts = true;
    var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'yes',
      enableViewportScale: 'yes'
    };

    function getFilePath(doc){
      var isIOS = ionic.Platform.isIOS();
      if(isIOS) {
        //return 'cdvfile://localhost/persistant/' + doc.name + '.pdf'
        return cordova.file.dataDirectory + encodeURI(doc.name) + '.pdf'
      }
      else {
        return 'file:///storage/sdcard0/pdf/' + doc.name + '.pdf'
        //return cordova.file.applicationStorageDirectory   + doc.name + '.pdf'
      }
    }
    function toastDownloadSuccess(targetPath) {
      ionicToast.show('文件已下载在'+targetPath, 'top', false, 5000);

    }




    $scope.downloadDoc = function (doc) {
      console.log('downloadDoc....');
      var targetPath = getFilePath(doc);
      console.log(targetPath);
      $cordovaFileTransfer.download(doc.url, targetPath, options, trustHosts)
          .then(function(result) {
            console.log('Success download!');
            toastDownloadSuccess(targetPath);
            var target;
            if(ionic.Platform.isIOS()){
              target = '_blank'
            }
            else {
              target = '_system'
            }
            $cordovaInAppBrowser.open(targetPath, target, options)
                .then(function(event) {
                  console.log('Doc open Success!');
                  // success
                })
                .catch(function(event) {
                  console.log('Doc open error!');
                  console.log(event);
                  // error
                });
            // Success!
          }, function(err) {
            console.log('Error downlaod!');
            console.log(JSON.stringify(err,null,2));

            // Error
          }, function (progress) {
            $timeout(function () {
              $scope.downloadProgress = (progress.loaded / progress.total) * 100;
              if($scope.downloadProgress === 100){
                $scope.downloadProgress = 0;
              }
            })
          });
    };

    //$scope.downloadSystemDocUrl = function () {
    //  console.log('downloadMaintenanceDocUrl....');
    //  $cordovaFileTransfer.download($scope.info.systemDocUrl, targetPath, options, trustHosts)
    //      .then(function(result) {
    //        console.log('Success downlaod!');
    //        toastDownloadSuccess(targetPath);
    //        $cordovaInAppBrowser.open(targetPath, '_system', options)
    //            .then(function(event) {
    //              console.log('Doc open Success!');
    //
    //              // success
    //            })
    //            .catch(function(event) {
    //              // error
    //            });
    //        // Success!
    //      }, function(err) {
    //        console.log('Error downlaod!');
    //        console.log(JSON.stringify(err,null,2));
    //
    //        // Error
    //      }, function (progress) {
    //        $timeout(function () {
    //          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
    //        })
    //      });
    //};
    //$cordovaFileTransfer.download(url, targetPath, options, trustHosts)
    //    .then(function(result) {
    //      console.log('Success downlaod!');
    //      // Success!
    //    }, function(err) {
    //      console.log('Error downlaod!');
    //      console.log(JSON.stringify(err,null,2));
    //
    //      // Error
    //    }, function (progress) {
    //      $timeout(function () {
    //        $scope.downloadProgress = (progress.loaded / progress.total) * 100;
    //      })
    //    });

    //index和active-slide不同步，不知道什么原因，必须slide到currentTab
    //console.log($ionicSlideBoxDelegate.currentIndex());
    ////$ionicSlideBoxDelegate.slide($scope.currentTabId);
    //
    //$ionicSlideBoxDelegate.slide(2);
    //
    //console.log($ionicSlideBoxDelegate.currentIndex());
    //$timeout(function () {
    //  console.log('timeout finished!');
    //  $ionicSlideBoxDelegate.next();
    //}, 500);

    //$scope.slideHasChanged = function (index) {
    //  console.log(index);
    //  $ionicSlideBoxDelegate.next();
    //
    //}
  }
})();