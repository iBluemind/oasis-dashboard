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
        'horizon.dashboard.oasisdash.basePath',
        'horizon.app.core.openstack-service-api.oasisdash'
    ];

    function EndpointNameController($q, $scope, basePath, oasis) {
        var ctrl = this;
        ctrl.api = [];
        ctrl.description = "";

        init();

        function init() {
            var items = [
                {
                    unit : 'sum',
                    label : 'sum'
                },
                {
                    unit : 'minus',
                    label : 'minus'
                }
            ]
            ctrl.api = items;
        }

    }
})();