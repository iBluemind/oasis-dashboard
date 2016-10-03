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
        .module('horizon.dashboard.oasisdash.function')
        .controller('IntegrationController', IntegrationController);

    IntegrationController.$inject = [
        '$scope',
        '$state',
        'horizon.dashboard.oasisdash.endpoint.endpointModel',
    ];

    function IntegrationController($scope, $state, integrationModel) {
        var ctrl = this;

        $scope.function_method = [{unit: "get", label: "GET"},
            {unit: "post", label: "POST"},
            {unit: "put", label: "PUT"},
            {unit: "patch", label: "PATCH"},
            {unit: "delete", label: "DELETE"}];
        //$scope.selectMethods = [];
        $scope.selectMethod = selectMethod;
        $scope.showSetting = showSetting;

        init();

        function init() {
            //$scope.integrationModel = integrationModel;
            if ($state.current.data && !isEmpty($state.current.data)) {
                $scope.integrationModel = $state.current.data;
                if ( $state.current.data.method != null ){
                    var method = $state.current.data.method;
                    var index = $state.current.data.index;
                    $state.go('endpoint', {param:method, index:index});
                }
            } else {
                $scope.integrationModel = integrationModel;
            }
            $state.current.data = $scope.integrationModel;
        }

        function selectMethod(method) {
            var index = $scope.integrationModel.newFunctionSpec.length;
            var methodInfo = new Object();
            methodInfo.id = index;
            methodInfo.method = method.label;
            methodInfo.request = [];
            methodInfo.responses = [];
            methodInfo.resCodes = [];
            $scope.integrationModel.newFunctionSpec.push(methodInfo);
        }

        function showSetting(method, index) {
            if ($scope.integrationModel.method!=null )
                $scope.integrationModel.method = method;
            $state.current.data.index = index;
            $state.go('endpoint', {'index':index, 'param':method});
        }
    }


    var hasOwnProperty = Object.prototype.hasOwnProperty;

    function isEmpty(obj) {

        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length && obj.length > 0)    return false;
        if (obj.length === 0)  return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and toValue enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    }
})();
