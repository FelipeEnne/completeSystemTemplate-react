const app = require("express")();
const consign = require("consign");

const mongoose = require("mongoose");
app.mongoose = mongoose;

db = require("./config/db.ts");
app.db = db;

consign()
  .then("./config/passport.ts")
  .then("./config/middlewares.ts")
  .then("./api/validation.ts")
  .then("./api")
  .then("./schedule")
  .then("./config/routes.ts")
  .into(app);

if (!module.parent) {
  app.listen(process.env.PORT, () => console.log(`Runing ${process.env.PORT}`));
}
module.exports = app;
