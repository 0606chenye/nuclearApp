/**
 * Created by vicky on 2015/8/22.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('BroadcastCtrl', BroadcastCtrl);

  function BroadcastCtrl($scope, $state, $rootScope, $auth, $ionicHistory, ionicToast, User) {
    var vm = this;

    $scope.$on('$ionicView.enter',
        function(event) {
          console.log('enter BroadcastCtrl...');
          if(!$auth.isAuthenticated()){
            ionicToast.show('此功能需要用户登陆后使用', 'top', false, 2500);
            $ionicHistory.goBack();
          }
        });
    $scope.textarea = {};
    $scope.textarea.content = '';
    $scope.companyTypes = [
      {
        id:1, name:'制造商'
      },
      {
        id:2, name:'代理商'
      },
      {
        id:3, name:'服务商'
      }
    ];
    $scope.companyType = $scope.companyTypes[0];

    $scope.roles = $rootScope.roles;
    $scope.role = $scope.roles[0];


    console.log($scope.roles);


    $scope.broadcastMessage = function () {
      console.log('in postFeedback');
      User.broadcastMessage($scope.role.id, $scope.companyType.name, $scope.textarea.content, $scope.companyType.name + '的' + $scope.role.name)
          .then(function (res) {
            console.log(res);
            $scope.textarea.content = '';
            $state.go('tab.account');
          });

    };



  }
})();
