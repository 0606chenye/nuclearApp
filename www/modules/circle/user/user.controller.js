/**
 * Created by vicky on 2015/8/23.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('UserCtrl', UserCtrl);

  function UserCtrl($scope, $state, ionicToast, $ionicModal,  User) {
    var vm = this;

    var id = $state.params.id;
    console.log(id);
    $scope.showInput = false;

    User.getUser(id)
        .then(function (res) {
          $scope.user = res;
        });


    $scope.openSendMailModal = function () {
      $ionicModal.fromTemplateUrl('modules/circle/user/send-mail-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    };

    $scope.sendMail = function () {
      $scope.modal.hide();
      User.sendMessage($scope.user.id, $scope.user.mailContent)
          .then(function (res) {
            console.log(res);
            ionicToast.show('邮件已发送，可在发件箱中查看', 'top', false, 2500);
            $state.go('tab.circle');
          })
    }
  }
})();
