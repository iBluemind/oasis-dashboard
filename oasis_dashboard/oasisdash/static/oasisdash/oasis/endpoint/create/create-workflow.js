(function () {
    'use strict';

    angular
        .module('horizon.dashboard.oasisdash.endpoint')
        .factory('horizon.dashboard.oasisdash.endpoint.createworkflow', createWorkflow);

    createWorkflow.$inject = [
        'horizon.dashboard.oasisdash.basePath',
        'horizon.app.core.workflow.factory',
        'horizon.framework.util.i18n.gettext'
    ];

    function createWorkflow(basePath, dashboardWorkflow, gettext) {
        return dashboardWorkflow({
            title: gettext('Create Endpoint'),

            steps: [
                {
                    title: gettext('API Name'),
                    templateUrl: basePath + 'endpoint/create/name/name.html',
                    formName: 'nameForm'
                },
                {
                    title: gettext('Method'),
                    templateUrl: basePath + 'endpoint/create/method/method.html',
                    formName: 'methodForm'
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