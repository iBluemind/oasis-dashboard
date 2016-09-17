(function () {
    'use strict';

    angular
        .module('horizon.dashboard.oasisdash.endpoint')
        .factory('horizon.dashboard.oasisdash.endpoint.endpointModel', endpointModel);

    endpointModel.$inject = [
        'horizon.app.core.openstack-service-api.oasisdash'
    ];

    function endpointModel(oasis) {
        var model = {
            newFunctionSpec: {},

            // API methods
            init: init,
            createFunction: createFunction
        };

        function initNewFunctionSpec() {
            model.newFunctionSpec = {
                name: null,
                method: 'get',
                description: null,
            };
        }

        function init() {
            // Reset the new Bay spec
            initNewFunctionSpec();
        }

        function createFunction() {
            var finalSpec = angular.copy(model.newFunctionSpec);

            cleanNullProperties(finalSpec);

            return oasis.createFunction(finalSpec);
        }

        function cleanNullProperties(finalSpec) {
            // Initially clean fields that don't have any value.
            for (var key in finalSpec) {
                if (finalSpec.hasOwnProperty(key) && finalSpec[key] === null) {
                    delete finalSpec[key];
                }
            }
        }

        return model;
    }
})
();