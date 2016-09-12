angular.module(module.exports = 'welcomePage', [])

    .component(module.exports, {
        templateUrl: 'templates/pages/welcome-page-component/tpl.html',
        controller: require('./ctrl')
    })

;