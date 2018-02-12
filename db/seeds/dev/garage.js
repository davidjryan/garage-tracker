exports.seed = function (knex, Promise) {
  return knex('garage').del()
    .then(() => knex('garage').del())
    .then(() => {
      return Promise.all([
        knex('garage').insert([{
          lingers: 'Boxes', reason: 'no time', clean: 'Sparkling'
        },
        {
          lingers: 'Hair', reason: 'no idea', clean: 'Rusty'
        },
        {
          lingers: 'Cans', reason: 'no way', clean: 'YAY'
        }], 'id')
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
