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
        '$stateParams',
        'horizon.dashboard.oasisdash.basePath',
        'horizon.app.core.openstack-service-api.oasisdash',
        'horizon.dashboard.oasisdash.function.functionModel',
    ];

    function IntegrationSettingController($scope, $stateParams, basePath, oasis, model) {
        var ctrl = this;
        var method = $stateParams.param;
        $scope.method = method;
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

        function addHeader() {
            var index = $scope.request.length+1;
            $scope.request.push({'id': index});
            console.log($scope.request);
        }

        function removeHeader() {
            var lastItem = $scope.request.length-1;
            $scope.request.splice(lastItem);
        }

        function addResCode() {
            var index = $scope.resCodes.length+1;
            $scope.resCodes.push({'id': index});
        }

        function removeResCode() {
            var lastItem = $scope.resCodes.length-1;
            $scope.resCodes.splice(lastItem);
        }

        function addResponse() {
            var index = $scope.responses.length+1;
            $scope.responses.push({'id': index});

        }
    }
})();
