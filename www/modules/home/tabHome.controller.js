/**
 * Created by wangjunru on 8/6/15.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($scope, $state, $rootScope, $ionicHistory, $cordovaInAppBrowser, Search, News) {
    var vm = this;

    $scope.$on('$ionicView.enter',
        function(event){
          console.log('enter home view');
          $ionicHistory.clearHistory();
          News.getNews({from:0, size:10}).
              then(function (res) {
                console.log(res);
                $scope.news = res;
                _.forEach($scope.news, function (news) {
                  news.updateDate = moment(news.updateDate).format('YYYY-M-DD');
                })
              });
        });

    $scope.home = {
      keyword: ''
    };

    var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };

    $scope.openNews = function (news) {
      $cordovaInAppBrowser.open(news.url, '_blank', options)
          .then(function(event) {
            console.log('Doc news Success!');
            // success
          })
          .catch(function(event) {
            console.log('Doc news error!');
            console.log(event);
            // error
          });
    }


    $scope.search = function () {
      console.log('enter search');


      //var queryString = {q:$scope.keyword, from:0, size:10 };

      console.log($scope.home.keyword);
      Search.setSearchQuery($scope.home.keyword);

      //Search.searchProduct();
      //Search.searchCompany();
      $rootScope.newSearch = true;
      $state.go('tab.searchList');
    }


  }
})();
