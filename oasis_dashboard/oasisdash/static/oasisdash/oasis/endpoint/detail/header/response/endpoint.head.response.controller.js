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
        .controller('EndpointResponseController', EndpointResponseController);

    EndpointResponseController.$inject = [
        '$q',
        '$scope',
        'horizon.dashboard.oasisdash.basePath',
        'horizon.app.core.openstack-service-api.oasisdash'
    ];

    function EndpointResponseController($q, $scope, basePath, oasis) {
        var ctrl = this;
        ctrl.api = [];

        init();

        function init() {
            var items = [
                {
                    unit: 'endpoint1',
                    label: 'endpoint1'
                },
                {
                    unit: 'endpoint2',
                    label: 'endpoint2'
                }
            ]
            ctrl.api = items;

            ctrl.endpoint_method = [{unit: "get", label: gettext("GET")},
                {unit: "post", label: gettext("POST")},
                {unit: "patch", label: gettext("PATCH")},
                {unit: "delete", label: gettext("DELETE")}];

            //keystone.getCurrentUserSession().success(getSessionSuccess);
        }

        function getSessionSuccess(response) {
            var user = response.available_services_regions;
            for (var i in user) {
                var item = {
                    unit: user[i],
                    label: gettext(user[i])
                }

                ctrl.region.push(item)
            }
            if ($scope.selected instanceof Object) {
                //$scope.model.newFunctionSpec.select_region = $scope.selected.services_region;
                //$scope.changeBaymodel();
            }
        }
    }
})();