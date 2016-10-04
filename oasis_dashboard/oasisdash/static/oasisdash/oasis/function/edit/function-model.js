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
                links:'kjwook',
                stack_id: 'stack-kjwook',
                project_id: 'project-kjwook',
                user_id: 'user-kjwook',
                status: 'running'
            },

            // API methods
            init: init,
            createFunction: createFunction
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
            console.log('model');
            console.log(model.newFunctionSpec);
            var finalSpec = angular.copy(model.newFunctionSpec);
            console.log('final');
            console.log(finalSpec);
            //cleanNullProperties(finalSpec);

            return oasis.createFunction(finalSpec);
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