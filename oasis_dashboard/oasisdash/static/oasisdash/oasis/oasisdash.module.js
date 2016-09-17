(function () {
    'use strict';

    angular
        .module('horizon.dashboard.oasisdash', [
            'horizon.dashboard.oasisdash.function',
            'horizon.dashboard.oasisdash.endpoint',
            'ngRoute',
        ])
        .config(config);

    config.$inject = ['$provide', '$windowProvider', '$routeProvider', '$locationProvider'];
    function config($provide, $windowProvider, $routeProvider, $locationProvider) {
        var path = $windowProvider.$get().STATIC_URL + 'oasisdash/oasis/';
        $provide.constant('horizon.dashboard.oasisdash.basePath', path);

        $routeProvider
            .when('/project/function', {
                templateUrl: path + 'function/table/table.html'
            })
            .when('/project/function/:functionId', {
                templateUrl: path + 'function/detail/detail.html'
            })
            .when('/project/endpoint/:endpointId', {
                templateUrl: path + 'endpoint/detail/'
            });
    }
})();