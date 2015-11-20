(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('NewsCtrl', NewsCtrl);

  function NewsCtrl($scope, $state, $stateParams, $sce, $http) {
    var vm = this;

    $scope.url = $stateParams.url;
    console.log($scope.url);


    $http({
      url: $scope.url,
      skipAuthorization: true,
      method: 'GET'
    })
        .then(function (res) {
          console.log(res);
          $scope.content = $sce.trustAsHtml(res.data);
        });
    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };




  }
})();
