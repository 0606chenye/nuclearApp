/**
 * Created by vicky on 2015/8/13.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp')
      .directive('dynamicHeight',  dynamicHeight);

  /** @ngInject */
  function dynamicHeight() {
    var directive = {
      restrict: 'A',
      require: ['^ionSlideBox'],
      link: link
    };

    return directive;

    /** @ngInject */

    function link(scope, elem, attrs, slider) {

      scope.$watch(function() {
        return slider[0].__slider.selected();
      }, function(val) {
        //getting the heigh of the container that has the height of the viewport
        var newHeight = window.getComputedStyle(elem.parent('ion-content')[0], null).getPropertyValue("height");
        if (parseInt(newHeight) > 0) {
          var ionScrollTag = elem.find('ion-scroll')[0];
          ionScrollTag.style.height = newHeight;
          console.log(ionScrollTag.style.height)
        }
      });



    }

  }

})();
