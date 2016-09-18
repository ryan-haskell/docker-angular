describe('ExampleSrvc', function() {

    var ExampleSrvc;

    beforeEach(function(){

        angular.mock.module(require('.'));

        inject(function(_ExampleSrvc_) {
            ExampleSrvc = _ExampleSrvc_;
        });

    });

    it('has right name',function(){

        expect(ExampleSrvc.data.person.name).toEqual('Jack');

    });

});
