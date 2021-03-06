describe("mCAP Model", function () {

  it("Object", function () {


    expect(mCAP.Model).toBeDefined();
    expect(typeof mCAP.Model).toBe('function');

    expect(Backbone.Model.prototype.isPrototypeOf(mCAP.Model.prototype)).toBeTruthy();
    var testModel = new mCAP.Model();
    expect(Backbone.Model.prototype.isPrototypeOf(testModel)).toBeTruthy();
    testModel = null;

  });


  it("Properties ", function () {

    expect(mCAP.Model.prototype.hasOwnProperty('idAttribute')).toBeTruthy();
    expect(mCAP.Model.prototype.hasOwnProperty('selectable')).toBeTruthy();
    expect(mCAP.Model.prototype.hasOwnProperty('selectableOptions')).toBeTruthy();
    expect(mCAP.Model.prototype.hasOwnProperty('constructor')).toBeTruthy();
    expect(mCAP.Model.prototype.hasOwnProperty('setEndpoint')).toBeTruthy();
    expect(mCAP.Model.prototype.hasOwnProperty('parse')).toBeTruthy();
    expect(mCAP.Model.prototype.hasOwnProperty('revert')).toBeTruthy();

  });


  it("Instance ", function () {

    var a = new mCAP.Model({});
    var b = new mCAP.Model({});
    expect(a.hasOwnProperty('idAttribute')).toBeFalsy();
    expect(a.hasOwnProperty('selectable')).toBeTruthy();
    expect(a.hasOwnProperty('selectableOptions')).toBeFalsy();
    expect(a.hasOwnProperty('constructor')).toBeFalsy();
    expect(a.hasOwnProperty('setEndpoint')).toBeFalsy();
    expect(a.hasOwnProperty('parse')).toBeFalsy();
    expect(a.hasOwnProperty('revert')).toBeTruthy();

    expect(b.hasOwnProperty('idAttribute')).toBeFalsy();
    expect(b.hasOwnProperty('selectable')).toBeTruthy();
    expect(b.hasOwnProperty('selectableOptions')).toBeFalsy();
    expect(b.hasOwnProperty('constructor')).toBeFalsy();
    expect(b.hasOwnProperty('setEndpoint')).toBeFalsy();
    expect(b.hasOwnProperty('parse')).toBeFalsy();
    expect(b.hasOwnProperty('revert')).toBeTruthy();

  });


  it("Selectable ", function () {

    var NotSelectable = mCAP.Model.extend({
      selectable: false
    });

    var NotSelectableString = mCAP.Model.extend({
      selectable: ""
    });

    var notSelectable = new NotSelectable();
    expect(notSelectable.hasOwnProperty('selectable')).toBeFalsy();
    expect(notSelectable.selectable).toBeFalsy();
    expect(ModelSelectable.prototype.isPrototypeOf(notSelectable.selectable)).toBeFalsy();
    notSelectable = new NotSelectableString();
    expect(notSelectable.hasOwnProperty('selectable')).toBeFalsy();
    expect(notSelectable.selectable).toBeFalsy();
    expect(ModelSelectable.prototype.isPrototypeOf(notSelectable.selectable)).toBeFalsy();


    var Selectable = mCAP.Model.extend({
    });

    var selectable = new Selectable();
    expect(selectable.hasOwnProperty('selectable')).toBeTruthy();
    expect(ModelSelectable.prototype.isPrototypeOf(selectable.selectable)).toBeTruthy();

  });

  it("Endpoint ", function () {

    // cache the baseUrl
    var applicationBaseUrl = mCAP.application.get('baseUrl');

    expect(mCAP.Model.prototype.hasOwnProperty('endpoint')).toBeFalsy();

    var enpointValue = '';

    var Endpoint = mCAP.Model.extend({
      endpoint: enpointValue
    });

    var endppoint = new Endpoint();
    expect(Endpoint.prototype.hasOwnProperty('endpoint')).toBeTruthy();
    expect(endppoint.endpoint).toEqual(enpointValue);
    expect(endppoint.hasOwnProperty('urlRoot')).toBeTruthy();
    expect(typeof endppoint.urlRoot).toEqual('function');
    expect(endppoint.urlRoot()).toEqual(mCAP.application.get('baseUrl') + '/' + enpointValue);

    // set the endpoint after model init
    var Asset = mCAP.Model.extend({
      endpoint: 'asset'
    });
    var asset = new Asset();
    mCAP.application.set('baseUrl', 'http://www.mcap1.de/');
    expect(asset.url()).toEqual('http://www.mcap1.de/asset');

    // set the endpoint before model init
    var Asset = mCAP.Model.extend({
      endpoint: 'asset'
    });
    mCAP.application.set('baseUrl', 'http://www.mcap2.de/');
    var asset = new Asset();
    expect(asset.url()).toEqual('http://www.mcap2.de/asset');

    // set the endpoint before model extend
    mCAP.application.set('baseUrl', 'http://www.mcap3.de/');
    var Asset = mCAP.Model.extend({
      endpoint: 'asset'
    });
    var asset = new Asset();
    expect(asset.url()).toEqual('http://www.mcap3.de/asset');

    // refert the basUrl
    mCAP.application.set('baseUrl', applicationBaseUrl);

  });

  it("BaseUrl has slash", function () {

    // cache the baseUrl
    var applicationBaseUrl = mCAP.application.get('baseUrl');

    // set the endpoint after model init
    var Asset = mCAP.Model.extend({
      endpoint: 'asset'
    });
    var asset = new Asset();
    mCAP.application.set('baseUrl', 'http://www.mcap1.de');
    expect(asset.url()).toEqual('http://www.mcap1.de/asset');

    // set the endpoint before model init
    var Asset = mCAP.Model.extend({
      endpoint: 'asset'
    });
    mCAP.application.set('baseUrl', 'http://www.mcap2.de');
    var asset = new Asset();
    expect(asset.url()).toEqual('http://www.mcap2.de/asset');

    // set the endpoint before model extend
    mCAP.application.set('baseUrl', 'http://www.mcap3.de');
    var Asset = mCAP.Model.extend({
      endpoint: 'asset'
    });
    var asset = new Asset();
    expect(asset.url()).toEqual('http://www.mcap3.de/asset');

    // refert the basUrl
    mCAP.application.set('baseUrl', applicationBaseUrl);

  });

  it("Endpoint has slash", function () {

    // cache the baseUrl
    var applicationBaseUrl = mCAP.application.get('baseUrl');

    // set the endpoint after model init
    var Asset = mCAP.Model.extend({
      endpoint: '/asset'
    });
    var asset = new Asset();
    mCAP.application.set('baseUrl', 'http://www.mcap1.de');
    expect(asset.url()).toEqual('http://www.mcap1.de/asset');

    // set the endpoint before model init
    var Asset = mCAP.Model.extend({
      endpoint: '/asset'
    });
    mCAP.application.set('baseUrl', 'http://www.mcap2.de');
    var asset = new Asset();
    expect(asset.url()).toEqual('http://www.mcap2.de/asset');

    // set the endpoint before model extend
    mCAP.application.set('baseUrl', 'http://www.mcap3.de');
    var Asset = mCAP.Model.extend({
      endpoint: '/asset'
    });
    var asset = new Asset();
    expect(asset.url()).toEqual('http://www.mcap3.de/asset');

    // refert the basUrl
    mCAP.application.set('baseUrl', applicationBaseUrl);

  });

  it("Endpoint + BaseUrl has slash", function () {

    // cache the baseUrl
    var applicationBaseUrl = mCAP.application.get('baseUrl');

    // set the endpoint after model init
    var Asset = mCAP.Model.extend({
      endpoint: '/asset'
    });
    var asset = new Asset();
    mCAP.application.set('baseUrl', 'http://www.mcap1.de/');
    expect(asset.url()).toEqual('http://www.mcap1.de/asset');

    // set the endpoint before model init
    var Asset = mCAP.Model.extend({
      endpoint: '/asset'
    });
    mCAP.application.set('baseUrl', 'http://www.mcap2.de/');
    var asset = new Asset();
    expect(asset.url()).toEqual('http://www.mcap2.de/asset');

    // set the endpoint before model extend
    mCAP.application.set('baseUrl', 'http://www.mcap3.de/');
    var Asset = mCAP.Model.extend({
      endpoint: '/asset'
    });
    var asset = new Asset();
    expect(asset.url()).toEqual('http://www.mcap3.de/asset');

    // refert the basUrl
    mCAP.application.set('baseUrl', applicationBaseUrl);

  });

  it("parse", function () {
    var model = new mCAP.Model();

    var parse1 = {};
    var parse2 = null;
    var parse3 = 1;
    var parse4 = -1;
    var parse5 = 0;
    var parse6 = 2;
    var parse7 = undefined;
    var parse8 = '';
    var parse9 = true;
    var parse10 = false;
    var parse11 = [];

    expect(model.parse()).toEqual(void 0);
    expect(model.parse(parse1)).toEqual(parse1);
    expect(model.parse(parse2)).toEqual(parse2);
    expect(model.parse(parse3)).toEqual(parse3);
    expect(model.parse(parse4)).toEqual(parse4);
    expect(model.parse(parse5)).toEqual(parse5);
    expect(model.parse(parse6)).toEqual(parse6);
    expect(model.parse(parse7)).toEqual(parse7);
    expect(model.parse(parse8)).toEqual(parse8);
    expect(model.parse(parse9)).toEqual(parse9);
    expect(model.parse(parse10)).toEqual(parse10);
    expect(model.parse(parse11)).toEqual(parse11);

    var parse1_2 = {results: parse1};
    var parse2_2 = {results: parse2};
    var parse3_2 = {results: parse3};
    var parse4_2 = {results: parse4};
    var parse5_2 = {results: parse5};
    var parse6_2 = {results: parse6};
    var parse7_2 = {results: parse7};
    var parse8_2 = {results: parse8};
    var parse9_2 = {results: parse9};
    var parse10_2 = {results: parse10};
    var parse11_2 = {results: parse11};

    expect(model.parse()).toEqual(void 0);
    expect(model.parse(parse1_2)).toEqual(parse1_2);
    expect(model.parse(parse2_2)).toEqual(parse2_2);
    expect(model.parse(parse3_2)).toEqual(parse3_2);
    expect(model.parse(parse4_2)).toEqual(parse4_2);
    expect(model.parse(parse5_2)).toEqual(parse5_2);
    expect(model.parse(parse6_2)).toEqual(parse6_2);
    expect(model.parse(parse7_2)).toEqual(parse7_2);
    expect(model.parse(parse8_2)).toEqual(parse8_2);
    expect(model.parse(parse9_2)).toEqual(parse9_2);
    expect(model.parse(parse10_2)).toEqual(parse10_2);
    expect(model.parse(parse11_2)).toEqual(parse11_2);


    var parse1_1 = {data: parse1_2};
    var parse2_1 = {data: parse2_2};
    var parse3_1 = {data: parse3_2};
    var parse4_1 = {data: parse4_2};
    var parse5_1 = {data: parse5_2};
    var parse6_1 = {data: parse6_2};
    var parse7_1 = {data: parse7_2};
    var parse8_1 = {data: parse8_2};
    var parse9_1 = {data: parse9_2};
    var parse10_1 = {data: parse10_2};
    var parse11_1 = {data: parse11_2};

    expect(model.parse()).toEqual(void 0);
    expect(model.parse(parse1_1)).toEqual(parse1_1);
    expect(model.parse(parse2_1)).toEqual(parse2_1);
    expect(model.parse(parse3_1)).toEqual(parse3_1);
    expect(model.parse(parse4_1)).toEqual(parse4_1);
    expect(model.parse(parse5_1)).toEqual(parse5_1);
    expect(model.parse(parse6_1)).toEqual(parse6_1);
    expect(model.parse(parse7_1)).toEqual(parse7_1);
    expect(model.parse(parse8_1)).toEqual(parse8_1);
    expect(model.parse(parse9_1)).toEqual(parse9_1);
    expect(model.parse(parse10_1)).toEqual(parse10_1);
    expect(model.parse(parse11_1)).toEqual(parse11_1);

    expect(model.parse({data: {results: [parse1]}})).toEqual(parse1);
    expect(model.parse({data: {results: [parse2]}})).toEqual(parse2);
    expect(model.parse({data: {results: [parse3]}})).toEqual(parse3);
    expect(model.parse({data: {results: [parse4]}})).toEqual(parse4);
    expect(model.parse({data: {results: [parse5]}})).toEqual(parse5);
    expect(model.parse({data: {results: [parse6]}})).toEqual(parse6);
    expect(model.parse({data: {results: [parse7]}})).toEqual({data: {results: [parse7]}});
    expect(model.parse({data: {results: [parse8]}})).toEqual(parse8);
    expect(model.parse({data: {results: [parse9]}})).toEqual(parse9);
    expect(model.parse({data: {results: [parse10]}})).toEqual(parse10);
    expect(model.parse({data: {results: [parse11]}})).toEqual(parse11);

  });

  it('basic usage of revert', function(){
    var model = new mCAP.Model({
      name: 'Max'
    });
    model.set('name', 'Maximilian');
    expect(model.get('name')).toBe('Maximilian');
    model.revert();
    expect(model.get('name')).toBe('Max');
  });

  it("revert implementation", function () {

    var Revertable = mCAP.Model.extend();
    var instance = new Revertable({
      foo: 'bar',
      hello: 'world'
    });

    expect(typeof mCAP.Model.prototype.revert).toBe('function');
    expect(typeof instance.revert).toBe('function');

    expect(instance.get('foo')).toBe('bar');
    expect(instance.attributes.foo).toBe('bar');
    expect(instance.get('hello')).toBe('world');
    expect(instance.attributes.hello).toBe('world');
    expect(instance.attributes).toEqual(instance._revertAttributes);
    expect(instance._revertAttributes.foo).toBe('bar');
    expect(instance._revertAttributes.hello).toBe('world');
    expect(instance.isInSync()).toBeTruthy();

    instance.revert();

    // shouldn't change any attribute
    expect(instance.get('foo')).toBe('bar');
    expect(instance.attributes.foo).toBe('bar');
    expect(instance.get('hello')).toBe('world');
    expect(instance.attributes.hello).toBe('world');
    expect(instance.isInSync()).toBeTruthy();

  });

  it("revert with setters", function () {
    var Revertable = mCAP.Model.extend();
    var instance = new Revertable({
      foo: 'bar',
      hello: 'world'
    });

    expect(instance.get('foo')).toBe('bar');
    expect(instance.attributes.foo).toBe('bar');
    expect(instance.get('hello')).toBe('world');
    expect(instance.attributes.hello).toBe('world');
    expect(instance.attributes).toEqual(instance._revertAttributes);
    expect(instance.isInSync()).toBeTruthy();

    instance.set('foo', 'world');
    instance.set('hello', 'bar');

    expect(instance.get('foo')).toBe('world');
    expect(instance.attributes.foo).toBe('world');
    expect(instance.get('hello')).toBe('bar');
    expect(instance.attributes.hello).toBe('bar');
    expect(instance._revertAttributes.foo).toBe('bar');
    expect(instance._revertAttributes.hello).toBe('world');
    expect(instance.isInSync()).toBeFalsy();

    instance.revert();

    expect(instance.get('foo')).toBe('bar');
    expect(instance.attributes.foo).toBe('bar');
    expect(instance.get('hello')).toBe('world');
    expect(instance.attributes.hello).toBe('world');
    expect(instance.attributes).toEqual(instance._revertAttributes);
    expect(instance.isInSync()).toBeTruthy();

  });

  it("revert with attributes", function () {

    var Revertable = mCAP.Model.extend();
    var instance = new Revertable({
      foo: 'bar',
      hello: 'world'
    });

    expect(instance.get('foo')).toBe('bar');
    expect(instance.attributes.foo).toBe('bar');
    expect(instance.get('hello')).toBe('world');
    expect(instance.attributes.hello).toBe('world');
    expect(instance.attributes).toEqual(instance._revertAttributes);
    expect(instance.isInSync()).toBeTruthy();

    instance.attributes.foo = 'world';
    instance.attributes.hello = 'bar';

    expect(instance.get('foo')).toBe('world');
    expect(instance.attributes.foo).toBe('world');
    expect(instance.get('hello')).toBe('bar');
    expect(instance.attributes.hello).toBe('bar');
    expect(instance._revertAttributes.foo).toBe('bar');
    expect(instance._revertAttributes.hello).toBe('world');
    expect(instance.isInSync()).toBeFalsy();

    instance.revert();

    expect(instance.get('foo')).toBe('bar');
    expect(instance.attributes.foo).toBe('bar');
    expect(instance.get('hello')).toBe('world');
    expect(instance.attributes.hello).toBe('world');
    expect(instance.attributes).toEqual(instance._revertAttributes);
    expect(instance.isInSync()).toBeTruthy();


  });

  it("revert add attributes direct association", function () {

    var Revertable = mCAP.Model.extend();
    var instance = new Revertable({
      foo: 'bar'
    });

    expect(instance.get('foo')).toBe('bar');
    expect(instance.attributes.foo).toBe('bar');
    expect(instance.get('hello')).toBeUndefined();
    expect(instance.attributes.hello).toBeUndefined();
    expect(instance.attributes).toEqual(instance._revertAttributes);
    expect(instance.isInSync()).toBeTruthy();

    instance.attributes.hello = 'world';

    expect(instance.get('foo')).toBe('bar');
    expect(instance.attributes.foo).toBe('bar');
    expect(instance.get('hello')).toBe('world');
    expect(instance.attributes.hello).toBe('world');
    expect(instance._revertAttributes.foo).toBe('bar');
    expect(instance._revertAttributes.hello).toBeUndefined();
    expect(instance.isInSync()).toBeFalsy();

    instance.revert();

    expect(instance.get('foo')).toBe('bar');
    expect(instance.attributes.foo).toBe('bar');
    expect(instance.get('hello')).toBeUndefined();
    expect(instance.attributes.hello).toBeUndefined();
    expect(instance.attributes).toEqual(instance._revertAttributes);
    expect(instance.isInSync()).toBeTruthy();

  });

  it("revert add attributes with set", function () {

    var Revertable = mCAP.Model.extend();
    var instance = new Revertable({
      foo: 'bar'
    });

    expect(instance.get('foo')).toBe('bar');
    expect(instance.attributes.foo).toBe('bar');
    expect(instance.get('hello')).toBeUndefined();
    expect(instance.attributes.hello).toBeUndefined();
    expect(instance.attributes).toEqual(instance._revertAttributes);
    expect(instance.isInSync()).toBeTruthy();

    instance.set('hello', 'world');

    expect(instance.get('foo')).toBe('bar');
    expect(instance.attributes.foo).toBe('bar');
    expect(instance.get('hello')).toBe('world');
    expect(instance.attributes.hello).toBe('world');
    expect(instance._revertAttributes.foo).toBe('bar');
    expect(instance._revertAttributes.hello).toBeUndefined();
    expect(instance.isInSync()).toBeFalsy();

    instance.revert();

    expect(instance.get('foo')).toBe('bar');
    expect(instance.attributes.foo).toBe('bar');
    expect(instance.get('hello')).toBeUndefined();
    expect(instance.attributes.hello).toBeUndefined();
    expect(instance.attributes).toEqual(instance._revertAttributes);
    expect(instance.isInSync()).toBeTruthy();

  });

  it("revert remove attributes", function () {

    var Revertable = mCAP.Model.extend();
    var instance = new Revertable({
      foo: 'bar',
      hello: 'world'
    });

    expect(instance.get('foo')).toBe('bar');
    expect(instance.attributes.foo).toBe('bar');
    expect(instance.get('hello')).toBe('world');
    expect(instance.attributes.hello).toBe('world');
    expect(instance.attributes).toEqual(instance._revertAttributes);
    expect(instance.isInSync()).toBeTruthy();

    delete instance.attributes.foo;
    delete instance.attributes.hello;

    expect(instance.get('foo')).toBeUndefined();
    expect(instance.attributes.foo).toBeUndefined();
    expect(instance.get('hello')).toBeUndefined();
    expect(instance.attributes.hello).toBeUndefined();
    expect(instance._revertAttributes.foo).toBe('bar');
    expect(instance._revertAttributes.hello).toBe('world');
    expect(instance.isInSync()).toBeFalsy();

    instance.revert();

    expect(instance.get('foo')).toBe('bar');
    expect(instance.attributes.foo).toBe('bar');
    expect(instance.get('hello')).toBe('world');
    expect(instance.attributes.hello).toBe('world');
    expect(instance.attributes).toEqual(instance._revertAttributes);
    expect(instance.isInSync()).toBeTruthy();

  });


  it("markToRevert initialize local model", function () {

    var Revertable = mCAP.Model.extend({
      parse: function(data){
        var _data = {};
        _data.internal = data.external;
        return _data;
      },

      toJSON: function(){
        this.attributes.external = this.attributes.internal;
        delete this.attributes.internal;
        return this.attributes;
      }
    });

    var instance = new Revertable({
      internal: 'a'
    });

    expect(instance.get('internal')).toBe('a');
    expect(instance.attributes.internal).toBe('a');
    expect(instance.attributes.external).toBeUndefined();
    expect(instance.attributes).toEqual(instance._revertAttributes);
    expect(instance.isInSync()).toBeTruthy();

    instance._markToRevert();

    expect(instance.get('internal')).toBe('a');
    expect(instance.attributes.internal).toBe('a');
    expect(instance.attributes.external).toBeUndefined();
    expect(instance.attributes).toEqual(instance._revertAttributes);
    expect(instance.isInSync()).toBeTruthy();

  });

  it("markToRevert model.fetch", function (done) {

    mCAP.application.set('baseUrl', 'http://www.mcap.com');

    var server = sinon.fakeServer.create();

    server.respondWith(function (xhr) {
      if (xhr.method == "GET" && xhr.url ===  instance.url) {
        xhr.respond(200, { "Content-Type": "application/json" }, JSON.stringify({external: 'a'}));
      }
    });

    var callback = sinon.spy();

    var Revertable = mCAP.Model.extend({
      url: '/reverteMe',
      parse: function(data){
        var _data = {};
        _data.internal = data.external;
        return _data;
      },

      toJSON: function(){
        this.attributes.external = this.attributes.internal;
        delete this.attributes.internal;
        return this.attributes;
      }
    });

    var instance = new Revertable();

    instance.fetch().then(function(){
      expect(instance.get('internal')).toBe('a');
      expect(instance.attributes.internal).toBe('a');
      expect(instance.attributes.external).toBeUndefined();
      expect(instance.attributes).toEqual(instance._revertAttributes);
      expect(instance.isInSync()).toBeTruthy();

      instance._markToRevert();

      expect(instance.get('internal')).toBe('a');
      expect(instance.attributes.internal).toBe('a');
      expect(instance.attributes.external).toBeUndefined();
      expect(instance.attributes).toEqual(instance._revertAttributes);
      expect(instance.isInSync()).toBeTruthy();

      callback();
      done();
    });

    server.respond();

    server.restore();

    sinon.assert.calledOnce(callback);

  });

});