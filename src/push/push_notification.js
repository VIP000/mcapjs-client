/**
 * Wrapper for client app developer to use the push api
 * @param options
 * @constructor
 */
mCAP.PushNotification = function (options) {

  options = options || {};
  var that = this;
  // default values for the push app
  var pushAppOptions = {};
  // use the pushServiceId as uuid of the pushApp
  if (options.pushServiceId) {
    pushAppOptions.uuid = options.pushServiceId;
  } else {
    console.info('no pushServiceId was given to the PushNotification. Please specify one to use the API');
  }
  // generate the push app to work on
  this.pushApp = new mCAP.PushApp(pushAppOptions);

  // the pushServiceId is only needed for the pushApp
  delete options.pushServiceId;

  // create the device based on the options
  this.device = this.pushApp.devices.add(options, {
    url: function () {
      return that.pushApp.url();
    }
  });

};

/**
 * The pushApp instance
 * @type {mCAP.PushApp}
 */
mCAP.PushNotification.prototype.pushApp = null;

/**
 * The instance of the device generated in the constructor
 * @type {null}
 */
mCAP.PushNotification.prototype.device = null;


/**
 * Update properties
 * @param key
 * @param value
 */
mCAP.PushNotification.prototype.set = function (key, value) {

  if (key === 'pushServiceId') {
    this.pushApp.set('uuid', value);
  } else {
    this.device.set(key, value);
  }
  return this;
};

/**
 * Get a property
 * @param key
 * @returns {*}
 */
mCAP.PushNotification.prototype.get = function (key) {
  if (typeof this.device.get(key) !== 'undefined') {
    return this.device.get(key);
  } else if (typeof this.pushApp.get(key) !== 'undefined') {
    return this.pushApp.get(key);
  } else if (key === 'pushServiceId') {
    return this.pushApp.get('uuid');
  }
  return null;
};

/**
 * Return the configuration
 * @returns {*}
 */
mCAP.PushNotification.prototype.getConfiguration = function () {
  return this.pushApp.toJSON();
};

/**
 * Add an extra attribute
 * @param key
 * @param value
 */
mCAP.PushNotification.prototype.addAttribute = function (key, value) {
  this.device.attributes.attributes[key] = value;
  return this;
};

/**
 * Remove an extra attribute
 * @param key
 */
mCAP.PushNotification.prototype.removeAttribute = function (key) {
  delete this.device.attributes.attributes[key];
};

/**
 * Remove an extra attribute
 * @param key
 */
mCAP.PushNotification.prototype.removeAttribute = function (key) {
  delete this.device.attributes.attributes[key];
  return this;
};

/**
 * Add a tag
 * @param tag
 * @returns {mCAP.PushNotification}
 */
mCAP.PushNotification.prototype.addTag = function (tag) {
  this.addTags([tag]);
  return this;
};

/**
 * Remove a tag
 * @param tag
 */
mCAP.PushNotification.prototype.removeTag = function (tag) {
  return this.removeTags([tag]);
};

/**
 * Add multiple tags
 * @param tags
 * @returns {mCAP.PushNotification}
 */
mCAP.PushNotification.prototype.addTags = function (tags) {
  this.device.attributes.tags = _.union(this.device.attributes.tags, tags || []);
  return this;
};

/**
 * Remove tags
 * @param tags
 */
mCAP.PushNotification.prototype.removeTags = function (tags) {
  this.device.attributes.tags = _.difference(this.device.attributes.tags, tags || []);
  return this;
};

/**
 * Subscribe to a tag
 * @param tag
 */
mCAP.PushNotification.prototype.subscribeTag = function (tag) {
  this.addTag(tag);
};

/**
 * Subscribe to multiple tags
 * @param tags
 */
mCAP.PushNotification.prototype.subscribeTags = function (tags) {
  this.addTags(tags);
};

/**
 * add an extra attribute
 * @param key
 * @param val
 */
mCAP.PushNotification.prototype.putAttributeValue = function (key, val) {
  this.addAttribute(key, val);
};

/**
 * Set attributes
 */
mCAP.PushNotification.prototype.setAttributes = function (key, val) {
  // TODO
  this.addAttribute(key, val);
};

/**
 * Set the country
 * @param country
 */
mCAP.PushNotification.prototype.setCountry = function (country) {
  this.set('country', country);
};

/**
 * Set the badge
 * @param badge
 */
mCAP.PushNotification.prototype.setCurrentBadge = function (badge) {
  this.set('badge', badge);
};

/**
 * Set the token
 * @param token
 */
mCAP.PushNotification.prototype.setToken = function (token) {
  this.set('token', token);
};

/**
 * Set the language
 * @param language
 */
mCAP.PushNotification.prototype.setLanguage = function (language) {
  this.set('language', language);
};

/**
 * Set the device model
 * @parama model
 */
mCAP.PushNotification.prototype.setModel = function (model) {
  this.set('model', model);
};

/**
 * Set the name of the user
 * @param user
 */
mCAP.PushNotification.prototype.setUser = function (user) {
  this.set('name', user);
};

/**
 * unsubscribe from a tag
 * @param tag
 */
mCAP.PushNotification.prototype.unsubscribeTag = function (tag) {
  this.removeTag(tag);
};

/**
 * Remove from the device from the mcap push list
 */
mCAP.PushNotification.prototype.unregister = function () {
  return pushNotification.device.destroy();
};

/**
 * Interface
 */
mCAP.PushNotification.prototype.sendStatusBarNotification = function () {
  console.info('needs to be implemented by the specific implementation');
};

/**
 * Interface
 */
mCAP.PushNotification.prototype.showToastNotification = function () {
  console.info('needs to be implemented by the specific implementation');
};

/**
 * Interface
 */
mCAP.PushNotification.prototype.updateDeviceBadge = function () {
  console.info('needs to be implemented by the specific implementation');
};