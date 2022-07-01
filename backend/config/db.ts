const config_knex = require("../knexfile.ts");
const knex = require("knex");

let db;
if (process.env.NODE_ENV === "test") {
  db = knex(config_knex.test);
} else {
  db = knex(config_knex.development);
  db.migrate.latest();
}

module.exports = db;
