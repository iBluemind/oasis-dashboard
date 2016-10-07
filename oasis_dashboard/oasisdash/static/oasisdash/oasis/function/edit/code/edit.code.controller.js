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

        var functionId = $stateParams.functionId;
        ctrl.region = [];
        ctrl.endpoints = [];
        ctrl.createFunction = createFunction;
        ctrl.nodepools=[];
        init();

        function init() {

            console.log('function Id : ' + functionId);
            //model.init();
            if ($state.current.data && !isEmpty($state.current.data)) {
                $scope.model = $state.current.data;
            } else {
                $scope.model = model;
            }
            $state.current.data = $scope.model;
            oasis.getEndpoints().success(getEndPointSuccess);

            if ( functionId != null )
            oasis.getFunction(functionId).success(getFunctionSuccess);
        }

        function getFunctionSuccess(response) {
            console.log('get function');
            console.log(response);
            $scope.model.newFunctionSpec.name = response.name;
            $scope.model.newFunctionSpec.desc = response.desc;
            $scope.model.newFunctionSpec.body = response.body;
        }

        function createFunction() {
            console.log(model.newFunctionSpec);
            model.createFunction().success(createFunctionSuccess);
        }

        function createFunctionSuccess(response) {
            //console.log('create function success');
            console.log(response);
            //toast.add('success', interpolate(message.success, [response.name]));
            $scope.$emit(events.CREATE_SUCCESS, response);
            $location.path(baseRoute + 'function');
        }

        function getEndPointSuccess(response){

            console.log(response);
            //response  = [
            //    {
            //        'id': '1q2e3r6-zc34',
            //        'name': 'endpoint1',
            //        'desc': 'test endpoint1',
            //        'status': 'running'
            //    },
            //    {
            //        'id': '123d23rfwef',
            //        'name': 'endpoint2',
            //        'desc': 'test endpoint2',
            //        'status': 'running'
            //    },
            //    {
            //        'id': 'zasdf45-dfg',
            //        'name': 'endpoint3',
            //        'desc': 'test endpoint3',
            //        'stats': 'running'
            //    }]
            //
            //
            //for (var i in response) {
            //    var item = {
            //        unit: response[i].id,
            //        label: response[i].name
            //    }
            //
            //    ctrl.endpoints.push(item)
            //}
            //
            //var nodepools = [
            //    {
            //        'id': '1f2343',
            //        'name': 'nodepool1'
            //    },
            //    {
            //        'id': '1f2343',
            //        'name': 'nodepool2'
            //    },
            //    {
            //        'id': '1f2343',
            //        'name': 'nodepool3'
            //    },
            //    {
            //        'id': '1f2343',
            //        'name': 'nodepool5'
            //    },
            //    {
            //        'id': '1f2343',
            //        'name': 'nodepool6'
            //    }
            //]
            //for (var i in nodepools) {
            //    var item = {
            //        unit: nodepools[i].id,
            //        label: nodepools[i].name
            //    }
            //
            //    ctrl.nodepools.push(item)
            //}
            //console.log(ctrl.endpoints);
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