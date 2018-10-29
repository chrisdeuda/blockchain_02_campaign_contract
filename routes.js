// It invoices the function immidiately
const routes = require("next-routes")();

/**
 * : -> It means a wild card / parameters
 */
routes.add("/campaigns/:address", "/campaigns/show");

module.exports = routes;
