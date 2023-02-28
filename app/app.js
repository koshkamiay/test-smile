'use strict';

angular.module('testSmile', [
  'ngRoute',
  'testSmile.table',
  'testSmile.document'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

    $routeProvider.when('/table', {
      templateUrl: 'table/table.html',
      controller: 'tableCtrl'
    });

    $routeProvider.when('/document/:documentId', {
      templateUrl: 'document/document.html',
      controller: 'documentCtrl',
    });
  $locationProvider.hashPrefix('');

  $routeProvider.otherwise({redirectTo: '/table'});
}]);
