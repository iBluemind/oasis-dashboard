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
        '$q',
        '$scope',
        'horizon.dashboard.oasisdash.basePath',
        'horizon.app.core.openstack-service-api.oasisdash'
    ];

    function IntegrationController($q, $scope, basePath, oasis) {
        var ctrl = this;
        ctrl.function_method = [{unit: "get", label: gettext("GET")},
            {unit: "post", label: gettext("POST")},
            {unit: "patch", label: gettext("PATCH")},
            {unit: "delete", label: gettext("DELETE")}];

    }
})();