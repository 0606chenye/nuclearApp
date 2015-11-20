/**
 * Created by vicky on 2015/10/16.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp')
      .directive('mdSelectModalButton',  mdSelectModalButton);

  /** @ngInject */
  function mdSelectModalButton($parse, $ionicModal) {
    var directive = {
      restrict: 'E',
      transclude: true,
      templateUrl: 'components/md-select-modal-button/md-select-modal-button.html',
      scope: true,
      controller: controller,
      link: link
    };

    return directive;



    /** @ngInject */
    function controller($scope){
      //$scope.openSelectModal = function () {
      //  $scope.items = $scope.$eval(attrs.items);
      //  $ionicModal.fromTemplateUrl('components/md-select-modal-button/select-item-modal.html', {
      //    scope: $scope,
      //    backdropClickToClose: true
      //  }).then(function(modal) {
      //    $scope.modalScope = modal;
      //    $scope.modalScope.show();
      //  });
      //};



    }



    /** @ngInject */
    function link($scope, elem, attrs) {
      var selectItemFn = $parse(attrs.selectItemFn);
      var buttonDisplayFn = $parse(attrs.buttonDisplayFn);

      $scope.openSelectModal = function () {
        //console.log(attrs.items);
        $scope.items = $scope.$eval(attrs.items);
        console.log($scope.selectItem);
        //console.log($scope.items);
        $ionicModal.fromTemplateUrl('components/md-select-modal-button/select-item-modal.html', {
          scope: $scope,
          backdropClickToClose: true
        }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      };
      $scope.getButtonDisplay = function () {
        return buttonDisplayFn($scope);
      };

      $scope.selectItem = function (item) {
        console.log(item);
        $scope.modal.hide();
        selectItemFn($scope)(item);
      };
      $scope.clickModal = function () {
        console.log('click modal')
        $scope.modal.hide();
      }
    }

  }

})();