/**
 * Created by vicky on 2015/8/11.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('ProductDetailCtrl', ProductDetailCtrl);

  function ProductDetailCtrl($scope, $state, $stateParams, $ionicSlideBoxDelegate, ionicToast, Product) {
    var vm = this;

    //console.log( JSON.stringify($ionicHistory.viewHistory(), null, 4) );
    var id = $stateParams.id;
    $scope.showTagsMore = false;
    $scope.showParasMore = false;
    $scope.toggleTagMore = function () {
      $scope.showTagsMore = !$scope.showTagsMore;
    };
    $scope.toggleParasMore = function () {
      $scope.showParasMore = !$scope.showParasMore;
    };
    //$scope.product = {
    //  name: 'yunos纽曼 CM810纽扣指纹 智能手机 8核',
    //  tags: ['限购','三包','终身保修'],
    //  parameter: '金色、公开版（16GB ROM）、非合约机 1件'
    //};
    //$scope.images = ['http://7xk9v7.com1.z0.glb.clouddn.com/products/107/imgs/atom%20(1).png',
    //  'http://7xk9v7.com1.z0.glb.clouddn.com/products/107/imgs/dd.png',
    //  'http://7xk9v7.com1.z0.glb.clouddn.com/products/107/imgs/mysql.png',
    //  'http://7xk9v7.com1.z0.glb.clouddn.com/products/107/imgs/webstorm10%20license%20key.png'
    //];
    //$scope.images = [
    //  'http://7xk9v7.com1.z0.glb.clouddn.com/products/107/imgs/0.webstorm.jpg',
    //  'http://7xk9v7.com1.z0.glb.clouddn.com/products/107/imgs/dd.png',
    //  'http://7xk9v7.com1.z0.glb.clouddn.com/products/107/imgs/mysql.png',
    //  'http://7xk9v7.com1.z0.glb.clouddn.com/products/107/imgs/atom12.png'
    //];
    //$scope.images = ["http://7xk9v7.com1.z0.glb.clouddn.com/products/107/imgs/0.webstorm.jpg", "http://7xk9v7.com1.z0.glb.clouddn.com/products/107/imgs/dd.png", "http://7xk9v7.com1.z0.glb.clouddn.com/products/107/imgs/mysql.png", "http://7xk9v7.com1.z0.glb.clouddn.com/products/107/imgs/atom12.png"];

    var scope = $scope;
    $scope.getData = function () {
      Product.getProductsById(id)
          .then(function (res) {
            console.log(res.product);
            scope.product = res.product;
            scope.product.parameter = _.pluck(scope.product.params,'name').join(' ');
            scope.product.tags = res.product.tags;
            if(scope.product.imgs){
              scope.images = scope.product.imgs.toString().split(',');
            }
            console.log(scope.images);
            $ionicSlideBoxDelegate.update();

            Product.setDetailTabInfo({
              docs: $scope.product.docs,
              specificsUrl: $scope.product.specificsUrl,
              //servicesHistoryUrl: $scope.product.servicesHistoryUrl,
              contracts: $scope.product.contracts,
              spareUrl: $scope.product.spareUrl
            })
          });
    };
    $scope.getData();

    $scope.favoriteProduct = function () {
      Product.addProductFavorite(id)
          .then(function (ret) {
            if(ret === 0){
              scope.product.favorited = true;
              ionicToast.show('已关注该产品，请到个人中心查看', 'top', false, 3000);
            }
          })
    };
    $scope.goCompanyPage = function () {
      console.log($state.current.name);
      if('tab.product-detail/:id' === $state.current.name) {
        $state.go('tab.product-company-detail/:id',{id: scope.product.companyId});
      }
      else if('tab.search-product-detail/:id' === $state.current.name){
        $state.go('tab.search-product-company-detail/:id',{id: scope.product.companyId});
      }
      else {
        $state.go('tab.company-detail/:id',{id: scope.product.companyId});
      }

    };
    //$scope.images = ['http://7xk9v7.com1.z0.glb.clouddn.com/products/107/imgs/atom%20(1).png',
    //  'http://7xk9v7.com1.z0.glb.clouddn.com/products/107/imgs/dd.png',
    //  'http://7xk9v7.com1.z0.glb.clouddn.com/products/107/imgs/mysql.png',
    //    'http://7xk9v7.com1.z0.glb.clouddn.com/products/107/imgs/webstorm10%20license%20key.png'
    //];

    //$scope.images = ['http://img.wallba.com/data/Image/2013pq/3yue/7hao/4/19/201337143424375.jpg',
    //  'http://cdn.bigbangfish.com/555/Sea-animals-wallpapers/Sea-animals-wallpapers-5.jpg',
    //  'http://img4.3lian.com/img2005/07/21/050.jpg'];
    //$scope.images = ['img/pic1.jpg','img/pic2.jpg','img/pic3.jpg','img/circle-GE_1.jpeg','img/circle-GE_2.jpeg','img/circle-GE_3.jpeg'];



    $scope.sliderId = 0;
    console.log($ionicSlideBoxDelegate.count());

    $scope.slideHasChanged = function (index) {
      console.log(index);
      $ionicSlideBoxDelegate.count();

    }
  }
})();