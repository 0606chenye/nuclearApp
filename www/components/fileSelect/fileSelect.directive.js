/**
 * Created by vicky on 2015/8/8.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp')
      .directive('mdFileSelect',  mdFileSelect);

  /** @ngInject */
  function mdFileSelect($rootScope, $http) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    /** @ngInject */

    function link(scope, element, attrs) {

      element.bind('change', function (e) {
        //上传
        var fn = attrs.mdFileSelect;
        var dir = attrs.mdDir;
        console.log(dir + '/' + Date.now());
        var file = e.target.files[0];
        if (file == undefined) {//没选择文件
          return false;
        }
        var form = new FormData();
        console.log(file);
        form.append('token', $rootScope.upload.token);//设置上传token
        form.append("file", file);
        form.append('key', dir + '/' + Date.now());
        $rootScope.imageUpLoading = true;
        $http.post('http://upload.qiniu.com', form, {
          headers: {
            'Content-Type': undefined//如果不设置Content-Type,默认为application/json,七牛会报错
          }
        }).success(function (data) {
          console.log(data);
          $rootScope.imageUpLoading = false;
          scope[fn]($rootScope.upload.cdn + '/' + data.key);//上传回调，将url传到upload方法中
        });
      });
    }

  }

})();
