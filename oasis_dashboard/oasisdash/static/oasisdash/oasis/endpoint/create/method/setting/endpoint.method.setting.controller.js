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
        .controller('IntegrationSettingController', IntegrationSettingController);

    IntegrationSettingController.$inject = [
        '$scope',
        '$state',
        '$stateParams',
        'horizon.dashboard.oasisdash.endpoint.endpointModel',
        'horizon.app.core.openstack-service-api.oasisdash'
    ];

    function IntegrationSettingController($scope, $state, $stateParams, integrationModel, oasis) {
        var selectCodeId = null;
        var requestId;
        var deleteIndex;

        var responseId;

        var httpApiId = $stateParams.httpApiId;
        //$scope.method = $stateParams.param;

        $scope.model.headers = [
            {
                'name': null,
                'value': null
            }
        ];
        //$scope.selectCode = selectCode;
        $scope.removeHeader = removeHeader;
        $scope.addHeader = addHeader;

        //$scope.resCodes = [
        //    {
        //        'code':null
        //    }
        //];
        //$scope.addResCode = addResCode;
        //$scope.removeResCode = removeResCode;
        //$scope.addResponseMesage = addResponseMesage;
        //$scope.responseMessages = [
        //    {
        //        'message': null
        //    }
        //]

        init();

        function init() {
            $scope.model.requestHeaderInit();

            console.log('httpApiId : ' + httpApiId);
            requestId = $scope.model.newRequest.request_id;
            console.log('requestId : ' + requestId);

            if ( requestId != null ) {
                oasis.getRequestHeaders(requestId).success(onGetRequestHeadersSuccess);
            } else {
                oasis.getRequest(httpApiId).success(onGetRequestSuccess);
            }

            //responseId = integrationModel.newRequest.response_id;
            //if ($state.current.data && !isEmpty($state.current.data)) {
            //    $scope.integrationModel = $state.current.data;
            //} else {
            //    $scope.integrationModel = integrationModel;
            //}
            //$state.current.data = $scope.integrationModel;
        }

        function onGetRequestSuccess(response) {
            console.log('onGetRequestSuccess')
            console.log(response);
            $scope.model.newRequest.request_id = response.id;
            oasis.getRequestHeaders(response.id).success(onGetRequestHeadersSuccess);
        }

        //function selectCode(select) {
        //    selectCodeId = select.code.id;
        //    console.log('select code');
        //    console.log(select);
        //    console.log(select.code.id);
        //}

        function onGetRequestHeadersSuccess(response) {
            console.log('onGetRequestHeadersSuccess');
            console.log(response);

            for (var i in response.items) {
                var methodInfo = new Object();
                methodInfo.name = response.items[i].name;
                methodInfo.value = response.items[i].value;
                methodInfo.id = response.items[i].id;
                $scope.model.headers.unshift(methodInfo);
            }
        }

        function addHeader() {
            var length = $scope.model.headers.length;
            //$scope.headers.push({'id': length});
            $scope.model.requestHeader.name = $scope.model.headers[length-1].name;
            $scope.model.requestHeader.value = $scope.model.headers[length-1].value;
            $scope.model.requestHeader.request_id = $scope.model.newRequest.request_id;
            console.log('addHeader');
            console.log($scope.model.headers[length-1].name +' , ' + $scope.model.headers[length-1].value + ', ' + $scope.model.newRequest.request_id);
            if ( $scope.model.requestHeader.name != null )
                $scope.model.createRequestHeader().success(onCreateRequestHeaderSuccess);

        }

        function onCreateRequestHeaderSuccess(response) {
            console.log('onCreateRequestHeaderSuccess')
            $scope.model.headers.push(response);
            $scope.model.headers[$scope.model.headers.length-1].name='';
            $scope.model.headers[$scope.model.headers.length-1].value='';
        }

        function removeHeader(index) {
            console.log('removeHeader' +' , ' + index);
            deleteIndex = index;
            var id = $scope.model.headers[index].id;
            oasis.deleteRequestHeader(id, true).success(onDeleteRequestHeaderSuccess);
        }

        function onDeleteRequestHeaderSuccess(response) {
            console.log('delete success')
            $scope.model.headers.splice(deleteIndex,1);
        }


//TODO Response Setting
/*
        function addResCode() {
            console.log('res codes');
            var index = $scope.resCodes.length;
            //$scope.resCodes.push({'id': index});
            integrationModel.responseCode.status_code = $scope.resCodes[index-1].code
            integrationModel.responseCode.response_id = integrationModel.newResponse.response_id;

             if ( integrationModel.responseCode.status_code != null )
                integrationModel.createResponseCode().success(onCreateResponseCodeSuccess);
        }

        function onCreateResponseCodeSuccess(response) {
            console.log('onCreateResponseCodeSuccess')
            $scope.resCodes.push(response);
        }

        function removeResCode() {
            var lastItem = $scope.resCodes.length-1;
            //$scope.integrationModel.newFunctionSpec[$scope.index].resCodes.splice(lastItem);
            //integrationModel.endpoint.spec.resCodes = $scope.integrationModel.newFunctionSpec[$scope.index].resCodes;
        }

        function addResponseMesage() {
            console.log('responses');
            var index = $scope.responseMessages.length;
            //console.log($scope.integrationModel.newFunctionSpec[$scope.index].responses);
            integrationModel.responseMessage.message = $scope.responseMessages[index-1].message;
            integrationModel.responseMessage.response_statuscode_id = selectCodeId;

            integrationModel.createResponseMessage().success(onCreateResponseMessageSuccess);
        }

        function onCreateResponseMessageSuccess(response) {
            $scope.responseMessages.push(response);
        }
*/
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
