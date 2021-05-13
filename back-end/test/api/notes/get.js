process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require("mongoose");
const {MONGO_URI , JWT_SECRET1} = require("./tokens")

const app = require('../../../server');

describe('GET /notes', () => {
  before((done) => {
    const uri = process.env.ATLAS_URI || MONGO_URI;
    mongoose.connect(uri,{ useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true })
    .then(()=>{
        console.log("Database is connected");
    })
      .then(() => done())
      .catch((err) => done(err));
  })

//   after((done) => {
//     conn.close()
//       .then(() => done())
//       .catch((err) => done(err));
//   })

  it('OK, getting correct data', (done) => {
    request(app).get('/skilled-man/carpainter')
      .then((res) => {
        
        const body = res.body[0];
        expect(body).to.contain.property('userName');

        done();
      })
      .catch((err) => done(err));
  });

//   it('OK, getting notes has 1 note', (done) => {
//     request(app).post('/notes')
//       .send({ name: 'NOTE TEST', text: 'BBB' })
//       .then((res) => {
//         request(app).get('/notes')
//           .then((res) => {
//             const body = res.body;
//             expect(body.length).to.equal(1);
//             done();
//           })
//       })
//       .catch((err) => done(err));
//   });
})