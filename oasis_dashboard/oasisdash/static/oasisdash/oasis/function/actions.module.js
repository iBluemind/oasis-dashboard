(function() {
    'use strict';
    angular.module('horizon.dashboard.oasisdash.function.actions', ['horizon.framework', 'horizon.dashboard.oasisdash'])
        .run(registerFunctionActions);

    registerFunctionActions.$inject = [
        'horizon.framework.conf.resource-type-registry.service',
        'horizon.framework.util.i18n.gettext',
        'horizon.dashboard.oasisdash.function.create.service',
        //'horizon.dashboard.oasisdash.function.delete.service',
        'horizon.dashboard.oasisdash.function.resourceType',
    ];

    function registerFunctionActions(
        registry,
        gettext,
        createFunctionService,
        //deleteFunctionService,
        resourceType) {
        var functionResourceType = registry.getResourceType(resourceType);
        functionResourceType.batchActions
            .append(
                {
                  id: 'createFunctionAction',
                  service: createFunctionService,
                  template: {
                    type:'create',
                    text: gettext('Create Function')
                  }
                }
            );

            //.append({
            //    id: 'deleteFunctionAction',
            //    service: deleteFunctionService,
            //    template: {
            //        type: 'delete',
            //        text: gettext('Delete Function')
            //    }
            //});
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
