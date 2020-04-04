let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server');
let should = chai.should();

chai.use('chaiHttp');

describe('Register', () => {

    describe('/POST register', () => {
        it('it should not POST a book without pages field', (done) => {
            let payload = {
                teacher: "dicky@gmail.com",
                students:
                  [
                    "abc@gmail.com",
			        "def@pqr.com"
                  ]
              }
              
          chai.request(server)
              .post('/api/register')
              .send(payload)
              .end((err, res) => {
                    console.log(res);
                done();
              });
        });
});