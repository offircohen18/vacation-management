/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.enum("role", ["Requester", "Validator"]).notNullable().defaultTo("Requester");
    table.timestamps(true, true);
  });

  await knex.schema.createTable("vacation_requests", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.date("start_date").notNullable();
    table.date("end_date").notNullable();
    table.text("reason").nullable();
    table.enum("status", ["Pending", "Approved", "Rejected"]).notNullable().defaultTo("Pending");
    table.text("comments").nullable();
    table.timestamps(true, true);
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists("vacation_requests");
  await knex.schema.dropTableIfExists("users");
}
