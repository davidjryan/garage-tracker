
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('garage', function (table) {
      table.increments('id').primary();
      table.string('lingers');
      table.string('reason');
      table.string('clean');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('garage'),
  ])
};
