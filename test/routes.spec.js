const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Test', () => {

  before(done => {
  // run migrations
  db.migrate.latest()
    .then(() => done())
});

beforeEach(done => {
  // run seed files
  db.seed.run()
    .then(() => done())
});

  it('should dummy test', done => {
    expect(2).to.equal(2)
    done();
  })
})
