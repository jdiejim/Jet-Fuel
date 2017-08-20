process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const shortHash = require('short-hash');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const environment = process.env.NODE_ENV;
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);
const chaiHttp = require('chai-http');
const server = require('../server');
const folders = [ 'Turing Lessons', 'Js Docs', 'UpLabs Favorites'];
const paths = ['Express Lesson', 'Knex Lesson', 'Web Sockets'];

chai.use(chaiHttp);

describe('API ROUTES', () => {
  beforeEach(done => {
    db.migrate.rollback()
      .then(() => db.migrate.rollback())
      .then(() => db.migrate.latest())
      .then(() => db.seed.run())
      .then(() => done())
  });

  describe('GET /api/v1/folders', () => {
    it('should return all folders', done => {
      chai.request(server)
      .get('/api/v1/folders')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(3);
        res.body.map(e => e.name).should.deep.equal(folders);
        done();
      });
    });
  });

  describe('POST /api/v1/folders', () => {
    it('should not create folder with missing data', done => {
      chai.request(server)
      .post('/api/v1/folders')
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.equal('You are missing name parameter');
        done();
      });
    });

    it('should create a new folder', done => {
      chai.request(server)
      .post('/api/v1/folders')
      .send({ name: 'Test Folder' })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.equal('Test Folder');
        chai.request(server)
        .get('/api/v1/folders')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(4);
          res.body[3].should.have.property('name');
          res.body[3].name.should.equal('Test Folder');
          done();
        });
      });
    });
  });

  describe('DELETE /api/v1/folders', () => {
    it('should not delete folder if missing data', done => {
      chai.request(server)
      .delete('/api/v1/folders/')
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.equal('You are missing id parameter');
        done();
      });
    });

    it('should delete a folder', done => {
      chai.request(server)
      .delete('/api/v1/folders')
      .send({ id: 1 })
      .end((err, res) => {
        res.should.have.status(200);
        chai.request(server)
        .get('/api/v1/folders')
        .end((err, res) => {
          res.body.map(e => e.id).includes(1).should.equal(false)
          done();
        });
      });
    });
  });

  describe('GET /folders/:id/paths', () => {
    it('should return all paths from specific folder', done => {
      chai.request(server)
      .get('/api/v1/folders/1/paths')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(3);
        res.body.map(e => e.title).should.deep.equal(paths);
        done();
      });
    });
  });

  describe('POST /folders/:id/paths', () => {
    it('should create new path for a specific folder', done => {
      chai.request(server)
      .post('/api/v1/folders/2/paths')
      .send({
        title: 'Test',
        path: 'www.test.com'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.title.should.equal('Test');
        res.body.should.have.property('short');
        res.body.short.should.equal(shortHash('www.test.com'));
        chai.request(server)
        .get('/api/v1/folders/2/paths')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(4);
          res.body[3].should.have.property('title');
          res.body[3].title.should.equal('Test');
          done();
        });
      });
    });

    it('should not create new path with missing data', done => {
      chai.request(server)
      .post('/api/v1/folders/2/paths')
      .send({
        title: 'Test',
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.equal('You are missing path parameter');
        done();
      });
    });
  });
});
