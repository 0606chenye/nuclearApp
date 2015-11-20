/**
 * Created by vicky on 2015/8/8.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('AccountCtrl', AccountCtrl);

  function AccountCtrl($scope, $state, $rootScope, $window, $timeout, $ionicLoading, $auth, User) {
    var vm = this;
    $scope.isIos = ionic.Platform.isIOS();
    $scope.$on('$ionicView.enter', function () {
      console.log('Account Tab view entered...  ');
      User.getMe()
          .then(function (res) {
            $rootScope.currentUser = $scope.currentUser = res;
            console.log($rootScope.currentUser);
          });
      $ionicLoading.hide();

      $timeout(function () {
        $ionicLoading.hide();
      },3000)
    });


    $scope.goLogin = function () {
      console.log('enter signup');
      $ionicLoading.show();
      $state.go('tab.login');
    };

    $scope.logout = function () {
      $auth.logout();
    };
    $scope.auth = $auth;

    //if($window.localStorage.currentUser){
    //  $scope.currentUser = JSON.parse($window.localStorage.currentUser);
    //}

  }
})();
