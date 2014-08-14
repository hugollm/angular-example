'use strict';


angular.module('app', [])

    .config(['$locationProvider', AppConfig])

    .directive('pagination', PaginationDirective)
    .directive('paginationLink', PaginationLinkDirective)

    .directive('pages', PagesDirective)
    .directive('pageStart', PageDirective('templates/start.html'))
    .directive('pageAbout', PageDirective('templates/about.html'))
    .directive('pageContact', PageDirective('templates/contact.html'))

    .controller('PageController', ['$location', PageController])
;


function AppConfig($locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
};


function PagesDirective() {
    return {
        template: '<div ng-transclude></div>',
        controller: 'PageController',
        controllerAs: 'page',
        replace: true,
        transclude: true
    };
};


function PageDirective(templateUrl) {
    return function() {
        return {
            templateUrl: templateUrl,
            replace: true,
        };
    };
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


function PageController($location) {
    this.$location = $location;
};
PageController.prototype.is = function(path) {
    return this.$location.path() === path;
};
