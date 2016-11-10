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
            getNodePools: getNodePools,

            createFunction: createFunction,
            getFunction: getFunction,
            getFunctions: getFunctions,
            updateFunction: updateFunction,
            deleteFunction: deleteFunction,

            createEndpoint: createEndpoint,
            getEndpoint: getEndpoint,
            getEndpoints: getEndpoints,
            deleteEndpoint: deleteEndpoint,
            updateEndpoint: updateEndpoint,

            createHttpApi: createHttpApi,
            getHttpApis: getHttpApis,
            getHttpApi: getHttpApi,
            deleteHttpApi: deleteHttpApi,

            createRequest: createRequest,
            getRequest: getRequest,
            deleteRequest: deleteRequest,

            createRequestHeader: createRequestHeader,
            getRequestHeaders: getRequestHeaders,
            deleteRequestHeader: deleteRequestHeader,

            createResponse: createResponse,
            createResponseCode: createResponseCode,
            createResponseMessage: createResponseMessage,
            getResponseCodes: getResponseCodes,
            getResponseMessages: getResponseMessages
        };

        return service;

        function getNodePools() {
            return apiService.get('/api/oasis/nodepools/')
                .error(function () {
                    toastService.add('error', gettext('Unable to retrieve NodePool Policies.'));
                });
        }

        /////////////////Functions APIs//////////////////////
        function createFunction(params) {
            return apiService.post('/api/oasis/functions/', params)
                .error(function () {
                    toastService.add('error', gettext('Unable to create Function.'));
                });
        }

        function getFunction(id) {
            return apiService.get('/api/oasis/function/' + id)
                .error(function () {
                    toastService.add('error', gettext('Unable to retrieve the Function.'));
                });
        }

        function deleteFunction(id, suppressError) {
            var promise = apiService.delete('/api/oasis/function/' + id);
            return suppressError ? promise : promise.error(function () {
                var msg = gettext('Unable to delete the Function with id: %(id)s');
                toastService.add('error', interpolate(msg, {id: id}, true));
            });
        }

        function updateFunction(id, params) {
            return apiService.patch('/api/oasis/function/' + id, params)
                .error(function () {
                    toastService.add('error', gettext('Unable to update the Function.'));
                });
        }

        function getFunctions() {
            return apiService.get('/api/oasis/functions/')
                .error(function () {
                    toastService.add('error', gettext('Unable to retrieve Function.'));
                });
        }

        /////////////////EndPoints APIs//////////////////////
        function createEndpoint(params) {
            return apiService.post('/api/oasis/endpoints/', params)
                .error(function () {
                    toastService.add('error', gettext('Unable to create Endpoint.'));
                });
        }

        function getEndpoint(id) {
            return apiService.get('/api/oasis/endpoint/' + id)
                .error(function () {
                    toastService.add('error', gettext('Unable to retrieve the Endpoint.'));
                });
        }

        function getEndpoints() {
            return apiService.get('/api/oasis/endpoints/')
                .error(function () {
                    toastService.add('error', gettext('Unable to retrieve Endpoints.'));
                });
        }

        function deleteEndpoint(id, suppressError) {
            var promise = apiService.delete('/api/oasis/endpoint/' + id);
            return suppressError ? promise : promise.error(function () {
                var msg = gettext('Unable to delete the Endpoint with id: %(id)s');
                toastService.add('error', interpolate(msg, {id: id}, true));
            });
        }

        function updateEndpoint(id, params) {
            return apiService.patch('/api/oasis/endpoint/' + id, params)
                .error(function () {
                    toastService.add('error', gettext('Unable to update the Endpoint.'));
                });
        }

        /////////////////HttpApis APIs//////////////////////
        function createHttpApi(params) {
            return apiService.post('/api/oasis/httpapis/', params)
                .error(function () {
                    toastService.add('error', gettext('Unable to create HttpApi.'));
                });
        }

        function getHttpApi(id) {
            return apiService.get('/api/oasis/httpapi/' + id)
                .error(function () {
                    toastService.add('error', gettext('Unable to retrieve the HttpApi.'));
                });
        }

        function deleteHttpApi(id, suppressError) {
            var promise = apiService.delete('/api/oasis/httpapi/' + id);
            return suppressError ? promise : promise.error(function () {
                var msg = gettext('Unable to delete the HttpApi with id: %(id)s');
                toastService.add('error', interpolate(msg, {id: id}, true));
            });
        }

        function getHttpApis() {
            return apiService.get('/api/oasis/httpapis/')
                .error(function () {
                    toastService.add('error', gettext('Unable to retrieve HttpApis.'));
                });
        }

        ///////////Requests APIs//////////////
        function createRequest(params) {
            return apiService.post('/api/oasis/requests/', params)
                .error(function () {
                    toastService.add('error', gettext('Unable to create Request.'));
                });
        }

        function getRequest(httpApiId) {
            return apiService.get('/api/oasis/request/' + httpApiId)
                .error(function () {
                    toastService.add('error', gettext('Unable to retrieve Request.'));
                });
        }

        function deleteRequest(httpApiId, suppressError) {
            var promise = apiService.delete('/api/oasis/request/' + httpApiId);
            return suppressError ? promise : promise.error(function () {
                var msg = gettext('Unable to delete the Request with id: %(id)s');
                toastService.add('error', interpolate(msg, {id: id}, true));
            });
        }

        function createRequestHeader(params) {
            return apiService.post('/api/oasis/requestheader/', params)
                .error(function () {
                    toastService.add('error', gettext('Unable to create RequestHeader.'));
                });
        }

        function getRequestHeaders(requestId) {
            return apiService.get('/api/oasis/requestheaders/' + requestId)
                .error(function () {
                    toastService.add('error', gettext('Unable to retrieve RequestHeaders.'));
                });
        }

        function deleteRequestHeader(id, suppressError) {
            var promise = apiService.delete('/api/oasis/requestheaders/' + id);
            return suppressError ? promise : promise.error(function () {
                var msg = gettext('Unable to delete the RequestHeader with id: %(id)s');
                toastService.add('error', interpolate(msg, {id: id}, true));
            });
        }

        /////////////////Responses APIs////////////
        function getResponseCodes() {
            return apiService.get('/api/oasis/responsecodes/')
                .error(function () {
                    toastService.add('error', gettext('Unable to retrieve ResponseCodes.'));
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
                .error(function () {
                    toastService.add('error', gettext('Unable to retrieve ResponseMessages.'));
                });
        }

    };
})();