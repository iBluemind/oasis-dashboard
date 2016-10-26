(function() {
    'use strict';

    angular
        .module('horizon.dashboard.oasisdash.function', ['ui.ace', 'horizon.dashboard.oasisdash.function.actions'])
        .constant('horizon.dashboard.oasisdash.function.events', events())
        .constant('horizon.dashboard.oasisdash.function.resourceType', 'OS::Oasis::Function');

    function events() {
        return {
          CREATE_SUCCESS: 'horizon.dashboard.oasisdash.function.CREATE_SUCCESS',
          DELETE_SUCCESS: 'horizon.dashboard.oasisdash.function.DELETE_SUCCESS'
        };
    }
})();
