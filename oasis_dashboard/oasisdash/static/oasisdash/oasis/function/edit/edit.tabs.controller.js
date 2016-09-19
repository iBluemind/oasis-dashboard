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
        .controller('TabsController', TabsController)

    TabsController.$inject = [
        '$q',
        '$scope',
        'horizon.dashboard.oasisdash.basePath',
        'horizon.dashboard.oasisdash.function.functionModel',
    ]

    function TabsController($q, $scope, basePath, oasis, model) {

    }

})();