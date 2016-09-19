//(function () {
//    'use strict';
//
//    angular
//        .module('horizon.dashboard.oasisdash', [
//            'horizon.dashboard.oasisdash.function',
//            'horizon.dashboard.oasisdash.endpoint',
//            'ngRoute',
//        ])
//        .config(config);
//
//    config.$inject = ['$provide', '$windowProvider', '$routeProvider', '$locationProvider'];
//    function config($provide, $windowProvider, $routeProvider, $locationProvider) {
//        var path = $windowProvider.$get().STATIC_URL + 'oasisdash/oasis/';
//        $provide.constant('horizon.dashboard.oasisdash.basePath', path);
//
//        $routeProvider
//            .when('/oasisdash/function', {
//                templateUrl: path + 'function/table/table.html'
//            })
//            .when('/oasisdash/function/:functionId', {
//                templateUrl: path + 'function/detail/detail.html'
//            })
//            .when('/oasisdash/endpoint/:endpointId', {
//                templateUrl: path + 'endpoint/detail/'
//            })
//            .when('/oasisdash/endpoint/create', {
//                templateUrl: path + 'endpoint/create/api/create.html'
//            });
//    }
//})();


(function () {
    'use strict';

    angular
        .module('horizon.dashboard.oasisdash', [
            'horizon.dashboard.oasisdash.function',
            'horizon.dashboard.oasisdash.endpoint',
            'ui.router',
            'ui.router.tabs'
        ])
        .config(config);

    config.$inject = ['$provide', '$windowProvider', '$stateProvider', '$urlRouterProvider'];
    function config($provide, $windowProvider, $stateProvider, $urlRouterProvider) {
        var path = $windowProvider.$get().STATIC_URL + 'oasisdash/oasis/';
        $provide.constant('horizon.dashboard.oasisdash.basePath', path);
        var baseRoute = '/oasisdash/function/';
        $provide.constant('horizon.dashboard.oasisdash.baseRoute', baseRoute);

        $stateProvider
            .state('function', {
                url: baseRoute,
                templateUrl: path + 'function/table/table.html'
            })
            .state('edit',{
                url:baseRoute+'edit',
                controller: 'EditFunctionController',
                templateUrl: path+'function/edit/edit.html'
            })
            .state('edit.code',{
                url:baseRoute+'create/code',
                templateUrl: path+'function/edit/code/code.html'
            })
            .state('edit.integration',{
                url:baseRoute+'create/integration',
                templateUrl: path+'function/edit/integration/integration.html'
            })
            .state('edit.monitor',{
                url:baseRoute+'create/monitor',
                templateUrl: path+'function/edit/monitor/monitor.html'
            })
    }
})();