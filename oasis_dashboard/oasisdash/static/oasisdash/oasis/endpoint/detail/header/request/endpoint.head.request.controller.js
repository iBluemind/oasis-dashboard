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
        .controller('EndpointRequestController', EndpointRequestController);

    EndpointRequestController.$inject = [
        '$q',
        '$scope',
        'horizon.dashboard.oasisdash.basePath',
        'horizon.app.core.openstack-service-api.oasisdash',
        '$compile'
    ];

    function EndpointRequestController($q, $scope, basePath, oasis, $compile) {
        var ctrl = this;
        ctrl.name = "";
        ctrl.description = "";
        ctrl.addHeaderElement = addHeaderElement;

        function addHeaderElement() {
            var btnhtml = '<div class="col-xs-6">\
            <div class="form-group">\
                <label class="control-label" for="header-key" translate>Header Key</label>\
                <input name="header-key" type="text" class="form-control" id="header-key"\
                       ng-model="model.newEndpointDetailSpec.request.key"\
                       placeholder="{$ \'Key of the header to create.\'|translate $}">\
            </div>\
        </div>\
        <div class="col-xs-6">\
            <div class="form-group">\
                <label class="control-label" for="header-value" translate>Header Value</label>\
                <input name="header-value" type="text" class="form-control" id="header-value"\
                       ng-model="model.newEndpointDetailSpec.request.value"\
                       placeholder="{$ \'Value of the header to create.\'|translate $}">\
            </div>\
        </div>';
            var temp = $compile(btnhtml)($scope);
            angular.element(document.getElementById('request-group')).append(temp);

        }
    }
})();