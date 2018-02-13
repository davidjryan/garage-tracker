process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');
chai.use(chaiHttp);


describe('Client Routes', () => {
  it('should return the homepage', () => {
    return chai.request(server)
      .get('/')
      .then(response => {
        response.should.have.status(200);
      })
      .catch(error => {
        throw error;
      });
  });

  it('should return a 404 if the page is not found', () => {
    return chai.request(server)
      .get('/sad')
      .then(response => {
        response.should.have.status(404);
      });
  });
})

describe('API Routes', () => {

  beforeEach((done) => {
    knex.seed.run()
      .then(() => {
        done();
      });
  });

  describe('GET api/v1/garage', () => {
    it('should return all the garage items', () => {
      return chai.request(server)
        .get('/api/v1/garage')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(3);
          response.res.should.be.a('object');
          response.body[0].should.have.property('lingers');
          response.body[0].address.should.equal('Boxes');
          response.body[0].should.have.property('reason');
          response.body[0].balance.should.equal('no time');
          response.body[0].should.have.property('clean');
          response.body[0].balance.should.equal('Sparkling');
        })
        .catch(err => {
          throw err;
        });
    });
  })

  describe('POST api/v1/garage', () => {

    it('should post a garage item', () => {
      return chai.request(server)
        .post('/api/v1/garage')
        .send({
          lingers: 'shoes',
          reason: 'they smell',
          clean: 'Rancid'
        })
        .then(response => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id')
        })
        .catch(error => {
          throw error;
        })
    })

    it('should return a 422 when a required param is missing', () => {
      return chai.request(server)
        .post('/api/v1/garage')
        .send({
          lingers: 'car parts'
        })
        .then(response => {
          response.should.have.status(422);
        })
        .catch(error => {
          throw error;
        })
    })
  })
})