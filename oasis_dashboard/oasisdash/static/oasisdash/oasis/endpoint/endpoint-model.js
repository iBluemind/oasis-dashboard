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
                id: null,
                name: null,
                desc: null,
                url: null
            },
            httpapi: [],
            request: {},
            requestHeader: {},
            response: {},
            responseCode: {},
            responseMessage: {},
            newHttpApi: {},
            newRequest: {},
            newResponse: {},
            createEndpoint: createEndpoint,
            createHttpApi: createHttpApi,
            createRequest: createRequest,
            createResponse: createResponse,
            createResponseCode: createResponseCode,
            createResponseMessage: createResponseMessage,
            createRequestHeader: createRequestHeader,
            init: init,
            requestHeaderInit: requestHeaderInit
        };

        function init() {
            endpointModel.request = {}
            endpointModel.requestHeader = {}
            endpointModel.response = {}
            endpointModel.responseCode = {}
            endpointModel.responseMessage = {}
            //endpointModel.newHttpApi = {}
            //endpointModel.newRequest = {}
            //endpointModel.newResponse = {}
            endpointModel.httpapi = []
        }

        function requestHeaderInit() {
            endpointModel.request = {}
            endpointModel.requestHeader = {}
            endpointModel.newRequest = {}
            endpointModel.newResponse = {}
        }

        function createEndpoint() {
            var finalSpec = angular.copy(endpointModel.endpoint);
            cleanNullProperties(finalSpec)
            return oasis.createEndpoint(finalSpec);
        }

        function createHttpApi() {
            var finalSpec = angular.copy(endpointModel.newHttpApi);
            return oasis.createHttpApi(finalSpec);
        }

        function createRequest() {
            var finalSpec = angular.copy(endpointModel.newRequest);
            return oasis.createRequest(finalSpec);
        }

        function createResponse() {
            var finalSpec = angular.copy(endpointModel.newResponse);
            return oasis.createResponse(finalSpec);
        }

        function createResponseCode() {
            var finalSpec = angular.copy(endpointModel.responseCode);
            return oasis.createResponseCode(finalSpec);
        }

        function createRequestHeader() {
            var finalSpec = angular.copy(endpointModel.requestHeader);
            return oasis.createRequestHeader(finalSpec);
        }

        function createResponseMessage() {
            var finalSpec = angular.copy(endpointModel.responseMessage);
            return oasis.createResponseMessage(finalSpec);
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