import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import { Express } from 'express';

chai.use(chaiHttp);
const expect = chai.expect;

let app: Express;

// Importing the app module asynchronously
import('../src/server.ts').then((serverModule) => {
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
