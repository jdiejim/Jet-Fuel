
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('folders', table => {
      table.increments('id').primary();
      table.string('name');

      table.timestamps(true, true)
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('folders')
  ]);
};
