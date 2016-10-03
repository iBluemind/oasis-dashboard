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
        .controller('IntegrationSettingController', IntegrationSettingController);

    IntegrationSettingController.$inject = [
        '$scope',
        '$state',
        '$stateParams',
        'horizon.dashboard.oasisdash.endpoint.endpointModel',
    ];

    function IntegrationSettingController($scope, $state, $stateParams, integrationModel) {
        var ctrl = this;
        $scope.index = $stateParams.index;
        $scope.method = $stateParams.param;
        $scope.request = [
            {
                'id': 1,
                'name': 'Content-Type',
                'value': 'application/json'
            }
        ];
        $scope.resCodes = [
            {
                'id': 1,
            }
        ];
        $scope.removeHeader = removeHeader;
        $scope.addHeader = addHeader;
        $scope.addResCode = addResCode;
        $scope.removeResCode = removeResCode;
        $scope.addResponse = addResponse;
        $scope.responses = [
            {
                'id':1,
                'selectCode':0,
                'urlRegex':''
            }
        ]

        init();

        function init() {

            if ($state.current.data && !isEmpty($state.current.data)) {
                $scope.integrationModel = $state.current.data;
            } else {
                $scope.integrationModel = integrationModel;
            }
            $state.current.data = $scope.integrationModel;
        }

        function addHeader() {
            var length = $scope.integrationModel.newFunctionSpec[$scope.index].request.length;
            $scope.integrationModel.newFunctionSpec[$scope.index].request.push({'id': length});
            console.log('requests');
            console.log($scope.integrationModel.newFunctionSpec[$scope.index].request);
            integrationModel.endpoint.spec.request = $scope.integrationModel.newFunctionSpec[$scope.index].request;
        }

        function removeHeader() {
            var lastItem = $scope.integrationModel.newFunctionSpec[$scope.index].request.length-1;
            $scope.integrationModel.newFunctionSpec[$scope.index].request.splice(lastItem);
            integrationModel.endpoint.spec.request = $scope.integrationModel.newFunctionSpec[$scope.index].request;
        }

        function addResCode() {
            console.log('res codes');
            var index = $scope.resCodes.length;
            $scope.integrationModel.newFunctionSpec[$scope.index].resCodes.push({'id': index});
            console.log($scope.integrationModel.newFunctionSpec[$scope.index].resCodes);
            integrationModel.endpoint.spec.resCodes = $scope.integrationModel.newFunctionSpec[$scope.index].resCodes;
        }

        function removeResCode() {
            var lastItem = $scope.resCodes.length-1;
            $scope.integrationModel.newFunctionSpec[$scope.index].resCodes.splice(lastItem);
            integrationModel.endpoint.spec.resCodes = $scope.integrationModel.newFunctionSpec[$scope.index].resCodes;
        }

        function addResponse() {
            console.log('responses');
            var index = $scope.responses.length;
            $scope.integrationModel.newFunctionSpec[$scope.index].responses.push({'id': index});
            console.log($scope.integrationModel.newFunctionSpec[$scope.index].responses);
            integrationModel.endpoint.spec.responses = $scope.integrationModel.newFunctionSpec[$scope.index].responses;

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
