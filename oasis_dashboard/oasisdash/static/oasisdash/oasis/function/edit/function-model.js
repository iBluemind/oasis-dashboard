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
            newFunctionSpec: {
                name: null,
                body: null,
                stack_id: 'stack-kjwook',
                //user_id: '7872143c6089412aa96ff5c6e6f714c7',
                status: 'running'
            },

            // API methods
            init: init,
            createFunction: createFunction,
            updateFunction: updateFunction
        };

        function initNewFunctionSpec() {
            model.newFunctionSpec = {
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

        function updateFunction(id) {
             var finalSpec = angular.copy(model.newFunctionSpec);
            //cleanNullProperties(finalSpec);

            return oasis.updateFunction(id, finalSpec);
        }

        return model;
    }

    function functionIntegrationModel() {
        var integrationModel = {
            method: 'bb',
            newFunctionSpec: []
        };

        return integrationModel;

    }
})
();