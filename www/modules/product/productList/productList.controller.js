/**
 * Created by vicky on 2015/8/11.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('ProductListCtrl', ProductListCtrl);

  function ProductListCtrl($scope, $state, $stateParams, Product, Config) {
    var vm = this;


    console.log('enter ProductListCtrl..');
    $scope.Config = Config;

    var currentCategoryId = $stateParams.categoryId;
    console.log(currentCategoryId);

    $scope.ctrl = {};
    $scope.ctrl.hasServiceHistory = false;
    $scope.techDoc = false;
    $scope.from = 0;
    $scope.size = 10;
    $scope.ctrl.products = [];
    $scope.ctrl.authGroupType = Config.getAuthGroupTypes()[0];
    $scope.ctrl.brandType = Config.getBrandTypes()[0];

    $scope.loadData = function () {
      //categoryId, ctrl.hasServiceHistory, authGroup, ctrl.brandType, from, size
      console.log($scope.ctrl.brandType);
      var authGroup = $scope.ctrl.authGroupType.id === 0 ?  null : $scope.ctrl.authGroupType.name;
      var brandType = $scope.ctrl.brandType.id === 0 ?  null : $scope.ctrl.brandType.name;

      console.log($scope.ctrl.authGroupType.id);
      console.log($scope.ctrl.brandType.id);

      console.log(authGroup);
      console.log(brandType);

      return Product.getProductsByCategoryId(
          currentCategoryId,
          $scope.ctrl.hasServiceHistory,
          authGroup,
          brandType,
          $scope.from,
          $scope.size
          )
          .then(function (res) {
            console.log(res);
            return res;
          });
    };




    $scope.getAuthGroupDisplay = function () {
      if($scope.ctrl.authGroupType && $scope.ctrl.authGroupType.id !== 0){
        return $scope.ctrl.authGroupType.name;
      }
      else {
        return '合格供方'
      }
    };
    $scope.getBrandDisplay = function () {
      if($scope.ctrl.brandType && $scope.ctrl.brandType.id !== 0){
        return $scope.ctrl.brandType.name;
      }
      else {
        return '供货性质'
      }
    };
    $scope.selectAuthGroup = function (authGroup) {
      console.log(authGroup);
      $scope.ctrl.authGroupType = authGroup;
      $scope.filterChanged();
    };

    $scope.selectBrand = function (brandType) {
      console.log(brandType);
      $scope.ctrl.brandType = brandType;
      $scope.filterChanged();
    };


    $scope.ctrl.brandTypes = [
      {
        id:0, name:'所有'
      },
      {
        id:1, name:'直销'
      },
      {
        id:2, name:'代理'
      }
    ];

    $scope.filterChanged = function () {
      console.log('filterChanged');
      $scope.mdItemListControl.initData();
      $scope.from = 0;
      $scope.ctrl.products = [];
    };

    $scope.mdItemListControl = {
      updateParentItems: function (products) {
        console.log('updateParentItems....');
        console.log(products);
        $scope.ctrl.products = products;
        if(!_.isEmpty(products)) {
          $scope.from = $scope.ctrl.products.length;
          console.log($scope.from);
        }
      }
    };
  }
})();
