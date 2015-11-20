/**
 * Created by vicky on 2015/8/14.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('VerificationCtrl', VerificationCtrl);

  function VerificationCtrl($scope, $state, User) {
    var vm = this;
    $scope.verification = {
      image: '',
      verifyMobile: '',
      code: ''
    };


    $scope.checkSignup = {
      isSignupPhone: 'true'
    };
    $scope.isSignupPhone = true;
    $scope.isNotSignupPhone = false;

    $scope.signupPhone = function () {
      if(!$scope.isSignupPhone && $scope.isNotSignupPhone){
        $scope.isSignupPhone = true;
        $scope.isNotSignupPhone = false;
      }

      console.log($scope.isSignupPhone);
      console.log($scope.isNotSignupPhone);

    };
    $scope.notSignupPhone = function () {
      if($scope.isSignupPhone && !$scope.isNotSignupPhone) {
        $scope.isSignupPhone = false;
        $scope.isNotSignupPhone = true;
      }
      console.log($scope.isSignupPhone);
      console.log($scope.isNotSignupPhone);
    };

    $scope.updatePicture = function (image) {
      $scope.verification.image = image;
    };

    $scope.sendSMS = function (mobile) {
      console.log(mobile);
      User.sendSMS(mobile)
          .then(function(response) {
            console.log(response);
          })
          .catch()
          .finally(function(response) {
            console.log(response);
          });
    };
    
    
    
    $scope.goVerify = function () {
      console.log($scope.verification.verifyMobile);
      console.log($scope.verification.code);
      console.log($scope.verification.image);

      User.verify($scope.verification)
          .then(function (res) {
            console.log(res);
            $state.go('tab.account');
          })

    }
  }
})();
