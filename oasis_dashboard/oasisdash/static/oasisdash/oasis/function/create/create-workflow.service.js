(function () {
    'use strict';

    angular
        .module('horizon.dashboard.oasisdash.function')
        .factory('horizon.dashboard.oasisdash.function.workflow', createWorkflow);

    createWorkflow.$inject = [
        'horizon.dashboard.oasisdash.basePath',
        'horizon.app.core.workflow.factory',
        'horizon.framework.util.i18n.gettext'
    ];

    function createWorkflow(basePath, dashboardWorkflow, gettext) {
        return dashboardWorkflow({
            title: gettext('Create Function'),

            steps: [
                {
                    title: gettext('Function'),
                    templateUrl: basePath + 'function/create/function/function.html',
                    formName: 'functionForm'
                }
            ],
            btnText: {
                finish: gettext('Create')
            },

            btnIcon: {
                finish: 'fa fa-check'
            }
        });
    }
})();