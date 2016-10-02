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
        .module('horizon.dashboard.oasisdash.endpoint')
        .controller('EndpointMethodController', EndpointMethodController);

    EndpointMethodController.$inject = [
        '$q',
        '$scope',
        'horizon.dashboard.oasisdash.basePath',
        'horizon.app.core.openstack-service-api.oasisdash',
        '$compile'
    ];

    function EndpointMethodController($q, $scope, basePath, oasis, $compile) {
        var ctrl = this;
        ctrl.name = "";
        ctrl.description = "";
        ctrl.addMethodElement = addMethodElement;
        ctrl.clickTest = clickTest;
        ctrl.function_method = [{unit: "get", label: gettext("GET")},
            {unit: "post", label: gettext("POST")},
            {unit: "put", label: gettext("PUT")},
            {unit: "patch", label: gettext("PATCH")},
            {unit: "delete", label: gettext("DELETE")}];

        function addMethodElement() {
            var btnhtml = '                <select name="function-method" id="function-method" \
                        class="form-control" ng-options="mu.unit as mu.label for mu in ctrl.function_method" \
                        ng-model="model.newFunctionSpec.method" ng-change="changeMemoryUnit()"> \
                </select>';
            var temp = $compile(btnhtml)($scope);
            angular.element(document.getElementById('method-group')).append(temp);

        }

        function clickTest(){
            console.log('click');
        }
    }
})();