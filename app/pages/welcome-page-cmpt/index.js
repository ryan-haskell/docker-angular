angular.module(module.exports = 'welcomePageCmpt', [])

    .component(module.exports, {
        template: require('./tpl.html'),
        controller: require('./ctrl')
    })

;
