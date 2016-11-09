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
        .controller('IntegrationController', IntegrationController);

    IntegrationController.$inject = [
        '$scope',
        '$state',
        'horizon.dashboard.oasisdash.endpoint.endpointModel',
        'horizon.app.core.openstack-service-api.oasisdash'
    ];

    function IntegrationController($scope, $state, integrationModel, oasis) {
        var ctrl = this;

        $scope.function_method = [{unit: "get", label: "GET"},
            {unit: "post", label: "POST"},
            {unit: "put", label: "PUT"},
            {unit: "patch", label: "PATCH"},
            {unit: "delete", label: "DELETE"}];
        //$scope.selectMethods = [];
        $scope.selectMethod = selectMethod;
        $scope.showSetting = showSetting;
        $scope.removeHttpApi = removeHttpApi;

        var deleteIndex;

        init();

        function init() {
            $scope.integrationModel = integrationModel;
            //if ($state.current.data && !isEmpty($state.current.data)) {
            //    $scope.integrationModel = $state.current.data;
            //    if ( $state.current.data.method != null ){
            //        var method = $state.current.data.method;
            //        var index = $state.current.data.index;
            //        $state.go('endpoint', {param:method, index:index});
            //    }
            //} else {
            //    $scope.integrationModel = integrationModel;
            //}
            //$state.current.data = $scope.integrationModel;

            if ( $scope.model.endpoint.id != null ) {
                oasis.getHttpApi($scope.model.endpoint.id).success(onGetHttpApiSuccess);
            }
        }

        function onGetHttpApiSuccess(response) {
            console.log('onGetHttpApiSuccess');
            console.log(response.items);
            for (var i in response.items) {
                var methodInfo = new Object();
                methodInfo.id = response.items[i].id;
                methodInfo.method = response.items[i].method;
                $scope.integrationModel.httpapi.push(methodInfo);
            }
        }

        function selectMethod(method) {
            integrationModel.newHttpApi.method = method.label;
            integrationModel.newHttpApi.endpoint_id = integrationModel.endpoint.id;
            integrationModel.createHttpApi().success(onCreateHttpApiSuccess);
        }

        function onCreateHttpApiSuccess(response) {
            var newHttpApi = new Object();
            newHttpApi.id = response.id;
            newHttpApi.method = response.method;
            integrationModel.httpapi.push(newHttpApi);

            integrationModel.newRequest.http_api_id = response.id;
            integrationModel.newResponse.http_api_id = response.id;
            integrationModel.createRequest().success(onCreateRequestSuccess);
            integrationModel.createResponse().success(onCreateResponseSuccess);
        }

        function onCreateRequestSuccess(response) {
            integrationModel.newRequest.request_id = response.id;
        }

         function onCreateResponseSuccess(response) {
            integrationModel.newResponse.response_id = response.id;
        }

        function showSetting(method, index) {
            if ($scope.integrationModel.method!=null )
                $scope.integrationModel.method = method;
            $state.current.data.index = index;
            $state.go('endpoint', {'index':index, 'param':method});
        }

        function removeHttpApi(index) {
            deleteIndex = index;
            var id = integrationModel.httpapi[index].id;
            oasis.deleteHttpApi(id, true).success(onDeleteHttpApiSuccess);
        }

        function onDeleteHttpApiSuccess(response) {
            console.log('delete success')
            integrationModel.httpapi.splice(deleteIndex,1);
        }
    }


    var hasOwnProperty = Object.prototype.hasOwnProperty;

    function isEmpty(obj) {

        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length && obj.length > 0)    return false;
        if (obj.length === 0)  return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and toValue enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    }
})();
