/**
 * Created by vicky on 2015/8/8.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('RestPasswordCtrl', RestPasswordCtrl);

  function RestPasswordCtrl($scope, $state, $interval, ionicToast, User) {
    var vm = this;
    $scope.user = {mobile:'', code:'', password:''};
    $scope.countDown = 60;
    $scope.sendSMS = sendSMS;
    $scope.getCodeButtonDisable = getCodeButtonDisable;
    $scope.getCodeButtonDisplay = getCodeButtonDisplay;
    $scope.resetPasswordAllowable = resetPasswordAllowable;
    $scope.resetPassword = resetPassword;


    function sendSMS (mobile) {
      console.log(mobile);
      User.sendSMS(mobile)
          .then(function(ret) {
            if(ret === 0){
              var stop = $interval(function () {
                $scope.countDown --;
                if($scope.countDown === 0){
                  $interval.cancel(stop);
                  $scope.countDown = 60;
                }
              }, 1000);
            }
          })
          .catch()
          .finally(function(response) {
            console.log(response);
          });
    }
    function getCodeButtonDisable () {
      var codeButtonDisable;
      if ($scope.user.mobile) {
        if($scope.countDown !== 60){
          codeButtonDisable = true;
        }
        else {
          codeButtonDisable = false;
        }
      }
      else {
        codeButtonDisable = true;
      }
      return codeButtonDisable;
    }

    function getCodeButtonDisplay() {
      if($scope.countDown !== 60){
        return $scope.countDown + '秒';
      }
      else {
        return '获取验证码'
      }
    }
    function resetPasswordAllowable () {
      var ret = true;
      _.forOwn($scope.user, function (value, key) {
        //console.log(key + ': ' + value);
        if(_.isEmpty(value)){
          ret = false;
          return false;
        }
      });
      //console.log(ret);
      return ret;
    }

    function resetPassword(){
      User.resetPassword($scope.user)
          .then(function (ret) {
            if(ret === 0){
              ionicToast.show('密码重设成功，请使用新密码登陆', 'top', false, 5000);

              $state.go('tab.login');
            }
          })
    }


  }
})();
