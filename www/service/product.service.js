/**
 * Created by vicky on 2015/8/7.
 */
(function () {
    'use strict';

    angular
        .module('nuclearApp.services')
        .factory('Product', Product);

    function Product($http, BACK_END) {
        console.log(BACK_END.baseUrl);
        var baseUrl = BACK_END.baseUrl;
        var userChooseFirstLevelCategory;
        var detailTabInfo;
        return {
            search: function (queryString) {
                return $http.get(baseUrl + 'products/search', {params:queryString})
                    .then(function (res) {
                        console.log(res.data);
                        return res.data.data;
                    })
            },
            countByName: function (queryString) {
                return $http.get(baseUrl + 'products/count', {params:queryString})
                    .then(function (res) {
                        console.log(res.data);
                        return res.data.data;
                    })
            },
            getCategories: function (queryString) {
                return $http.get(baseUrl + 'categories', {params:queryString})
                    .then(function (res) {
                        console.log(res.data);
                        return res.data.data;
                    })
            },
            getProductsByCategoryId: function (
                categoryId, hasServiceHistory, authGroup, brandType, from, size) {
                var params = {
                    type: 2,
                    categoryId: categoryId,
                    hasServiceHistory: +hasServiceHistory,
                    authGroup: authGroup,
                    brandType: brandType,
                    from: from,
                    size: size
                };
                if (params.authGroup === null){
                    delete params.authGroup;
                }
                if (params.brandType === null){
                    delete params.brandType;
                }
                if (params.hasServiceHistory === false){
                    delete params.hasServiceHistory;
                }
                console.log(params);
                return $http.get(baseUrl + 'search',
                    {params: params})
                    .then(function (res) {
                        console.log(res.data);
                        return res.data.data;
                    })
            },
            getProductsById: function (id,queryString) {
                return $http.get(baseUrl + 'products/' + id,
                    {params:queryString})
                    .then(function (res) {
                        console.log(res.data);
                        return res.data.data;
                    })
            },
            setUserChooseFirstLevelCategory: function (id) {
                userChooseFirstLevelCategory = id;
                console.log(userChooseFirstLevelCategory);
            },
            getUserChooseFirstLevelCategory: function () {
                return userChooseFirstLevelCategory;
            },
            setDetailTabInfo: function (info) {
                detailTabInfo = info;
                console.log(detailTabInfo);
            },
            getDetailTabInfo: function () {
                return detailTabInfo;
            },
            addProductFavorite: function (favoriteId) {
                return $http.post(baseUrl + 'favorites',
                    {
                        type: 1,
                        favoriteId: favoriteId
                    })
                    .then(function (res) {
                        console.log(res.data);
                        return res.data.ret;
                    })
            },
            getProductFavorites: function (queryString) {
                return $http.get(baseUrl + 'favorites/type/1',
                    {params:queryString})
                    .then(function (res) {
                        console.log(res.data);
                        return res.data.data;
                    })
            }





        }
    }
})();
