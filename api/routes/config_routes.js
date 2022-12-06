const indexR = require("./index");
const usersR = require("./users");
// const toysR = require("./toys");
const restaurantsR = require("./restaurants");
const menusR = require("./menus");

exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  // app.use("/toys",toysR)
  app.use("/restaurants",restaurantsR)
  app.use("/menus",menusR)
}