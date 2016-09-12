module.exports = ['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider){

    $routeProvider.
        when('/', {
            template: '<welcome-page></welcome-page>'
        })
        .when('/oops', {
            template: '<error-page></error-page>'
        })
        .otherwise({
            redirectTo: '/oops'
        });

    $locationProvider.html5Mode(true);
}];