process.env.NODE_ENV = "test";

import db from "../db/knex.js";

export const setupDB = async () => {
  console.log("⏳ Setting up test database...");
  await db.migrate.rollback({}, true);
  await db.migrate.latest();
  await db.seed.run();
  console.log("✅ Test database ready!");
};

export const teardownDB = async () => {
  console.log("🧹 Cleaning up test database...");
  await db.destroy();
  console.log("✅ Database connection closed!");
};
