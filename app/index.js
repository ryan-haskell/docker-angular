angular.module(module.exports = 'app', [
    require('pages'),
    require('angular-route')
])
    .config(require('./router'))
;
