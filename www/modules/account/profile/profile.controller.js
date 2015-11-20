/**
 * Created by vicky on 2015/8/20.
 */
(function () {
    'use strict';

    angular
        .module('nuclearApp.controllers')
        .controller('ProfileCtrl', ProfileCtrl);

    function ProfileCtrl($scope, $state, $rootScope, $auth, $ionicScrollDelegate, User, Common) {
        var vm = this;


        $scope.provinceSelected = false;
        Common.getProvince().
            then(function (res) {
                $scope.provinces = res;
                //$scope.provinces.unshift({id:0, name:'全国'});
                //$scope.ctrl.province = $scope.provinces[0];
            });


        $scope.selectProvince = function (province) {
            $ionicScrollDelegate.$getByHandle('cityScroll').scrollTop();
            $scope.provinceSelected = true;
            angular.forEach($scope.provinces, function (value, key) {
                value.clicked = false;
            });
            province.clicked = true;

            $scope.user.province = province.name;
            Common.getCities(province.id).
                then(function (res) {
                    $scope.cities = res;

                });
        };


        $scope.logout = function () {
            $rootScope.domain = '';
            $rootScope.role = '';
            $auth.logout();
        };
        $scope.auth = $auth;


        User.getMe()
            .then(function (res) {
                $scope.user = res;
                $scope.thumbNail = res.profile;
            });

        $scope.updateNickName = function () {
            User.updateMe(
                {
                    nickName: $scope.user.nickName
                }
            )
                .then(function (res) {
                    console.log(res);
                });
            $state.go('tab.profile');
        };
        $scope.updateCompany = function () {
            User.updateMe(
                {
                    companyName: $scope.user.companyName
                }
            )
                .then(function (res) {
                    console.log(res);
                });
            $state.go('tab.profile');
        };


        $scope.updateThumbNail = function (thumbNail) {
            console.log(thumbNail);
            $scope.thumbNail = thumbNail;
            User.updateMe(
                {
                    profile: thumbNail
                })
                .then(function (res) {
                    console.log(res);
                })

        };

        $scope.updateRole = function () {
            var role = _.filter($scope.roles, {'checked':true})[0];
            console.log(role);
            User.updateMe(
                {
                    roleId: role.id,
                    role: role.name
                })
                .then(function (res) {
                    console.log(res);
                });
            $state.go('tab.profile');

        };
        $scope.updateDomain = function () {
            var domainArr = _.filter($scope.domains, {'checked':true});

            var businessDomainId = '';
            var businessDomain = '';
            _.forEach(domainArr, function (domain) {
                businessDomainId = businessDomainId + domain.id + ',';
                businessDomain = businessDomain + domain.name + ',';
            });
            businessDomainId = businessDomainId.slice(0, - 1); //删除最后的一个逗号
            businessDomain = businessDomain.slice(0, - 1); //删除最后的一个逗号

            console.log(businessDomainId);
            $rootScope.domain = domainArr;
            console.log($rootScope.domain);

            User.updateMe(
                {
                    businessDomainId: businessDomainId,
                    businessDomain: businessDomain
                })
                .then(function (res) {
                    console.log(res);
                });
            $state.go('tab.profile');

        };
        $scope.updateGender = function () {
            var gender = _.filter($scope.genders, {'checked':true})[0];

            User.updateMe(
                {
                    gender: gender.id
                })
                .then(function (res) {
                    console.log(res);
                });
            $state.go('tab.profile');

        };

        $scope.updateRegion = function (city) {
            $scope.user.city
            User.updateMe(
                {
                    province: $scope.user.province,
                    city: city.name
                }
            )
                .then(function (res) {
                    console.log(res);
                });
            $state.go('tab.profile');
        };

        $scope.updateSignature = function () {
            User.updateMe(
                {
                    signature: $scope.user.signature
                }
            )
                .then(function (res) {
                    console.log(res);
                });
            $state.go('tab.profile');
        };

        $scope.selectRole = function (role) {
            _.forEach($scope.roles, function (role) {
                role.checked = false;
            });
            role.checked = true;
        };

        $scope.selectGender = function (gender) {
            _.forEach($scope.genders, function (gender) {
                gender.checked = false;
            });
            gender.checked = true;
        };

        $scope.roles = $rootScope.roles;
        $scope.domains = $rootScope.domains;

        console.log($rootScope.roles);

        $scope.genders = [
            {id:0,  name: '女'},
            {id:1,  name: '男'}
        ];
        console.log($scope.genders);



    }
})();
