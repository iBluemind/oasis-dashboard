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
        '$stateParams',
        'horizon.dashboard.oasisdash.basePath',
        'horizon.dashboard.oasisdash.function.functionModel',
    ]

    function TabsController($q, $scope, $stateParams, basePath, oasis, model) {

        $scope.functionId = $stateParams.functionId;

        $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        });
    }

})();