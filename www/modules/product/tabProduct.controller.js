/**
 * Created by vicky on 2015/8/8.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('TabProductCtrl', TabProductCtrl);

  function TabProductCtrl($scope, $state, $ionicHistory, Product) {
    var vm = this;
    $scope.isIos = ionic.Platform.isIOS();
    $scope.$on('$ionicView.enter',
        function(event) {
          console.log('enter product view');
          $ionicHistory.clearHistory();
        });
    console.log('enter TabProductCtrl...');
    $scope.menus = [];
    //
    //Product.getCategories({from:0,size:10})
    //    .then(function (res) {
    //      console.log(res.length);
    //
    //      for(var i = 0; i < res.length; i++ ){
    //        var e = res[i];
    //        if(e.level === 1){
    //          $scope.menus.push(e);
    //          var currentFirstMenuLength = $scope.menus.length - 1;
    //          //console.log(currentFirstMenuLength);
    //          $scope.menus[currentFirstMenuLength].secondMenu = [];
    //        }
    //        if(e.level === 2){
    //          //console.log(e);
    //          var parentId = e.parentCategoryId - 1;
    //          $scope.menus[parentId].secondMenu.push(e);
    //          var currentSecondMenuLength = $scope.menus[parentId].secondMenu.length -1;
    //          res[i].secondMenuIndex = currentSecondMenuLength;
    //          var secondMenuItem = $scope.menus[parentId].secondMenu[currentSecondMenuLength];
    //          //console.log(secondMenuItem);
    //          secondMenuItem.thirdMenu = [];
    //        }
    //        if(e.level === 3){
    //          //console.log(e);
    //          var parentId = e.parentCategoryId - 1;
    //          //console.log(res[parentId]);
    //          var grandParentId = res[parentId].parentCategoryId - 1;
    //          //console.log(grandParentId);
    //          //console.log(parentId);
    //          //console.log($scope.menus[grandParentId].secondMenu);
    //          $scope.menus[grandParentId].secondMenu[res[parentId].secondMenuIndex].thirdMenu.push(e);
    //
    //        }
    //      }
    //      console.log($scope.menus);
    //      //$scope.firstSelectMenu = $scope.menus[0];
    //      //$scope.firstSelectMenu.clicked = true;
    //    });


    $scope.goCategory = function (id) {
      Product.setUserChooseFirstLevelCategory(id);

      $state.go('tab.category');
    }


  }
})();
