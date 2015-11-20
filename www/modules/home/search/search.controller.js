/**
 * Created by wangjunru on 8/6/15.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('SearchCtrl', SearchCtrl);

  function SearchCtrl($scope, $state, $ionicHistory, $ionicSlideBoxDelegate, $ionicScrollDelegate, Search) {
    var vm = this;
    $scope.ctrl = {
      productResult: [],
      companyResult: []
    };
    $scope.PFrom = 0;
    $scope.CFrom = 0;

    $scope.size = 10;
    $scope.ctrl.mdProductListControl = {
      updateParentItems: function (products) {
        console.log('updateParentItems....');
        console.log(products);
        $scope.ctrl.productResult = products;
        if(!_.isEmpty(products)) {
          $scope.PFrom = $scope.ctrl.productResult.length;
          console.log($scope.PFrom);
        }
      }
    };
    $scope.ctrl.mdCompanyListControl = {
      updateParentItems: function (companies) {
        console.log('updateParentItems....');
        console.log(companies);
        $scope.ctrl.companyResult = companies;
        if(!_.isEmpty(companies)) {
          $scope.CFrom = $scope.ctrl.companyResult.length;
          console.log($scope.CFrom);
        }
      }
    };
    $ionicHistory.nextViewOptions({
      //disableAnimate: true,
      //disableBack: true
    });
    $scope.Search = Search;

    var searchTabSlideBoxDelegate = $ionicSlideBoxDelegate.$getByHandle('searchTabs');
    $scope.onProductSlide = function () {
      return searchTabSlideBoxDelegate.currentIndex() === 0
    };
    $scope.$on('$ionicView.enter',
        function(event){

          searchTabSlideBoxDelegate.enableSlide(false);

          console.log($ionicHistory.viewHistory());

          if($ionicHistory.viewHistory().forwardView === null){

            console.log('clear result....');
            $scope.ctrl.mdProductListControl.initData();
            $scope.ctrl.mdCompanyListControl.initData();
            $scope.PFrom = 0;
            $scope.CFrom = 0;
            $scope.ctrl.productResult = [];
            $scope.ctrl.companyResult = [];
            $scope.ctrl.authGroupType = $scope.ctrl.authGroupTypes[0];
            $scope.ctrl.brandType = $scope.ctrl.brandTypes[0];
          }


        });



    $scope.ctrl.authGroupTypes = [
      {
        id:0, name:'所有'
      },
      {
        id:1, name:'中核集团'
      },
      {
        id:2, name:'中广核集团'
      },
      {
        id:3, name:'国电投集团'
      },
      {
        id:4, name:'中核建集团'
      },
      {
        id:5, name:'华能集团'
      },
      {
        id:6, name:'大唐集团'
      }

    ];

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

    $scope.ctrl.authGroupType = $scope.ctrl.authGroupTypes[0];
    $scope.ctrl.brandType = $scope.ctrl.brandTypes[0];

    $scope.filterChanged = function () {
      console.log('filterChanged');
      $scope.ctrl.mdProductListControl.initData();

      $scope.PFrom = 0;
      $scope.ctrl.productResult = [];

    };

    $scope.loadProductData = function () {
      //categoryId, ctrl.hasServiceHistory, authGroup, ctrl.brandType, from, size
      //var authGroup = $scope.ctrl.authGroupType.id === 0 ?  null : $scope.ctrl.authGroupType.name;
      //var brandType = $scope.ctrl.brandType.id === 0 ?  null : $scope.ctrl.brandType.name;
      //console.log($scope.ctrl.authGroupType.id);
      //console.log($scope.ctrl.brandType.id);
      //
      //console.log(authGroup);
      //console.log(brandType);

      return Search.searchProduct(
          //$scope.ctrl.hasServiceHistory,
          //authGroup,
          //brandType,
          $scope.PFrom,
          $scope.size
      )
          .then(function (res) {
            console.log(res);
            return res;
          });
    };

    $scope.loadCompanyData = function () {
      //categoryId, ctrl.hasServiceHistory, authGroup, ctrl.brandType, from, size

      return Search.searchCompany(
          $scope.CFrom,
          $scope.size
      )
          .then(function (res) {
            console.log(res);
            return res;
          });
    };


    $scope.scrollTop = function() {
      $ionicScrollDelegate.scrollTop(true);
    };

  }
})();
