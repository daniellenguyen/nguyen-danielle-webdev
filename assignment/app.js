var app = require('../express.js');

module.exports = function() {
  require("./services/user.service.server.js");
  require("./services/website.service.server.js");
  require("./services/page.service.server.js");
  require("./services/widget.service.server.js");
};

module.exports(app);

