(function () {
  'use strict';

  angular.module('nuclearApp.controllers', [])
      .controller('TabCtrl', function ($scope, $state, $ionicLoading) {
        $scope.switchTabs = function (state) {
          console.log($state.current.name);
          if ($state.current.name === state) {
            return;
          }
          $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });
          $state.go(state);
        };


        $scope.showTabs = function () {

          console.log($state.current.name);
          if('tab.mailDetail' === $state.current.name){
            return 'ng-hide'
          }
          else {
            return 'ng-show'
          }
        }

      })
      .controller('NavBarCtrl', function ($scope, $rootScope, $ionicHistory, $ionicNavBarDelegate) {
        console.log('NavBarCtrl');

        $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
          console.log('$stateChangeSuccess');
          //$ionicNavBarDelegate.showBackButton(true);

          console.log($ionicNavBarDelegate.showBackButton());
          //if (toState.module === 'private' && !$cookies.Session) {
          //  // If logged out and transitioning to a logged in page:
          //  e.preventDefault();
          //  $state.go('public.login');
          //} else if (toState.module === 'public' && $cookies.Session) {
          //  // If logged in and transitioning to a logged out page:
          //  e.preventDefault();
          //  $state.go('tool.suggestions');
          //};
        });
        $scope.goBack = function() {
          $ionicHistory.goBack();
        };
      });
})();