/**
 * Copyright 2015 Cisco Systems, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name horizon.dashboard.container-infra
   *
   * @description
   * Dashboard module to host various container-infra panels.
   */
  angular
    .module('horizon.dashboard.oasis', [
      'horizon.dashboard.oasis.function',
      'horizon.dashboard.oasis.policy',
      'ngRoute'
    ])
    .config(config)

  config.$inject = ['$provide', '$windowProvider',
                    '$routeProvider', '$locationProvider'];

  function config($provide, $windowProvider, $routeProvider, $locationProvider) {
    var path = $windowProvider.$get().STATIC_URL + 'dashboard/oasis/';
    $provide.constant('horizon.dashboard.oasis.basePath', path);

    $routeProvider
    .when('/project/function', {
      templateUrl: path + 'function/table/table.html'
    })
    .when('/project/function/:functionId', {
      templateUrl: path + 'function/detail/detail.html'
    })
    .when('/project/policy', {
      templateUrl: path + 'policy/table/table.html'
    })
    .when('/project/policy/:projectId', {
      templateUrl: path + 'policy/detail/detail.html'
    });
  }
})();
