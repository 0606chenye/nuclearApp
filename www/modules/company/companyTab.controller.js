/**
 * Created by vicky on 2015/8/8.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('CompanyTabCtrl', CompanyTabCtrl);

  function CompanyTabCtrl($scope, $state, $timeout, $ionicLoading, $ionicHistory, $ionicScrollDelegate, Company, Common, User, Config) {
    var vm = this;


    $scope.Config = Config;
    $scope.ctrl = {};

    $scope.isIos = ionic.Platform.isIOS();
    console.log( $scope.isIos)
    $scope.$on('$ionicView.enter', function () {
      console.log('companyTab view entered...  ');
      $ionicLoading.hide();
      $ionicHistory.clearHistory();
      $timeout(function () {
        $ionicLoading.hide();
      },3000)

    });
    $scope.$on("DeleteFavoriteCompany", function (events, companyId) {
      console.log('取消了这个company的关注' + companyId);
      var company =  _.find($scope.companies, function (company) {
        return company.id == companyId
      });
      company.favorited = false;
    });





    function getOrderType(id) {
      if(id === 1){
        return 'registrationDate'
      }
      else if (id  === 2) {
        return 'likeCount'
      }
      else {
        return 'favoriteCount '
      }
    }

    Common.getProvince().
        then(function (res) {
          $scope.provinces = res;
          $scope.provinces.unshift({id:0, name:'全国'});
          $scope.ctrl.province = $scope.provinces[0];
        });
    Common.getBusinessdomains()
        .then(function (res) {
          $scope.domains = res.domains;
          $scope.domains.unshift({id:0, name:'全部'});
          $scope.ctrl.domain = $scope.domains[0];
        });

    //$scope.openSelectProvinceModal = function () {
    //  $ionicModal.fromTemplateUrl('templates/select-province-modal.html', {
    //    scope: $scope,
    //    backdropClickToClose: true
    //  }).then(function(modal) {
    //    $scope.modal = modal;
    //    $scope.modal.show();
    //  });
    //};

    $scope.ctrl.authGroupType = Config.getAuthGroupTypes()[0];
    $scope.ctrl.orderType = Config.getOrderTypes()[0];


    $scope.getDomainDisplay = function () {
      //console.log('provinces');
      if($scope.ctrl.domain && $scope.ctrl.domain.id !== 0){
        return $scope.ctrl.domain.name;
      }
      else {
        return '主营业务'
      }
    };
    $scope.getAuthGroupDisplay = function () {
      if($scope.ctrl.authGroupType && $scope.ctrl.authGroupType.id !== 0){
        return $scope.ctrl.authGroupType.name;
      }
      else {
        return '合格供方'
      }
    };
    $scope.getOrderTypeDisplay = function () {
      if($scope.ctrl.orderType && $scope.ctrl.orderType.id !== 0){
        return $scope.ctrl.orderType.name;
      }
      else {
        return '排序'
      }
    };
    $scope.getProvinceDisplay = function () {
      //console.log('provinces');
      if($scope.ctrl.province && $scope.ctrl.province.id !== 0){
       return $scope.ctrl.province.name;
      }
      else {
        return '省市'
      }
    };
    //
    $scope.selectDomain = function (domain) {
      console.log(domain);
      $scope.ctrl.domain = domain;
      $scope.filterChanged();
    };
    $scope.selectAuthGroup = function (authGroup) {
      console.log(authGroup);
      $scope.ctrl.authGroupType = authGroup;
      $scope.filterChanged();
    };
    $scope.selectOrderType = function (orderType) {
      console.log(orderType);
      $scope.ctrl.orderType = orderType;
      $scope.filterChanged();
    };
    $scope.selectProvince = function (province) {
      console.log(province);
      $scope.ctrl.province = province;
      $scope.filterChanged();
    };




    $scope.filterChanged = function () {
      console.log('filterChanged');
      $scope.$broadcast('scroll.infiniteScrollComplete');
      $scope.from = 0;
      $scope.size = 10;
      $scope.moreDataCanBeLoaded = true;
      $scope.companies = [];
    };


    $scope.getCompanies = function () {
      function buildGetCompaniesQueryString(){
        console.log($scope.ctrl.authGroupType);
        console.log($scope.ctrl.orderType);
        var qs = {
          type: 1,
          from: $scope.from,
          size:20
        };
        if($scope.ctrl.province && $scope.ctrl.province.id !== 0){
          qs.province = $scope.ctrl.province.name;
        }
        if($scope.ctrl.authGroupType && $scope.ctrl.authGroupType.id !== 0){
          qs.authGroup = $scope.ctrl.authGroupType.name;
        }
        if($scope.ctrl.orderType && $scope.ctrl.orderType.id !== 0){
          qs.order = getOrderType($scope.ctrl.orderType.id);
        }
        if($scope.ctrl.domain && $scope.ctrl.domain.id !== 0){
          var domain = _.find($scope.domains, function (domain) {
            return domain.id === $scope.ctrl.domain.id
          });
          qs.domain = domain.name;
          console.log(qs.domain);
        }
        return qs
      }
      return Company.getCompanies(buildGetCompaniesQueryString());

    };

    $scope.addToFavorites = function (company) {
      Company.addCompanyFavorite(company.id)
          .then(function (res) {
            console.log(res);
            if(res === 0){
              company.favorited = true;
            }
          })
    };
    $scope.removeFavorites = function (company) {
       User.deleteFavoriteCompany(company.id)
          .then(function (ret) {
            if(ret === 0){
              company.favorited = false;
            }
          })
    };


    $scope.likeCompany = function (company) {
      if(!company.hasLiked){
        Company.likeCompanyById(company.id)
            .then(function (res) {
              if(res.ret === 0){
                company.likeCount = res.data.likeCount;
                company.hasLiked = true;
              }
            })
      }
      else {
        Company.cancelLikeCompanyById(company.id)
            .then(function (res) {
              if(res.ret === 0){
                company.likeCount = res.data.likeCount;
                company.hasLiked = false;
              }
            })
      }
    };

    $scope.loadMore = function() {
      console.log('loading more...');
      $scope.getCompanies()
          .then(function (res) {
            console.log(res);

            if(_.isEmpty(res)){
              console.log('res is empty');
              $scope.moreDataCanBeLoaded = false;
            }
            else {
              console.log('res is not empty');

              //$scope.from = _.last(res).id;


              //_.forEach(res, function (company) {
              //  if(company.latestFeed !== null){
              //    company.latestFeed.publishDate = moment(company.latestFeed.publishDate).format('M月DD日');
              //  }
              //
              //});
              $scope.companies = $scope.companies.concat(res);
              $scope.from = $scope.companies.length;
              console.log($scope.from);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
          })
    };
    $scope.filterChanged();

    $scope.goCompanyById = function (id) {
      $ionicLoading.show();
      $state.go('tab.company-detail/:id' ,{id: id});
    };

    $scope.doRefresh = function() {
      $scope.from = 0;
      $scope.size = 10;
      $scope.getCompanies()
          .then(function (res) {
            console.log(res);

            if(_.isEmpty(res)){
              console.log('res is empty');
              $scope.moreDataCanBeLoaded = false;
            }
            else {
              console.log('res is not empty');
              $scope.companies = res;
              $scope.from = $scope.companies.length;
              console.log($scope.from);
              $scope.$broadcast('scroll.refreshComplete');
            }
          });

    };
    $scope.getCompleteStarNumber = function(num) {
      return new Array(Math.floor(num));
    };
    $scope.haveHalfStar = function (num) {
      return num - Math.floor(num) > 0;
    };

    $scope.getScrollPostion = function () {
      //console.log($ionicScrollDelegate.getScrollPosition())
      return ;
    };
    $scope.scrollTop = function() {
      $ionicScrollDelegate.scrollTop(true);
    };
    //Company.getCompanies({from:0,size:10})
    //    .then(function (res) {
    //      //console.log(res);
    //      $scope.companies = res;
    //      console.log($scope.companies);
    //      $scope.companyA = $scope.companies[0];
    //    });
  }
})();
