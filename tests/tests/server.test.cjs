import('chai').then((chai) => {
  const expect = chai.expect;
  const chaiHttp = require('chai-http');
  const { describe, it } = require('mocha');
  let app;

  chai.use(chaiHttp);

  // Importing the app module asynchronously
  import('../src/server').then((serverModule) => {
    app = serverModule.default;

    describe('Server', () => {
      it('should respond with status 200 for /api/v1 endpoint', (done) => {
        chai.request(app)
          .get('/api/v1')
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });

      it('should respond with status 404 for non-existing endpoint', (done) => {
        chai.request(app)
          .get('/non-existing-endpoint')
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
      });
    });
  });
});
