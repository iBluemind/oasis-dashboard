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
        'horizon.dashboard.oasisdash.endpoint.endpointModel',
    ];

    function EndpointNameController($scope, $state, model) {
        var ctrl = this;

        $scope.createEndPoint = createEndPoint;

        init();

        function init() {
            $scope.model = model;
            //if ($state.current.data && !isEmpty($state.current.data)) {
            //    $scope.model = $state.current.data;
            //} else {
            //    $scope.model = model;
            //}
            //$state.current.data = $scope.model;
        }

        function createEndPoint() {
            console.log(model.endpointModel);
            model.createEndpoint().success(createEndpointSuccess);
        }

        function createEndpointSuccess(response) {
            //console.log(response);
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