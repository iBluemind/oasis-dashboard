(function () {
    'use strict';

    angular
        .module('horizon.app.core.openstack-service-api')
        .factory('horizon.app.core.openstack-service-api.oasisdash', OasisAPI);

    OasisAPI.$inject = [
        'horizon.framework.util.http.service',
        'horizon.framework.widgets.toast.service',
        'horizon.framework.util.i18n.gettext'
    ];

    function OasisAPI(apiService, toastService, gettext) {
        var service = {
            createFunction: createFunction,
            getFunction: getFunction,
            getFunctions: getFunctions,
            createEndpoint  : createEndpoint,
            getEndpoint : getEndpoint,
            getEndpoints : getEndpoints
        };

        return service;

        function createFunction(params) {
            return apiService.post('/api/oasis/functions/', params)
                .error(function () {
                    toastService.add('error', gettext('Unable to create Function.'));
                });
        }

        function getFunction(id) {
          return apiService.get('/api/oasis/function/' + id)
            .error(function() {
              toastService.add('error', gettext('Unable to retrieve the Function.'));
            });
        }

        function getFunctions() {
           return apiService.get('/api/oasis/functions/')
                .error(function() {
                    toastService.add('error', gettext('Unable to retrieve Function.'));
                });
        }

        function createEndpoint(params) {
            return apiService.post('/api/oasis/endpoints/', params)
                .error(function () {
                    toastService.add('error', gettext('Unable to create Endpoint.'));
                });
        }

        function getEndpoint(id) {
          return apiService.get('/api/oasis/endpoint/' + id)
            .error(function() {
              toastService.add('error', gettext('Unable to retrieve the Endpoint.'));
            });
        }

        function getEndpoints() {
           return apiService.get('/api/oasis/endpoints/')
                .error(function() {
                    toastService.add('error', gettext('Unable to retrieve Endpoints.'));
                });
        }


    };
})();