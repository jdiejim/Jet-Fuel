
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('folders', table => {
      table.increments('id').primary();
      table.string('name');
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('folders');
};
