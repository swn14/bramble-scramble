const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file !== "index.js") {
      const route = require(path.join(__dirname, file));
      const routeName = file.replace("Endpoints.js", "").toLowerCase();
      app.use(`/api/${routeName}`, route);
    }
  });
};
