'use strict';

angular.module('kaizen', [
  'ngRoute',
  'kaizen.controllers'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/servers', {
        templateUrl: 'partials/server_list.html', 
        controller: 'ServerListController'}
    );
    
    $routeProvider.otherwise({redirectTo: '/servers'});
}]);
