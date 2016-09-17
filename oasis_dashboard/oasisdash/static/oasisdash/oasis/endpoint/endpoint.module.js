(function() {
    'user strict';

    angular
        .module('horizon.dashboard.oasisdash.endpoint', ['horizon.dashboard.oasisdash.endpoint.actions'])
        .constant('horizon.dashboard.oasisdash.endpoint.events', events())
        .constant('horizon.dashboard.oasisdash.endpoint.resourceType', 'OS::Oasis::Endpoint');

    function events() {
        return {
          CREATE_SUCCESS: 'horizon.dashboard.oasisdash.endpoint.CREATE_SUCCESS',
          DELETE_SUCCESS: 'horizon.dashboard.oasisdash.endpoint.DELETE_SUCCESS'
        };
    }
})();
