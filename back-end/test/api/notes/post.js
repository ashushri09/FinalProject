process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require("mongoose");

const app = require('../../../server');
const {MONGO_URI , JWT_SECRET1} = require("../../../tokens.js")


describe('POST /notes', () => {
    before((done) => {
        const uri = process.env.ATLAS_URI || MONGO_URI;
        mongoose.connect(uri,{ useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true })
        .then(()=>{
            console.log("Database is connected");
        })
        .then(() => done())
        .catch((err) => done(err));
    })
  

  
    it('OK, login positive', (done) => {
      request(app).post('/signin')
        .send({ userName: 'parth', password: "parth" })
        .then((res) => {
          const body = res.body;
          expect(body).to.contain.property('user');
          done();
        })
        .catch((err) => done(err));
    });
  
    it('Not ok,login negative test case', (done) => {
        request(app).post('/signin')
          .send({ userName: 'parth', password: "part" })
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('msg');
            done();
          })
          .catch((err) => done(err));
      });

  })