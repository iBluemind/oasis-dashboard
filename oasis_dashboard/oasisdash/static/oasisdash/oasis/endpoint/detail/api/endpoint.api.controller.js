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
        .controller('EndpointAPINameController', EndpointAPINameController);

    EndpointAPINameController.$inject = [
        '$q',
        '$scope',
        'horizon.dashboard.oasisdash.basePath',
        'horizon.app.core.openstack-service-api.oasisdash',
        'horizon.dashboard.oasisdash.endpoint.endpointDetailModel'
    ];

    function EndpointAPINameController($q, $scope, basePath, oasis, model) {
        var ctrl = this;
        //ctrl.api = [];
        console.log($scope.params.name);
        $scope.model.newEndpointDetailSpec.name = $scope.params.name;
        $scope.model.newEndpointDetailSpec.method = 'get';
        ctrl.endpoint_method = [{unit: "get", label: gettext("GET")},
            {unit: "post", label: gettext("POST")},
            {unit: "patch", label: gettext("PATCH")},
            {unit: "delete", label: gettext("DELETE")}];

        init();

        function init() {
            //var items = [
            //    {
            //        unit : 'endpoint1',
            //        label : 'endpoint1'
            //    },
            //    {
            //        unit : 'endpoint2',
            //        label : 'endpoint2'
            //    }
            //]
            //ctrl.api = items;
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