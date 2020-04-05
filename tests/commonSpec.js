let chai = require('chai');
let server = require('../src/server');
const assert = chai.assert;

chai.use(require('chai-http'));
describe('/GET commonList', function () {

    it('should execute GET call successfully', (done) => {
        let payload = {
        }
        chai
            .request(server)
            .get('/api/commonstudents')
            .send(payload)
            .end((err, res) => {
                assert(res.status, 200)
                done();
            });
    });
});