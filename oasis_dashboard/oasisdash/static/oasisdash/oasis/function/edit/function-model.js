(function () {
    'use strict';

    angular
        .module('horizon.dashboard.oasisdash.function')
        .factory('horizon.dashboard.oasisdash.function.functionModel', functionModel)
        .factory('hotizon.dashboard.oasisdash.function.functionIntegrationModel', functionIntegrationModel);
    functionModel.$inject = [
        'horizon.app.core.openstack-service-api.oasisdash'
    ];

    function functionModel(oasis) {
        var model = {
            newFunctionSpec: {},

            // API methods
            init: init,
            createFunction: createFunction
        };

        function initNewFunctionSpec() {
            model.newFunctionSpec = {
                name: 'test',
                description : 'This is test function',
                body:'def get(self)'
            };
        }

        function init() {
            // Reset the new Bay spec
            initNewFunctionSpec();
        }

        function createFunction() {
            var finalSpec = angular.copy(model.newFunctionSpec);

            //cleanNullProperties(finalSpec);

            return oasis.createFunction(finalSpec);
        }

        return model;
    }

    function functionIntegrationModel() {
        var model = {

        }
    }
})
();