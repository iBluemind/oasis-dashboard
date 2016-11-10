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
            //$scope.integrationModel = integrationModel;
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
            for (var i in response.items) {
                var methodInfo = new Object();
                methodInfo.id = response.items[i].id;
                methodInfo.method = response.items[i].method;
                methodInfo.endpoint_id = response.items[i].endpoint_id;
                $scope.model.httpapi.push(methodInfo);
                removeHttpApiInSelect(response.items[i].method);
            }
        }

        function selectMethod(method) {
            $scope.model.newHttpApi.method = method.label;
            $scope.model.newHttpApi.endpoint_id = integrationModel.endpoint.id;
            $scope.model.createHttpApi().success(onCreateHttpApiSuccess);
        }

        function onCreateHttpApiSuccess(response) {
            var newHttpApi = new Object();
            newHttpApi.id = response.id;
            newHttpApi.method = response.method;
            $scope.model.httpapi.push(newHttpApi);
            $scope.model.newRequest.http_api_id = response.id;
            $scope.model.newResponse.http_api_id = response.id;
            $scope.model.createRequest().success(onCreateRequestSuccess);
            $scope.model.createResponse().success(onCreateResponseSuccess);

            removeHttpApiInSelect(response.method);
        }

        function removeHttpApiInSelect(method) {
            if ( method == 'GET' )
                $scope.function_method.splice(0,1);
            else if ( method == 'POST')
                $scope.function_method.splice(1,1);
            else if ( method == 'PUT')
                $scope.function_method.splice(2,1);
            else if ( method == 'PATCH')
                $scope.function_method.splice(3,1);
            else if ( method == 'DELETE')
                $scope.function_method.splice(4,1);
        }

        function onCreateRequestSuccess(response) {
            $scope.model.newRequest.request_id = response.id;
        }

         function onCreateResponseSuccess(response) {
            $scope.model.newResponse.response_id = response.id;
        }

        function showSetting(method, index) {
            console.log('index');
            console.log(index);
            //if ($scope.integrationModel.method!=null ) {
            //$scope.method = method;
            //$scope.endpoint_id = $scope.integrationModel.httpapi[index].endpoint_id
            //}

            //$state.current.data.index = index;
            //$state.go('endpoint', {'index':index, 'param':method});
            $state.go('endpoint', {'httpApiId':$scope.model.httpapi[index].id});
            //$state.go('endpoint');
        }

        function removeHttpApi(index) {
            deleteIndex = index;
            var id = $scope.model.httpapi[index].id;
            oasis.deleteHttpApi(id, true).success(onDeleteHttpApiSuccess);
        }

        function onDeleteHttpApiSuccess(response) {
            console.log('delete success')
            $scope.model.httpapi.splice(deleteIndex,1);
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
