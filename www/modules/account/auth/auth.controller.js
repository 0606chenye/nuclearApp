/**
 * Created by vicky on 2015/8/8.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('AuthCtrl', AuthCtrl);

  function AuthCtrl($scope, $state, $window, $auth, $ionicPopup, $interval, $ionicHistory, $rootScope, $ionicLoading, User) {
    var vm = this;
    $scope.user = {mobile:'', code:'', password:'', nickName:''};

    //$scope.user = {};
    $scope.user.domains = $rootScope.domains;
    $scope.roles = $rootScope.roles;
    console.log($rootScope.domain);

    console.log($scope.user.domains);

    $scope.$on('$ionicView.enter',
        function(event){
          if($rootScope.role !== undefined){
            $scope.user.role = $rootScope.role;
          }
          else {
            //$scope.user.role = $scope.roles[0];
          }

          if($rootScope.domains !== undefined){
            $scope.user.domain = $rootScope.domain;
          }
          else {
            //$scope.user.domain = $scope.domains[0];
          }

          $ionicLoading.hide();
        });


    $scope.getUserDomainDisplay = function () {
      var domainDispaly = '';
      _.forEach($scope.user.domain, function(domain) {
        domainDispaly = domainDispaly + domain.name + ','
      });
      domainDispaly = domainDispaly.slice(0, - 1); //删除最后的一个逗号
      return domainDispaly;
    };

    $scope.selectRole = function (role) {
      _.forEach($scope.roles, function (role) {
        role.checked = false;
      });
      role.checked = true;
    };
    $scope.updateRole = function () {
      var role = _.filter($scope.roles, {'checked':true})[0];
      $rootScope.role = role;
      $state.go('tab.signup');

    };

    //$scope.openSelectDomainModal = function () {
    //  $ionicModal.fromTemplateUrl('modules/account/auth/domain.html', {
    //    scope: $scope,
    //    backdropClickToClose: true
    //  }).then(function(modal) {
    //    $scope.modal = modal;
    //    $scope.modal.show();
    //  });
    //};
    $scope.selectDomain = function (domain) {
      //_.forEach($scope.domains, function (domain) {
      //  domain.checked = false;
      //});
      console.log($scope.user.domains);
      console.log(domain);
      //if(!domain.checked){
      //  domain.checked = true;
      //}
      //else {
      //  domain.checked = !domain.checked;
      //}
      console.log($scope.user.domains);

    };
    $scope.updateDomain = function () {
      var domainArr = _.filter($scope.domains, {'checked':true});
      console.log(domainArr);
      $rootScope.domain = domainArr;
      console.log($rootScope.domain);
      $state.go('tab.signup');

    };

    $scope.countDown = 60;
    $scope.sendSMS = function (mobile) {
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
    };
    $scope.getCodeButtonDisable = function () {
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
    };

    $scope.getCodeButtonDisplay = function () {
      if($scope.countDown !== 60){
        return $scope.countDown + '秒';
      }
      else {
        return '获取验证码'
      }
    };
    $scope.signupAllowable = function () {
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
    };
    $scope.signup = function () {
      console.log('enter signup');
      console.log($scope.user.mobile);
      console.log($scope.user.password);

      var domainIds = '';
      _.forEach($scope.user.domain, function(domain) {
        domainIds = domainIds + domain.id + ','
      });
      domainIds = domainIds.slice(0, - 1); //删除最后的一个逗号
      console.log(domainIds);
      function handleSignupError(message) {
        if(message === "sms.code.err"){
          $ionicPopup.alert({
            title: '验证码错误',
            okText: '知道了'
          })
        }
        else if(message === "此手机号已被注册"){
          $ionicPopup.alert({
            title: '此手机号已被注册,请直接登录',
            okText: '知道了'
          })
              .then(function () {
                $state.go('tab.login');
              })
        }
      }

      $auth.signup({
        mobile: $scope.user.mobile,
        password: $scope.user.password,
        code: $scope.user.code,
        nickName: $scope.user.nickName,
        businessDomainId : domainIds,
        roleId: $scope.user.role.id
      })
          .then(function(res) {

            console.log(res.data);
            if(res.data.ret === 1){
              handleSignupError(res.data.message);
              return;
            }
            $ionicHistory.clearHistory();

            //console.log("currentUser in localStorage: " + $window.localStorage.currentUser);
            $rootScope.currentUser = res.data;
            $window.localStorage.currentUser = JSON.stringify(res.data);

            //$state.go('home');
          })
          .catch(function(response) {
            console.log(response);

          });
    };
    $scope.login = function () {
      console.log('enter login');
      console.log($scope.user.mobile);
      console.log($scope.user.password);
      $auth.login($scope.user)
          .then(function(res) {
            console.log(res.data);

            if(res.data.ret === 1){
              console.log(res.message);
              if(res.data.message === 'user.not.exist'){
                $ionicPopup.alert({
                  title: '用户名不存在',
                  okText: '知道了'
                })
              }
              else if (res.data.message === 'user.login.invalid.us.usernameOrPassword'){
                $ionicPopup.alert({
                  title: '密码错误',
                  okText: '知道了'
                })
              }
              return
            }
            console.log(res.data);
            $ionicHistory.clearHistory();
            $window.localStorage.currentUser = JSON.stringify(res.data);



            //$window.localStorage.currentUser = JSON.stringify(response.data.user);
            //console.log("currentUser in localStorage: " + $window.localStorage.currentUser);
            //$rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
            //$state.go('home');
          })
          .catch(function(response) {
            console.log(response.ret);
            console.log(JSON.parse(response));
          });
    }



  }
})();
