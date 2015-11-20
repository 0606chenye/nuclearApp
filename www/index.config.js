(function() {
  'use strict';

  angular
      .module('nuclearApp')
      .config(config)
      .factory('_', ['$window',
        function($window) {
          // place lodash include before angular
          return $window._;
        }
      ])
      .factory('authInterceptorService', ['$q','$location', function ($q, $location){
        var responseError = function (rejection) {
          if (rejection.status === 403) {
            console.log($location.url());
            if('/tab/account/singup' !== $location.url()){
              $location.path('/tab/account/login');
            }
          }
          return $q.reject(rejection);
        };

        return {
          responseError: responseError
        };
      }]);
  /** @ngInject */
  function config($logProvider,  $authProvider, $httpProvider, $ionicConfigProvider, $compileProvider, $cordovaInAppBrowserProvider, BACK_END) {
    $httpProvider.interceptors.push('authInterceptorService');
    $compileProvider.debugInfoEnabled(false);
    //$ionicConfigProvider.scrolling.jsScrolling(false);
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.tabs.style('standard');
    // Enable log
    $logProvider.debugEnabled(true);


    $authProvider.baseUrl = BACK_END.baseUrl;
    $authProvider.authHeader = 'token';
    $authProvider.authToken = '';

    //$authProvider.tokenRoot = 'data';

    //var baseUrl = 'http://192.168.0.101:9902/api/';
    $authProvider.loginUrl =  'login';
    $authProvider.signupUrl =  'register';


  }

})();
