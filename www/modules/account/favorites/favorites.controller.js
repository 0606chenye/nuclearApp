/**
 * Created by vicky on 2015/8/24.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('FavoritesCtrl', FavoritesCtrl);

  function FavoritesCtrl($scope, $state, $rootScope, Product, Company, User, $ionicSlideBoxDelegate) {
    var vm = this;

    var favoritesTabsSlideBoxDelegate = $ionicSlideBoxDelegate.$getByHandle('favoritesTabs');
    $scope.PFfrom = 0;
    $scope.CFfrom = 0;
    $scope.size = 10;

    $scope.ctrl = {
      productFavorites: [],
      companyFavorites : []
    };
    //$scope.productFavorites = ['a'];
    //$scope.companyFavorites = ['a'];
    $scope.$on('$ionicView.enter',
        function(event) {

          favoritesTabsSlideBoxDelegate.enableSlide(false);
        });
    $scope.loadProductFavorites = function () {
      console.log('going to load Product Favorites in FavoritesCtrl:');
      return Product.getProductFavorites(
          {
            from:$scope.PFfrom,
            size:$scope.size
          })
          .then(function (res) {
            if(!_.isEmpty(res)){
              $scope.PFfrom = _.last(res).id;
            }

            console.log(res);
            console.log($scope.PFfrom);
            return res;
          });
    };

    $scope.loadCompanyFavorites = function () {
      console.log('going to load Company Favorites in FavoritesCtrl:');
      return Company.getCompanyFavorites(
          {
            from:$scope.CFfrom,
            size:$scope.size
          })
          .then(function (res) {
            if(!_.isEmpty(res)){
              $scope.CFfrom = _.last(res).id;
            }

            console.log(res);
            console.log($scope.CFfrom);
            return res;
          });
    };

    $scope.deleteProduct = function (product) {
      console.log('delete this product:');
      console.log(product);
      return User.deleteFavoriteProduct(product.id)
          .then(function (ret) {
            if(ret === 0){
              return true;
            }
            else {
              return fasle;
            }
          })
    };
    $scope.deleteCompany = function (company) {
      console.log('delete this company:');
      console.log(company);
      return User.deleteFavoriteCompany(company.id)
          .then(function (ret) {
            if(ret === 0){
              $rootScope.$broadcast("DeleteFavoriteCompany", company.id);
              return true;
            }
            else {
              return fasle;
            }
          })
    };



  }
})();
