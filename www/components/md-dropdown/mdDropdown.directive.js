/**
 * Created by vicky on 2015/8/15.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp')
      .directive('mdDropdown', mdDropdown);

  /** @ngInject */
  function mdDropdown() {
    var directive = {
      restrict: 'E',
      templateUrl: 'components/md-dropdown/md-dropdown.html',
      scope: {
        dropdownList: '=',
        currentValue: '=',
        onValueChanged: '&',
        buttonStyle: '@',
        initDisplay: '@'
      },
      link: link,
      controller: controller
//      controllerAs: 'vm',
//      bindToController: true
    };

    return directive;

    /** @ngInject */
    function controller($scope){
      console.log($scope.dropdownList);
      console.log($scope.buttonStyle);

      $scope.showDropdown = false;

      $scope.toggleDropdown = function () {
        //console.log('toogle');
        $scope.showDropdown = !$scope.showDropdown;
        //_.forEach($scope.otherDropdownSwitch, function(dropdownSwitch) {
        //  dropdownSwitch = false;
        //});


      };

      $scope.closeDropDown = function () {
        $scope.showDropdown = false;
      };

      $scope.selectChoice = function (choice) {
        console.log($scope.currentValue.name);
        console.log(choice.name);
        if($scope.onValueChanged !== undefined){

          //console.log($scope.currentValue.name.localeCompare(choice.name));
          if($scope.currentValue.name.localeCompare(choice.name)) {
            $scope.onValueChanged()();
          }
        }
        else {
          console.log('onValueChanged undefined');

        }
        $scope.currentValue = choice;
        $scope.showDropdown = false;
      };

      $scope.getDisplayValue = function () {
        if(!$scope.currentValue){
          return '';
        }
        if(0 === $scope.currentValue.id){
          return $scope.initDisplay;
        }
        else {
          return $scope.currentValue.name;
        }
    }
    }

    function link(scope, element, attrs) {
      //console.log(scope.products);
      //element.on('blur', function () {
      //  scope.showDropdown = false;
      //  console.log('blur!');
      //  scope.$apply();
      //});

    }

  }
})();
