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
        .controller('EditFunctionController', EditFunctionController)

    EditFunctionController.$inject = [
        '$q',
        '$scope',
        'horizon.dashboard.oasisdash.basePath',
    ]

    function EditFunctionController($q, $scope, basePath, oasis, keystone) {
        $scope.tabData = [
            {
                heading: '<i>Code</i>',
                route: 'edit.code'
            },
            {
                heading: <i>Integration</i>,
                route: 'edit.integration',
            },
            {
                heading:'<i>Monitor</i>',
                route:'edit.monitor'
            }
        ];

    }

})();