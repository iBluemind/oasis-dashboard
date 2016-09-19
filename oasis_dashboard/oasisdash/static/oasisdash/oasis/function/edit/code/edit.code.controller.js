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
        .module('horizon.dashboard.oasisdash.function')
        .controller('CreateFunctionInputController', CreateFunctionInputController)
        .directive('uiAce', ['uiAceConfig', function (uiAceConfig) {

            //if (angular.isUndefined(window.ace)) {
            //  throw new Error('ui-ace need ace to work... (o rly?)');
            //}

            /**
             * Sets editor options such as the wrapping mode or the syntax checker.
             *
             * The supported options are:
             *
             *   <ul>
             *     <li>showGutter</li>
             *     <li>useWrapMode</li>
             *     <li>onLoad</li>
             *     <li>theme</li>
             *     <li>mode</li>
             *   </ul>
             *
             * @param acee
             * @param session ACE editor session
             * @param {object} opts Options to be set
             */
            var setOptions = function(acee, session, opts) {

              // Basic options
              if (angular.isString(opts.theme)) {
                acee.setTheme('ace/theme/' + opts.theme);
              }
              if (angular.isString(opts.mode)) {
                session.setMode('ace/mode/' + opts.mode);
              }

            };

            return {
              restrict: 'EA',
              require: '?ngModel',
              link: function (scope, elm, attrs, ngModel) {
                /**
                 * Corresponds the uiAceConfig ACE configuration.
                 * @type object
                 */
                var options = uiAceConfig.ace || {};

                /**
                 * uiAceConfig merged with user options via json in attribute or data binding
                 * @type object
                 */
                var opts = angular.extend({}, options, scope.$eval(attrs.uiAce));

                /**
                 * ACE editor
                 * @type object
                 */
                var acee = window.ace.edit(elm[0]);

                /**
                 * ACE editor session.
                 * @type object
                 * @see [EditSession]{@link http://ace.c9.io/#nav=api&api=edit_session}
                 */
                var session = acee.getSession();

                // Value Blind
                if (ngModel) {
                  ngModel.$formatters.push(function (value) {
                    if (angular.isUndefined(value) || value === null) {
                      return '';
                    }
                    else if (angular.isObject(value) || angular.isArray(value)) {
                      throw new Error('ui-ace cannot use an object or an array as a model');
                    }
                    return value;
                  });

                  ngModel.$render = function () {
                    session.setValue(ngModel.$viewValue);
                  };
                }

                // Listen for option updates
                var updateOptions = function (current, previous) {
                  setOptions(acee, session, opts);
                };

                scope.$watch(attrs.uiAce, updateOptions, /* deep watch */ true);

                // set the options here, even if we try to watch later, if this
                // line is missing things go wrong (and the tests will also fail)
                updateOptions(options);

                elm.on('$destroy', function () {
                  acee.session.$stopWorker();
                  acee.destroy();
                });

                scope.$watch(function() {
                  return [elm[0].offsetWidth, elm[0].offsetHeight];
                }, function() {
                  acee.resize();
                  acee.renderer.updateFull();
                }, true);

              }
            };
          }]);
    CreateFunctionInputController.$inject = [
        '$q',
        '$scope',
        'horizon.dashboard.oasisdash.basePath',
        'horizon.app.core.openstack-service-api.oasisdash',
        'horizon.app.core.openstack-service-api.keystone'
    ]

    function CreateFunctionInputController($q, $scope, basePath, oasis, keystone) {
        var ctrl = this;
        ctrl.region = [];
        ctrl.endpoint = [];
        init();

        function init() {

            keystone.getCurrentUserSession().success(getSessionSuccess);
        }

        function getSessionSuccess(response) {
            var user = response.available_services_regions;
            for (var i in user) {
                var item = {
                    unit: user[i],
                    label: gettext(user[i])
                }

                ctrl.region.push(item)
            }
            if ($scope.selected instanceof Object) {
                //$scope.model.newFunctionSpec.select_region = $scope.selected.services_region;
                //$scope.changeBaymodel();
            }
        }

    }

})();