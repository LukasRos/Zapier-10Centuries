const BlurbCreate = require('./creates/blurb');
const authentication = require('./authentication');

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  beforeRequest: [
    (request, z, bundle) => {
      // Add authorization token into header
      request.headers['Authorization'] = bundle.authData.token;
      return request;
    }    
  ],

  triggers: {
  },

  searches: {
  },

  creates: {
    [BlurbCreate.key]: BlurbCreate,
  },

  authentication: authentication
};

// Finally, export the app.
module.exports = App;
