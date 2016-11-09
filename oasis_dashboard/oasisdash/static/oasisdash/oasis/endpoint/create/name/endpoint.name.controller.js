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
        .controller('EndpointNameController', EndpointNameController);

    EndpointNameController.$inject = [
        '$scope',
        '$state',
        '$stateParams',
        'horizon.dashboard.oasisdash.endpoint.endpointModel',
        'horizon.app.core.openstack-service-api.oasisdash'
    ];

    function EndpointNameController($scope, $state, $stateParams, model, oasis) {
        var ctrl = this;
        //$scope.endpointId = $stateParams.endpointId;
        $scope.createEndPoint = createEndPoint;

        init();

        function init() {
            model.init();
            $scope.model = model;

            if ( $scope.model.endpoint.id != null ) {
                oasis.getEndpoint($scope.model.endpoint.id).success(onGetEndpointSuccess);
            }
        }

        function createEndPoint() {
            model.createEndpoint().success(createEndpointSuccess);
        }

        function createEndpointSuccess(response) {
            console.log('create endpoint');
            console.log(response);
            model.endpoint = response;
        }

        function onGetEndpointSuccess(response) {
            model.endpoint.name = response.name;
            model.endpoint.desc = response.desc;
            model.endpoint.url = response.url;

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