
(function() {
    'use strict';

    /**
     * @ngdoc overview
     * @name BaysTableController
     * @ngController
     *
     * @description
     * Controller for the container-infra bay table
     */
    angular
        .module('horizon.dashboard.oasisdash.function')
        .controller('FunctionTableController', FunctionTableController);

    FunctionTableController.$inject = [
        '$scope',
        '$location',
        'horizon.app.core.openstack-service-api.oasisdash',
        'horizon.dashboard.oasisdash.function.events',
        'horizon.framework.conf.resource-type-registry.service',
        'horizon.dashboard.oasisdash.function.resourceType'
    ];

    function FunctionTableController($scope, $location, oasis, events, registry, functionResourceType) {
        var ctrl = this;
        ctrl.function = [];
        ctrl.functionSrc = [];
        ctrl.functionResource = registry.getResourceType(functionResourceType);

        /**
         * Filtering - client-side MagicSearch
         * all facets for function table
         */
        ctrl.functionFacets = [
            {
                'label': gettext('Name'),
                'name': 'name',
                'singleton': true
            },
            {
                'label': gettext('ID'),
                'name': 'id',
                'singleton': true
            },
            {
                'label': gettext('Status'),
                'name': 'status',
                'singleton': true
            }
        ];

        var createWatcher = $scope.$on(events.CREATE_SUCCESS, onCreateSuccess);
        //var deleteWatcher = $scope.$on(events.DELETE_SUCCESS, onDeleteSuccess);

        $scope.$on('$destroy', destroy);

        init();

        function init() {
            registry.initActions(functionResourceType, $scope);
            oasis.getFunctions().success(getFunctionsSuccess);
        }

        function getFunctionsSuccess(response) {
            ctrl.functionSrc = response.items;
        }

        function onCreateSuccess(e, createdItem) {
            ctrl.functionSrc.push(createdItem);
            e.stopPropagation();
        }

        //function onDeleteSuccess(e, removedIds) {
        //    ctrl.baysSrc = difference(ctrl.baysSrc, removedIds, 'id');
        //    e.stopPropagation();
        //
        //    // after deleting the items
        //    // we need to clear selected items from table controller
        //    $scope.$emit('hzTable:clearSelected');
        //}

        function difference(currentList, otherList, key) {
          return currentList.filter(filter);

          function filter(elem) {
            return otherList.filter(function filterDeletedItem(deletedItem) {
              return deletedItem === elem[key];
            }).length === 0;
          }
        }

        function destroy() {
          createWatcher();
          //deleteWatcher();
        }
    }

    //function FunctionTableController(oasis) {
    //    var ctrl = this;
    //    ctrl.function = [];
    //    ctrl.functionSrc = [];
    //    //ctrl.functionResource = registry.getResourceType(bayResourceType);
    //
    //    /**
    //     * Filtering - client-side MagicSearch
    //     * all facets for function table
    //     */
    //    ctrl.functionFacets = [
    //        {
    //            'label': gettext('Name'),
    //            'name': 'name',
    //            'singleton': true
    //        },
    //        {
    //            'label': gettext('ID'),
    //            'name': 'id',
    //            'singleton': true
    //        },
    //        {
    //            'label': gettext('Status'),
    //            'name': 'status',
    //            'singleton': true
    //        }
    //    ];
    //    init();
    //
    //    ////////////////////////////////
    //
    //    function init() {
    //        oasis.getFunctions().success(getFunctionsSuccess);
    //    }
    //
    //    function getFunctionsSuccess(response) {
    //        ctrl.functionSrc = response.items;
    //    }
    //}
})();
