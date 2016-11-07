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
        .controller('CreateFunctionInputController', CreateFunctionInputController);

    CreateFunctionInputController.$inject = [
        '$location',
        '$state',
        '$scope',
        '$stateParams',
        'horizon.dashboard.oasisdash.baseRoute',
        'horizon.app.core.openstack-service-api.oasisdash',
        'horizon.dashboard.oasisdash.function.functionModel',
        'horizon.framework.widgets.toast.service',
        'horizon.dashboard.oasisdash.function.events',
    ]

    function CreateFunctionInputController($location, $state, $scope, $stateParams, baseRoute, oasis, model, toast, events) {
        var ctrl = this;

        $scope.functionId = $stateParams.functionId;
        ctrl.endpoints = [];
        ctrl.createFunction = createFunction;
        ctrl.nodepools=[];

        init();

        function init() {

            console.log('function Id : ' + $scope.functionId);
            //model.init();
            if ($state.current.data && !isEmpty($state.current.data)) {
                $scope.model = $state.current.data;
            } else {
                $scope.model = model;
            }
            $state.current.data = $scope.model;
            oasis.getEndpoints().success(getEndPointSuccess);
            oasis.getNodePools().success(onGetNodePoolPoliciesSuccess);

            if ( $scope.functionId != -1 )
                oasis.getFunction($scope.functionId).success(getFunctionSuccess);
        }

        function onGetNodePoolPoliciesSuccess(response) {
            for (var i in response.items) {
                var item = {
                    unit: response.items[i].id,
                    label: response.items[i].name
                }

                ctrl.nodepools.push(item)
            }
        }

        function getFunctionSuccess(response) {
            console.log('get function');
            console.log(response);
            $scope.model.newFunctionSpec.name = response.name;
            $scope.model.newFunctionSpec.desc = response.desc;
            $scope.model.newFunctionSpec.body = response.body;
            $scope.model.newFunctionSpec.endpoint_id = response.endpoint_id;
            $scope.model.newFunctionSpec.nodepool_id = response.nodepool_id;
            $scope.model.newFunctionSpec.status = response.status;
            $scope.model.newFunctionSpec.stack_id = response.stack_id;

        }

        function createFunction() {
            console.log('crea te function');
            if ( $scope.functionId == -1 )
                model.createFunction().success(createFunctionSuccess);
            else {
                //model.newFunctionSpec.id = $scope.functionId;
                //console.log(model.newFunctionSpec);
                model.updateFunction($scope.functionId).success(createFunctionSuccess);
            }
        }

        function createFunctionSuccess(response) {
            console.log('create function success');
            console.log(response);
            //toast.add('success', interpolate(message.success, [response.name]));
            $scope.$emit(events.CREATE_SUCCESS, response);
            $location.path(baseRoute + 'function');
        }

        function getEndPointSuccess(response){

            //console.log(response);

            for (var i in response.items) {
                var item = {
                    unit: response.items[i].id,
                    label: response.items[i].name
                }

                ctrl.endpoints.push(item)
            }
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