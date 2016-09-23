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
            'ui.bootstrap',
        ])
        .config(config)

    config.$inject = ['$provide', '$windowProvider', '$stateProvider', '$urlRouterProvider'];
    function config($provide, $windowProvider, $stateProvider, $urlRouterProvider) {
        var path = $windowProvider.$get().STATIC_URL + 'oasisdash/oasis/';
        $provide.constant('horizon.dashboard.oasisdash.basePath', path);
        var baseRoute = '/oasisdash/function/';
        $provide.constant('horizon.dashboard.oasisdash.baseRoute', baseRoute);

        $urlRouterProvider.otherwise(baseRoute);
        $urlRouterProvider.when(baseRoute+'edit',baseRoute+'edit/code');

        $stateProvider
            .state('function', {
                url: baseRoute,
                controller : 'FunctionTableController',
                templateUrl: path + 'function/table/table.html'
            })
            .state('edit',{
                url:baseRoute+'edit',
                controller: 'TabsController',
                templateUrl: path+'function/edit/edit.html'
            })
            .state('edit.code',{
                url:'/code',
                templateUrl: path+'function/edit/code/code.html',
                controller : 'CreateFunctionInputController',
                data : {

                }
            })
            .state('edit.integration',{
                url:'/integration',
                controller: 'IntegrationController',
                templateUrl: path+'function/edit/integration/integration.html',
            })
            .state('edit.integration.setting', {
                url:'/integration/:param',
                controller:'IntegrationSettingController',
                templateUrl: path+'function/edit/integration/setting/integration.setting.html',
            })
            .state('edit.monitor',{
                url:'/monitor',
                templateUrl: path+'function/edit/monitor/monitor.html',
                controller: 'MonitorController',
                data : {

                }
            })
    }
})();