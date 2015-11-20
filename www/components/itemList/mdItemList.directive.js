/**
 * Created by vicky on 2015/8/15.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp')
      .directive('mdItemList', mdItemList);

  /** @ngInject */
  function mdItemList() {
    var directive = {
      restrict: 'E',
      templateUrl: 'components/itemList/md-item-list.html',
      scope: {
        items: '=',
        itemStyle: '@',
        whichStateToGo: '@',
        control: '=',
        onLoadMore: '&',
        onDelete: '&',
        descriptionField: '@'
      },
      link: link,
      controller: controller
//      controllerAs: 'vm',
//      bindToController: true
    };

    return directive;

    /** @ngInject */
    function controller($scope, $state, $timeout){
      $scope.itemStyle = "{'height':'80px'}";
      console.log($scope.items);
      console.log($scope.descriptionField);

      if($scope.onLoadMore() === undefined){
        console.log('no more data can be loaded in this list');
        $scope.moreDataCanBeLoaded = false;
      }

      $scope.displayDescription = function (item) {
        if($scope.descriptionField === undefined){
          return item.description;
        }
        else {
          return item[$scope.descriptionField];
        }
      };
      $scope.goDetailPage = function (item) {
        console.log(item);
        $state.go($scope.whichStateToGo,{id: item.id});
      };
      $scope.showTag = function (tags,name) {
        return _.includes(tags, name);
      };

      $scope.listShow = true;
      $scope.squareShow = false;
      $scope._control = $scope.control || {};
      if($scope._control !== undefined){
        $scope._control.changeShowType = function () {
          $scope.listShow = !$scope.listShow;
          $scope.squareShow = !$scope.squareShow;
        };
        $scope._control.resetToListShowType = function () {
          $scope.listShow = true;
          $scope.squareShow = false;
        };
        $scope._control.initData = function () {
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.moreDataCanBeLoaded = true;
        }
      }


      $scope.moreDataCanBeLoaded = true;
      $scope.loadMore = function() {
        console.log('loading more...');
        //console.log($scope.onLoadMore());
        if($scope.onLoadMore() === undefined ){
          console.log('onLoadMore is undefined');
          $scope.moreDataCanBeLoaded = false;
          $scope.$broadcast('scroll.infiniteScrollComplete');
          return;
        }

        $scope.onLoadMore()()
            .then(function (res) {
              console.log(res);
              $scope.items = $scope.items.concat(res);
              if(_.isEmpty(res)){
                $scope.moreDataCanBeLoaded = false;
              }
              $scope.$broadcast('scroll.infiniteScrollComplete');
              //update parent items
              if($scope.control !== undefined ){
                $scope.control.updateParentItems($scope.items);
              }
            });
      };

      $scope.canDelete = function () {
        return  $scope.onDelete() !== undefined
      };

      $scope.deleteItem = function (item) {
        $scope.onDelete()(item)
            .then(function (res) {
              console.log(res);
              if(res){
                _.remove($scope.items, function (it) {
                  console.log(it.id);
                  console.log(item.id);
                  return it.id === item.id;
                });
                console.log($scope.items);
              }
            })
      };

      //$scope.$watch('items', function() {
      //  // all the code here...
      //  console.log('items changes!');
      //  //console.log($scope.items);
      //  console.log($scope.moreDataCanBeLoaded);
      //  if(_.isEmpty($scope.items)){
      //    //$scope.$broadcast('scroll.infiniteScrollComplete');
      //    //$scope.moreDataCanBeLoaded = true;
      //    //console.log('moreDataCanBeLoaded:');
      //    //console.log($scope.moreDataCanBeLoaded);
      //
      //    //$scope.loadMore();
      //  }
      //
      //});
    }




    function link(scope, element, attrs) {


      //console.log(scope.items);
      //scope.$watch('items', function() {
      //  // all the code here...
      //  console.log('items changes!');
      //  console.log(scope.items);
      //});


    }

  }
})();
