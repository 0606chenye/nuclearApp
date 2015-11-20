/**
 * Created by vicky on 2015/8/9.
 */
/**
 * Created by vicky on 2015/8/8.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.controllers')
      .controller('CompanyDetailCtrl', CompanyDetailCtrl);

  function CompanyDetailCtrl($scope, $state, $stateParams, $timeout, $ionicModal,$ionicSlideBoxDelegate, $ionicHistory, $ionicLoading, Company, ShowStars) {
    var vm = this;

    $scope.$on('$ionicView.enter', function () {
      console.log('CompanyDetailview entered...  ');
      console.log($ionicHistory.viewHistory());
      if($ionicHistory.viewHistory().forwardView === null){
        $scope.initData();
      }
      $timeout(function () {
        $ionicLoading.hide();
      },3000)
    });

    $scope.company = {
      credit: 0
    };
    $scope.images = [];

    $scope.initData = function () {
      var id = $stateParams.id;
      console.log($stateParams.id);
      Company.getCompany(id)
          .then(function (res) {
            console.log(res);
            $scope.company =res.company;
            $scope.authentications = res.authentications;
            $scope.certificates = res.certificates;
            $scope.contracts = res.contracts;
            $scope.licences = res.licences;
            $scope.products = res.products;
            //$scope.company.registrationDate = moment($scope.company.registrationDate).format('YYYY年M月DD日');

            console.log(moment($scope.company.foundationDate));
            var now = moment();
            var yearDiff = now.diff(moment($scope.company.foundationDate),'year');
            //console.log(moment($scope.company.registrationDate).subtract(yearDiff,'years'));
            var monthDiff = now.subtract(yearDiff,'years').diff(moment($scope.company.foundationDate), 'months');
            console.log(yearDiff);
            console.log(monthDiff);

            $scope.yearDiff = yearDiff > 0? yearDiff+'年': '';

            $scope.monthDiff = monthDiff > 0? monthDiff+'个月': '1个月';
            console.log($scope.yearDiff);
            console.log($scope.monthDiff);
            if($scope.company.imageUrls){
              $scope.company.imageUrls.split(',').forEach(function (url) {
                $scope.images.push(url);
              });
            }
            console.log($scope.images);
            $ionicLoading.hide();
          });
    };

    //console.log( JSON.stringify($ionicHistory.viewHistory(), null, 4) );
    $scope.ShowStars = ShowStars;
    var companyTabSlideBoxDelegate = $ionicSlideBoxDelegate.$getByHandle('companyTabs');
    $scope.$on('$ionicView.enter',
        function(event){

          console.log(companyTabSlideBoxDelegate.count());
          companyTabSlideBoxDelegate.enableSlide(false);
        });

    $scope.showImages = function(index) {
      $scope.activeSlide = index;
      $scope.showModal('templates/image-popover.html');
    };
    $scope.showModal = function(templateUrl) {
      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
      $scope.modal.remove()
    };

    $scope.enableCompanyTabSliderScroll = function () {
      console.log('enableCompanyTabSliderScroll');
      companyTabSlideBoxDelegate.enableSlide(true);
    };
    $scope.onImageSliderScroll = function () {
      //console.log('onImageSliderScroll');
      //companyTabSlideBoxDelegate.enableSlide(false);
    };

    //$scope.company = {
    //  corporation: '皇家飞利浦',
    //  name: '西门子',
    //  rate: 4.5,
    //  logo: 'img/logo-ABB.png',
    //  registrationDate: '2014年11月21日',
    //  address: '浙江海盐秦山路16号',
    //  industry: '阀门、泵、仪器仪表',
    //  imageUrl: '',
    //  description: '飞利浦投资绿色环保技术，通过选购绿色产品并享受我们的产品回收服务，消费者在日常生活中也可以为创造更加健康舒适的世界贡献力量。我们采取行动来持续降低我们的运营对环境造成的影响，同时确保关注健康的生态系统。',
    //  products: [
    //    {
    //      name: '威联通(QNAP)单盘位网络存储 TS-120 NAS',
    //      logo: 'img/storage-1.jpg',
    //      tags:['工业产品','技术文档']
    //    },
    //    {
    //      name: '威联通(QNAP)单盘位网络存储 TS-122 NAS',
    //      logo: 'img/storage-2.jpg',
    //      tags:['工业产品','核级产品']
    //    },
    //    {
    //      name: '威联通(QNAP)单盘位网络存储 TS-123 NAS',
    //      logo: 'img/storage-3.jpg',
    //      tags:['核级产品']
    //    },
    //    {
    //      name: '威联通(QNAP)单盘位网络存储 TS-120 NAS',
    //      logo: 'img/storage-1.jpg',
    //      tags:['工业产品','技术文档']
    //    },
    //    {
    //      name: '威联通(QNAP)单盘位网络存储 TS-120 NAS',
    //      logo: 'img/storage-1.jpg',
    //      tags:['工业产品','技术文档']
    //    },
    //    {
    //      name: '威联通(QNAP)单盘位网络存储 TS-120 NAS',
    //      logo: 'img/storage-1.jpg',
    //      tags:['工业产品','技术文档']
    //    },
    //    {
    //      name: '威联通(QNAP)单盘位网络存储 TS-120 NAS',
    //      logo: 'img/storage-1.jpg',
    //      tags:['工业产品','技术文档']
    //    },
    //    {
    //      name: '威联通(QNAP)单盘位网络存储 TS-120 NAS',
    //      logo: 'img/storage-1.jpg',
    //      tags:['工业产品','技术文档']
    //    }
    //  ],
    //  certification: {
    //
    //  }
    //};
    $scope.hasLicence = function (license) {
      return _.find($scope.licences, {'name': license})
    };
    $scope.hasCertificate = function (certificate) {
      return _.find($scope.certificates, {'name': certificate})
    };
    $scope.hasAuthentication = function (authentication) {
      return _.find($scope.authentications, {'authGroup': authentication})
    };


    $scope.providerType = {name:'所有采购方集团'};
    $scope.companyCategory = {name:'所有分类'};

    $scope.providerTypes = [
      {
        id:1, name:'一级供货商'
      },
      {
        id:2, name:'二级供货商'
      },
      {
        id:3, name:'三级供货商'
      },
      {
        name:'所有采购方集团'
      }
    ];
    $scope.companyCategorys = [
      {
        id:1, name:'一级分类'
      },
      {
        id:2, name:'二级分类'
      },
      {
        id:3, name:'三级分类'
      },
      {
        name:'所有分类'
      }
    ];
  }


})();