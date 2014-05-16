(function (root, Backbone, $, _) {
  'use strict';

  var sync = Backbone.sync,
    mCap = {};

  Backbone.$.ajaxSetup({
    // send cookies
    xhrFields: { withCredentials: true }
  });

  Backbone.sync = function (method, model, options) {
    if (_.isUndefined(options.wait)) {
      options.wait = true;
    }
    return sync.apply(Backbone, [method, model, options]);
  };

  // INCLUDE PRIVATE VARS HERE
  // @include ./filter/filterable.js
  // @include ./selectable/selectable_collection.js
  // @include ./selectable/selectable_model.js
  // @include ./selectable/selectable_factory.js

  // INCLUDE mCap PUBLIC VARS HERE
  // @include ./model/model.js
  // @include ./collection/collection.js
  // @include ./filter/filter.js
  // @include ./application/application.js
  // @include ./authentication/authentication.js
  // @include ./authentication/user.js

  root.mCap = mCap;

}(this, Backbone, $, _));