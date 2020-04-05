let chai = require('chai');
let server = require('../src/server');
const assert = chai.assert;

chai.use(require('chai-http'));
describe('/POST suspend', function () {

    it('should execute NOT  call to suspend with invalid payload', (done) => {
        let payload = {
        }
        chai
            .request(server)
            .post('/api/suspend')
            .end((err, res) => {
                assert(res.status, 400)
                done();
            });
    });
});