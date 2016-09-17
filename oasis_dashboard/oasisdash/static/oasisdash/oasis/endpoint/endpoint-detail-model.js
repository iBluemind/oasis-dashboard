(function () {
    'use strict';

    angular
        .module('horizon.dashboard.oasisdash.endpoint')
        .factory('horizon.dashboard.oasisdash.endpoint.endpointDetailModel', endpointDetailModel);

    endpointDetailModel.$inject = [
        'horizon.app.core.openstack-service-api.oasisdash'
    ];

    function endpointDetailModel(magnum) {
        var model = {
            newEndpointDetailSpec: {},

            // API methods
            init: init,
            createEndpointDetail: createEndpointDetail
        };

        function initNewEndpointDetailSpec() {
            model.newEndpointDetailSpec = {
                name : null,
                method:'get',
                request : null,
                response : null,
                get:null,
                post:null,
                put:null,
                delete:null,
                patch:null
            };
        }

        function init() {
            // Reset the new Bay spec
            initNewEndpointDetailSpec();
        }

        function createEndpointDetail() {
            var finalSpec = angular.copy(model.newEndpointDetailSpec);

            //cleanNullProperties(finalSpec);

            return magnum.createEndpoint(finalSpec);
        }

        return model;
    }
})
();