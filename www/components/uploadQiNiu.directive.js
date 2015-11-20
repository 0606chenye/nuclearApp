/**
 * Created by vicky on 2015/8/21.
 */
(function () {
    'use strict';

    angular
        .module('nuclearApp')
        .directive('mdUploadQiniu',  mdUploadQiniu);

    /** @ngInject */
    function mdUploadQiniu($cordovaCamera, $rootScope, $cordovaFileTransfer, $cordovaImagePicker) {
        var directive = {
            restrict: 'A',
            link: link,
            scope: {
                onUploadWin: '&'
            }
        };

        return directive;

        /** @ngInject */

        function link(scope, element, attrs) {
            var single = false;
            console.log(attrs.single);
            if(attrs.single){
                single = true;
            }
            element.bind('click', function (e) {
                console.log('click mdUploadQiniu');
                var cameraOptions = {
                    quality: 50,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 800,
                    targetHeight: 800,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };


                var imagePickerOptions = {
                    maximumImagesCount: 10,
                    width: 800,
                    height: 800,
                    quality: 80
                };
                if(!single){
                    $cordovaImagePicker.getPictures(imagePickerOptions)
                        .then(function (results) {
                            for (var i = 0; i < results.length; i++) {
                                console.log('Image URI: ' + results[i]);
                                $cordovaFileTransfer.upload('http://upload.qiniu.com', results[i],
                                    {
                                        httpMethod: 'POST',
                                        params: {
                                            token: $rootScope.upload.token,
                                            key: 'nuclearApp' + Date.now()
                                        }
                                    }
                                    )
                                    .then(function(res) {
                                        //res = JSON.parse(res);
                                        //为什么会有反斜杠！@！！@@！！@！@！！
                                        res = JSON.parse( res.response.replace(/\//g, ''));
                                        console.log('upload res:' + JSON.stringify(res,null,2));
                                        scope.onUploadWin()($rootScope.upload.cdn + '/' + res.key);
                                        // Success!
                                    }, function(err) {
                                        console.log(JSON.stringify(err,null,2));

                                        // Error
                                    }, function (progress) {
                                        // constant progress updates
                                    });
                            }
                        }, function(error) {
                            // error getting photos
                        });
                }
                else {
                    $cordovaCamera.getPicture(cameraOptions)
                        .then(function(imageURI) {
                            console.log(imageURI);
                            //var image = document.getElementById('myImage');
                            //image.src = imageURI;
                            //
                            //scope.testImage = imageURI;
                            //
                            //console.log(scope.testImage);



                            return imageURI

                        }, function(err) {
                            // error
                        })
                        .then(function (imageURI) {
                            $cordovaFileTransfer.upload('http://upload.qiniu.com', imageURI,
                                {
                                    httpMethod: 'POST',
                                    params: {
                                        token: $rootScope.upload.token,
                                        key: 'nuclearApp' + Date.now()
                                    }
                                }
                                )
                                .then(function(res) {
                                    //res = JSON.parse(res);
                                    //为什么会有反斜杠！@！！@@！！@！@！！
                                    res = JSON.parse( res.response.replace(/\//g, ''));
                                    console.log('upload res:' + JSON.stringify(res,null,2));
                                    scope.onUploadWin()($rootScope.upload.cdn + '/' + res.key);
                                    // Success!
                                }, function(err) {
                                    console.log(JSON.stringify(err,null,2));

                                    // Error
                                }, function (progress) {
                                    // constant progress updates
                                });
                        });
                }




            });
        }


    }

})();
