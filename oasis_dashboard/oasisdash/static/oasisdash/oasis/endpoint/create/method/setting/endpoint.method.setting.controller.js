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
    ];

    function IntegrationSettingController($scope, $state, $stateParams, integrationModel) {
        var ctrl = this;
        var selectCodeId = null;

        $scope.index = $stateParams.index;
        $scope.method = $stateParams.param;

        $scope.resCodes = [
            {
                'code':null
            }
        ];

        $scope.headers = [
            {
                'name': null,
                'value': null
            }
        ];
        $scope.selectCode = selectCode;
        $scope.createHeader = createHeader;
        $scope.removeHeader = removeHeader;
        $scope.addHeader = addHeader;
        $scope.addResCode = addResCode;
        $scope.removeResCode = removeResCode;
        $scope.addResponseMesage = addResponseMesage;
        $scope.responseMessages = [
            {
                'message': null
            }
        ]

        init();

        function init() {

            if ($state.current.data && !isEmpty($state.current.data)) {
                $scope.integrationModel = $state.current.data;
            } else {
                $scope.integrationModel = integrationModel;
            }
            $state.current.data = $scope.integrationModel;
        }

        function createHeader() {

        }

        function addHeader() {
            var length = $scope.headers.length;
            //$scope.headers.push({'id': length});
            integrationModel.requestHeader.name = $scope.headers[length-1].name;
            integrationModel.requestHeader.value = $scope.headers[length-1].value;
            integrationModel.requestHeader.request_id = integrationModel.newRequest.id;
            console.log(integrationModel.requestHeader);

            if ( integrationModel.requestHeader.name != null )
                integrationModel.createRequestHeader().success(onCreateRequestHeaderSuccess);

        }

        function onCreateRequestHeaderSuccess(response) {
            console.log('onCreateRequestHeaderSuccess')
            $scope.headers.push(response);
            $scope.resCodes[$scope.resCodes.length-1].name='';
            $scope.resCodes[$scope.resCodes.length-1].value='';
        }

        function removeHeader() {
            var lastItem = $scope.integrationModel.newFunctionSpec[$scope.index].request.length-1;
            $scope.integrationModel.newFunctionSpec[$scope.index].request.splice(lastItem);
            integrationModel.endpoint.spec.request = $scope.integrationModel.newFunctionSpec[$scope.index].request;
        }

        function addResCode() {
            console.log('res codes');
            var index = $scope.resCodes.length;
            //$scope.resCodes.push({'id': index});
            integrationModel.responseCode.status_code = $scope.resCodes[index-1].code
            integrationModel.responseCode.response_id = integrationModel.newResponse.id;

             if ( integrationModel.responseCode.status_code != null )
                integrationModel.createResponseCode().success(onCreateResponseCodeSuccess);
        }

        function onCreateResponseCodeSuccess(response) {
            console.log('onCreateResponseCodeSuccess')
            $scope.resCodes.push(response);
        }

        function selectCode(select) {
            selectCodeId = select.code.id;
            console.log('select code');
            console.log(select);
            console.log(select.code.id);
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
