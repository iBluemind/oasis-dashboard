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
        '$stateParams',
        'horizon.dashboard.oasisdash.basePath',
        'horizon.app.core.openstack-service-api.oasisdash',
        'horizon.dashboard.oasisdash.function.functionModel',
    ];

    function IntegrationController($scope, $stateparams, basePath, oasis, model) {
        var ctrl = this;

        $scope.function_method = [{unit: "get", label: "GET"},
            {unit: "post", label: "POST"},
            {unit: "put", label: "PUT"},
            {unit: "patch", label: "PATCH"},
            {unit: "delete", label: "DELETE"}];
        $scope.selectMethods = [];
        $scope.text = "asdf";
        $scope.selectMethod = selectMethod;
        $scope.removeFunction = removeFunction;

        function selectMethod(method) {
            $scope.selectMethods.push(method.label);
        }

        function removeFunction(item) {
            //console.log(item);
            //var index = $scope.selectMethods.indexOf(item)
            //$scope.selectMethods.splice(index, 1);

            var lastItem = $scope.selectMethods.length-1;
            $scope.resCode.splice(lastItem);

        }
    }
})();
