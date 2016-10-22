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
            createHttpApi: createHttpApi,
            createRequest: createRequest,
            createRequestHeader: createRequestHeader,
            createResponse: createResponse,
            createResponseCode: createResponseCode,
            createResponseMessage: createResponseMessage,
            getEndpoint : getEndpoint,
            getEndpoints : getEndpoints,
            getRequestHeaders: getRequestHeaders,
            getHttpApis: getHttpApis,
            getResponseCodes: getResponseCodes,
            getResponseMessages: getResponseMessages
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

        function createHttpApi(params) {
            return apiService.post('/api/oasis/httpapis/', params)
                .error(function () {
                    toastService.add('error', gettext('Unable to create HttpApi.'));
                });
        }

        function createRequest(params) {
            return apiService.post('/api/oasis/requests/', params)
                .error(function () {
                    toastService.add('error', gettext('Unable to create Request.'));
                });
        }

        function createRequestHeader(params) {
            return apiService.post('/api/oasis/requestheaders/', params)
                .error(function () {
                    toastService.add('error', gettext('Unable to create RequestHeader.'));
                });
        }

        function createResponse(params) {
            return apiService.post('/api/oasis/responses/', params)
                .error(function () {
                    toastService.add('error', gettext('Unable to create Response.'));
                });
        }

        function createResponseCode(params) {
            return apiService.post('/api/oasis/responsecodes/', params)
                .error(function () {
                    toastService.add('error', gettext('Unable to create ResponseCode.'));
                });
        }

        function createResponseMessage(params) {
            return apiService.post('/api/oasis/responsemessages/', params)
                .error(function () {
                    toastService.add('error', gettext('Unable to create ResponseMessage.'));
                });

        }

        function getResponseMessages() {
           return apiService.get('/api/oasis/responsemessages/')
                .error(function() {
                    toastService.add('error', gettext('Unable to retrieve ResponseMessages.'));
                });
        }

        function getRequestHeaders() {
           return apiService.get('/api/oasis/requestheaders/')
                .error(function() {
                    toastService.add('error', gettext('Unable to retrieve RequestHeaders.'));
                });
        }

        function getHttpApis() {
            return apiService.get('/api/oasis/httpapis/')
                .error(function() {
                    toastService.add('error', gettext('Unable to retrieve HttpApis.'));
                });
        }

        function getResponseCodes() {
           return apiService.get('/api/oasis/responsecodes/')
                .error(function() {
                    toastService.add('error', gettext('Unable to retrieve ResponseCodes.'));
                });
        }
    };
})();