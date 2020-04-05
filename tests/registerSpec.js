let chai = require('chai');
let server = require('../src/server');
const assert = chai.assert;

chai.use(require('chai-http'));
describe('/POST register', function () {

    it('should not POST a record successfully for invalid params', (done) => {
        let payload = {
        }
        chai
            .request(server)
            .post('/api/register')
            .send(payload)
            .end((err, res) => {
                assert(res.status, 400)
                done();
            });
    });
});