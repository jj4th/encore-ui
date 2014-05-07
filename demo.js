angular.module('demoApp', ['encore.ui', 'ngRoute'])
.controller('componentCtrl', function ($scope, rxBreadcrumbsSvc, $routeParams, component) {
    rxBreadcrumbsSvc.set([{
        name: component.name
    }]);

    $scope.component = component;
})
.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/overview'
        })
        .when('/overview', {
            templateUrl: 'overview.html',
            controller: function (rxBreadcrumbsSvc) {
                rxBreadcrumbsSvc.set();
            }
        })
        .when('/component/:component', {
            controller: 'componentCtrl',
            templateUrl: 'component-template.html',
            resolve: {
                'component': function ($route, components) {
                    return _.find(components, {
                        'name': $route.current.params.component
                    });
                }
            }
        });
})
.run(function ($rootScope, components, $window) {
    $rootScope.demoNav = [
        {
            type: 'highlight',
            title: 'Encore-UI',
            children: [
                {
                    href: '#/overview',
                    linkText: 'Overview'
                },
                {
                    linkText: 'External Links',
                    children: [
                        {
                            href: 'https://github.com/rackerlabs/encore-ui',
                            linkText: 'GitHub Repo'
                        },
                        {
                            href: 'coverage/index.html',
                            linkText: 'Unit test coverage'
                        },
                        {
                            href: 'ngdocs/index.html',
                            linkText: 'ng-docs'
                        }
                    ]
                }
            ]
        },
        {
            title: 'All Components',
            children: []
        }
    ];

    _.each(components, function (component) {
        $rootScope.demoNav[1].children.push({
            href: '#/component/' + component.name,
            linkText: component.name
        });
    });


    $rootScope.$on('$routeChangeSuccess', function() {
        $window.scrollTo(0,0);
    });
})
.directive('rxPrism', function ($timeout) {
    return {
        restrict: 'E',
        template: '<pre><code class="language-{{language}}" ng-transclude></code></pre>',
        scope: {
            language: '@'
        },
        transclude: true,
        link: function (scope, el) {
            // delay execution of Prism until ng bindings have completed
            $timeout(function () {
                var code = el.find('code')[0];
                Prism.highlightElement(code);
            }, 0);
        }
    };
});