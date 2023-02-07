const indexR = require("./index");
const usersR = require("./users");
const restaurantsR = require("./restaurants");
const menusR = require("./menus");
const tablesR = require("./tables");
const ordersR = require("./orders");

exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/restaurants",restaurantsR)
  app.use("/menus",menusR)
  app.use("/tables",tablesR)
  app.use("/orders",ordersR)
}