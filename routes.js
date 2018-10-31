// It invoices the function immidiately
const routes = require("next-routes")();

/**
 * : -> It means a wild card / parameters
 */
// It overrides the default routings of the next.js
routes
  .add("/campaigns/new", "campaigns/new")
  .add("/campaigns/:address", "/campaigns/show")
  .add("/campaigns/:address/requests", "/campaigns/requests/index")
  .add("/campaigns/:address/requests/new", "/campaigns/requests/new");

module.exports = routes;
