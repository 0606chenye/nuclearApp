// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('nuclearApp', ['ionic', 'nuclearApp.controllers', 'nuclearApp.services',
  'satellizer','ngCordova','ionic-toast', 'ngIOS9UIWebViewPatch'])
    .constant('BACK_END',{
      baseUrl: 'http://139.196.24.48:9905/api/'

      //baseUrl: 'http://192.168.31.133:9902/api/'
    })
    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleLightContent();
        }
      });
    })
    .run(function($rootScope, $ionicPlatform, $ionicHistory){
      $ionicPlatform.registerBackButtonAction(function(e){
        if ($rootScope.backButtonPressedOnceToExit) {
          ionic.Platform.exitApp();
        }

        else if ($ionicHistory.backView()) {
          $ionicHistory.goBack();
        }
        else {
          $rootScope.backButtonPressedOnceToExit = true;
          window.plugins.toast.showShortCenter(
              "再按一下退出",function(a){},function(b){}
          );
          setTimeout(function(){
            $rootScope.backButtonPressedOnceToExit = false;
          },2000);
        }
        e.preventDefault();
        return false;
      },101);
    })

    .config(function ($stateProvider, $urlRouterProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider


        // setup an abstract state for the tabs directive
          .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html",
            controller: 'TabCtrl'
          })

        // Each tab has its own nav history stack:

          .state('tab.home', {
            url: '/home',
            views: {
              'tab-home': {
                templateUrl: 'modules/home/tab-home.html',
                controller: 'HomeCtrl'
              }
            }
          })

          .state('tab.searchList', {
            url: '/home/search-list',
            views:{
              'tab-home':{
                templateUrl: 'modules/home/search/search-list.html',
                controller: 'SearchCtrl'
              }
            }
          })
          .state('tab.search-product-detail/:id', {
            url: '/home/product/:id',
            views: {
              'tab-home': {
                templateUrl: 'modules/product/productDetail/product-detail.html',
                controller: 'ProductDetailCtrl'
              }
            }
          })
          .state('tab.search-product-company-detail/:id', {
            url: '/home/product/company/:id',
            views: {
              'tab-home': {
                templateUrl: 'modules/company/companyDetail/company-detail.html',
                controller: 'CompanyDetailCtrl'
              }
            }
          })
          .state('tab.search-company-detail/:id', {
            url: '/home/company/:id',
            views: {
              'tab-home': {
                templateUrl: 'modules/company/companyDetail/company-detail.html',
                controller: 'CompanyDetailCtrl'
              }
            }
          })
          .state('tab.news', {
            url: '/home/news?url',
            views: {
              'tab-home': {
                templateUrl: 'modules/home/news/news.html',
                controller: 'NewsCtrl'
              }
            }
          })
        //----------------------------------------------end home

          .state('tab.product', {
            url: '/product',
            views: {
              'tab-product': {
                templateUrl: 'modules/product/tab-product.html',
                controller: 'TabProductCtrl'
              }
            }
          })
          .state('tab.category', {
            url: '/category',
            views: {
              'tab-product': {
                templateUrl: 'modules/product/category/category.html',
                controller: 'CategoryCtrl'
              }
            }
          })
          .state('tab.productList', {
            url: '/product/category/:categoryId',
            views: {
              'tab-product': {
                templateUrl: 'modules/product/productList/product-list.html',
                controller: 'ProductListCtrl'
              }
            }
          })
          .state('tab.product-detail/:id', {
            url: '/product/:id',
            views: {
              'tab-product': {
                templateUrl: 'modules/product/productDetail/product-detail.html',
                controller: 'ProductDetailCtrl'
              }
            }
          })
          .state('tab.product-tab', {
            url: '/product/:productId/tab/:tabId',
            views: {
              'tab-product': {
                templateUrl: 'modules/product/productDetail/product-detail-tab.html',
                controller: 'ProductDetailTabCtrl'
              }
            }
          })
          .state('tab.product-company-detail/:id', {
            url: '/product/company/:id',
            views: {
              'tab-product': {
                templateUrl: 'modules/company/companyDetail/company-detail.html',
                controller: 'CompanyDetailCtrl'
              }
            }
          })
        //----------------------------------------------end product
          .state('tab.company', {
            url: '/company',
            views: {
              'tab-company': {
                templateUrl: 'modules/company/tab-company.html',
                controller: 'CompanyTabCtrl'
              }
            }
          })
          .state('tab.company-detail/:id', {
            url: '/company/:id',
            views: {
              'tab-company': {
                templateUrl: 'modules/company/companyDetail/company-detail.html',
                controller: 'CompanyDetailCtrl'
              }
            }
          })
        //impossible to Creating shared routes in different views, ui-router doesn't support it,
        //the workaround is to create a duplicate view using the same controller and template.
        //http://forum.ionicframework.com/t/creating-shared-routes-in-different-views/3955
        //http://forum.ionicframework.com/t/same-state-for-different-app-tabbar-sections/3234/2
          .state('tab.company-product-detail/:id', {
            url: '/company/product/:id',
            views: {
              'tab-company': {
                templateUrl: 'modules/product/productDetail/product-detail.html',
                controller: 'ProductDetailCtrl'
              }
            }
          })
          .state('tab.circle', {
            url: '/circle',
            views: {
              'tab-circle': {
                templateUrl: 'modules/circle/tab-circle.html',
                controller: 'CircleTabCtrl'
              }
            }
          })
          .state('tab.feed', {
            url: '/circle/feed/:id',
            params: {feed: null},
            views: {
              'tab-circle': {
                templateUrl: 'modules/circle/feed/feed.html',
                controller: 'FeedCtrl'
              }
            }
          })
          .state('tab.feed-reply', {
              url: '/circle/feed/:id/reply',
              params: {feed: null},
              views: {
                  'tab-circle': {
                      templateUrl: 'modules/circle/feedReply/feed-reply.html'
                      //controller: 'FeedCtrl'
                  }
              }
          })
          .state('tab.user', {
            url: '/circle/user/:id',
            views: {
              'tab-circle': {
                templateUrl: 'modules/circle/user/user.html',
                controller: 'UserCtrl'
              }
            }
          })
          .state('tab.circle-outbox', {
            url: '/circle/outbox',
            views: {
              'tab-circle': {
                templateUrl: 'modules/account/mails/mails.html',
                controller: 'MailsCtrl'
              }
            }
          })
          .state('tab.postFeed', {
            url: '/circle/postFeed',
            views: {
              'tab-circle': {
                templateUrl: 'modules/circle/postFeed/post-feed.html',
                controller: 'PostFeedCtrl'
              }
            }
          })
          .state('tab.account', {
            url: '/account',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/tab-account.html',
                controller: 'AccountCtrl'
              }
            }
          })
          .state('tab.mails', {
            url: '/account/mails',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/mails/mails.html',
                controller: 'MailsCtrl'
              }
            }
          })
          .state('tab.mailList', {
            url: '/account/mailList',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/mails/mail-list.html',
                controller: 'MailListCtrl'
              }
            }
          })
          .state('tab.mailDetail/:id', {
            url: '/account/mailDetail/:id/:nickName',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/mails/mail-detail.html',
                controller: 'MailDetailCtrl'
              }
            }
          })
          .state('tab.verification', {
            url: '/account/verification',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/verification/verification.html',
                controller: 'VerificationCtrl'
              }
            }
          })
          .state('tab.profile', {
            url: '/account/profile',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/profile/profile.html',
                controller: 'ProfileCtrl'
              }
            }
          })
          .state('tab.nickName', {
            url: '/account/profile/nickName',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/profile/nickName.html',
                controller: 'ProfileCtrl'
              }
            }
          })
          .state('tab.companyName', {
              url: '/account/profile/companyName',
              views: {
                  'tab-account': {
                      templateUrl: 'modules/account/profile/company.html',
                      controller: 'ProfileCtrl'
                  }
              }
          })
          .state('tab.role', {
            url: '/account/profile/role',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/profile/role.html',
                controller: 'ProfileCtrl'
              }
            }
          })
          .state('tab.gender', {
            url: '/account/profile/gender',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/profile/gender.html',
                controller: 'ProfileCtrl'
              }
            }
          })
          .state('tab.region', {
            url: '/account/profile/region',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/profile/region.html',
                controller: 'ProfileCtrl'
              }
            }
          })
          .state('tab.domain', {
              url: '/account/profile/domain',
              views: {
                  'tab-account': {
                      templateUrl: 'modules/account/profile/domain.html',
                      controller: 'ProfileCtrl'
                  }
              }
          })
          .state('tab.signature', {
            url: '/account/profile/signature',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/profile/signature.html',
                controller: 'ProfileCtrl'
              }
            }
          })
          .state('tab.broadcast', {
            url: '/account/broadcast',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/broadcast/broadcast.html',
                controller: 'BroadcastCtrl'
              }
            }
          })
          .state('tab.feedback', {
            url: '/account/feedback',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/feedback/feedback.html',
                controller: 'FeedbackCtrl'
              }
            }
          })
          .state('tab.myCircle', {
            url: '/account/myCircle',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/myCircle/myCircle.html',
                controller: 'myCircleCtrl'
              }
            }
          })
          .state('tab.favorites', {
            url: '/account/favorites',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/favorites/favorites.html',
                controller: 'FavoritesCtrl'
              }
            }
          })
          .state('tab.favorite-product-detail/:id', {
            url: '/account/favorites/product/:id',
            views: {
              'tab-account': {
                templateUrl: 'modules/product/productDetail/product-detail.html',
                controller: 'ProductDetailCtrl'
              }
            }
          })
          .state('tab.favorite-company-detail/:id', {
            url: '/account/favorites/company/:id',
            views: {
              'tab-account': {
                templateUrl: 'modules/company/companyDetail/company-detail.html',
                controller: 'CompanyDetailCtrl'
              }
            }
          })
          .state('tab.settings', {
            url: '/account/settings',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/settings/settings.html',
                //controller: 'AccountCtrl'
              }
            }
          })
          .state('tab.signup', {
            url: '/account/singup',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/auth/signup.html',
                controller: 'AuthCtrl'
              }
            }
          })
          .state('tab.signup-role', {
            url: '/account/signup-role',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/auth/role.html',
                controller: 'AuthCtrl'
              }
            }
          })
          .state('tab.signup-domain', {
            url: '/account/signup-domain',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/auth/domain.html',
                controller: 'AuthCtrl'
              }
            }
          })
          .state('tab.login', {
            url: '/account/login',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/auth/login.html',
                controller: 'AuthCtrl'
              }
            }
          })
          .state('tab.resetPassword', {
            url: '/account/resetPassword',
            views: {
              'tab-account': {
                templateUrl: 'modules/account/auth/resetPassword/reset-password.html',
                controller: 'RestPasswordCtrl'
              }
            }
          })
      ;

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/tab/home');



    });