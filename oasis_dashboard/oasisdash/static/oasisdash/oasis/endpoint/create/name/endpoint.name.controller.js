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
        .controller('EndpointNameController', EndpointNameController);

    EndpointNameController.$inject = [
        '$q',
        '$scope',
        '$state',
        'horizon.dashboard.oasisdash.endpoint.endpointModel',
    ];

    function EndpointNameController($q, $scope, $state, integrationModel) {
        var ctrl = this;

        init();

        function init() {

            if ($state.current.data && !isEmpty($state.current.data)) {
                $scope.integrationModel = $state.current.data;
            } else {
                $scope.integrationModel = integrationModel;
            }
            $state.current.data = $scope.integrationModel;
        }

    }
})();