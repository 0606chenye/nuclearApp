/**
 * Created by vicky on 2015/8/12.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('CategoryCtrl', CategoryCtrl);

  function CategoryCtrl($scope, $state, $ionicScrollDelegate, Product) {
    var vm = this;

    console.log('enter CategoryCtrl...');
    console.log(Product.getUserChooseFirstLevelCategory());
    $scope.menus = [];

    Product.getCategories({from:0,size:10})
        .then(function (res) {
          console.log(res.length);
          //for(var i = 0; i < res.length; i++ ){
          //  var e = res[i];
          //  if(e.level === 1){
          //    $scope.menus.push(e);
          //    var currentFirstMenuLength = $scope.menus.length - 1;
          //    //console.log(currentFirstMenuLength);
          //    $scope.menus[currentFirstMenuLength].secondMenu = [];
          //  }
          //  if(e.level === 2){
          //    //console.log(e);
          //    var parentId = e.parentCategoryId - 1;
          //    $scope.menus[parentId].secondMenu.push(e);
          //    var currentSecondMenuLength = $scope.menus[parentId].secondMenu.length -1;
          //    res[i].secondMenuIndex = currentSecondMenuLength;
          //    var secondMenuItem = $scope.menus[parentId].secondMenu[currentSecondMenuLength];
          //    //console.log(secondMenuItem);
          //    secondMenuItem.thirdMenu = [];
          //  }
          //  if(e.level === 3){
          //    //console.log(e);
          //    var parentId = e.parentCategoryId - 1;
          //    //console.log(res[parentId]);
          //    var grandParentId = res[parentId].parentCategoryId - 1;
          //    //console.log(grandParentId);
          //    //console.log(parentId);
          //    //console.log($scope.menus[grandParentId].secondMenu);
          //    $scope.menus[grandParentId].secondMenu[res[parentId].secondMenuIndex].thirdMenu.push(e);
          //  }
          //}
          for(var i = 0; i < res.length; i++ ){
            var e = res[i];
            if(e.level === 1){
              $scope.menus.push(e); //新增level-1 menu
              var currentFirstMenuLength = $scope.menus.length - 1; //得到当前level-1 array的index
              //console.log(currentFirstMenuLength);
              $scope.menus[currentFirstMenuLength].secondMenu = []; //添加当前level-1的level-2 menu
            }
            if(e.level === 2){
              var level1Index = _.findIndex( $scope.menus, function(level1Menu) {
                return level1Menu.id == e.parentCategoryId;
              });
              $scope.menus[level1Index].secondMenu.push(e);
              var currentSecondMenuLength = $scope.menus[level1Index].secondMenu.length -1;
              res[i].secondMenuIndex = currentSecondMenuLength;
              var secondMenuItem = $scope.menus[level1Index].secondMenu[currentSecondMenuLength];
              secondMenuItem.thirdMenu = [];
            }
            if(e.level === 3){
               //console.log($scope.menus);

              var level1Id = -1;
              var level2Index = -1;
              _.forEach( $scope.menus, function(level1Menu) {
                level2Index = _.findIndex(level1Menu.secondMenu, function(secondMenu){
                  return secondMenu.id === e.parentCategoryId;
                });
                if(level2Index !== -1){
                  level1Id = level1Menu.id;
                  //console.log(e.parentCategoryId);
                  return false;
                }
              });
              //console.log(level2Index);
              //console.log(level1Id);
              var level1Index = _.findIndex( $scope.menus, function(level1Menu) {
                return level1Menu.id == level1Id;
              });
              //console.log(level1Index);
              //var level1Index = res[level2Index].parentCategoryId - 1;
              $scope.menus[level1Index].secondMenu[level2Index].thirdMenu.push(e);
            }
          }
          //console.log(JSON.stringify($scope.menus)) ;

          console.log($scope.menus);
          $scope.firstSelectMenu = $scope.menus[Product.getUserChooseFirstLevelCategory()];
          $scope.firstSelectMenu.clicked = true;
          if($scope.firstSelectMenu.secondMenu[0]) {
            $scope.secondSelectMenu =  $scope.firstSelectMenu.secondMenu[0];
            $scope.secondSelectMenu.clicked = true;
          }

          //console.log($scope.secondSelectMenu);
          //$scope.firstSelectMenu = $scope.menus[0];
          //$scope.firstSelectMenu.clicked = true;
          $scope.menus[0].img = 'img/service.png';
          $scope.menus[1].img = 'img/valve.png';
          $scope.menus[2].img = 'img/pump.png';
          $scope.menus[3].img = 'img/electricity.png';
          $scope.menus[4].img = 'img/instrument.png';
          $scope.menus[5].img = 'img/machinery.png';
          $scope.menus[6].img = 'img/consumables.png';
          $scope.menus[7].img = 'img/material.png';
          $scope.menus[8].img = 'img/tool.png';
          $scope.menus[9].img = 'img/safety.png';





        });


    $scope.firstItemClick = function (menu) {
      $ionicScrollDelegate.$getByHandle('secondMenuScroll').scrollTop();
      $ionicScrollDelegate.$getByHandle('thirdMenuScroll').scrollTop();

      console.log(menu);
      angular.forEach($scope.menus, function (value, key) {
        value.clicked = false;
      });
      menu.clicked = true;
      $scope.firstSelectMenu = menu;
      $scope.secondSelectMenu =  $scope.firstSelectMenu.secondMenu[0];
      angular.forEach($scope.firstSelectMenu.secondMenu, function (value, key) {
        value.clicked = false;
      });
      $scope.secondSelectMenu.clicked = true;
      console.log($scope.firstSelectMenu);
    };
    $scope.secondItemClick = function (menu) {
      $ionicScrollDelegate.$getByHandle('thirdMenuScroll').scrollTop();

      angular.forEach($scope.firstSelectMenu.secondMenu, function (value, key) {
        value.clicked = false;
      });
      menu.clicked = true;
      $scope.secondSelectMenu = menu;
      console.log($scope.secondSelectMenu);
    }
  }
})();
