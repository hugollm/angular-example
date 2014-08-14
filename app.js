'use strict';


angular.module('app', [])

    .config(['$locationProvider', AppConfig])

    .directive('pagination', PaginationDirective)
    .directive('paginationLink', PaginationLinkDirective)
    .directive('page', PageDirective)

    .controller('PageController', ['$location', PageController])
;


function AppConfig($locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
};


function PaginationDirective() {
    return {
        template: '<ul class="pagination" ng-transclude></ul>',
        transclude: true,
        replace: true
    };
};


function PaginationLinkDirective() {
    return {
        template: '<li><a href="{{path}}" ng-transclude></a></li>',
        scope: {path: '@path'},
        replace: true,
        transclude: true
    };
};


function PageDirective() {
    return {
        template: '<div ng-show="page.is(path)" ng-include="template"></div>',
        scope: {path: '@path', template: '@template'},
        controller: 'PageController',
        controllerAs: 'page',
        replace: true
    };
};


function PageController($location) {
    this.$location = $location;
};
PageController.prototype.is = function(path) {
    return this.$location.path() === path;
};
