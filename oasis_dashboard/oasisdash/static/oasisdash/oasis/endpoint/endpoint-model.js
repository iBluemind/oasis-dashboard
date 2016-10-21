(function () {
    'use strict';

    angular
        .module('horizon.dashboard.oasisdash.endpoint')
        .factory('horizon.dashboard.oasisdash.endpoint.endpointModel', endpointModel);

    endpointModel.$inject = [
        'horizon.app.core.openstack-service-api.oasisdash'
    ];

    function endpointModel(oasis) {
        var endpointModel = {
            endpoint: {
                name: null,
                desc: null,
                url: null
            },
            createEndpoint: createEndpoint
        };

        function createEndpoint() {
            var finalSpec = angular.copy(endpointModel.endpoint);

            //cleanNullProperties(finalSpec);

            return oasis.createEndpoint(finalSpec);
        }

        function cleanNullProperties(finalSpec) {
            // Initially clean fields that don't have any value.
            for (var key in finalSpec) {
                if (finalSpec.hasOwnProperty(key) && finalSpec[key] === null) {
                    delete finalSpec[key];
                }
            }
        }

        return endpointModel;

    }
})();