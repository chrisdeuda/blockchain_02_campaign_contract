// It invoices the function immidiately
const routes = require("next-routes")();

/**
 * : -> It means a wild card / parameters
 */
// It overrides the default routings of the next.js
routes
  .add("/campaigns/new", "campaigns/new")
  .add("/campaigns/:address", "/campaigns/show");

module.exports = routes;
