const moment = require('moment');
const shortHash = require('short-hash');

const folders = [
  'Turing Lessons',
  'Js Docs',
  'UpLabs Favorites'
];

const links = [
  {
    folder_id: 1,
    title: 'Express Lesson',
    path: 'http://frontend.turing.io/lessons/module-4/intro-to-express.html',
  },
  {
    folder_id: 1,
    title: 'Knex Lesson',
    path: 'http://frontend.turing.io/lessons/module-4/knex-postgres.html',
  },
  {
    folder_id: 1,
    title: 'Web Sockets',
    path: 'http://frontend.turing.io/lessons/module-4/websocket-workshop.html',
  },
  {
    folder_id: 2,
    title: 'Express Docs',
    path: 'http://expressjs.com/en/api.html',
  },
  {
    folder_id: 2,
    title: 'React Docs',
    path: 'https://facebook.github.io/react/docs/hello-world.html',
  },
  {
    folder_id: 2,
    title: 'Vue Docs',
    path: 'https://vuejs.org/v2/guide/',
  },
  {
    folder_id: 3,
    title: 'Hero Idea',
    path: 'https://www.uplabs.com/posts/hero-idea',
  },
  {
    folder_id: 3,
    title: 'Dashboard Idea',
    path: 'https://www.uplabs.com/posts/supplier-chain-management',
  },
  {
    folder_id: 3,
    title: 'Dashboard 2 Idea',
    path: 'https://www.uplabs.com/posts/building-construction-erp',
  },
];

const getLinks = (folder_id) => {
  return links.filter(e => e.folder_id === folder_id)
              .map((e, i) => {
                const short = shortHash(e.path);
                const date = moment().add(i, 'days').format();
                return Object.assign(e, { short, date });
              });
}


exports.seed = function(knex, Promise) {
  return knex('folders').del()
    .then(() => knex('paths').del())
    .then(() => Promise.all(
      folders.map(name => {
        return knex('folders').insert({ name }, 'id')
          .then(data => knex('paths').insert(getLinks(data[0])))
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log('Error seeding data'))
      })
    ))
};
