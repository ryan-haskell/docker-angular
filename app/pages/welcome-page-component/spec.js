describe('welcomePage', function() {

    var ctrl;

    beforeEach(function(){

        // Load module
        angular.mock.module(require('.'));

        // Initialize component
        inject(($componentController) => {
            ctrl = $componentController('welcomePage', {});
        });

    });

    it('has working uppercase function',function(){
        
        expect(ctrl.toUppercase('Ryan')).toEqual('RYAN');

    });

});