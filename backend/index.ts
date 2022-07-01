const app = require("express")();
const consign = require("consign");
db = require("./config/db.ts");

app.db = db;

consign()
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
