(function() {
    'use strict';

    angular
        .module('horizon.dashboard.oasisdash.function', ['horizon.dashboard.oasisdash.function.actions', 'ui.ace'])
        .constant('horizon.dashboard.oasisdash.function.events', events())
        .constant('horizon.dashboard.oasisdash.function.resourceType', 'OS::Oasis::Function');

    function events() {
        return {
          CREATE_SUCCESS: 'horizon.dashboard.oasisdash.function.CREATE_SUCCESS',
          DELETE_SUCCESS: 'horizon.dashboard.oasisdash.function.DELETE_SUCCESS'
        };
    }
})();


//(function() {
//  'use strict';
//
//  /**
//   * @ngdoc horizon.dashboard.admin.flavors
//   * @ngModule
//   *
//   * @description
//   * Provides all of the services and widgets required
//   * to support and display the flavors panel.
//   */
//  angular
//    .module('horizon.dashboard.oasisdash.function', []);
//
//})();
