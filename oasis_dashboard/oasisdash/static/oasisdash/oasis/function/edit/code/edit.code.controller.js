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
        '$state',
        '$scope',
        '$stateParams',
        'horizon.dashboard.oasisdash.basePath',
        'horizon.app.core.openstack-service-api.oasisdash',
        'horizon.app.core.openstack-service-api.keystone',
        'horizon.dashboard.oasisdash.function.functionModel',
    ]

    function CreateFunctionInputController($state, $scope, $stateParams, basePath, oasis, keystone, model) {
        var ctrl = this;
        ctrl.region = [];
        ctrl.endpoint = [];

        init();

        function init() {
            model.init();
            if ($state.current.data && !isEmpty($state.current.data)) {
                $scope.model = $state.current.data;
            } else {
                $scope.model = model;
            }
            $state.current.data = $scope.model;

            //keystone.getCurrentUserSession().success(getSessionSuccess);
        }

        function getSessionSuccess(response) {
            var user = response.available_services_regions;
            for (var i in user) {
                var item = {
                    unit: user[i],
                    label: gettext(user[i])
                }

                ctrl.region.push(item)
            }
            if ($scope.selected instanceof Object) {
                //$scope.model.newFunctionSpec.select_region = $scope.selected.services_region;
                //$scope.changeBaymodel();
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