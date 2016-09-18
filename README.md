# Docker | AngularJS
> An isolated AngularJS frontend container that offers an intuitive folder structure and a guided developer workflow.


### Local Development

1. Install [Docker](https://www.docker.com/products/docker).
2. Run __`docker-compose up`__.
3. That's it.

> Windows: Go to __[http://192.168.99.100:8000](http://192.168.99.100:8000)__ to get started.

> Linux/Mac: Go to __[http://localhost:8000](http://localhost:8000)__ to get started.


### Project Architecture
> This frontend project was designed to help guide developers in the right direction when making decisions for their website or application.

---

#### Introduction

As a frontend developer, the __`app`__ folder should serve as your root directory. Any changes you make will "magically" bundle into the correct folder behind the scenes in your docker container. If there is ever a syntactical error in this process, it will be clearly displayed in the terminal running your `docker-compose up` command.

The entrypoint of this application is __`index.html`__. It is a simple template that does the following things:
- Imports `style.css` (bundled .scss files)
- Imports `angular.min.js` (minified AngularJS framework)
- Imports `bundle.js` (bundled JS files)
- Renders content within `<div ng-view></div>` (where your page will render)

The entrypoint for the AngularJS application is __`index.js`__. This file is in charge of loading the router, as well as other dependencies your application may have. It is also the entrypoint for our JS bundler.

The application routes are defined in the __`routes.js`__ file. All this file does is render the appropriate component into the `ng-view` div, as mentioned before. We'll discuss components in a bit.

The __`index.scss`__ file serves as the entrypoint for our styles. Sass allows us to modularize our styles, similar to how AngularJS will enable us to modularize our logic. It will be the entrypoint for our SASS bundler.

Our application will primarily be composed of _components_ (views for the user) and _services_ (view-independent logic).

Whether creating a _component_ or a _service_, you will be creating an isolated, testable module. This means that all of the code relevant to that module will be neatly stored in a designated folder.

---

#### Folder Structure

- ___index.html___ (main entrypoint)
- ___index.js___ (js entrypoint)
- ___routes.js___ (route configuration)
- ___index.scss___ (css entrypoint)
- __shared/__ (modules shared across pages)
  - __example-cmpt/__ (shared component)
    - ___index.js___ (creates module, requires dependencies)
    - ___tpl.html___ (content to display)
    - ___ctrl.js___ (exposes and maintains view model)
    - ___style.scss___ (specifies component-specific styles)
    - ___spec.js___ (tests all __public__ interfaces of component)
  - __example-service/__ (shared service)
    - ___index.js___ (creates module, requires dependencies)
    - ___srvc.js___ (exposes and maintains data model)
    - ___spec.js___ (tests all __public__ interfaces of service)
- __pages/__ (pages in the application)
  - ___index.js___ (creates _pages_ module, requiring page folders)
  - __welcome-page-cmpt/__ (example page)
    - (matches _example-component_ structure)
    - __page-specific-cmpt/__ (some component only used in _welcome-page_)
      - (matches _example-component_ structure)
  - __.../__ (other pages)

---

#### Example Component

__`index.js`__

```js
angular.module(module.exports = 'exampleCmpt', [])
    .component(module.exports, {
        template: require('./tpl.html'),
        controller: require('./ctrl')
    });
```

__`tpl.html`__
```html
<!-- Example Component -->
<h1 class="example-header" ng-bind="$ctrl.name"></h1>
<input type="text" class="example-input" ng-model="$ctrl.name">
```

__`ctrl.js`__
```js
module.exports = [function(){

    // All properties of '$ctrl' are exposed to template
    var $ctrl = this;

    // Available in template
    $ctrl.name = 'Jack';

    // Private to controller
    var hiddenName = 'Jill';

}];
```

__`style.scss`__
```sass
example-cmpt {

    .example-header {
      font-family: Arial;
    }

    .example-input {
      /* Style your input */
    }

}
```

__`spec.js`__
```js
describe('exampleCmpt', function() {

    var ctrl;

    beforeEach(function(){

        // Load module
        angular.mock.module(require('.'));

        // Initialize component
        inject(function($componentController) {
            ctrl = $componentController('exampleCmpt', {});
        });

    });

    it('has initial name set to John', function(){

        expect(ctrl.name).toEqual('John');

    });

});
```

---

#### Example Service

__`index.js`__

```js
angular.module(module.exports = 'ExampleSrvc', [])
    .service( module.exports, require('./srvc') );
```

__`srvc.js`__
```js
module.exports = [function(){

  var srvc = this;

  srvc.data = {
    person: {
      name: 'Jack',
      age: 21,
    }
  };

}];
```

__`spec.js`__
```js
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
```

---

#### Unit Testing

You may have noticed that the `spec.js` files require you to write tests for all _public_ interfaces. For _component_ controllers, this means that if a function is not private to the controller, it needs to be tested to define and validate the purpose of that function. The same rule applies to _services_.

This rewards privatizing functions that aren't necessary to expose. Unit tests also help keep modules lightweight and focused.
