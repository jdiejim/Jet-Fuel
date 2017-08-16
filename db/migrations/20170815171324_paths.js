
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('paths', table => {
      table.increments('id').primary();
      table.integer('folder_id').unsigned();
      table.foreign('folder_id').references('folders.id');
      table.string('title');
      table.string('path');
      table.string('short');
      table.date('date');

      table.timestamps(true, true)
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('paths')
  ])
};
