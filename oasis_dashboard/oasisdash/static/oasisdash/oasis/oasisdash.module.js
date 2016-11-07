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

        var baseRoute = '/oasisdash/';
        $provide.constant('horizon.dashboard.oasisdash.baseRoute', baseRoute);

        $urlRouterProvider.otherwise(baseRoute + 'function/');
        $urlRouterProvider.when(baseRoute+'function/edit',baseRoute+'function/edit/code');

        $stateProvider
            .state('function', {
                url: baseRoute+'function/',
                controller : 'FunctionTableController',
                templateUrl: path + 'function/table/table.html'
            })
            .state('edit',{
                url:baseRoute+'function/edit',
                controller: 'TabsController',
                templateUrl: path+'function/edit/edit.html',
            })
            .state('edit.code',{
                url:'/code',
                templateUrl: path+'function/edit/code/code.html',
                controller : 'CreateFunctionInputController',
                params: {'functionId': -1},
                data : {

                }
            })
            .state('edit.monitor',{
                url:'/monitor',
                templateUrl: path+'function/edit/monitor/monitor.html',
                controller: 'MonitorController',
                data : {

                }
            })
            .state('endpoint', {
                url: baseRoute + 'endpoint',
                params: {'index': 0, 'endpointId': -1},
                templateUrl: path + 'endpoint/create/method/setting/method.setting.html',
                data: {}
            })
    }
})();