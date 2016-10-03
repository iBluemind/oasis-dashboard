(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name createBayInfoController
     * @ngController
     *
     * @description
     * Controller for the containers bay info step in create workflow
     */
    angular
        .module('horizon.dashboard.oasisdash.endpoint')
        .controller('EndpointSettingController', EndpointSettingController);

    EndpointSettingController.$inject = [
        '$q',
        '$scope',
        '$state',
        'horizon.dashboard.oasisdash.basePath',
        'horizon.app.core.openstack-service-api.oasisdash',
        '$compile'
    ];

    function EndpointSettingController($q, $scope, $state, basePath, oasis, $compile) {
        var ctrl = this;

        ctrl.function_method = [{unit: "get", label: "GET"},
            {unit: "post", label: "POST"},
            {unit: "put", label: "PUT"},
            {unit: "patch", label: "PATCH"},
            {unit: "delete", label: "DELETE"}];
        //$scope.selectMethods = [];
        ctrl.selectMethod = selectMethod;
        ctrl.showSetting = showSetting;
        ctrl.methods = [];

        init();

        function init() {
            //if ($state.current.data && !isEmpty($state.current.data)) {
            //    $scope.integrationModel = $state.current.data;
            //    if ( $state.current.data.method != null ){
            //        //var method = $scope.integrationModel.method;
            //        var method = $state.current.data.method;
            //        var index = $state.current.data.index;
            //        //console.log('init()' + $state.current.data);
            //        $state.go('edit.integration.setting', {param:method, index:index});
            //    }
            //} else {
            //    $scope.integrationModel = integrationModel;
            //}
            //$state.current.data = $scope.integrationModel;
        }

        function selectMethod(method) {
            //$scope.integrationModel.newFunctionSpec.method = [];
            var index = ctrl.methods.length;
            var methodArray = new Array();
            var methodInfo = new Object();
            methodInfo.id = index;
            methodInfo.method = method.label;
            methodInfo.request = [];
            methodInfo.responses = [];
            methodInfo.resCodes = [];
            //methodArray.push(methodInfo);
            ctrl.methods.push(methodInfo);
            //$scope.integrationModel.newFunctionSpec[method.label] = methodArray;
            console.log(ctrl.methods);
        }

        function showSetting(method, index) {
            //if ($scope.integrationModel.method!=null )
            //    $scope.integrationModel.method = method;
            //$state.current.data.index = index;
            $state.go('endpoint', {'index':index, 'param':method});
        }

    }
})();