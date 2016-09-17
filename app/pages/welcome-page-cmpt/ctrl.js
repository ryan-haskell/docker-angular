module.exports = [function(){

    var $ctrl = this;

    $ctrl.title = 'Welcome to Angular!'

    $ctrl.toUppercase = function(str){

        if(str)
          return str.toUpperCase();
        else return '';

    };

}];
