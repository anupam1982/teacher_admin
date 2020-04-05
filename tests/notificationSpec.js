let chai = require('chai');
let server = require('../src/server');
const assert = chai.assert;

chai.use(require('chai-http'));
describe('/GET retrievefornotifications', function () {

    it('should execute GET call to retrieve successfully', (done) => {
        let payload = {
        }
        chai
            .request(server)
            .get('/api/retrievefornotifications')
            .send(payload)
            .end((err, res) => {
                assert(res.status, 200)
                done();
            });
    });
});