(function() {
  'use strict';

  angular
    .module('nuclearApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $http, $rootScope, $interval, $auth, BACK_END, Conversation, Common) {
    window.addEventListener('native.keyboardshow', function(){
      document.body.classList.add('keyboard-open');
    });

    $rootScope.upload = {
      cdn: 'http://7xnv0v.com2.z0.glb.qiniucdn.com',
      token: ''
    };
    $http.get(BACK_END.baseUrl + 'qiniu/token')
        .then(function (res) {
          console.log(res);
          $rootScope.upload.token = res.data.token;
        });

    Common.getBusinessdomains()
        .then(function (res) {
          $rootScope.domains = res.domains;
          console.log($rootScope.domains);
          $rootScope.roles = res.roles;
        });

    $rootScope.badgeCount = 0;



    $interval(function () {
      if(!$auth.isAuthenticated()){
        return
      }
      Conversation.getUnreadCount()
          .then(function (res) {
            $rootScope.badgeCount = res;
          })
    }, 2000);
    $log.debug('runBlock end');
  }

})();
